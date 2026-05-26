import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const ease = Easing.bezier(0.2, 0.85, 0.25, 1);

const layer = (
  frame: number,
  input: [number, number],
  output: [number, number],
) =>
  interpolate(frame, input, output, {
    ...clamp,
    easing: ease,
  });

export const PachBannLoop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopFrame = frame % (6 * fps);

  const cameraY = layer(loopFrame, [0, 6 * fps], [18, -18]);
  const cameraScale = layer(loopFrame, [0, 6 * fps], [0.96, 1.035]);
  const orbit = layer(loopFrame, [0, 6 * fps], [-7, 7]);
  const glowOpacity = layer(loopFrame, [0, 2.5 * fps], [0.12, 0.34]);

  const titleOpacity = layer(loopFrame, [0.25 * fps, 1.4 * fps], [0, 1]);
  const titleY = layer(loopFrame, [0.25 * fps, 1.4 * fps], [36, 0]);
  const cardOne = layer(loopFrame, [1.2 * fps, 2.2 * fps], [40, 0]);
  const cardTwo = layer(loopFrame, [1.45 * fps, 2.45 * fps], [40, 0]);
  const cardThree = layer(loopFrame, [1.7 * fps, 2.7 * fps], [40, 0]);
  const lineScale = layer(loopFrame, [2.1 * fps, 3.7 * fps], [0.18, 1]);
  const markScale = layer(loopFrame, [0.8 * fps, 2.3 * fps], [0.88, 1]);
  const markOpacity = layer(loopFrame, [0.8 * fps, 1.8 * fps], [0, 1]);

  const container: React.CSSProperties = {
    background: '#050505',
    color: '#f5f5f7',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    overflow: 'hidden',
  };

  const grid: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '72px 72px',
    transform: `translateY(${cameraY * 0.55}px) scale(${cameraScale})`,
    opacity: 0.45,
  };

  const stage: React.CSSProperties = {
    position: 'absolute',
    inset: 72,
    borderRadius: 18,
    border: '1px solid rgba(245,245,247,0.13)',
    background:
      'radial-gradient(circle at 72% 30%, rgba(215,255,122,0.12), transparent 32%), rgba(255,255,255,0.035)',
    transform: `perspective(1200px) rotateX(${orbit * -0.18}deg) rotateY(${orbit}deg) translateY(${cameraY}px) scale(${cameraScale})`,
    boxShadow: '0 50px 140px rgba(0,0,0,0.48)',
  };

  return (
    <AbsoluteFill style={container}>
      <div style={grid} />
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          right: 92,
          top: 72,
          borderRadius: '50%',
          background: 'rgba(215,255,122,0.18)',
          filter: 'blur(95px)',
          opacity: glowOpacity,
        }}
      />
      <div style={stage}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 58,
            borderBottom: '1px solid rgba(245,245,247,0.1)',
            background: 'rgba(255,255,255,0.055)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 25,
            left: 28,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: '#d7ff7a',
            boxShadow:
              '20px 0 rgba(245,245,247,0.34), 40px 0 rgba(245,245,247,0.22)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 62,
            top: 140,
            width: 680,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              color: '#d7ff7a',
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 2.4,
              marginBottom: 22,
            }}
          >
            PACHBANN WEB DESIGN
          </div>
          <div
            style={{
              fontSize: 74,
              fontWeight: 820,
              lineHeight: 0.94,
            }}
          >
            Presenca digital com profundidade.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 88,
            top: 150,
            width: 240,
            height: 240,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 18,
            border: '1px solid rgba(245,245,247,0.14)',
            background: 'rgba(0,0,0,0.34)',
            color: 'rgba(245,245,247,0.72)',
            fontSize: 92,
            fontWeight: 850,
            opacity: markOpacity,
            transform: `scale(${markScale}) translateZ(80px)`,
          }}
        >
          PB
        </div>
        {[
          ['Design', cardOne],
          ['Performance', cardTwo],
          ['Responsivo', cardThree],
        ].map(([label, y], index) => (
          <div
            key={label as string}
            style={{
              position: 'absolute',
              left: 64 + index * 285,
              bottom: 82,
              width: 246,
              height: 92,
              borderRadius: 14,
              border: '1px solid rgba(245,245,247,0.12)',
              background: 'rgba(255,255,255,0.055)',
              transform: `translateY(${y as number}px)`,
              opacity: layer(loopFrame, [(1 + index * 0.25) * fps, (2 + index * 0.25) * fps], [0, 1]),
              padding: 22,
              fontSize: 24,
              fontWeight: 760,
            }}
          >
            {label as string}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            left: 64,
            right: 64,
            bottom: 42,
            height: 3,
            borderRadius: 99,
            background: 'rgba(245,245,247,0.11)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#d7ff7a',
              transform: `scaleX(${lineScale})`,
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
