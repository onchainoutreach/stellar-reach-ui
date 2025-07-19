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
import { Badge } from "@/components/ui/badge";
import { BarChart3, Unlink, Link, Check, X } from "lucide-react";
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

interface SocialMediaPlatformCardProps {
  platform: SocialPlatform;
  onConnect: (platformId: string, username: string) => void;
  onDisconnect: (platformId: string) => void;
  onViewAnalytics: (platform: SocialPlatform) => void;
}

export const SocialMediaPlatformCard = ({
  platform,
  onConnect,
  onDisconnect,
  onViewAnalytics,
}: SocialMediaPlatformCardProps) => {
  const [username, setUsername] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // const IconComponent = platform.icon;

  const handleConnect = async () => {
    if (!username.trim()) return;

    setIsConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      onConnect(platform.id, username);
      setUsername("");
      setIsConnecting(false);
    }, 1000);
  };

  const handleDisconnect = () => {
    onDisconnect(platform.id);
  };

  return (
    <Card className="relative bg-transparent border border-border hover:bg-card/50 hover:scale-[1.02] transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {/* <IconComponent className="w-5 h-5 text-primary" /> */}
              <SocialIcon
                url={platform.icon}
                borderRadius={"25%"}
                target="_blank"
              />
            </div>
            <div>
              <CardTitle className="text-base">{platform.name}</CardTitle>
              {platform.isConnected && (
                <CardDescription className="text-xs">
                  @{platform.username}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge
            variant={platform.isConnected ? "default" : "secondary"}
            className="text-xs"
          >
            {platform.isConnected ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <X className="w-3 h-3 mr-1" />
                Not Connected
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {platform.isConnected ? (
          <>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="font-semibold">
                    {platform.followers?.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">Followers</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="font-semibold">{platform.posts}</div>
                  <div className="text-muted-foreground">Posts/Updates</div>
                </div>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded text-xs">
                <div className="font-semibold">{platform.engagement}%</div>
                <div className="text-muted-foreground">Engagement Rate</div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Last post: {platform.lastPost}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewAnalytics(platform)}
                className="flex-1"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="flex-1"
              >
                <Unlink className="w-4 h-4 mr-1" />
                Disconnect
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor={`username-${platform.id}`} className="text-xs">
                Username/Handle
              </Label>
              <Input
                id={`username-${platform.id}`}
                placeholder={`Your ${platform.name} username`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm"
              />
            </div>

            <Button
              onClick={handleConnect}
              disabled={!username.trim() || isConnecting}
              size="sm"
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Link className="w-4 h-4 mr-1" />
                  Connect Account
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
