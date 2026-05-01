"use client";

import Link from "next/link";
import { useHashNavigation } from "@utils/useHashNavigation";

type HashLinkProps = {
  href: string;
  hash: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * Client component for links with hash navigation support.
 * Enables smooth scrolling when already on the target page.
 */
export default function HashLink({
  href,
  hash,
  children,
  className,
  onClick,
}: HashLinkProps) {
  const handleHashNavigation = useHashNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleHashNavigation(e, hash);
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
