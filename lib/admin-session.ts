import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function getSigningSecret(): string {
    const secret =
        process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!secret) {
        throw new Error(
            "Missing ADMIN_SESSION_SECRET or SUPABASE_SERVICE_ROLE_KEY for admin session signing."
        );
    }
    return secret;
}

export function createAdminSessionToken(): string {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const nonce = randomBytes(16).toString("hex");
    const payload = `${exp}:${nonce}`;
    const sig = createHmac("sha256", getSigningSecret())
        .update(payload)
        .digest("hex");
    return Buffer.from(JSON.stringify({ p: payload, s: sig }), "utf8").toString(
        "base64url"
    );
}

export function verifyAdminSessionToken(token: string): boolean {
    try {
        const parsed = JSON.parse(
            Buffer.from(token, "base64url").toString("utf8")
        ) as { p: string; s: string };
        const { p, s } = parsed;
        const expectedSig = createHmac("sha256", getSigningSecret())
            .update(p)
            .digest("hex");
        const a = Buffer.from(s, "utf8");
        const b = Buffer.from(expectedSig, "utf8");
        if (a.length !== b.length) return false;
        if (!timingSafeEqual(a, b)) return false;
        const exp = parseInt(p.split(":")[0] ?? "0", 10);
        if (Number.isNaN(exp) || Date.now() / 1000 > exp) return false;
        return true;
    } catch {
        return false;
    }
}

export async function isAdminSessionValid(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminSessionToken(token);
}

export async function setAdminSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export async function clearAdminSessionCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
}

export { COOKIE_NAME };
