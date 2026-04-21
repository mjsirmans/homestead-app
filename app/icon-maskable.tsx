import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function IconMaskable() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#B05A3A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="260" height="260" viewBox="0 0 32 32" fill="none">
          <path d="M4 14 L16 4 L28 14 L28 28 L4 28 Z" fill="#FBF7F0" />
          <rect x="22" y="8" width="3" height="5" fill="#FBF7F0" />
          <rect x="13" y="18" width="6" height="10" fill="#B05A3A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
