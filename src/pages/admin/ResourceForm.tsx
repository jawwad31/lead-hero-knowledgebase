import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

const ResourceForm = () => {
  const { id } = useParams();
  const isEditing = !!id;

  // Mock data for editing
  const [formData, setFormData] = useState({
    title: isEditing ? "Getting Started with React Hooks" : "",
    type: isEditing ? "guide" : "",
    category: isEditing ? "development" : "",
    tags: isEditing ? "react, hooks, javascript, frontend" : "",
    content: isEditing ? "<h2>Introduction to React Hooks</h2><p>React Hooks are a powerful feature...</p>" : "",
    youtubeUrl: isEditing ? "https://www.youtube.com/watch?v=TNhaISOUy6Q" : "",
    published: isEditing ? true : false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/resources">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            {isEditing ? "Edit Resource" : "New Resource"}
          </h1>
          <p className="text-text-secondary">
            {isEditing ? `Editing resource #${id}` : "Create a new knowledge base resource"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter resource title"
                  className="bg-surface border-card-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="bg-surface border-card-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="sop">SOP</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-surface border-card-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="react, hooks, javascript (comma separated)"
                  className="bg-surface border-card-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL (optional)</Label>
                <Input
                  id="youtube"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleInputChange("youtubeUrl", e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="bg-surface border-card-border"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="content">Rich Content</Label>
                <div className="min-h-[300px] border border-card-border rounded-md bg-surface p-4">
                  <div className="text-text-muted text-sm mb-2">
                    TODO: Replace with TipTap rich text editor
                  </div>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Enter resource content (HTML for now, will be TipTap editor)"
                    className="min-h-[250px] bg-transparent border-0 resize-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="published">Published</Label>
                  <p className="text-sm text-text-muted">
                    Make this resource visible to users
                  </p>
                </div>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleInputChange("published", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Resource
            </Button>
            <Button variant="outline" className="w-full">
              Save as Draft
            </Button>
          </div>

          {/* TODO Block */}
          <div className="text-xs text-text-muted p-3 bg-muted/50 rounded border border-dashed border-card-border">
            TODO: Add auto-save, preview mode, revision history, and form validation
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceForm;