import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Target } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ImportLead() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    type: "",
    description: "",
    linkedin: "",
    email: "",
    twitter: "",
    discord: "",
    telegram: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save to your leads database
    console.log("New lead data:", formData);
    // Navigate back to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div> */}
                <img
                  src="/images/outreach.png"
                  alt="Logo"
                  className="w-12 h-12"
                />
                <span className="text-xl font-bold text-foreground">
                  StellarReach
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="border-border text-foreground hover:bg-accent"
              >
                Dashboard
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Import New Lead
          </h1>
          <p className="text-muted-foreground mt-2">
            Add a new lead to your database
          </p>
        </div>

        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="text-foreground">Lead Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name / Company Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter name or company name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position / Role</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                    placeholder="Enter position or role"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Enter company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B2B">B2B</SelectItem>
                      <SelectItem value="B2C">B2C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description or notes about the lead"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">
                  Social Media & Contact
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      placeholder="LinkedIn profile URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                      placeholder="Twitter/X profile URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord</Label>
                    <Input
                      id="discord"
                      value={formData.discord}
                      onChange={(e) =>
                        handleInputChange("discord", e.target.value)
                      }
                      placeholder="Discord username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input
                      id="telegram"
                      value={formData.telegram}
                      onChange={(e) =>
                        handleInputChange("telegram", e.target.value)
                      }
                      placeholder="Telegram username"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Import Lead
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 StellarReach. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Import leads to grow your database
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
