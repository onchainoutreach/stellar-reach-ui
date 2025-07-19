import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Target, LogOut, Menu, X, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProjectSelector } from "@/components/ProjectSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { OutreachMetrics } from "@/components/dashboard/OutreachMetrics";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ProfileDialog } from "@/components/ProfileDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocialIcon } from "react-social-icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("outreach-metrics");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFreeTrialRibbon, setShowFreeTrialRibbon] = useState(true);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const { profileData } = useProfile();

  // Handle URL-based routing
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/sales-team/add")) {
      setActiveNavItem("sales-team-add");
    } else if (path.includes("/sales-team/edit")) {
      setActiveNavItem("sales-team-edit");
    }
  }, [location.pathname]);

  const getInitials = () => {
    if (!profileData.fullName) return "";
    const names = profileData.fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return profileData.fullName.slice(0, 2).toUpperCase();
  };

  const renderContent = () => {
    if (activeNavItem === "outreach-metrics") {
      return <OutreachMetrics onNavigate={setActiveNavItem} />;
    }
    return <DashboardContent activeItem={activeNavItem} />;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen gradient-bg">
        {/* Free Trial Ribbon */}
        {showFreeTrialRibbon && (
          <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium relative">
            🎉 Free Trial - Experience all features with no limitations
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFreeTrialRibbon(false)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-primary-foreground/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Header */}
        <header className="border-b border-border bg-card/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                )}
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
                >
                  {/* <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div> */}
                  <img
                    src="/images/outreach.png"
                    alt="Logo"
                    className="w-12 h-12"
                  />
                  <span className="text-lg sm:text-xl font-bold text-foreground">
                    StellarReach
                  </span>
                </button>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setProfileDialogOpen(true)}
                      className="hover:scale-105 transition-transform cursor-pointer"
                    >
                      {profileData.avatarUrl ? (
                        <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                          <AvatarImage
                            src={profileData.avatarUrl}
                            alt="Profile"
                          />
                          <AvatarFallback className="text-xs sm:text-sm bg-gradient-to-r from-green-400 to-blue-500 text-white">
                            {getInitials() || null}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                          {getInitials() ? (
                            <span className="text-xs sm:text-sm font-medium text-white">
                              {getInitials()}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit your profile</p>
                  </TooltipContent>
                </Tooltip>
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="border-border text-foreground hover:bg-accent text-xs sm:text-sm"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Log Out</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Project Selection Section */}
        <section className="border-b border-border bg-card/10">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-center">
              <ProjectSelector />
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="flex h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)]">
          <DashboardSidebar
            activeItem={activeNavItem}
            onItemChange={setActiveNavItem}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
              {renderContent()}

              <div className="mt-8 sm:mt-12">
                <div className="max-w-4xl mx-auto">
                  <Separator className="bg-border mb-6 sm:mb-8" />
                  <div className="text-center text-muted-foreground text-sm">
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 mx-auto hover:opacity-80 transition-opacity"
                    >
                      {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div> */}
                      <img
                        src="/images/outreach.png"
                        alt="Logo"
                        className="w-12 h-12"
                      />
                      <span className="text-base sm:text-lg font-bold text-foreground">
                        StellarReach
                      </span>
                    </button>
                    <p>© 2025 StellarReach. All rights reserved.</p>
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 mt-4">
                      <SocialIcon
                        url="https://x.com"
                        href="https://x.com/onchainoutreach"
                        target="_blank"
                        borderRadius={"25%"}
                        style={{ height: 30, width: 30 }}
                      />
                      <SocialIcon
                        url="https://discord.com"
                        href="https://discord.gg/kfJnUTFE"
                        target="_blank"
                        borderRadius={"25%"}
                        style={{ height: 30, width: 30 }}
                      />
                      <SocialIcon
                        url="https://github.com"
                        href="https://github.com/onchainoutreach"
                        target="_blank"
                        borderRadius={"25%"}
                        style={{ height: 30, width: 30 }}
                      />
                      <SocialIcon
                        url="https://www.reddit.com"
                        href="https://www.reddit.com/user/MaterialPenalty1310/"
                        target="_blank"
                        borderRadius={"25%"}
                        style={{ height: 30, width: 30 }}
                      />
                      <SocialIcon
                        url="https://www.linkedin.com"
                        href="https://www.linkedin.com/in/stellar-reach-b15303375/"
                        target="_blank"
                        borderRadius={"25%"}
                        style={{ height: 30, width: 30 }}
                      />
                      <SocialIcon
                        url="https://medium.com"
                        href="https://medium.com/@onchainoutreach"
                        target="_blank"
                        borderRadius={"25%"}
                        style={{ height: 30, width: 30 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <ProfileDialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
        />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
