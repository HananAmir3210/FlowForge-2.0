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
//   Receipt,
//   Search,
//   Filter,
//   MoreHorizontal,
//   Download,
//   DollarSign,
//   CreditCard,
//   CheckCircle,
//   XCircle,
//   Clock,
//   RefreshCw,
// } from "lucide-react";

// interface Transaction {
//   id: string;
//   stripePaymentIntentId: string;
//   stripeChargeId: string;
//   customerId: string;
//   customerName: string;
//   customerEmail: string;
//   customerAvatar?: string;
//   amount: number;
//   currency: string;
//   status: "succeeded" | "pending" | "failed" | "canceled" | "refunded";
//   paymentMethod:
//     | "card"
//     | "bank_transfer"
//     | "paypal"
//     | "apple_pay"
//     | "google_pay";
//   cardBrand?: "visa" | "mastercard" | "amex" | "discover";
//   cardLast4?: string;
//   description: string;
//   subscriptionId?: string;
//   invoiceId?: string;
//   createdAt: string;
//   refundedAmount?: number;
//   feeAmount: number;
//   netAmount: number;
// }

// const AdminTransactions = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [dateFilter, setDateFilter] = useState<string>("all");

//   // Mock data - replace with real Stripe API data
//   const transactions: Transaction[] = [
//     {
//       id: "1",
//       stripePaymentIntentId: "pi_1234567890",
//       stripeChargeId: "ch_1234567890",
//       customerId: "cus_1234567890",
//       customerName: "John Doe",
//       customerEmail: "john.doe@example.com",
//       customerAvatar: "/placeholder.svg?height=40&width=40",
//       amount: 2999,
//       currency: "usd",
//       status: "succeeded",
//       paymentMethod: "card",
//       cardBrand: "visa",
//       cardLast4: "4242",
//       description: "Pro Plan - Monthly Subscription",
//       subscriptionId: "sub_1234567890",
//       invoiceId: "in_1234567890",
//       createdAt: "2024-01-27T10:30:00Z",
//       feeAmount: 117,
//       netAmount: 2882,
//     },
//     {
//       id: "2",
//       stripePaymentIntentId: "pi_0987654321",
//       stripeChargeId: "ch_0987654321",
//       customerId: "cus_0987654321",
//       customerName: "Jane Smith",
//       customerEmail: "jane.smith@example.com",
//       customerAvatar: "/placeholder.svg?height=40&width=40",
//       amount: 999,
//       currency: "usd",
//       status: "succeeded",
//       paymentMethod: "card",
//       cardBrand: "mastercard",
//       cardLast4: "5555",
//       description: "Basic Plan - Monthly Subscription",
//       subscriptionId: "sub_0987654321",
//       invoiceId: "in_0987654321",
//       createdAt: "2024-01-26T14:15:00Z",
//       feeAmount: 59,
//       netAmount: 940,
//     },
//     {
//       id: "3",
//       stripePaymentIntentId: "pi_1122334455",
//       stripeChargeId: "ch_1122334455",
//       customerId: "cus_1122334455",
//       customerName: "Mike Johnson",
//       customerEmail: "mike.johnson@example.com",
//       amount: 999,
//       currency: "usd",
//       status: "failed",
//       paymentMethod: "card",
//       cardBrand: "visa",
//       cardLast4: "0002",
//       description: "Basic Plan - Monthly Subscription",
//       subscriptionId: "sub_1122334455",
//       createdAt: "2024-01-25T09:45:00Z",
//       feeAmount: 0,
//       netAmount: 0,
//     },
//     {
//       id: "4",
//       stripePaymentIntentId: "pi_5566778899",
//       stripeChargeId: "ch_5566778899",
//       customerId: "cus_5566778899",
//       customerName: "Sarah Wilson",
//       customerEmail: "sarah.wilson@example.com",
//       customerAvatar: "/placeholder.svg?height=40&width=40",
//       amount: 9999,
//       currency: "usd",
//       status: "succeeded",
//       paymentMethod: "card",
//       cardBrand: "amex",
//       cardLast4: "1005",
//       description: "Enterprise Plan - Annual Subscription",
//       subscriptionId: "sub_5566778899",
//       invoiceId: "in_5566778899",
//       createdAt: "2024-01-24T16:20:00Z",
//       feeAmount: 319,
//       netAmount: 9680,
//     },
//     {
//       id: "5",
//       stripePaymentIntentId: "pi_9988776655",
//       stripeChargeId: "ch_9988776655",
//       customerId: "cus_9988776655",
//       customerName: "David Brown",
//       customerEmail: "david.brown@example.com",
//       amount: 2999,
//       currency: "usd",
//       status: "refunded",
//       paymentMethod: "card",
//       cardBrand: "visa",
//       cardLast4: "4444",
//       description: "Pro Plan - Monthly Subscription",
//       subscriptionId: "sub_9988776655",
//       invoiceId: "in_9988776655",
//       createdAt: "2024-01-23T11:10:00Z",
//       refundedAmount: 2999,
//       feeAmount: 117,
//       netAmount: -117,
//     },
//     {
//       id: "6",
//       stripePaymentIntentId: "pi_1111222233",
//       stripeChargeId: "ch_1111222233",
//       customerId: "cus_1111222233",
//       customerName: "Alice Cooper",
//       customerEmail: "alice.cooper@example.com",
//       amount: 4999,
//       currency: "usd",
//       status: "pending",
//       paymentMethod: "bank_transfer",
//       description: "Custom Plan - One-time Payment",
//       createdAt: "2024-01-22T13:30:00Z",
//       feeAmount: 0,
//       netAmount: 4999,
//     },
//   ];

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "succeeded":
//         return <CheckCircle className="h-4 w-4 text-green-500" />;
//       case "pending":
//         return <Clock className="h-4 w-4 text-yellow-500" />;
//       case "failed":
//         return <XCircle className="h-4 w-4 text-red-500" />;
//       case "canceled":
//         return <XCircle className="h-4 w-4 text-gray-500" />;
//       case "refunded":
//         return <RefreshCw className="h-4 w-4 text-blue-500" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "succeeded":
//         return "default";
//       case "pending":
//         return "warning";
//       case "failed":
//         return "destructive";
//       case "canceled":
//         return "secondary";
//       case "refunded":
//         return "outline";
//       default:
//         return "secondary";
//     }
//   };

//   const getPaymentMethodIcon = (method: string, brand?: string) => {
//     if (method === "card") {
//       return <CreditCard className="h-4 w-4" />;
//     }
//     return <CreditCard className="h-4 w-4" />;
//   };

//   const formatAmount = (amount: number, currency: string) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: currency.toUpperCase(),
//     }).format(amount / 100);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const filteredTransactions = transactions.filter((transaction) => {
//     const matchesSearch =
//       transaction.customerName
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       transaction.customerEmail
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       transaction.stripePaymentIntentId
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || transaction.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const stats = [
//     {
//       title: "Total Transactions",
//       value: transactions.length.toString(),
//       icon: Receipt,
//       change: "+12.5%",
//     },
//     {
//       title: "Successful Payments",
//       value: transactions
//         .filter((t) => t.status === "succeeded")
//         .length.toString(),
//       icon: CheckCircle,
//       change: "+8.2%",
//     },
//     {
//       title: "Total Revenue",
//       value: formatAmount(
//         transactions
//           .filter((t) => t.status === "succeeded")
//           .reduce((sum, t) => sum + t.amount, 0),
//         "usd"
//       ),
//       icon: DollarSign,
//       change: "+15.3%",
//     },
//     {
//       title: "Failed Payments",
//       value: transactions
//         .filter((t) => t.status === "failed")
//         .length.toString(),
//       icon: XCircle,
//       change: "-2.1%",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Transactions
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Monitor payments, refunds, and transaction history from Stripe.
//           </p>
//         </div>
//         <Button>
//           <Download className="h-4 w-4 mr-2" />
//           Export Data
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

//       {/* Revenue Chart */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Payment Methods</CardTitle>
//             <CardDescription>
//               Distribution of payment methods used
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {["card", "bank_transfer", "paypal", "apple_pay"].map(
//                 (method) => {
//                   const count = transactions.filter(
//                     (t) => t.paymentMethod === method
//                   ).length;
//                   const percentage = (count / transactions.length) * 100;
//                   return (
//                     <div
//                       key={method}
//                       className="flex items-center justify-between"
//                     >
//                       <div className="flex items-center space-x-2">
//                         {getPaymentMethodIcon(method)}
//                         <span className="text-sm capitalize">
//                           {method.replace("_", " ")}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-sm font-medium">{count}</span>
//                         <span className="text-sm text-gray-500">
//                           ({percentage.toFixed(1)}%)
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Transaction Status</CardTitle>
//             <CardDescription>Breakdown of transaction statuses</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {["succeeded", "pending", "failed", "refunded"].map((status) => {
//                 const count = transactions.filter(
//                   (t) => t.status === status
//                 ).length;
//                 const percentage = (count / transactions.length) * 100;
//                 return (
//                   <div
//                     key={status}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(status)}
//                       <span className="text-sm capitalize">{status}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm font-medium">{count}</span>
//                       <span className="text-sm text-gray-500">
//                         ({percentage.toFixed(1)}%)
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Transactions Table */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>All Transactions</CardTitle>
//               <CardDescription>
//                 Complete transaction history and payment details
//               </CardDescription>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   placeholder="Search transactions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64"
//                 />
//               </div>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline">
//                     <Filter className="h-4 w-4 mr-2" />
//                     Status
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem onClick={() => setStatusFilter("all")}>
//                     All Status
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setStatusFilter("succeeded")}
//                   >
//                     Succeeded
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
//                     Pending
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
//                     Failed
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setStatusFilter("refunded")}>
//                     Refunded
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
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Payment Method</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Stripe ID</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredTransactions.map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <Avatar className="h-8 w-8">
//                         <AvatarImage
//                           src={transaction.customerAvatar || "/placeholder.svg"}
//                           alt={transaction.customerName}
//                         />
//                         <AvatarFallback>
//                           {transaction.customerName
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <div className="font-medium">
//                           {transaction.customerName}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {transaction.customerEmail}
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="font-medium">
//                       {formatAmount(transaction.amount, transaction.currency)}
//                     </div>
//                     {transaction.refundedAmount && (
//                       <div className="text-sm text-red-500">
//                         Refunded:{" "}
//                         {formatAmount(
//                           transaction.refundedAmount,
//                           transaction.currency
//                         )}
//                       </div>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       {getStatusIcon(transaction.status)}
//                       <Badge variant={getStatusColor(transaction.status)}>
//                         {transaction.status}
//                       </Badge>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       {getPaymentMethodIcon(
//                         transaction.paymentMethod,
//                         transaction.cardBrand
//                       )}
//                       <div>
//                         <div className="text-sm capitalize">
//                           {transaction.paymentMethod.replace("_", " ")}
//                         </div>
//                         {transaction.cardBrand && transaction.cardLast4 && (
//                           <div className="text-xs text-gray-500">
//                             {transaction.cardBrand.toUpperCase()} ••••{" "}
//                             {transaction.cardLast4}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div
//                       className="max-w-48 truncate"
//                       title={transaction.description}
//                     >
//                       {transaction.description}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-sm">
//                       {formatDate(transaction.createdAt)}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
//                       {transaction.stripePaymentIntentId}
//                     </code>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>View in Stripe</DropdownMenuItem>
//                         <DropdownMenuItem>View Invoice</DropdownMenuItem>
//                         <DropdownMenuItem>Send Receipt</DropdownMenuItem>
//                         {transaction.status === "succeeded" && (
//                           <DropdownMenuItem className="text-red-600">
//                             Issue Refund
//                           </DropdownMenuItem>
//                         )}
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

// export default AdminTransactions;

// --------------  with real data --------------
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Receipt,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Purchase {
  id: string;
  user_id?: string;
  plan_id: string;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  customer_email: string;
  customer_name?: string;
  created_at: string;
  updated_at: string;
  // Joined data from subscription_plans
  plan_name?: string;
  plan_description?: string;
}

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch purchases from Supabase
  const fetchPurchases = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("purchases")
        .select(
          `
          *,
          subscription_plans!inner(
            name,
            description
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching purchases:", error);
        toast.error("Failed to fetch transactions");
        return;
      }

      const formattedPurchases: Purchase[] = data.map((purchase) => ({
        ...purchase,
        plan_name: purchase.subscription_plans?.name,
        plan_description: purchase.subscription_plans?.description,
      }));

      setPurchases(formattedPurchases);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "refunded":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      case "refunded":
        return "outline";
      default:
        return "secondary";
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Export transactions to CSV
  const exportTransactions = () => {
    const csvContent = [
      // Headers
      "Date,Customer Email,Customer Name,Plan,Amount,Currency,Status,Stripe Payment ID",
      // Data
      ...filteredTransactions.map(
        (p) =>
          `${p.created_at},${p.customer_email},${p.customer_name || ""},${
            p.plan_name
          },${p.amount / 100},${p.currency.toUpperCase()},${p.status},${
            p.stripe_payment_intent_id || ""
          }`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success("Transactions exported successfully");
  };

  const filteredTransactions = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.customer_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchase.customer_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchase.stripe_payment_intent_id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      purchase.plan_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || purchase.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats from real data
  const completedPurchases = purchases.filter((p) => p.status === "completed");
  const totalRevenue = completedPurchases.reduce((sum, p) => sum + p.amount, 0);
  const failedPurchases = purchases.filter((p) => p.status === "failed");
  const pendingPurchases = purchases.filter((p) => p.status === "pending");

  const stats = [
    {
      title: "Total Transactions",
      value: purchases.length.toString(),
      icon: Receipt,
      change: `${purchases.length} total`,
    },
    {
      title: "Successful Payments",
      value: completedPurchases.length.toString(),
      icon: CheckCircle,
      change: `${(
        (completedPurchases.length / (purchases.length || 1)) *
        100
      ).toFixed(1)}% success rate`,
    },
    {
      title: "Total Revenue",
      value: formatAmount(totalRevenue, "usd"),
      icon: DollarSign,
      change: "From completed sales",
    },
    {
      title: "Failed Payments",
      value: failedPurchases.length.toString(),
      icon: XCircle,
      change: `${pendingPurchases.length} pending`,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading transactions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor payments, refunds, and transaction history from Stripe.
          </p>
        </div>
        <Button onClick={exportTransactions}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
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
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts - Only show if we have data */}
      {purchases.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plans Performance</CardTitle>
              <CardDescription>
                Revenue breakdown by subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Group purchases by plan and show revenue */}
                {Object.entries(
                  purchases
                    .filter((p) => p.status === "completed")
                    .reduce((acc, p) => {
                      const planName = p.plan_name || "Unknown";
                      if (!acc[planName]) {
                        acc[planName] = { count: 0, revenue: 0 };
                      }
                      acc[planName].count++;
                      acc[planName].revenue += p.amount;
                      return acc;
                    }, {} as Record<string, { count: number; revenue: number }>)
                ).map(([planName, data]) => (
                  <div
                    key={planName}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm">{planName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {formatAmount(data.revenue, "usd")}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({data.count} sales)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Status</CardTitle>
              <CardDescription>
                Breakdown of transaction statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["completed", "pending", "failed", "refunded"].map(
                  (status) => {
                    const count = purchases.filter(
                      (t) => t.status === status
                    ).length;
                    const percentage =
                      purchases.length > 0
                        ? (count / purchases.length) * 100
                        : 0;
                    return (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(status)}
                          <span className="text-sm capitalize">{status}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{count}</span>
                          <span className="text-sm text-gray-500">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                Complete transaction history and payment details
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
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
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
                    Failed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("refunded")}>
                    Refunded
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-500">
                Transactions will appear here once customers start purchasing
                plans.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Stripe ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {purchase.customer_name
                              ? purchase.customer_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : purchase.customer_email
                                  .substring(0, 2)
                                  .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {purchase.customer_name || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {purchase.customer_email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{purchase.plan_name}</div>
                        <div className="text-sm text-gray-500 max-w-48 truncate">
                          {purchase.plan_description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatAmount(purchase.amount, purchase.currency)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(purchase.status)}
                        <Badge variant={getStatusColor(purchase.status)}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(purchase.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {purchase.stripe_payment_intent_id ? (
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {purchase.stripe_payment_intent_id.substring(0, 15)}
                          ...
                        </code>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {purchase.stripe_payment_intent_id && (
                            <DropdownMenuItem
                              onClick={() => {
                                window.open(
                                  `https://dashboard.stripe.com/payments/${purchase.stripe_payment_intent_id}`,
                                  "_blank"
                                );
                              }}
                            >
                              View in Stripe
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                          {purchase.status === "completed" && (
                            <DropdownMenuItem className="text-red-600">
                              Issue Refund
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
