import { useState } from "react";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CafeCard } from "@/components/CafeCard";
import { cafeterias, neighborhoods, filterCafeterias, type NoiseLevel, type PriceRange } from "@/data/cafeterias";

export default function SearchPage() {
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [noiseLevel, setNoiseLevel] = useState<NoiseLevel | "">("");
  const [wifiSpeed, setWifiSpeed] = useState<string>("");
  const [hasPlugs, setHasPlugs] = useState<boolean | undefined>();
  const [priceRange, setPriceRange] = useState<PriceRange | "">("");
  const [openNow, setOpenNow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const results = filterCafeterias({
    neighborhood: neighborhood || undefined,
    noiseLevel: (noiseLevel as NoiseLevel) || undefined,
    wifiSpeed: wifiSpeed || undefined,
    hasPlugs,
    priceRange: (priceRange as PriceRange) || undefined,
    openNow: openNow || undefined,
  });

  const clearFilters = () => {
    setNeighborhood("");
    setNoiseLevel("");
    setWifiSpeed("");
    setHasPlugs(undefined);
    setPriceRange("");
    setOpenNow(false);
  };

  const hasActiveFilters = neighborhood || noiseLevel || wifiSpeed || hasPlugs !== undefined || priceRange || openNow;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Barrio */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Barrio</label>
        <select
          value={neighborhood}
          onChange={e => setNeighborhood(e.target.value)}
          className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Todos</option>
          {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Noise */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Nivel de ruido</label>
        <div className="flex flex-wrap gap-2">
          {(["silencioso", "moderado", "animado"] as NoiseLevel[]).map(level => (
            <button
              key={level}
              onClick={() => setNoiseLevel(noiseLevel === level ? "" : level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                noiseLevel === level
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* WiFi */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Velocidad WiFi</label>
        <div className="flex flex-wrap gap-2">
          {[
            { val: "basico", label: "Básico <10Mbps" },
            { val: "rapido", label: "Rápido 10-50Mbps" },
            { val: "ultra", label: "Ultra >50Mbps" },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setWifiSpeed(wifiSpeed === opt.val ? "" : opt.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                wifiSpeed === opt.val
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plugs */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Enchufes</label>
        <button
          onClick={() => setHasPlugs(hasPlugs === true ? undefined : true)}
          className={`w-10 h-6 rounded-full transition-colors ${hasPlugs ? "bg-primary" : "bg-border"}`}
        >
          <div className={`w-4 h-4 rounded-full bg-foreground transition-transform mx-1 ${hasPlugs ? "translate-x-4" : ""}`} />
        </button>
      </div>

      {/* Price */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Rango de precios</label>
        <div className="flex gap-2">
          {(["$", "$$", "$$$"] as PriceRange[]).map(p => (
            <button
              key={p}
              onClick={() => setPriceRange(priceRange === p ? "" : p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                priceRange === p
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Open now */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Abierto ahora</label>
        <button
          onClick={() => setOpenNow(!openNow)}
          className={`w-10 h-6 rounded-full transition-colors ${openNow ? "bg-primary" : "bg-border"}`}
        >
          <div className={`w-4 h-4 rounded-full bg-foreground transition-transform mx-1 ${openNow ? "translate-x-4" : ""}`} />
        </button>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="w-full text-xs text-primary font-medium py-2 hover:underline">
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-4 md:pt-20 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Explorar cafeterías</h1>
            <p className="text-sm text-muted-foreground mt-1">{results.length} resultados</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary text-sm text-foreground"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="glass-card p-5 sticky top-20">
              <h3 className="font-semibold text-foreground text-sm mb-4">Filtros</h3>
              <FiltersContent />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {results.map((cafe, i) => (
                <motion.div
                  key={cafe.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CafeCard cafe={cafe} />
                </motion.div>
              ))}
            </div>
            {results.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No se encontraron cafeterías con esos filtros.</p>
                <button onClick={clearFilters} className="text-primary text-sm mt-2 hover:underline">
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-background z-40"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filtros</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <FiltersContent />
              <button
                onClick={() => setShowFilters(false)}
                className="btn-primary-gradient w-full mt-6 rounded-xl text-center"
              >
                Ver {results.length} resultados
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
