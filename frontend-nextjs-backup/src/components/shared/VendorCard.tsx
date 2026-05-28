import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Award } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceStart: number;
  imageUrl: string;
  isFeatured?: boolean;
}

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link href={`/vendor/${vendor.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 bg-card rounded-2xl group cursor-pointer border-transparent hover:border-border">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={vendor.imageUrl || "/placeholder.svg"}
            alt={vendor.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {vendor.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-none font-semibold shadow-sm">
              <Award className="w-3 h-3 mr-1" /> Featured
            </Badge>
          )}
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/90 px-2 py-1 rounded-md text-xs font-semibold flex items-center shadow-sm">
            <Star className="w-3 h-3 text-accent fill-accent mr-1" />
            <span>{vendor.rating.toFixed(1)}</span>
            <span className="text-muted-foreground ml-1">({vendor.reviewCount})</span>
          </div>
        </div>
        
        <CardContent className="p-4 pt-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-semibold text-lg line-clamp-1">{vendor.name}</h3>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            <span className="line-clamp-1">{vendor.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-normal text-xs bg-muted">
              {vendor.category}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-border/40 mt-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Starts at </span>
            <span className="font-semibold text-foreground">₹{vendor.priceStart.toLocaleString('en-IN')}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
