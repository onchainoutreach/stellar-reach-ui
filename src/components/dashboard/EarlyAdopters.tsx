import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EarlyAccessBenefits } from "./early-adopters/EarlyAccessBenefits";
import { UserWaitlist } from "./early-adopters/UserWaitlist";
import { FeedbackForms } from "./early-adopters/FeedbackForms";
import { UserInvitations } from "./early-adopters/UserInvitations";
import { UserGroups } from "./early-adopters/UserGroups";
import { XLMDistribution } from "./early-adopters/XLMDistribution";
import {
  Sparkles,
  Users,
  MessageSquare,
  Mail,
  Settings,
  Coins,
} from "lucide-react";

export const EarlyAdopters = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Early Adopters Program
        </h1>
        <p className="text-muted-foreground">
          Manage your early adopter community, gather feedback, and reward your
          most valuable users
        </p>
      </div>

      <Tabs defaultValue="benefits" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="benefits" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Benefits
          </TabsTrigger>
          <TabsTrigger value="waitlist" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Waitlist
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="invitations" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Invitations
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            User Groups
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            XLM Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="benefits">
          <EarlyAccessBenefits />
        </TabsContent>

        <TabsContent value="waitlist">
          <UserWaitlist />
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackForms />
        </TabsContent>

        <TabsContent value="invitations">
          <UserInvitations />
        </TabsContent>

        <TabsContent value="groups">
          <UserGroups />
        </TabsContent>

        <TabsContent value="rewards">
          <XLMDistribution />
        </TabsContent>
      </Tabs>
    </div>
  );
};
