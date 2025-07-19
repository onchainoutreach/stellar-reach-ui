import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AICompetitorDiscovery } from "./competitive-analysis/AICompetitorDiscovery";
import { CompetitorList } from "./competitive-analysis/CompetitorList";
import { CompetitorAnalytics } from "./competitive-analysis/CompetitorAnalytics";

export interface Competitor {
  id: string;
  name: string;
  website: string;
  description: string;
  size: "startup" | "small" | "medium" | "large";
  region: string;
  industry: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  pricing: {
    model: string;
    startingPrice: string;
    features: string[];
  };
  investors: string[];
  positioning: string;
  marketShare: number;
  revenue: string;
  employees: string;
  founded: string;
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export const CompetitiveAnalysis = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: "1",
      name: "Market Comp Pro",
      website: "https://google.com",
      description:
        "Enterprise-grade payments solution with advanced analytics.",
      size: "large",
      region: "North America",
      industry: "SaaS",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        twitter: "https://x.com/",
      },
      pricing: {
        model: "Subscription",
        startingPrice: "$299/month",
        features: [
          "Advanced Analytics",
          "API Access",
          "Custom Integrations",
          "24/7 Support",
        ],
      },
      investors: ["Sequoia Capital", "Andreessen Horowitz", "Tiger Global"],
      positioning: "Premium enterprise solution for large organizations",
      marketShare: 15.2,
      revenue: "$250M ARR",
      employees: "1000+",
      founded: "2015",
      swotAnalysis: {
        strengths: [
          "Strong brand recognition",
          "Extensive feature set",
          "Large customer base",
        ],
        weaknesses: [
          "High pricing",
          "Complex onboarding",
          "Limited customization",
        ],
        opportunities: ["International expansion", "SMB market penetration"],
        threats: [
          "New competitors",
          "Economic downturn",
          "Technology disruption",
        ],
      },
    },
    {
      id: "2",
      name: "TestFlow",
      website: "https://google.com",
      description: "Modern platform built on Stellar network.",
      size: "medium",
      region: "Europe",
      industry: "SaaS",
      socialLinks: {
        linkedin: "https://linkedin.com/company/agileflow",
        twitter: "https://twitter.com/agileflow",
      },
      pricing: {
        model: "Freemium",
        startingPrice: "$49/month",
        features: [
          "Team Collaboration",
          "Mobile App",
          "Basic Analytics",
          "Email Support",
        ],
      },
      investors: ["Index Ventures", "Balderton Capital"],
      positioning: "User-friendly CRM for growing teams",
      marketShare: 8.7,
      revenue: "$50M ARR",
      employees: "200-500",
      founded: "2018",
      swotAnalysis: {
        strengths: [
          "User-friendly interface",
          "Competitive pricing",
          "Strong mobile app",
        ],
        weaknesses: ["Limited enterprise features", "Smaller market presence"],
        opportunities: ["Enterprise market entry", "Partnership opportunities"],
        threats: ["Larger competitors", "Feature parity challenges"],
      },
    },
  ]);

  const addCompetitor = (competitor: Competitor) => {
    setCompetitors((prev) => [...prev, competitor]);
  };

  const updateCompetitor = (id: string, updates: Partial<Competitor>) => {
    setCompetitors((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp))
    );
  };

  const deleteCompetitor = (id: string) => {
    setCompetitors((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Competitive Analysis
        </h1>
        <p className="text-muted-foreground">
          Analyze competitor strategies, market positioning, and identify
          opportunities with AI-powered insights
        </p>
      </div>

      <Tabs defaultValue="discovery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discovery">AI Discovery</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="discovery" className="space-y-6">
          <AICompetitorDiscovery onCompetitorsFound={addCompetitor} />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <CompetitorList
            competitors={competitors}
            onAdd={addCompetitor}
            onUpdate={updateCompetitor}
            onDelete={deleteCompetitor}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <CompetitorAnalytics competitors={competitors} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
