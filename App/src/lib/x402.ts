// x402 Payment Integration with Stack Facilitator
// Docs: https://stack.perkos.xyz

export const X402_CONFIG = {
  facilitator: 'https://stack.perkos.xyz',
  recipient: process.env.NEXT_PUBLIC_X402_WALLET || 'WALLET_TBD',
  currency: 'USD',
};

export interface PaymentRequest {
  amount: string;
  currency: string;
  recipient: string;
  memo: string;
  metadata?: Record<string, string>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export async function createPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${X402_CONFIG.facilitator}/api/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, transactionId: data.transactionId };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Payment failed' 
    };
  }
}

export async function subscribePremium(email: string): Promise<PaymentResponse> {
  return createPayment({
    amount: '1.00',
    currency: X402_CONFIG.currency,
    recipient: X402_CONFIG.recipient,
    memo: 'Perky News Premium Subscription',
    metadata: {
      email,
      plan: 'premium-monthly',
      product: 'perky-news',
    },
  });
}

// Check if x402 payment is available (facilitator is reachable)
export async function checkX402Availability(): Promise<boolean> {
  try {
    const response = await fetch(`${X402_CONFIG.facilitator}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
