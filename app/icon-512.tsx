import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FBF7F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="400" height="400" viewBox="0 0 32 32" fill="none">
          <path d="M4 14 L16 4 L28 14 L28 28 L4 28 Z" fill="#B05A3A" />
          <rect x="22" y="8" width="3" height="5" fill="#B05A3A" />
          <rect x="13" y="18" width="6" height="10" fill="#FBF7F0" />
          <rect x="13" y="22" width="6" height="0.8" fill="#B05A3A" />
          <rect x="15.6" y="18" width="0.8" height="10" fill="#B05A3A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
