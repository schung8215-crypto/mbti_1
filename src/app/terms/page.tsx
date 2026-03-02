export default function TermsPage() {
  return (
    <main style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.meta}>Effective 5 March 2026</p>
        <p style={styles.intro}>
          These Terms of Service govern your use of the Haru mobile application.
        </p>
        <p style={styles.intro}>
          Haru is operated by K Insider Ltd, registered in England and Wales, with its registered office at 71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom.
        </p>
        <p style={{ ...styles.intro, marginBottom: "40px" }}>
          Haru provides personality-based and Saju-based reflection content for personal growth. By creating an account or using Haru, you agree to these Terms.
        </p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. About Haru</h2>
          <p>Haru provides personalised daily insights based on:</p>
          <ul style={styles.list}>
            <li>A 16-type personality framework</li>
            <li>Birth date–based Saju interpretation</li>
            <li>Compatibility and reflection features</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            Haru is intended for informational, entertainment, and personal growth purposes only.
            Haru does not provide medical, psychological, financial, or legal advice.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Eligibility</h2>
          <p>You must be at least:</p>
          <ul style={styles.list}>
            <li>13 years old, or</li>
            <li>The minimum age required by law in your country of residence.</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            By using Haru, you confirm that you meet these requirements.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Accounts</h2>
          <p>To access certain features, you must create an account. You agree to:</p>
          <ul style={styles.list}>
            <li>Provide accurate information</li>
            <li>Keep your login credentials secure</li>
            <li>Be responsible for activity under your account</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            We reserve the right to suspend or terminate accounts that misuse the service or
            breach these Terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Subscriptions and Payments</h2>
          <p>Haru offers a free trial period followed by a paid subscription.</p>

          <h3 style={styles.subheading}>Billing</h3>
          <ul style={styles.list}>
            <li>Subscriptions renew automatically unless cancelled.</li>
            <li>You may cancel at any time via your Apple App Store or Google Play account settings.</li>
            <li>Refunds are handled by your platform provider in accordance with their policies.</li>
            <li>Deleting your Haru account does not automatically cancel your subscription.</li>
            <li>All payments are processed by Apple or Google. Haru does not store payment card details.</li>
            <li>Pricing and subscription terms are displayed in the app before purchase.</li>
          </ul>

          <h3 style={styles.subheading}>Digital Content &amp; Cooling-Off Rights (UK &amp; EU Users)</h3>
          <p>
            By purchasing a subscription, you expressly agree that access to digital content may
            begin immediately. Where access begins during a statutory cooling-off period, you
            acknowledge that you may lose your right to cancel under applicable consumer protection
            laws once the digital content has been fully delivered.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Free Trial</h2>
          <p>If you start a free trial:</p>
          <ul style={styles.list}>
            <li>You will not be charged until the trial ends.</li>
            <li>Your subscription will automatically begin unless cancelled before the trial period expires.</li>
            <li>You will be charged at the rate shown in the app at the time of purchase.</li>
            <li>It is your responsibility to manage subscription settings through your app store account.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Privacy</h2>
          <p>
            Your use of Haru is also governed by our{" "}
            <a href="/privacy" style={styles.link}>Privacy Policy</a>.
            By using Haru, you consent to the collection and use of information as described
            in that policy.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Intellectual Property</h2>
          <p>
            All content within Haru — including text, system logic, design, branding, and daily
            insights — is owned by Haru or licensed to us. You may not:
          </p>
          <ul style={styles.list}>
            <li>Copy, reproduce, or distribute content</li>
            <li>Reverse engineer the application</li>
            <li>Use Haru content for commercial purposes without permission</li>
          </ul>
          <p style={{ marginTop: "12px" }}>Haru is licensed to you for personal, non-commercial use only.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul style={styles.list}>
            <li>Use Haru for unlawful purposes</li>
            <li>Attempt to interfere with system functionality</li>
            <li>Access data that does not belong to you</li>
            <li>Misuse compatibility features</li>
          </ul>
        </section>

        <section style={{ ...styles.section, marginTop: "8px" }}>
          <h2 style={styles.heading}>9. No Professional Advice</h2>
          <p>
            Haru provides personality-based and Saju-based reflections for personal insight.
            The content:
          </p>
          <ul style={styles.list}>
            <li>Is not professional advice</li>
            <li>Should not replace medical, psychological, legal, or financial consultation</li>
            <li>Should not be relied upon for critical decisions</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            You remain responsible for your own decisions and actions.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Limitation of Liability</h2>
          <p>
            Nothing in these Terms excludes or limits liability where it would be unlawful to do
            so under UK law, including liability for death or personal injury caused by negligence
            or fraud.
          </p>
          <p style={{ marginTop: "12px" }}>
            To the fullest extent permitted by law, Haru shall not be liable for:
          </p>
          <ul style={styles.list}>
            <li>Indirect or consequential losses</li>
            <li>Loss of data</li>
            <li>Loss of business or revenue</li>
            <li>Decisions made based on app content</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            Haru is provided &quot;as is&quot; and &quot;as available.&quot;
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. Service Availability</h2>
          <p>We may:</p>
          <ul style={styles.list}>
            <li>Update, modify, or discontinue features</li>
            <li>Temporarily suspend the app for maintenance</li>
            <li>Improve or adjust system logic over time</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            We do not guarantee uninterrupted or error-free availability.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>12. Termination</h2>
          <p>
            You may delete your account at any time. We may suspend or terminate accounts that
            breach these Terms. Termination does not affect subscription payments already processed
            through your platform provider.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>13. Entire Agreement</h2>
          <p>
            These Terms constitute the entire agreement between you and Haru regarding your use
            of the app and supersede any prior agreements or understandings.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>14. Governing Law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. If you are a consumer
            residing outside the United Kingdom, you may also benefit from mandatory protections
            under the laws of your country of residence.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>15. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. If we make material changes, we will
            notify users within the app. Continued use of Haru after changes take effect
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>16. Contact</h2>
          <p>If you have questions about these Terms, please contact:</p>
          <address style={styles.address}>
            K Insider Ltd<br />
            71–75 Shelton Street<br />
            Covent Garden<br />
            London WC2H 9JQ<br />
            United Kingdom<br />
            <a href="mailto:dev@kinsider.co.uk" style={styles.link}>dev@kinsider.co.uk</a>
          </address>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#F9F6F2",
    minHeight: "100vh",
    padding: "80px 20px",
  },
  wrapper: {
    maxWidth: "680px",
    width: "100%",
    color: "#2E2E2E",
    lineHeight: 1.7,
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: "15px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 500,
    marginBottom: "8px",
    color: "#1a1a1a",
  },
  meta: {
    fontSize: "14px",
    opacity: 0.5,
    marginBottom: "8px",
  },
  intro: {
    marginBottom: "40px",
    opacity: 0.8,
  },
  section: {
    marginBottom: "36px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "10px",
    color: "#1a1a1a",
  },
  subheading: {
    fontSize: "15px",
    fontWeight: 600,
    marginTop: "16px",
    marginBottom: "8px",
    color: "#2E2E2E",
  },
  list: {
    paddingLeft: "20px",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },
  address: {
    fontStyle: "normal",
    marginTop: "12px",
    lineHeight: 1.9,
  },
  link: {
    color: "#c67d5c",
    textDecoration: "underline",
  },
};
