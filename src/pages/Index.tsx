import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Search, Wifi, Users, Coffee, QrCode, ArrowRight, Zap, MapPin } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Contale a Jama qué necesitás",
    description: "Hablá con nuestro agente de IA o usá los filtros para encontrar tu espacio ideal.",
  },
  {
    icon: MapPin,
    title: "Elegí tu cafetería ideal",
    description: "Compará WiFi, ruido, enchufes y precios. Toda la info verificada.",
  },
  {
    icon: QrCode,
    title: "Mostrá tu QR y disfrutá",
    description: "Generá tu código QR con descuento exclusivo y canjealo en el local.",
  },
];

const stats = [
  { value: "+50", label: "Cafeterías", icon: Coffee },
  { value: "+1000", label: "Workers", icon: Users },
  { value: "✓", label: "WiFi verificado", icon: Wifi },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(351 79% 59%)" }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8">
            <Zap className="h-3 w-3 text-primary" />
            Powered by IA · Buenos Aires
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6">
            Tu espacio de trabajo ideal,{" "}
            <span className="text-primary">siempre cerca</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Encontrá cafeterías con buen WiFi, enchufes y ambiente tranquilo para trabajar. Recomendaciones personalizadas con IA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat" className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-base">
              <MessageSquare className="h-5 w-5" />
              Buscar con IA
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/buscar"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-secondary/50 text-foreground font-semibold text-base transition-all hover:bg-secondary hover:border-primary/30"
            >
              <Search className="h-5 w-5" />
              Explorar cafeterías
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-14"
          >
            ¿Cómo funciona?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-semibold text-primary mb-2">Paso {i + 1}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-around gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4 pb-24 md:pb-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">Jama</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Jama. Todos los derechos reservados. Buenos Aires, Argentina.
          </p>
        </div>
      </footer>
    </div>
  );
}
