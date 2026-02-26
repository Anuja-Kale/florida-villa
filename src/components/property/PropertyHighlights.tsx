import { Bed, Bath, Maximize, PawPrint, Ban } from "lucide-react";

interface PropertyHighlightsProps {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  petFriendly: boolean;
  nonSmoking: boolean;
  sleeps: number;
}

export const PropertyHighlights = ({
  bedrooms,
  bathrooms,
  sqft,
  petFriendly,
  nonSmoking,
  sleeps,
}: PropertyHighlightsProps) => {
  const highlights = [
    { icon: Bed, label: `${bedrooms} bedrooms` },
    { icon: Bath, label: `${bathrooms} bathrooms` },
    { icon: Maximize, label: `${sqft} sq. ft.` },
    ...(petFriendly ? [{ icon: PawPrint, label: "Pet Friendly" }] : []),
    ...(nonSmoking ? [{ icon: Ban, label: "Non Smoking" }] : []),
  ];

  return (
    <div className="bg-secondary/50 rounded-lg px-6 py-4 mb-6">
      <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground">
        {highlights.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <item.icon className="w-4 h-4 text-primary" />
            <span>{item.label}</span>
            {index < highlights.length - 1 && (
              <span className="ml-4 text-muted-foreground">•</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground mt-2">
        Sleeps {sleeps}
      </div>
    </div>
  );
};
