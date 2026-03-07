import { Link } from "react-router-dom";
import { Wifi, Volume2, VolumeX, Volume1, Plug, Star, Tag } from "lucide-react";
import type { Cafeteria } from "@/data/cafeterias";

interface CafeCardProps {
  cafe: Cafeteria;
}

function NoiseIcon({ level }: { level: string }) {
  if (level === "silencioso") return <VolumeX className="h-3 w-3" />;
  if (level === "moderado") return <Volume1 className="h-3 w-3" />;
  return <Volume2 className="h-3 w-3" />;
}

function noiseBadgeClass(level: string) {
  if (level === "silencioso") return "badge-noise-quiet";
  if (level === "moderado") return "badge-noise-moderate";
  return "badge-noise-lively";
}

function occupationColor(level: string) {
  if (level === "bajo") return "occupation-low";
  if (level === "medio") return "occupation-medium";
  return "occupation-high";
}

function occupationLabel(level: string) {
  if (level === "bajo") return "Baja";
  if (level === "medio") return "Media";
  return "Alta";
}

export function CafeCard({ cafe }: CafeCardProps) {
  return (
    <Link to={`/cafeteria/${cafe.id}`} className="block group">
      <div className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_-5px_hsla(351,79%,59%,0.2)]">
        <div className="relative h-40 overflow-hidden">
          <img
            src={cafe.images[0]}
            alt={cafe.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {cafe.discount && (
            <div className="absolute top-3 right-3 badge-discount">
              <Tag className="h-3 w-3" />
              {cafe.discount.percentage}% OFF
            </div>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${occupationColor(cafe.occupation)}`} />
            <span className="text-xs font-medium text-foreground bg-background/80 backdrop-blur px-2 py-0.5 rounded-full">
              Ocupación {occupationLabel(cafe.occupation)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cafe.name}</h3>
              <p className="text-xs text-muted-foreground">{cafe.neighborhood}</p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-medium text-foreground">{cafe.rating}</span>
              <span className="text-muted-foreground">({cafe.reviewCount})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="badge-wifi">
              <Wifi className="h-3 w-3" />
              {cafe.wifiSpeed} Mbps
            </span>
            <span className={noiseBadgeClass(cafe.noiseLevel)}>
              <NoiseIcon level={cafe.noiseLevel} />
              {cafe.noiseLevel.charAt(0).toUpperCase() + cafe.noiseLevel.slice(1)}
            </span>
            {cafe.hasPlugs && (
              <span className="badge-wifi">
                <Plug className="h-3 w-3" />
                Enchufes
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              {cafe.priceRange}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
