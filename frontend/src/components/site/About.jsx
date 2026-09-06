import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, Overline } from "./Reveal";

const STORY_IMG =
  "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxwaG90b2dyYXBoZXIlMjB3b3JraW5nJTIwY2FtZXJhJTIwbGVuc3xlbnwwfHx8fDE3ODcxNjUwNzh8MA&ixlib=rb-4.1.0&q=85";

const stats = [
  { k: "500k+", v: "Images retouched" },
  { k: "48hr", v: "Average turnaround" },
  { k: "120+", v: "Photographers served" },
];

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
                I started retouching for photographers after watching too many friends miss dinners,
                birthdays and slow Sunday mornings — buried under thousands of RAW files. Editing
                should protect the life you built your business to enjoy, not eat it alive.
              </p>
              <p>
                Before I touch a single frame, we build a colour and skin profile tuned to your look.
                The result feels like it came straight from your own hand — just delivered days
                sooner, with a fraction of the fatigue.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-6 mt-12 border-t border-border pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.v} delay={0.15 + i * 0.08}>
                <div>
                  <div className="font-serif text-3xl lg:text-4xl tracking-tight">{s.k}</div>
                  <div className="text-xs tracking-[0.14em] uppercase text-muted-foreground mt-2">
                    {s.v}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
