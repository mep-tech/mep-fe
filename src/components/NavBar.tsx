import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";

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
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const scrollAction = () => {
      if (window.scrollY >= 64) {
        setPageScrolled(true);
      } else {
        setPageScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollAction);
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <nav
        className={`${
          !pageScrolled
            ? "absolute bg-transparent"
            : "fixed top-0 right-0 left-0 backdrop-blur-sm bg-black/30"
        } w-full transition-all duration-300 z-50 hidden md:block`}
      >
        <div className="w-full flex items-center justify-between gap-4 px-2 lg:px-10">
          {pageScrolled && (
            <img
              src="/logo-half.png"
              alt="logo"
              className="h-10 w-10 object-contain"
            />
          )}
          <div className="flex justify-evenly px-2 lg:px-6 h-[64px] py-2 w-full items-center gap-4">
            {items.map((item, index) => (
							item.name === "contact" ? (
								<Button key={index} className="bg-secondary text-white capitalize text-base px-8">
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
							)
            ))}
          </div>{" "}
        </div>
      </nav>
      <nav
        className={`md:hidden flex items-center justify-between w-full px-4 py-1 fixed top-0 left-0 right-0 z-50 ${
          !pageScrolled ? "bg-white" : "backdrop-blur-sm bg-white/30"
        }`}
      >
        <div>
          <img
            src="/logo-full.png"
            alt="logo"
            className="h-10 object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "transparent",
              p: "0.5rem",
            }}
            onClick={toggleDrawer(true)}
          >
            <RiMenu3Fill className="text-primary text-xl" />
          </IconButton>
        </div>
      </nav>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className=""
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            backgroundColor: "#004C83",
            color: "white",
          },
        }}
      >
        <div className="w-[250px] bg-primary text-white">
          <List>
            <ListItem
              disablePadding
              className={``}
              onClick={toggleDrawer(false)}
            >
              <ListItemButton>
                <div className="w-full flex items-center justify-between">
                  <img
                    src="/logo-half.png"
                    alt="logo"
                    className="h-10 w-10 object-contain"
                  />
                  <IconButton className="">
                    <IoArrowForward className="text-white" />
                  </IconButton>
                </div>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <nav className="">
          <List>
            <Divider />
            {items?.map((item, index: number) => {
              return (
                <div
                  onClick={() => {
                    setOpen(false);
                    scrollToSection(item.slug);
                  }}
                  key={index}
                >
                  <ListItem
                    disablePadding
                    key={index}
                    className={`hover:bg-primary hover:text-secondary`}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={item.name}
                        className="capitalize text-center"
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </nav>
      </Drawer>
    </>
  );
};

export default NavBar;
