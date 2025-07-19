import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Eye, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvitationTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  isDefault: boolean;
}

export const UserInvitations = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<InvitationTemplate[]>([
    {
      id: "1",
      name: "Welcome to Beta",
      subject: "You're invited to join our exclusive beta program!",
      body: "Hi {{firstName}},\n\nWe're excited to invite you to join our exclusive early adopter program! You'll get access to new features before anyone else and help shape the future of our product.\n\nClick here to get started: {{inviteLink}}\n\nBest regards,\nThe StellarReach Team",
      isDefault: true,
    },
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");
  const [customMessage, setCustomMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  const sendInvitation = () => {
    const message = customMessage || selectedTemplateData?.body || "";

    // Simulate sending invitation
    toast({
      title: "Invitation Sent",
      description: "Invitation messages have been sent to selected users",
    });
  };

  const previewMessage = () => {
    const message = customMessage || selectedTemplateData?.body || "";
    const preview = message
      .replace("{{firstName}}", "John")
      .replace("{{inviteLink}}", "https://stellarreach.com/invite/abc123");

    alert(preview);
  };

  const copyTemplate = () => {
    if (selectedTemplateData) {
      navigator.clipboard.writeText(selectedTemplateData.body);
      toast({
        title: "Copied",
        description: "Template copied to clipboard",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          User Invitations
        </CardTitle>
        <CardDescription>
          Send personalized invitation messages to your early adopters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Invitation Templates</h3>
          <div className="grid gap-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{template.name}</span>
                      {template.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {template.subject}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={copyTemplate}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={previewMessage}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Customize Message</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Use Template" : "Edit Message"}
            </Button>
          </div>

          {isEditing ? (
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Write your custom invitation message..."
              rows={8}
            />
          ) : (
            <div className="bg-muted/50 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">
                {selectedTemplateData?.body}
              </pre>
            </div>
          )}

          <div className="text-xs text-muted-foreground mt-2">
            Available variables:{" "}
            {`{{firstName}}, {{lastName}}, {{email}}, {{inviteLink}}`}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Send to Early Adopters</p>
              <p className="text-sm text-muted-foreground">
                This will send invitations to all users in the waitlist with
                "waiting" status
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={previewMessage}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={sendInvitation}>
                <Send className="w-4 h-4 mr-2" />
                Send Invitations
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
