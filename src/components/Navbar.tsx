"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ThemeToggler from "@/components/ThemeToggler";

const navItems = [
  { text: "Ree", href: "#" },
  { text: "Projects", href: "#about" },
  { text: "Contact", href: "#features" },
];

const Navbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (!navbarRef.current || !navContainerRef.current) return;

    // if at the top of the website show transparent navbar
    if (currentScrollY < 150) {
      setIsNavbarVisible(true);
      navbarRef.current.classList.remove("floating-navbar");
    }
    // scrolling down (i.e current scroll position > last scroll position) (below 150) navbar becomes floating but hides it
    else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false);
    }
    // scrolling up floating navbar reappears
    else if (lastScrollY > currentScrollY) {
      setIsNavbarVisible(true);
      navbarRef.current.classList.add("floating-navbar");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // show navbar based on if visible
  useGSAP(() => {
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.3,
    });
  }, [isNavbarVisible]);

  return (
    <div
      className="fixed top-0 z-50 w-full h-15 justify-center flex"
      ref={navContainerRef}
    >
      {/* Logo and product button */}
      <header
        ref={navbarRef}
        className="py-5 bg-background/50 border-b-2 backdrop-blur-lg w-2xl mx-4 px-5 sm:px-10 rounded-b-3xl flex justify-between"
      >
        <div className="flex justify-around items-center">
          <nav className="flex uppercase text-xs gap-5 sm:gap-15 font-general font-bold">
            {navItems.map((navItem, idx) => (
              <a className="nav-hover-btn" key={idx} href={navItem.href}>
                {navItem.text}
              </a>
            ))}
          </nav>
        </div>
        <ThemeToggler />
      </header>
    </div>
  );
};

export default Navbar;
