import { MapPin, Plane, Utensils, Car, Building, Gamepad2 } from "lucide-react";

interface LocationInfo {
  label: string;
  distance: string;
  icon: "airport" | "restaurant" | "golf" | "park" | "beach";
}

interface LocationProps {
  address: string;
  village: string;
  city: string;
  state: string;
  nearbyLocations: LocationInfo[];
}

const iconMap = {
  airport: Plane,
  restaurant: Utensils,
  golf: Gamepad2,
  park: Building,
  beach: Car,
};

export const Location = ({
  address,
  village,
  city,
  state,
  nearbyLocations,
}: LocationProps) => {

  // Exact coordinates for 7664 Rutherford Lane, The Villages, FL
  const lat = 28.8589;
  const lng = -81.9653;

  // z = zoom level (16–18 is good for house-level detail)
  const googleEmbedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">Location</h2>

      <div className="bg-secondary/30 rounded-lg overflow-hidden">

        {/* MAP */}
        <div className="relative h-64 md:h-80 bg-muted">
          <iframe
            title="Property location"
            src={googleEmbedSrc}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Address overlay card */}
          <div className="absolute top-3 left-3 bg-white/95 rounded-md shadow px-3 py-2 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5" />
            <div className="leading-tight">
              <div className="text-sm font-medium text-foreground">
                {address}
              </div>
              <div className="text-xs text-muted-foreground">
                {village}, {city}, {state}
              </div>
            </div>
          </div>
        </div>

        {/* Nearby locations */}
        <div className="p-5">
          <h3 className="font-medium text-foreground mb-3">
            What's Nearby
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nearbyLocations.map((location, index) => {
              const Icon = iconMap[location.icon];
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    {location.label}
                  </span>
                  <span className="ml-auto text-foreground font-medium">
                    {location.distance}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
