import { cn } from "@utils/utils";

type NavItem = {
  id: string;
  label: string;
};

type SidebarNavProps = {
  items: NavItem[];
  activeSection: string;
  onNavClick: (id: string) => void;
};

const SidebarNav = ({ items, activeSection, onNavClick }: SidebarNavProps) => {
  return (
    <nav className="sticky top-24 space-y-1">
      {/* Removed "sidenav" unless you have specific layout CSS for it */}
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavClick(item.id)}
          className={cn(
            `
              sidebar-link text-sm
              md:text-lg
            `, // Combined branding + responsive sizes
            activeSection === item.id && "sidebar-link-active",
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default SidebarNav;
