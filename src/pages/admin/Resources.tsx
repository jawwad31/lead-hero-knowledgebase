import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus, Edit } from "lucide-react";

const Resources = () => {
  // Mock data
  const resources = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      type: "Guide",
      category: "Development",
      status: "Published",
      updatedAt: "2024-03-15"
    },
    {
      id: 2,
      title: "Deployment Best Practices",
      type: "SOP",
      category: "DevOps",
      status: "Published",
      updatedAt: "2024-03-14"
    },
    {
      id: 3,
      title: "API Design Guidelines",
      type: "Tutorial",
      category: "Backend",
      status: "Draft",
      updatedAt: "2024-03-13"
    },
    {
      id: 4,
      title: "Code Review Process",
      type: "SOP",
      category: "Development",
      status: "Published",
      updatedAt: "2024-03-12"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "Published" ? "default" : "secondary";
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
                <TableHead>Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(resource.status)}>
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-muted">
                    {new Date(resource.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/resources/${resource.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* TODO Block */}
      <div className="text-sm text-text-muted p-4 bg-muted/50 rounded border border-dashed border-card-border">
        TODO: Add search/filtering, bulk actions, pagination, and database integration
      </div>
    </div>
  );
};

export default Resources;