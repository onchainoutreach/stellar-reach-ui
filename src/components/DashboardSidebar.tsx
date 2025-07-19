import { useState } from "react";
import {
  BarChart3,
  Users,
  Calendar,
  FileText,
  Zap,
  Building,
  Share2,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  UserCog,
  Sparkles,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navigationItems = [
  {
    id: "outreach-metrics",
    name: "Outreach Metrics",
    icon: BarChart3,
    tooltip: "View and analyze outreach performance metrics",
  },
  {
    id: "leads-db",
    name: "Leads DB",
    icon: Users,
    tooltip: "Manage your leads database",
  },
  {
    id: "appointments",
    name: "Appointments",
    icon: Calendar,
    tooltip: "Schedule and manage appointments",
  },
  {
    id: "template-builder",
    name: "Template Builder",
    icon: FileText,
    tooltip: "Create and edit email templates",
  },
  {
    id: "automated-outreach",
    name: "Automated Outreach",
    icon: Zap,
    tooltip: "Set up automated outreach campaigns",
  },
  {
    id: "directory-listings",
    name: "Directory Listings",
    icon: Building,
    tooltip: "Manage business directory listings",
  },
  {
    id: "early-adopters",
    name: "Early Adopters",
    icon: Sparkles,
    tooltip: "Dedicated space for early test and pilot users",
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: Share2,
    tooltip: "Manage social media presence",
  },
  {
    id: "sales-team",
    name: "Sales Team",
    icon: UserCog,
    tooltip: "Manage sales and marketing team members",
  },
  {
    id: "competitive-analysis",
    name: "Competitive Analysis",
    icon: TrendingUp,
    tooltip: "Analyze competitor strategies",
  },
  {
    id: "sales-playbooks",
    name: "Sales Playbooks",
    icon: BookOpen,
    tooltip: "Access and manage sales playbooks and strategies",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    tooltip: "Platform settings, support, and information",
  },
];

interface DashboardSidebarProps {
  activeItem: string;
  onItemChange: (itemId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DashboardSidebar = ({
  activeItem,
  onItemChange,
  isOpen = false,
  onClose,
}: DashboardSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isMobile = useIsMobile();

  const handleItemClick = (itemId: string) => {
    onItemChange(itemId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isMobile) {
    return (
      <TooltipProvider>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 md:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Mobile Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-foreground">Navigation</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Navigation Items */}
          <nav className="p-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  activeItem === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </TooltipProvider>
    );
  }

  // Desktop Sidebar
  return (
    <TooltipProvider>
      <div
        className={cn(
          "hidden md:block h-full bg-card border-r border-border transition-all duration-300",
          isExpanded ? "w-64" : "w-16"
        )}
      >
        {/* Toggle Button */}
        <div className="p-2 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-center"
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {navigationItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onItemChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeItem === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {isExpanded && <span className="truncate">{item.name}</span>}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
};
