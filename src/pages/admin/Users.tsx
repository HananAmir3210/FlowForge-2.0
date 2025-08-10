// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   UsersIcon,
//   Search,
//   Filter,
//   MoreHorizontal,
//   UserPlus,
//   Mail,
//   Phone,
//   Calendar,
//   CreditCard,
//   Ban,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   status: "active" | "inactive" | "suspended";
//   subscription: "free" | "basic" | "pro" | "enterprise";
//   stripeCustomerId: string;
//   joinDate: string;
//   lastLogin: string;
//   totalSpent: number;
//   phone?: string;
//   location: string;
// }

// const AdminUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   // Mock data - replace with real API data
//   const users: User[] = [
//     {
//       id: "1",
//       name: "John Doe",
//       email: "john.doe@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//       status: "active",
//       subscription: "pro",
//       stripeCustomerId: "cus_1234567890",
//       joinDate: "2024-01-15",
//       lastLogin: "2024-01-27",
//       totalSpent: 299.99,
//       phone: "+1 (555) 123-4567",
//       location: "New York, USA",
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//       status: "active",
//       subscription: "basic",
//       stripeCustomerId: "cus_0987654321",
//       joinDate: "2024-01-14",
//       lastLogin: "2024-01-26",
//       totalSpent: 99.99,
//       phone: "+1 (555) 987-6543",
//       location: "Los Angeles, USA",
//     },
//     {
//       id: "3",
//       name: "Mike Johnson",
//       email: "mike.johnson@example.com",
//       status: "inactive",
//       subscription: "free",
//       stripeCustomerId: "cus_1122334455",
//       joinDate: "2024-01-13",
//       lastLogin: "2024-01-20",
//       totalSpent: 0,
//       location: "Chicago, USA",
//     },
//     {
//       id: "4",
//       name: "Sarah Wilson",
//       email: "sarah.wilson@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//       status: "active",
//       subscription: "enterprise",
//       stripeCustomerId: "cus_5566778899",
//       joinDate: "2024-01-12",
//       lastLogin: "2024-01-27",
//       totalSpent: 999.99,
//       phone: "+1 (555) 456-7890",
//       location: "San Francisco, USA",
//     },
//     {
//       id: "5",
//       name: "David Brown",
//       email: "david.brown@example.com",
//       status: "suspended",
//       subscription: "basic",
//       stripeCustomerId: "cus_9988776655",
//       joinDate: "2024-01-10",
//       lastLogin: "2024-01-25",
//       totalSpent: 149.99,
//       location: "Miami, USA",
//     },
//   ];

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "active":
//         return <CheckCircle className="h-4 w-4 text-green-500" />;
//       case "inactive":
//         return <XCircle className="h-4 w-4 text-gray-500" />;
//       case "suspended":
//         return <Ban className="h-4 w-4 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   const getSubscriptionColor = (subscription: string) => {
//     switch (subscription) {
//       case "enterprise":
//         return "default";
//       case "pro":
//         return "secondary";
//       case "basic":
//         return "outline";
//       case "free":
//         return "outline";
//       default:
//         return "outline";
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || user.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const stats = [
//     {
//       title: "Total Users",
//       value: users.length.toString(),
//       icon: UsersIcon,
//       change: "+12.5%",
//     },
//     {
//       title: "Active Users",
//       value: users.filter((u) => u.status === "active").length.toString(),
//       icon: CheckCircle,
//       change: "+8.2%",
//     },
//     {
//       title: "Suspended Users",
//       value: users.filter((u) => u.status === "suspended").length.toString(),
//       icon: Ban,
//       change: "-2.1%",
//     },
//     {
//       title: "Total Revenue",
//       value: `$${users
//         .reduce((sum, user) => sum + user.totalSpent, 0)
//         .toFixed(2)}`,
//       icon: CreditCard,
//       change: "+15.3%",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Users Management
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Manage user accounts, subscriptions, and access permissions.
//           </p>
//         </div>
//         <Button>
//           <UserPlus className="h-4 w-4 mr-2" />
//           Add User
//         </Button>
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
//               <p className="text-xs text-green-500 mt-1">
//                 {stat.change} from last month
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Filters and Search */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>All Users</CardTitle>
//               <CardDescription>
//                 Manage and monitor user accounts
//               </CardDescription>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64"
//                 />
//               </div>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline">
//                     <Filter className="h-4 w-4 mr-2" />
//                     Filter
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                     All Status
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("active")}>
//                     Active
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
//                     Inactive
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setStatusFilter("suspended")}
//                   >
//                     Suspended
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Subscription</TableHead>
//                 <TableHead>Stripe ID</TableHead>
//                 <TableHead>Total Spent</TableHead>
//                 <TableHead>Last Login</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredUsers.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <Avatar className="h-8 w-8">
//                         <AvatarImage
//                           src={user.avatar || "/placeholder.svg"}
//                           alt={user.name}
//                         />
//                         <AvatarFallback>
//                           {user.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <div className="font-medium">{user.name}</div>
//                         <div className="text-sm text-gray-500 flex items-center">
//                           <Mail className="h-3 w-3 mr-1" />
//                           {user.email}
//                         </div>
//                         {user.phone && (
//                           <div className="text-sm text-gray-500 flex items-center">
//                             <Phone className="h-3 w-3 mr-1" />
//                             {user.phone}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(user.status)}
//                       <Badge
//                         variant={
//                           user.status === "active"
//                             ? "default"
//                             : user.status === "suspended"
//                             ? "destructive"
//                             : "secondary"
//                         }
//                       >
//                         {user.status}
//                       </Badge>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={getSubscriptionColor(user.subscription)}>
//                       {user.subscription}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
//                       {user.stripeCustomerId}
//                     </code>
//                   </TableCell>
//                   <TableCell>
//                     <span className="font-medium">
//                       ${user.totalSpent.toFixed(2)}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Calendar className="h-3 w-3 mr-1" />
//                       {user.lastLogin}
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>View Profile</DropdownMenuItem>
//                         <DropdownMenuItem>Edit User</DropdownMenuItem>
//                         <DropdownMenuItem>
//                           View Stripe Customer
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>Reset Password</DropdownMenuItem>
//                         <DropdownMenuItem className="text-red-600">
//                           {user.status === "suspended"
//                             ? "Unsuspend User"
//                             : "Suspend User"}
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

// export default AdminUsers;

"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  UsersIcon,
  Search,
  Mail,
  Calendar,
  CreditCard,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface User {
  id: string;
  full_name: string;
  email: string;
  company?: string;
  created_at: string;
  subscription_plan?: "Free" | "Pro" | "Team";
  subscription_status?: string;
  stripe_customer_id?: string;
}

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profiles (excluding admins)
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("*")
        .neq("role", "admin") // Exclude admin users
        .order("created_at", { ascending: false });

      if (profilesError) {
        throw profilesError;
      }

      // Fetch billing information
      const { data: billing, error: billingError } = await supabase
        .from("billing")
        .select("*");

      if (billingError) {
        console.warn("Error fetching billing data:", billingError);
      }

      // Combine the data
      const transformedUsers: User[] =
        profiles?.map((profile) => {
          const userBilling = billing?.find((b) => b.user_id === profile.id);

          return {
            id: profile.id,
            full_name: profile.full_name || "No Name",
            email: profile.email || "No Email",
            company: profile.company,
            created_at: profile.created_at || "",
            subscription_plan: userBilling?.current_plan || "Free",
            subscription_status: userBilling?.subscription_status,
            stripe_customer_id: userBilling?.stripe_customer_id,
          };
        }) || [];

      setUsers(transformedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "Team":
        return "default";
      case "Pro":
        return "secondary";
      case "Free":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company &&
        user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: UsersIcon,
    },
    {
      title: "Pro Subscribers",
      value: users
        .filter((u) => u.subscription_plan === "Pro")
        .length.toString(),
      icon: CreditCard,
    },
    {
      title: "Team Subscribers",
      value: users
        .filter((u) => u.subscription_plan === "Team")
        .length.toString(),
      icon: UsersIcon,
    },
    {
      title: "Free Users",
      value: users
        .filter((u) => u.subscription_plan === "Free")
        .length.toString(),
      icon: UsersIcon,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={fetchUsers}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and monitor user accounts and subscriptions.
          </p>
        </div>
        <Button onClick={fetchUsers}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                View user accounts and subscription details
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Stripe ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {searchTerm
                      ? "No users found matching your criteria"
                      : "No users found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.full_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.full_name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getSubscriptionColor(
                          user.subscription_plan || "Free"
                        )}
                      >
                        {user.subscription_plan || "Free"}
                      </Badge>
                      {user.subscription_status && (
                        <div className="text-xs text-gray-500 mt-1">
                          {user.subscription_status}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.stripe_customer_id ? (
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {user.stripe_customer_id}
                        </code>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No Stripe ID
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {user.company || "No Company"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(user.created_at)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
