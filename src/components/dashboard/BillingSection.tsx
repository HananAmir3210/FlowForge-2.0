// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Check, Loader2, CreditCard, Calendar, RefreshCw } from "lucide-react";
// import { useBilling } from "@/hooks/useBilling";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/hooks/useAuth";
// import { useAdminAuth } from "../../hooks/useAdminAuth";

// // // Stripe Price IDs - Replace with your actual Stripe price IDs
// const STRIPE_PRICES = {
//   Pro: "price_1QdyV0DKyUdKMlwO4P4iBbLy", // Replace with your actual Pro price ID
//   Team: "price_1QdyV0DKyUdKMlwO4P4iBbLz", // Replace with your actual Team price ID
// };

// const plans = [
//   {
//     name: "Free",
//     price: "$0",
//     period: "/month",
//     features: ["5 SOPs per month", "Basic workflows", "Email support"],
//     priceId: null,
//   },
//   {
//     name: "Pro",
//     price: "$29",
//     period: "/month",
//     features: [
//       "Unlimited SOPs",
//       "Advanced workflows",
//       "Priority support",
//       "Team collaboration",
//     ],
//     priceId: STRIPE_PRICES.Pro,
//   },
//   {
//     name: "Team",
//     price: "$99",
//     period: "/month",
//     features: [
//       "Everything in Pro",
//       "Admin controls",
//       "Advanced analytics",
//       "Custom integrations",
//     ],
//     priceId: STRIPE_PRICES.Team,
//   },
// ];

// const BillingSection = () => {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const {
//     billingData,
//     loading,
//     checkSubscription,
//     createCheckout,
//     openCustomerPortal,
//   } = useBilling();
//   const [invoices, setInvoices] = useState<any[]>([]);
//   const [loadingInvoices, setLoadingInvoices] = useState(false);

//   useEffect(() => {
//     loadInvoices();
//   }, [user]);

//   const loadInvoices = async () => {
//     if (!user) return;

//     try {
//       setLoadingInvoices(true);
//       const { data, error } = await supabase
//         .from("invoices")
//         .select("*")
//         .eq("user_id", user.id)
//         .order("invoice_date", { ascending: false })
//         .limit(5);

//       if (error) throw error;
//       setInvoices(data || []);
//     } catch (error: any) {
//       console.error("Error loading invoices:", error);
//     } finally {
//       setLoadingInvoices(false);
//     }
//   };

//   const handlePlanUpgrade = (planName: string, priceId: string | null) => {
//     if (!priceId) {
//       toast({
//         title: "Free Plan",
//         description: "You're already on the free plan!",
//       });
//       return;
//     }

//     createCheckout(planName, priceId);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const getCurrentPlanData = () => {
//     return plans.find((plan) => plan.name === billingData.plan) || plans[0];
//   };

//   const currentPlan = getCurrentPlanData();

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Billing & Subscription </h1>
//         <Button
//           variant="outline"
//           onClick={checkSubscription}
//           disabled={loading}
//           className="flex items-center gap-2"
//         >
//           <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//           Refresh Status
//         </Button>
//       </div>

//       {/* Current Plan */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Current Plan
//             {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-bold">{currentPlan.name} Plan</h3>
//               <p className="text-muted-foreground">
//                 {currentPlan.price}
//                 {currentPlan.period}
//                 {billingData.subscription_end && billingData.subscribed && (
//                   <span>
//                     {" "}
//                     • Renews on {formatDate(billingData.subscription_end)}
//                   </span>
//                 )}
//               </p>
//               <p className="text-sm text-muted-foreground mt-1">
//                 Status: <span className="capitalize">{billingData.status}</span>
//               </p>
//             </div>
//             <div className="flex flex-col items-end gap-2">
//               <Badge variant={billingData.subscribed ? "default" : "secondary"}>
//                 {billingData.subscribed ? "Active" : "Inactive"}
//               </Badge>
//               {billingData.subscribed && (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={openCustomerPortal}
//                   disabled={loading}
//                   className="flex items-center gap-2"
//                 >
//                   <CreditCard className="h-4 w-4" />
//                   Manage
//                 </Button>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Available Plans */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {plans.map((plan) => {
//             const isCurrent = plan.name === billingData.plan;
//             return (
//               <Card
//                 key={plan.name}
//                 className={isCurrent ? "border-primary" : ""}
//               >
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle>{plan.name}</CardTitle>
//                     {isCurrent && <Badge>Current</Badge>}
//                   </div>
//                   <div className="flex items-baseline">
//                     <span className="text-3xl font-bold">{plan.price}</span>
//                     <span className="text-muted-foreground">{plan.period}</span>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 mb-4">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-center gap-2">
//                         <Check className="h-4 w-4 text-green-500" />
//                         <span className="text-sm">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <Button
//                     variant={isCurrent ? "outline" : "default"}
//                     className="w-full"
//                     disabled={isCurrent || loading}
//                     onClick={() => handlePlanUpgrade(plan.name, plan.priceId)}
//                   >
//                     {loading && (
//                       <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                     )}
//                     {isCurrent ? "Current Plan" : "Upgrade"}
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>

//       {/* Payment Method - Only show if subscribed */}
//       {billingData.subscribed && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Payment Method</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
//                   CARD
//                 </div>
//                 <div>
//                   <p className="font-medium">
//                     {billingData.payment_method_last4
//                       ? `•••• •••• •••• ${billingData.payment_method_last4}`
//                       : "Payment method on file"}
//                   </p>
//                   {billingData.payment_method_expiry && (
//                     <p className="text-sm text-muted-foreground">
//                       Expires {billingData.payment_method_expiry}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={openCustomerPortal}
//                 disabled={loading}
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
//                 Update
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Invoice History */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Invoice History
//             {loadingInvoices && <Loader2 className="h-4 w-4 animate-spin" />}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {invoices.length === 0 ? (
//             <div className="text-center py-8 text-muted-foreground">
//               <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
//               <p>No invoices found</p>
//               <p className="text-sm">Your invoice history will appear here</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {invoices.map((invoice) => (
//                 <div
//                   key={invoice.id}
//                   className="flex items-center justify-between"
//                 >
//                   <div>
//                     <p className="font-medium">{invoice.invoice_number}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {formatDate(invoice.invoice_date)}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className="font-medium">
//                       ${(invoice.amount / 100).toFixed(2)}
//                     </span>
//                     <Badge variant="outline">{invoice.status}</Badge>
//                     {invoice.download_url && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() =>
//                           window.open(invoice.download_url, "_blank")
//                         }
//                       >
//                         Download
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BillingSection;

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Loader2,
  CreditCard,
  Calendar,
  RefreshCw,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  interval_count: number;
  trial_period_days: number | null;
  features: string[];
  is_active: boolean;
  is_popular: boolean;
  max_users: number | null;
  max_projects: number | null;
  storage: string | null;
  support: string;
}

interface UserSubscription {
  plan_name: string;
  status: string;
  subscription_end: string | null;
  payment_method_last4: string | null;
  payment_method_expiry: string | null;
  subscribed: boolean;
}

interface Invoice {
  id: string;
  invoice_number: string;
  invoice_date: string;
  amount: number;
  status: string;
  download_url: string | null;
}

const BillingSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    plan_name: "Free",
    status: "active",
    subscription_end: null,
    payment_method_last4: null,
    payment_method_expiry: null,
    subscribed: false,
  });
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    loadPlans();
    if (user) {
      loadUserSubscription();
      loadInvoices();
    }
  }, [user]);

  const loadPlans = async () => {
    try {
      setLoadingPlans(true);
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("is_active", true)
        .order("price", { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error: any) {
      console.error("Error loading plans:", error);
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive",
      });
    } finally {
      setLoadingPlans(false);
    }
  };

  const loadUserSubscription = async () => {
    if (!user) return;

    try {
      // This would be your actual subscription data query
      // Adjust the table name and structure according to your schema
      const { data, error } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "no rows returned"
        throw error;
      }

      if (data) {
        setUserSubscription({
          plan_name: data.plan_name || "Free",
          status: data.status || "active",
          subscription_end: data.subscription_end,
          payment_method_last4: data.payment_method_last4,
          payment_method_expiry: data.payment_method_expiry,
          subscribed: data.subscribed || false,
        });
      }
    } catch (error: any) {
      console.error("Error loading user subscription:", error);
    }
  };

  const loadInvoices = async () => {
    if (!user) return;

    try {
      setLoadingInvoices(true);
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id)
        .order("invoice_date", { ascending: false })
        .limit(5);

      if (error) throw error;
      setInvoices(data || []);
    } catch (error: any) {
      console.error("Error loading invoices:", error);
    } finally {
      setLoadingInvoices(false);
    }
  };

  const handlePlanUpgrade = async (plan: SubscriptionPlan) => {
    if (plan.name.toLowerCase() === "free") {
      toast({
        title: "Free Plan",
        description: "You're selecting the free plan!",
      });
      return;
    }

    try {
      setLoading(true);

      // Here you would implement your checkout logic
      // This could be Stripe checkout, or your own payment flow
      toast({
        title: "Redirecting to checkout...",
        description: `Upgrading to ${plan.name} plan`,
      });

      // Example: Call your checkout API endpoint
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ planId: plan.id, userId: user?.id })
      // });
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Error",
        description: "Failed to start checkout process",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    try {
      setLoading(true);

      // Here you would implement your customer portal logic
      toast({
        title: "Redirecting to customer portal...",
        description: "Opening billing management",
      });

      // Example: Call your customer portal API endpoint
      // const response = await fetch('/api/create-portal-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: user?.id })
      // });
    } catch (error: any) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Error",
        description: "Failed to open customer portal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshSubscriptionStatus = async () => {
    setLoading(true);
    await Promise.all([loadUserSubscription(), loadInvoices()]);
    setLoading(false);

    toast({
      title: "Status Updated",
      description: "Subscription status has been refreshed",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price / 100); // assuming price is in cents
  };

  const getCurrentPlan = () => {
    return (
      plans.find(
        (plan) =>
          plan.name.toLowerCase() === userSubscription.plan_name.toLowerCase()
      ) || { name: "Free", price: 0, currency: "usd", interval: "month" }
    );
  };

  const currentPlan = getCurrentPlan();

  if (loadingPlans) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <Button
          variant="outline"
          onClick={refreshSubscriptionStatus}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Status
        </Button>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Plan
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {userSubscription.plan_name} Plan
              </h3>
              <p className="text-muted-foreground">
                {currentPlan.name.toLowerCase() === "free"
                  ? "$0/month"
                  : `${formatPrice(currentPlan.price, currentPlan.currency)}/${
                      currentPlan.interval
                    }`}
                {userSubscription.subscription_end &&
                  userSubscription.subscribed && (
                    <span>
                      {" "}
                      • Renews on{" "}
                      {formatDate(userSubscription.subscription_end)}
                    </span>
                  )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Status:{" "}
                <span className="capitalize">{userSubscription.status}</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant={userSubscription.subscribed ? "default" : "secondary"}
              >
                {userSubscription.subscribed ? "Active" : "Inactive"}
              </Badge>
              {userSubscription.subscribed && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openCustomerPortal}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Manage
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent =
              plan.name.toLowerCase() ===
              userSubscription.plan_name.toLowerCase();
            return (
              <Card
                key={plan.id}
                className={`${isCurrent ? "border-primary" : ""} ${
                  plan.is_popular ? "ring-2 ring-primary" : ""
                } relative`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {plan.name}
                    </CardTitle>
                    {isCurrent && <Badge>Current</Badge>}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                    <span className="text-muted-foreground">
                      /
                      {plan.interval_count > 1 ? `${plan.interval_count} ` : ""}
                      {plan.interval}
                      {plan.interval_count > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.trial_period_days && !userSubscription.subscribed && (
                    <p className="text-sm text-blue-600 mb-3 font-medium">
                      {plan.trial_period_days} days free trial
                    </p>
                  )}

                  <Button
                    variant={
                      isCurrent
                        ? "outline"
                        : plan.is_popular
                        ? "default"
                        : "outline"
                    }
                    className={`w-full ${
                      plan.is_popular && !isCurrent
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }`}
                    disabled={isCurrent || loading}
                    onClick={() => handlePlanUpgrade(plan)}
                  >
                    {loading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    {isCurrent
                      ? "Current Plan"
                      : plan.name.toLowerCase() === "free"
                      ? "Downgrade"
                      : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Method - Only show if subscribed */}
      {userSubscription.subscribed && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  CARD
                </div>
                <div>
                  <p className="font-medium">
                    {userSubscription.payment_method_last4
                      ? `•••• •••• •••• ${userSubscription.payment_method_last4}`
                      : "Payment method on file"}
                  </p>
                  {userSubscription.payment_method_expiry && (
                    <p className="text-sm text-muted-foreground">
                      Expires {userSubscription.payment_method_expiry}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={openCustomerPortal}
                disabled={loading}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Invoice History
            {loadingInvoices && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No invoices found</p>
              <p className="text-sm">Your invoice history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(invoice.invoice_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      ${(invoice.amount / 100).toFixed(2)}
                    </span>
                    <Badge variant="outline">{invoice.status}</Badge>
                    {invoice.download_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(invoice.download_url, "_blank")
                        }
                      >
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSection;
