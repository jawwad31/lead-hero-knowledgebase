import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { useSupabaseStore } from "@/hooks/useSupabaseStore";

const Resources = () => {
  const { resources, categories, deleteResource, getCategoryById, getViewCount, loading, error } = useSupabaseStore();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteResource(id);
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading resources...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading resources</p>
            <p className="text-text-secondary text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Resources</h1>
          <p className="text-text-secondary">Manage your knowledge base content</p>
        </div>
        <Link to="/admin/resources/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Resource
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => {
                const category = getCategoryById(resource.category_id);
                const viewCount = getViewCount(resource.id);
                
                return (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">{resource.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                    </TableCell>
                    <TableCell>{category?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      <Badge variant={resource.published ? "default" : "secondary"}>
                        {resource.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {viewCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(resource.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/resources/${resource.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(resource.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;