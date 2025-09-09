import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { useMockStore } from "@/hooks/useMockStore";

const Resources = () => {
  const { resources, categories, deleteResource, getCategoryById, getViewCount } = useMockStore();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      deleteResource(id);
    }
  };

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
                const category = getCategoryById(resource.categoryId);
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
                      {new Date(resource.updatedAt).toLocaleDateString()}
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