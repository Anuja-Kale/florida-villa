interface Fee {
  name: string;
  amount: string;
}

interface FeesProps {
  fees: Fee[];
  notes?: string[];
}

export const Fees = ({ fees, notes = [] }: FeesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-primary mb-4">Fees & Policies</h2>

      <div className="bg-secondary/30 rounded-lg p-5">
        <div className="space-y-3">
          {fees.map((fee, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-muted-foreground">{fee.name}</span>
              <span className="font-medium text-foreground">{fee.amount}</span>
            </div>
          ))}
        </div>

        {notes.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Notes:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
