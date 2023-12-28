/* eslint-disable @next/next/no-img-element */
"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "../utils/uploadthing";
import { useBlur } from "../app/context/bgBlur";
import { useProductFormState } from "../app/context/addProduct";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
const notify = () => toast("Here is your toast.");

export default function AddProduct() {
  const { productFormVisible, setProductFormVisible } = useProductFormState();
  const { setblur } = useBlur();
  const [selectedFile, setSelectedFile] = useState("");
  const [productData, setProductData] = useState({
    product_Name: "",
    brand_Name: "",
    category: "Anti biotics",
    category2: "Anti biotics",
    mediaURL: "",
    about: "",
    form: "",
    composition: "",
  });
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

  const handelSubmit = async () => {
    try {
      const response = await axios.post("/api/addProduct", productData);
      console.log(response);
      toast.success("New Product Added Successfully");
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setProductFormVisible(false);
      setblur(false);
      // window.location.reload();
    }
  };

  return (
    <div
      className={`fixed h-full w-full flex items-center justify-center  ${
        productFormVisible ? "visible" : "invisible"
      }`}
    >
      <form className=" bg-[#212121] p-10 rounded-xl h-[80vh] overflow-scroll">
        <div className="space-y-12">
          <div className="border-b border-white pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
              This information will be displayed publicly so be careful what you
              share.
            </p>

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
                        className="block appearance-none mt-2 w-64 border border-gray-400 hover:border-gray-500  p-1.5 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        name="Category"
                        id="Category"
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
                        className="block appearance-none mt-2 w-64 border border-gray-400 hover:border-gray-500  p-1.5 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        name="Category2"
                        id="Category2"
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
                    rows={4}
                    onChange={
                      (e) =>
                        setProductData({
                          ...productData,
                          about: e.target.value,
                        })
                      // console.log(e.target.value)
                    }
                    className="block w-full rounded-md border-0 p-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="form"
                className="block text-sm font-medium leading-6 text-white"
              >
                Form
              </label>
              <div className="mt-2">
                <textarea
                  id="form"
                  name="form"
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
                htmlFor="composition"
                className="block text-sm font-medium leading-6 text-white"
              >
                composition
              </label>
              <div className="mt-2">
                <textarea
                  id="composition"
                  name="composition"
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
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-white"
            onClick={() => {
              setProductFormVisible(false);
              setblur(false);
            }}
          >
            Cancel
          </button>
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
            Save
          </button>
        </div>
      </form>

      <div>
        <Toaster />
      </div>
    </div>
  );
}
