"use client";

import { useSession } from "next-auth/react";
import { useLang } from "@/lib/lang-context";
import SignOutButton from "@/components/SignOutButton";

export default function AccountMenu() {
  const { data: session } = useSession();
  const { t } = useLang();

  if (!session?.user) return null;

  const email = session.user.email ?? "";
  const image = session.user.image;
  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="account-menu">
      <div
        className="account-avatar"
        title={`${t("signedInAsLabel")} ${email}`}
      >
        {image ? (
          <img src={image} alt="" referrerPolicy="no-referrer" />
        ) : (
          <span aria-hidden="true">{initial}</span>
        )}
      </div>
      <span className="account-email">{email}</span>
      <SignOutButton />
    </div>
  );
}
