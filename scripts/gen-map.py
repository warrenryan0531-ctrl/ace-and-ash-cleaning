#!/usr/bin/env python3
"""Regenerate components/MapArt.tsx from US Census TIGER 2023 (public domain).
Deterministic: same inputs -> byte-identical output."""
import io, json, math, os, sys, urllib.request, zipfile
import shapefile  # pyshp

sys.setrecursionlimit(50000)
TMP = "/tmp/aa_map"
os.makedirs(TMP, exist_ok=True)

def fetch(url, name):
    p = os.path.join(TMP, name)
    if not os.path.exists(p):
        urllib.request.urlretrieve(url, p)
    d = p + "_x"
    if not os.path.isdir(d):
        zipfile.ZipFile(p).extractall(d)
    return d

CTY = fetch("https://www2.census.gov/geo/tiger/GENZ2023/shp/cb_2023_us_county_500k.zip", "cty.zip")
WATERS = [fetch(f"https://www2.census.gov/geo/tiger/TIGER2023/AREAWATER/tl_2023_{f}_areawater.zip",
                f"w{f}.zip") for f in ("12031", "12109", "12019", "12089")]

WANT = {"12031", "12109", "12019", "12089", "12107", "12035", "12003"}
counties = []
r = shapefile.Reader(os.path.join(CTY, "cb_2023_us_county_500k.shp"))
flds = [f[0] for f in r.fields[1:]]
for sr in r.iterShapeRecords():
    rec = dict(zip(flds, sr.record))
    if rec.get("GEOID") in WANT:
        sh = sr.shape
        parts = list(sh.parts) + [len(sh.points)]
        counties.append(([sh.points[parts[i]:parts[i + 1]] for i in range(len(parts) - 1)], rec["GEOID"]))
counties.sort(key=lambda t: t[1])

KEEP = ("Atlantic Ocean", "St Johns Riv", "Matanzas Riv", "Tolomato Riv", "Nassau Riv",
        "Guano Lk", "Doctors Lk", "Guana Riv", "Julington Cr", "Trout Riv", "Ortega Riv")
wet = []
for d in sorted(WATERS):
    shp = [x for x in os.listdir(d) if x.endswith("areawater.shp")][0]
    r = shapefile.Reader(os.path.join(d, shp))
    flds = [f[0] for f in r.fields[1:]]
    for sr in r.iterShapeRecords():
        rec = dict(zip(flds, sr.record))
        area = rec.get("AWATER") or 0
        name = (rec.get("FULLNAME") or "").strip()
        if area < 900000:
            continue
        if not (any(k in name for k in KEEP) or area > 4000000):
            continue
        sh = sr.shape
        parts = list(sh.parts) + [len(sh.points)]
        wet.append((area, rec.get("HYDROID") or name,
                    [sh.points[parts[i]:parts[i + 1]] for i in range(len(parts) - 1)]))
wet.sort(key=lambda t: (-t[0], str(t[1])))

W, E, S, N = -82.05, -81.18, 29.85, 30.42
VW = 1000.0
latm = math.cos(math.radians((S + N) / 2))
sc = VW / ((E - W) * latm)
VH = round((N - S) * sc, 1)
proj = lambda lo, la: ((lo - W) * latm * sc, (N - la) * sc)

def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    den = math.hypot(dx, dy)
    dmax, idx = -1.0, 0
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        d = (abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / den) if den > 1e-9 else math.hypot(x0 - x1, y0 - y1)
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]

def simplify(pts, eps):
    if pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) < 4:
        return pts
    x0, y0 = pts[0]
    k = max(range(len(pts)), key=lambda i: (pts[i][0] - x0) ** 2 + (pts[i][1] - y0) ** 2)
    return rdp(pts[:k + 1], eps)[:-1] + rdp(pts[k:] + [pts[0]], eps)[:-1]

def build(rings, eps=1.0, minpts=5, minspan=7.0):
    out = []
    for ring in rings:
        pts = simplify([proj(lo, la) for lo, la in ring], eps)
        if len(pts) < minpts:
            continue
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        if max(xs) - min(xs) < minspan and max(ys) - min(ys) < minspan:
            continue
        out.append("M" + " ".join(f"{x:.1f},{y:.1f}" for x, y in pts) + "Z")
    return "".join(out)

LAND = "".join(build(rings) for rings, _ in counties)
WATER = "".join(build(rings) for _, _, rings in wet)

PLACES = [("Jacksonville", 30.3322, -81.6557, "end"),
          ("Jacksonville Beach", 30.2947, -81.3931, "end"),
          ("Ponte Vedra", 30.2397, -81.3856, "start"),
          ("Orange Park", 30.1661, -81.7062, "end"),
          ("Julington Creek &amp; Fruit Cove", 30.1150, -81.6210, "end"),
          ("Durbin Crossing &amp; Rivertown", 30.0750, -81.5480, "end"),
          ("Palencia", 29.9866, -81.3672, "start"),
          ("World Golf Village", 29.9663, -81.4676, "end"),
          ("St. Augustine", 29.9012, -81.3124, "end")]
nx, ny = [round(v, 1) for v in proj(-81.409, 30.0844)]
mi5 = round(5 / 69.17 * sc, 1)
dots = "".join('\n        <circle cx="%.1f" cy="%.1f" r="2.4" />' % proj(lo, la) for _, la, lo, _ in PLACES)
labs = ""
for n, la, lo, anch in PLACES:
    x, y = proj(lo, la)
    labs += '\n        <text x="%.1f" y="%.1f" textAnchor="%s">%s</text>' % (x + (8 if anch == "start" else -8), y + 3.2, anch, n)

open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "MapArt.body"), "w").write("")
print(json.dumps({"vw": VW, "vh": VH, "land": LAND, "water": WATER,
                  "nx": nx, "ny": ny, "mi5": mi5, "dots": dots, "labs": labs}))
