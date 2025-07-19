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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Download,
  Sparkles,
  Search,
  Copy,
  Edit,
  Trash2,
} from "lucide-react";
import { TemplateCard } from "./TemplateCard";
import { toast } from "@/components/ui/sonner";

export interface Template {
  id: string;
  name: string;
  style: "casual" | "professional";
  message: string;
  callToAction: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date;
}

export const TemplateBuilder = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Initial Outreach - Professional",
      style: "professional",
      message:
        "Dear {{firstName}},\n\nI hope this email finds you well. I came across {{companyName}} and was impressed by your work in {{industry}}.\n\nI believe our solution could help {{companyName}} achieve {{specificGoal}}. Would you be open to a brief conversation to explore how we might be able to support your objectives?",
      callToAction: "Would you be available for a 15-minute call this week?",
      signature: "Best regards,\n{{yourName}}\n{{yourTitle}}\n{{yourCompany}}",
      createdAt: new Date("2025-06-15"),
      updatedAt: new Date("2025-06-15"),
    },
    {
      id: "2",
      name: "Follow-up - Casual",
      style: "casual",
      message:
        "Hi {{firstName}},\n\nHope you're doing well! I wanted to follow up on my previous message about {{topic}}.\n\nI know you're probably busy, but I genuinely think this could be valuable for {{companyName}}.",
      callToAction: "Any chance we could hop on a quick call?",
      signature: "Cheers,\n{{yourName}}",
      createdAt: new Date("2025-06-10"),
      updatedAt: new Date("2025-06-12"),
    },
  ]);

  const suggestedTemplates: Template[] = [
    {
      id: "suggested-1",
      name: "LinkedIn Connection Request",
      style: "professional",
      message:
        "Hi {{firstName}},\n\nI noticed we share mutual connections in the {{industry}} space. I'd love to connect and learn more about your work at {{companyName}}.\n\nI specialize in helping companies like yours with {{serviceArea}} and think we might have some interesting insights to share.",
      callToAction: "Would you be open to connecting here on LinkedIn?",
      signature: "Best regards,\n{{yourName}}",
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
    {
      id: "suggested-2",
      name: "Product Demo Request",
      style: "professional",
      message:
        "Hello {{firstName}},\n\nI've been researching {{companyName}} and noticed you might benefit from our {{productName}} solution.\n\nWe've helped similar companies in {{industry}} achieve {{specificBenefit}}. I'd love to show you how this could work for {{companyName}}.",
      callToAction:
        "Would you be interested in a quick 15-minute demo this week?",
      signature: "Best regards,\n{{yourName}}\n{{yourCompany}}",
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
    {
      id: "suggested-3",
      name: "Event Follow-up",
      style: "casual",
      message:
        "Hi {{firstName}},\n\nGreat meeting you at {{eventName}} yesterday! I really enjoyed our conversation about {{topicDiscussed}}.\n\nAs promised, I wanted to follow up and see if you'd like to continue our discussion.",
      callToAction: "Would you be free for a coffee chat next week?",
      signature: "Looking forward to hearing from you,\n{{yourName}}",
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
    {
      id: "suggested-4",
      name: "Partnership Proposal",
      style: "professional",
      message:
        "Dear {{firstName}},\n\nI've been following {{companyName}}'s growth in the {{industry}} sector and I'm impressed by your recent achievements.\n\nI believe there's a strong opportunity for our companies to collaborate and create mutual value for our respective clients.",
      callToAction:
        "Would you be interested in exploring a potential partnership?",
      signature: "Best regards,\n{{yourName}}\n{{yourTitle}}\n{{yourCompany}}",
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
    {
      id: "suggested-5",
      name: "Re-engagement",
      style: "casual",
      message:
        "Hi {{firstName}},\n\nIt's been a while since we last connected! I hope things are going well at {{companyName}}.\n\nI wanted to reach out because we've recently launched {{newFeature}} that I think could be really valuable for your team.",
      callToAction:
        "Would you like to hear more about how this could help {{companyName}}?",
      signature: "Hope to hear from you soon,\n{{yourName}}",
      createdAt: new Date("2025-06-01"),
      updatedAt: new Date("2025-06-01"),
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("created");
  const [formData, setFormData] = useState({
    name: "",
    style: "professional" as "casual" | "professional",
    message: "",
    callToAction: "",
    signature: "",
  });

  const currentTemplates =
    activeTab === "created" ? templates : suggestedTemplates;
  const filteredTemplates = currentTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveTemplate = () => {
    if (!formData.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Message content is required");
      return;
    }

    const newTemplate: Template = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTemplates((prev) => [...prev, newTemplate]);
    toast.success("Template created successfully!");
    handleClearForm();
  };

  const handleClearForm = () => {
    setFormData({
      name: "",
      style: "professional",
      message: "",
      callToAction: "",
      signature: "",
    });
    setAiPrompt("");
  };

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt for AI generation");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
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

      const newTemplate: Template = {
        ...selectedTemplate,
        style: "professional",
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTemplates((prev) => [...prev, newTemplate]);
      setIsGenerating(false);
      toast.success("Template generated and added to your library!");
      setAiPrompt("");
    }, 2000);
  };

  const handleEditTemplate = (template: Template) => {
    setFormData({
      name: template.name,
      style: template.style,
      message: template.message,
      callToAction: template.callToAction,
      signature: template.signature,
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    toast.success("Template deleted successfully!");
  };

  const handleCopyTemplate = (template: Template) => {
    const templateText = `${template.message}\n\n${template.callToAction}\n\n${template.signature}`;
    navigator.clipboard.writeText(templateText);
    toast.success("Template copied to clipboard!");
  };

  const handleCustomizeWithAI = (template: Template) => {
    // Dummy AI customization
    const customizedMessage = template.message
      .replace(/{{firstName}}/g, "John")
      .replace(/{{companyName}}/g, "TechCorp Inc.")
      .replace(/{{industry}}/g, "software development")
      .replace(/{{topic}}/g, "our automation solution")
      .replace(/{{specificArea}}/g, "development workflow")
      .replace(/{{potentialBenefit}}/g, "50% faster deployment cycles");

    const customizedTemplate = {
      ...template,
      name: `Customized: ${template.name}`,
      message: customizedMessage,
      id: `customized-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTemplates((prev) => [...prev, customizedTemplate]);
    toast.success("Template customized with AI and added to your library!");
  };

  const handleExportTemplates = () => {
    const dataStr = JSON.stringify(templates, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "templates.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Templates exported successfully!");
  };

  const canAddMore = templates.length < 10;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Template Builder
          </h1>
          <p className="text-muted-foreground">
            Create, customize, and manage your outreach templates with AI
            assistance
          </p>
        </div>

        <Button
          onClick={handleExportTemplates}
          variant="outline"
          disabled={templates.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Templates
        </Button>
      </div>

      {/* Create New Template */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Create New Template
          </CardTitle>
          <CardDescription>
            Generate templates with AI or create them manually (
            {templates.length}/10 templates)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Template Generator */}
          <Card className="border-purple-200 bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Template Generator
              </CardTitle>
              <CardDescription>
                Describe what kind of template you need and let AI generate it
                for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., 'cold outreach for blockchain companies' or 'follow-up after demo'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              <Button
                onClick={handleGenerateWithAI}
                disabled={isGenerating || !aiPrompt.trim() || !canAddMore}
                className="bg-purple-600 hover:bg-purple-700 w-full"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </CardContent>
          </Card>

          {/* Manual Template Creation */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name *</Label>
              <Input
                id="template-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Initial Outreach - Blockchain Companies"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-style">Style *</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-content">Content *</Label>
            <Textarea
              id="template-content"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Dear {{firstName}}, I hope this email finds you well..."
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Use variables like {"{firstName}"}, {"{companyName}"},{" "}
              {"{industry}"} for personalization
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-cta">Call To Action</Label>
            <Textarea
              id="template-cta"
              value={formData.callToAction}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  callToAction: e.target.value,
                }))
              }
              placeholder="Would you be available for a 15-minute call this week?"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template-signature">Signature</Label>
            <Textarea
              id="template-signature"
              value={formData.signature}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, signature: e.target.value }))
              }
              placeholder="Best regards,&#10;{{yourName}}&#10;{{yourTitle}}&#10;{{yourCompany}}"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleSaveTemplate}
              disabled={!canAddMore}
              className="flex-1"
            >
              {canAddMore ? "Save Template" : "Limit Reached (10)"}
            </Button>
            <Button
              onClick={handleClearForm}
              variant="outline"
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Library */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-2xl font-bold text-foreground">
            Templates Library
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="created">
              Created ({templates.length})
            </TabsTrigger>
            <TabsTrigger value="suggested">
              Suggested ({suggestedTemplates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created" className="mt-6">
            {filteredTemplates.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    {searchTerm ? (
                      <>
                        <p className="text-lg mb-2">No templates found</p>
                        <p>Try adjusting your search terms</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg mb-2">No templates yet</p>
                        <p>Create your first outreach template above</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onEdit={handleEditTemplate}
                    onDelete={handleDeleteTemplate}
                    onCopy={handleCopyTemplate}
                    onCustomizeWithAI={handleCustomizeWithAI}
                    showDelete={activeTab === "created"}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggested" className="mt-6">
            {filteredTemplates.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">No suggested templates found</p>
                    <p>Try adjusting your search terms</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onEdit={() => {}} // No edit for suggested templates
                    onDelete={() => {}} // No delete for suggested templates
                    onCopy={handleCopyTemplate}
                    onCustomizeWithAI={handleCustomizeWithAI}
                    showDelete={false}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Usage Tips */}
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg">Pro Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Use variables like {"{firstName}"}, {"{companyName}"},{" "}
            {"{industry}"} for personalization
          </p>
          <p>
            • Keep templates concise - aim for 100-150 words for better response
            rates
          </p>
          <p>
            • Test different styles (casual vs professional) based on your
            target audience
          </p>
          <p>• Include a clear, specific call-to-action in every template</p>
        </CardContent>
      </Card>
    </div>
  );
};
