import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import {
  TrendingUp,
  Users,
  Clock,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const barData = [
  { name: "Week 1", value: 20 },
  { name: "Week 2", value: 35 },
  { name: "Week 3", value: 45 },
  { name: "Week 4", value: 30 },
];

const leadGenerationData = {
  "30D": {
    data: [
      { name: "Week 1", leads: 45 },
      { name: "Week 2", leads: 52 },
      { name: "Week 3", leads: 38 },
      { name: "Week 4", leads: 61 },
    ],
    total: 196,
  },
  "1M": {
    data: [
      { name: "Week 1", leads: 45 },
      { name: "Week 2", leads: 52 },
      { name: "Week 3", leads: 38 },
      { name: "Week 4", leads: 61 },
      { name: "Week 5", leads: 48 },
    ],
    total: 244,
  },
  "3M": {
    data: [
      { name: "Jan", leads: 180 },
      { name: "Feb", leads: 210 },
      { name: "Mar", leads: 195 },
      { name: "Apr", leads: 245 },
      { name: "May", leads: 220 },
      { name: "Jun", leads: 260 },
      { name: "Jul", leads: 244 },
    ],
    total: 1554,
  },
};

const leadSourcesData = [
  { name: "LinkedIn", value: 35, color: "#0077B5" },
  { name: "Email", value: 25, color: "#10b981" },
  { name: "X (Twitter)", value: 15, color: "#1DA1F2" },
  { name: "Telegram", value: 10, color: "#26A5E4" },
  { name: "Call", value: 8, color: "#8b5cf6" },
  { name: "Reddit", value: 4, color: "#FF4500" },
  { name: "Discord", value: 2, color: "#5865F2" },
  { name: "Instagram", value: 1, color: "#E4405F" },
];

const responseTimeData = [
  { name: "<1h", value: 30, color: "#10b981" },
  { name: "1-8h", value: 40, color: "#3b82f6" },
  { name: "8-24h", value: 20, color: "#f59e0b" },
  { name: ">24h", value: 10, color: "#ef4444" },
];

const conversionFunnelData = [
  { name: "Total", value: 1000, color: "#8b5cf6" },
  { name: "Contacted", value: 800, color: "#3b82f6" },
  { name: "Qualified", value: 400, color: "#10b981" },
  { name: "Meetings", value: 150, color: "#f59e0b" },
  { name: "Converted", value: 50, color: "#ef4444" },
];

const recentLeadsData = [
  {
    name: "Emir A.",
    company: "SDF / Community Manager",
    source: "X",
    status: "Qualified",
    score: 95,
    contactDate: "2025-07-15",
    statusType: "qualified",
  },
  {
    name: "Gemma Dobbs",
    company: "SDF / Ecosystem Growth",
    source: "Email",
    status: "Converted",
    score: 92,
    contactDate: "2025-07-14",
    statusType: "converted",
  },
  {
    name: "Anke Liu",
    company: "SDF / Ecosystem Growth",
    source: "Referral",
    status: "Accepted",
    score: 92,
    contactDate: "2025-07-13",
    statusType: "accepted",
  },
  {
    name: "Ernesto Contreras",
    company: "Unalivio / CEO",
    source: "Call",
    status: "Qualified",
    score: 90,
    contactDate: "2025-07-12",
    statusType: "qualified",
  },
  {
    name: "Alejo M.",
    company: "Skyhitz / Founder",
    source: "LinkedIn",
    status: "Accepted",
    score: 90,
    contactDate: "2025-07-11",
    statusType: "accepted",
  },
  {
    name: "Raphael F.",
    company: "LumenLoop / Co-Founder",
    source: "Email",
    status: "Qualified",
    score: 90,
    contactDate: "2025-07-10",
    statusType: "qualified",
  },
  {
    name: "Jayrome",
    company: "LumenLoop / Co-Founder",
    source: "Discord",
    status: "Converted",
    score: 90,
    contactDate: "2025-07-10",
    statusType: "converted",
  },
];

interface OutreachMetricsProps {
  onNavigate: (navItem: string) => void;
}

export const OutreachMetrics = ({ onNavigate }: OutreachMetricsProps) => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<"30D" | "1M" | "3M">(
    "30D"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case "converted":
        return "bg-green-500 text-white";
      case "qualified":
        return "bg-blue-500 text-white";
      case "accepted":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getCurrentLeadData = () => {
    return leadGenerationData[selectedPeriod];
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-5xl font-bold text-foreground">StellarReach</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-border text-foreground hover:bg-accent"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
        <p className="text-xl text-primary">BD Leads</p>

        {/* Decorative curved lines */}
        <div className="relative mt-8 mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-48 border-4 border-primary/30 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-40 border-2 border-primary/20 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-32 border-2 border-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="metric-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <div className="px-2 py-1 bg-purple-500 rounded text-xs text-primary-foreground">
                +130 Leads
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">
                  20.10%
                </span>
                <span className="text-sm text-green-400">
                  ▼ 16.5% From Last Month
                </span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={barData}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground text-sm font-medium">
                Lead Generation Trend
              </CardTitle>
              <div className="flex space-x-1">
                {(["30D", "1M", "3M"] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? "default" : "outline"}
                    size="sm"
                    className="text-xs px-2 py-1 h-6"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">
                  {getCurrentLeadData().total}
                </span>
                <span className="text-sm text-muted-foreground">leads</span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getCurrentLeadData().data}>
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground text-sm font-medium">
                Outreach ROI Trend
              </CardTitle>
              <div className="px-2 py-1 bg-green-500 rounded text-xs text-primary-foreground">
                Rising
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">20.0</span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={barData}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-sm font-medium flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Total Leads</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,247</div>
            <div className="text-sm text-green-400 mt-1">+12% this month</div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-sm font-medium flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>New Leads Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">23</div>
            <div className="text-sm text-muted-foreground mt-1">
              vs 18 yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-sm font-medium flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Response Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">37.8%</div>
            <div className="text-sm text-green-400 mt-1">+5.2% this week</div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-sm font-medium flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Avg. Response Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2.4h</div>
            <div className="text-sm text-green-400 mt-1">-0.3h improvement</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-foreground text-sm">
              Lead Sources Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourcesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {leadSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              {leadSourcesData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="truncate">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-foreground text-sm">
              Response Time Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-foreground text-sm">
              Lead Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Funnel
                    dataKey="value"
                    data={conversionFunnelData}
                    isAnimationActive
                    fill="#8b5cf6"
                  >
                    <LabelList position="center" fill="#fff" />
                    {conversionFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Funnel>
                  <Tooltip formatter={(value, name) => [value, name]} />
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card className="metric-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Recent Leads</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-accent"
              onClick={() => onNavigate("leads-db")}
            >
              Leads DB
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">
                    Name
                  </th>
                  <th className="text-left py-3 text-muted-foreground font-medium">
                    Company/Role
                  </th>
                  <th className="text-left py-3 text-muted-foreground font-medium">
                    Source
                  </th>
                  <th className="text-left py-3 text-muted-foreground font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 text-muted-foreground font-medium">
                    Score (AI)
                  </th>
                  <th className="text-left py-3 text-muted-foreground font-medium">
                    Contact Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLeadsData.map((lead, index) => (
                  <tr key={index} className="border-b border-border/5">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs text-primary-foreground">
                            {lead.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-foreground font-medium">
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {lead.company}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge
                        className={`text-xs ${getStatusColor(lead.statusType)}`}
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-foreground font-medium">
                          {lead.score}
                        </span>
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {lead.contactDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
