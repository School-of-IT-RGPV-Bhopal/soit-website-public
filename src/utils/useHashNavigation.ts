import { usePathname } from 'next/navigation';

/**
 * Custom hook for handling smooth scroll navigation to hash anchors
 * when already on the same page
 */
export function useHashNavigation() {
  const pathname = usePathname();

  const handleHashNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    // If we're already on the home page, handle the scroll manually
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Otherwise, let Next.js Link handle the navigation
  };

  return handleHashNavigation;
}
