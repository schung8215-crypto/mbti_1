export default function PrivacyPage() {
  return (
    <main style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.meta}>Effective 5 March 2026</p>
        <p style={styles.intro}>
          This Privacy Policy explains how Haru collects, uses, and protects your information when you use the Haru mobile application.
        </p>
        <p style={styles.intro}>
          Haru is operated by K Insider Ltd, registered in England and Wales, with its registered office at 71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom.
        </p>
        <p style={{ ...styles.intro, marginBottom: "40px" }}>
          Haru provides personality-based and Saju-based reflection content for personal growth. By using Haru, you agree to the practices described in this Privacy Policy.
        </p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Information We Collect</h2>
          <p>We collect only the information necessary to provide Haru&apos;s services.</p>

          <h3 style={styles.subheading}>A. Account Information</h3>
          <ul style={styles.list}>
            <li>Email address</li>
            <li>Authentication data (if signing in via Apple, Google, etc.)</li>
          </ul>

          <h3 style={styles.subheading}>B. Profile Information</h3>
          <ul style={styles.list}>
            <li>Personality quiz responses</li>
            <li>Personality type result</li>
            <li>Birth date (used to generate Saju-based insights)</li>
          </ul>
          <p style={{ marginTop: "10px" }}>
            We do not collect birth time or precise location data.
          </p>

          <h3 style={styles.subheading}>C. Usage Information</h3>
          <ul style={styles.list}>
            <li>Saved or bookmarked insights</li>
            <li>Compatibility interactions</li>
            <li>Feature usage (e.g., daily visits, streaks)</li>
          </ul>

          <h3 style={styles.subheading}>D. Technical &amp; Device Data</h3>
          <ul style={styles.list}>
            <li>Device type</li>
            <li>Operating system</li>
            <li>App version</li>
            <li>Anonymous analytics data</li>
            <li>Crash reports</li>
          </ul>
          <p style={{ marginTop: "10px" }}>
            We do not collect payment card details. All subscription payments are processed
            by Apple App Store or Google Play.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul style={styles.list}>
            <li>Generate your personality profile</li>
            <li>Calculate your Saju profile based on your birth date</li>
            <li>Deliver personalised daily insights</li>
            <li>Provide compatibility features</li>
            <li>Maintain and improve the app</li>
            <li>Manage subscriptions and accounts</li>
            <li>Respond to support requests</li>
          </ul>
          <p style={{ marginTop: "12px" }}>We do not sell or rent your personal data.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Legal Basis for Processing (UK &amp; EEA Users)</h2>
          <p>
            If you are located in the UK or European Economic Area (EEA), we process your data
            under the following lawful bases:
          </p>
          <ul style={styles.list}>
            <li><strong>Consent</strong> — when you create an account and provide profile data</li>
            <li><strong>Performance of a contract</strong> — to provide app features you subscribe to</li>
            <li><strong>Legitimate interests</strong> — to improve and maintain Haru&apos;s services</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            You may withdraw consent at any time by deleting your account.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Data Sharing</h2>
          <p>We do not sell or rent your personal information.</p>
          <p style={{ marginTop: "12px" }}>
            We may share limited data with trusted service providers that help us operate Haru,
            including:
          </p>
          <ul style={styles.list}>
            <li>Cloud hosting providers</li>
            <li>Analytics services</li>
            <li>Authentication services</li>
            <li>Apple App Store / Google Play (for payment processing)</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            These providers process data only as necessary to perform their services.
            All third-party providers are required to process personal data in accordance
            with applicable data protection laws.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. International Data Transfers</h2>
          <p>
            As a UK-based company, your data may be processed in the United Kingdom or other
            countries where our service providers operate. Where required, we use appropriate
            safeguards to protect personal data in accordance with UK GDPR and applicable data
            protection laws.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Data Retention</h2>
          <p>We retain your personal data for as long as your account remains active.</p>
          <p style={{ marginTop: "12px" }}>If you delete your account:</p>
          <ul style={styles.list}>
            <li>
              Your profile data (including birth date and personality results) will be deleted
              or anonymised within 30 days, unless required to retain it by law.
            </li>
            <li>
              Subscription records may be retained as required for accounting and legal purposes.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul style={styles.list}>
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Restrict or object to processing</li>
            <li>Request a copy of your data</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            To exercise your rights, contact us at{" "}
            <a href="mailto:dev@kinsider.co.uk" style={styles.link}>dev@kinsider.co.uk</a>.
            If you are located in the UK or EEA, you may also lodge a complaint with your
            local data protection authority.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Account Deletion</h2>
          <p>
            You may delete your account at any time within the app settings or by contacting us.
            Deleting your account will remove:
          </p>
          <ul style={styles.list}>
            <li>Your personality results</li>
            <li>Your birth date</li>
            <li>Saved insights</li>
            <li>Compatibility data</li>
          </ul>
          <p style={{ marginTop: "12px" }}>
            Subscription cancellation must be handled separately through your Apple App Store
            or Google Play account.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Children&apos;s Privacy</h2>
          <p>
            Haru is not intended for children under 13 (or the minimum age required in your
            jurisdiction). We do not knowingly collect personal data from children. If we become
            aware that a child has provided personal information, we will delete it.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal
            data. However, no digital system is completely secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If material changes are made,
            we will notify users within the app. Continued use of Haru after changes take effect
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>12. Contact</h2>
          <p>
            If you have questions about this Privacy Policy or how your data is handled, contact:
          </p>
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
