import { useState } from "react";
import { Reveal, Overline } from "./Reveal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { scrollToSection } from "../../hooks/useLenis";
import { api } from "../../lib/api";

const cols = ["Plan", "Max submitted", "Final delivered", "Revisions", "Service", "Price", ""];

const plans = [
  { name: "Basic", max: "Up to 1,000", final: "180 – 250", rev: "1", service: "Culling only", price: "$100" },
  { name: "Basic Plus", max: "Up to 1,000", final: "180 – 250", rev: "1", service: "Culling & editing", price: "$140" },
  { name: "Standard", max: "Up to 2,500", final: "300 – 500", rev: "2", service: "Culling & editing", price: "$250", featured: true },
  { name: "Premium", max: "2,500 – 4,000", final: "500 – 800", rev: "3", service: "Culling & editing", price: "$450" },
  { name: "Custom", max: "Flexible", final: "Flexible", rev: "Flexible", service: "Tailored to you", price: "Custom" },
];

const GRID = "grid-cols-[1.1fr_0.9fr_0.9fr_0.7fr_1fr_0.8fr_auto]";

export const Pricing = () => {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", studio: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openFor = (plan) => {
    setForm({ name: "", email: "", phone: "", studio: "", message: "" });
    setSelected(plan);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please add your name and email.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/plan-selection", {
        plan: selected.name,
        price: selected.price,
        name: form.name,
        email: form.email,
        phone: form.phone,
        studio: form.studio,
        message: form.message,
      });
      toast.success(`Thanks — your interest in the ${selected.name} plan is on its way to the studio.`);
      setSelected(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-muted/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div>
            <Overline>Investment</Overline>
            <h2 className="font-serif text-4xl lg:text-6xl tracking-tighter leading-tight mt-4">
              Transparent, per-gallery pricing.
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-sm lg:text-right">
            Pick a tier per event and we'll be in touch straight away — no subscriptions, no
            surprises.
          </p>
        </Reveal>

        {/* Desktop table */}
        <Reveal className="hidden lg:block">
          <div className="border border-border rounded-md overflow-hidden bg-background">
            <div className={`grid ${GRID} bg-foreground text-background text-xs tracking-[0.16em] uppercase`}>
              {cols.map((c, i) => (
                <div key={i} className="px-6 py-4 font-semibold">{c}</div>
              ))}
            </div>
            {plans.map((p) => (
              <div
                key={p.name}
                data-testid={`pricing-row-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                className={`grid ${GRID} items-center border-t border-border transition-colors hover:bg-muted/60 ${
                  p.featured ? "bg-accent/60" : ""
                }`}
              >
                <div className="px-6 py-6 flex items-center gap-2">
                  <span className="font-serif text-xl tracking-tight">{p.name}</span>
                  {p.featured && (
                    <span className="text-[10px] tracking-[0.14em] uppercase bg-foreground text-background px-2 py-0.5 rounded-sm">
                      Popular
                    </span>
                  )}
                </div>
                <div className="px-6 py-6 text-sm text-muted-foreground">{p.max}</div>
                <div className="px-6 py-6 text-sm text-muted-foreground">{p.final}</div>
                <div className="px-6 py-6 text-sm text-muted-foreground">{p.rev}</div>
                <div className="px-6 py-6 text-sm text-muted-foreground">{p.service}</div>
                <div className="px-6 py-6 font-serif text-2xl tracking-tight">{p.price}</div>
                <div className="px-6 py-6">
                  <Button
                    data-testid={`choose-plan-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => openFor(p)}
                    size="sm"
                    className="rounded-sm bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap"
                  >
                    Choose
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile cards */}
        <div className="lg:hidden grid gap-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className={`border border-border rounded-md p-6 bg-background ${p.featured ? "ring-1 ring-foreground" : ""}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl tracking-tight">{p.name}</span>
                  <span className="font-serif text-2xl">{p.price}</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /> Max submitted: {p.max}</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /> Delivered: {p.final}</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /> Revisions: {p.rev}</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /> {p.service}</li>
                </ul>
                <Button
                  data-testid={`choose-plan-mobile-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => openFor(p)}
                  className="w-full rounded-sm bg-foreground text-background hover:bg-foreground/90"
                >
                  Choose {p.name}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center lg:justify-start">
          <Button
            data-testid="pricing-cta"
            variant="ghost"
            onClick={() => scrollToSection("#contact")}
            className="rounded-sm h-12 px-2 group text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            Not sure which fits? Ask us
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Reveal>
      </div>

      {/* Plan selection dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md rounded-md bg-background" data-testid="plan-dialog">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-tight">
              {selected ? `${selected.name} plan` : ""}{" "}
              <span className="text-muted-foreground">{selected?.price}</span>
            </DialogTitle>
            <DialogDescription>
              Leave your details and we'll reach out to get your gallery started right away.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-xs tracking-[0.12em] uppercase">Name</Label>
              <Input
                data-testid="plan-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-[0.12em] uppercase">Email</Label>
              <Input
                data-testid="plan-email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-[0.12em] uppercase">Contact number</Label>
              <Input
                data-testid="plan-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-[0.12em] uppercase">Studio / Photography name</Label>
              <Input
                data-testid="plan-studio"
                value={form.studio}
                onChange={(e) => set("studio", e.target.value)}
                className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-[0.12em] uppercase">Anything to add? (optional)</Label>
              <Textarea
                data-testid="plan-message"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={3}
                placeholder="Event date, volume, style notes…"
                className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground resize-none"
              />
            </div>
            <Button
              data-testid="plan-submit"
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-foreground text-background hover:bg-foreground/90 h-12 group"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Choose this plan
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
