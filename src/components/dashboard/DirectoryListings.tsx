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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Check,
  Eye,
  EyeOff,
  Globe,
  Rocket,
  Star,
} from "lucide-react";

interface Directory {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  isListed: boolean;
  isHidden: boolean;
  projectUrl: string;
}

export const DirectoryListings = () => {
  const [directories, setDirectories] = useState<Directory[]>([
    {
      id: "stellar-ecosystem",
      name: "Stellar Ecosystem",
      description:
        "Official Stellar ecosystem directory showcasing projects, tools, and services built on Stellar.",
      url: "https://stellar.org/ecosystem",
      icon: "/images/stellaricon.jpg",
      isListed: false,
      isHidden: false,
      projectUrl: "",
    },
    {
      id: "dappradar",
      name: "DappRadar",
      description:
        "Leading DApp discovery platform with dedicated Stellar protocol rankings and analytics.",
      url: "https://dappradar.com/rankings/protocol/stellar/",
      icon: "/images/dappradaricon.png",
      isListed: false,
      isHidden: false,
      projectUrl: "",
    },
    {
      id: "stellar-light",
      name: "Stellar Light",
      description:
        "Community-driven platform for discovering and exploring Stellar-based applications and services.",
      url: "https://stellarlight.xyz/",
      icon: "/images/stellarlighticon.png",
      isListed: false,
      isHidden: false,
      projectUrl: "",
    },
    {
      id: "lumenloop-db",
      name: "LumenLoop DB",
      description:
        "Comprehensive database of Stellar ecosystem projects with detailed categorization and tracking.",
      url: "https://github.com/lumenloop/stellar-ecosystem-db",
      icon: "/images/lumenloopicon.jpg",
      isListed: false,
      isHidden: false,
      projectUrl: "",
    },
  ]);

  const toggleListed = (id: string) => {
    setDirectories((prev) =>
      prev.map((dir) =>
        dir.id === id ? { ...dir, isListed: !dir.isListed } : dir
      )
    );
  };

  const toggleHidden = (id: string) => {
    setDirectories((prev) =>
      prev.map((dir) =>
        dir.id === id ? { ...dir, isHidden: !dir.isHidden } : dir
      )
    );
  };

  const updateProjectUrl = (id: string, url: string) => {
    setDirectories((prev) =>
      prev.map((dir) => (dir.id === id ? { ...dir, projectUrl: url } : dir))
    );
  };

  const visibleDirectories = directories.filter((dir) => !dir.isHidden);
  const hiddenCount = directories.filter((dir) => dir.isHidden).length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Directory Listings
        </h1>
        <p className="text-muted-foreground">
          Explore launch platforms and directories to list your Stellar
          blockchain project for discovery and visibility.
        </p>
      </div>

      {/* Stats as Badges */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Total Directories:
          </span>
          <Badge variant="secondary">{directories.length}</Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-sm text-muted-foreground">Listed:</span>
          <Badge variant="secondary">
            {directories.filter((d) => d.isListed).length}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <EyeOff className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Hidden:</span>
          <Badge variant="secondary">{hiddenCount}</Badge>
        </div>
      </div>

      {/* Directory Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Launch Platforms & Directories
        </h2>

        <div className="grid gap-6">
          {visibleDirectories.map((directory) => {
            return (
              <Card
                key={directory.id}
                className="relative bg-transparent border border-border hover:bg-card/50 hover:scale-[1.02] transition-all duration-200"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <img
                          className="w-12 h-12 rounded"
                          src={directory.icon}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {directory.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(directory.url, "_blank")}
                            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Visit Platform
                          </Button>
                          {directory.isListed && (
                            <Badge variant="secondary" className="text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              Listed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleHidden(directory.id)}
                        className="h-8 w-8 p-0"
                      >
                        <EyeOff className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {directory.description}
                  </CardDescription>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`project-url-${directory.id}`}
                        className="text-sm font-medium"
                      >
                        Your Project URL on {directory.name}
                      </Label>
                      <Input
                        id={`project-url-${directory.id}`}
                        placeholder="Enter your project URL..."
                        value={directory.projectUrl}
                        onChange={(e) =>
                          updateProjectUrl(directory.id, e.target.value)
                        }
                        className="text-sm"
                      />
                    </div>

                    <div className="flex items-end space-x-2">
                      <Button
                        variant={directory.isListed ? "secondary" : "default"}
                        onClick={() => toggleListed(directory.id)}
                        className="flex-1"
                        disabled={!directory.projectUrl.trim()}
                      >
                        {directory.isListed ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Mark as Listed
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4 mr-2" />
                            Mark as Listed
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {directory.projectUrl && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        Your project URL:
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(directory.projectUrl, "_blank")
                        }
                        className="h-auto p-0 text-sm text-left justify-start font-normal text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{directory.projectUrl}</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {hiddenCount > 0 && (
          <Card className="border-dashed">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <EyeOff className="w-4 h-4" />
                <span className="text-sm">
                  {hiddenCount} director{hiddenCount === 1 ? "y" : "ies"} hidden
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setDirectories((prev) =>
                      prev.map((dir) => ({ ...dir, isHidden: false }))
                    )
                  }
                  className="text-xs h-6 px-2"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Show All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* More Coming Soon */}
      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              More Coming Soon!
            </h3>
            <p className="text-sm text-muted-foreground">
              We're continuously adding new directories and platforms to help
              you maximize your project's visibility.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
