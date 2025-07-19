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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Users, Plus, Download, Search, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistUser {
  id: string;
  email: string;
  walletAddress?: string;
  firstName?: string;
  lastName?: string;
  registeredAt: string;
  status: "waiting" | "invited" | "active";
}

export const UserWaitlist = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<WaitlistUser[]>([
    {
      id: "1",
      email: "alice@example.com",
      walletAddress: "GCKFBEIYTKP6RBLBQHAQR5ZBDBVZXJX6ZBQGBCJJKMX4LSPGKQHQ7X25",
      firstName: "Alice",
      lastName: "Johnson",
      registeredAt: "2025-06-15",
      status: "active",
    },
    {
      id: "2",
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Smith",
      registeredAt: "2025-06-20",
      status: "waiting",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    walletAddress: "",
    firstName: "",
    lastName: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Email address is required",
        variant: "destructive",
      });
      return;
    }

    const newUser: WaitlistUser = {
      id: Date.now().toString(),
      email: formData.email,
      walletAddress: formData.walletAddress || undefined,
      firstName: formData.firstName || undefined,
      lastName: formData.lastName || undefined,
      registeredAt: new Date().toISOString().split("T")[0],
      status: "waiting",
    };

    setUsers((prev) => [...prev, newUser]);
    setFormData({ email: "", walletAddress: "", firstName: "", lastName: "" });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "User added to waitlist",
    });
  };

  const exportData = (format: "json" | "csv") => {
    if (format === "json") {
      const dataStr = JSON.stringify(users, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "waitlist-users.json";
      link.click();
    } else {
      const headers = [
        "Email",
        "Wallet Address",
        "First Name",
        "Last Name",
        "Registered At",
        "Status",
      ];
      const csvContent = [
        headers.join(","),
        ...users.map((user) =>
          [
            user.email,
            user.walletAddress || "",
            user.firstName || "",
            user.lastName || "",
            user.registeredAt,
            user.status,
          ].join(",")
        ),
      ].join("\n");

      const dataBlob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "waitlist-users.csv";
      link.click();
    }

    toast({
      title: "Success",
      description: `Waitlist exported as ${format.toUpperCase()}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "invited":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Waitlist ({users.length} users)
            </CardTitle>
            <CardDescription>
              Manage registered early users and their information
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportData("csv")}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportData("json")}>
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add User to Waitlist</DialogTitle>
                  <DialogDescription>
                    Register a new user for early access
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="walletAddress">
                      Stellar Wallet Address (Optional)
                    </Label>
                    <Input
                      id="walletAddress"
                      value={formData.walletAddress}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          walletAddress: e.target.value,
                        }))
                      }
                      placeholder="GCKFBEIYTKP6RBLBQHAQR5ZBDBVZXJX6ZBQGBCJJKMX4LSPGKQHQ7X25"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name (Optional)</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name (Optional)</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <Input
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    {user.firstName || user.lastName
                      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                      : "-"}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {user.walletAddress
                      ? `${user.walletAddress.slice(
                          0,
                          8
                        )}...${user.walletAddress.slice(-8)}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {user.registeredAt}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
