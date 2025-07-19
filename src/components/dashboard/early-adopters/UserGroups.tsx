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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Settings, Plus, Users, Edit, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserGroup {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isActive: boolean;
}

export const UserGroups = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<UserGroup[]>([
    {
      id: "1",
      name: "Closed Beta Testers",
      description: "Private beta testing group",
      userCount: 15,
      isActive: true,
    },
    {
      id: "2",
      name: "Open Beta Testers",
      description: "Public beta testing group",
      userCount: 45,
      isActive: true,
    },
    {
      id: "3",
      name: "Pilot Users",
      description: "Initial pilot program participants",
      userCount: 8,
      isActive: true,
    },
    {
      id: "4",
      name: "Security Testers",
      description: "Security-focused testing group",
      userCount: 12,
      isActive: false,
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingGroup) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id
            ? {
                ...editingGroup,
                name: formData.name,
                description: formData.description,
              }
            : g
        )
      );
      toast({
        title: "Success",
        description: "Group updated successfully",
      });
    } else {
      const newGroup: UserGroup = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        userCount: 0,
        isActive: true,
      };
      setGroups((prev) => [...prev, newGroup]);
      toast({
        title: "Success",
        description: "Group created successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingGroup(null);
    setFormData({ name: "", description: "" });
  };

  const handleEdit = (group: UserGroup) => {
    setEditingGroup(group);
    setFormData({ name: group.name, description: group.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    toast({
      title: "Success",
      description: "Group deleted successfully",
    });
  };

  const toggleGroupStatus = (id: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, isActive: !group.isActive } : group
      )
    );
  };

  const importUsers = () => {
    // Simulate import
    toast({
      title: "Import Users",
      description: "User import functionality would be implemented here",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              User Groups Management
            </CardTitle>
            <CardDescription>
              Configure and manage different user groups for targeted testing
              and access
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={importUsers}>
              <Upload className="w-4 h-4 mr-2" />
              Import Users
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingGroup(null);
                    setFormData({ name: "", description: "" });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingGroup ? "Edit Group" : "Create New Group"}
                  </DialogTitle>
                  <DialogDescription>
                    Configure a user group for targeted access and testing
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input
                      id="groupName"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="e.g., Premium Beta Testers"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groupDescription">Description</Label>
                    <Input
                      id="groupDescription"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe the purpose of this group..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingGroup ? "Update" : "Create"} Group
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{group.name}</h3>
                  <Badge variant={group.isActive ? "default" : "secondary"}>
                    {group.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {group.userCount}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {group.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleGroupStatus(group.id)}
                >
                  {group.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(group)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(group.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
