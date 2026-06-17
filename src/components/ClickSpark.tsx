import React, { useRef, useEffect, useCallback } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  children?: React.ReactNode;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#f97028',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = time - spark.startTime;
      if (elapsed > duration) return false;

      const progress = elapsed / duration;
      const currentDistance = progress * sparkRadius;
      const opacity = 1 - progress;

      const sparkX = spark.x + Math.cos(spark.angle) * currentDistance;
      const sparkY = spark.y + Math.sin(spark.angle) * currentDistance;

      ctx.beginPath();
      ctx.arc(sparkX, sparkY, (sparkSize / 2) * opacity, 0, Math.PI * 2);
      ctx.fillStyle = sparkColor;
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.globalAlpha = 1;

      return true;
    });

    // Stop the loop when no sparks remain
    if (sparksRef.current.length > 0) {
      animationIdRef.current = requestAnimationFrame(animate);
    } else {
      isRunningRef.current = false;
      animationIdRef.current = null;
    }
  }, [duration, sparkColor, sparkRadius, sparkSize]);

  const startLoop = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      animationIdRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const createSparks = useCallback((x: number, y: number) => {
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount;
      sparksRef.current.push({
        x,
        y,
        angle,
        distance: 0,
        startTime: performance.now(),
      });
    }
    startLoop();
  }, [sparkCount, startLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      />
      <div
        className="relative h-full w-full"
        onClick={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            createSparks(e.clientX - rect.left, e.clientY - rect.top);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ClickSpark;
