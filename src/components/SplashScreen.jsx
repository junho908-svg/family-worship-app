import { useEffect, useState } from 'react';

const FLOAT_STYLE = `
  @keyframes splashFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }
`;

export default function SplashScreen({ onComplete, logoUrl }) {
  const [phase, setPhase] = useState('in'); // 'in' | 'visible' | 'out'

  useEffect(() => {
    // 페이드 인 완료 후 visible 상태
    const t1 = setTimeout(() => setPhase('visible'), 50);
    // 1200ms 후 페이드 아웃 시작
    const t2 = setTimeout(() => setPhase('out'), 1200);
    // 1500ms 후 onComplete 호출 (페이드 아웃 0.3초 포함)
    const t3 = setTimeout(() => onComplete(), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const opacity = phase === 'visible' ? 1 : 0;

  return (
    <>
      <style>{FLOAT_STYLE}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at center, #FFF4D2 0%, #FFE9A8 35%, #F5C97B 80%, #E8B560 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          opacity,
          transition: phase === 'out' ? 'opacity 0.3s ease' : 'opacity 0.2s ease',
        }}
      >
        <img
          src={logoUrl}
          alt="로고몽"
          style={{
            width: 190,
            height: 190,
            objectFit: 'contain',
            animation: 'splashFloat 3s ease-in-out infinite',
            mixBlendMode: 'multiply',
          }}
        />
        <div
          style={{
            fontFamily: "'Black Han Sans', 'Noto Serif KR', serif",
            fontSize: '2.4rem',
            fontWeight: 900,
            color: '#4A3F35',
            marginTop: '1.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          우리집 예배
        </div>
        <div
          style={{
            fontSize: '1rem',
            color: '#8B7355',
            marginTop: '0.5rem',
            letterSpacing: '0.05em',
          }}
        >
          오늘도 주님과 함께
        </div>
      </div>
    </>
  );
}
