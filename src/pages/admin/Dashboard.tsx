import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Calendar } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalResources: 47,
    publishedCount: 42,
    draftCount: 5
  };

  const recentResources = [
    { id: 1, title: "Getting Started with React Hooks", type: "Guide", updatedAt: "2024-03-15" },
    { id: 2, title: "Deployment Best Practices", type: "SOP", updatedAt: "2024-03-14" },
    { id: 3, title: "API Design Guidelines", type: "Tutorial", updatedAt: "2024-03-13" },
    { id: 4, title: "Code Review Process", type: "SOP", updatedAt: "2024-03-12" },
    { id: 5, title: "Testing Strategies", type: "Guide", updatedAt: "2024-03-11" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Overview of your knowledge base</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <FileText className="h-4 w-4 text-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.totalResources}</div>
            <p className="text-xs text-text-muted">All resources in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.publishedCount}</div>
            <p className="text-xs text-text-muted">Currently visible to users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Calendar className="h-4 w-4 text-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.draftCount}</div>
            <p className="text-xs text-text-muted">Unpublished resources</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Edited</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                <div>
                  <p className="font-medium text-text-primary">{resource.title}</p>
                  <p className="text-sm text-text-secondary">{resource.type}</p>
                </div>
                <div className="text-sm text-text-muted">
                  {new Date(resource.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TODO Block */}
      <div className="text-sm text-text-muted p-4 bg-muted/50 rounded border border-dashed border-card-border">
        TODO: Add real-time stats, analytics charts, and database integration
      </div>
    </div>
  );
};

export default Dashboard;