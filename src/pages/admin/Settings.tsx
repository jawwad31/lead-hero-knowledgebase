import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, Download, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [siteTitle, setSiteTitle] = useState("Lead Hero Knowledge Base");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary">Configure your knowledge base</p>
      </div>

      {/* Site Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Site Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site-title">Site Title</Label>
            <Input
              id="site-title"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Your Knowledge Base Title"
              className="bg-surface border-card-border"
            />
            <p className="text-sm text-text-muted">
              This will appear in the header and browser title
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Site Logo</Label>
            <div className="border-2 border-dashed border-card-border rounded-lg p-8 text-center bg-surface/50">
              <Upload className="h-8 w-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-muted mb-2">
                Click to upload logo or drag and drop
              </p>
              <p className="text-xs text-text-muted">
                PNG, JPG up to 2MB. Recommended: 200x50px
              </p>
              <Button variant="outline" className="mt-3" disabled>
                Upload Logo
              </Button>
            </div>
            <p className="text-sm text-text-muted">
              Upload functionality will be available soon
            </p>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-card-border rounded-lg bg-surface/50">
            <div>
              <h3 className="font-semibold text-text-primary">Export Data</h3>
              <p className="text-sm text-text-secondary">
                Download all your knowledge base content as JSON
              </p>
            </div>
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-card-border rounded-lg bg-surface/50">
            <div>
              <h3 className="font-semibold text-text-primary">Import Data</h3>
              <p className="text-sm text-text-secondary">
                Upload JSON file to import resources and collections
              </p>
            </div>
            <Button variant="outline" disabled>
              <Upload className="mr-2 h-4 w-4" />
              Import JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics & Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-card-border rounded-lg bg-surface/50">
              <h4 className="font-semibold text-text-primary mb-2">Search Analytics</h4>
              <p className="text-sm text-text-secondary">
                Track what users are searching for
              </p>
              <p className="text-xs text-text-muted mt-2">Coming soon</p>
            </div>

            <div className="p-4 border border-card-border rounded-lg bg-surface/50">
              <h4 className="font-semibold text-text-primary mb-2">Popular Content</h4>
              <p className="text-sm text-text-secondary">
                See your most viewed resources
              </p>
              <p className="text-xs text-text-muted mt-2">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;