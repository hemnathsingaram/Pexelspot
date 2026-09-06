import { useLenis } from "../hooks/useLenis";
import { Toaster } from "../components/ui/sonner";
import { Nav } from "../components/site/Nav";
import { Hero } from "../components/site/Hero";
import { Ribbon } from "../components/site/Ribbon";
import { Portfolio } from "../components/site/Portfolio";
import { About } from "../components/site/About";
import { Roadmap } from "../components/site/Roadmap";
import { Pricing } from "../components/site/Pricing";
import { Contact } from "../components/site/Contact";
import { Footer } from "../components/site/Footer";
import { ChatWidget } from "../components/site/ChatWidget";

export default function Landing() {
  useLenis();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Ribbon />
        <Portfolio />
        <About />
        <Roadmap />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <Toaster position="top-center" />
    </div>
  );
}
