import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/admin-session";
import { createClient } from "@supabase/supabase-js";
import AdminContactMessages from "@/components/AdminContactMessages";
import type { Metadata } from 'next'

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
};

export default async function AdminHomePage() {
    const ok = await isAdminSessionValid();

    if (!ok) {
        redirect("/admin/signin");
    }

    const displayId = process.env.USER_ID ?? "admin";
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let adminError: string | null = null;
    let messages: ContactMessage[] = [];

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        adminError =
            "Admin read access is not configured. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your server environment.";
    } else {
        try {
            const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

            const { data, error } = await supabaseAdmin
                .from("contact_messages")
                .select("id, name, email, subject, message, created_at")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Failed to fetch contact messages:", error);
                adminError =
                    "Could not load contact messages right now. Please try again.";
            } else {
                messages = (data ?? []) as ContactMessage[];
            }
        } catch (e) {
            console.error("Unexpected error fetching contact messages:", e);
            adminError = "Could not load contact messages right now. Please try again.";
        }
    }

    return (
        <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 relative animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand/5 dark:bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                    Admin <span className="text-brand">Dashboard</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                    Signed in as {displayId}
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Contact messages from the public contact-us form.
                </p>

                {adminError ? (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-left">
                        <p className="text-sm text-red-700 dark:text-red-400">{adminError}</p>
                    </div>
                ) : (
                    <AdminContactMessages messages={messages} />
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-300 dark:border-zinc-700 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-brand/70 hover:text-brand transition-colors"
                    >
                        Back to site
                    </Link>
                    <form action="/api/admin/logout" method="POST">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-red-200 dark:border-red-900/50 text-sm font-semibold text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
