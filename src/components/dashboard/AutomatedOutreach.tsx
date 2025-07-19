import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bot,
  Upload,
  Brain,
  MessageSquare,
  TrendingUp,
  Target,
  Zap,
  Mail,
  Smartphone,
  MessageCircle,
  Send,
  Clock,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Configure AI Bot",
    description:
      "Setup behavior, persona, and communication style for your AI assistant.",
    time: "2 minutes",
  },
  {
    icon: Upload,
    title: "Upload Prospects",
    description:
      "Import your leads from any source - CSV, JSON, or manual entry.",
    time: "3 minutes",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Smart scoring and persona identification for each prospect.",
    time: "Automatic",
  },
  {
    icon: MessageSquare,
    title: "Personalized Outreach",
    description: "Custom messages generated and sent for each prospect.",
    time: "Automatic",
  },
  {
    icon: TrendingUp,
    title: "Monitor & Optimize",
    description:
      "Track responses, analyze performance, and optimize automation.",
    time: "Ongoing",
  },
];

const features = [
  {
    icon: Target,
    title: "Smart Lead Scoring",
    description:
      "AI analyzes thousands of data points to identify your highest-value prospects. Focus your energy on leads most likely to convert.",
  },
  {
    icon: Zap,
    title: "Personalized Messages",
    description:
      "AI generates and sends unique, personalized messages for each prospect. Increase response and conversion rates by up to 300% with tailored outreach.",
  },
  {
    icon: MessageCircle,
    title: "Multi-Channel Reach",
    description:
      "Reach prospects across email, SMS, LinkedIn, X, Telegram and other social platforms with unified messaging.",
  },
  {
    icon: Clock,
    title: "Smart Follow-ups",
    description:
      "AI determines the optimal timing and messaging for follow-ups. Never miss an opportunity with intelligent sequence automation.",
  },
];

export const AutomatedOutreach = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Automated Outreach
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to scale your outreach and convert more leads into
          customers.
        </p>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">How It Works</CardTitle>
          <CardDescription className="text-lg">
            Our AI transforms your sales process in just 5 simple steps. Set up
            takes less than 10 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {step.description}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {step.time}
                  </Badge>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border transform translate-x-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Multi-Channel Icons */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Multi-Channel Outreach</CardTitle>
          <CardDescription>
            Reach your prospects where they are most active
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center space-x-8 text-muted-foreground">
            <div className="flex flex-col items-center space-y-2">
              <Mail className="w-8 h-8" />
              <span className="text-sm">Email</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Smartphone className="w-8 h-8" />
              <span className="text-sm">SMS</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-8 h-8" />
              <span className="text-sm">LinkedIn</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <MessageCircle className="w-8 h-8" />
              <span className="text-sm">X (Twitter)</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Send className="w-8 h-8" />
              <span className="text-sm">Telegram</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Telegram Bot Configuration */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-800 border-orange-200"
          >
            Coming Soon!
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Telegram Bot Configuration</CardTitle>
              <CardDescription>
                Automate lead engagement through Telegram messaging
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 opacity-60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bot-token">Bot Token</Label>
              <Input
                id="bot-token"
                placeholder="Enter your Telegram bot token"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bot-name">Bot Username</Label>
              <Input id="bot-name" placeholder="@your_bot_username" disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message Template</Label>
            <Input
              id="welcome-message"
              placeholder="Hello {name}, thanks for your interest in..."
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Response Delay</Label>
              <Input placeholder="30 seconds" disabled />
            </div>
            <div className="space-y-2">
              <Label>Follow-up Interval</Label>
              <Input placeholder="24 hours" disabled />
            </div>
            <div className="space-y-2">
              <Label>Max Follow-ups</Label>
              <Input placeholder="3" disabled />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button disabled className="flex-1">
              <Bot className="w-4 h-4 mr-2" />
              Connect Bot
            </Button>
            <Button variant="outline" disabled className="flex-1">
              <BarChart3 className="w-4 h-4 mr-2" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
