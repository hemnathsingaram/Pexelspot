import { Reveal, Overline } from "./Reveal";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const shots = [
  { id: "first-look", image: "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "The First Look", tag: "Wedding · Warm film", span: "lg:col-span-7", h: "lg:h-[68vh]" },
  { id: "garden-embrace", image: "https://images.unsplash.com/photo-1580824456266-c578703e13da?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "Garden Embrace", tag: "Wedding · Soft pastels", span: "lg:col-span-5", h: "lg:h-[68vh]" },
  { id: "the-bouquet", image: "https://images.unsplash.com/photo-1591604442449-ecc9943efabf?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "The Bouquet", tag: "Bridal · Airy light", span: "lg:col-span-4", h: "lg:h-[54vh]" },
  { id: "vows", image: "https://images.unsplash.com/photo-1672288336066-8cd91b57b510?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "The Vows", tag: "Detail · Golden hour", span: "lg:col-span-4", h: "lg:h-[54vh]" },
  { id: "the-ring", image: "https://images.unsplash.com/photo-1523369579000-4ec0fe04db44?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "The Ring", tag: "Ceremony · Timeless B&W", span: "lg:col-span-4", h: "lg:h-[54vh]" },
  { id: "street-portrait", image: "https://images.unsplash.com/photo-1606217239582-d9f72323bcd7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "City Portrait", tag: "Wedding · Crisp & clean", span: "lg:col-span-5", h: "lg:h-[66vh]" },
  { id: "the-aisle", image: "https://images.unsplash.com/photo-1606490208247-b65be3d94cd1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "Down the Aisle", tag: "Wedding · Sunlit tones", span: "lg:col-span-7", h: "lg:h-[66vh]" },
  { id: "bride-field", image: "https://images.unsplash.com/photo-1693074446713-aad8855c20d7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "Bride in the Field", tag: "Bridal · Earthy warmth", span: "lg:col-span-7", h: "lg:h-[70vh]" },
  { id: "window-light", image: "https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "Window Light", tag: "Bridal · Moody edit", span: "lg:col-span-5", h: "lg:h-[70vh]" },
  { id: "getting-ready", image: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", title: "Getting Ready", tag: "Bridal · Backlit glow", span: "lg:col-span-12", h: "lg:h-[82vh]" },
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
          A selection of wedding galleries. Pull the handle across each image to reveal the raw
          capture beneath the finished edit.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {shots.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 0.08} className={s.span}>
            <div className="group">
              <div className={`w-full h-[62vh] ${s.h}`}>
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
