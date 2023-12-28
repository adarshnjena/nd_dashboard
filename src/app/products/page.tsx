"use client";
import { BiPlus } from "react-icons/bi";
import { useProductFormState } from "../context/addProduct";
import { useBlur } from "../context/bgBlur";
import AppLayout from "../../components/appLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardView } from "../../components/cardView";

export default function Clints() {
  const { setProductFormVisible } = useProductFormState();
  const { setblur } = useBlur();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/getAllProducts", {});
      setData(response.data.products);
    };
    fetchData();
  }, []);
  return (
    <AppLayout>
      <CardView data={data} />
      <button
        type="button"
        className="fixed right-10 bottom-10 rounded-full p-2 uppercase leading-normal text-black bg-white shadow-[0_4px_9px_-4px_#38393a] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(217, 220, 224, 0.3),0_4px_18px_0_rgba(204, 210, 219, 0.2)] ] pointer"
        onClick={() => {
          setProductFormVisible(true);
          setblur(true);
        }}
      >
        <BiPlus size={30} />
      </button>
    </AppLayout>
  );
}
