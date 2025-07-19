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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Benefit {
  id: string;
  title: string;
  description: string;
  category: "access" | "feature" | "support" | "reward";
}

export const EarlyAccessBenefits = () => {
  const { toast } = useToast();
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: "1",
      title: "Priority Support",
      description: "Get dedicated support with faster response times",
      category: "support",
    },
    {
      id: "2",
      title: "Beta Feature Access",
      description: "Try new features before they are released to the public",
      category: "feature",
    },
    {
      id: "3",
      title: "Exclusive Community",
      description: "Join our private Discord channel for early adopters",
      category: "access",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: "access" | "feature" | "support" | "reward";
  }>({
    title: "",
    description: "",
    category: "access",
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingBenefit) {
      setBenefits((prev) =>
        prev.map((b) =>
          b.id === editingBenefit.id ? { ...editingBenefit, ...formData } : b
        )
      );
      toast({
        title: "Success",
        description: "Benefit updated successfully",
      });
    } else {
      const newBenefit: Benefit = {
        id: Date.now().toString(),
        ...formData,
      };
      setBenefits((prev) => [...prev, newBenefit]);
      toast({
        title: "Success",
        description: "Benefit added successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingBenefit(null);
    setFormData({ title: "", description: "", category: "access" });
  };

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit);
    setFormData({
      title: benefit.title,
      description: benefit.description,
      category: benefit.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBenefits((prev) => prev.filter((b) => b.id !== id));
    toast({
      title: "Success",
      description: "Benefit removed successfully",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "access":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "feature":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "support":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "reward":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Early Access Benefits
            </CardTitle>
            <CardDescription>
              Define and manage the exclusive benefits for your early adopters
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingBenefit(null);
                  setFormData({
                    title: "",
                    description: "",
                    category: "access",
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Benefit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingBenefit ? "Edit Benefit" : "Add New Benefit"}
                </DialogTitle>
                <DialogDescription>
                  Create or modify benefits for your early adopters
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g., Priority Support"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe the benefit in detail..."
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as
                          | "access"
                          | "feature"
                          | "support"
                          | "reward",
                      }))
                    }
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="access">Access</option>
                    <option value="feature">Feature</option>
                    <option value="support">Support</option>
                    <option value="reward">Reward</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingBenefit ? "Update" : "Add"} Benefit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <Badge className={getCategoryColor(benefit.category)}>
                    {benefit.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(benefit)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(benefit.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
