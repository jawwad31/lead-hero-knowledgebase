import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  count: number;
}

const categories: Category[] = [
  { id: "all", name: "All Resources", count: 24 },
  { id: "guides", name: "User Guides", count: 8 },
  { id: "sops", name: "SOPs", count: 6 },
  { id: "tutorials", name: "Tutorials", count: 5 },
  { id: "troubleshooting", name: "Troubleshooting", count: 3 },
  { id: "onboarding", name: "Onboarding", count: 2 },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "secondary"}
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground hover:bg-primary-hover"
              : "bg-secondary hover:bg-secondary-hover"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
          <span className="ml-1 text-xs opacity-70">({category.count})</span>
        </Badge>
      ))}
    </div>
  );
};

export default CategoryFilter;