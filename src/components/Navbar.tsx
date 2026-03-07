import { Link, useLocation } from "react-router-dom";
import { Search, MessageSquare, QrCode, User, Coffee } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Jama</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/buscar"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/buscar") ? "text-primary" : "text-muted-foreground"}`}
          >
            Buscar
          </Link>
          <Link
            to="/chat"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/chat") ? "text-primary" : "text-muted-foreground"}`}
          >
            Chat IA
          </Link>
          <Link
            to="/mi-qr"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/mi-qr") ? "text-primary" : "text-muted-foreground"}`}
          >
            Mi QR
          </Link>
          <Link
            to="/auth"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/auth") ? "text-primary" : "text-muted-foreground"}`}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {[
            { to: "/", icon: Coffee, label: "Home" },
            { to: "/buscar", icon: Search, label: "Buscar" },
            { to: "/chat", icon: MessageSquare, label: "Chat" },
            { to: "/mi-qr", icon: QrCode, label: "QR" },
            { to: "/auth", icon: User, label: "Perfil" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive(to) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
