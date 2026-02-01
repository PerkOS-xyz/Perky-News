'use client';

interface ConfirmationBannerProps {
  isConfirmed: boolean;
  error?: string;
}

export function ConfirmationBanner({ isConfirmed, error }: ConfirmationBannerProps) {
  if (!isConfirmed && !error) return null;

  if (error) {
    return (
      <div className="mb-8 p-6 rounded-2xl bg-[#EF5B57]/10 border border-[#EF5B57]/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EF5B57]/20 flex items-center justify-center text-2xl flex-shrink-0">
            ⚠️
          </div>
          <div>
            <h3 
              className="text-lg font-semibold text-[#EF5B57] mb-1"
              style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
            >
              Something went wrong
            </h3>
            <p className="text-[#a3a3a3] text-sm">
              {error === 'invalid_token' && 'This confirmation link is invalid or has expired.'}
              {error === 'already_confirmed' && 'This email has already been confirmed.'}
              {error !== 'invalid_token' && error !== 'already_confirmed' && 'An unexpected error occurred. Please try again.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 rounded-2xl bg-[#EB1B69]/10 border border-[#EB1B69]/30">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#EB1B69]/20 flex items-center justify-center text-2xl flex-shrink-0">
          🎉
        </div>
        <div>
          <h3 
            className="text-lg font-semibold text-[#EB1B69] mb-1"
            style={{ fontFamily: 'var(--font-sora), system-ui, sans-serif' }}
          >
            Email Confirmed!
          </h3>
          <p className="text-[#a3a3a3] text-sm">
            Welcome to Perky News! You&apos;ll receive our weekly digest every Friday.
          </p>
        </div>
      </div>
    </div>
  );
}
