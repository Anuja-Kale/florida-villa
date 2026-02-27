// src/components/property/RatesTable.tsx
import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type CurrencyCode =
  | "USD"
  | "AUD"
  | "CAD"
  | "CHF"
  | "EUR"
  | "GBP"
  | "JPY"
  | "MXN";

export interface Rate {
  startDate: string; // "Apr 01, 2026"
  endDate: string; // "Apr 30, 2026"
  nightly?: string; // "$150"
  weekendNight?: string; // "$175"
  weekly?: string; // "$900"
  monthly?: string; // "$4,500"
  minStay: string; // "30 nights"
}

interface RatesTableProps {
  rates: Rate[];
}

const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: "USD", label: "$ USD" },
  { code: "AUD", label: "$ AUD" },
  { code: "CAD", label: "$ CAD" },
  { code: "CHF", label: "₣ CHF" },
  { code: "EUR", label: "€ EUR" },
  { code: "GBP", label: "£ GBP" },
  { code: "JPY", label: "¥ JPY" },
  { code: "MXN", label: "$ MXN" },
];

// Static multipliers just for demo. Replace with real FX later if you want.
const FX: Record<CurrencyCode, number> = {
  USD: 1,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.9,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150,
  MXN: 17.2,
};

function parseMoneyToNumber(v?: string) {
  if (!v) return null;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function formatMoney(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 0,
  }).format(amount);
}

export const RatesTable = ({ rates }: RatesTableProps) => {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [openCurrency, setOpenCurrency] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visibleRates = useMemo(() => {
    return expanded ? rates : rates.slice(0, 6);
  }, [rates, expanded]);

  const convert = (v?: string) => {
    const base = parseMoneyToNumber(v);
    if (base === null) return "";
    return formatMoney(base * FX[currency], currency);
  };

  const labelValue = (label: string, value: string) => (
    <div className="flex items-center justify-between gap-4 py-2 border-t border-border/40">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden mb-6">
      {/* Header */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h3 className="text-3xl font-semibold text-foreground">Rates</h3>
            <p className="mt-2 text-base text-foreground">
              <span className="font-semibold">Rental basis:</span>{" "}
              <span className="text-muted-foreground">Per property</span>
            </p>
          </div>

          {/* Currency dropdown */}
          <div className="relative sm:text-right">
            <div className="text-sm text-foreground font-semibold mb-2">
              Rental rates quoted in
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 px-4 rounded-lg border-primary text-primary font-semibold w-full sm:w-auto"
              onClick={() => setOpenCurrency((v) => !v)}
            >
              {CURRENCIES.find((c) => c.code === currency)?.label ?? currency}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>

            {openCurrency && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-popover shadow-elevated overflow-hidden z-20">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/60"
                    onClick={() => {
                      setCurrency(c.code);
                      setOpenCurrency(false);
                    }}
                  >
                    <span className="font-semibold text-foreground">{c.label}</span>
                    {c.code === currency && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile: Cards */}
      <div className="px-6 pb-6 sm:hidden">
        <div className="space-y-4">
          {visibleRates.map((r, idx) => (
            <div
              key={`${r.startDate}-${r.endDate}-${idx}`}
              className="rounded-xl border border-border bg-secondary/20 overflow-hidden"
            >
              <div className="p-4 bg-secondary/30">
                <div className="text-sm font-semibold text-foreground">Rate Period</div>
                <div className="text-sm text-foreground mt-1">
                  {r.startDate} - {r.endDate}
                </div>
              </div>

              <div className="p-4">
                {labelValue("Nightly", r.nightly ? convert(r.nightly) : "—")}
                {labelValue("Weekend Night", r.weekendNight ? convert(r.weekendNight) : "—")}
                {labelValue("Weekly", r.weekly ? convert(r.weekly) : "—")}
                {labelValue("Monthly", r.monthly ? convert(r.monthly) : "—")}
                {labelValue("Min Stay", r.minStay)}
              </div>
            </div>
          ))}
        </div>

        {rates.length > 6 && (
          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 rounded-lg border-primary text-primary font-semibold w-full"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "View less periods" : "View more periods"}
              {expanded ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* ✅ Desktop: Table (unchanged layout) */}
      <div className="px-6 pb-6 hidden sm:block">
        <div className="rounded-xl overflow-hidden bg-secondary/20">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-semibold text-foreground py-4">
                  Rate Period
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  Nightly
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  Weekend Night
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  Weekly
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  Monthly
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  Min Stay
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visibleRates.map((r, idx) => (
                <TableRow
                  key={`${r.startDate}-${r.endDate}-${idx}`}
                  className={idx % 2 === 1 ? "bg-secondary/30" : "bg-transparent"}
                >
                  <TableCell className="py-6 font-medium text-foreground">
                    {r.startDate} - {r.endDate}
                  </TableCell>

                  <TableCell className="py-6 text-foreground">
                    {r.nightly ? convert(r.nightly) : ""}
                  </TableCell>

                  <TableCell className="py-6 text-foreground">
                    {r.weekendNight ? convert(r.weekendNight) : ""}
                  </TableCell>

                  <TableCell className="py-6 text-foreground">
                    {r.weekly ? convert(r.weekly) : ""}
                  </TableCell>

                  <TableCell className="py-6 text-foreground font-semibold">
                    {r.monthly ? convert(r.monthly) : ""}
                  </TableCell>

                  <TableCell className="py-6 text-foreground font-medium">
                    {r.minStay}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {rates.length > 6 && (
          <div className="mt-5">
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 rounded-lg border-primary text-primary font-semibold"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "View less periods" : "View more periods"}
              {expanded ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};