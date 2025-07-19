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
  Search,
  Sparkles,
  Globe,
  Users,
  Building,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Competitor } from "../CompetitiveAnalysis";

interface AICompetitorDiscoveryProps {
  onCompetitorsFound: (competitor: Competitor) => void;
}

export const AICompetitorDiscovery = ({
  onCompetitorsFound,
}: AICompetitorDiscoveryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [discoveredCompetitors, setDiscoveredCompetitors] = useState<
    Competitor[]
  >([]);
  const [formData, setFormData] = useState({
    industry: "",
    businessDescription: "",
    region: "",
    companySize: "",
  });

  const handleDiscover = async () => {
    if (!formData.industry || !formData.businessDescription) {
      toast({
        title: "Missing Information",
        description:
          "Please provide industry and business description to discover competitors.",
        variant: "destructive",
      });
      alert("Missing required information!");
      return;
    }

    setIsLoading(true);

    // Simulate AI discovery with dummy data
    setTimeout(() => {
      const dummyCompetitors: Competitor[] = [
        {
          id: `discovered-${Date.now()}-1`,
          name: "InnovateTest",
          website: "https://google.com",
          description: "AI-powered business automation platform on Stellar.",
          size: (formData.companySize as any) || "medium",
          region: formData.region || "Global",
          industry: formData.industry,
          socialLinks: {
            linkedin: "https://linkedin.com/",
            twitter: "https://x.com/",
          },
          pricing: {
            model: "Subscription",
            startingPrice: "$149/month",
            features: [
              "AI Automation",
              "Real-time Analytics",
              "Custom Workflows",
              "API Access",
            ],
          },
          investors: ["Accel Partners", "General Catalyst"],
          positioning: "AI-first automation for growing businesses",
          marketShare: 5.3,
          revenue: "$25M ARR",
          employees: "100-200",
          founded: "2020",
          swotAnalysis: {
            strengths: [
              "Innovative AI features",
              "Strong technical team",
              "Growing user base",
            ],
            weaknesses: [
              "Limited market presence",
              "High customer acquisition cost",
            ],
            opportunities: ["Enterprise expansion", "International markets"],
            threats: ["Big tech competition", "Economic uncertainty"],
          },
        },
        {
          id: `discovered-${Date.now()}-2`,
          name: "CompetitorX",
          website: "https://google.com",
          description: "Payments and analytics platform on Stellar.",
          size: (formData.companySize as any) || "small",
          region: formData.region || "North America",
          industry: formData.industry,
          socialLinks: {
            linkedin: "https://linkedin.com/",
          },
          pricing: {
            model: "Pay-per-use",
            startingPrice: "$99/month",
            features: [
              "Market Research",
              "Competitor Tracking",
              "Price Monitoring",
              "Reports",
            ],
          },
          investors: ["Y Combinator", "Techstars"],
          positioning: "Affordable competitive intelligence for SMBs",
          marketShare: 2.1,
          revenue: "$8M ARR",
          employees: "50-100",
          founded: "2021",
          swotAnalysis: {
            strengths: [
              "Affordable pricing",
              "Easy to use",
              "Good customer support",
            ],
            weaknesses: ["Limited advanced features", "Small team"],
            opportunities: ["Feature expansion", "Partnership opportunities"],
            threats: ["Larger competitors", "Market saturation"],
          },
        },
      ];

      setDiscoveredCompetitors(dummyCompetitors);
      setIsLoading(false);

      toast({
        title: "Competitors Discovered",
        description: `Found ${dummyCompetitors.length} potential competitors using AI analysis.`,
      });
    }, 2000);
  };

  const addCompetitor = (competitor: Competitor) => {
    onCompetitorsFound(competitor);
    toast({
      title: "Competitor Added",
      description: `${competitor.name} has been added to your competitor list.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Competitor Discovery
          </CardTitle>
          <CardDescription>
            Enter your business details and let AI find and analyze your
            competitors in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Category</Label>
              <Input
                id="industry"
                placeholder="e.g., Remittances, Cross-Border Payments, Oracles"
                value={formData.industry}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, industry: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Geographic Region</Label>
              <Select
                value={formData.region}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, region: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                  <SelectItem value="latin-america">Latin America</SelectItem>
                  <SelectItem value="middle-east-africa">
                    Middle East & Africa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your business, target market, and key value propositions..."
              value={formData.businessDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessDescription: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Company Size</Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, companySize: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Size</SelectItem>
                <SelectItem value="startup">
                  Startup (1-10 employees)
                </SelectItem>
                <SelectItem value="small">Small (11-50 employees)</SelectItem>
                <SelectItem value="medium">
                  Medium (51-250 employees)
                </SelectItem>
                <SelectItem value="large">Large (250+ employees)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDiscover}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Search className="w-4 h-4 mr-2 animate-spin" />
                Discovering Competitors...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Discover Competitors
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {discoveredCompetitors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Discovered Competitors</CardTitle>
            <CardDescription>
              AI found {discoveredCompetitors.length} potential competitors
              based on your criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discoveredCompetitors.map((competitor) => (
                <div
                  key={competitor.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {competitor.name}
                        </h3>
                        <a
                          href={competitor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {competitor.description}
                      </p>
                    </div>
                    <Button onClick={() => addCompetitor(competitor)} size="sm">
                      Add to List
                    </Button>
                  </div>

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
                    <Badge variant="outline">
                      {competitor.pricing.startingPrice}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Market Share:</strong> {competitor.marketShare}% |
                    <strong> Revenue:</strong> {competitor.revenue} |
                    <strong> Founded:</strong> {competitor.founded}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
