"use client";

import { useEffect, useState } from "react";
import { HeaderMobileDrawer } from "./HeaderMobileDrawer";
import { HeaderNavbar } from "./HeaderNavbar";
import { HeaderTopBar } from "./HeaderTopBar";

/** Fixed site header (identity v4): ink top bar + white navbar with mega menus + mobile drawer. */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full">
      <HeaderTopBar />
      <HeaderNavbar isScrolled={isScrolled} onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <HeaderMobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
