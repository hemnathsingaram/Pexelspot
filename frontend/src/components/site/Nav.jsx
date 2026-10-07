import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { scrollToSection, scrollToTop } from "../../hooks/useLenis";

const links = [
  { label: "Work", href: "#portfolio" },
  { label: "Studio", href: "#about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "#roadmap" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(href), 450);
    } else {
      scrollToSection(href);
    }
  };

  const onLogo = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      window.scrollTo(0, 0);
    } else {
      scrollToTop();
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button data-testid="nav-logo" onClick={onLogo} className="flex items-center group">
          <span className="bg-white rounded-md px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 transition-transform group-hover:-translate-y-0.5">
            <img src="/logo-header.png" alt="Pexel Spot" className="h-8 w-auto" />
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className={`text-sm transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-foreground after:transition-all ${
                l.href === "/services" && location.pathname === "/services"
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            data-testid="nav-cta"
            onClick={() => go("#contact")}
            className="hidden sm:inline-flex rounded-sm bg-foreground text-background hover:bg-foreground/90 hover:-translate-y-0.5 transition-transform"
          >
            Start a trial edit
          </Button>
          <button
            data-testid="nav-menu-toggle"
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.href} onClick={() => go(l.href)} className="text-left text-base text-foreground/80">
                  {l.label}
                </button>
              ))}
              <Button onClick={() => go("#contact")} className="rounded-sm bg-foreground text-background">
                Start a trial edit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
