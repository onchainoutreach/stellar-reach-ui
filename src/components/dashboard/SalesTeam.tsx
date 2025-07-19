import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Users,
  Mail,
  Phone,
  MoreHorizontal,
  Edit,
  Trash2,
  MessageCircle,
  Calendar,
  Plus,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoalForm } from "./GoalForm";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  socialHandle: string;
  image: null;
}

interface Goal {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  lead: string;
  description: string;
}

export const SalesTeam = () => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [showDeleteGoalConfirm, setShowDeleteGoalConfirm] = useState<
    number | null
  >(null);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Sales Manager",
      email: "sarah.johnson@stellarreach.com",
      phone: "+1 (555) 123-4567",
      socialHandle: "@sarahj",
      image: null,
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "CMO",
      email: "mike.chen@stellarreach.com",
      phone: "+1 (555) 234-5678",
      socialHandle: "@mikechen",
      image: null,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Specialist",
      email: "emily.rodriguez@stellarreach.com",
      phone: "+1 (555) 345-6789",
      socialHandle: "@emilyrod",
      image: null,
    },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Increase Lead Conversion Rate",
      startDate: "2025-06-01",
      endDate: "2026-03-31",
      lead: "Sarah Johnson",
      description:
        "Improve lead-to-customer conversion rate from 15% to 35% through enhanced nurturing campaigns",
    },
    {
      id: 2,
      name: "Launch New Product Campaign",
      startDate: "2025-07-01",
      endDate: "2026-06-30",
      lead: "Mike Chen",
      description:
        "Generate 5000 qualified leads for the new product line within those months",
    },
  ]);

  const salesRepsCount = teamMembers.filter(
    (member) =>
      member.role.toLowerCase().includes("sales") ||
      member.role.toLowerCase().includes("account")
  ).length;

  const marketingCount = teamMembers.filter((member) =>
    member.role.toLowerCase().includes("marketing")
  ).length;

  const handleContact = (member: TeamMember) => {
    window.open(`mailto:${member.email}`, "_blank");
  };

  const handleBookMeeting = (member: TeamMember) => {
    console.log("Booking meeting with:", member.name);
  };

  const handleEdit = (memberId: number) => {
    navigate(`/dashboard/sales-team/edit/${memberId}`);
  };

  const handleDelete = (memberId: number) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== memberId));
    console.log("Deleted member:", memberId);
    setShowDeleteConfirm(null);
  };

  const handleAddGoal = () => {
    setEditingGoal(null);
    setShowGoalForm(true);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setShowGoalForm(true);
  };

  const handleSaveGoal = (goalData: Omit<Goal, "id">) => {
    if (editingGoal) {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === editingGoal.id
            ? { ...goalData, id: editingGoal.id }
            : goal
        )
      );
    } else {
      const newId = Math.max(...goals.map((g) => g.id), 0) + 1;
      setGoals((prev) => [...prev, { ...goalData, id: newId }]);
    }
    setShowGoalForm(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    setShowDeleteGoalConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Team</h1>
          <p className="text-muted-foreground">
            Manage your sales and marketing team members
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate("/dashboard/sales-team/add")}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Overview Badges */}
      <div className="flex flex-wrap gap-4">
        <Badge variant="secondary" className="px-4 py-2 text-base">
          <Users className="w-4 h-4 mr-2" />
          Total Members: {teamMembers.length}
        </Badge>

        <Badge variant="secondary" className="px-4 py-2 text-base">
          <Users className="w-4 h-4 mr-2" />
          Sales Reps: {salesRepsCount}
        </Badge>

        <Badge variant="secondary" className="px-4 py-2 text-base">
          <Users className="w-4 h-4 mr-2" />
          Marketing Team: {marketingCount}
        </Badge>
      </div>

      {/* Team Members List */}
      <Card className="bg-transparent border border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-transparent border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.socialHandle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {member.phone}
                      </span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleContact(member)}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleBookMeeting(member)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Meet
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(member.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setShowDeleteConfirm(member.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objectives & Goals */}
      <Card className="bg-transparent border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Objectives & Goals</CardTitle>
          <Button variant="outline" size="sm" onClick={handleAddGoal}>
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="p-4 bg-transparent border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <h3 className="font-medium text-foreground">
                        {goal.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {goal.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>
                        Start: {new Date(goal.startDate).toLocaleDateString()}
                      </span>
                      <span>
                        End: {new Date(goal.endDate).toLocaleDateString()}
                      </span>
                      <span>Lead: {goal.lead}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditGoal(goal)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Goal
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setShowDeleteGoalConfirm(goal.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Goal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Member Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border max-w-md">
            <h3 className="text-lg font-semibold mb-2">Confirm Removal</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to remove this team member? This action
              cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Goal Confirmation Dialog */}
      {showDeleteGoalConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border max-w-md">
            <h3 className="text-lg font-semibold mb-2">Confirm Goal Removal</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to remove this goal? This action cannot be
              undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteGoalConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteGoal(showDeleteGoalConfirm)}
              >
                Remove Goal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Goal Form Dialog */}
      {showGoalForm && (
        <GoalForm
          goal={editingGoal}
          teamMembers={teamMembers}
          onSave={handleSaveGoal}
          onCancel={() => {
            setShowGoalForm(false);
            setEditingGoal(null);
          }}
        />
      )}
    </div>
  );
};
