import { LeadsDatabase } from "./LeadsDatabase";
import { Appointments } from "./Appointments";
import { TemplateBuilder } from "./TemplateBuilder";
import { SocialMedia } from "./SocialMedia";
import { SalesTeam } from "./SalesTeam";
import { DirectoryListings } from "./DirectoryListings";
import { Settings } from "./Settings";
import { AutomatedOutreach } from "./AutomatedOutreach";
import { SalesPlaybooks } from "./SalesPlaybooks";
import { EarlyAdopters } from "./EarlyAdopters";
import { CompetitiveAnalysis } from "./CompetitiveAnalysis";

interface DashboardContentProps {
  activeItem: string;
}

export const DashboardContent = ({ activeItem }: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeItem) {
      case "leads-db":
        return <LeadsDatabase />;
      case "appointments":
        return <Appointments />;
      case "template-builder":
        return <TemplateBuilder />;
      case "automated-outreach":
        return <AutomatedOutreach />;
      case "directory-listings":
        return <DirectoryListings />;
      case "early-adopters":
        return <EarlyAdopters />;
      case "social-media":
        return <SocialMedia />;
      case "sales-team":
        return <SalesTeam />;
      case "competitive-analysis":
        return <CompetitiveAnalysis />;
      case "sales-playbooks":
        return <SalesPlaybooks />;
      case "settings":
        return <Settings />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Select an item from the sidebar to get started
              </p>
            </div>
          </div>
        );
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
};
