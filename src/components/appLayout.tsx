"use client";

import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";
import { Spacer } from "@nextui-org/spacer";
import SearchBar from "./searchBar";
import { Providers } from "../app/providers";
import { useBlur } from "../app/context/bgBlur";
import AddProduct from "./addProduct";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    tags: "Overview of all current and future campaigns",
  },
  {
    href: "/products",
    label: "Products",
    tags: "Overview of all current products",
  },
  {
    href: "/products/",
    label: "Detailed Product Profile",
    tags: "Detailed profile of ",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  let username = "";
  if (pathname.substring(0, 10) == "/products/") {
    username = pathname.substring(10);
    pathname = "/products/";
  }
  const { blur } = useBlur();
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div
        className={`${blur ? "blur-lg opacity-20 z-0" : ""} overflow-hidden`}
      >
        <Navbar />
        <div className="w-[80vw] min-h-screen bg-[#181818] top-0 right-0 absolute p-10 ">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white text-[40px] font-bold">
                {links.find((link) => link.href === pathname)?.label}
              </p>
              <Spacer y={2} />
              <p>
                {links.find((link) => link.href === pathname)?.tags + username}
              </p>
            </div>
            <div className="flex items-center ">
              <SearchBar />
              <Spacer x={4} />
            </div>
          </div>
          {children}
        </div>
      </div>
      <div>
        <AddProduct />
      </div>
    </Providers>
  );
}
