export type NoiseLevel = "silencioso" | "moderado" | "animado";
export type PriceRange = "$" | "$$" | "$$$";
export type OccupationLevel = "bajo" | "medio" | "alto";

export interface MenuItem {
  name: string;
  price: number;
}

export interface Discount {
  percentage: number;
  description: string;
}

export interface Cafeteria {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  wifiSpeed: number;
  noiseLevel: NoiseLevel;
  priceRange: PriceRange;
  hasPlugs: boolean;
  rating: number;
  reviewCount: number;
  occupation: OccupationLevel;
  discount?: Discount;
  images: string[];
  hours: Record<string, string>;
  menu: MenuItem[];
  occupationByTime: { label: string; value: number }[];
  isOpenNow: boolean;
  lat: number;
  lng: number;
}

export const cafeterias: Cafeteria[] = [
  {
    id: "cafe-palermo",
    name: "Café Palermo",
    neighborhood: "Palermo",
    address: "Honduras 4702, Palermo",
    wifiSpeed: 45,
    noiseLevel: "silencioso",
    priceRange: "$$",
    hasPlugs: true,
    rating: 4.6,
    reviewCount: 128,
    occupation: "medio",
    discount: { percentage: 10, description: "10% en todas las bebidas calientes" },
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    ],
    hours: { "Lun-Vie": "8:00 - 20:00", "Sáb": "9:00 - 18:00", "Dom": "10:00 - 16:00" },
    menu: [
      { name: "Café con leche", price: 2800 },
      { name: "Espresso doble", price: 2200 },
      { name: "Medialunas (x3)", price: 3200 },
      { name: "Tostado de J&Q", price: 4500 },
      { name: "Brownie", price: 3800 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 30 },
      { label: "Mediodía", value: 70 },
      { label: "Tarde", value: 85 },
      { label: "Noche", value: 40 },
    ],
    isOpenNow: true,
    lat: -34.5875,
    lng: -58.4268,
  },
  {
    id: "coffee-store-recoleta",
    name: "The Coffee Store Recoleta",
    neighborhood: "Recoleta",
    address: "Av. Callao 1542, Recoleta",
    wifiSpeed: 30,
    noiseLevel: "moderado",
    priceRange: "$$$",
    hasPlugs: true,
    rating: 4.3,
    reviewCount: 95,
    occupation: "alto",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800",
    ],
    hours: { "Lun-Vie": "7:30 - 21:00", "Sáb-Dom": "9:00 - 20:00" },
    menu: [
      { name: "Café con leche", price: 3200 },
      { name: "Latte art", price: 3600 },
      { name: "Cheesecake", price: 5200 },
      { name: "Tostado triple", price: 5800 },
      { name: "Jugo natural", price: 4200 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 50 },
      { label: "Mediodía", value: 90 },
      { label: "Tarde", value: 75 },
      { label: "Noche", value: 60 },
    ],
    isOpenNow: true,
    lat: -34.5957,
    lng: -58.3923,
  },
  {
    id: "lattente",
    name: "Lattente",
    neighborhood: "Villa Crespo",
    address: "Thames 878, Villa Crespo",
    wifiSpeed: 60,
    noiseLevel: "silencioso",
    priceRange: "$$",
    hasPlugs: true,
    rating: 4.8,
    reviewCount: 210,
    occupation: "bajo",
    discount: { percentage: 15, description: "15% en consumiciones mayores a $5000" },
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
    ],
    hours: { "Lun-Vie": "8:00 - 19:00", "Sáb": "9:00 - 17:00", "Dom": "Cerrado" },
    menu: [
      { name: "Flat white", price: 3000 },
      { name: "Cold brew", price: 3400 },
      { name: "Medialunas (x3)", price: 2800 },
      { name: "Avocado toast", price: 5600 },
      { name: "Granola bowl", price: 4800 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 25 },
      { label: "Mediodía", value: 45 },
      { label: "Tarde", value: 55 },
      { label: "Noche", value: 15 },
    ],
    isOpenNow: true,
    lat: -34.5986,
    lng: -58.4381,
  },
  {
    id: "birkin-coffee",
    name: "Birkin Coffee",
    neighborhood: "Belgrano",
    address: "Av. Cabildo 2040, Belgrano",
    wifiSpeed: 25,
    noiseLevel: "animado",
    priceRange: "$",
    hasPlugs: false,
    rating: 4.0,
    reviewCount: 67,
    occupation: "alto",
    images: [
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
      "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800",
    ],
    hours: { "Lun-Sáb": "7:00 - 22:00", "Dom": "8:00 - 20:00" },
    menu: [
      { name: "Café con leche", price: 2200 },
      { name: "Cortado", price: 1800 },
      { name: "Medialunas (x3)", price: 2400 },
      { name: "Sandwich de miga", price: 3200 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 60 },
      { label: "Mediodía", value: 85 },
      { label: "Tarde", value: 90 },
      { label: "Noche", value: 70 },
    ],
    isOpenNow: true,
    lat: -34.5614,
    lng: -58.4529,
  },
  {
    id: "cuervo-cafe",
    name: "Cuervo Café",
    neighborhood: "Colegiales",
    address: "Álvarez Thomas 1391, Colegiales",
    wifiSpeed: 50,
    noiseLevel: "silencioso",
    priceRange: "$$",
    hasPlugs: true,
    rating: 4.7,
    reviewCount: 156,
    occupation: "bajo",
    discount: { percentage: 10, description: "10% en tu primer visita con Jama" },
    images: [
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
    ],
    hours: { "Lun-Vie": "8:00 - 20:00", "Sáb": "9:00 - 18:00", "Dom": "Cerrado" },
    menu: [
      { name: "Americano", price: 2400 },
      { name: "Cappuccino", price: 3000 },
      { name: "Tostado de J&Q", price: 4200 },
      { name: "Budín de limón", price: 3400 },
      { name: "Agua saborizada", price: 2000 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 20 },
      { label: "Mediodía", value: 40 },
      { label: "Tarde", value: 50 },
      { label: "Noche", value: 25 },
    ],
    isOpenNow: true,
    lat: -34.5742,
    lng: -58.4491,
  },
  {
    id: "origenes",
    name: "Orígenes",
    neighborhood: "San Telmo",
    address: "Defensa 982, San Telmo",
    wifiSpeed: 35,
    noiseLevel: "moderado",
    priceRange: "$",
    hasPlugs: true,
    rating: 4.2,
    reviewCount: 89,
    occupation: "medio",
    images: [
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    ],
    hours: { "Lun-Vie": "9:00 - 19:00", "Sáb-Dom": "10:00 - 18:00" },
    menu: [
      { name: "Café con leche", price: 2400 },
      { name: "Espresso", price: 1800 },
      { name: "Medialunas (x3)", price: 2600 },
      { name: "Empanadas (x3)", price: 3800 },
      { name: "Alfajor artesanal", price: 2800 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 35 },
      { label: "Mediodía", value: 65 },
      { label: "Tarde", value: 70 },
      { label: "Noche", value: 30 },
    ],
    isOpenNow: true,
    lat: -34.6215,
    lng: -58.3720,
  },
  {
    id: "lab-coffee",
    name: "LAB Coffee",
    neighborhood: "Palermo",
    address: "Humboldt 1542, Palermo",
    wifiSpeed: 80,
    noiseLevel: "silencioso",
    priceRange: "$$$",
    hasPlugs: true,
    rating: 4.9,
    reviewCount: 312,
    occupation: "medio",
    discount: { percentage: 20, description: "20% en combo café + pastelería" },
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
    ],
    hours: { "Lun-Vie": "7:00 - 21:00", "Sáb": "8:00 - 20:00", "Dom": "9:00 - 18:00" },
    menu: [
      { name: "V60 de especialidad", price: 4200 },
      { name: "Flat white", price: 3800 },
      { name: "Croissant de almendras", price: 4600 },
      { name: "Bowl de açaí", price: 6200 },
      { name: "Matcha latte", price: 4000 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 45 },
      { label: "Mediodía", value: 70 },
      { label: "Tarde", value: 80 },
      { label: "Noche", value: 55 },
    ],
    isOpenNow: true,
    lat: -34.5853,
    lng: -58.4332,
  },
  {
    id: "full-city-coffee",
    name: "Full City Coffee",
    neighborhood: "Núñez",
    address: "Av. Crisólogo Larralde 3565, Núñez",
    wifiSpeed: 40,
    noiseLevel: "moderado",
    priceRange: "$$",
    hasPlugs: true,
    rating: 4.4,
    reviewCount: 73,
    occupation: "bajo",
    images: [
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800",
    ],
    hours: { "Lun-Vie": "7:30 - 20:00", "Sáb": "8:00 - 18:00", "Dom": "9:00 - 15:00" },
    menu: [
      { name: "Café con leche", price: 2600 },
      { name: "Doble espresso", price: 2200 },
      { name: "Medialunas (x3)", price: 3000 },
      { name: "Tostado de JQ", price: 4200 },
      { name: "Jugo exprimido", price: 3600 },
    ],
    occupationByTime: [
      { label: "Mañana", value: 25 },
      { label: "Mediodía", value: 50 },
      { label: "Tarde", value: 45 },
      { label: "Noche", value: 20 },
    ],
    isOpenNow: true,
    lat: -34.5467,
    lng: -58.4594,
  },
];

export const neighborhoods = [
  "Palermo", "Recoleta", "Belgrano", "San Telmo", 
  "Colegiales", "Núñez", "Villa Crespo", "Caballito"
];

export function getCafeById(id: string): Cafeteria | undefined {
  return cafeterias.find(c => c.id === id);
}

export function filterCafeterias(filters: {
  neighborhood?: string;
  noiseLevel?: NoiseLevel;
  wifiSpeed?: string;
  hasPlugs?: boolean;
  priceRange?: PriceRange;
  openNow?: boolean;
}): Cafeteria[] {
  return cafeterias.filter(c => {
    if (filters.neighborhood && c.neighborhood !== filters.neighborhood) return false;
    if (filters.noiseLevel && c.noiseLevel !== filters.noiseLevel) return false;
    if (filters.wifiSpeed) {
      if (filters.wifiSpeed === "basico" && c.wifiSpeed >= 10) return false;
      if (filters.wifiSpeed === "rapido" && (c.wifiSpeed < 10 || c.wifiSpeed > 50)) return false;
      if (filters.wifiSpeed === "ultra" && c.wifiSpeed <= 50) return false;
    }
    if (filters.hasPlugs !== undefined && c.hasPlugs !== filters.hasPlugs) return false;
    if (filters.priceRange && c.priceRange !== filters.priceRange) return false;
    if (filters.openNow && !c.isOpenNow) return false;
    return true;
  });
}
