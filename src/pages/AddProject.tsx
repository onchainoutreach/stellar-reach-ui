import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Globe, Home, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const AddProject = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    name: "",
    webLink: "",
    icon: "🚀",
  });

  const iconOptions = [
    "🚀",
    "💻",
    "🛒",
    "📱",
    "🏢",
    "🎯",
    "💡",
    "🌟",
    "🔥",
    "⚡",
    "🎨",
    "📊",
    "🔧",
    "🎵",
    "⭐",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New project:", projectData);

    // Save project to localStorage
    const existingProjects = JSON.parse(
      localStorage.getItem("stellarreach_projects") || "[]"
    );
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
    };
    existingProjects.push(newProject);
    localStorage.setItem(
      "stellarreach_projects",
      JSON.stringify(existingProjects)
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
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

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-foreground hover:bg-accent"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-foreground hover:bg-accent"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Add New Project
            </h1>
            <p className="text-muted-foreground">
              Create a new project to track your BD outreach efforts
            </p>
          </div>

          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-foreground">Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-foreground text-sm font-medium mb-2">
                    Project Name
                  </label>
                  <Input
                    type="text"
                    value={projectData.name}
                    onChange={(e) =>
                      setProjectData({ ...projectData, name: e.target.value })
                    }
                    placeholder="Enter project name"
                    required
                    className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-foreground text-sm font-medium mb-2">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="url"
                      value={projectData.webLink}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          webLink: e.target.value,
                        })
                      }
                      placeholder="https://example.com"
                      className="pl-10 bg-card/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground text-sm font-medium mb-3">
                    Project Icon
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setProjectData({ ...projectData, icon })}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          projectData.icon === icon
                            ? "border-primary bg-primary/20"
                            : "border-border hover:border-border/40"
                        }`}
                      >
                        <span className="text-2xl">{icon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 border-border text-foreground hover:bg-accent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Create Project
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 StellarReach. All rights reserved.
            </p>
            <div className="w-px h-4 bg-border mx-4"></div>
            <p className="text-sm text-muted-foreground">
              Empowering business development teams
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AddProject;
