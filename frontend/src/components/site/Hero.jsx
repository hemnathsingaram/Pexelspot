import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { api } from "../../lib/api";

const HERO_IMG =
  "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZSUyMGJyaWdodHxlbnwwfHx8fDE3ODcxNjUwNzF8MA&ixlib=rb-4.1.0&q=85";

const lines = ["Reclaim your", "evenings.", "We edit while", "you shoot."];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      await api.post("/enquiry", { question });
      toast.success("Question received — we'll be in touch shortly.");
      setQuestion("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="relative pt-24 lg:pt-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Headline */}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-8 lg:mb-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-foreground/40" />
              <span className="text-xs tracking-[0.24em] uppercase font-semibold text-muted-foreground">
                Post-production for wedding & portrait photographers
              </span>
            </motion.div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl tracking-tighter leading-[1.04]">
              {lines.map((line, i) => (
                <span key={i} className="reveal-mask">
                  <motion.span
                    className="block"
                    variants={lineVariants}
                    custom={i}
                    initial="hidden"
                    animate="show"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="lg:col-span-4 lg:pb-3"
          >
            <p className="text-base leading-relaxed text-muted-foreground max-w-sm">
              Cull, colour and retouch delivered in your signature style — so your galleries go out
              faster and your weekends come back.
            </p>
          </motion.div>
        </div>

        {/* Hero image with parallax + floating enquiry box */}
        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(12% 8% 12% 8% round 8px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 8px)" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-md h-[62vh] lg:h-[78vh]"
          >
            <motion.img
              src={HERO_IMG}
              alt="Beautifully edited wedding photograph"
              style={{ y, scale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </motion.div>

          {/* Floating enquiry box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:max-w-2xl mt-6 lg:mt-0 z-20"
          >
            <div className="backdrop-blur-xl bg-background/80 border border-border rounded-md shadow-2xl shadow-black/10 p-6 lg:p-7">
              <p className="font-serif text-xl lg:text-2xl tracking-tight mb-4">
                Overwhelmed with editing? Drop your question here.
              </p>
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  data-testid="enquiry-input"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Can you match my warm film look?"
                  className="flex-1 rounded-sm border-border bg-background focus-visible:ring-0 focus-visible:border-foreground h-11"
                />
                <Button
                  data-testid="enquiry-submit"
                  type="submit"
                  disabled={loading}
                  className="rounded-sm bg-foreground text-background hover:bg-foreground/90 h-11 px-5 group"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Ask us
                      <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* spacer to accommodate the overlapping floating box on desktop */}
      <div className="hidden lg:block h-24" />
    </section>
  );
};
