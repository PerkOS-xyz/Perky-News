import { NextRequest, NextResponse } from 'next/server';
import { getServerClient, Subscriber } from '@/lib/supabase';

type ExistingSubscriber = Pick<Subscriber, 'id' | 'confirmed'>;
type NewSubscriber = Pick<Subscriber, 'id' | 'confirmation_token'>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, preferences } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = getServerClient();

    // Check if already subscribed
    const { data: existingData } = await supabase
      .from('subscribers')
      .select('id, confirmed')
      .eq('email', email.toLowerCase())
      .single();

    const existing = existingData as ExistingSubscriber | null;

    if (existing) {
      if (existing.confirmed) {
        return NextResponse.json(
          { error: 'Already subscribed', code: 'ALREADY_SUBSCRIBED' },
          { status: 409 }
        );
      } else {
        // Resend confirmation
        return NextResponse.json({
          success: true,
          message: 'Confirmation email resent',
          needsConfirmation: true,
        });
      }
    }

    // Insert new subscriber
    const { data: subscriberData, error } = await supabase
      .from('subscribers')
      .insert({
        email: email.toLowerCase(),
        name: name || null,
        confirmed: false,
        is_premium: false,
        preferences: preferences || [],
      } as Record<string, unknown>)
      .select('id, confirmation_token')
      .single();

    const subscriber = subscriberData as NewSubscriber | null;

    if (error || !subscriber) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email via Resend
    // For now, auto-confirm in development
    if (process.env.NODE_ENV === 'development') {
      await supabase
        .from('subscribers')
        .update({ confirmed: true } as Record<string, unknown>)
        .eq('id', subscriber.id);
      
      return NextResponse.json({
        success: true,
        message: 'Subscribed successfully (auto-confirmed in dev)',
        needsConfirmation: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Please check your email to confirm subscription',
      needsConfirmation: true,
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
