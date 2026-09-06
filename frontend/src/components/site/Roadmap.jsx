import { Reveal, Overline } from "./Reveal";
import { MessageSquare, UploadCloud, Wand2, PackageCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Onboarding",
    icon: MessageSquare,
    body: "We meet over a short call to map your editing style, reference galleries and non-negotiables. You'll get a written style profile you can approve.",
  },
  {
    n: "02",
    title: "Submission",
    icon: UploadCloud,
    body: "Upload your RAW files through a secure, encrypted link — Lightroom catalog, Dropbox or a shared drive. No compression, no fuss.",
  },
  {
    n: "03",
    title: "Processing",
    icon: Wand2,
    body: "I cull the take and edit the gallery to your chosen plan — colour, exposure, crops and retouching consistent from first frame to last.",
  },
  {
    n: "04",
    title: "Delivery & Revisions",
    icon: PackageCheck,
    body: "You receive the finished gallery ready to deliver, with a comfortable window for tweaks until it feels unmistakably yours.",
  },
];

export const Roadmap = () => (
  <section id="roadmap" className="py-24 lg:py-32">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <Reveal className="max-w-3xl mb-16 lg:mb-24">
        <Overline>How it works</Overline>
        <h2 className="font-serif text-4xl lg:text-6xl tracking-tighter leading-tight mt-4">
          Four calm steps between your shoot and a delivered gallery.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 lg:gap-y-20">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative flex gap-6 lg:gap-8">
                <span className="font-serif text-7xl lg:text-8xl leading-none outline-num shrink-0">
                  {s.n}
                </span>
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                    <h3 className="font-serif text-2xl tracking-tight">{s.title}</h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground max-w-md">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
