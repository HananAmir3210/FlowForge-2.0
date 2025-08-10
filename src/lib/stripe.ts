// lib/stripe.ts
import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export { stripePromise };

// types/purchase.ts
export interface Purchase {
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
  // Joined data
  plan_name?: string;
  plan_description?: string;
}
