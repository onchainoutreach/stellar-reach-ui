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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Coins, Send, CheckCircle, AlertCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  walletAddress?: string;
  firstName?: string;
  lastName?: string;
  lastRewardAmount?: number;
  lastRewardDate?: string;
}

export const XLMDistribution = () => {
  const { toast } = useToast();
  const [users] = useState<User[]>([
    {
      id: "1",
      email: "alice@example.com",
      walletAddress: "GCKFBEIYTKP6RBLBQHAQR5ZBDBVZXJX6ZBQGBCJJKMX4LSPGKQHQ7X25",
      firstName: "Alice",
      lastName: "Johnson",
      lastRewardAmount: 50,
      lastRewardDate: "2025-06-10",
    },
    {
      id: "2",
      email: "bob@example.com",
      walletAddress:
        "GDCKFBEIYTKP6RBLBQHAQR5ZBDBVZXJX6ZBQGBCJJKMX4LSPGKQHQ7X26",
      firstName: "Bob",
      lastName: "Smith",
    },
    {
      id: "3",
      email: "charlie@example.com",
      firstName: "Charlie",
      lastName: "Brown",
    },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAmount, setBulkAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [individualAmount, setIndividualAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const usersWithWallet = users.filter((user) => user.walletAddress);
  const usersWithoutWallet = users.filter((user) => !user.walletAddress);

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(usersWithWallet.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const sendBulkReward = () => {
    if (!bulkAmount || selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select users and enter an amount",
        variant: "destructive",
      });
      alert("Please select users and enter an amount");
      return;
    }

    // Simulate sending XLM
    toast({
      title: "XLM Distribution Initiated",
      description: `Sending ${bulkAmount} XLM to ${selectedUsers.length} users`,
    });

    alert("Free trial demonstration!");

    setBulkAmount("");
    setSelectedUsers([]);
  };

  const sendIndividualReward = () => {
    if (!individualAmount || !selectedUser?.walletAddress) {
      toast({
        title: "Error",
        description: "Please enter an amount and ensure user has a wallet",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending XLM
    toast({
      title: "XLM Sent",
      description: `${individualAmount} XLM sent to ${selectedUser.email}`,
    });

    setIndividualAmount("");
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  const openIndividualDialog = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Bulk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            XLM Token Distribution
          </CardTitle>
          <CardDescription>
            Reward your early adopters with Stellar Lumens (XLM) tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={
                  selectedUsers.length === usersWithWallet.length &&
                  usersWithWallet.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all" className="font-medium">
                Select All ({usersWithWallet.length} users with wallets)
              </Label>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Input
                placeholder="Amount (XLM)"
                value={bulkAmount}
                onChange={(e) => setBulkAmount(e.target.value)}
                className="w-40"
                type="number"
                min="0"
                step="0.01"
              />
              <Button
                onClick={sendBulkReward}
                disabled={selectedUsers.length === 0 || !bulkAmount}
              >
                <Send className="w-4 h-4 mr-2" />
                Send to Selected
              </Button>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">
                {selectedUsers.length} users selected • Total:{" "}
                {bulkAmount
                  ? (parseFloat(bulkAmount) * selectedUsers.length).toFixed(2)
                  : "0"}{" "}
                XLM
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users with Wallets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Users with Stellar Wallets ({usersWithWallet.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>User</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Last Reward</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersWithWallet.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) =>
                        handleSelectUser(user.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.email}</p>
                      {user.firstName && (
                        <p className="text-sm text-muted-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {user.walletAddress
                      ? `${user.walletAddress.slice(
                          0,
                          8
                        )}...${user.walletAddress.slice(-8)}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {user.lastRewardAmount ? (
                      <div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 w-fit"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {user.lastRewardAmount} XLM
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {user.lastRewardDate}
                        </p>
                      </div>
                    ) : (
                      <Badge variant="secondary">Never</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openIndividualDialog(user)}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send XLM
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Users without Wallets */}
      {usersWithoutWallet.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Users without Stellar Wallets ({usersWithoutWallet.length})
            </CardTitle>
            <CardDescription>
              These users need to provide wallet addresses before receiving XLM
              rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {usersWithoutWallet.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20"
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    {user.firstName && (
                      <p className="text-sm text-muted-foreground">
                        {user.firstName} {user.lastName}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-yellow-700 dark:text-yellow-300"
                  >
                    No Wallet
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Send Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send XLM to User</DialogTitle>
            <DialogDescription>
              Send Stellar Lumens to {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Recipient</Label>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedUser?.email}</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {selectedUser?.walletAddress}
                </p>
              </div>
            </div>
            <div>
              <Label htmlFor="amount">Amount (XLM)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={individualAmount}
                onChange={(e) => setIndividualAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendIndividualReward}>
              <Send className="w-4 h-4 mr-2" />
              Send XLM
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
