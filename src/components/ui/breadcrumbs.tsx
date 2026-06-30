import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Breadcrumbs — an accessible breadcrumb trail. The last item is marked
 * aria-current="page"; the rest are links.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href ?? "#"}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!last && (
                <li aria-hidden className="text-muted-2">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
