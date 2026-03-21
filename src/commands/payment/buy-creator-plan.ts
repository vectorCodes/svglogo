import type { Currency } from "#/data/creator-plan";
import { createOrderFn } from "#/server/payment.create-order";
import { verifyPaymentFn } from "#/server/payment.verify";
import { getAuthStore } from "#/store/auth-store";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<void> {
  if (document.querySelector('script[src*="checkout.razorpay.com"]'))
    return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.head.appendChild(script);
  });
}

export async function buyCreatorPlan(currency: Currency): Promise<void> {
  const order = await createOrderFn({ data: { currency } });

  await loadRazorpayScript();

  const store = getAuthStore();
  const user = store.getState().user;

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "SVGLogo.dev",
      description: "Creator Plan — Lifetime",
      order_id: order.orderId,
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        try {
          await verifyPaymentFn({ data: response });

          if (user) {
            store.getState().setUser({ ...user, plan: "creator" });
          }

          window.location.href = "/editor?upgraded=1";
          resolve();
        } catch (err) {
          reject(err);
        }
      },
      prefill: {
        name: user?.fullName ?? "",
        email: user?.email ?? "",
      },
      theme: {
        color: "#6366f1",
      },
    });

    rzp.on("payment.failed", () => {
      reject(new Error("Payment failed"));
    });

    rzp.open();
  });
}
