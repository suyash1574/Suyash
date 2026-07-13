import React, { useEffect, useRef } from 'react';

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId = null;
    let mouse = { x: null, y: null, radius: 120 };

    // Check user preferences for animations
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const initParticles = () => {
      if (motionQuery.matches) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        const color = 'rgba(157, 78, 221, 0.4)'; // Primary accent low opacity

        particles.push({ x, y, directionX, directionY, size, color });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.directionX;
        p.y += p.directionY;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.directionX = -p.directionX;
        if (p.y < 0 || p.y > canvas.height) p.directionY = -p.directionY;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            p.x += dx * 0.01;
            p.y += dy * 0.01;
          }
        }
      }

      // Draw lines
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const p1 = particles[a];
          const p2 = particles[b];
          let dx = p1.x - p2.x;
          let dy = p1.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            let alpha = (1 - (distance / 120)) * 0.15;
            ctx.strokeStyle = `rgba(0, 180, 216, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMotionChange = (e) => {
      if (e.matches) {
        stopAnimation();
      } else {
        initParticles();
        draw();
      }
    };

    const stopAnimation = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];
    };

    // Attach listeners
    if (!motionQuery.matches) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseout', handleMouseLeave);
      motionQuery.addEventListener('change', handleMotionChange);

      initParticles();
      draw();
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      motionQuery.removeEventListener('change', handleMotionChange);
      stopAnimation();
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef}></canvas>;
}
