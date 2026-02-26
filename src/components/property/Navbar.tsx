import { Home } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              FLORIDA <span className="text-accent">RENTALS</span>
            </h1>
            <p className="text-xs text-primary-foreground/70">
              Book Direct & Save - No Booking Fees
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
