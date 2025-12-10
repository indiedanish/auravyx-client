"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
  colorScheme?: "green" | "sage" | "peach";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
  waveAmplitude: number;
  waveFrequency: number;
  waveOffset: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 140 + Math.random() * 40, // Green range: 140-180
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
    waveAmplitude: 30 + Math.random() * 50, // How wide the wave
    waveFrequency: 0.002 + Math.random() * 0.003, // How frequent the waves
    waveOffset: Math.random() * Math.PI * 2, // Starting position in wave
  };
}

export default function BeamsBackground({
  className,
  children,
  intensity = "subtle",
  colorScheme = "green",
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const MINIMUM_BEAMS = 15;

  const opacityMap = {
    subtle: 0.6,
    medium: 0.8,
    strong: 1.0,
  };

  const hueRanges = {
    green: { base: 140, range: 40 }, // 140-180 (green)
    sage: { base: 120, range: 50 }, // 120-170 (sage/green)
    peach: { base: 20, range: 30 }, // 20-50 (peach/orange)
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.2;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;

      const column = index % 3;
      const spacing = canvas.width / 3;

      beam.y = canvas.height + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      
      const hueConfig = hueRanges[colorScheme];
      beam.hue = hueConfig.base + (index * hueConfig.range) / totalBeams;
      beam.opacity = 0.25 + Math.random() * 0.15;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];

      // Calculate mouse influence
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const distanceToMouse = Math.sqrt(
        Math.pow(beam.x - mouseX, 2) + Math.pow(beam.y - mouseY, 2)
      );
      
      // Mouse influence radius (400px) - closer = stronger effect
      const influenceRadius = 400;
      const mouseInfluence = Math.max(0, 1 - distanceToMouse / influenceRadius);

      // Create wave path
      ctx.beginPath();
      const segments = 100;
      const segmentLength = beam.length / segments;

      for (let i = 0; i <= segments; i++) {
        const segmentY = i * segmentLength;
        
        // Calculate segment's distance to mouse
        const segmentWorldY = beam.y + segmentY;
        const segmentDistance = Math.sqrt(
          Math.pow(beam.x - mouseX, 2) + Math.pow(segmentWorldY - mouseY, 2)
        );
        const segmentInfluence = Math.max(0, 1 - segmentDistance / influenceRadius);
        
        // Apply dynamic wave with mouse influence (subtle)
        const dynamicAmplitude = beam.waveAmplitude * (1 + segmentInfluence * 0.5); // Up to 1.5x amplitude
        const dynamicFrequency = beam.waveFrequency * (1 + segmentInfluence * 0.3); // Up to 1.3x frequency
        
        const waveX = Math.sin(segmentY * dynamicFrequency + beam.waveOffset) * dynamicAmplitude;
        
        if (i === 0) {
          ctx.moveTo(waveX - beam.width / 2, segmentY);
        } else {
          ctx.lineTo(waveX - beam.width / 2, segmentY);
        }
      }

      // Complete the wave shape
      for (let i = segments; i >= 0; i--) {
        const segmentY = i * segmentLength;
        
        // Calculate segment's distance to mouse (again for right side)
        const segmentWorldY = beam.y + segmentY;
        const segmentDistance = Math.sqrt(
          Math.pow(beam.x - mouseX, 2) + Math.pow(segmentWorldY - mouseY, 2)
        );
        const segmentInfluence = Math.max(0, 1 - segmentDistance / influenceRadius);
        
        const dynamicAmplitude = beam.waveAmplitude * (1 + segmentInfluence * 0.5); // Subtle effect
        const dynamicFrequency = beam.waveFrequency * (1 + segmentInfluence * 0.3); // Subtle effect
        
        const waveX = Math.sin(segmentY * dynamicFrequency + beam.waveOffset) * dynamicAmplitude;
        ctx.lineTo(waveX + beam.width / 2, segmentY);
      }

      ctx.closePath();

      // Create gradient along the wave
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.6})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.6})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        beam.waveOffset += 0.02; // Animate the wave motion

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, colorScheme]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

