import { Reveal, Overline } from "./Reveal";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const shots = [
  {
    id: "wedding-embrace",
    image:
      "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZSUyMGJyaWdodHxlbnwwfHx8fDE3ODcxNjUwNzF8MA&ixlib=rb-4.1.0&q=85",
    title: "The First Look",
    tag: "Wedding · Warm film",
    span: "lg:col-span-7",
    h: "h-[70vh]",
  },
  {
    id: "portrait-editorial",
    image:
      "https://images.unsplash.com/photo-1563170446-9c3c0622d8a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwYnJpZ2h0fGVufDB8fHx8MTc4NzE2NTA3MXww&ixlib=rb-4.1.0&q=85",
    title: "Studio Portrait",
    tag: "Portrait · Clean skin",
    span: "lg:col-span-5",
    h: "h-[70vh]",
  },
  {
    id: "ceremony-couple",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZSUyMGJyaWdodHxlbnwwfHx8fDE3ODcxNjUwNzF8MA&ixlib=rb-4.1.0&q=85",
    title: "The Ceremony",
    tag: "Wedding · Airy pastels",
    span: "lg:col-span-12",
    h: "h-[80vh]",
  },
];

export const Portfolio = () => (
  <section id="portfolio" className="py-24 lg:py-32">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-20">
        <div>
          <Overline>Selected work</Overline>
          <h2 className="font-serif text-4xl lg:text-6xl tracking-tighter leading-tight mt-4">
            Drag to see the <span className="italic">magic</span>.
          </h2>
        </div>
        <p className="text-base text-muted-foreground max-w-sm lg:text-right">
          Every frame below is real client work. Pull the handle across each image to reveal the raw
          capture beneath the finished edit.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {shots.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className={s.span}>
            <div className="group">
              <div className={`w-full ${s.h}`}>
                <BeforeAfterSlider image={s.image} alt={s.title} testId={`ba-slider-${s.id}`} />
              </div>
              <div className="flex items-center justify-between mt-4">
                <h3 className="font-serif text-xl tracking-tight">{s.title}</h3>
                <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {s.tag}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
