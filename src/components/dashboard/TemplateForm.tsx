import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Sparkles, Copy, Eye } from "lucide-react";
import { Template } from "./TemplateBuilder";
import { toast } from "@/components/ui/sonner";

interface TemplateFormProps {
  template?: Template | null;
  onSave: (template: Omit<Template, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export const TemplateForm = ({
  template,
  onSave,
  onCancel,
}: TemplateFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    style: "professional" as "casual" | "professional",
    message: "",
    callToAction: "",
    signature: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (template && template.id !== "ai-generated") {
      setFormData({
        name: template.name,
        style: template.style,
        message: template.message,
        callToAction: template.callToAction,
        signature: template.signature,
      });
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Message content is required");
      return;
    }

    onSave(formData);
  };

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt for AI generation");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation (replace with actual AI API call)
    setTimeout(() => {
      const aiTemplates = {
        "cold outreach": {
          name: "AI: Cold Outreach Template",
          message:
            "Hi {{firstName}},\n\nI noticed {{companyName}} has been growing rapidly in the {{industry}} space. Congratulations on your recent achievements!\n\nI specialize in helping companies like yours scale their {{specificArea}} operations. Based on what I've seen, I believe we could help {{companyName}} achieve {{potentialBenefit}}.",
          callToAction:
            "Would you be open to a brief 15-minute conversation to explore this further?",
          signature:
            "Best regards,\n{{yourName}}\n{{yourTitle}}\n{{yourCompany}}\n{{yourPhone}}",
        },
        "follow up": {
          name: "AI: Follow-up Template",
          message:
            "Hi {{firstName}},\n\nI wanted to follow up on my previous message regarding {{topic}}. I understand you're probably busy, but I wanted to share a quick insight that might be relevant to {{companyName}}.\n\n{{insightOrValue}}",
          callToAction:
            "If this resonates with you, I'd love to discuss how we can help. Are you available for a brief call this week?",
          signature: "Best,\n{{yourName}}",
        },
        partnership: {
          name: "AI: Partnership Template",
          message:
            "Hello {{firstName}},\n\nI've been following {{companyName}}'s work in {{industry}} and I'm impressed by your approach to {{specificApproach}}.\n\nI believe there might be an opportunity for our companies to collaborate. We work with similar clients and could potentially create value together.",
          callToAction:
            "Would you be interested in exploring a potential partnership? I'd love to share some ideas.",
          signature:
            "Looking forward to connecting,\n{{yourName}}\n{{yourTitle}}\n{{yourCompany}}",
        },
      };

      const promptLower = aiPrompt.toLowerCase();
      let selectedTemplate;

      if (promptLower.includes("follow") || promptLower.includes("second")) {
        selectedTemplate = aiTemplates["follow up"];
      } else if (
        promptLower.includes("partner") ||
        promptLower.includes("collaborat")
      ) {
        selectedTemplate = aiTemplates["partnership"];
      } else {
        selectedTemplate = aiTemplates["cold outreach"];
      }

      setFormData((prev) => ({
        ...prev,
        name: selectedTemplate.name,
        message: selectedTemplate.message,
        callToAction: selectedTemplate.callToAction,
        signature: selectedTemplate.signature,
      }));

      setIsGenerating(false);
      setAiPrompt("");
      toast.success(
        "Template generated successfully! You can now customize it further."
      );
    }, 2000);
  };

  const handlePreview = () => {
    const previewText = `${formData.message}\n\n${formData.callToAction}\n\n${formData.signature}`;
    navigator.clipboard.writeText(previewText);
    setShowPreview(!showPreview);
  };

  const sampleData = {
    firstName: "John",
    companyName: "TechCorp Solutions",
    industry: "software development",
    specificArea: "customer acquisition",
    yourName: "Sarah Johnson",
    yourTitle: "Business Development Manager",
    yourCompany: "StellarReach",
  };

  const renderPreview = (text: string) => {
    let preview = text;
    Object.entries(sampleData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, "g"), value);
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button onClick={onCancel} variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {template && template.id !== "ai-generated"
              ? "Edit Template"
              : "Create New Template"}
          </h1>
          <p className="text-muted-foreground">
            Build personalized outreach templates
          </p>
        </div>
      </div>

      {/* AI Generation Section */}
      <Card className="border-purple-200 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Sparkles className="w-5 h-5 mr-2" />
            AI Template Generator
          </CardTitle>
          <CardDescription>
            Describe what kind of template you need and let AI generate it for
            you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., 'cold outreach for SaaS companies' or 'follow-up after demo'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerateWithAI}
              disabled={isGenerating || !aiPrompt.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Template Details */}
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Initial Outreach - Tech Companies"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style *</Label>
                <Select
                  value={formData.style}
                  onValueChange={(value: "casual" | "professional") =>
                    setFormData((prev) => ({ ...prev, style: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Preview
                <Button
                  type="button"
                  onClick={handlePreview}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Hide" : "Show"} Preview
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div className="text-sm">
                    <strong>Subject:</strong> {formData.name}
                  </div>
                  <div className="whitespace-pre-wrap text-sm border-l-2 border-primary pl-4">
                    {renderPreview(formData.message)}
                    {formData.callToAction && (
                      <>
                        {"\n\n"}
                        {renderPreview(formData.callToAction)}
                      </>
                    )}
                    {formData.signature && (
                      <>
                        {"\n\n"}
                        {renderPreview(formData.signature)}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Click "Show Preview" to see how your template will look
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Template Content */}
        <Card>
          <CardHeader>
            <CardTitle>Template Content</CardTitle>
            <CardDescription>
              Use variables like {"{firstName}"}, {"{companyName}"},{" "}
              {"{industry}"} for personalization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message Content *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Dear {{firstName}},&#10;&#10;I hope this email finds you well..."
                rows={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="callToAction">Call to Action</Label>
              <Textarea
                id="callToAction"
                value={formData.callToAction}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    callToAction: e.target.value,
                  }))
                }
                placeholder="Would you be available for a 15-minute call this week?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature">Signature</Label>
              <Textarea
                id="signature"
                value={formData.signature}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    signature: e.target.value,
                  }))
                }
                placeholder="Best regards,&#10;{{yourName}}&#10;{{yourTitle}}&#10;{{yourCompany}}"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {template && template.id !== "ai-generated"
              ? "Update Template"
              : "Create Template"}
          </Button>
        </div>
      </form>
    </div>
  );
};
