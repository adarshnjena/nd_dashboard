import React from "react";
import { Card, CardFooter } from "@nextui-org/card";
import Image from "next/image";

export default function Cards({
  image,
  num,
  discription,
}: {
  image: string;
  num: number;
  discription: string;
}) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none my-5">
      <div className="relative w-[17vw] h-[40vh]">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          fill
          src={image}
        />
      </div>
      <p className="absolute text-[#25C07F] top-[30%] left-[10%] font-bold text-[4vw]">
        {num}
      </p>
      <CardFooter className="overflow-hidden h-[40%] absolute before:rounded-xl rounded-large bottom-1 w-[100%] shadow-small p-8 z-10">
        <p className="text-white font-medium text-[2vw]">
          <p>{discription.slice(0, discription.indexOf(" "))}</p>
          {discription.slice(discription.indexOf(" ") + 1)}
        </p>
      </CardFooter>
    </Card>
  );
}
