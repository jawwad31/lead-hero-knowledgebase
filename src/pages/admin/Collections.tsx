import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, GripVertical, Edit, Trash2 } from "lucide-react";
import { useMockStore } from "@/hooks/useMockStore";
import { useToast } from "@/hooks/use-toast";

const Collections = () => {
  const { categories, createCategory, updateCategory, deleteCategory } = useMockStore();
  const { toast } = useToast();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      try {
        createCategory({
          name: newCategoryName,
          slug: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
          order: categories.length + 1
        });
        setNewCategoryName("");
        toast({
          title: "Category created",
          description: "The new category has been successfully created.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create category. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      toast({
        title: "Category deleted",
        description: "The category has been successfully deleted.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Collections</h1>
        <p className="text-text-secondary">Organize your resources into categories</p>
      </div>

      {/* Create New Category */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <Button onClick={handleAddCategory}>
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
          <CardDescription>Drag to reorder categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <div key={category.id} className="flex items-center gap-4 p-4 border rounded-xl bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-240 ease-out">
                  <GripVertical className="h-5 w-5 text-text-muted cursor-grab hover:text-primary transition-colors" />
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{category.name}</div>
                    <div className="text-sm text-text-muted">/{category.slug}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="hover:bg-accent-light hover:text-primary">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Collections;