import { useRef, useState, useCallback, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export const BeforeAfterSlider = ({ image, alt, testId }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);

  const move = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      move(x);
    };
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [move]);

  return (
    <div
      ref={ref}
      data-testid={testId}
      className="relative w-full h-full overflow-hidden rounded-md select-none cursor-ew-resize bg-muted"
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      }}
    >
      {/* AFTER (edited) — full color, base layer */}
      <img
        src={image}
        alt={`${alt} edited`}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute bottom-4 right-4 z-10 text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm bg-background/80 backdrop-blur text-foreground">
        After
      </span>

      {/* BEFORE (raw) — desaturated, clipped to left of handle */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={image}
          alt={`${alt} raw`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.35) brightness(0.82) contrast(0.9)" }}
        />
        <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 rounded-sm bg-foreground/70 text-background">
          Before
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-px bg-background/90 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background border border-border shadow-lg shadow-black/10 flex items-center justify-center">
          <MoveHorizontal className="h-4 w-4 text-foreground" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};
