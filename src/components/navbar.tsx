"use client";
import { Card, CardBody } from "@nextui-org/card";
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GiMedicines } from "react-icons/gi";

const notify = () => toast("Here is your toast.");

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    Icon: <AiFillHome size={20} />,
  },
  {
    href: "/products",
    label: "Products",
    Icon: <GiMedicines size={20} />,
  },
  {
    href: "/",
    label: "Logout",
    Icon: <IoLogOut size={20} />,
  },
];

export const Navbar = () => {
  let pathname = usePathname();
  if (pathname.substring(0, 7) == "/client") {
    pathname = "/clients";
  }
  const [active, setActive] = useState(pathname);
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      toast.success("Logout success");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-[20vw] h-full bg-[#212121] font-sans antialiased flex justify-center items-center flex-col">
      <div className="w-[20vw] h-[20vh] flex item-center justify-center mb-40">
        <div className="relative h-[200px] w-[200px] rounded-full m-auto">
          <Image src="/logo.png" alt="Picture of the author" fill className="rounded-full" />
        </div>
      </div>
      {links.map(({ href, label, Icon }) => (
        <Card
          key={label}
          className={`mb-[50px]  ${
            active == href && label != "Logout" ? "bg-[#181818]" : ""
          } ${label == "Logout" ? " bg-red-500" : ""}`}
          isPressable
          onPress={() => {
            if (label != "Logout") {
              setActive(href);
              router.push(href);
            } else {
              logout();
            }
          }}
        >
          <CardBody>
            <div
              className={`flex items-center justify-around w-[10vw] ${
                active == href ? "text-green-500" : ""
              }`}
            >
              {Icon}
              <p>{label}</p>
            </div>
          </CardBody>
        </Card>
      ))}
      <div>
        <Toaster />
      </div>
    </div>
  );
};
