import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Clock, RefreshCw, CheckCircle } from "lucide-react";

export default function MyQRPage() {
  const [hasQR, setHasQR] = useState(false);
  const [status] = useState<"active" | "redeemed" | "expired">("active");
  const code = "JAMA-A3F8K2";

  const generateQR = () => setHasQR(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-24">
      <div className="w-full max-w-sm">
        {!hasQR ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Mi código QR</h1>
            <p className="text-muted-foreground text-sm mb-8">
              Generá tu QR de descuento para canjearlo en la cafetería
            </p>
            <button onClick={generateQR} className="btn-primary-gradient w-full rounded-xl">
              Generar mi QR
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Tu descuento en</p>
            <h2 className="text-xl font-bold text-foreground mb-1">Café Palermo</h2>
            <p className="text-primary font-semibold mb-6">10% de descuento</p>

            {/* QR Placeholder */}
            <div className="glow-card p-6 mb-6 inline-block mx-auto">
              <div className="w-48 h-48 bg-foreground rounded-lg flex items-center justify-center mx-auto">
                <div className="grid grid-cols-5 gap-1 p-4">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-sm ${
                        [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i)
                          ? "bg-background"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="glass-card p-3 mb-4 inline-block">
              <span className="font-mono text-lg font-bold text-foreground tracking-widest">{code}</span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-4 w-4 text-occupation-low" />
              <span className="text-sm font-medium" style={{ color: status === "active" ? "hsl(142, 71%, 45%)" : "hsl(var(--muted-foreground))" }}>
                {status === "active" ? "Activo" : status === "redeemed" ? "Canjeado" : "Expirado"}
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-6">
              <Clock className="h-3.5 w-3.5" />
              Válido por 24 horas
            </div>

            {/* Instructions */}
            <div className="glass-card p-4 text-left mb-6">
              <p className="text-sm text-muted-foreground">
                📱 Mostrá este código al mozo o cajero para obtener tu descuento
              </p>
            </div>

            <button
              disabled
              className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-muted-foreground text-sm opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Generar nuevo QR
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
