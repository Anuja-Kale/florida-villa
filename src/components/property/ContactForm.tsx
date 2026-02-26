import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const HOST_EMAIL = "jdhabuwala@gmail.com";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    message: "",
  });

  const [dateError, setDateError] = useState("");
  const [emailError, setEmailError] = useState("");

  /* ================= EMAIL ================= */

  const validateEmail = (email: string) => {
    if (!email.includes("@")) {
      setEmailError("Please enter valid email id");
      return false;
    }
    setEmailError("");
    return true;
  };

  /* ================= DATES ================= */

  const validateDates = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) {
      setDateError("");
      return true;
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    if (outDate.getTime() <= inDate.getTime()) {
      setDateError("Check-out must be after check-in.");
      return false;
    }

    setDateError("");
    return true;
  };

  const checkoutMin = formData.checkIn || undefined;

  /* ================= EMAIL CONTENT ================= */

  const subject = useMemo(() => {
    return `Property Inquiry - Eastport Property`;
  }, []);

  const body = useMemo(() => {
    const lines = [
      "Hello Janak,",
      "",
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Check-in: ${formData.checkIn}`,
      `Check-out: ${formData.checkOut}`,
      `Adults: ${formData.adults}`,
      `Children: ${formData.children}`,
      "",
      "Message:",
      formData.message || "(No message)",
    ];

    return lines.join("\n");
  }, [formData]);

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const okEmail = validateEmail(formData.email);
    const okDates = validateDates(formData.checkIn, formData.checkOut);

    if (!okEmail || !okDates) return;

    const mailto = `mailto:${HOST_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  /* ================= UI ================= */

  return (
    <div className="bg-card rounded-xl shadow-elevated p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Contact Host</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Send a message to inquire about this property
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>First name*</Label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Last name*</Label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <Label>Email*</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => {
              const val = e.target.value;
              setFormData({ ...formData, email: val });
              validateEmail(val);
            }}
            required
          />
          {emailError && (
            <p className="text-xs text-destructive mt-1">{emailError}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <Label>Phone*</Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Check-in*</Label>
            <Input
              type="date"
              value={formData.checkIn}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, checkIn: val });
                validateDates(val, formData.checkOut);
              }}
              required
            />
          </div>

          <div>
            <Label>Check-out*</Label>
            <Input
              type="date"
              value={formData.checkOut}
              min={checkoutMin}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, checkOut: val });
                validateDates(formData.checkIn, val);
              }}
              required
            />
          </div>
        </div>

        {dateError && (
          <p className="text-xs text-destructive">{dateError}</p>
        )}

        {/* GUESTS */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Adults*</Label>
            <select
              value={formData.adults}
              onChange={(e) =>
                setFormData({ ...formData, adults: e.target.value })
              }
              className="w-full h-10 border rounded-md px-3"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Children</Label>
            <select
              value={formData.children}
              onChange={(e) =>
                setFormData({ ...formData, children: e.target.value })
              }
              className="w-full h-10 border rounded-md px-3"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* MESSAGE */}
        <div>
          <Label>Message to host</Label>
          <Textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        <Button
  type="submit"
  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
  disabled={!!dateError || !!emailError}
>
  Contact Host
</Button>

        <p className="text-xs text-muted-foreground">
          This will open your email app with a pre-filled message.
        </p>
      </form>
    </div>
  );
};