import { NextRequest, NextResponse } from 'next/server';
import { getServerClient, Subscriber } from '@/lib/supabase';

type SubscriberConfirmFields = Pick<Subscriber, 'id' | 'email' | 'confirmed'>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Confirmation token is required' },
        { status: 400 }
      );
    }

    const supabase = getServerClient();

    // Find subscriber by confirmation token
    const { data, error: findError } = await supabase
      .from('subscribers')
      .select('id, email, confirmed')
      .eq('confirmation_token', token)
      .single();

    const subscriber = data as SubscriberConfirmFields | null;

    if (findError || !subscriber) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token' },
        { status: 404 }
      );
    }

    if (subscriber.confirmed) {
      return NextResponse.json({
        success: true,
        message: 'Email already confirmed',
        alreadyConfirmed: true,
      });
    }

    // Confirm the subscriber
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({ confirmed: true } as Record<string, unknown>)
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Confirmation update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to confirm subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription confirmed! Welcome to Perky News 🐧',
      email: subscriber.email,
    });

  } catch (error) {
    console.error('Confirm error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also support GET for email link clicks
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/subscribe?error=missing_token', request.url));
  }

  const supabase = getServerClient();

  // Find and confirm subscriber
  const { data, error: findError } = await supabase
    .from('subscribers')
    .select('id, confirmed')
    .eq('confirmation_token', token)
    .single();

  const subscriber = data as Pick<Subscriber, 'id' | 'confirmed'> | null;

  if (findError || !subscriber) {
    return NextResponse.redirect(new URL('/subscribe?error=invalid_token', request.url));
  }

  if (!subscriber.confirmed) {
    await supabase
      .from('subscribers')
      .update({ confirmed: true } as Record<string, unknown>)
      .eq('id', subscriber.id);
  }

  return NextResponse.redirect(new URL('/subscribe?confirmed=true', request.url));
}
