import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export function AddOnCard({ addOn, onAdd }: { addOn: AddOn; onAdd?: (id: string) => void }) {
  return (
    <Card className="bg-card rounded-2xl border border-border shadow-sm">
      <CardContent className="p-4 flex justify-between items-center gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-base mb-1">{addOn.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{addOn.description}</p>
          <div className="font-medium text-foreground">
            +₹{addOn.price.toLocaleString('en-IN')}
          </div>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-xl shrink-0 h-10 w-10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={(e) => {
            e.preventDefault();
            if (onAdd) onAdd(addOn.id);
          }}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
