import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useMockStore } from "@/hooks/useMockStore";
import { useToast } from "@/hooks/use-toast";

const ResourceForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  
  const { 
    getResourceById, 
    categories, 
    createResource, 
    updateResource 
  } = useMockStore();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    tags: "",
    content: "",
    youtubeUrl: "",
    published: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      const resource = getResourceById(id);
      if (resource) {
        setFormData({
          title: resource.title,
          type: resource.type,
          category: resource.categoryId,
          tags: resource.tags.join(", "),
          content: resource.bodyHtml,
          youtubeUrl: resource.youtubeUrl || "",
          published: resource.published,
        });
      }
    }
  }, [id, isEdit, getResourceById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const resourceData = {
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        type: formData.type as 'guide' | 'sop' | 'tutorial',
        categoryId: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        bodyHtml: formData.content,
        youtubeUrl: formData.youtubeUrl || undefined,
        published: formData.published,
        updatedAt: new Date().toISOString(),
        author: "Admin User", // In a real app, this would come from auth
        description: formData.content.replace(/<[^>]*>/g, '').slice(0, 160),
      };

      if (isEdit && id) {
        updateResource(id, resourceData);
        toast({
          title: "Resource updated",
          description: "The resource has been successfully updated.",
        });
      } else {
        createResource(resourceData);
        toast({
          title: "Resource created",
          description: "The new resource has been successfully created.",
        });
      }
      
      navigate("/admin/resources");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/resources")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            {isEdit ? "Edit Resource" : "New Resource"}
          </h1>
          <p className="text-text-secondary">
            {isEdit ? `Editing resource` : "Create a new knowledge base resource"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
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
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3 (comma separated)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube URL (optional)</Label>
              <Input
                id="youtube"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                placeholder="https://www.youtube.com/watch?v=..."
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
              <Label htmlFor="content">Rich Content (HTML)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Enter HTML content..."
                className="min-h-[300px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent>
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
                onCheckedChange={(checked) => setFormData({...formData, published: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          {isEdit ? "Update Resource" : "Create Resource"}
        </Button>
      </form>
    </div>
  );
};

export default ResourceForm;