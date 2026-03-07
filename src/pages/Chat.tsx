import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Send, Bot, User, Wifi, Tag, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cafeterias, type Cafeteria } from "@/data/cafeterias";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  cafes?: Cafeteria[];
}

const mockResponses: { keywords: string[]; text: string; cafeIds: string[] }[] = [
  {
    keywords: ["palermo", "tranquilo", "silencioso"],
    text: "¡Tengo opciones geniales en Palermo para vos! Estos son lugares tranquilos con buen WiFi:",
    cafeIds: ["cafe-palermo", "lab-coffee"],
  },
  {
    keywords: ["wifi", "rápido", "rapido", "internet"],
    text: "Si necesitás WiFi ultra rápido, estas cafeterías son las mejores:",
    cafeIds: ["lab-coffee", "lattente", "cuervo-cafe"],
  },
  {
    keywords: ["barato", "económico", "economico", "precio"],
    text: "Estas cafeterías tienen los mejores precios y son ideales para trabajar:",
    cafeIds: ["birkin-coffee", "origenes"],
  },
  {
    keywords: ["descuento", "oferta", "promo"],
    text: "¡Estas cafeterías tienen descuentos exclusivos con Jama! 🎉",
    cafeIds: ["cafe-palermo", "lattente", "cuervo-cafe", "lab-coffee"],
  },
];

function getResponse(input: string): { text: string; cafes: Cafeteria[] } {
  const lower = input.toLowerCase();
  for (const resp of mockResponses) {
    if (resp.keywords.some(k => lower.includes(k))) {
      return {
        text: resp.text,
        cafes: resp.cafeIds.map(id => cafeterias.find(c => c.id === id)!).filter(Boolean),
      };
    }
  }
  // Default response
  return {
    text: "¡Excelente! Basándome en lo que me contás, te recomiendo estas cafeterías work-friendly:",
    cafes: cafeterias.slice(0, 3),
  };
}

function MiniCafeCard({ cafe }: { cafe: Cafeteria }) {
  return (
    <Link to={`/cafeteria/${cafe.id}`} className="block">
      <div className="glass-card overflow-hidden transition-all hover:border-primary/30 mt-2">
        <div className="flex gap-3 p-3">
          <img src={cafe.images[0]} alt={cafe.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm text-foreground truncate">{cafe.name}</h4>
            <p className="text-xs text-muted-foreground">{cafe.neighborhood}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              <span className="badge-wifi text-[10px] px-1.5 py-0">
                <Wifi className="h-2.5 w-2.5" />
                {cafe.wifiSpeed}Mbps
              </span>
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                {cafe.rating}
              </span>
              {cafe.discount && (
                <span className="badge-discount text-[10px] px-1.5 py-0">
                  <Tag className="h-2.5 w-2.5" />
                  {cafe.discount.percentage}%
                </span>
              )}
            </div>
            <span className="text-[10px] text-primary font-medium mt-1 inline-block">Ver perfil →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! Soy Jama 👋 Contame qué tipo de espacio necesitás para trabajar hoy. Podés decirme la zona, si necesitás WiFi rápido, un lugar tranquilo, o cualquier preferencia.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { text, cafes } = getResponse(input);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        cafes,
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:pt-16">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.cafes && (
                    <div className="mt-2 space-y-2">
                      {msg.cafes.map(cafe => (
                        <MiniCafeCard key={cafe.id} cafe={cafe} />
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse_dot" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse_dot" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse_dot" style={{ animationDelay: "0.4s" }} />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 pb-20 md:pb-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ej: Necesito un lugar tranquilo en Palermo con buen WiFi..."
            className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-primary-gradient rounded-xl px-4 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
