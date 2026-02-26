// src/components/property/PropertyDescription.tsx

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyDescriptionProps {
  description: string;
  highlights: string[];
  homeFeatures: string[];
  areaInfo?: string[];

  /* NEW */
  address?: {
    address: string;
    village: string;
    city: string;
    state: string;
  };

  specialFeatures?: string[];
  uniqueBenefits?: string[];
  bookletText?: string[];
}

export const PropertyDescription = ({
  description,
  highlights,
  homeFeatures,
  areaInfo = [],
  address,
  specialFeatures = [],
  uniqueBenefits = [],
  bookletText = [],
}: PropertyDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">
        About This Property
      </h2>

      <div
        className={`prose prose-sm max-w-none text-foreground ${
          !expanded && "line-clamp-4"
        }`}
      >
        {/* PROPERTY DETAILS */}
        {address && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-primary mb-1">
              Property Details
            </h3>
            <p className="text-muted-foreground">{address.address}</p>
            <p className="text-muted-foreground">{address.village}</p>
            <p className="text-muted-foreground">
              {address.city}, {address.state}
            </p>
          </div>
        )}

        {/* MAIN DESCRIPTION */}
        <p className="mb-4 leading-relaxed">{description}</p>

        {expanded && (
          <>
            {/* HIGHLIGHTS */}
            {highlights.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-primary mb-2">
                  Highlights of a Great Location!
                </h3>
                <ul className="space-y-1">
                  {highlights.map((h, i) => (
                    <li key={i} className="text-muted-foreground">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* EASTPORT BOOKLET TEXT (CONTENT, NOT LINK) */}
            {bookletText.length > 0 && (
              <div className="mb-4">
                {bookletText.map((p, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed mb-2"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* HOME FEATURES */}
            {homeFeatures.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-primary mb-2">
                  Home Features
                </h3>
                <ul className="grid grid-cols-2 gap-1">
                  {homeFeatures.map((f, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SPECIAL FEATURES */}
            {specialFeatures.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-primary mb-2">
                  Special Features
                </h3>
                <ul className="space-y-1">
                  {specialFeatures.map((s, i) => (
                    <li key={i} className="text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* UNIQUE BENEFITS */}
            {uniqueBenefits.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-primary mb-2">
                  Unique Benefits
                </h3>
                {uniqueBenefits.map((u, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed mb-2"
                  >
                    {u}
                  </p>
                ))}
              </div>
            )}

            {/* AREA INFO */}
            {areaInfo.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-primary mb-2">
                  Area Information
                </h3>
                <ul className="space-y-1">
                  {areaInfo.map((info, i) => (
                    <li key={i} className="text-muted-foreground">
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* SHOW MORE BUTTON */}
      <Button
        variant="ghost"
        className="mt-3 text-accent hover:text-accent/80 hover:bg-accent/10 gap-1 px-0"
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
  );
};