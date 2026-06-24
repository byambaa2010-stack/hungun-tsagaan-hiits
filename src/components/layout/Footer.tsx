import { getServerApolloClient } from "@/lib/apollo/server-client";
import { CP_MENUS, CpMenusData, MenuItem } from "@/graphql/cms/queries/menu";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin } from "lucide-react";

function getFooterItems(items: MenuItem[]): MenuItem[] {
  return items
    .filter((item) => item.kind === "footer")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export default async function Footer() {
  const client = await getServerApolloClient();

  let menuItems: MenuItem[] = [];
  try {
    const { data } = await client.query<CpMenusData>({
      query: CP_MENUS,
      variables: { language: "mn", kind: "footer" },
      fetchPolicy: "no-cache",
    });
    menuItems = data?.cpMenus || [];
  } catch {
    menuItems = [];
  }

  const footerItems = getFooterItems(menuItems);
  const year = new Date().getFullYear();

  const menuLinks = [
    { _id: "home", label: "Нүүр", url: "/" },
    { _id: "about", label: "Бидний тухай", url: "/about" },
    { _id: "services", label: "Үйлчилгээ", url: "/services" },
    { _id: "gallery", label: "Галерей", url: "/gallery" },
    { _id: "blog", label: "Мэдээ", url: "/blog" },
    { _id: "contact", label: "Холбоо барих", url: "/contact" },
  ];

  const serviceLinks = [
    { _id: "facade", label: "Шилэн фасад", url: "/services" },
    { _id: "aluminum", label: "Хөнгөн цагаан хийц", url: "/services" },
    { _id: "lowe", label: "Low-E шил", url: "/services" },
    { _id: "install", label: "Угсралт", url: "/services" },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <span className="text-lg font-bold tracking-[0.1em] text-foreground">GER GROUP</span>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Монголын шилэн фасад, хөнгөн цагаан хийцний мэргэжлийн шийдэл.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Цэс
            </h3>
            <ul className="space-y-2">
              {(footerItems.length > 0 ? footerItems : menuLinks).map((item) => (
                <li key={item._id}>
                  <Link
                    href={item.url || "/"}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Үйлчилгээ
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item._id}>
                  <Link
                    href={item.url}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Холбоо барих
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Улаанбаатар, Монгол</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+97600000000" className="hover:text-foreground">+976 0000 0000</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:info@gergroup.mn" className="hover:text-foreground">info@gergroup.mn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-subtle">© {year} GER GROUP. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="font-mono text-xs text-subtle">JGJ151 · GB/T 5237 · GB 50009</p>
        </div>
      </div>
    </footer>
  );
}
