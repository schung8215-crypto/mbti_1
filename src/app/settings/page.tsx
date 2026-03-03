"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRevenueCat } from "@/hooks/useRevenueCat";

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);
  const rc = useRevenueCat();

  const handleManageSubscription = () => {
    if (typeof window === "undefined") return;
    if (rc.isNative) {
      // Detect platform to open the right store
      import("@capacitor/core").then(({ Capacitor }) => {
        const platform = Capacitor.getPlatform();
        if (platform === "android") {
          window.open(
            "https://play.google.com/store/account/subscriptions?package=co.kinsider.haru",
            "_blank"
          );
        } else {
          window.open("https://apps.apple.com/account/subscriptions", "_blank");
        }
      });
    } else {
      window.open("https://apps.apple.com/account/subscriptions", "_blank");
    }
  };

  const handleRestorePurchases = async () => {
    setRestoreMessage(null);
    await rc.restorePurchases();
    if (rc.customerInfo?.activeSubscriptions?.length) {
      setRestoreMessage("Purchases restored successfully.");
    } else {
      setRestoreMessage("No active purchases found.");
    }
  };

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    localStorage.removeItem("mbti-saju-user");
    router.replace("/onboarding/intro");
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("users").delete().eq("id", user.id);
        await supabase.auth.signOut();
      }
      localStorage.removeItem("mbti-saju-user");
      localStorage.removeItem("mbti-pending");
      localStorage.removeItem("mbti-saju-reflections");
      router.replace("/onboarding/intro");
    } catch {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

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
          <h1 className="text-lg font-semibold text-warm-900">Settings</h1>
        </div>

        <div className="px-4 space-y-6 pb-12">

          {/* Account */}
          <section>
            <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider px-1 mb-2">Account</p>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden divide-y divide-warm-100">
              <div className="px-4 py-3.5">
                <p className="text-sm text-warm-900">Email</p>
                <p className="text-sm text-warm-400 mt-0.5">{email ?? "Not signed in"}</p>
              </div>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full text-left px-4 py-3.5"
              >
                <p className="text-sm text-warm-500">{signingOut ? "Signing out…" : "Sign out"}</p>
              </button>
            </div>
          </section>

          {/* Subscription */}
          <section>
            <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider px-1 mb-2">Subscription</p>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden divide-y divide-warm-100">
              <button
                onClick={handleManageSubscription}
                className="w-full text-left px-4 py-3.5 flex items-center justify-between"
              >
                <p className="text-sm text-warm-900">Manage subscription</p>
                <svg className="w-4 h-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={handleRestorePurchases}
                disabled={rc.loading}
                className="w-full text-left px-4 py-3.5"
              >
                <p className="text-sm text-warm-900">
                  {rc.loading ? "Restoring…" : "Restore purchases"}
                </p>
              </button>
            </div>
            {restoreMessage && (
              <p className="text-xs text-warm-600 px-1 mt-2">{restoreMessage}</p>
            )}
            {!restoreMessage && (
              <p className="text-xs text-warm-400 px-1 mt-2">Subscriptions are managed through your Apple App Store or Google Play account.</p>
            )}
          </section>

          {/* Privacy & Legal */}
          <section>
            <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider px-1 mb-2">Privacy & Legal</p>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden divide-y divide-warm-100">
              <button
                onClick={() => router.push("/settings/privacy")}
                className="w-full text-left px-4 py-3.5 flex items-center justify-between"
              >
                <p className="text-sm text-warm-900">Privacy policy</p>
                <svg className="w-4 h-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => router.push("/settings/terms")}
                className="w-full text-left px-4 py-3.5 flex items-center justify-between"
              >
                <p className="text-sm text-warm-900">Terms of service</p>
                <svg className="w-4 h-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>

          {/* Support */}
          <section>
            <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider px-1 mb-2">Support</p>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden divide-y divide-warm-100">
              <a
                href="mailto:dev@kinsider.co.uk"
                className="block px-4 py-3.5 flex items-center justify-between"
              >
                <p className="text-sm text-warm-900">Contact us</p>
                <svg className="w-4 h-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="mailto:dev@kinsider.co.uk?subject=Problem%20report"
                className="block px-4 py-3.5 flex items-center justify-between"
              >
                <p className="text-sm text-warm-900">Report an issue</p>
                <svg className="w-4 h-4 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>

          {/* Delete account */}
          <div className="px-1">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 rounded-2xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
            >
              Delete account
            </button>
            <p className="text-xs text-warm-400 text-center mt-2 leading-relaxed">
              This permanently removes your Haru profile and stored data. Subscription cancellation must be done via your app store.
            </p>
          </div>

          {/* Version */}
          <p className="text-center text-xs text-warm-300 pb-4">Haru v1.0.0</p>

        </div>
      </div>

      {/* Delete account confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-8">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 animate-slide-up">
            <h2 className="text-base font-semibold text-warm-900 mb-2">Delete account?</h2>
            <p className="text-sm text-warm-500 leading-relaxed mb-6">
              This will permanently remove your profile, birth date, saved insights, and compatibility data. This action cannot be undone.
            </p>
            <div className="space-y-2">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="w-full py-3 rounded-2xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete permanently"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-3 rounded-2xl text-sm font-medium text-warm-700 bg-warm-100 hover:bg-warm-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
