import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const items = [
  {
    name: "home",
    slug: "home",
    href: "/#",
  },
  {
    name: "about",
    slug: "about",
    href: "/#about",
  },
  {
    name: "services",
    slug: "services",
    href: "/#services",
  },
  {
    name: "why us",
    slug: "why-us",
    href: "/#why-us",
  },
  {
    name: "projects",
    slug: "projects",
    href: "/#projects",
  },
  {
    name: "testimonials",
    slug: "testimonials",
    href: "/#testimonials",
  },
  {
    name: "contact",
    slug: "contact",
    href: "/contact",
  },
];

const NavBar = ({ scrollToSection }: any) => {
  const [navBar, setNavBar] = useState<boolean>(false);

  useEffect(() => {
    const scrollAction = () => {
      if (window.scrollY >= 64) {
        setNavBar(true);
      } else {
        setNavBar(false);
      }
    };
    window.addEventListener("scroll", scrollAction);
  }, []);

  return (
    <>
      <nav
        className={`${
          !navBar
            ? "absolute bg-transparent"
            : "fixed top-0 right-0 left-0 backdrop-blur-sm bg-black/30"
        } w-full transition-all duration-300 z-50`}
      >
        <div className="w-full flex items-center justify-between px-10">
          {navBar && (
            <img
              src="/logo-half.png"
              alt="logo"
              className="h-10 w-10 object-contain"
            />
          )}
          <div className="flex justify-evenly px-6 h-[64px] py-2 w-full items-center gap-4">
            {items.map((item, index) => (
              <>
                {item.name === "contact" ? (
                  <Button className="bg-secondary text-white capitalize text-base px-8">
                    Contact
                  </Button>
                ) : (
                  <span
                    key={index}
                    onClick={() => {
                      scrollToSection(item.slug);
                    }}
                    className="text-white capitalize hover:text-secondary cursor-pointer"
                  >
                    {item.name}
                  </span>
                )}
              </>
            ))}
          </div>{" "}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
