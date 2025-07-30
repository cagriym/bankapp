"use client";
import { useAutoLogin } from "@/hooks/auth";

export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoLogin();
  return <>{children}</>;
}
