import { Overline } from "./Reveal";
import { scrollToSection } from "../../hooks/useLenis";

export const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-serif text-2xl tracking-tight">Aura</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-background/60">Retouch</span>
          </div>
          <p className="font-serif text-3xl lg:text-5xl tracking-tighter leading-tight max-w-xl">
            Let's get your evenings back.
          </p>
        </div>
        <div className="lg:col-span-3">
          <span className="text-xs tracking-[0.2em] uppercase text-background/50">Explore</span>
          <ul className="mt-5 space-y-3 text-background/80">
            {["Work", "Studio", "Process", "Pricing", "FAQ"].map((l) => (
              <li key={l}>
                <button
                  onClick={() =>
                    scrollToSection(`#${l === "Work" ? "portfolio" : l === "Studio" ? "about" : l === "Process" ? "roadmap" : l.toLowerCase()}`)
                  }
                  className="hover:text-background transition-colors"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <span className="text-xs tracking-[0.2em] uppercase text-background/50">Contact</span>
          <ul className="mt-5 space-y-3 text-background/80">
            <li><a href="mailto:studio@auraretouch.com" className="hover:text-background transition-colors">studio@auraretouch.com</a></li>
            <li className="text-background/60 text-sm">Remote · Worldwide</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-background/15 flex flex-col sm:flex-row justify-between gap-4 text-xs text-background/50">
        <span>© {new Date().getFullYear()} Aura Retouch. All rights reserved.</span>
        <span>Post-production for wedding & portrait photographers.</span>
      </div>
    </div>
  </footer>
);
