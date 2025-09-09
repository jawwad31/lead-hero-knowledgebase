import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMockStore } from "@/hooks/useMockStore";

const Dashboard = () => {
  const { stats, categories } = useMockStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-2">Overview of your knowledge base</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResources}</div>
            <p className="text-xs text-text-muted">All resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedResources}</div>
            <p className="text-xs text-text-muted">
              {Math.round((stats.publishedResources / stats.totalResources) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-text-muted">All-time views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-text-muted">Active categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Edited Resources</CardTitle>
          <CardDescription>Last 5 resources that were modified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentlyEdited.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{resource.title}</div>
                  <div className="text-sm text-text-secondary">
                    Updated {formatDate(resource.updatedAt)} • {resource.author}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={resource.published ? "default" : "secondary"}>
                    {resource.published ? "Published" : "Draft"}
                  </Badge>
                  <Badge variant="outline">{resource.type}</Badge>
                </div>
              </div>
            ))}
            {stats.recentlyEdited.length === 0 && (
              <div className="text-sm text-text-muted text-center py-4">
                No resources found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;