import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, QrCode, User, Tag, Users, DollarSign,
  Star, ScanLine, Menu, X, Coffee, Plus, Trash2
} from "lucide-react";

type PanelView = "dashboard" | "scan" | "profile" | "discounts";

const navItems: { id: PanelView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "scan", label: "Escanear QR", icon: ScanLine },
  { id: "profile", label: "Mi Perfil", icon: User },
  { id: "discounts", label: "Descuentos", icon: Tag },
];

function DashboardView() {
  const metrics = [
    { label: "Workers este mes", value: "127", icon: Users },
    { label: "QR canjeados", value: "84", icon: QrCode },
    { label: "Ingresos por Jama", value: "$245.000", icon: DollarSign },
    { label: "Rating promedio", value: "4.6 ★", icon: Star },
  ];

  const weekData = [
    { day: "Lun", value: 18 },
    { day: "Mar", value: 22 },
    { day: "Mié", value: 30 },
    { day: "Jue", value: 25 },
    { day: "Vie", value: 35 },
    { day: "Sáb", value: 15 },
    { day: "Dom", value: 8 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="glass-card p-4">
            <m.icon className="h-5 w-5 text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{m.value}</div>
            <div className="text-xs text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-3">Visitas por día</h3>
      <div className="glass-card p-4">
        <div className="flex items-end gap-2 h-32">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{d.value}</span>
              <div
                className="w-full rounded-t-md bg-primary/60"
                style={{ height: `${(d.value / 35) * 100}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScanView() {
  const [code, setCode] = useState("");
  const [scanned, setScanned] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Escanear QR</h2>
      {!scanned ? (
        <div className="space-y-6">
          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ScanLine className="h-10 w-10 text-primary" />
            </div>
            <button className="btn-primary-gradient rounded-xl">Escanear QR</button>
            <p className="text-xs text-muted-foreground mt-2">Simula apertura de cámara</p>
          </div>
          <div className="text-center text-xs text-muted-foreground">o ingresá el código manualmente</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Ej: JAMA-A3F8K2"
              className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button onClick={() => code && setScanned(true)} className="btn-primary-gradient rounded-xl">
              Validar
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="glass-card p-4 text-center">
            <div className="text-sm text-muted-foreground">Código validado</div>
            <div className="font-mono font-bold text-foreground text-lg">{code || "JAMA-A3F8K2"}</div>
            <div className="text-xs text-muted-foreground mt-1">10% descuento · Válido</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
              Monto del consumo ($ARS)
            </label>
            <input
              type="number"
              placeholder="Ej: 5600"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="btn-primary-gradient w-full rounded-xl text-center">Registrar consumo</button>
          <button onClick={() => setScanned(false)} className="w-full text-xs text-primary hover:underline py-2">
            Escanear otro QR
          </button>
        </motion.div>
      )}
    </div>
  );
}

function ProfileView() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Mi Perfil</h2>
      <div className="space-y-4">
        {[
          { label: "Nombre", placeholder: "Café Palermo", type: "text" },
          { label: "Dirección", placeholder: "Honduras 4702, Palermo", type: "text" },
          { label: "Velocidad WiFi (Mbps)", placeholder: "45", type: "number" },
          { label: "Cantidad de enchufes", placeholder: "12", type: "number" },
        ].map((f, i) => (
          <div key={i}>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{f.label}</label>
            <input
              type={f.type}
              defaultValue={f.placeholder}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Nivel de ruido</label>
          <select className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>Silencioso</option>
            <option>Moderado</option>
            <option>Animado</option>
          </select>
        </div>
        <button className="btn-primary-gradient w-full rounded-xl text-center mt-4">Guardar cambios</button>
      </div>
    </div>
  );
}

function DiscountsView() {
  const discounts = [
    { id: 1, percentage: 10, description: "10% en bebidas calientes", active: true },
    { id: 2, percentage: 15, description: "15% los martes", active: false },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Descuentos</h2>
      <div className="space-y-3 mb-6">
        {discounts.map(d => (
          <div key={d.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{d.percentage}%</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.active ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {d.active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{d.description}</p>
            </div>
            <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-3">Crear nuevo descuento</h3>
      <div className="glass-card p-4 space-y-3">
        <input type="number" placeholder="Porcentaje (%)" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input type="text" placeholder="Descripción" className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <div className="grid grid-cols-2 gap-2">
          <input type="date" className="bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input type="date" className="bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <button className="btn-primary-gradient w-full rounded-xl text-center flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          Crear descuento
        </button>
      </div>
    </div>
  );
}

export default function PanelPage() {
  const [view, setView] = useState<PanelView>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const views = {
    dashboard: <DashboardView />,
    scan: <ScanView />,
    profile: <ProfileView />,
    discounts: <DiscountsView />,
  };

  return (
    <div className="min-h-screen md:pt-16 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0 p-4">
          <div className="glass-card p-3 sticky top-20 space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <Coffee className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">Café Palermo</span>
            </div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  view === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <h1 className="font-bold text-foreground">Panel</h1>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg bg-secondary">
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Mobile nav drawer */}
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 bg-background/50 z-40" onClick={() => setSidebarOpen(false)} />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                className="fixed right-0 top-0 bottom-0 w-64 bg-card border-l border-border z-50 p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-foreground">Menú</span>
                  <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                </div>
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setView(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      view === item.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            </>
          )}

          <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {views[view]}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
