"use client";
import { Spacer } from "@nextui-org/spacer";
import { ClientCards } from "./clintCards";
import { useRouter } from "next/navigation";

export function CardView(data: any) {
  console.log(data);
  const router = useRouter();
  return (
    <div className="grid grid-cols-5 xl:grid-cols-6 gap-4 mt-12">
      {data.data.map((item: any) => (
        <div key={item.id}>
          <div
            onClick={() => {
              router.push(`/products/${item._id}`);
            }}
          >
            <ClientCards image={item.mediaURL} title={item.product_Name} />
          </div>
        </div>
      ))}
    </div>
  );
}
