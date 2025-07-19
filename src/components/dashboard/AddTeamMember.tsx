import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Upload, Target } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialIcon } from "react-social-icons";

export const AddTeamMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    phone: "",
    socialHandle: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would normally save to config JSON
    console.log("Saving team member:", formData);

    // Navigate back to dashboard with sales team selected
    navigate("/dashboard");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
    // Note: In a real app, you'd also set the active nav item to 'sales-team'
  };

  const isFormValid = formData.fullName && formData.role && formData.email;

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
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

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToDashboard}
                className="border-border text-foreground hover:bg-accent text-xs sm:text-sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Dashboard
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Add Team Member
            </h1>
            <p className="text-muted-foreground">
              Fill in the details for the new team member
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Member Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-lg">
                        {formData.fullName
                          ? formData.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "?"}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="image"
                      className="block text-sm font-medium mb-2"
                    >
                      Profile Image (Optional)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("image")?.click()
                        }
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role/Position *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="e.g., Sales Manager, CMO"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Social Handle */}
                <div className="space-y-2">
                  <Label htmlFor="socialHandle">Social Handle</Label>
                  <Input
                    id="socialHandle"
                    value={formData.socialHandle}
                    onChange={(e) =>
                      handleInputChange("socialHandle", e.target.value)
                    }
                    placeholder="@username"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToDashboard}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Team Member
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
      </footer>
    </div>
  );
};
