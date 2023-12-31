"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import CrownIcon from "@/assets/crown.svg";
import CrownIconTrans from "@/assets/crown-trans.svg";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";

export default function HomePage() {
  const campaignCookie = Cookies.get("campaign");
  if (campaignCookie) redirect(`/${encodeURI(campaignCookie)}`);

  const [dm, setDm] = useState(false);
  const [campaign, setCampaign] = useState<string | null>(
    campaignCookie || null
  );
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    Cookies.remove("dm");
    Cookies.remove("name");
  }, []);

  const router = useRouter();
  const handleSubmit = () => {
    if (!name || !campaign) {
      alert(
        "Please fill out the Campaign name and your name before continuing"
      );
      return;
    }
    Cookies.set("dm", dm.toString());
    Cookies.set("campaign", campaign || "");
    Cookies.set("name", name || "");

    router.push(`/${campaign}/cal/${format(new Date(), "yyyy/MM")}`);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center gap-4">
      <h1 className="text-3xl">DND Scheduler</h1>
      <input
        className="max-w-lg w-full rounded-2xl border border-brand-purple-light text-white text-base font-semibold bg-transparent p-2 outline-none"
        placeholder="Campaign"
        value={campaign || ""}
        onChange={(e) => setCampaign(e.target.value)}
      />
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
