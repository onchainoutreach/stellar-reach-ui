import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Mail,
  Users,
  BarChart3,
  LayoutTemplate,
  X,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  console.log(theme);
  const heroAnimation = useScrollAnimation(0.1);
  const featuresAnimation = useScrollAnimation(0.2);
  const demoAnimation = useScrollAnimation(0.2);
  const waitlistAnimation = useScrollAnimation(0.2);
  const pricingAnimation = useScrollAnimation(0.2);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist signup:", email);
    setEmail("");
    alert("Thanks for joining our waitlist!");
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div> */}
            <img src="/images/outreach.png" alt="Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold text-foreground">
              StellarReach
            </span>
          </button>
          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToPricing}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Pricing
            </button>
            <ThemeToggle />
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90"
            >
              Sales Board
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        ref={heroAnimation.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-6 py-20 text-center transition-all duration-1000 ${
          heroAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
            StellarReach
            <span className="block text-4xl text-primary mt-2">
              BD Leads Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Transform your business development with our advanced lead tracking,
            project management, and sales analytics platform tailored for
            Stellar projects. Track every outreach, measure every conversion,
            optimize every campaign.
          </p>

          {/* Supercharged by text and StellarReach Logo SVG */}
          <div className="mb-16">
            <p className="text-lg text-muted-foreground mb-6">
              Supercharged by:
            </p>
            <a href="https://stellar.org/" target="_blank">
              <svg
                viewBox="0 0 160 40"
                xmlns="http://www.w3.org/2000/svg"
                className="w-80 h-20 mx-auto text-foreground"
              >
                <g clipPath="url(#clip0_27_1534)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M40.6 5.23017L34.908 8.13017L7.422 22.1302C7.32906 21.4213 7.28229 20.7071 7.282 19.9922C7.28576 17.1395 8.0347 14.3374 9.45464 11.8633C10.8746 9.38919 12.9163 7.32896 15.3774 5.8867C17.8386 4.44444 20.6338 3.67018 23.4863 3.64062C26.3388 3.61106 29.1495 4.32722 31.64 5.71817L34.898 4.05817L35.384 3.81017C32.3995 1.64394 28.8741 0.345091 25.1975 0.0571559C21.521 -0.230779 17.8364 0.503418 14.551 2.1786C11.2656 3.85379 8.5074 6.40472 6.58114 9.54948C4.65488 12.6942 3.63562 16.3104 3.636 19.9982C3.636 20.5075 3.65533 21.0148 3.694 21.5202C3.74815 22.2358 3.58944 22.9514 3.23784 23.5771C2.88623 24.2027 2.35744 24.7104 1.718 25.0362L0 25.9122V29.9982L5.058 27.4202L6.696 26.5842L8.31 25.7622L37.286 10.9982L40.542 9.34017L47.272 5.91017V1.82617L40.6 5.23017ZM47.272 10L9.956 29L6.7 30.662L0 34.076V38.158L6.654 34.768L12.346 31.868L39.86 17.848C39.953 18.5616 39.9998 19.2804 40 20C39.9982 22.8559 39.2495 25.6617 37.8282 28.1388C36.4069 30.6159 34.3624 32.6782 31.8976 34.1209C29.4329 35.5637 26.6337 36.3366 23.7779 36.3631C20.9221 36.3896 18.1091 35.6687 15.618 34.272L15.418 34.378L11.886 36.178C14.8699 38.3443 18.3945 39.6435 22.0705 39.9322C25.7465 40.2208 29.4307 39.4876 32.7161 37.8135C36.0014 36.1395 38.7601 33.5898 40.6872 30.4461C42.6143 27.3025 43.6348 23.6873 43.636 20C43.636 19.486 43.616 18.972 43.578 18.464C43.5239 17.7486 43.6825 17.0332 44.0337 16.4077C44.3849 15.7821 44.9131 15.2743 45.552 14.948L47.272 14.072V10ZM93.3438 23.6699C93.3438 17.0359 97.7718 12.8359 103.48 12.8359C109.886 12.8359 113.654 18.1559 113.226 24.7959H97.1497C97.2657 29.2999 100.528 31.4739 103.596 31.4739C106.704 31.4739 108.412 30.0759 109.304 28.0179H112.954C112.022 31.5919 108.684 34.5819 103.596 34.5819C96.9937 34.5819 93.3438 29.8439 93.3438 23.6699ZM103.48 15.8639C100.372 15.8639 97.4997 17.5659 97.1878 21.7659H109.498C109.382 18.8159 107.246 15.8639 103.48 15.8639ZM71.8492 17.9181L68.5972 17.1801C65.9472 16.5961 63.9972 15.3561 63.9972 12.8701C63.9972 9.72406 67.7972 8.75406 69.9772 8.75406C72.7772 8.75406 76.0352 9.88006 76.9672 13.1021H80.8132C79.6852 7.70206 75.2132 5.41406 70.1332 5.41406C65.5892 5.41406 59.9592 7.70606 59.9592 13.1021C59.9592 17.7621 63.8032 19.9381 67.6872 20.7921L71.1972 21.5301C74.7312 22.3461 77.2552 23.5101 77.2552 26.5001C77.2552 29.3001 74.8872 31.2381 70.6932 31.2381C66.3052 31.2381 63.6652 29.2181 62.9272 25.3361H59.0352C59.7732 30.9361 63.9672 34.5781 70.6072 34.5781C76.2072 34.5781 81.3252 31.6261 81.3252 26.1501C81.3252 20.4821 76.1612 18.8501 71.8492 17.9181ZM85.3801 7.9375H88.9141V13.1795H92.8741V16.0155H88.9141V28.4035C88.9141 30.5775 89.0681 31.1215 91.0881 31.1215H92.8741V34.0715H90.3121C86.3121 34.0715 85.3801 33.1795 85.3801 28.8295V16.0155H82.0781V13.1795H85.3801V7.9375ZM158.938 13.0675C156.18 13.1835 154.084 14.4675 153.036 16.8335V13.1835H149.578V34.0755H153.112V23.1255C153.112 18.4655 154.744 16.7255 158.006 16.7255C158.669 16.7256 159.331 16.7778 159.986 16.8815V13.1055C159.638 13.0752 159.288 13.0625 158.938 13.0675ZM146.215 21.3817L146.177 26.1977C146.137 29.7257 146.293 32.0937 146.719 34.0797H143.147C142.996 33.1291 142.905 32.1698 142.875 31.2077C141.595 33.3857 139.459 34.5857 135.731 34.5857C131.809 34.5857 128.547 32.4097 128.547 28.5657C128.547 23.6257 134.139 22.1597 142.681 21.2257V20.7217C142.681 16.8777 140.585 15.6357 137.943 15.6357C134.993 15.6357 133.323 17.1897 133.167 19.7897H129.517C129.827 15.2857 133.867 12.7617 137.905 12.7617C143.769 12.7617 146.255 15.4397 146.215 21.3817ZM136.507 31.7897C139.809 31.7897 142.953 30.2737 142.953 25.3437V24.0217C136.545 24.6437 132.469 25.6137 132.469 28.4877C132.469 30.4697 133.983 31.7897 136.507 31.7897ZM119.136 5.90625H115.602V34.0742H119.136V5.90625ZM122.668 5.90625H126.202V34.0742H122.668V5.90625Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_1534">
                    <rect width="160" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Feature Icons */}
      <section
        ref={featuresAnimation.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-6 mb-16 transition-all duration-1000 delay-200 ${
          featuresAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 rounded-2xl card-gradient transform transition-all duration-500 hover:scale-105">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Lead Management
              </h3>
              <p className="text-muted-foreground text-center">
                Track and convert leads with precision analytics
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl card-gradient transform transition-all duration-500 hover:scale-105">
              <LayoutTemplate className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Outreach Templates
              </h3>
              <p className="text-muted-foreground text-center">
                Create AI powered outreach templates that convert
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl card-gradient transform transition-all duration-500 hover:scale-105">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Sales Analytics
              </h3>
              <p className="text-muted-foreground text-center">
                Real-time insights and performance metrics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to close more deals and Video Demo */}
      <section
        ref={demoAnimation.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-6 mb-16 transition-all duration-1000 delay-400 ${
          demoAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-foreground mb-8">
            Ready to close more deals?
          </h3>
          <div className="relative">
            <div className="aspect-video bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-border glow-effect">
              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-card/20 hover:bg-card/30 text-foreground border border-border transform transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
                  <div className="relative">
                    <button
                      onClick={() => setIsVideoOpen(false)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/iIMgaUyiEho?si=gwz9OTBWYp92BoKK"
                        title="StellarReach Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Email Waitlist */}
      <section
        ref={waitlistAnimation.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-6 mb-20 transition-all duration-1000 delay-600 ${
          waitlistAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Join the Waitlist
          </h3>
          <form onSubmit={handleWaitlistSubmit} className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-card/50 border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:scale-105"
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 transform transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4 mr-2" />
              Join
            </Button>
          </form>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingAnimation.ref as React.RefObject<HTMLElement>}
        className={`container mx-auto px-6 py-20 transition-all duration-1000 delay-800 ${
          pricingAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Start free and scale as you grow
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Trial Plan */}
            <div className="relative p-8 rounded-2xl card-gradient border-2 border-border transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Free Trial
                </h3>
                <p className="text-muted-foreground mb-4">
                  Everything you need to get started
                </p>
                <div className="text-4xl font-bold text-primary mb-2">$0</div>
                <p className="text-sm text-muted-foreground">Forever free</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Leads Database</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Metrics & Analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Outreach Templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">
                    Social Media Management
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Sales Team Management</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Directory Listings</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Sales Playbooks</span>
                </li>
              </ul>

              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-primary hover:bg-primary/90 transform transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Try Now
              </Button>
            </div>

            {/* Pay To Scale Plan */}
            <div className="relative p-8 rounded-2xl card-gradient border-2 border-border opacity-75 transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div className="absolute top-4 right-4">
                <Badge
                  variant="secondary"
                  className="bg-muted text-muted-foreground"
                >
                  Coming Soon
                </Badge>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Pay To Scale
                </h3>
                <p className="text-muted-foreground mb-4">
                  Enhanced features for growing teams
                </p>
                <div className="text-4xl font-bold text-primary mb-2">$49</div>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">
                    Enhanced Leads Database
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Full Automation</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Advanced Analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Priority Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Custom Integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">
                    Unlimited Team Members
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-foreground">Advanced Reporting</span>
                </li>
              </ul>

              <Button disabled className="w-full opacity-50" size="lg">
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-border">
        <div className="text-center">
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center justify-center space-x-3 mb-4 mx-auto hover:opacity-80 transition-opacity"
          >
            {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div> */}
            <img src="/images/outreach.png" alt="Logo" className="w-12 h-12" />
            <span className="text-xl font-bold text-foreground">
              StellarReach
            </span>
          </button>
          <p className="text-muted-foreground">
            © 2025 StellarReach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
