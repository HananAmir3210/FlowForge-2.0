// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Users,
//   CreditCard,
//   DollarSign,
//   Activity,
//   TrendingUp,
//   TrendingDown,
//   MoreHorizontal,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Progress } from "@/components/ui/progress";

// const AdminDashboard = () => {
//   // Mock data - replace with real data from your API
//   const stats = [
//     {
//       title: "Total Users",
//       value: "2,847",
//       change: "+12.5%",
//       trend: "up",
//       icon: Users,
//     },
//     {
//       title: "Active Subscriptions",
//       value: "1,234",
//       change: "+8.2%",
//       trend: "up",
//       icon: CreditCard,
//     },
//     {
//       title: "Monthly Revenue",
//       value: "$45,231",
//       change: "+15.3%",
//       trend: "up",
//       icon: DollarSign,
//     },
//     {
//       title: "Conversion Rate",
//       value: "3.2%",
//       change: "-2.1%",
//       trend: "down",
//       icon: Activity,
//     },
//   ];

//   const recentUsers = [
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       status: "Active",
//       joinDate: "2024-01-15",
//       subscription: "Pro",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane@example.com",
//       status: "Active",
//       joinDate: "2024-01-14",
//       subscription: "Basic",
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       email: "mike@example.com",
//       status: "Inactive",
//       joinDate: "2024-01-13",
//       subscription: "Free",
//     },
//     {
//       id: 4,
//       name: "Sarah Wilson",
//       email: "sarah@example.com",
//       status: "Active",
//       joinDate: "2024-01-12",
//       subscription: "Pro",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           Dashboard
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-2">
//           Welcome back! Here's what's happening with your platform.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                 {stat.title}
//               </CardTitle>
//               <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {stat.value}
//               </div>
//               <div className="flex items-center space-x-1 text-sm">
//                 {stat.trend === "up" ? (
//                   <TrendingUp className="h-3 w-3 text-green-500" />
//                 ) : (
//                   <TrendingDown className="h-3 w-3 text-red-500" />
//                 )}
//                 <span
//                   className={
//                     stat.trend === "up" ? "text-green-500" : "text-red-500"
//                   }
//                 >
//                   {stat.change}
//                 </span>
//                 <span className="text-gray-500">from last month</span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Charts and Tables Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Revenue Overview</CardTitle>
//             <CardDescription>
//               Monthly revenue for the last 6 months
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">January</span>
//                 <span className="text-sm font-medium">$32,400</span>
//               </div>
//               <Progress value={65} className="h-2" />

//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">February</span>
//                 <span className="text-sm font-medium">$38,200</span>
//               </div>
//               <Progress value={76} className="h-2" />

//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600">March</span>
//                 <span className="text-sm font-medium">$45,231</span>
//               </div>
//               <Progress value={90} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Subscription Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Subscription Plans</CardTitle>
//             <CardDescription>
//               Distribution of active subscriptions
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                   <span className="text-sm">Pro Plan</span>
//                 </div>
//                 <span className="text-sm font-medium">45%</span>
//               </div>
//               <Progress value={45} className="h-2" />

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   <span className="text-sm">Basic Plan</span>
//                 </div>
//                 <span className="text-sm font-medium">35%</span>
//               </div>
//               <Progress value={35} className="h-2" />

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
//                   <span className="text-sm">Free Plan</span>
//                 </div>
//                 <span className="text-sm font-medium">20%</span>
//               </div>
//               <Progress value={20} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Users</CardTitle>
//           <CardDescription>Latest user registrations</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Subscription</TableHead>
//                 <TableHead>Join Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {recentUsers.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell className="font-medium">{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         user.status === "Active" ? "default" : "secondary"
//                       }
//                     >
//                       {user.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         user.subscription === "Pro"
//                           ? "default"
//                           : user.subscription === "Basic"
//                           ? "secondary"
//                           : "outline"
//                       }
//                     >
//                       {user.subscription}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{user.joinDate}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>View Details</DropdownMenuItem>
//                         <DropdownMenuItem>Edit User</DropdownMenuItem>
//                         <DropdownMenuItem className="text-red-600">
//                           Suspend User
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface User {
  id: string;
  full_name: string;
  email: string;
  company?: string;
  created_at: string;
  current_plan?: "Free" | "Pro" | "Team";
  subscription_status?: string;
}

interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalSOPs: number;
  conversionRate: number;
  userGrowth: number;
  subscriptionGrowth: number;
}

interface PlanDistribution {
  Free: number;
  Pro: number;
  Team: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalSOPs: 0,
    conversionRate: 0,
    userGrowth: 0,
    subscriptionGrowth: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [planDistribution, setPlanDistribution] = useState<PlanDistribution>({
    Free: 0,
    Pro: 0,
    Team: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profiles (excluding admins)
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("*")
        .neq("role", "admin")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch billing data
      const { data: billing, error: billingError } = await supabase
        .from("billing")
        .select("*");

      if (billingError) throw billingError;

      // Fetch SOPs count
      const { data: sops, error: sopsError } = await supabase
        .from("sops")
        .select("id");

      if (sopsError) throw sopsError;

      // Process the data
      const users = profiles || [];
      const billingData = billing || [];

      // Create a map of billing data by user_id
      const billingMap = new Map(billingData.map((b) => [b.user_id, b]));

      // Combine user profiles with billing data
      const usersWithBilling = users.map((user) => ({
        ...user,
        current_plan: billingMap.get(user.id)?.current_plan || "Free",
        subscription_status:
          billingMap.get(user.id)?.subscription_status || "inactive",
      }));

      // Calculate stats
      const totalUsers = users.length;
      const activeSubscriptions = billingData.filter(
        (b) => b.subscription_status === "active" && b.current_plan !== "Free"
      ).length;
      const totalSOPs = sops?.length || 0;

      // Calculate plan distribution
      const distribution = { Free: 0, Pro: 0, Team: 0 };
      usersWithBilling.forEach((user) => {
        const plan = user.current_plan || "Free";
        distribution[plan]++;
      });

      // Calculate conversion rate (paid users / total users)
      const conversionRate =
        totalUsers > 0 ? (activeSubscriptions / totalUsers) * 100 : 0;

      // For growth calculations, we'd need historical data
      // For now, using placeholder values
      const userGrowth = 12.5; // Would need to calculate from historical data
      const subscriptionGrowth = 8.2; // Would need to calculate from historical data

      setStats({
        totalUsers,
        activeSubscriptions,
        totalSOPs,
        conversionRate: Math.round(conversionRate * 10) / 10,
        userGrowth,
        subscriptionGrowth,
      });

      setPlanDistribution(distribution);
      setRecentUsers(usersWithBilling.slice(0, 5)); // Show last 5 users
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.userGrowth}%`,
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions.toLocaleString(),
      change: `+${stats.subscriptionGrowth}%`,
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Total SOPs",
      value: stats.totalSOPs.toLocaleString(),
      change: "+25.8%",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: stats.conversionRate > 3 ? "+2.1%" : "-1.2%",
      trend: stats.conversionRate > 3 ? "up" : "down",
      icon: Activity,
    },
  ];

  const totalUsers = stats.totalUsers;
  const freePercentage = calculatePercentage(planDistribution.Free, totalUsers);
  const proPercentage = calculatePercentage(planDistribution.Pro, totalUsers);
  const teamPercentage = calculatePercentage(planDistribution.Team, totalUsers);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
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
              <div className="flex items-center space-x-1 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              User registration growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="text-sm font-medium">{stats.totalUsers}</span>
              </div>
              <Progress
                value={Math.min((stats.totalUsers / 100) * 10, 100)}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Active Subscriptions
                </span>
                <span className="text-sm font-medium">
                  {stats.activeSubscriptions}
                </span>
              </div>
              <Progress
                value={Math.min((stats.activeSubscriptions / 50) * 10, 100)}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total SOPs</span>
                <span className="text-sm font-medium">{stats.totalSOPs}</span>
              </div>
              <Progress
                value={Math.min((stats.totalSOPs / 200) * 10, 100)}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Distribution of user subscription plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">
                    Pro Plan ({planDistribution.Pro})
                  </span>
                </div>
                <span className="text-sm font-medium">{proPercentage}%</span>
              </div>
              <Progress value={proPercentage} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">
                    Team Plan ({planDistribution.Team})
                  </span>
                </div>
                <span className="text-sm font-medium">{teamPercentage}%</span>
              </div>
              <Progress value={teamPercentage} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm">
                    Free Plan ({planDistribution.Free})
                  </span>
                </div>
                <span className="text-sm font-medium">{freePercentage}%</span>
              </div>
              <Progress value={freePercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>Latest user registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          {getInitials(user.full_name || "U")}
                        </div>
                        <span>{user.full_name || "Unknown User"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.subscription_status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {user.subscription_status === "active"
                          ? "Active"
                          : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.current_plan === "Pro"
                            ? "default"
                            : user.current_plan === "Team"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {user.current_plan || "Free"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
