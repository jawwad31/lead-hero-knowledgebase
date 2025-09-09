import { 
  Rocket, 
  Flame, 
  Link2, 
  Bot, 
  Workflow, 
  Target, 
  User, 
  Lightbulb, 
  BookOpen, 
  Code 
} from "lucide-react";
import CategoryCard from "./CategoryCard";

// Demo categories - these will be customized later
const categories = [
  {
    id: "quick-start",
    title: "Quick Start",
    author: "Lead Hero Team",
    articleCount: 6,
    icon: Rocket,
  },
  {
    id: "troubleshooting", 
    title: "Troubleshooting",
    author: "Lead Hero Team",
    articleCount: 4,
    icon: Flame,
  },
  {
    id: "sources",
    title: "Sources",
    author: "Lead Hero Team", 
    articleCount: 5,
    icon: Link2,
  },
  {
    id: "ai-providers",
    title: "AI Providers", 
    author: "Lead Hero Team",
    articleCount: 6,
    icon: Bot,
  },
  {
    id: "job-flows",
    title: "Job Flows",
    author: "Lead Hero Team",
    articleCount: 21,
    icon: Workflow,
  },
  {
    id: "personas",
    title: "Personas",
    author: "Lead Hero Team", 
    articleCount: 3,
    icon: Target,
  },
  {
    id: "account",
    title: "Account",
    author: "Lead Hero Team",
    articleCount: 11,
    icon: User,
  },
  {
    id: "custom-ideas",
    title: "Custom Ideas",
    author: "Lead Hero Team",
    articleCount: 5,
    icon: Lightbulb,
  },
  {
    id: "knowledge-library", 
    title: "Knowledge Library",
    author: "Lead Hero Team",
    articleCount: 2,
    icon: BookOpen,
  },
  {
    id: "developer",
    title: "Developer",
    author: "Lead Hero Team",
    articleCount: 1,
    icon: Code,
  },
];

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid = ({ onCategorySelect }: CategoryGridProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.title}
          author={category.author}
          articleCount={category.articleCount}
          icon={category.icon}
          onClick={() => onCategorySelect(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;