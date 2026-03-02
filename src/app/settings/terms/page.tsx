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

          <p className="text-sm text-warm-500 leading-relaxed">
            Haru is a reflection app combining personality frameworks and traditional Korean Saju for personal growth.
          </p>

          <p className="text-sm text-warm-600 leading-relaxed">
            These Terms of Service govern your use of the Haru mobile application. By creating an account or using Haru, you agree to these Terms.
          </p>

          <p className="text-sm text-warm-500 leading-relaxed">
            Haru is operated by K Insider Ltd, registered in England and Wales, with its registered office at 71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom.
          </p>

          <div className="space-y-6 text-sm text-warm-600 leading-relaxed">

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">1. About Haru</h3>
              <p className="mb-2">Haru provides personalised daily insights based on:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· A 16-type personality framework</li>
                <li>· Birth date–based Saju interpretation</li>
                <li>· Compatibility and reflection features</li>
              </ul>
              <p>Haru is intended for informational, entertainment, and personal growth purposes only. Haru does not provide medical, psychological, financial, or legal advice.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">2. Eligibility</h3>
              <p className="mb-2">You must be at least:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· 13 years old, or</li>
                <li>· The minimum age required by law in your country of residence.</li>
              </ul>
              <p>By using Haru, you confirm that you meet these requirements.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">3. Accounts</h3>
              <p className="mb-2">To access certain features, you must create an account. You agree to:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· Provide accurate information</li>
                <li>· Keep your login credentials secure</li>
                <li>· Be responsible for activity under your account</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that misuse the service or breach these Terms.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">4. Subscriptions and Payments</h3>
              <p className="mb-3">Haru offers a free trial period followed by a paid subscription.</p>
              <p className="font-medium text-warm-700 mb-1">Billing</p>
              <ul className="space-y-1 pl-3 mb-3">
                <li>· Subscriptions renew automatically unless cancelled.</li>
                <li>· You may cancel at any time via your Apple App Store or Google Play account settings.</li>
                <li>· Refunds are handled by your platform provider in accordance with their policies.</li>
                <li>· Deleting your Haru account does not automatically cancel your subscription.</li>
                <li>· All payments are processed by Apple or Google. Haru does not store payment card details.</li>
                <li>· Pricing and subscription terms are displayed in the app before purchase.</li>
              </ul>
              <p className="font-medium text-warm-700 mb-1">Digital Content &amp; Cooling-Off Rights (UK &amp; EU Users)</p>
              <p>By purchasing a subscription, you expressly agree that access to digital content may begin immediately. Where access begins during a statutory cooling-off period, you acknowledge that you may lose your right to cancel under applicable consumer protection laws once the digital content has been fully delivered.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">5. Free Trial</h3>
              <p className="mb-2">If you start a free trial:</p>
              <ul className="space-y-1 pl-3">
                <li>· You will not be charged until the trial ends.</li>
                <li>· Your subscription will automatically begin unless cancelled before the trial period expires.</li>
                <li>· You will be charged at the rate shown in the app at the time of purchase.</li>
                <li>· It is your responsibility to manage subscription settings through your app store account.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">6. Privacy</h3>
              <p>Your use of Haru is also governed by our Privacy Policy. By using Haru, you consent to the collection and use of information as described in that policy.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">7. Intellectual Property</h3>
              <p className="mb-2">All content within Haru — including text, system logic, design, branding, and daily insights — is owned by Haru or licensed to us. You may not:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· Copy, reproduce, or distribute content</li>
                <li>· Reverse engineer the application</li>
                <li>· Use Haru content for commercial purposes without permission</li>
              </ul>
              <p>Haru is licensed to you for personal, non-commercial use only.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">8. Acceptable Use</h3>
              <p className="mb-2">You agree not to:</p>
              <ul className="space-y-1 pl-3">
                <li>· Use Haru for unlawful purposes</li>
                <li>· Attempt to interfere with system functionality</li>
                <li>· Access data that does not belong to you</li>
                <li>· Misuse compatibility features</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">9. No Professional Advice</h3>
              <p className="mb-2">Haru provides personality-based and Saju-based reflections for personal insight. The content:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· Is not professional advice</li>
                <li>· Should not replace medical, psychological, legal, or financial consultation</li>
                <li>· Should not be relied upon for critical decisions</li>
              </ul>
              <p>You remain responsible for your own decisions and actions.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">10. Limitation of Liability</h3>
              <p className="mb-2">Nothing in these Terms excludes or limits liability where it would be unlawful to do so under UK law, including liability for death or personal injury caused by negligence or fraud.</p>
              <p className="mb-2">To the fullest extent permitted by law, Haru shall not be liable for:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· Indirect or consequential losses</li>
                <li>· Loss of data</li>
                <li>· Loss of business or revenue</li>
                <li>· Decisions made based on app content</li>
              </ul>
              <p>Haru is provided &quot;as is&quot; and &quot;as available.&quot;</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">11. Service Availability</h3>
              <p className="mb-2">We may:</p>
              <ul className="space-y-1 pl-3 mb-2">
                <li>· Update, modify, or discontinue features</li>
                <li>· Temporarily suspend the app for maintenance</li>
                <li>· Improve or adjust system logic over time</li>
              </ul>
              <p>We do not guarantee uninterrupted or error-free availability.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">12. Termination</h3>
              <p>You may delete your account at any time. We may suspend or terminate accounts that breach these Terms. Termination does not affect subscription payments already processed through your platform provider.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">13. Governing Law</h3>
              <p>These Terms are governed by the laws of England and Wales. If you are a consumer residing outside the United Kingdom, you may also benefit from mandatory protections under the laws of your country of residence.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">14. Changes to These Terms</h3>
              <p>We may update these Terms from time to time. If we make material changes, we will notify users within the app. Continued use of Haru after changes take effect constitutes acceptance of the updated Terms.</p>
            </div>

            <div>
              <h3 className="font-semibold text-warm-800 mb-2">15. Contact</h3>
              <p className="mb-2">If you have questions about these Terms, please contact:</p>
              <address className="not-italic space-y-0.5">
                <p className="font-medium text-warm-700">K Insider Ltd</p>
                <p>71–75 Shelton Street</p>
                <p>Covent Garden</p>
                <p>London WC2H 9JQ</p>
                <p>United Kingdom</p>
                <a href="mailto:dev@kinsider.co.uk" className="text-terracotta underline">dev@kinsider.co.uk</a>
              </address>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
