import React, { useEffect } from "react";
import { Input } from "@nextui-org/input";
import { BsSearch } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { BiPencil } from "react-icons/bi";
import Image from "next/image";

export default function SearchBar() {
  const [searchedData, setSearchedData] = React.useState<any>(null);
  const fetchSearchData = async (query: string) => {
    try {
      const response = await axios.post("/api/searchProduct", {
        search: query,
      });
      console.log(response.data);
      setSearchedData(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (value) {
      fetchSearchData(value);
    }
  }, [value]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="dark">
      <Toaster />
      <Input
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={
          value
            ? (e) => {
                if (e.key === "Enter") {
                  onOpen();
                  setValue("");
                }
              }
            : (e) => {
                if (e.key === "Enter") {
                  toast.error("Please enter a valid search query");
                }
              }
        }
        startContent={
          <BsSearch
            className="text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0 w-5 h-5 mr-2 cursor-pointer"
            onClick={
              value
                ? () => {
                    onOpen();
                    setValue("");
                  }
                : () => toast.error("Please enter a valid search query")
            }
          />
        }
      />
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="dark">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search Results
              </ModalHeader>
              <ModalBody>
                <div className="h-[60vh] w-[95%]  flex flex-col items-center m-auto overflow-y-scroll">
                  {searchedData.products.length ? (
                    searchedData.products.map((product: any) => (
                      <div
                        key={product._id}
                        className=" bg-black w-full rounded-3xl flex justify-evenly items-center mb-[2vh]"
                      >
                        <div className="w-[35px] h-[35px]">
                          <div className="w-[35px] h-[35px] bg-[#212121] border-large rounded-full relative">
                            <Image
                              src={product.mediaURL}
                              fill
                              className="rounded-full"
                              alt={""}
                            />
                          </div>
                        </div>
                        <div className="w-[50%] p-2">
                          <p className="text-white text-[0.9vw] font-semibold">
                            {product.product_Name}
                          </p>
                          <p className="text-[12px] font-semibold text-[#747474]">
                            {product.category + "|| " + product.category2}
                          </p>
                        </div>
                        <Link
                          className=" rounded-full w-[30px] h-[30px] bg-white"
                          href={`/products/${product._id}`}
                        >
                          <BiPencil className="text-[#212121] w-[30px] h-[30px] p-1 m-auto" />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-white w-full h-full flex justify-center items-center m-auto">
                      No results found
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} className="w-full bg-[#25C07F]">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
