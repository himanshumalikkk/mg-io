import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Touch screen / reduced motion check
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const textAttr = interactive.getAttribute('data-cursor');
        setCursorText(textAttr || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-200 border ${
          isHovered
            ? 'w-16 h-16 bg-[#00AEEF] border-[#00AEEF] text-white shadow-lg scale-110'
            : 'w-4 h-4 bg-[#111111] border-[#111111] opacity-70'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
