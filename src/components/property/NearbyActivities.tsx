import {
  Bike,
  PersonStanding,
  Waves,
  Dumbbell,
  Music,
  TreePine,
  ShoppingBag,
  Target,
  Trophy,
} from "lucide-react";

interface Activity {
  name: string;
  distance: string;
}

interface NearbyActivitiesProps {
  activities: Activity[];
}

const getActivityIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("bicycl")) return Bike;
  if (lower.includes("basketball") || lower.includes("volleyball")) return PersonStanding;
  if (lower.includes("pool") || lower.includes("kayak")) return Waves;
  if (lower.includes("gym") || lower.includes("fitness")) return Dumbbell;
  if (lower.includes("entertainment") || lower.includes("live")) return Music;
  if (lower.includes("park")) return TreePine;
  if (lower.includes("shopping")) return ShoppingBag;
  if (lower.includes("pickleball") || lower.includes("tennis")) return Target;
  if (lower.includes("golf")) return Trophy;
  return TreePine;
};

export const NearbyActivities = ({ activities }: NearbyActivitiesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">Nearby Activities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.name);
          return (
            <div
              key={index}
              className="flex items-center gap-3 bg-secondary/30 rounded-lg px-4 py-3"
            >
              <Icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{activity.name}</p>
                <p className="text-xs text-muted-foreground">{activity.distance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
