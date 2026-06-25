import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_MENUS, CpMenusData, MenuItem } from "@/graphql/cms/queries/menu";
import { Link } from "@/i18n/routing";
import { Menu, X, Leaf } from "lucide-react";

function getHeaderItems(items: MenuItem[]): MenuItem[] {
  return items
    .filter((item) => item.kind === "header")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function MenuLink({ item, currentPath }: { item: MenuItem; currentPath: string }) {
  const href = item.url || "/";
  const isActive = currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
        isActive ? "text-accent" : "text-foreground/80"
      }`}
    >
      {item.label}
    </Link>
  );
}

export default async function Header() {
  const client = getStaticApolloClient();
  const currentPath = "/";

  let menuItems: MenuItem[] = [];
  try {
    const { data } = await client.query<CpMenusData>({
      query: CP_MENUS,
      variables: { language: "mn", kind: "header" },
      fetchPolicy: "no-cache",
    });
    menuItems = data?.cpMenus || [];
  } catch {
    menuItems = [];
  }

  const navItems = getHeaderItems(menuItems);

  const fallbackNav: MenuItem[] = [
    { _id: "home", clientPortalId: "", label: "Нүүр", url: "/" },
    { _id: "about", clientPortalId: "", label: "Бидний тухай", url: "/about" },
    { _id: "services", clientPortalId: "", label: "Үйлчилгээ", url: "/services" },
    { _id: "gallery", clientPortalId: "", label: "Галерей", url: "/gallery" },
    { _id: "blog", clientPortalId: "", label: "Мэдээ", url: "/blog" },
    { _id: "contact", clientPortalId: "", label: "Холбоо барих", url: "/contact" },
  ];

  const displayItems = navItems.length > 0 ? navItems : fallbackNav;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
            <Leaf className="h-5 w-5 text-green-400" />
          </div>
          <span className="text-lg font-bold tracking-[0.1em] text-foreground">
            GER GROUP
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {displayItems.map((item) => (
            <MenuLink key={item._id} item={item} currentPath={currentPath} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="rounded-md border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Үнийн санал
          </Link>
        </div>

        <MobileMenu items={displayItems} currentPath={currentPath} />
      </div>
    </header>
  );
}

function MobileMenu({ items, currentPath }: { items: MenuItem[]; currentPath: string }) {
  return (
    <div className="flex items-center md:hidden">
      <input type="checkbox" id="mobile-menu" className="peer sr-only" />
      <label
        htmlFor="mobile-menu"
        className="cursor-pointer rounded-md p-2 text-foreground hover:bg-surface"
        aria-label="Цэс"
      >
        <Menu className="h-5 w-5 peer-checked:hidden" />
        <X className="hidden h-5 w-5 peer-checked:block" />
      </label>

      <div className="fixed inset-x-0 top-20 z-40 hidden border-b border-border bg-background px-6 py-6 peer-checked:block">
        <nav className="flex flex-col gap-4">
          {items.map((item) => (
            <MenuLink key={item._id} item={item} currentPath={currentPath} />
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-md border border-accent px-5 py-2.5 text-center text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Үнийн санал
          </Link>
        </nav>
      </div>
    </div>
  );
}
