import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

/** Optional allow-list, set via AUTH_ALLOWED_USERS (comma-separated Google
 *  emails and/or GitHub usernames). Empty/unset = no restriction, any GitHub
 *  or Google account can sign in — today's demo posture. Populate it to
 *  lock the app down to specific people without touching this file again.
 *  See DESIGN.md's "Access gate" note. */
const ALLOWED_USERS = (process.env.AUTH_ALLOWED_USERS ?? "")
  .split(",")
  .map((entry) => entry.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ profile }) {
      if (ALLOWED_USERS.length === 0) return true;

      const email = (profile?.email as string | undefined)?.toLowerCase();
      const githubLogin = (
        profile as { login?: string } | undefined
      )?.login?.toLowerCase();

      if (email && ALLOWED_USERS.includes(email)) return true;
      if (githubLogin && ALLOWED_USERS.includes(githubLogin)) return true;

      return false;
    },
  },
});
