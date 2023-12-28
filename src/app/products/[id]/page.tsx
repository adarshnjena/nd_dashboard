/* eslint-disable @next/next/no-img-element */
"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "../../../utils/uploadthing";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import AppLayout from "../../../components/appLayout";
import { Image } from "@nextui-org/image";
import QrCode from "../../../components/qrCode";
import Loading from "@/src/components/loading";

export default function ClintDetails({ params }: any) {
  const [loading, setLoading] = useState<boolean>(true);

  const id = params.id;
  const [productData, setProductData] = useState({
    _id: id,
    product_Name: "",
    brand_Name: "",
    category: "",
    category2: "",
    mediaURL: "",
    about: "",
    trending: false,
    featured: false,
    form: "",
    composition: "",
  });

  useEffect(() => {
    setLoading(true);
    console.log(id);
    const fetchData = async () => {
      const response = await axios.post("/api/getProduct", { id: id });
      setProductData(response.data.product);
      console.log(response.data.product);
      console.log(productData);
    };
    fetchData().then(() => {
      setLoading(false);
    });
  }, [id]);

  const handelSubmit = async () => {
    try {
      const response = await axios.post("/api/updateProduct", {
        productData,
      });
      console.log(response.data);
      toast.success("Updated Successfully");
    } catch (error: any) {
      console.log(error.message);
      console.log(error);
      toast.error("Update Failed");
    }
  };
  return (
    <AppLayout>
      {loading ? <Loading /> : ""}
      <Screen
        productData={productData}
        setProductData={setProductData}
        visible={!loading}
        handelSubmit={handelSubmit}
      />
    </AppLayout>
  );
}

const Screen = ({
  productData,
  setProductData,
  visible,
  handelSubmit,
}: {
  productData: any;
  setProductData: any;
  visible: boolean;
  handelSubmit: any;
}) => {
  const [selectedFile, setSelectedFile] = useState("");
  const catogaries = [
    "Anti biotics",
    "Anti anxiety",
    "Sexual wellness",
    "Steroids",
    "Pain killers",
    "Herbal products",
    "Ed medicines",
    "Anti cancer",
    "Zopliclone",
    "Covid - 19",
    "Diabetes",
    "Personal care",
    "Skin care",
    "Testosterone",
    "Vitamin & supplements",
    "Hair loss",
    "None",
  ];
  return (
    <div className={`${visible ? " visible" : "invisible"}`}>
      <div className="mt-10 flex">
        <div className="mr-10 w-30vw">
          <Image
            isZoomed
            width={300}
            alt="NextUI Fruit Image with Zoom"
            src={productData.mediaURL}
          />

          <div className=" mt-20">
            <QrCode
              size={250}
              link={"https://ayramedimpex.com/details/" + productData._id}
            />
          </div>
        </div>
        <form className=" bg-[#212121] p-10 rounded-xl h-max overflow-scroll w-full">
          <div className="space-y-12">
            <p className="mt-1 text-sm leading-6 text-white">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="">
              <div className="border-b border-white pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Product_Name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Product_Name"
                        id="Product_Name"
                        value={productData.product_Name}
                        className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            product_Name: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Brand_Name"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Brand Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Brand_Name"
                        id="Brand_Name"
                        value={productData.brand_Name}
                        className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setProductData({
                            ...productData,
                            brand_Name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="Category"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Catogary
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none mt-2 w-full border border-gray-400 hover:border-gray-500  p-1.5 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          name="Category"
                          id="Category"
                          value={productData.category}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              category: e.target.value,
                            })
                          }
                        >
                          {catogaries.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="Category2"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Catogary 2
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none mt-2 w-full border border-gray-400 hover:border-gray-500  p-1.5 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          name="Category2"
                          id="Category2"
                          value={productData.category2}
                          onChange={(e) =>
                            setProductData({
                              ...productData,
                              category2: e.target.value,
                            })
                          }
                        >
                          {catogaries.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="flex w-full justify-between align-middle text-center">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-white text-center"
                    >
                      Logo
                    </label>
                    {selectedFile ? (
                      <div className="flex justify-center">
                        <img
                          src={selectedFile}
                          alt="logo"
                          className="h-12 w-12 rounded-xl"
                        />
                      </div>
                    ) : (
                      <svg
                        className=" h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <UploadDropzone
                    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setSelectedFile(res![0].url);
                      setProductData({
                        ...productData,
                        mediaURL: res![0].url,
                      });
                      toast.success("Image Uploaded successfully");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-white pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      value={productData.about}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          about: e.target.value,
                        })
                      }
                      rows={4}
                      className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Form
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      value={productData.form}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          form: e.target.value,
                        })
                      }
                      rows={1}
                      className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    composition
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      value={productData.composition}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          composition: e.target.value,
                        })
                      }
                      rows={1}
                      className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6 grid gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
                <div className="sm:col-span-3">
                  <label className="md:w-2/3 block text-white font-bold">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={productData.trending}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          trending: e.target.checked,
                        })
                      }
                    />
                    <span className="text-md">Is a Trending Product ?</span>
                  </label>
                </div>{" "}
                <div className="sm:col-span-3">
                  <label className="md:w-2/3 block text-white font-bold">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      checked={productData.featured}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          featured: e.target.checked,
                        })
                      }
                    />
                    <span className="text-md">Is a Featured Product ?</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={(e) => {
                e.preventDefault();
                toast.promise(handelSubmit(), {
                  loading: "Uploading...",
                  success: "Uploaded successfully",
                  error: "Upload failed",
                });
              }}
            >
              Update
            </button>
          </div>
        </form>
        <div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};
