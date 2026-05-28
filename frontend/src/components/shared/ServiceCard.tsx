
import { Link } from 'react-router-dom';
import { Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  durationHours: number;
  maxGuests?: number;
  imageUrl: string;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to={`/service/${service.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md bg-card rounded-2xl group cursor-pointer border-transparent hover:border-border h-full flex flex-col">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={service.imageUrl || "/placeholder.svg"}
            alt={service.name}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4 flex-1">
          <h3 className="font-heading font-semibold text-lg line-clamp-1 mb-2">{service.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{service.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 shrink-0" />
              <span>{service.durationHours} hrs</span>
            </div>
            {service.maxGuests && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 shrink-0" />
                <span>Up to {service.maxGuests}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 border-t border-border/40 mt-auto">
          <div className="mt-4 font-semibold text-primary text-lg">
            ₹{service.price.toLocaleString('en-IN')}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
