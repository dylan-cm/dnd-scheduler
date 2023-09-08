"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import CrownIcon from "@/assets/crown.svg";
import CrownIconTrans from "@/assets/crown-trans.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CampaignLinkedLoginProps = {
  params: { campaign: string };
};
export default function CampaignLinkedLogin({
  params: { campaign },
}: CampaignLinkedLoginProps) {
  const [dm, setDm] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    Cookies.remove("dm");
    Cookies.remove("name");
    if (
      campaign &&
      (!Cookies.get("campaign") || Cookies.get("campaign") !== campaign)
    )
      Cookies.set("campaign", decodeURI(campaign));
  }, []);

  const router = useRouter();
  const handleSubmit = () => {
    if (!name) {
      alert("Please fill out your name before continuing");
      return;
    }
    Cookies.set("dm", dm.toString());
    Cookies.set("name", name || "");

    router.push(`/${campaign}/cal/${format(new Date(), "yyyy/MM")}`);
  };

  const changeCampaign = () => {
    Cookies.remove("campaign");
    router.push("/");
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-4">
      <h1 className="text-3xl">DND Scheduler</h1>
      <div className="w-full text-center">
        <div className="self-stretch p-2 justify-center items-center gap-3 flex">
          <h1 className="text-center text-white text-2xl font-semibold">
            {decodeURI(campaign)}
          </h1>
          <button
            className="text-lg text-white font-thin w-7 h-7 aspect-square rounded-full bg-brand-purple-light"
            onClick={changeCampaign}
          >
            X
          </button>
        </div>
      </div>
      <input
        className="max-w-lg w-full rounded-2xl border border-brand-purple-light text-white text-base font-semibold bg-transparent p-2 outline-none"
        placeholder="Your Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Are you the DM?</p>
      <button onClick={() => setDm((prev) => !prev)}>
        <div
          className={`"h-0 w-16 aspect-square p-1 rounded-full self-stretch border border-brand-purple-light flex-col justify-center items-center flex ${
            dm ? " bg-brand-purple-light" : ""
          }`}
        >
          {dm ? (
            <Image src={CrownIcon} alt="Toggle DM mode" />
          ) : (
            <Image src={CrownIconTrans} alt="Toggle DM mode" />
          )}
          <span
            className={`"font-normal text-xs ${
              dm ? "text-white" : "text-brand-purple-trans-4"
            }`}
          >
            DM
          </span>
        </div>
      </button>
      <button
        className="px-10 py-2 rounded-xl bg-brand-purple-light"
        onClick={handleSubmit}
      >
        Sign in
      </button>
    </div>
  );
}
