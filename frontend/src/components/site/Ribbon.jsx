import Marquee from "react-fast-marquee";

export const Ribbon = () => (
  <section className="py-10 lg:py-14 border-y border-border bg-foreground text-background overflow-hidden">
    <Marquee speed={38} gradient={false} autoFill>
      <div className="flex items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif text-4xl lg:text-6xl tracking-tight px-8 lg:px-12">
              Elevate your art
            </span>
            <span className="text-background/40 text-3xl lg:text-5xl">✦</span>
            <span className="font-serif italic text-4xl lg:text-6xl tracking-tight px-8 lg:px-12">
              Reclaim your time
            </span>
            <span className="text-background/40 text-3xl lg:text-5xl">✦</span>
          </span>
        ))}
      </div>
    </Marquee>
  </section>
);
