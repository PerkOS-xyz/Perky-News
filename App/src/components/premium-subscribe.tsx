'use client';

import { useState } from 'react';
import { subscribePremium } from '@/lib/x402';

interface PremiumSubscribeProps {
  variant?: 'card' | 'inline';
}

export function PremiumSubscribe({ variant = 'card' }: PremiumSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Please enter your email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await subscribePremium(email);
      
      if (result.success) {
        setStatus('success');
        setEmail('');
        console.log('Premium subscription successful:', result.transactionId);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred');
      console.error('Premium subscription error:', error);
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-center p-8 rounded-3xl bg-gradient-to-br from-[#EB1B69]/20 to-[#FD8F50]/10 border border-[#EB1B69]/30 ${variant === 'inline' ? 'max-w-md' : ''}`}>
        <span className="text-5xl mb-4 block">🎉</span>
        <h3 
          className="text-2xl font-bold mb-3 gradient-text"
          style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        >
          Welcome to Premium!
        </h3>
        <p className="text-[#a3a3a3]">
          Thank you for your support. Check your email for confirmation and exclusive content access.
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-5 py-3 rounded-full bg-[#1B1833] border border-[#2d2548] text-white placeholder-[#666] text-sm focus:border-[#EB1B69] focus:outline-none transition-all"
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#EB1B69] to-[#FD8F50] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/20 disabled:opacity-50 transition-all whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
        >
          {status === 'loading' ? 'Processing...' : 'Go Premium $1/mo'}
        </button>
      </form>
    );
  }

  const features = [
    { icon: '📊', text: 'Exclusive technical deep-dives' },
    { icon: '⚡', text: 'Early access to breaking news' },
    { icon: '🚫', text: 'Ad-free reading experience' },
    { icon: '💬', text: 'Discord community access' },
    { icon: '❤️', text: 'Support indie Web3 journalism' },
  ];

  return (
    <div className="relative group h-full">
      {/* Gradient Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity blur-sm" />
      
      <div className="relative h-full p-8 rounded-3xl bg-[#0E0716] border border-transparent">
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EB1B69]/20 to-[#FD8F50]/20 border border-[#EB1B69]/30 flex items-center justify-center text-3xl mx-auto mb-4">
            👑
          </div>

          {/* Title */}
          <h3 
            className="text-2xl font-bold mb-2 gradient-text"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            Perky News Premium
          </h3>
          <p className="text-[#a3a3a3] text-sm mb-6">
            Get exclusive content & support independent journalism
          </p>

          {/* Price */}
          <div className="flex items-baseline justify-center gap-1">
            <span 
              className="text-5xl font-bold gradient-text"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              $1
            </span>
            <span className="text-[#a3a3a3]">/month</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature) => (
            <li key={feature.text} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1B1833] border border-[#2d2548] flex items-center justify-center text-sm">
                {feature.icon}
              </span>
              <span className="text-sm text-white">{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* Form */}
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-xl bg-[#1B1833] border border-[#2d2548] text-white placeholder-[#666] text-sm focus:border-[#EB1B69] focus:outline-none transition-all"
          />
          
          {status === 'error' && (
            <p className="text-[#EF5B57] text-sm text-center">{errorMessage}</p>
          )}
          
          <button 
            type="submit" 
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#EB1B69] via-[#EF5B57] to-[#FD8F50] text-white font-semibold hover:shadow-lg hover:shadow-[#EB1B69]/25 disabled:opacity-50 transition-all"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Payment...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Subscribe with x402
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            )}
          </button>
          
          <p className="text-xs text-[#666] text-center flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB1B69] animate-pulse" />
            Powered by{' '}
            <a 
              href="https://x402.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#EB1B69] hover:text-[#FD8F50] transition-colors"
            >
              x402
            </a>
            {' '}• Secure crypto payments
          </p>
        </form>
      </div>
    </div>
  );
}
