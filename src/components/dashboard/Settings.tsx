import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Bug,
  MessageSquarePlus,
  Mail,
  Globe,
  MessageCircle,
  MessagesSquare,
} from "lucide-react";

export const Settings = () => {
  const platformVersion = "v1.0.0";

  const handleReportBug = () => {
    window.open("https://github.com/onchainoutreach", "_blank");
  };

  const handleRequestFeature = () => {
    window.open("https://github.com/onchainoutreach", "_blank");
  };

  const handleContactUs = () => {
    window.open(
      "mailto:onchainoutreach@gmail.com?subject=Stellar Reach Request",
      "_blank"
    );
  };

  const handleStellarOrg = () => {
    window.open("https://stellar.org/", "_blank");
  };

  const handleStellarX = () => {
    window.open("https://x.com/stellarorg", "_blank");
  };

  const handleStellarDiscord = () => {
    window.open("https://discord.gg/stellardev", "_blank");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your platform settings and get support
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Platform Information */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Version</span>
              <Badge variant="secondary">{platformVersion}</Badge>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2">About StellarReach</h4>
              <p className="text-sm text-muted-foreground">
                StellarReach is a comprehensive business development platform
                that helps you track leads, manage projects, and optimize your
                sales pipeline with advanced analytics and automation tools.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support & Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleReportBug}
            >
              <Bug className="w-4 h-4 mr-2" />
              Report a Bug
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleRequestFeature}
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Request a Feature
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleContactUs}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
              <ExternalLink className="w-3 h-3 ml-auto" />
            </Button>
          </CardContent>
        </Card>

        {/* Stellar Network */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stellar Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              StellarReach is supercharged by the Stellar blockchain network.
              Learn more about the technology powering this platform.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Button
                variant="outline"
                className="justify-start"
                onClick={handleStellarOrg}
              >
                <Globe className="w-4 h-4 mr-2" />
                Stellar.org
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>

              <Button
                variant="outline"
                className="justify-start"
                onClick={handleStellarX}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Stellar X
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>

              <Button
                variant="outline"
                className="justify-start"
                onClick={handleStellarDiscord}
              >
                <MessagesSquare className="w-4 h-4 mr-2" />
                Stellar Discord
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
