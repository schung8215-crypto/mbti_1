"use client";

import { useRouter } from "next/navigation";

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-warm-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-14 pb-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-warm-100 transition-colors"
          >
            <svg className="w-5 h-5 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-warm-900">Terms of Service</h1>
            <p className="text-xs text-warm-400">Effective 5 March 2026</p>
          </div>
        </div>

        <div className="px-5 pb-16 space-y-6">

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-soft p-5 space-y-2">
            <h2 className="text-sm font-semibold text-warm-900">The short version</h2>
            <ul className="space-y-1.5 text-sm text-warm-600 leading-relaxed">
              <li>Haru is for personal, non-commercial use.</li>
              <li>Insights are for self-reflection — not professional advice.</li>
              <li>You must be 13 or older to use the app.</li>
              <li>Subscriptions are managed through Apple or Google and renew automatically unless cancelled.</li>
            </ul>
          </div>

          <div className="border-t border-warm-200" />

          {/* Full terms */}
          <div className="space-y-6 text-sm text-warm-600 leading-relaxed">

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">About Haru</h3>
              <p>
                Haru provides personalised daily insights based on personality frameworks and
                birth date–based Saju interpretation. Haru is operated by K Insider Ltd,
                a company registered in England and Wales. Contact:{" "}
                <a href="mailto:dev@kinsider.co.uk" className="text-terracotta underline">
                  dev@kinsider.co.uk
                </a>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Acceptance</h3>
              <p>
                By downloading, installing, or using Haru, you agree to these Terms of Service.
                If you do not agree, please do not use the app.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Eligibility</h3>
              <p>
                You must be at least 13 years old to use Haru. By using the app, you confirm
                that you meet this age requirement. Users under 18 must have parental or guardian
                consent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Subscriptions and billing</h3>
              <p>
                Haru offers a free trial period followed by a paid subscription. Subscription
                options are:
              </p>
              <ul className="mt-2 space-y-1 pl-1">
                <li>· Annual plan — $29.99/year (billed once per year)</li>
                <li>· Monthly plan — $4.99/month (billed monthly)</li>
              </ul>
              <p className="mt-2">
                Subscriptions are processed through the Apple App Store or Google Play and
                renew automatically at the end of each billing period unless cancelled at least
                24 hours before the renewal date. Cancellation and refund requests are governed
                by your app store&apos;s policies. We do not process payments directly.
              </p>
              <p className="mt-2">
                You can manage or cancel your subscription at any time via your Apple or
                Google account settings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Free trial</h3>
              <p>
                New users receive a free trial period. At the end of the trial, continued access
                to premium features requires a paid subscription. We reserve the right to modify
                or discontinue the free trial at any time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Acceptable use</h3>
              <p>
                Haru is intended for personal, non-commercial use. You agree not to:
              </p>
              <ul className="mt-2 space-y-1 pl-1">
                <li>· Reproduce, redistribute, or create derivative works from app content without written permission.</li>
                <li>· Attempt to reverse-engineer, scrape, or interfere with the app or its infrastructure.</li>
                <li>· Use the app for any unlawful purpose.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">No professional advice</h3>
              <p>
                Haru provides personality insights and daily reflections for self-exploration and
                personal growth only. Nothing in the app constitutes medical, psychological,
                legal, or financial advice. Do not rely on Haru content for decisions that require
                professional expertise.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Intellectual property</h3>
              <p>
                All content, design, and software in Haru is owned by or licensed to K Insider Ltd.
                You are granted a limited, non-exclusive licence to use the app for personal purposes.
                This licence does not transfer any ownership rights to you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Disclaimer of warranties</h3>
              <p>
                Haru is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
                that the app will be available at all times or that insights will be accurate
                for any particular purpose.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Limitation of liability</h3>
              <p>
                To the maximum extent permitted by law, K Insider Ltd shall not be liable for
                any indirect, incidental, or consequential damages arising from your use of Haru.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Termination</h3>
              <p>
                We reserve the right to suspend or terminate access to accounts that violate
                these terms, at our sole discretion, with or without notice.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Governing law</h3>
              <p>
                These terms are governed by the laws of England and Wales. Any disputes shall
                be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Changes to these terms</h3>
              <p>
                We may update these terms from time to time. We will notify you of material
                changes within the app. Continued use of Haru after changes means you accept
                the updated terms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Contact</h3>
              <p>
                K Insider Ltd<br />
                <a href="mailto:dev@kinsider.co.uk" className="text-terracotta underline">
                  dev@kinsider.co.uk
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
