import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  webLink: string;
  icon: string;
}

const defaultProjects: Project[] = [
  {
    id: "1",
    name: "StellarReach Demo",
    webLink: "https://stellar.org/",
    icon: "🚀",
  },
  {
    id: "2",
    name: "My Stellar Startup",
    webLink: "https://stellar.org/",
    icon: "💻",
  },
];

export const ProjectSelector = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedProject, setSelectedProject] = useState(defaultProjects[0]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(
      localStorage.getItem("stellarreach_projects") || "[]"
    );
    const allProjects = [...defaultProjects, ...savedProjects];
    setProjects(allProjects);

    // Set the first project as selected if no project is currently selected
    if (allProjects.length > 0 && !selectedProject) {
      setSelectedProject(allProjects[0]);
    }
  }, []);

  const handleProjectChange = (value: string) => {
    const project = projects.find((p) => p.id === value);
    if (project) {
      setSelectedProject(project);
    }
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
      <div className="flex items-center space-x-2">
        <Select value={selectedProject?.id} onValueChange={handleProjectChange}>
          <SelectTrigger className="w-36 sm:w-48 bg-card/50 border-border text-foreground text-sm">
            <SelectValue>
              {selectedProject && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-xs sm:text-sm">
                    {selectedProject.icon}
                  </span>
                  <span className="truncate text-xs sm:text-sm">
                    {selectedProject.name}
                  </span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {projects.map((project) => (
              <SelectItem
                key={project.id}
                value={project.id}
                className="text-foreground hover:bg-accent"
              >
                <div className="flex items-center space-x-2">
                  <span>{project.icon}</span>
                  <span>{project.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate("/add-project")}
          className="border-border text-foreground hover:bg-accent flex-shrink-0"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
};
