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
import { MessageSquare, Plus, Eye, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackForm {
  id: string;
  title: string;
  description: string;
  questions: string[];
  responses: number;
  isActive: boolean;
  createdAt: string;
}

export const FeedbackForms = () => {
  const { toast } = useToast();
  const [forms, setForms] = useState<FeedbackForm[]>([
    {
      id: "1",
      title: "Product Experience Survey",
      description: "Gather insights about user experience with our platform",
      questions: [
        "How would you rate your overall experience?",
        "What features do you find most valuable?",
        "What improvements would you suggest?",
      ],
      responses: 23,
      isActive: true,
      createdAt: "2025-06-10",
    },
    {
      id: "2",
      title: "Feature Request Form",
      description:
        "Collect feature requests and suggestions from early adopters",
      questions: [
        "What new feature would you like to see?",
        "How would this feature help your workflow?",
        "How important is this feature to you?",
      ],
      responses: 12,
      isActive: true,
      createdAt: "2025-06-15",
    },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newForm, setNewForm] = useState({
    title: "",
    description: "",
    questions: [""],
  });

  const addQuestion = () => {
    setNewForm((prev) => ({
      ...prev,
      questions: [...prev.questions, ""],
    }));
  };

  const updateQuestion = (index: number, value: string) => {
    setNewForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => (i === index ? value : q)),
    }));
  };

  const removeQuestion = (index: number) => {
    setNewForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const createForm = () => {
    if (
      !newForm.title ||
      !newForm.description ||
      newForm.questions.some((q) => !q.trim())
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const form: FeedbackForm = {
      id: Date.now().toString(),
      title: newForm.title,
      description: newForm.description,
      questions: newForm.questions.filter((q) => q.trim()),
      responses: 0,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setForms((prev) => [...prev, form]);
    setNewForm({ title: "", description: "", questions: [""] });
    setShowCreateForm(false);

    toast({
      title: "Success",
      description: "Feedback form created successfully",
    });
  };

  const toggleFormStatus = (id: string) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === id ? { ...form, isActive: !form.isActive } : form
      )
    );
  };

  if (showCreateForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Feedback Form</CardTitle>
          <CardDescription>
            Design a custom feedback form for your early adopters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Form Title</label>
            <Input
              value={newForm.title}
              onChange={(e) =>
                setNewForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g., Product Experience Survey"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              value={newForm.description}
              onChange={(e) =>
                setNewForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe the purpose of this feedback form..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Questions</label>
            {newForm.questions.map((question, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                />
                {newForm.questions.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addQuestion}>
              Add Question
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={createForm}>Create Form</Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Feedback Forms
            </CardTitle>
            <CardDescription>
              Create and manage feedback forms to gather insights from early
              adopters
            </CardDescription>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {forms.map((form) => (
            <div key={form.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{form.title}</h3>
                    <Badge variant={form.isActive ? "default" : "secondary"}>
                      {form.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {form.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <p className="text-sm font-medium">
                  Questions ({form.questions.length}):
                </p>
                {form.questions.slice(0, 2).map((question, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    • {question}
                  </p>
                ))}
                {form.questions.length > 2 && (
                  <p className="text-sm text-muted-foreground">
                    + {form.questions.length - 2} more questions
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {form.responses} responses • Created {form.createdAt}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFormStatus(form.id)}
                >
                  {form.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
