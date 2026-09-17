import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { api } from "../../lib/api";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      await api.post("/chat", { name, message });
      setSent(true);
      setName("");
      setMessage("");
      toast.success("Message saved — we'll reply by email soon.");
    } catch {
      toast.error("Couldn't send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[88vw] max-w-sm backdrop-blur-xl bg-background/90 border border-border rounded-md shadow-2xl shadow-black/20 overflow-hidden"
          >
            <div className="bg-foreground text-background px-5 py-4">
              <p className="font-serif text-lg tracking-tight">Chat with the studio</p>
              <p className="text-xs text-background/70 mt-0.5">Usually replies within a few hours</p>
            </div>
            <div className="p-5">
              {sent ? (
                <div className="text-center py-6">
                  <p className="font-serif text-xl tracking-tight mb-2">Message received ✦</p>
                  <p className="text-sm text-muted-foreground mb-5">
                    Thanks for reaching out — we'll be in touch shortly.
                  </p>
                  <Button
                    data-testid="chat-new-message"
                    variant="outline"
                    onClick={() => setSent(false)}
                    className="rounded-sm"
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <Input
                    data-testid="chat-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground h-10"
                  />
                  <Textarea
                    data-testid="chat-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={3}
                    className="rounded-sm border-border focus-visible:ring-0 focus-visible:border-foreground resize-none"
                  />
                  <Button
                    data-testid="chat-send"
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-sm bg-foreground text-background hover:bg-foreground/90 h-10"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send message <Send className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        data-testid="chat-toggle"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="ml-auto flex items-center justify-center h-14 w-14 rounded-full bg-white text-foreground shadow-xl shadow-black/25 ring-1 ring-black/5"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <img src="/logo-mark.webp" alt="Chat with Pexel Spot" className="h-8 w-8 object-contain" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
