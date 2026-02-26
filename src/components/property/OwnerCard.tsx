// src/components/property/OwnerCard.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OwnerCardProps {
  name: string;
  joinedDate: string;
  yearPurchased: string;

  // NEW
  listingsUrl?: string;
  whyTitle?: string; // default: "Why this property?"
  whyContent?: string[]; // mixed list of paragraphs/lines
}

export const OwnerCard = ({
  name,
  joinedDate,
  yearPurchased,
  listingsUrl,
  whyTitle = "Why this property?",
  whyContent = [],
}: OwnerCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Hosted by {name}
      </h2>

      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-muted-foreground/20" />
        </div>

        <div className="flex-1">
          {listingsUrl ? (
            <a
              href={listingsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline font-medium"
            >
              View all my listings
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-5 space-y-2 text-foreground">
        <p className="text-sm">
          <span className="font-medium">Member since</span> {joinedDate}
        </p>
        <p className="text-sm">
          <span className="font-medium">Year purchased:</span> {yearPurchased}
        </p>
      </div>

      {/* Why section (Show more / less like FloridaRentals) */}
      {whyContent.length > 0 && (
        <div className="mt-4">
          <div
            className={`text-sm text-foreground leading-relaxed ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            <p className="font-medium mb-2">{whyTitle}</p>

            {/* Render each line as its own paragraph like the screenshot */}
            {whyContent.map((line, i) => (
              <p key={i} className="text-muted-foreground mb-2">
                {line}
              </p>
            ))}
          </div>

          <Button
            variant="ghost"
            className="mt-2 text-accent hover:text-accent/80 hover:bg-accent/10 gap-1 px-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};