import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const Collections = () => {
  // Mock data
  const [collections, setCollections] = useState([
    { id: 1, name: "Development", description: "Programming and development resources", resourceCount: 15, color: "#3b82f6" },
    { id: 2, name: "DevOps", description: "Deployment and operations guides", resourceCount: 8, color: "#10b981" },
    { id: 3, name: "Backend", description: "Server-side development", resourceCount: 12, color: "#f59e0b" },
    { id: 4, name: "Frontend", description: "User interface and experience", resourceCount: 10, color: "#ef4444" },
    { id: 5, name: "Design", description: "UI/UX design resources", resourceCount: 6, color: "#8b5cf6" }
  ]);

  const [newCollectionName, setNewCollectionName] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Collections</h1>
        <p className="text-text-secondary">Organize your resources into categories</p>
      </div>

      {/* Create New Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name"
              className="bg-surface border-card-border"
            />
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collections List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Existing Collections
            <Badge variant="secondary" className="text-xs">
              Drag to reorder
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="flex items-center gap-4 p-4 border border-card-border rounded-lg bg-surface/50 hover:bg-surface transition-colors"
              >
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing text-text-muted hover:text-text-primary">
                  <GripVertical className="h-5 w-5" />
                </div>

                {/* Color Indicator */}
                <div 
                  className="w-4 h-4 rounded-full border border-card-border"
                  style={{ backgroundColor: collection.color }}
                />

                {/* Collection Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-text-primary">{collection.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {collection.resourceCount} resources
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary truncate">
                    {collection.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TODO Block */}
      <div className="text-sm text-text-muted p-4 bg-muted/50 rounded border border-dashed border-card-border">
        TODO: Implement drag-and-drop reordering, collection editing modal, bulk resource assignment, and database integration
      </div>
    </div>
  );
};

export default Collections;