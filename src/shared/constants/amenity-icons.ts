import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Bike,
  Building2,
  Bus,
  Car,
  CircleHelp,
  CircleParking,
  ClipboardPlus,
  Dumbbell,
  Flame,
  Gamepad2,
  Landmark,
  Leaf,
  Library,
  MonitorSmartphone,
  ParkingCircle,
  PawPrint,
  Pill,
  Shield,
  ShieldCheck,
  Store,
  Trees,
  Trophy,
  Users,
  UtensilsCrossed,
  Volleyball,
  Waves,
  Wind,
  Zap,
} from "lucide-react";

export const AMENITY_ICONS: Record<string, LucideIcon> = {
  // ===========================
  // Safety & Security
  // ===========================
  "24x7 Security": ShieldCheck,
  "CCTV Surveillance": Shield,
  "Fire Fighting System": Flame,
  "First Aid Room": ClipboardPlus,
  "Intercom Facility": MonitorSmartphone,
  "Security Cabin": Shield,
  "Earthquake Resistant Structure": Building2,

  // ===========================
  // Sports & Fitness
  // ===========================
  "Swimming Pool": Waves,
  Gym: Dumbbell,
  "Yoga Room": Dumbbell,
  "Jogging Track": Bike,
  "Badminton Court": Trophy,
  "Basketball Court": Volleyball,
  "Tennis Court": Trophy,
  "Squash Court": Trophy,
  "Table Tennis": Trophy,
  "Kids Pool": Waves,
  "Indoor Games": Gamepad2,
  "Cycling Track": Bike,

  // ===========================
  // Community & Social
  // ===========================
  "Club House": Building2,
  "Banquet Hall": Users,
  Amphitheatre: Landmark,
  Library: Library,
  "Reading Room": Library,
  "Society Office": Building2,
  "Temple / Prayer Hall": Landmark,

  // ===========================
  // Kids & Family
  // ===========================
  "Children Play Area": Gamepad2,
  Creche: Users,
  "Day Care Centre": Users,
  "School Bus Bay": Bus,

  // ===========================
  // Pets
  // ===========================
  "Pet Park": PawPrint,
  "Pet Care Area": PawPrint,

  // ===========================
  // Work & Business
  // ===========================
  "Co - Working Space": MonitorSmartphone,
  "Co-working Space": MonitorSmartphone,
  "Conference Room": Users,

  // ===========================
  // Convenience & Utilities
  // ===========================
  Lift: Building2,
  "Power Backup": Zap,
  "Water Supply": Waves,
  Parking: ParkingCircle,
  "Visitor Parking": CircleParking,
  "Covered Parking": Car,
  "EV Charging Points": Zap,
  "Laundry Service": Wind,
  "Garbage Disposal System": Leaf,
  "Sewage Treatment Plant": Atom,
  "Rainwater Harvesting": Trees,
  "Service Lift": Building2,

  // ===========================
  // Health & Wellness
  // ===========================
  Spa: Waves,
  "Steam Room": Wind,
  "Meditation Area": Leaf,
  Jacuzzi: Waves,

  // ===========================
  // Commercial & Services
  // ===========================
  ATM: Landmark,
  Pharmacy: Pill,
  "Convenience Store": Store,
  Cafeteria: UtensilsCrossed,
};

export const DEFAULT_AMENITY_ICON = CircleHelp;
