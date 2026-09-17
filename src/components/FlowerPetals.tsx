"use client";

import React, { useEffect, useRef } from "react";

export default function FlowerPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Re-calculate dimensions on resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Petal configuration
    const numPetals = 35;
    const colors = [
      "rgba(248, 160, 160, ",  // Salmon Pink
      "rgba(240, 199, 192, ",  // Rose Gold Light
      "rgba(224, 168, 153, ",  // Rose Gold
      "rgba(253, 251, 247, ",  // Champagne Nude
    ];

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angleSpeed: number;
      opacity: number;
      baseColor: string;
      swayRange: number;
      swaySpeed: number;
      swayOffset: number;
    }

    const petals: Petal[] = Array.from({ length: numPetals }, () => createPetal(true));

    function createPetal(randomY = false): Petal {
      const size = Math.random() * 8 + 6;
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -20,
        size: size,
        speedY: Math.random() * 0.8 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() * 0.02 - 0.01) * 2,
        opacity: Math.random() * 0.5 + 0.3,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
        swayRange: Math.random() * 15 + 10,
        swaySpeed: Math.random() * 0.01 + 0.005,
        swayOffset: Math.random() * 100,
      };
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.angle);

      // Create a smooth organic petal shape
      ctx.beginPath();
      // Left side curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-petal.size / 2, -petal.size / 3, -petal.size / 2, petal.size, 0, petal.size);
      // Right side curve
      ctx.bezierCurveTo(petal.size / 2, petal.size, petal.size / 2, -petal.size / 3, 0, 0);

      ctx.fillStyle = `${petal.baseColor}${petal.opacity})`;
      ctx.fill();

      // Draw subtle gold center line on some petals for detail
      if (petal.size > 10) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-1, petal.size / 2, 0, petal.size * 0.8);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((petal, i) => {
        // Move downwards and sway horizontally using a sine wave
        petal.y += petal.speedY;
        petal.angle += petal.angleSpeed;
        
        // Horizontal sway calculation
        petal.swayOffset += petal.swaySpeed;
        const sway = Math.sin(petal.swayOffset) * petal.swayRange;
        petal.x += petal.speedX + sway * 0.02;

        // Reset petal if it flows offscreen
        if (petal.y > height + 20 || petal.x < -20 || petal.x > width + 20) {
          petals[i] = createPetal(false);
        }

        drawPetal(ctx, petal);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30" />;
}
