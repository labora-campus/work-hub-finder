import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wifi, VolumeX, Volume1, Volume2, Plug, Clock, Tag,
  ChevronLeft, ChevronRight, MapPin, Star, QrCode
} from "lucide-react";
import { getCafeById } from "@/data/cafeterias";

export default function CafeProfilePage() {
  const { id } = useParams();
  const cafe = getCafeById(id || "");
  const [imgIndex, setImgIndex] = useState(0);

  if (!cafe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cafetería no encontrada</p>
      </div>
    );
  }

  const NoiseIcon = cafe.noiseLevel === "silencioso" ? VolumeX : cafe.noiseLevel === "moderado" ? Volume1 : Volume2;

  return (
    <div className="min-h-screen pb-28 md:pb-8 md:pt-16">
      {/* Image carousel */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={cafe.images[imgIndex]}
          alt={cafe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {cafe.images.length > 1 && (
          <>
            <button
              onClick={() => setImgIndex((imgIndex - 1 + cafe.images.length) % cafe.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              onClick={() => setImgIndex((imgIndex + 1) % cafe.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {cafe.images.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === imgIndex ? "bg-primary" : "bg-foreground/30"}`} />
          ))}
        </div>
        <Link to="/buscar" className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center">
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{cafe.name}</h1>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {cafe.address}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{cafe.rating}</span>
              <span className="text-sm text-muted-foreground">({cafe.reviewCount} reseñas)</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Wifi, label: "WiFi", value: `${cafe.wifiSpeed} Mbps` },
              { icon: NoiseIcon, label: "Ruido", value: cafe.noiseLevel.charAt(0).toUpperCase() + cafe.noiseLevel.slice(1) },
              { icon: Plug, label: "Enchufes", value: cafe.hasPlugs ? "Disponibles" : "No" },
              { icon: Tag, label: "Precio", value: cafe.priceRange },
            ].map((m, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <m.icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
                <div className="text-xs text-muted-foreground mb-0.5">{m.label}</div>
                <div className="text-sm font-semibold text-foreground">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Hours */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Horarios
            </h2>
            <div className="glass-card p-4">
              {Object.entries(cafe.hours).map(([day, time]) => (
                <div key={day} className="flex justify-between py-1.5 text-sm border-b border-border last:border-0">
                  <span className="text-muted-foreground">{day}</span>
                  <span className="text-foreground font-medium">{time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Menu */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Menú destacado</h2>
            <div className="glass-card p-4">
              {cafe.menu.map((item, i) => (
                <div key={i} className="flex justify-between py-1.5 text-sm border-b border-border last:border-0">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">${item.price.toLocaleString("es-AR")}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Occupation chart */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Ocupación estimada</h2>
            <div className="glass-card p-4">
              <div className="flex items-end gap-3 h-32">
                {cafe.occupationByTime.map((t, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">{t.value}%</span>
                    <div className="w-full rounded-t-md relative" style={{ height: `${t.value}%` }}>
                      <div
                        className={`w-full h-full rounded-t-md ${
                          t.value < 40 ? "occupation-low" : t.value < 70 ? "occupation-medium" : "occupation-high"
                        } opacity-80`}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Discount */}
          {cafe.discount && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Descuento Jama</h2>
              <div className="glow-card p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{cafe.discount.percentage}% OFF</div>
                <p className="text-sm text-muted-foreground mb-4">{cafe.discount.description}</p>
                <Link to="/mi-qr" className="btn-primary-gradient inline-flex items-center gap-2 rounded-xl">
                  <QrCode className="h-4 w-4" />
                  Generar mi QR
                </Link>
              </div>
            </section>
          )}

          {/* Reviews placeholder */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Reseñas</h2>
            <div className="glass-card p-8 text-center">
              <p className="text-muted-foreground text-sm">Próximamente</p>
            </div>
          </section>

          {/* Map placeholder */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Ubicación</h2>
            <div className="glass-card p-0 overflow-hidden rounded-xl h-48 flex items-center justify-center bg-secondary">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{cafe.address}</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>

      {/* Mobile sticky CTA */}
      {cafe.discount && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-background/90 backdrop-blur border-t border-border z-30">
          <Link to="/mi-qr" className="btn-primary-gradient w-full flex items-center justify-center gap-2 rounded-xl text-center">
            <QrCode className="h-4 w-4" />
            Obtener {cafe.discount.percentage}% de descuento
          </Link>
        </div>
      )}
    </div>
  );
}
