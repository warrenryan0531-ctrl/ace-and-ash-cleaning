import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#8A4E37', color: '#F4F0E9', fontSize: 108, fontStyle: 'italic',
      }}>
        <div style={{
          position: 'absolute', inset: 15, border: '4px solid #F4F0E9', display: 'flex',
        }} />
        &amp;
      </div>
    ),
    { ...size },
  );
}
