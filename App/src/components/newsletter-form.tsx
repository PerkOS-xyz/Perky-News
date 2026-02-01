'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  variant?: 'inline' | 'full' | 'hero';
}

interface SubscribeResponse {
  success?: boolean;
  error?: string;
  message?: string;
  needsConfirmation?: boolean;
  code?: string;
}

export function NewsletterForm({ variant = 'inline' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
        }),
      });

      const data: SubscribeResponse = await response.json();

      if (!response.ok) {
        if (data.code === 'ALREADY_SUBSCRIBED') {
          setStatus('success');
          setMessage('You\'re already subscribed! Check your inbox for updates.');
        } else {
          setStatus('error');
          setMessage(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setStatus('success');
      setMessage(data.message || 'You\'re subscribed!');
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Subscribe error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-[#EB1B69]/10 border border-[#EB1B69]/30 text-center">
        <span className="text-3xl mb-3 block">🎉</span>
        <p 
          className="text-[#EB1B69] font-semibold"
          style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        >
          {message}
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-[#EF5B57]/10 border border-[#EF5B57]/30 text-center">
          <span className="text-3xl mb-3 block">😕</span>
          <p className="text-[#EF5B57] font-medium">{message}</p>
        </div>
        <button 
          onClick={() => setStatus('idle')} 
          className="w-full py-3 px-6 rounded-full border border-[#2d2548] text-sm font-medium text-white hover:bg-[#1B1833] transition-colors"
          style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        >
          Try again
        </button>
      </div>
    );
  }

  // Hero variant - large, centered for landing page
  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            className="flex-1 px-6 py-4 rounded-full bg-[#1B1833]/80 border border-[#2d2548] text-white placeholder-[#666] focus:border-[#EB1B69] focus:ring-2 focus:ring-[#EB1B69]/20 transition-all"
            style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] text-white font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/25 disabled:opacity-50 transition-all"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subscribing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Subscribe Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            )}
          </button>
        </div>
        <p className="text-xs text-[#666] text-center mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </form>
    );
  }

  // Inline variant - compact horizontal
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
          className="flex-1 px-5 py-3 rounded-full bg-[#1B1833] border border-[#2d2548] text-white placeholder-[#666] text-sm focus:border-[#EB1B69] focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/20 disabled:opacity-50 transition-all whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    );
  }

  // Full variant - vertical with name field
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'loading'}
          className="w-full px-5 py-3.5 rounded-xl bg-[#1B1833] border border-[#2d2548] text-white placeholder-[#666] text-sm focus:border-[#EB1B69] focus:outline-none transition-all"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
          className="w-full px-5 py-3.5 rounded-xl bg-[#1B1833] border border-[#2d2548] text-white placeholder-[#666] text-sm focus:border-[#EB1B69] focus:outline-none transition-all"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/20 disabled:opacity-50 transition-all"
        style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Subscribing...
          </span>
        ) : (
          'Subscribe to Perky News'
        )}
      </button>
      <p className="text-xs text-[#666] text-center">
        No spam, unsubscribe anytime. Weekly digest of the best AI + Web3 news.
      </p>
    </form>
  );
}
