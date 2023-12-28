import React, { useEffect } from "react";
import Image from "next/image";
import { Spacer } from "@nextui-org/spacer";
import { MdAutoGraph } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

export function ClientCards({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="relative h-[40vh] w-full items-center rounded-lg">
      <Image src={image} alt="Bag" className="rounded-lg object-cover" fill />
      <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-black rounded-lg"></div>
      <div className="absolute bottom-0 flex h-full w-full flex-col items-center justify-center text-white rounded-lg">
        <p className="text-md font-medium text-white">{title}</p>
      </div>
    </div>
  );
}

type dataType = {
  username: string;
  clientName: string;
  mediaURL: string;
  brandName: string;
  orgName: string;
  phoneNo: string;
  gstin: string;
  address: string;
};

export function ClintCardsHorizontal({ data }: { data: dataType }) {
  const [campaign, setCampaign] = React.useState<any>(null);
  const [daysRemaining, setDaysRemaining] = React.useState<any>(null);
  useEffect(() => {
    console.log(data);
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/getAllActiveCampaign", {
          data: {
            username: data.username,
          },
        });
        console.log(response.data.campaign);
        setCampaign(response.data.campaign);
        const today = new Date();
        const campaignDate = new Date(response.data.campaign.endDate);
        const diffTime = Math.abs(campaignDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [data]);
  return campaign ? (
    <>
      <div className="bg-[#212121] w-[99%] p-10  rounded-small flex justify-between">
        <p className=" text-3xl font-bold">{campaign.campaignName}</p>
        <div className="flex items-center">
          <div>
            <p className=" text-2xl font-bold flex justify-center items-center">
              {campaign.uniqueQRScan} <MdAutoGraph />
            </p>
            <p className=" text-sm font-medium">Unique QR Scan</p>
          </div>
          <Spacer x={10} />
          <div>
            <p className=" text-2xl font-bold flex justify-center items-center">
              {daysRemaining}
            </p>
            <p className=" text-sm font-medium">Days Remaining</p>
          </div>
          <Spacer x={10} />{" "}
          <div>
            <p className=" text-2xl font-bold flex justify-center items-center">
              {campaign.websiteVisit}
            </p>
            <p className=" text-sm font-medium">Website Visits</p>
          </div>
          <Spacer x={10} />
          <div>
            <p className=" text-2xl font-bold flex justify-center items-center">
              {campaign.noOfEvents}
            </p>
            <p className=" text-sm font-medium">Total Bottles</p>
          </div>
          <Spacer x={10} />
        </div>
        <Toaster />
      </div>
    </>
  ) : (
    <></>
  );
}
