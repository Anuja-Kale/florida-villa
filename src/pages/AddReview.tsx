import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/property/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

const HOST_EMAIL = "jdhabuwala@gmail.com";

const AddReview = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    arrivalMonth: "",
    arrivalYear: "2026",
    title: "",
    review: "",
    email: "",
    certified: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) return;
    if (!formData.certified) return;

    const subject = `New Review - ${formData.title}`;

    const bodyLines = [
      "Hello Janak,",
      "",
      "A new review has been submitted for:",
      "Furnished Eastport Property Pet friendly, The Villages",
      "",
      `Rating: ${rating}/5`,
      `Guest name: ${formData.fullName}`,
      `Arrival: ${formData.arrivalMonth} ${formData.arrivalYear}`,
      `Guest email: ${formData.email}`,
      "",
      "Review title:",
      formData.title,
      "",
      "Review:",
      formData.review,
      "",
      "Certified: Yes",
      "",
      "Thanks!",
    ];

    const mailto = `mailto:${HOST_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border p-8">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-accent hover:underline mb-4 inline-flex items-center gap-1"
            >
              ← Back to property
            </button>

            <h1 className="text-2xl font-bold text-foreground mb-1">
              Write a review
            </h1>

            <div className="border-t border-border my-4" />

            <h2 className="text-xl font-semibold text-foreground">
              Furnished Eastport Property Pet friendly, The Villages
            </h2>

            <p className="text-muted-foreground mb-6">
              Janak Dhabuwala
            </p>

            <div className="border-t border-border mb-6" />

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Stars */}
              <div>
                <Label className="text-sm font-medium">
                  Rate your stay <span className="text-destructive">*</span>
                </Label>

                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-0.5"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= (hoveredRating || rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full name */}
              <div>
                <Label className="text-sm font-medium">
                  Full name of person who booked <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              {/* Arrival */}
              <div>
                <Label className="text-sm font-medium">
                  Date of arrival <span className="text-destructive">*</span>
                </Label>

                <div className="flex gap-3 mt-1">
                  <select
                    value={formData.arrivalMonth}
                    onChange={(e) =>
                      setFormData({ ...formData, arrivalMonth: e.target.value })
                    }
                    required
                    className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Month</option>
                    {[
                      "January","February","March","April","May","June",
                      "July","August","September","October","November","December"
                    ].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={formData.arrivalYear}
                    onChange={(e) =>
                      setFormData({ ...formData, arrivalYear: e.target.value })
                    }
                    required
                    className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {[2026, 2025, 2024].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <Label className="text-sm font-medium">
                  Please enter a title for your review <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              {/* Review */}
              <div>
                <Label className="text-sm font-medium">
                  Your review <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  value={formData.review}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                  required
                  minLength={100}
                  className="mt-1 min-h-[150px]"
                />
              </div>

              {/* Email */}
              <div>
                <Label className="text-sm font-medium">
                  Your email <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              {/* Certified */}
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={formData.certified}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, certified: checked === true })
                  }
                  className="mt-0.5"
                />
                <Label className="text-sm leading-snug">
                  I certify that this review is based on my own experience and is my genuine opinion.
                </Label>
              </div>

              {/* Button unchanged */}
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
              >
                Continue
              </Button>

            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <img
              src="https://assets.floridarentals.com/assets/properties/19150/tn1_176936722517668511840.avif"
              alt="Furnished Eastport Property"
              className="rounded-xl w-full object-cover"
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default AddReview;