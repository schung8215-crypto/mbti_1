"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
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
            <h1 className="text-lg font-semibold text-warm-900">Privacy Policy</h1>
            <p className="text-xs text-warm-400">Effective 5 March 2026</p>
          </div>
        </div>

        <div className="px-5 pb-16 space-y-6">

          {/* Human summary */}
          <div className="bg-white rounded-2xl shadow-soft p-5 space-y-2">
            <h2 className="text-sm font-semibold text-warm-900">The short version</h2>
            <ul className="space-y-1.5 text-sm text-warm-600 leading-relaxed">
              <li>We collect your email, birth date, and personality responses — nothing more.</li>
              <li>We do not sell your data.</li>
              <li>You can delete your account and all data at any time from Settings.</li>
            </ul>
          </div>

          <div className="border-t border-warm-200" />

          {/* Full policy */}
          <div className="space-y-6 text-sm text-warm-600 leading-relaxed">

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Who we are</h3>
              <p>
                Haru is operated by K Insider Ltd, a company registered in England and Wales.
                If you have any questions about this policy, contact us at{" "}
                <a href="mailto:dev@kinsider.co.uk" className="text-terracotta underline">
                  dev@kinsider.co.uk
                </a>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">What we collect</h3>
              <p>We collect the following information when you create an account and use the app:</p>
              <ul className="mt-2 space-y-1 pl-1">
                <li>· <strong className="text-warm-700">Email address</strong> — provided via your sign-in provider (Google or Apple).</li>
                <li>· <strong className="text-warm-700">Birth date</strong> — used to calculate your Saju birth pillar.</li>
                <li>· <strong className="text-warm-700">Personality responses</strong> — your answers to the onboarding questions, used to derive your personality type.</li>
                <li>· <strong className="text-warm-700">Push notification token</strong> — if you grant permission, used to send your daily reminder. Stored on our servers and never shared.</li>
                <li>· <strong className="text-warm-700">Subscription status</strong> — trial, active, or expired, managed via Apple or Google.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">How we use your information</h3>
              <p>
                Your data is used solely to operate Haru — generating your personality profile,
                daily insights, compatibility features, and saved reflections. We do not use your
                data for advertising or marketing to third parties.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Storage and security</h3>
              <p>
                Your data is stored securely in Supabase (hosted on AWS infrastructure in the EU).
                Session data is also stored locally on your device. We use industry-standard
                encryption in transit (TLS) and at rest.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Third-party services</h3>
              <p>We use the following third-party services to operate the app:</p>
              <ul className="mt-2 space-y-1 pl-1">
                <li>· <strong className="text-warm-700">Google / Apple Sign-In</strong> — authentication only.</li>
                <li>· <strong className="text-warm-700">Supabase</strong> — database and auth infrastructure.</li>
                <li>· <strong className="text-warm-700">Vercel</strong> — app hosting and delivery.</li>
                <li>· <strong className="text-warm-700">RevenueCat</strong> — subscription management (in-app purchases). RevenueCat processes your subscription status on behalf of Apple or Google; we do not store payment details.</li>
                <li>· <strong className="text-warm-700">Apple APNs / Google FCM</strong> — push notification delivery. Used only to send your daily reading reminder.</li>
              </ul>
              <p className="mt-2">We do not share your personal data with any other third parties.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Your rights</h3>
              <p>
                Under UK GDPR and applicable law, you have the right to access, correct, or delete
                your personal data. You can delete your account and all associated data at any time
                from Settings → Account → Delete account. For any other data requests, email us at{" "}
                <a href="mailto:dev@kinsider.co.uk" className="text-terracotta underline">
                  dev@kinsider.co.uk
                </a>.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Data retention</h3>
              <p>
                We retain your data for as long as your account is active. If you delete your
                account, your personal data is permanently removed within 30 days.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Children</h3>
              <p>
                Haru is not directed at children under 13. We do not knowingly collect data from
                children. If you believe a child has provided us with personal data, contact us and
                we will delete it promptly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-1">Changes to this policy</h3>
              <p>
                We may update this policy occasionally. We will notify you of material changes
                within the app. Continued use after changes constitutes acceptance of the updated policy.
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
