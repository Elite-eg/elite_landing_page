import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export interface FooterContactItemProps {
  icon: IconType;
  children: ReactNode;
}

export function FooterContactItem({ icon: Icon, children }: FooterContactItemProps) {
  return (
    <li className="group flex items-start gap-2.5">
      <Icon
        aria-hidden
        className="mt-1 size-4 shrink-0 text-secondary transition-transform duration-200 ease-back group-hover:scale-110"
      />
      <div className="flex flex-wrap items-center gap-x-2">{children}</div>
    </li>
  );
}
