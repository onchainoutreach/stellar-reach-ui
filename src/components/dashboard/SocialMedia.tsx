import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Twitter,
  MessageCircle,
  Linkedin,
  Send,
  Youtube,
  Instagram,
  Facebook,
  Music,
  FileText,
  Plus,
  ExternalLink,
  TrendingUp,
  Sparkles,
  BarChart3,
  Users,
  Eye,
  Heart,
  Share2,
  Check,
  Link,
} from "lucide-react";
import { SocialMediaPlatformCard } from "./SocialMediaPlatformCard";
import { SocialMediaAnalytics } from "./SocialMediaAnalytics";
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
  connectUrl?: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "https://www.github.com",
    isConnected: false,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: "https://www.x.com",
    isConnected: false,
  },
  {
    id: "discord",
    name: "Discord",
    icon: "https://www.discord.com",
    isConnected: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "https://www.linkedin.com",
    isConnected: false,
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "https://www.telegram.org",
    isConnected: false,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "https://www.youtube.com",
    isConnected: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "https://www.instagram.com",
    isConnected: false,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "https://www.facebook.com",
    isConnected: false,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "https://www.tiktok.com",
    isConnected: false,
  },
  {
    id: "medium",
    name: "Medium",
    icon: "https://medium.com",
    isConnected: false,
  },
];

export const SocialMedia = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(socialPlatforms);
  const [postPrompt, setPostPrompt] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedAnalyticsPlatform, setSelectedAnalyticsPlatform] =
    useState<SocialPlatform | null>(null);

  const connectedPlatforms = platforms.filter((p) => p.isConnected);
  const totalPlatforms = platforms.length;

  const handleConnect = (platformId: string, username: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === platformId
          ? {
              ...p,
              isConnected: true,
              username,
              // Mock data for connected platforms
              followers: Math.floor(Math.random() * 10000) + 100,
              posts: Math.floor(Math.random() * 500) + 10,
              engagement: Math.floor(Math.random() * 10) + 1,
              lastPost: "2 hours ago",
            }
          : p
      )
    );
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === platformId
          ? {
              ...p,
              isConnected: false,
              username: undefined,
              followers: undefined,
              posts: undefined,
              engagement: undefined,
              lastPost: undefined,
            }
          : p
      )
    );
  };

  const generatePost = async () => {
    if (!postPrompt.trim() || !selectedPlatform) return;

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      const platformName = platforms.find(
        (p) => p.id === selectedPlatform
      )?.name;
      const mockPosts = {
        twitter: `🚀 Exciting news about ${postPrompt}! Our Stellar blockchain project is making waves in the crypto space. Join us on this incredible journey! #Stellar #Blockchain #DeFi`,
        linkedin: `I'm thrilled to share an update about ${postPrompt}. Our team has been working tirelessly on this Stellar blockchain initiative, and the results speak for themselves. The future of decentralized finance is here, and we're proud to be part of it.`,
        instagram: `✨ ${postPrompt} ✨\n\nOur Stellar blockchain project continues to evolve and grow! 🌟 Swipe to see our latest milestones and join our community of innovators.\n\n#StellarBlockchain #Crypto #Innovation #DeFi #Community`,
        facebook: `We're excited to share the latest developments regarding ${postPrompt}! Our Stellar blockchain project has reached new milestones, and we couldn't have done it without our amazing community. Thank you for your continued support!`,
        default: `Check out our latest update on ${postPrompt}! Our Stellar blockchain project is growing stronger every day. Join our community and be part of the future! 🚀`,
      };

      setGeneratedPost(
        mockPosts[selectedPlatform as keyof typeof mockPosts] ||
          mockPosts.default
      );
      setIsGenerating(false);
    }, 2000);
  };

  const openAnalytics = (platform: SocialPlatform) => {
    setSelectedAnalyticsPlatform(platform);
    setShowAnalytics(true);
  };

  if (showAnalytics && selectedAnalyticsPlatform) {
    return (
      <SocialMediaAnalytics
        platform={selectedAnalyticsPlatform}
        onBack={() => setShowAnalytics(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Social Media</h1>
          <p className="text-muted-foreground">
            Connect your social media accounts and manage your online presence.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <span className="text-xs">Total:</span>
            <span className="font-semibold">{totalPlatforms}</span>
          </Badge>
          <Badge variant="default" className="flex items-center space-x-1">
            <Check className="w-3 h-3" />
            <span className="text-xs">Connected:</span>
            <span className="font-semibold">{connectedPlatforms.length}</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="platforms">Platform Connections</TabsTrigger>
          <TabsTrigger value="content">AI Content Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <SocialMediaPlatformCard
                key={platform.id}
                platform={platform}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onViewAnalytics={openAnalytics}
              />
            ))}
          </div>

          {connectedPlatforms.length > 0 && (
            <>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Connected Platforms Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {connectedPlatforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <Card key={platform.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            {/* <IconComponent className="w-5 h-5 text-primary" /> */}
                            <SocialIcon
                              url={platform.icon}
                              borderRadius={"25%"}
                              target="_blank"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openAnalytics(platform)}
                            >
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                          </div>
                          <h3 className="font-medium text-sm">
                            {platform.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            @{platform.username}
                          </p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Followers:
                              </span>
                              <span className="font-medium">
                                {platform.followers?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Posts/Updates:
                              </span>
                              <span className="font-medium">
                                {platform.posts}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Engagement:
                              </span>
                              <span className="font-medium">
                                {platform.engagement}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Post Generator</span>
              </CardTitle>
              <CardDescription>
                Generate engaging social media posts tailored for specific
                platforms using AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Post Topic/Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to post about... e.g., 'our latest update', 'celebrating a milestone', 'announcing a partnership'"
                  value={postPrompt}
                  onChange={(e) => setPostPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Target Platform</Label>
                <Select
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => {
                      const IconComponent = platform.icon;
                      return (
                        <SelectItem key={platform.id} value={platform.id}>
                          <div className="flex items-center space-x-2">
                            {/* <IconComponent className="w-4 h-4" /> */}
                            <SocialIcon
                              url={platform.icon}
                              borderRadius={"25%"}
                              style={{ width: "30px", height: "30px" }}
                              target="_blank"
                            />
                            <span>{platform.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generatePost}
                disabled={
                  !postPrompt.trim() || !selectedPlatform || isGenerating
                }
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>

              {generatedPost && (
                <div className="space-y-2">
                  <Label>Generated Post</Label>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm whitespace-pre-wrap">
                      {generatedPost}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText(generatedPost)
                      }
                    >
                      Copy Text
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Post Now
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
