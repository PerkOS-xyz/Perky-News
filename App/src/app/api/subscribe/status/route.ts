import { NextRequest, NextResponse } from 'next/server';
import { getServerClient, Subscriber } from '@/lib/supabase';

type SubscriberStatus = Pick<Subscriber, 'id' | 'email' | 'name' | 'confirmed' | 'is_premium' | 'premium_expires_at' | 'preferences' | 'subscribed_at'>;

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = getServerClient();

    const { data, error } = await supabase
      .from('subscribers')
      .select('id, email, name, confirmed, is_premium, premium_expires_at, preferences, subscribed_at')
      .eq('email', email.toLowerCase())
      .single();

    const subscriber = data as SubscriberStatus | null;

    if (error || !subscriber) {
      return NextResponse.json({
        subscribed: false,
        message: 'Not subscribed',
      });
    }

    // Check if premium is still valid
    const isPremiumActive = subscriber.is_premium && 
      (!subscriber.premium_expires_at || new Date(subscriber.premium_expires_at) > new Date());

    return NextResponse.json({
      subscribed: true,
      confirmed: subscriber.confirmed,
      isPremium: isPremiumActive,
      premiumExpiresAt: subscriber.premium_expires_at,
      preferences: subscriber.preferences,
      subscribedAt: subscriber.subscribed_at,
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
