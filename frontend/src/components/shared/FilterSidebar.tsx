
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Venues", "Catering", "Photography", "Decor", "Entertainment"];
const RATINGS = [5, 4, 3];

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 50000]);

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4">Filters</h3>
        <Button variant="outline" className="w-full rounded-xl mb-6">Clear All</Button>
      </div>

      <Accordion defaultValue={[0, 1, 2]} className="w-full">
        <AccordionItem value="category" className="border-border">
          <AccordionTrigger className="font-semibold hover:no-underline">Category</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`cat-${category}`} />
                <Label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-border">
          <AccordionTrigger className="font-semibold hover:no-underline">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4 pb-2 px-2">
            <Slider
              defaultValue={[0, 50000]}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as number[])}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="px-2 py-1 bg-muted rounded-md border border-border">₹{priceRange[0].toLocaleString()}</span>
              <span className="px-2 py-1 bg-muted rounded-md border border-border">₹{priceRange[1].toLocaleString()}+</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating" className="border-border">
          <AccordionTrigger className="font-semibold hover:no-underline">Minimum Rating</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            {RATINGS.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="text-sm font-medium leading-none flex items-center">
                  {rating} Stars & Up
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
