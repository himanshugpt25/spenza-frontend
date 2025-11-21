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


export interface WebhookEvent {
  id: string;
  subscriptionId: string;
  payload: any;
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";
  attemptCount: number;
  lastError?: string;
  responseStatus?: number;
  createdAt: string;
  updatedAt: string;
}
