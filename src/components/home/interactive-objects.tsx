"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ShapeKind = "square" | "circle" | "triangle" | "ring" | "bar";

type DecoItem = {
  id: string;
  kind: ShapeKind;
  x: string;
  y: string;
  size: number;
  colors: string[];
  delay: number;
};

const DECOS: DecoItem[] = [
  {
    id: "a",
    kind: "square",
    x: "8%",
    y: "22%",
    size: 56,
    colors: ["#FF4D00", "#ffffff", "#1a1c20", "#ffb089"],
    delay: 0,
  },
  {
    id: "b",
    kind: "circle",
    x: "78%",
    y: "18%",
    size: 44,
    colors: ["#ffffff", "#FF4D00", "#4a8fad", "#c4a574"],
    delay: 0.15,
  },
  {
    id: "c",
    kind: "triangle",
    x: "18%",
    y: "68%",
    size: 52,
    colors: ["#FF4D00", "#f4f2ee", "#6b2d5c", "#1a1c20"],
    delay: 0.25,
  },
  {
    id: "d",
    kind: "ring",
    x: "72%",
    y: "62%",
    size: 64,
    colors: ["#FF4D00", "#ffffff", "#9aa0a8"],
    delay: 0.1,
  },
  {
    id: "e",
    kind: "bar",
    x: "48%",
    y: "78%",
    size: 80,
    colors: ["#FF4D00", "#1a1c20", "#ffffff"],
    delay: 0.2,
  },
  {
    id: "f",
    kind: "square",
    x: "88%",
    y: "42%",
    size: 28,
    colors: ["#ffffff", "#FF4D00"],
    delay: 0.35,
  },
];

function ShapeVisual({
  kind,
  size,
  color,
}: {
  kind: ShapeKind;
  size: number;
  color: string;
}) {
  if (kind === "circle") {
    return (
      <span
        className="block rounded-full shadow-lg"
        style={{ width: size, height: size, background: color }}
      />
    );
  }
  if (kind === "ring") {
    return (
      <span
        className="block rounded-full border-[3px] bg-transparent shadow-lg"
        style={{ width: size, height: size, borderColor: color }}
      />
    );
  }
  if (kind === "triangle") {
    return (
      <span
        className="block"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.35))",
        }}
      />
    );
  }
  if (kind === "bar") {
    return (
      <span
        className="block shadow-lg"
        style={{ width: size, height: size * 0.22, background: color }}
      />
    );
  }
  return (
    <span
      className="block shadow-lg"
      style={{ width: size, height: size, background: color }}
    />
  );
}

function InteractiveObject({ item }: { item: DecoItem }) {
  const [colorIdx, setColorIdx] = useState(0);
  const [jumpKey, setJumpKey] = useState(0);
  const autoColor = useRef<number | null>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 380, damping: 16 });

  // Tự đổi màu định kỳ
  useEffect(() => {
    autoColor.current = window.setInterval(() => {
      setColorIdx((i) => (i + 1) % item.colors.length);
    }, 3200 + item.delay * 1000);
    return () => {
      if (autoColor.current) window.clearInterval(autoColor.current);
    };
  }, [item.colors.length, item.delay]);

  const bounce = useCallback(() => {
    setJumpKey((k) => k + 1);
    y.set(0);
    // spring jump via sequential values
    requestAnimationFrame(() => {
      y.set(-48);
      window.setTimeout(() => y.set(0), 280);
    });
    setColorIdx((i) => (i + 1) % item.colors.length);
  }, [item.colors.length, y]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // nhẹ nhàng nảy khi thả
    if (Math.abs(info.velocity.y) > 200 || Math.abs(info.offset.y) > 40) {
      bounce();
    }
  };

  const color = item.colors[colorIdx % item.colors.length];

  return (
    <motion.button
      type="button"
      aria-label={`Decorative ${item.kind}`}
      className={cn(
        "absolute z-20 touch-none cursor-grab active:cursor-grabbing",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      )}
      style={{ left: item.x, top: item.y, y: springY }}
      drag
      dragMomentum
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 18 }}
      onDragEnd={onDragEnd}
      onClick={bounce}
      initial={{ opacity: 0, scale: 0.4, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.55 + item.delay,
        duration: 0.65,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      key={`${item.id}-${jumpKey}`}
    >
      <motion.div
        animate={{ rotate: item.kind === "bar" ? [0, 8, -6, 0] : [0, 6, 0] }}
        transition={{ duration: 5 + item.delay * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShapeVisual kind={item.kind} size={item.size} color={color} />
      </motion.div>
    </motion.button>
  );
}

export function InteractiveObjects() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div className="pointer-events-auto absolute inset-0">
        {DECOS.map((item) => (
          <InteractiveObject key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
