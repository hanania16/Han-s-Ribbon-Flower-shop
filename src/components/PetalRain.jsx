import { useEffect, useRef } from 'react';

export default function PetalRain() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const petals = ['🌸','🌺','✿','🌷','🌹'];
    
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = petals[Math.floor(Math.random() * petals.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 12) + 's';
      p.style.fontSize = (12 + Math.random() * 12) + 'px';
      container.appendChild(p);
    }
  }, []);

  return <div id="petalContainer" ref={containerRef}></div>;
}
