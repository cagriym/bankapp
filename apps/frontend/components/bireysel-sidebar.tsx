"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BanknoteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}
function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function BireyselSidebar() {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive
        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    }`;
  };

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/bireysel"
              className={getLinkClass("/bireysel")}
              prefetch={false}
            >
              <HomeIcon className="h-4 w-4" />
              Ana Ekran
            </Link>
            <Link
              href="/bireysel/paraaktar"
              className={getLinkClass("/bireysel/paraaktar")}
              prefetch={false}
            >
              <CreditCardIcon className="h-4 w-4" />
              Para Aktar
            </Link>
            <Link
              href="/bireysel/hesaplarim"
              className={getLinkClass("/bireysel/hesaplarim")}
              prefetch={false}
            >
              <FileTextIcon className="h-4 w-4" />
              Hesap
            </Link>
            <Link
              href="/profil"
              className={getLinkClass("/profil")}
              prefetch={false}
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
