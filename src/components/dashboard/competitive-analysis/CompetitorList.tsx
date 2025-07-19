import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Globe,
  Users,
  Building,
  DollarSign,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SWOTAnalysis } from "./SWOTAnalysis";
import type { Competitor } from "../CompetitiveAnalysis";

interface CompetitorListProps {
  competitors: Competitor[];
  onAdd: (competitor: Competitor) => void;
  onUpdate: (id: string, updates: Partial<Competitor>) => void;
  onDelete: (id: string) => void;
}

export const CompetitorList = ({
  competitors,
  onAdd,
  onUpdate,
  onDelete,
}: CompetitorListProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    size: "",
    region: "",
    industry: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    pricingModel: "",
    startingPrice: "",
    features: "",
    investors: "",
    positioning: "",
    revenue: "",
    employees: "",
    founded: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      website: "",
      description: "",
      size: "",
      region: "",
      industry: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      pricingModel: "",
      startingPrice: "",
      features: "",
      investors: "",
      positioning: "",
      revenue: "",
      employees: "",
      founded: "",
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please provide at least name and description.",
        variant: "destructive",
      });
      return;
    }

    const competitorData: Competitor = {
      id: editingCompetitor?.id || `manual-${Date.now()}`,
      name: formData.name,
      website: formData.website,
      description: formData.description,
      size: (formData.size as any) || "medium",
      region: formData.region,
      industry: formData.industry,
      socialLinks: {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        facebook: formData.facebook,
      },
      pricing: {
        model: formData.pricingModel,
        startingPrice: formData.startingPrice,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
      },
      investors: formData.investors
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
      positioning: formData.positioning,
      marketShare: 0,
      revenue: formData.revenue,
      employees: formData.employees,
      founded: formData.founded,
      swotAnalysis: editingCompetitor?.swotAnalysis || {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
      },
    };

    if (editingCompetitor) {
      onUpdate(editingCompetitor.id, competitorData);
      toast({
        title: "Competitor Updated",
        description: `${competitorData.name} has been updated successfully.`,
      });
    } else {
      onAdd(competitorData);
      toast({
        title: "Competitor Added",
        description: `${competitorData.name} has been added to your competitor list.`,
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
    setEditingCompetitor(null);
  };

  const handleEdit = (competitor: Competitor) => {
    setFormData({
      name: competitor.name,
      website: competitor.website,
      description: competitor.description,
      size: competitor.size,
      region: competitor.region,
      industry: competitor.industry,
      linkedin: competitor.socialLinks.linkedin || "",
      twitter: competitor.socialLinks.twitter || "",
      facebook: competitor.socialLinks.facebook || "",
      pricingModel: competitor.pricing.model,
      startingPrice: competitor.pricing.startingPrice,
      features: competitor.pricing.features.join(", "),
      investors: competitor.investors.join(", "),
      positioning: competitor.positioning,
      revenue: competitor.revenue,
      employees: competitor.employees,
      founded: competitor.founded,
    });
    setEditingCompetitor(competitor);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete(id);
      toast({
        title: "Competitor Deleted",
        description: `${name} has been removed from your competitor list.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Competitor Management</h2>
          <p className="text-muted-foreground">
            Manage and analyze your competitors
          </p>
        </div>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) {
              resetForm();
              setEditingCompetitor(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Competitor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCompetitor ? "Edit Competitor" : "Add New Competitor"}
              </DialogTitle>
              <DialogDescription>
                {editingCompetitor
                  ? "Update competitor information"
                  : "Enter competitor details manually"}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="social">Social & Links</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Company description and value proposition"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, size: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">Employees</Label>
                    <Input
                      id="employees"
                      value={formData.employees}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          employees: e.target.value,
                        }))
                      }
                      placeholder="e.g., 50-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded</Label>
                    <Input
                      id="founded"
                      value={formData.founded}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          founded: e.target.value,
                        }))
                      }
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          region: e.target.value,
                        }))
                      }
                      placeholder="e.g., North America"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          industry: e.target.value,
                        }))
                      }
                      placeholder="e.g., SaaS"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pricingModel">Pricing Model</Label>
                    <Input
                      id="pricingModel"
                      value={formData.pricingModel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pricingModel: e.target.value,
                        }))
                      }
                      placeholder="e.g., Subscription"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startingPrice">Starting Price</Label>
                    <Input
                      id="startingPrice"
                      value={formData.startingPrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startingPrice: e.target.value,
                        }))
                      }
                      placeholder="e.g., $99/month"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Key Features</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        features: e.target.value,
                      }))
                    }
                    placeholder="Feature 1, Feature 2, Feature 3..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investors">Investors</Label>
                  <Input
                    id="investors"
                    value={formData.investors}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        investors: e.target.value,
                      }))
                    }
                    placeholder="Investor 1, Investor 2, Investor 3..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenue">Revenue</Label>
                  <Input
                    id="revenue"
                    value={formData.revenue}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        revenue: e.target.value,
                      }))
                    }
                    placeholder="e.g., $50M ARR"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="positioning">Market Positioning</Label>
                  <Textarea
                    id="positioning"
                    value={formData.positioning}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        positioning: e.target.value,
                      }))
                    }
                    placeholder="How they position themselves in the market..."
                    rows={2}
                  />
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          linkedin: e.target.value,
                        }))
                      }
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">X (Twitter)</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          twitter: e.target.value,
                        }))
                      }
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          facebook: e.target.value,
                        }))
                      }
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                  setEditingCompetitor(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingCompetitor ? "Update" : "Add"} Competitor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {competitors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Competitors Added</h3>
            <p className="text-muted-foreground mb-4">
              Start by discovering competitors with AI or add them manually
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {competitors.map((competitor) => (
            <Card key={competitor.id} className="space-y-4">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {competitor.name}
                      {competitor.website && (
                        <a
                          href={competitor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </CardTitle>
                    <CardDescription>{competitor.description}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(competitor)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDelete(competitor.id, competitor.name)
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Building className="w-3 h-3" />
                    {competitor.size}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" />
                    {competitor.region}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Users className="w-3 h-3" />
                    {competitor.employees}
                  </Badge>
                  {competitor.pricing.startingPrice && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <DollarSign className="w-3 h-3" />
                      {competitor.pricing.startingPrice}
                    </Badge>
                  )}
                </div>

                <div className="text-sm space-y-1">
                  {competitor.revenue && (
                    <div>
                      <strong>Revenue:</strong> {competitor.revenue}
                    </div>
                  )}
                  {competitor.founded && (
                    <div>
                      <strong>Founded:</strong> {competitor.founded}
                    </div>
                  )}
                  {competitor.investors.length > 0 && (
                    <div>
                      <strong>Investors:</strong>{" "}
                      {competitor.investors.slice(0, 2).join(", ")}
                    </div>
                  )}
                </div>

                {competitor.positioning && (
                  <div className="text-sm">
                    <strong>Positioning:</strong> {competitor.positioning}
                  </div>
                )}

                <SWOTAnalysis
                  competitor={competitor}
                  onUpdate={(swotData) =>
                    onUpdate(competitor.id, { swotAnalysis: swotData })
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
