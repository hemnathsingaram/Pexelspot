import { useState } from "react";
import { Reveal, Overline } from "./Reveal";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { api } from "../../lib/api";

const faqs = [
  {
    q: "How do I share my Lightroom catalog?",
    a: "After onboarding you'll get a secure upload link. You can send a Lightroom catalog (.lrcat with previews), a smart preview package, or simply your RAW files via Dropbox or Google Drive — whatever fits your workflow.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Most galleries are delivered within 48–72 hours of submission. During peak wedding season we agree on a delivery date up front so you always know when to expect your images.",
  },
  {
    q: "Will the edits actually match my style?",
    a: "Yes — that's the whole point. We build a colour and skin profile from your reference galleries before any editing begins, then apply it consistently across the take.",
  },
  {
    q: "Do you offer a trial edit?",
    a: "Absolutely. Send a small set and select 'Trial Edit' in the form below. We'll return a matched sample so you can feel the fit before committing to a full gallery.",
  },
];

const purposes = ["General Inquiry", "Custom Quote", "Trial Edit"];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", purpose: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.purpose) {
      toast.error("Please add your name, email and a purpose.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Thank you — your request is on its way to the studio.");
      setForm({ name: "", email: "", purpose: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 lg:gap-20">
        {/* FAQ */}
        <div id="faq" className="lg:col-span-6">
          <Reveal>
            <Overline>Good to know</Overline>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tighter leading-tight mt-4 mb-8">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger
                    data-testid={`faq-trigger-${i}`}
                    className="text-left font-serif text-lg lg:text-xl tracking-tight hover:no-underline py-5"
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-6">
          <Reveal y={40}>
            <div className="border border-border rounded-md bg-card p-7 lg:p-9 shadow-xl shadow-black/5">
              <h3 className="font-serif text-2xl lg:text-3xl tracking-tight mb-2">Start a conversation</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Tell us what you shoot and where editing is slowing you down.
              </p>
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs tracking-[0.12em] uppercase">Name</Label>
                    <Input
                      data-testid="contact-name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs tracking-[0.12em] uppercase">Email</Label>
                    <Input
                      data-testid="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.12em] uppercase">Purpose</Label>
                  <Select value={form.purpose} onValueChange={(v) => set("purpose", v)}>
                    <SelectTrigger
                      data-testid="contact-purpose"
                      className="rounded-sm border-border focus:ring-0 focus:border-foreground h-11 bg-background"
                    >
                      <SelectValue placeholder="Select a purpose" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {purposes.map((p) => (
                        <SelectItem key={p} value={p} data-testid={`purpose-${p.toLowerCase().replace(/\s/g, "-")}`}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.12em] uppercase">Message</Label>
                  <Textarea
                    data-testid="contact-message"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    rows={4}
                    placeholder="A little about your work and volume…"
                    className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground resize-none"
                  />
                </div>
                <Button
                  data-testid="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-sm bg-foreground text-background hover:bg-foreground/90 h-12 group"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send to the studio
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
