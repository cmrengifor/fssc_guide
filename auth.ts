import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

/** Gate for the whole app: sign in with GitHub, see the page. No allow-list
 *  is applied here — any GitHub account can sign in. This is intentional for
 *  now (an IT-review demo), not a real access policy — see DESIGN.md's
 *  "Access gate" note before this goes to real users with unredacted content. */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/signin",
  },
});
