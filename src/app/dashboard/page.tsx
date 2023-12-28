"use client";

import Cards from "../../components/dashboardCards";
import AppLayout from "../../components/appLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import QrCode from "../../components/qrCode";
import Image from "next/image";
import { BiPencil } from "react-icons/bi";
import Loading from "../../components/loading";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [trendingProductData, settrendingProductData] = useState([]);
  const [featuredProductData, setfeaturedProductData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.post("/api/getTrendingProducts", {});
      settrendingProductData(response.data.data);
      console.log(response.data.data);
      console.log(trendingProductData);
      const response2 = await axios.post("/api/getFeaturedProducts", {});
      setfeaturedProductData(response2.data.data);
      console.log(response2.data.data);
      console.log(featuredProductData);
      const response3 = await axios.post("/api/getAllProducts", {});
      setTotalProducts(response3.data.products.length);
      console.log(response3.data.products.length);
      console.log(totalProducts);
    };
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <AppLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-wrap mt-7 justify-between">
            <Cards
              image={"/dashBord1.png"}
              num={totalProducts > 0 ? totalProducts : 0}
              discription={"Total Products"}
            />
            <Cards
              image={"/dashBord2.png"}
              num={17}
              discription={"Total Catogaries"}
            />
            <Cards
              image={"/dashBord3.png"}
              num={
                trendingProductData.length > 0 ? trendingProductData.length : 0
              }
              discription={"Trendings Products"}
            />
            <Cards
              image={"/dashBord4.png"}
              num={
                featuredProductData.length > 0 ? featuredProductData.length : 0
              }
              discription={"Top Selling"}
            />
          </div>
          <div className="flex mt-10 justify-between">
            <div className="flex justify-between w-[75%]">
              <div className="w-[49%] bg-[#212121] h-[40vh] rounded-lg flex flex-col items-center py-5">
                <div className=" mb-[2vh]">
                  <h1 className="text-white text-[2vw] font-semibold">
                    Trendings Products
                  </h1>
                </div>
                <div className="h-[80%] w-[95%]  flex flex-col items-center m-auto overflow-y-scroll">
                  {trendingProductData.map((product: any) => (
                    <div
                      key={product._id}
                      className=" bg-[#181818] w-[90%] rounded-3xl flex justify-evenly items-center mb-[2vh]"
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
                  ))}
                </div>
              </div>
              <div className="w-[49%] bg-[#212121] h-[40vh] rounded-lg flex flex-col items-center py-5 ">
                <div className=" mb-[2vh]">
                  <h1 className="text-white text-[2vw] font-semibold">
                    Top Selling Products
                  </h1>
                </div>
                <div className="h-[80%] w-[95%]  flex flex-col items-center m-auto overflow-y-scroll">
                  {featuredProductData.map((product: any) => (
                    <div
                      key={product._id}
                      className=" bg-[#181818] w-[90%] rounded-3xl flex justify-evenly items-center mb-[2vh]"
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
                  ))}
                </div>
              </div>
            </div>
            <div className="my-auto">
              <QrCode size={250} link={"https://ayramedimpex.com/"} />
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}
