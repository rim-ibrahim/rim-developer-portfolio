import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgb(246, 51, 154)',
          fontWeight: 900,
          fontStyle: 'italic',
        }}
      >
        R
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
