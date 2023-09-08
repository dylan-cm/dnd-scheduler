"use client";

import ActionButton from "./ActionButton";
import StarIcon from "@/assets/star.svg";
import HandIcon from "@/assets/hand.svg";
import CheckIcon from "@/assets/check.svg";
import XIcon from "@/assets/x.svg";

interface ActionButtonRowProps {
  date: Date;
  dm: boolean;
  dmBusy: boolean;
}

const ActionButtonRow = ({ date, dm, dmBusy }: ActionButtonRowProps) => {
  const setDateAvailable = () => console.log("available", date);
  const setDateBusy = () => console.log("busy", date);
  const requestDate = () => console.log("request", date);
  const confirmDate = () => console.log("confirm", date);
  return (
    <div
      className={`BtnRow w-full px-8 items-center flex ${
        dmBusy && !dm ? "justify-center" : "justify-between"
      }`}
    >
      {dmBusy && !dm ? (
        <></>
      ) : (
        <ActionButton
          color="text-brand-red"
          label="Busy"
          icon={XIcon}
          onClick={setDateBusy}
        />
      )}
      {dm ? (
        <ActionButton
          color="text-brand-yellow"
          label="Confirm"
          icon={StarIcon}
          onClick={confirmDate}
        />
      ) : (
        <></>
      )}
      {dmBusy && !dm ? (
        <ActionButton
          color="text-brand-purple-light"
          label="Request"
          icon={HandIcon}
          onClick={requestDate}
        />
      ) : (
        <></>
      )}
      {dmBusy && !dm ? (
        <></>
      ) : (
        <ActionButton
          color="text-brand-green"
          label="Available"
          icon={CheckIcon}
          onClick={setDateAvailable}
        />
      )}
    </div>
  );
};

export default ActionButtonRow;
