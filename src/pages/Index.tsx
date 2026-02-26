// src/pages/Index.tsx
import { Link } from "react-router-dom";
import { Navbar } from "@/components/property/Navbar";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { ImageGallery } from "@/components/property/ImageGallery";
import { PropertyHighlights } from "@/components/property/PropertyHighlights";
import { OwnerCard } from "@/components/property/OwnerCard";
import { RatesTable } from "@/components/property/RatesTable";
import { ContactForm } from "@/components/property/ContactForm";
import { Amenities } from "@/components/property/Amenities";
import { PropertyDescription } from "@/components/property/PropertyDescription";
import { Fees } from "@/components/property/Fees";
import { Location } from "@/components/property/Location";
import { NearbyActivities } from "@/components/property/NearbyActivities";
import { AvailabilityCalendar } from "@/components/property/AvailabilityCalendar";

const propertyData = {
  id: "19150",
  title: "Furnished Eastport Property Pet Friendly",
  location: "The Village of Shady Brook",
  propertyType: "The Villages Villa",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1700,
  sleeps: 4,
  petFriendly: true,
  nonSmoking: true,

images: Array.from(
  { length: 28 },
  (_, i) => `${import.meta.env.BASE_URL}property/19150/${i + 1}.png`
),

  owner: {
    name: "Janak Dhabuwala",
    joinedDate: "2023",
    yearPurchased: "2024",

    // ✅ NEW: real link for "View all my listings"
    listingsUrl: "https://www.floridarentals.com/owner/janak-dhabuwala/",
  },

  propertyDetails: {
    address: "7664 Rutherford Lane",
    village: "The Village of Shady Brook",
    city: "The Villages",
    state: "FL",
  },

  description:
    "This is a Brand new fully furnished cottage villa that is the perfect blend of Courtyard villa and cottage home, which allows for creating a personal outdoor oasis. This beautiful spacious closed cottage Villa has 3 bedrooms, 2 baths, and a 1.5 car garage. There is vinyl plank flooring throughout this home, except the bedrooms. The eat-in kitchen opens to a spacious living room, with all major brand-new appliances. The in-house laundry room has a new washer and dryer. The main bedroom has a large walk-in closet, double sinks in the bathroom, and a walk-in Roman shower. New home upgrades include vaulted ceilings, ceiling fans, decorative epoxy on the garage floor, a guest suite with privacy, a lanai, and a side outside patio for open-air enjoyment within a private enclosed yard.",

  highlights: [
    "HIGHLIGHTS OF A GREAT LOCATION! Near TO Eastport",
    "2 Recreation Centers within the Village of Shady Brook",
    "Resort-style family pool, pickleball, platform tennis/sand volleyball, bocce, shuffleboard, corn toss, a picnic pavilion, and a pedestrian trail with outdoor exercise equipment.",
    "The nearby Saluki Rec Center has an adult pool, courts, and a dog park.",
    "Nearby Eastport boasts kayaking and paddle-boarding, a boardwalk trail.",
    "This Property is a mile away from a newly opened Eastport and Middleton",
  ],

  homeFeatures: [
    "Brand new house",
    "Lanai (Sheltered Patio)",
    "3 Bedrooms/2 Bathrooms",
    "Furnished with brand-new furniture",
    "Laundry Room (in the home)",
    '50" TV in Living rooms Frame TV',
    "Internet",
    "Fully furnished kitchen",
  ],

  specialFeatures: [
    "Easy Drive to Saluki Rec center and Eastport",
    "Easy drive to Pool, Recreation centers",
    "Easy drive to Grocery Shopping/Banks",
  ],

  uniqueBenefits: [
    "Nestled among beautiful water features and breathtaking Championship golf vistas, The Village of Shady Brook is conveniently located just moments to Eastport Town Square.",
    "Shady Brook Recreation adult pool, gathering spaces, and Saluki Recreation game room and resort-style family pool.",
    "Shallow Creek Championship Golf Club plus nearby golf including Central Lake Golf Academy and Bellaire Executive.",
    "Cottage homes offer low maintenance with spacious living and screened lanais.",
    "Eastport brings recreation, golf, trails, parks, shopping, dining and waterfront experiences together.",
  ],

  bookletText: [
    "Eastport, our newest town center, brings everything we love about The Villages lifestyle together in one location.",
    "In this 250 acre area you’ll find recreation, golf, trails, parks, shopping and dining connected around Central Lake.",
    "Olympia Recreation includes an indoor gymnasium, rock climbing and outdoor activities.",
    "Golf in the Eastport Area includes Bellaire Executive Course and Central Lake Golf Academy.",
  ],

  areaInfo: [
    "The Village of Shady Brook is located within 1 mile of Eastport Town Center.",
    "Saluki Recreation Center is less than 1/2 mile from this home.",
    "Boosters Bar & Grill is 1.5 miles from this home.",
    "Sawgrass Grill is 3 miles from this home.",
    "Brownwood Paddock Square is 10 miles from this home.",
    "Convenient access to the Florida Turnpike.",
  ],

  amenities: [
    "Air conditioning",
    "WiFi",
    "Kitchen",
    "Lanai",
    "Garage",
    "Communal pool",
    "Pets allowed",
    "Non-smoking",
    "Parking available",
    "Bed linens provided",
    "Towels provided",
    "Washer & Dryer",
    "Dedicated workspace",
    "Lawn / garden",
    "Managed by owner",
  ],

  beds: [
    { type: "King Bed", count: 1 },
    { type: "Queen Bed", count: 1 },
  ],

  rates: [
    { startDate: "Apr 01, 2026", endDate: "Apr 30, 2026", monthly: "$4,500", minStay: "30 nights" },
    { startDate: "May 01, 2026", endDate: "Oct 31, 2026", monthly: "$2,900", minStay: "30 nights" },
    { startDate: "Nov 01, 2026", endDate: "Dec 31, 2026", monthly: "$3,900", minStay: "30 nights" },
    { startDate: "Jan 01, 2027", endDate: "Jan 31, 2027", monthly: "$5,400", minStay: "30 nights" },
    { startDate: "Feb 01, 2027", endDate: "Feb 28, 2027", monthly: "$5,400", minStay: "30 nights" },
    { startDate: "Mar 01, 2027", endDate: "Mar 31, 2027", monthly: "$5,400", minStay: "30 nights" },
  ],

  fees: [
    { name: "Cleaning Fee", amount: "$200" },
    { name: "Residential ID Fee", amount: "$50" },
    { name: "Security Deposit (refundable)", amount: "$500" },
    { name: "Tax Rate", amount: "7.00%" },
  ],

  feeNotes: [
    "Security Deposit $1000 (refundable if no damage to the property)",
    "Rent inclusive of all utilities charges:",
    "Live as a private family residence, and neither the premises nor any part thereof shall be used at any time during the term of this lease by the lessee for the purpose of carrying on any business, profession, or trade of any kind, or for any purpose other than a private single-family residence. Lessee covenants and agrees that if a default shall be made in the payment of rent if the lessee shall violate any of the covenants of this lease, then the lessee shall become a tenant at sufferance, waiving all right of notice and the lessor shall be entitled to re-enter and take possession of the demise premises. Liability It is expressly understood and agreed that the lessor will not be liable for any damages or injury to lessees, guests, or property for whatever cause arising from the occupancy of the leased residence. The lessee agrees to hold the lessor harmless of all liability to the lessee or any third party for any damages or injury to the lessor’s property arising from the occupancy of the leased residence. Maintenance Major maintenance and repair of the leased premises, not due to the lessee’s misuse, waste, or neglect by family members or visitors, shall be the lessor's responsibility or assignees' responsibility. Lessee will keep and maintain the leased property and appurtenances in good and sanitary conditions during the term of this lease. Lessee shall keep the furniture and fixtures in good order. Lessee further agrees, at his/her sole expense, to make all required repairs to the plumbing, range, heating apparatus, and electric fixtures or whatever damage thereto shall have resulted from lessee misuse, waste, or neglect by family members, or visitors. Smoking is not allowed on the premises.",
    "Tax waived for stays of 181+ days",
  ],

  locationInfo: {
    address: "7664 Rutherford Lane",
    village: "The Village of Shady Brook",
    city: "The Villages",
    state: "FL",
  },

  nearbyLocations: [
    { label: "Orlando International Airport", distance: "45 miles", icon: "airport" as const },
    { label: "Eastport/Middleton", distance: "3 miles", icon: "restaurant" as const },
    { label: "Daytona Beach", distance: "60 miles", icon: "beach" as const },
    { label: "Eastport/Shady Brook Golf", distance: "2 miles", icon: "golf" as const },
    { label: "Disney Theme Park", distance: "45 miles", icon: "park" as const },
    { label: "Brownwood Square", distance: "2 miles", icon: "restaurant" as const },
  ],

  activities: [
    { name: "Bicycling", distance: "< 1 mile" },
    { name: "Basketball Court", distance: "1 mile" },
    { name: "Children's Pool", distance: "1 mile" },
    { name: "Golf", distance: "1 mile" },
    { name: "Gym/Fitness Center", distance: "1 mile" },
    { name: "Kayaking", distance: "1 mile" },
    { name: "Live Entertainment", distance: "1 mile" },
    { name: "Park", distance: "1 mile" },
    { name: "Pickleball", distance: "1 mile" },
    { name: "Shopping Area", distance: "1 mile" },
    { name: "Volleyball Court", distance: "1 mile" },
    { name: "Tennis", distance: "2 miles" },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <PropertyHeader
          title={propertyData.title}
          location={propertyData.location}
          propertyType={propertyData.propertyType}
          propertyId={propertyData.id}
        />

        <ImageGallery images={propertyData.images} title={propertyData.title} />

        <div className="mt-6">
          <PropertyHighlights
            bedrooms={propertyData.bedrooms}
            bathrooms={propertyData.bathrooms}
            sqft={propertyData.sqft}
            petFriendly={propertyData.petFriendly}
            nonSmoking={propertyData.nonSmoking}
            sleeps={propertyData.sleeps}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-2">
            {/* ✅ Updated OwnerCard usage */}
            <OwnerCard
              name={propertyData.owner.name}
              joinedDate={propertyData.owner.joinedDate}
              yearPurchased={propertyData.owner.yearPurchased}
              listingsUrl={propertyData.owner.listingsUrl}
              whyTitle="Why this property?"
              whyContent={[
                ...propertyData.highlights,
                ...propertyData.bookletText,
              ]}
            />

            <PropertyDescription
              description={propertyData.description}
              highlights={propertyData.highlights}
              homeFeatures={propertyData.homeFeatures}
              areaInfo={propertyData.areaInfo}
              address={propertyData.propertyDetails}
              specialFeatures={propertyData.specialFeatures}
              uniqueBenefits={propertyData.uniqueBenefits}
              bookletText={propertyData.bookletText}
            />

            <Amenities amenities={propertyData.amenities} beds={propertyData.beds} />
            <RatesTable rates={propertyData.rates} />
            <AvailabilityCalendar />
            <Fees fees={propertyData.fees} notes={propertyData.feeNotes} />

            <Location {...propertyData.locationInfo} nearbyLocations={propertyData.nearbyLocations} />
            <NearbyActivities activities={propertyData.activities} />

            <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
                <p className="text-sm text-accent mt-1">Be the first to write a review!</p>
              </div>

              <Link
                to="/add-review"
                className="inline-flex items-center justify-center rounded-md border border-accent text-accent hover:bg-accent/10 font-medium px-5 h-10 text-sm transition-colors"
              >
                Write a review
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ContactForm />
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary-foreground/70">
            The Villages® is an active senior community for residents 55 and older
          </p>
          <p className="text-xs text-primary-foreground/50 mt-2">
            © 2024-2026 Florida Rentals - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;