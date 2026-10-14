import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Design-system button (Figma "Button" frame).
 * - primary:   solid navy
 * - secondary: solid orange with glow (the main CTA)
 * - outline:   white with a light border
 * - text:      orange text link with an icon, no box
 * - ghost / glass: utility variants for modals and dark hero backgrounds
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "text" | "ghost" | "glass";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/** Subtle lift for boxed variants only (text/ghost stay flat). */
const LIFT = "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none";

/** Disabled look from the design: faded white box with a light border. Covers <button disabled> and aria-disabled links. */
const BOXED_DISABLED =
  "disabled:border-edge disabled:bg-surface/60 disabled:text-content/40 disabled:shadow-none disabled:backdrop-blur-none " +
  "aria-disabled:border-edge aria-disabled:bg-surface/60 aria-disabled:text-content/40 aria-disabled:shadow-none aria-disabled:backdrop-blur-none";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cn("border-transparent bg-primary text-surface shadow-card hover:bg-primary-dark", LIFT, BOXED_DISABLED),
  secondary: cn("border-transparent bg-secondary text-surface shadow-glow hover:bg-secondary-dark", LIFT, BOXED_DISABLED),
  outline: cn(
    "border-edge bg-surface text-primary hover:border-primary/30 hover:bg-surface-alt hover:shadow-card",
    LIFT,
    BOXED_DISABLED
  ),
  text: "border-0 bg-transparent text-secondary hover:text-secondary-dark disabled:text-content/40 aria-disabled:text-content/40",
  ghost: cn("border-transparent bg-transparent text-content hover:bg-surface-alt hover:text-primary", BOXED_DISABLED),
  glass: cn(
    "border-white/25 bg-white/10 text-surface backdrop-blur-md hover:border-white/40 hover:bg-white/20",
    LIFT,
    BOXED_DISABLED
  ),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-9 gap-1.5 rounded-lg px-4 text-sm",
  md: "min-h-11 gap-2 rounded-xl px-5 text-sm",
  lg: "min-h-12 gap-2.5 rounded-xl px-7 text-base",
};

/** The text variant has no box, so it only scales type and spacing. */
const TEXT_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "gap-1.5 text-sm",
  md: "gap-2 text-sm",
  lg: "gap-2 text-base",
};

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-[1.125rem]",
};

/** Class builder, exported so other elements (e.g. Headless UI triggers) can look like a button. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "group/btn inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap border font-bold",
    "transition duration-200 ease-out-brand",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
    VARIANT_CLASSES[variant],
    variant === "text" ? TEXT_SIZE_CLASSES[size] : SIZE_CLASSES[size],
    fullWidth && "w-full",
    className
  );
}

export interface ButtonContentOptions {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  /** Mirror the icon in RTL. Use for arrows/chevrons so "forward" points left in Arabic. */
  flipIconInRtl?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
}

/** Label + optional icon (sized automatically per button size). Swaps the icon for a spinner while loading. */
export function renderButtonContent({
  children,
  icon,
  iconPosition = "end",
  flipIconInRtl = false,
  isLoading = false,
  size = "md",
}: ButtonContentOptions): ReactNode {
  const iconNode = isLoading ? (
    <CgSpinner aria-hidden className="size-4 shrink-0 animate-spin" />
  ) : icon ? (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 transition-transform duration-200 ease-out-brand",
        ICON_SIZE_CLASSES[size],
        flipIconInRtl && "rtl:-scale-x-100",
        iconPosition === "end" && "group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5"
      )}
    >
      {icon}
    </span>
  ) : null;

  return (
    <>
      {iconPosition === "start" && iconNode}
      <span>{children}</span>
      {iconPosition === "end" && iconNode}
    </>
  );
}

interface ButtonOwnProps extends ButtonStyleOptions, ButtonContentOptions {}

export type ButtonAsButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
    ref?: Ref<HTMLButtonElement>;
  };

export type ButtonAsLinkProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps | "href"> & {
    /** Renders a link instead of a <button>. Internal paths go through i18n navigation. */
    href: string;
    /** Opens in a new tab with safe rel attributes. */
    external?: boolean;
    disabled?: boolean;
    ref?: Ref<HTMLAnchorElement>;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/**
 * @example
 * <Button variant="secondary" size="lg" icon={<FiArrowRight />} flipIconInRtl href={ROUTES.bookSession}>
 *   {t("bookDemo")}
 * </Button>
 */
export function Button(props: ButtonProps) {
  const {
    variant,
    size = "md",
    fullWidth,
    className,
    children,
    icon,
    iconPosition,
    flipIconInRtl,
    isLoading,
    ...rest
  } = props;

  const classes = buttonClasses({ variant, size, fullWidth, className });
  const content = renderButtonContent({ children, icon, iconPosition, flipIconInRtl, isLoading, size });

  if (rest.href !== undefined) {
    const { href, external = false, disabled = false, onClick, ...anchorProps } = rest as Omit<
      ButtonAsLinkProps,
      keyof ButtonOwnProps
    >;
    const isInactive = disabled || isLoading;
    const linkProps = {
      ...anchorProps,
      className: classes,
      "aria-disabled": isInactive || undefined,
      "aria-busy": isLoading || undefined,
      tabIndex: isInactive ? -1 : anchorProps.tabIndex,
      onClick: isInactive ? (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault() : onClick,
    };

    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
        {content}
      </a>
    ) : (
      <Link href={href} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, ...buttonProps } = rest as Omit<ButtonAsButtonProps, keyof ButtonOwnProps>;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
