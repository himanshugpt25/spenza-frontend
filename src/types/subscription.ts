export type Subscription = {
  id: string;
  name: string;
  description?: string;
  targetUrl: string;
  isActive: boolean;
  createdAt: string;
};

export type CreateSubscriptionPayload = {
  name: string;
  description?: string;
  targetUrl: string;
  isActive: boolean;
};


