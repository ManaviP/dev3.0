import { useEffect, useRef, memo } from 'react';
import './DotField.css';

const TWO_PI = Math.PI * 2;

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
  [key: string]: any;
}

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(0, 0, 0, 0.2)',
  gradientTo = 'rgba(0, 0, 0, 0.1)',
  glowColor = '#f3ecd2',
  className = '',
  ...rest
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef<any>({});

  propsRef.current = { 
    dotRadius, dotSpacing, cursorRadius, cursorForce, 
    bulgeOnly, bulgeStrength, sparkle, waveAmplitude, 
    gradientFrom, gradientTo 
  };

  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: any;

    const doResize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      sizeRef.current = { w, h, offsetX: rect.left, offsetY: rect.top };
      buildDots(w, h);
    };

    const buildDots = (w: number, h: number) => {
      const p = propsRef.current;
      const dots = [];
      const cols = Math.floor(w / p.dotSpacing);
      const rows = Math.floor(h / p.dotSpacing);
      const padX = (w - (cols - 1) * p.dotSpacing) / 2;
      const padY = (h - (rows - 1) * p.dotSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = padX + c * p.dotSpacing;
          const y = padY + r * p.dotSpacing;
          dots.push({ x, y, originX: x, originY: y, vx: 0, vy: 0, phase: Math.random() * TWO_PI });
        }
      }
      dotsRef.current = dots;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX - sizeRef.current.offsetX;
      m.y = e.clientY - sizeRef.current.offsetY;
      const dx = m.x - m.prevX;
      const dy = m.y - m.prevY;
      m.speed = Math.sqrt(dx * dx + dy * dy);
      engagement.current = 1;
    };

    const handleMouseLeave = () => {
      engagement.current = 0;
    };

    const animate = () => {
      const w = sizeRef.current.w;
      const h = sizeRef.current.h;
      const p = propsRef.current;
      const m = mouseRef.current;
      const dots = dotsRef.current;

      ctx.clearRect(0, 0, w, h);
      
      const targetOpacity = engagement.current > 0 ? 1 : 0;
      glowOpacity.current += (targetOpacity - glowOpacity.current) * 0.1;
      if (glowRef.current) glowRef.current.style.opacity = String(glowOpacity.current);
      if (glowRef.current) {
        glowRef.current.setAttribute('cx', String(m.x));
        glowRef.current.setAttribute('cy', String(m.y));
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = m.x - d.originX;
        const dy = m.y - d.originY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < p.cursorRadius) {
          const force = (p.cursorRadius - dist) / p.cursorRadius;
          const angle = Math.atan2(dy, dx);
          const move = force * force * p.bulgeStrength;

          d.x = d.originX - Math.cos(angle) * move;
          d.y = d.originY - Math.sin(angle) * move;
        } else {
          d.x += (d.originX - d.x) * 0.1;
          d.y += (d.originY - d.y) * 0.1;
        }

        let r = p.dotRadius;
        if (p.sparkle) {
          d.phase += 0.05;
          r *= (0.7 + 0.3 * Math.sin(d.phase));
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, TWO_PI);
        ctx.fillStyle = p.gradientFrom;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    });
    window.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement!.addEventListener('mouseleave', handleMouseLeave);

    doResize();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', doResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [glowColor, glowRadius]);

  return (
    <div className={`dot-field-container ${className}`} {...rest}>
      <canvas ref={canvasRef} className="dot-field-canvas" />
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';
export default DotField;
