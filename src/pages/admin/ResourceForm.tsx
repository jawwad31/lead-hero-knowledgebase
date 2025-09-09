import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useMockStore } from "@/hooks/useMockStore";
import { useToast } from "@/hooks/use-toast";
import { sanitizeHtml, slugify, validateEmbedUrl } from "@/utils/sanitizeHtml";

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
    slug: "",
    type: "",
    category: "",
    tags: "",
    content: "",
    youtubeUrl: "",
    ogImage: "",
    published: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && id) {
      const resource = getResourceById(id);
      if (resource) {
        setFormData({
          title: resource.title,
          slug: resource.slug,
          type: resource.type,
          category: resource.categoryId,
          tags: resource.tags.join(", "),
          content: resource.bodyHtml,
          youtubeUrl: resource.youtubeUrl || "",
          ogImage: resource.ogImage || "",
          published: resource.published,
        });
      }
    }
  }, [id, isEdit, getResourceById]);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEdit || prev.slug === slugify(prev.title) ? slugify(title) : prev.slug
    }));
  };

  const isFormValid = () => {
    const newErrors: Record<string, string> = {};

    // Title validation (3-120 chars)
    if (!formData.title.trim() || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 120) {
      newErrors.title = "Title must be 120 characters or less";
    }

    // Slug validation (3-140 chars, alphanumeric + hyphens)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!formData.slug.trim() || formData.slug.length < 3) {
      newErrors.slug = "Slug must be at least 3 characters";
    } else if (formData.slug.length > 140) {
      newErrors.slug = "Slug must be 140 characters or less";  
    } else if (!slugRegex.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    // Type validation
    if (!formData.type || !['guide', 'sop', 'tutorial'].includes(formData.type)) {
      newErrors.type = "Please select a valid resource type";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    // Tags validation (each 1-24 chars, max 10 tags)
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    if (tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed";
    } else {
      const invalidTags = tags.filter(tag => tag.length < 1 || tag.length > 24);
      if (invalidTags.length > 0) {
        newErrors.tags = "Each tag must be 1-24 characters";
      }
    }

    // YouTube URL validation
    if (formData.youtubeUrl && !validateEmbedUrl(formData.youtubeUrl)) {
      newErrors.youtubeUrl = "Please enter a valid YouTube, Loom, or Vimeo URL";
    }

    // OG Image URL validation
    if (formData.ogImage && formData.ogImage.trim()) {
      const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
      if (!urlRegex.test(formData.ogImage.trim())) {
        newErrors.ogImage = "Please enter a valid image URL (jpg, jpeg, png, webp, gif)";
      }
    }

    // Content validation (1-80k chars)
    if (!formData.content.trim() || formData.content.length < 1) {
      newErrors.content = "Content is required";
    } else if (formData.content.length > 80000) {
      newErrors.content = "Content must be 80,000 characters or less";
    }

    return Object.keys(newErrors).length === 0;
  };

  const checkValidation = () => {
    const newErrors: Record<string, string> = {};

    // Title validation (3-120 chars)
    if (!formData.title.trim() || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 120) {
      newErrors.title = "Title must be 120 characters or less";
    }

    // Slug validation (3-140 chars, alphanumeric + hyphens)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!formData.slug.trim() || formData.slug.length < 3) {
      newErrors.slug = "Slug must be at least 3 characters";
    } else if (formData.slug.length > 140) {
      newErrors.slug = "Slug must be 140 characters or less";  
    } else if (!slugRegex.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    // Type validation
    if (!formData.type || !['guide', 'sop', 'tutorial'].includes(formData.type)) {
      newErrors.type = "Please select a valid resource type";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    // Tags validation (each 1-24 chars, max 10 tags)
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    if (tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed";
    } else {
      const invalidTags = tags.filter(tag => tag.length < 1 || tag.length > 24);
      if (invalidTags.length > 0) {
        newErrors.tags = "Each tag must be 1-24 characters";
      }
    }

    // YouTube URL validation
    if (formData.youtubeUrl && !validateEmbedUrl(formData.youtubeUrl)) {
      newErrors.youtubeUrl = "Please enter a valid YouTube, Loom, or Vimeo URL";
    }

    // OG Image URL validation
    if (formData.ogImage && formData.ogImage.trim()) {
      const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
      if (!urlRegex.test(formData.ogImage.trim())) {
        newErrors.ogImage = "Please enter a valid image URL (jpg, jpeg, png, webp, gif)";
      }
    }

    // Content validation (1-80k chars)
    if (!formData.content.trim() || formData.content.length < 1) {
      newErrors.content = "Content is required";
    } else if (formData.content.length > 80000) {
      newErrors.content = "Content must be 80,000 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkValidation()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const sanitizedContent = sanitizeHtml(formData.content);
      
      const resourceData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        type: formData.type as 'guide' | 'sop' | 'tutorial',
        categoryId: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        bodyHtml: sanitizedContent,
        youtubeUrl: formData.youtubeUrl.trim() || undefined,
        ogImage: formData.ogImage.trim() || undefined,
        published: formData.published,
        updatedAt: new Date().toISOString(),
        author: "Admin User",
        description: sanitizedContent.replace(/<[^>]*>/g, '').slice(0, 160),
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter resource title (3-120 characters)"
                className={errors.title ? "border-destructive" : ""}
                required
              />
              {errors.title && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: slugify(e.target.value)})}
                placeholder="url-friendly-slug (3-140 characters)"
                className={errors.slug ? "border-destructive" : ""}
                required
              />
              <p className="text-xs text-muted-foreground">
                Lowercase letters, numbers, and hyphens only. Auto-generated from title.
              </p>
              {errors.slug && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.slug}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="sop">SOP</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {errors.type}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className={errors.category ? "border-destructive" : ""}>
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
                {errors.category && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {errors.category}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3 (max 10 tags, 1-24 chars each)"
                className={errors.tags ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated tags, maximum 10 tags, each 1-24 characters
              </p>
              {errors.tags && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.tags}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube">Video URL (optional)</Label>
              <Input
                id="youtube"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                placeholder="YouTube, Loom, or Vimeo URL"
                className={errors.youtubeUrl ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground">
                Supports YouTube, Loom, and Vimeo embeds
              </p>
              {errors.youtubeUrl && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.youtubeUrl}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL (optional)</Label>
              <Input
                id="ogImage"
                value={formData.ogImage}
                onChange={(e) => setFormData({...formData, ogImage: e.target.value})}
                placeholder="https://example.com/image.jpg"
                className={errors.ogImage ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground">
                Custom Open Graph image for social sharing (jpg, jpeg, png, webp, gif)
              </p>
              {errors.ogImage && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.ogImage}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Rich Content (HTML) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Enter HTML content (1-80,000 characters)..."
                className={`min-h-[300px] ${errors.content ? "border-destructive" : ""}`}
                required
              />
              <p className="text-xs text-muted-foreground">
                HTML content will be sanitized for security. {formData.content.length}/80,000 characters
              </p>
              {errors.content && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.content}
                </div>
              )}
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
                <p className="text-sm text-muted-foreground">
                  {isFormValid() 
                    ? "Make this resource visible to users" 
                    : "Fix validation errors to enable publishing"
                  }
                </p>
              </div>
              <Switch
                id="published"
                checked={formData.published && isFormValid()}
                disabled={!isFormValid()}
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