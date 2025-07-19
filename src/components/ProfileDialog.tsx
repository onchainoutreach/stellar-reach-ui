import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileDialog = ({ open, onOpenChange }: ProfileDialogProps) => {
  const { toast } = useToast();
  const { profileData, updateProfile } = useProfile();
  const [formData, setFormData] = useState(profileData);

  // Update form data when profile data changes
  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          avatarUrl: result,
        }));
        toast({
          title: "Avatar uploaded",
          description: "Your profile picture has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      "avatar-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    onOpenChange(false);
  };

  const getInitials = () => {
    const names = formData.fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return formData.fullName.slice(0, 2).toUpperCase() || "U";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and avatar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatarUrl} alt="Profile" />
              <AvatarFallback className="text-lg">
                {formData.fullName ? (
                  getInitials()
                ) : (
                  <User className="w-8 h-8" />
                )}
              </AvatarFallback>
            </Avatar>

            <div className="relative">
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={triggerFileInput}
                type="button"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Avatar
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Position/Role</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="e.g., Sales Manager, CMO, Marketing Lead"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="socialHandle">Social Handle</Label>
              <Input
                id="socialHandle"
                value={formData.socialHandle}
                onChange={(e) =>
                  handleInputChange("socialHandle", e.target.value)
                }
                placeholder="@username or common social media handle"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
