import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  username?: string;
  followers?: number;
  posts?: number;
  engagement?: number;
  lastPost?: string;
}

interface SocialMediaAnalyticsProps {
  platform: SocialPlatform;
  onBack: () => void;
}

export const SocialMediaAnalytics = ({
  platform,
  onBack,
}: SocialMediaAnalyticsProps) => {
  const IconComponent = platform.icon;

  // Mock analytics data
  const analytics = {
    totalReach: Math.floor(Math.random() * 50000) + 10000,
    impressions: Math.floor(Math.random() * 100000) + 20000,
    engagement: platform.engagement || 0,
    likes: Math.floor(Math.random() * 1000) + 100,
    shares: Math.floor(Math.random() * 200) + 20,
    comments: Math.floor(Math.random() * 150) + 30,
    followerGrowth: Math.floor(Math.random() * 20) - 5, // Can be negative
    bestPostTime: "3:00 PM - 5:00 PM",
    topContent: "Educational posts about blockchain",
  };

  const growthTips = [
    {
      title: "Post Consistently",
      description:
        "Maintain a regular posting schedule to keep your audience engaged",
      priority: "high",
    },
    {
      title: "Use Platform-Specific Features",
      description: `Leverage ${platform.name}'s unique features like stories, polls, or live streaming`,
      priority: "medium",
    },
    {
      title: "Engage with Your Community",
      description:
        "Respond to comments and messages promptly to build stronger relationships",
      priority: "high",
    },
    {
      title: "Optimize Posting Times",
      description: `Your best engagement window is ${analytics.bestPostTime}`,
      priority: "medium",
    },
    {
      title: "Create Educational Content",
      description:
        "Share insights about blockchain and Stellar ecosystem to establish thought leadership",
      priority: "low",
    },
    {
      title: "Use Relevant Hashtags",
      description:
        "Research and use trending hashtags in the blockchain and crypto space",
      priority: "medium",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {/* <IconComponent className="w-6 h-6 text-primary" /> */}
              <SocialIcon
                url={platform.icon}
                borderRadius={"25%"}
                target="_blank"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {platform.name} Analytics
              </h1>
              <p className="text-muted-foreground">@{platform.username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold">
                  {analytics.totalReach.toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Impressions</p>
                <p className="text-2xl font-bold">
                  {analytics.impressions.toLocaleString()}
                </p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">{analytics.engagement}%</p>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Follower Growth</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold">
                    {Math.abs(analytics.followerGrowth)}%
                  </p>
                  {analytics.followerGrowth > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Breakdown (Last 30 Days)</CardTitle>
          <CardDescription>
            Overview of how your audience interacts with your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-medium">Likes</span>
              </div>
              <span className="text-xl font-bold">
                {analytics.likes.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Shares</span>
              </div>
              <span className="text-xl font-bold">
                {analytics.shares.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Comments</span>
              </div>
              <span className="text-xl font-bold">
                {analytics.comments.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Best Times to Post</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="font-medium">Optimal Posting Window</p>
              <p className="text-2xl font-bold text-primary">
                {analytics.bestPostTime}
              </p>
              <p className="text-sm text-muted-foreground">
                Based on your audience's activity patterns
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">Top Performing Content Type</p>
              <Badge variant="outline">{analytics.topContent}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Growth Tips</span>
            </CardTitle>
            <CardDescription>
              Personalized recommendations to boost your {platform.name}{" "}
              presence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {growthTips.slice(0, 4).map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{tip.title}</p>
                      <Badge
                        variant={getPriorityColor(tip.priority)}
                        className="text-xs"
                      >
                        {tip.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Tips */}
      <Card>
        <CardHeader>
          <CardTitle>More Growth Strategies</CardTitle>
          <CardDescription>
            Additional recommendations to maximize your social media impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {growthTips.slice(4).map((tip, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-lg border"
              >
                <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{tip.title}</p>
                    <Badge
                      variant={getPriorityColor(tip.priority)}
                      className="text-xs"
                    >
                      {tip.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
