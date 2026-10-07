import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLenis, scrollToSection } from "../hooks/useLenis";
import { Toaster } from "../components/ui/sonner";
import { Button } from "../components/ui/button";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { ChatWidget } from "../components/site/ChatWidget";
import { Reveal, Overline } from "../components/site/Reveal";

const IMG = {
  hero: "https://images.unsplash.com/photo-1536724609414-5f000e9a2745?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  lightroom: "https://images.unsplash.com/photo-1455894127589-22f75500213a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  photoshop: "https://images.unsplash.com/photo-1645226065134-bd78d2107da7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  workspace: "https://images.unsplash.com/photo-1579109652910-99b9be06aaec?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  manipulation: "https://images.unsplash.com/photo-1675285301978-fa577795ce61?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  adobe: "https://images.pexels.com/photos/1336858/pexels-photo-1336858.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1400",
  catalog: "https://images.pexels.com/photos/7679440/pexels-photo-7679440.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1400",
};

const services = [
  {
    n: "01",
    title: "Culling & Color Correction",
    kicker: "The Essentials",
    image: IMG.lightroom,
    soft: "Lightroom",
    intro:
      "The foundation of a beautiful wedding gallery is consistency. We streamline your workflow by organizing your shoot and establishing a cohesive look across the entire event.",
    items: [
      ["Image Culling", "We meticulously review thousands of raw files to select only the sharpest, most emotive frames — eliminating duplicates, closed eyes and missed focus, delivering a curated story of the day."],
      ["Color Correction", "Precision adjustments to exposure, contrast, highlights and shadows to ensure perfect lighting in every shot."],
      ["Custom Color Grading", "We match your signature aesthetic — light and airy, dark and moody, cinematic or true-to-color — applied consistently across all lighting environments."],
      ["Cropping & Straightening", "Re-framing shots for maximum impact and ensuring horizons and architectural lines are perfectly level."],
    ],
  },
  {
    n: "02",
    title: "Portrait & Beauty Retouching",
    kicker: "Natural, flattering detail",
    image: IMG.photoshop,
    soft: "Photoshop",
    intro:
      "We ensure the couple and their guests look their absolute best while retaining natural textures and realistic features.",
    items: [
      ["Skin Smoothing & Tone Balancing", "Using advanced frequency separation, we remove blemishes, acne and temporary scars without creating an artificial, plastic look."],
      ["Facial Enhancements", "Subtle teeth whitening, eye brightening and red-eye correction to make portraits pop."],
      ["Hair & Wardrobe Fixes", "Taming flyaway hairs, removing lint, smoothing distracting wrinkles on the dress or suit, and restoring true fabric colors."],
    ],
  },
  {
    n: "03",
    title: "Advanced Photo Manipulation",
    kicker: "Rescuing the perfect moment",
    image: IMG.manipulation,
    soft: "Photoshop",
    intro:
      "Sometimes the perfect moment happens in an imperfect setting. Our advanced manipulation services rescue great shots from distracting elements.",
    items: [
      ["Distraction & Object Removal", "Erasing unsightly exit signs, power lines, trash cans, microphones or stray venue staff from the background."],
      ["Head Swaps", "Saving group family portraits by seamlessly blending faces from multiple frames so everyone is smiling with their eyes open."],
      ["Adding / Removing People", "Expertly removing an unwanted photobomber, or seamlessly adding a missing family member into a group shot using reference photos."],
      ["Sky Replacement", "Transforming blown-out, overcast skies into dramatic sunsets or textured clouds to elevate outdoor portraits."],
    ],
  },
  {
    n: "04",
    title: "Specialized Edits & Album Preparation",
    kicker: "Ready for print & delivery",
    image: IMG.catalog,
    soft: "Lightroom + Photoshop",
    intro:
      "Beyond individual photo edits, we prepare your gallery for final delivery and print.",
    items: [
      ["HDR Blending & Flambient Editing", "Combining multiple exposures to balance harsh window light in indoor venues like dark churches, or backlit sunset portraits."],
      ["Black & White Conversions", "Hand-selecting emotionally impactful moments and converting them into rich, high-contrast monochrome images."],
      ["Custom Album Design", "Creating story-driven, beautifully structured layouts ready for your print lab or digital client gallery."],
    ],
  },
];

export default function Services() {
  useLenis();
  const navigate = useNavigate();

  const toContact = () => {
    navigate("/");
    setTimeout(() => scrollToSection("#contact"), 450);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-28 lg:pt-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <Reveal>
              <Overline>About us & services</Overline>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[1.04] mt-5 max-w-4xl">
                Raw captures, transformed into <span className="italic">timeless</span> memories.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base lg:text-lg leading-relaxed text-muted-foreground max-w-2xl mt-8">
                Welcome to <span className="text-foreground font-medium">PexelSpot</span> — where we
                transform raw wedding captures into flawless, timeless memories. Whether you are a
                high-volume wedding photographer looking to scale your business or a couple wanting
                to perfect your final album, our expert post-production team handles the heavy
                lifting. Explore our comprehensive suite of wedding photo editing services, designed
                to match your unique style and requirements.
              </p>
            </Reveal>
            <Reveal y={40} delay={0.15}>
              <div className="relative overflow-hidden rounded-md h-[48vh] lg:h-[62vh] mt-12">
                <motion.img
                  src={IMG.hero}
                  alt="Editing a wedding gallery in Lightroom"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 flex gap-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-sm bg-background/85 backdrop-blur">
                    Licensed Adobe Lightroom
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-sm bg-background/85 backdrop-blur">
                    Adobe Photoshop
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Service categories */}
        <section className="py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-24 lg:space-y-36">
            {services.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={s.n}
                  data-testid={`service-${s.n}`}
                  className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  <Reveal
                    y={40}
                    className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}
                  >
                    <div className="relative overflow-hidden rounded-md h-[52vh] lg:h-[64vh]">
                      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-sm bg-background/85 backdrop-blur">
                        Edited in {s.soft}
                      </span>
                    </div>
                  </Reveal>

                  <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                    <Reveal>
                      <div className="flex items-center gap-4 mb-5">
                        <span className="font-serif text-6xl lg:text-7xl leading-none outline-num">{s.n}</span>
                        <Overline>{s.kicker}</Overline>
                      </div>
                      <h2 className="font-serif text-3xl lg:text-5xl tracking-tighter leading-tight mb-5">
                        {s.title}
                      </h2>
                      <p className="text-base leading-relaxed text-muted-foreground max-w-xl mb-8">
                        {s.intro}
                      </p>
                    </Reveal>
                    <ul className="space-y-5">
                      {s.items.map(([term, desc], j) => (
                        <Reveal key={term} delay={0.05 + j * 0.06}>
                          <li className="flex gap-4">
                            <span className="mt-1 shrink-0 h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center">
                              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </span>
                            <p className="text-base leading-relaxed">
                              <span className="font-serif text-lg tracking-tight">{term}:</span>{" "}
                              <span className="text-muted-foreground">{desc}</span>
                            </p>
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Licensed software strip */}
        <section className="py-20 lg:py-28 bg-muted/40 border-y border-border">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-6">
              <Overline>Professional, licensed tools</Overline>
              <h2 className="font-serif text-3xl lg:text-5xl tracking-tighter leading-tight mt-4 mb-6">
                Every frame handled on genuine Adobe software.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground max-w-xl">
                From the first cull to the final retouch, your images are edited exclusively in
                fully licensed <span className="text-foreground font-medium">Adobe Lightroom</span>{" "}
                and <span className="text-foreground font-medium">Adobe Photoshop</span> — the
                industry standard trusted by professional photographers worldwide.
              </p>
            </Reveal>
            <Reveal y={40} className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-md h-[42vh] lg:h-[50vh]">
                <img src={IMG.adobe} alt="Adobe Lightroom and Photoshop" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <Reveal className="text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl lg:text-6xl tracking-tighter leading-tight">
                Ready to get your time back?
              </h2>
              <p className="text-base lg:text-lg leading-relaxed text-muted-foreground mt-6">
                Get in touch today for a custom quote, or send us a few test images to see exactly
                how we match your editing style.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
                <Button
                  data-testid="services-cta-quote"
                  onClick={toContact}
                  className="rounded-sm bg-foreground text-background hover:bg-foreground/90 hover:-translate-y-0.5 transition-transform h-12 px-7 group"
                >
                  Request a custom quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  data-testid="services-cta-trial"
                  variant="outline"
                  onClick={toContact}
                  className="rounded-sm h-12 px-7 border-foreground/20 hover:bg-foreground hover:text-background"
                >
                  Send a trial edit
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
      <Toaster position="top-center" />
    </div>
  );
}
