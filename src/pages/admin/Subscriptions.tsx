"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Crown,
  Zap,
  Building,
  Loader2,
} from "lucide-react";
import { toast } from "sonner"; // You can use any toast library

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  interval_count: number;
  trial_period_days?: number;
  features: string[];
  is_active: boolean;
  is_popular: boolean;
  max_users?: number;
  max_projects?: number;
  storage?: string;
  support: "email" | "priority" | "dedicated";
  created_at: string;
  updated_at: string;
  subscriber_count: number;
  monthly_revenue?: number;
}

const AdminSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null
  );
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // const supabase = createClientComponentClient<Database>();

  // Fetch subscription plans
  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("subscription_plan_stats")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching plans:", error);
        toast.error("Failed to fetch subscription plans");
        return;
      }

      const formattedPlans: SubscriptionPlan[] = data.map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        interval: plan.interval,
        interval_count: 1,
        trial_period_days: undefined,
        features: Array.isArray(plan.features) ? plan.features : [],
        is_active: plan.is_active,
        is_popular: plan.is_popular,
        max_users: plan.max_users,
        max_projects: plan.max_projects,
        storage: plan.storage,
        support: plan.support as "email" | "priority" | "dedicated",
        created_at: plan.created_at,
        updated_at: plan.updated_at,
        subscriber_count: plan.subscriber_count || 0,
        monthly_revenue: plan.monthly_revenue || 0,
      }));

      setPlans(formattedPlans);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch subscription plans");
    } finally {
      setIsLoading(false);
    }
  };

  // Create new plan
  const createPlan = async (planData: Partial<SubscriptionPlan>) => {
    try {
      setIsSaving(true);
      const { data, error } = await supabase
        .from("subscription_plans")
        .insert([
          {
            name: planData.name!,
            description: planData.description!,
            price: planData.price!,
            currency: planData.currency || "usd",
            interval: planData.interval || "month",
            features: planData.features || [],
            is_active: planData.is_active ?? true,
            is_popular: planData.is_popular || false,
            max_users: planData.max_users,
            max_projects: planData.max_projects,
            storage: planData.storage,
            support: planData.support || "email",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating plan:", error);
        toast.error("Failed to create subscription plan");
        return;
      }

      toast.success("Subscription plan created successfully");
      await fetchPlans();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create subscription plan");
    } finally {
      setIsSaving(false);
    }
  };

  // Update existing plan
  const updatePlan = async (
    planId: string,
    planData: Partial<SubscriptionPlan>
  ) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("subscription_plans")
        .update({
          name: planData.name,
          description: planData.description,
          price: planData.price,
          currency: planData.currency,
          interval: planData.interval,
          features: planData.features,
          is_active: planData.is_active,
          is_popular: planData.is_popular,
          max_users: planData.max_users,
          max_projects: planData.max_projects,
          storage: planData.storage,
          support: planData.support,
        })
        .eq("id", planId);

      if (error) {
        console.error("Error updating plan:", error);
        toast.error("Failed to update subscription plan");
        return;
      }

      toast.success("Subscription plan updated successfully");
      await fetchPlans();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update subscription plan");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete plan
  const deletePlan = async (planId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this plan? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("subscription_plans")
        .delete()
        .eq("id", planId);

      if (error) {
        console.error("Error deleting plan:", error);
        toast.error("Failed to delete subscription plan");
        return;
      }

      toast.success("Subscription plan deleted successfully");
      await fetchPlans();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete subscription plan");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return <Zap className="h-4 w-4 text-gray-500" />;
      case "pro":
        return <Crown className="h-4 w-4 text-purple-500" />;
      case "team":
        return <Building className="h-4 w-4 text-blue-500" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatPrice = (price: number, currency: string, interval: string) => {
    if (price === 0) return "Free";
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price / 100);
    return `${formatted}/${interval}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? plan.is_active : !plan.is_active);
    return matchesSearch && matchesStatus;
  });

  const totalSubscribers = plans.reduce(
    (sum, plan) => sum + plan.subscriber_count,
    0
  );
  const totalRevenue = plans.reduce(
    (sum, plan) => sum + (plan.monthly_revenue || 0),
    0
  );

  const stats = [
    {
      title: "Total Plans",
      value: plans.length.toString(),
      icon: CreditCard,
      change: `${plans.filter((p) => p.is_active).length} active`,
    },
    {
      title: "Active Plans",
      value: plans.filter((p) => p.is_active).length.toString(),
      icon: Check,
      change: `${plans.filter((p) => !p.is_active).length} inactive`,
    },
    {
      title: "Total Subscribers",
      value: totalSubscribers.toString(),
      icon: Building,
      change: "All plans",
    },
    {
      title: "Monthly Revenue",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalRevenue / 100),
      icon: Crown,
      change: "Estimated",
    },
  ];

  const PlanForm = ({
    plan,
    onSave,
    onCancel,
  }: {
    plan?: SubscriptionPlan;
    onSave: (plan: Partial<SubscriptionPlan>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: plan?.name || "",
      description: plan?.description || "",
      price: plan?.price || 0,
      currency: plan?.currency || "usd",
      interval: plan?.interval || "month",
      features: plan?.features?.join("\n") || "",
      is_active: plan?.is_active ?? true,
      is_popular: plan?.is_popular || false,
      max_users: plan?.max_users || 1,
      max_projects: plan?.max_projects || 1,
      storage: plan?.storage || "",
      support: plan?.support || "email",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim()),
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price (cents)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number.parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="interval">Billing Interval</Label>
            <Select
              value={formData.interval}
              onValueChange={(value: "month" | "year") =>
                setFormData({ ...formData, interval: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) =>
                setFormData({ ...formData, currency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="maxUsers">Max Users (-1 for unlimited)</Label>
            <Input
              id="maxUsers"
              type="number"
              value={formData.max_users || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  max_users: e.target.value
                    ? Number.parseInt(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="maxProjects">Max Projects (-1 for unlimited)</Label>
            <Input
              id="maxProjects"
              type="number"
              value={formData.max_projects || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  max_projects: e.target.value
                    ? Number.parseInt(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="storage">Storage</Label>
            <Input
              id="storage"
              value={formData.storage}
              onChange={(e) =>
                setFormData({ ...formData, storage: e.target.value })
              }
              placeholder="e.g., 50GB"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="support">Support Level</Label>
          <Select
            value={formData.support}
            onValueChange={(value: "email" | "priority" | "dedicated") =>
              setFormData({ ...formData, support: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email Support</SelectItem>
              <SelectItem value="priority">Priority Support</SelectItem>
              <SelectItem value="dedicated">Dedicated Support</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="features">Features (one per line)</Label>
          <Textarea
            id="features"
            value={formData.features}
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value })
            }
            rows={6}
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          />
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
            />
            <Label htmlFor="is_active">Active Plan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_popular"
              checked={formData.is_popular}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_popular: checked })
              }
            />
            <Label htmlFor="is_popular">Popular Plan</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {plan ? "Update Plan" : "Create Plan"}
          </Button>
        </div>
      </form>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading subscription plans...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Subscription Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage subscription plans, pricing, and features.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Subscription Plan</DialogTitle>
              <DialogDescription>
                Add a new subscription plan with pricing and features.
              </DialogDescription>
            </DialogHeader>
            <PlanForm
              onSave={async (planData) => {
                await createPlan(planData);
                setIsCreateDialogOpen(false);
              }}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plans Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Plans</CardTitle>
              <CardDescription>
                Manage subscription plans and pricing
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Plans
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                    Inactive Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getPlanIcon(plan.name)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{plan.name}</span>
                          {plan.is_popular && (
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div
                          className="text-sm text-gray-500 max-w-48 truncate"
                          title={plan.description}
                        >
                          {plan.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatPrice(plan.price, plan.currency, plan.interval)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {plan.is_active ? (
                        <Eye className="h-4 w-4 text-green-500" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      )}
                      <Badge variant={plan.is_active ? "default" : "secondary"}>
                        {plan.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {plan.subscriber_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">subscribers</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{plan.features.length} features</div>
                      <div className="text-gray-500">
                        {plan.max_users === null ? "Unlimited" : plan.max_users}{" "}
                        users
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDate(plan.updated_at)}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedPlan(plan);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deletePlan(plan.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the subscription plan details and features.
            </DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <PlanForm
              plan={selectedPlan}
              onSave={async (planData) => {
                await updatePlan(selectedPlan.id, planData);
                setIsEditDialogOpen(false);
                setSelectedPlan(null);
              }}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedPlan(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubscriptions;
