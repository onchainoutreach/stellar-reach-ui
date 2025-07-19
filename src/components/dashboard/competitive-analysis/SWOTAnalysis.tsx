import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  X,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Competitor } from "../CompetitiveAnalysis";

interface SWOTAnalysisProps {
  competitor: Competitor;
  onUpdate: (swotData: Competitor["swotAnalysis"]) => void;
}

export const SWOTAnalysis = ({ competitor, onUpdate }: SWOTAnalysisProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [swotData, setSWOTData] = useState(competitor.swotAnalysis);
  const [newItems, setNewItems] = useState({
    strengths: "",
    weaknesses: "",
    opportunities: "",
    threats: "",
  });

  const addItem = (category: keyof typeof newItems) => {
    const item = newItems[category].trim();
    if (!item) return;

    setSWOTData((prev) => ({
      ...prev,
      [category]: [...prev[category], item],
    }));

    setNewItems((prev) => ({ ...prev, [category]: "" }));
  };

  const removeItem = (category: keyof typeof swotData, index: number) => {
    setSWOTData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const generateWithAI = () => {
    // Simulate AI generation
    const aiSWOT = {
      strengths: [
        "Strong brand recognition",
        "Experienced leadership team",
        "Innovative product features",
        "Good customer retention",
      ],
      weaknesses: [
        "Limited market presence",
        "Higher pricing than competitors",
        "Slow customer support response",
      ],
      opportunities: [
        "Emerging market expansion",
        "Partnership opportunities",
        "New technology adoption",
        "Changing customer preferences",
      ],
      threats: [
        "Increasing competition",
        "Economic uncertainty",
        "Regulatory changes",
        "Technology disruption",
      ],
    };

    setSWOTData(aiSWOT);
    toast({
      title: "AI Analysis Complete",
      description: "SWOT analysis has been generated using AI insights.",
    });
  };

  const handleSave = () => {
    onUpdate(swotData);
    setIsDialogOpen(false);
    toast({
      title: "SWOT Analysis Updated",
      description: `SWOT analysis for ${competitor.name} has been saved.`,
    });
  };

  const getSWOTSummary = () => {
    const total = Object.values(swotData).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
    return total > 0 ? `${total} items analyzed` : "No analysis yet";
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Target className="w-4 h-4 mr-2" />
          SWOT Analysis
          <Badge variant="secondary" className="ml-2">
            {getSWOTSummary()}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            SWOT Analysis - {competitor.name}
          </DialogTitle>
          <DialogDescription>
            Analyze strengths, weaknesses, opportunities, and threats
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={generateWithAI}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </Button>
          </div>

          <Tabs defaultValue="strengths" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="strengths"
                className="flex items-center gap-1"
              >
                <TrendingUp className="w-4 h-4" />
                Strengths
              </TabsTrigger>
              <TabsTrigger
                value="weaknesses"
                className="flex items-center gap-1"
              >
                <TrendingDown className="w-4 h-4" />
                Weaknesses
              </TabsTrigger>
              <TabsTrigger
                value="opportunities"
                className="flex items-center gap-1"
              >
                <Target className="w-4 h-4" />
                Opportunities
              </TabsTrigger>
              <TabsTrigger value="threats" className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Threats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Strengths
                  </CardTitle>
                  <CardDescription>
                    Internal positive factors that give competitive advantage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a strength..."
                      value={newItems.strengths}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          strengths: e.target.value,
                        }))
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("strengths")
                      }
                    />
                    <Button onClick={() => addItem("strengths")}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {swotData.strengths.map((strength, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        {strength}
                        <button
                          onClick={() => removeItem("strengths", index)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weaknesses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Weaknesses
                  </CardTitle>
                  <CardDescription>
                    Internal negative factors that need improvement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a weakness..."
                      value={newItems.weaknesses}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          weaknesses: e.target.value,
                        }))
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("weaknesses")
                      }
                    />
                    <Button onClick={() => addItem("weaknesses")}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {swotData.weaknesses.map((weakness, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="bg-red-100 text-red-800 hover:bg-red-200"
                      >
                        {weakness}
                        <button
                          onClick={() => removeItem("weaknesses", index)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Opportunities
                  </CardTitle>
                  <CardDescription>
                    External positive factors that can be leveraged
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an opportunity..."
                      value={newItems.opportunities}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          opportunities: e.target.value,
                        }))
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("opportunities")
                      }
                    />
                    <Button onClick={() => addItem("opportunities")}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {swotData.opportunities.map((opportunity, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        {opportunity}
                        <button
                          onClick={() => removeItem("opportunities", index)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="threats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Threats
                  </CardTitle>
                  <CardDescription>
                    External negative factors that pose risks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a threat..."
                      value={newItems.threats}
                      onChange={(e) =>
                        setNewItems((prev) => ({
                          ...prev,
                          threats: e.target.value,
                        }))
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && addItem("threats")
                      }
                    />
                    <Button onClick={() => addItem("threats")}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {swotData.threats.map((threat, index) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                      >
                        {threat}
                        <button
                          onClick={() => removeItem("threats", index)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Analysis</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
