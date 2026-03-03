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

          <p className="text-sm text-warm-600 leading-relaxed">
            This Privacy Policy explains how Haru collects, uses, and protects your information when you use the Haru mobile application.
          </p>

          <p className="text-sm text-warm-600 leading-relaxed">
            Haru is operated by K Insider Ltd, registered in England and Wales, with its registered office at 71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom.
          </p>

          <p className="text-sm text-warm-600 leading-relaxed">
            Haru provides personality-based and Saju-based reflection content for personal growth. By using Haru, you agree to the practices described in this Privacy Policy.
          </p>

          <div className="space-y-6 text-sm text-warm-600 leading-relaxed">

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">1. Information We Collect</h3>
              <p className="mb-2">We collect only the information necessary to provide Haru&apos;s services.</p>
              <p className="font-medium text-warm-700 mb-1">A. Account Information</p>
              <ul className="space-y-1 pl-3 mb-3">
                <li>· Email address</li>
                <li>· Authentication data (if signing in via Apple, Google, etc.)</li>
              </ul>
              <p className="font-medium text-warm-700 mb-1">B. Profile Information</p>
              <ul className="space-y-1 pl-3 mb-3">
                <li>· Personality quiz responses</li>
                <li>· Personality type result</li>
                <li>· Birth date (used to generate Saju-based insights)</li>
              </ul>
              <p className="mb-2">We do not collect birth time or precise location data.</p>
              <p className="font-medium text-warm-700 mb-1">C. Usage Information</p>
              <ul className="space-y-1 pl-3 mb-3">
                <li>· Saved or bookmarked insights</li>
                <li>· Compatibility interactions</li>
                <li>· Feature usage (e.g., daily visits, streaks)</li>
              </ul>
              <p className="font-medium text-warm-700 mb-1">D. Technical &amp; Device Data</p>
              <ul className="space-y-1 pl-3 mb-3">
                <li>· Device type</li>
                <li>· Operating system</li>
                <li>· App version</li>
                <li>· Anonymous analytics data</li>
                <li>· Crash reports</li>
              </ul>
              <p>We do not collect payment card details. All subscription payments are processed by Apple App Store or Google Play.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">2. How We Use Your Information</h3>
              <p className="mb-2">We use your information to:</p>
              <ul className="space-y-1 pl-3">
                <li>· Generate your personality profile</li>
                <li>· Calculate your Saju profile based on your birth date</li>
                <li>· Deliver personalised daily insights</li>
                <li>· Provide compatibility features</li>
                <li>· Maintain and improve the app</li>
                <li>· Manage subscriptions and accounts</li>
                <li>· Respond to support requests</li>
              </ul>
              <p className="mt-2">We do not sell or rent your personal data.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">3. Legal Basis for Processing (UK &amp; EEA Users)</h3>
              <p className="mb-2">If you are located in the UK or EEA, we process your data under the following lawful bases:</p>
              <ul className="space-y-1 pl-3">
                <li>· <span className="font-medium text-warm-700">Consent</span> — when you create an account and provide profile data</li>
                <li>· <span className="font-medium text-warm-700">Performance of a contract</span> — to provide app features you subscribe to</li>
                <li>· <span className="font-medium text-warm-700">Legitimate interests</span> — to improve and maintain Haru&apos;s services</li>
              </ul>
              <p className="mt-2">You may withdraw consent at any time by deleting your account.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">4. Data Sharing</h3>
              <p className="mb-2">We do not sell or rent your personal information. We may share limited data with trusted service providers that help us operate Haru, including:</p>
              <ul className="space-y-1 pl-3">
                <li>· Cloud hosting providers</li>
                <li>· Analytics services</li>
                <li>· Authentication services</li>
                <li>· Apple App Store / Google Play (for payment processing)</li>
              </ul>
              <p className="mt-2">These providers process data only as necessary to perform their services. All third-party providers are required to process personal data in accordance with applicable data protection laws.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">5. International Data Transfers</h3>
              <p>As a UK-based company, your data may be processed in the United Kingdom or other countries where our service providers operate. Where required, we use appropriate safeguards in accordance with UK GDPR and applicable data protection laws.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">6. Data Retention</h3>
              <p className="mb-2">We retain your personal data for as long as your account remains active. If you delete your account:</p>
              <ul className="space-y-1 pl-3">
                <li>· Your profile data will be deleted or anonymised within 30 days, unless required to retain it by law.</li>
                <li>· Subscription records may be retained as required for accounting and legal purposes.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">7. Your Rights</h3>
              <p className="mb-2">Depending on your location, you may have the right to:</p>
              <ul className="space-y-1 pl-3">
                <li>· Access your personal data</li>
                <li>· Correct inaccurate information</li>
                <li>· Request deletion of your data</li>
                <li>· Restrict or object to processing</li>
                <li>· Request a copy of your data</li>
              </ul>
              <p className="mt-2">
                To exercise your rights, contact us at{" "}
                <a href="mailto:info@kinsider.co.uk" className="text-terracotta underline">info@kinsider.co.uk</a>.
                If you are located in the UK or EEA, you may also lodge a complaint with your local data protection authority.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">8. Account Deletion</h3>
              <p className="mb-2">You may delete your account at any time within Settings. Deleting your account will remove:</p>
              <ul className="space-y-1 pl-3">
                <li>· Your personality results</li>
                <li>· Your birth date</li>
                <li>· Saved insights</li>
                <li>· Compatibility data</li>
              </ul>
              <p className="mt-2">Subscription cancellation must be handled separately through your Apple App Store or Google Play account.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">9. Children&apos;s Privacy</h3>
              <p>Haru is not intended for children under 13 (or the minimum age required in your jurisdiction). We do not knowingly collect personal data from children. If we become aware that a child has provided personal information, we will delete it promptly.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">10. Data Security</h3>
              <p>We implement appropriate technical and organisational measures to protect your personal data. However, no digital system is completely secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">11. Changes to This Policy</h3>
              <p>We may update this Privacy Policy from time to time. If material changes are made, we will notify users within the app. Continued use of Haru after changes take effect constitutes acceptance of the updated policy.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">12. Contact</h3>
              <p className="mb-2">If you have questions about this Privacy Policy or how your data is handled, contact:</p>
              <address className="not-italic space-y-0.5">
                <p className="font-medium text-warm-700">K Insider Ltd</p>
                <p>71–75 Shelton Street</p>
                <p>Covent Garden</p>
                <p>London WC2H 9JQ</p>
                <p>United Kingdom</p>
                <a href="mailto:info@kinsider.co.uk" className="text-terracotta underline">info@kinsider.co.uk</a>
              </address>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
