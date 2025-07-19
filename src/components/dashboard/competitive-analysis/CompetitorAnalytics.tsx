import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  Globe,
} from "lucide-react";
import type { Competitor } from "../CompetitiveAnalysis";

interface CompetitorAnalyticsProps {
  competitors: Competitor[];
}

export const CompetitorAnalytics = ({
  competitors,
}: CompetitorAnalyticsProps) => {
  const marketShareData = competitors.map((comp) => ({
    name: comp.name,
    marketShare: comp.marketShare,
    revenue: parseFloat(comp.revenue.replace(/[^0-9.]/g, "")) || 0,
  }));

  const sizeDistribution = competitors.reduce((acc, comp) => {
    acc[comp.size] = (acc[comp.size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sizeData = Object.entries(sizeDistribution).map(([size, count]) => ({
    name: size.charAt(0).toUpperCase() + size.slice(1),
    value: count,
  }));

  const regionDistribution = competitors.reduce((acc, comp) => {
    acc[comp.region] = (acc[comp.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const regionData = Object.entries(regionDistribution).map(
    ([region, count]) => ({
      name: region,
      value: count,
    })
  );

  const pricingData = competitors
    .map((comp) => ({
      name: comp.name,
      price:
        parseFloat(comp.pricing.startingPrice.replace(/[^0-9.]/g, "")) || 0,
    }))
    .filter((item) => item.price > 0);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"];

  const getMetricValue = (value: string | number) => {
    if (typeof value === "string") {
      const numValue = parseFloat(value.replace(/[^0-9.]/g, ""));
      return isNaN(numValue) ? 0 : numValue;
    }
    return value;
  };

  const totalMarketShare = competitors.reduce(
    (sum, comp) => sum + comp.marketShare,
    0
  );
  const avgMarketShare = totalMarketShare / competitors.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Competitive Analytics</h2>
        <p className="text-muted-foreground">
          Visual analysis and insights from your competitor data
        </p>
      </div>

      {competitors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
            <p className="text-muted-foreground">
              Add competitors to see analytics and insights
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Competitors
                    </p>
                    <p className="text-2xl font-bold">{competitors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Avg Market Share
                    </p>
                    <p className="text-2xl font-bold">
                      {avgMarketShare.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Globe className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Regions Covered
                    </p>
                    <p className="text-2xl font-bold">
                      {Object.keys(regionDistribution).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Pricing Models
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        new Set(
                          competitors
                            .map((c) => c.pricing.model)
                            .filter(Boolean)
                        ).size
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Share Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Market Share Distribution</CardTitle>
                <CardDescription>
                  Comparison of market share across competitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketShareData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="marketShare" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Company Size Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Company Size Distribution</CardTitle>
                <CardDescription>
                  Breakdown of competitors by company size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sizeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sizeData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Comparison */}
            {pricingData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Comparison</CardTitle>
                  <CardDescription>
                    Starting prices across competitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pricingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`$${value}`, "Price"]}
                        />
                        <Bar dataKey="price" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Regional Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>
                  Competitors by geographic region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#ffc658"
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitor Feature Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison Matrix</CardTitle>
              <CardDescription>
                Key features offered by each competitor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((competitor) => (
                  <div key={competitor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{competitor.name}</h4>
                      <Badge variant="outline">
                        {competitor.pricing.startingPrice}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.pricing.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SWOT Summary */}
          <Card>
            <CardHeader>
              <CardTitle>SWOT Analysis Summary</CardTitle>
              <CardDescription>
                Overview of strengths, weaknesses, opportunities, and threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Strengths
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {competitors.reduce(
                      (sum, comp) => sum + comp.swotAnalysis.strengths.length,
                      0
                    )}{" "}
                    items analyzed
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-600 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Weaknesses
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {competitors.reduce(
                      (sum, comp) => sum + comp.swotAnalysis.weaknesses.length,
                      0
                    )}{" "}
                    items analyzed
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Opportunities
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {competitors.reduce(
                      (sum, comp) =>
                        sum + comp.swotAnalysis.opportunities.length,
                      0
                    )}{" "}
                    items analyzed
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Threats
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {competitors.reduce(
                      (sum, comp) => sum + comp.swotAnalysis.threats.length,
                      0
                    )}{" "}
                    items analyzed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
