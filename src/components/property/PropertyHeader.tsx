import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyHeaderProps {
  title: string;
  location: string;
  propertyType: string;
  propertyId: string;
}

export const PropertyHeader = ({
  title,
  location,
  propertyType,
  propertyId,
}: PropertyHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{location}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>{propertyType}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Property #{propertyId}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Heart className="w-4 h-4" />
          Save
        </Button>
      </div>
    </div>
  );
};
