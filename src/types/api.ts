// Shared API response types for frontend usage

export type SubscriptionResponse = {
  isSubscribed: boolean;
};

export type CheckoutResponse = {
  success: boolean;
  message?: string;
};
