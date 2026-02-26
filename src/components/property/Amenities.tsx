import {
  Wifi,
  Car,
  Waves,
  Coffee,
  Tv,
  Wind,
  Shirt,
  Utensils,
  PawPrint,
  CircleParking,
  Ban,
  Bed,
  Bath,
  Briefcase,
  Leaf,
} from "lucide-react";

interface AmenitiesProps {
  amenities: string[];
  beds: { type: string; count: number }[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  garage: Car,
  pool: Waves,
  coffee: Coffee,
  tv: Tv,
  ac: Wind,
  laundry: Shirt,
  kitchen: Utensils,
  pets: PawPrint,
  parking: CircleParking,
  "non-smoking": Ban,
  bed: Bed,
  bath: Bath,
  workspace: Briefcase,
  lanai: Leaf,
};

const getIcon = (amenity: string) => {
  const key = Object.keys(iconMap).find((k) =>
    amenity.toLowerCase().includes(k)
  );
  return key ? iconMap[key] : null;
};

export const Amenities = ({ amenities, beds }: AmenitiesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">Amenities</h2>

      {/* Beds Section */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Beds</h3>
        <div className="flex flex-wrap gap-3">
          {beds.map((bed, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg text-sm"
            >
              <Bed className="w-4 h-4 text-primary" />
              <span>
                {bed.count} {bed.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenities.map((amenity, index) => {
            const Icon = getIcon(amenity);
            return (
              <div
                key={index}
                className="flex items-center gap-3 py-2 text-sm text-foreground"
              >
                {Icon ? (
                  <Icon className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-primary/10 shrink-0" />
                )}
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
