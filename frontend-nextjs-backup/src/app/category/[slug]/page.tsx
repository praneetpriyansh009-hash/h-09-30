import { FilterSidebar } from "@/components/shared/FilterSidebar";
import { VendorCard, Vendor } from "@/components/shared/VendorCard";

// Mock data
const CATEGORY_VENDORS: Vendor[] = [
  { id: "v1", name: "Lumina Events", category: "Decor", location: "Mumbai", rating: 4.9, reviewCount: 128, priceStart: 25000, imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80", isFeatured: true },
  { id: "v2", name: "Spice Route", category: "Catering", location: "Delhi", rating: 4.7, reviewCount: 84, priceStart: 1500, imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80" },
  { id: "v3", name: "Floral Fantasy", category: "Decor", location: "Mumbai", rating: 4.8, reviewCount: 56, priceStart: 15000, imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" },
  { id: "v4", name: "Grand Occasions", category: "Decor", location: "Bangalore", rating: 4.5, reviewCount: 42, priceStart: 18000, imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80" },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4">{categoryName} Vendors</h1>
        <p className="text-muted-foreground text-lg">
          Find the perfect {params.slug} professionals for your next celebration.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">{CATEGORY_VENDORS.length} results found</p>
            <select className="bg-transparent border border-border rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_VENDORS.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
