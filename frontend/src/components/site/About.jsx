import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, Overline } from "./Reveal";

const STORY_IMG =
  "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxwaG90b2dyYXBoZXIlMjB3b3JraW5nJTIwY2FtZXJhJTIwbGVuc3xlbnwwfHx8fDE3ODcxNjUwNzh8MA&ixlib=rb-4.1.0&q=85";

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="py-24 lg:py-32 bg-muted/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <Overline>The studio</Overline>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tighter leading-tight mt-4 mb-8">
              A quiet obsession with matching <span className="italic">your</span> style.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground max-w-xl">
              <p>
                With years of dedicated experience editing weddings and portraits, we know exactly
                how to protect a photographer's signature look while turning galleries around fast.
              </p>
              <p>
                Every image is culled and edited in <span className="text-foreground font-medium">genuine, licensed Adobe Lightroom</span>,
                with <span className="text-foreground font-medium">Adobe Photoshop</span> brought in for detailed retouching and any
                additional work — so your files are handled on professional, fully licensed software
                from start to finish.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-3 mt-10 border-t border-border pt-8">
              <span className="text-xs tracking-[0.14em] uppercase text-muted-foreground mr-1">
                Edited on
              </span>
              <span className="text-sm font-medium px-3 py-1.5 rounded-sm border border-border bg-background">
                Licensed Adobe Lightroom
              </span>
              <span className="text-sm font-medium px-3 py-1.5 rounded-sm border border-border bg-background">
                Adobe Photoshop
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal y={40}>
            <div ref={ref} className="relative overflow-hidden rounded-md h-[60vh] lg:h-[74vh]">
              <motion.img
                src={STORY_IMG}
                alt="Photographer at work"
                style={{ y }}
                className="absolute inset-0 w-full h-[116%] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
