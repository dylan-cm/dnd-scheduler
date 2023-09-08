import Image from "next/image";
import Link from "next/link";
import StarBorder from "@/assets/star-border.svg";
import { format } from "date-fns";

interface DayButtonProps {
  state: "available" | "busy" | null;
  votes: number;
  enabled: boolean;
  confirmed: boolean;
  date: Date;
  selected: boolean;
  campaign: string;
}
const DayButton = (props: DayButtonProps) => {
  const bgColor =
    props.state === null
      ? "bg-white"
      : props.state === "available"
      ? "bg-brand-green"
      : "bg-brand-red";

  return (
    <Link
      className="DayButton w-11 h-11 justify-center items-center inline-flex relative mb-2"
      href={`/${encodeURI(props.campaign)}/cal/${format(
        props.date,
        "yyyy/MM/dd"
      )}`}
    >
      {props.votes && !props.confirmed ? (
        <div
          className={`PeopleBubble w-5 h-5 rounded-lg flex-col justify-center items-center inline-flex absolute -top-1 -right-1  ${
            props.enabled ? "bg-brand-purple-mid" : "bg-white"
          }`}
        >
          <span
            className={`text-center text-md font-semibold ${
              props.enabled ? "text-white" : "text-black"
            }`}
          >
            {props.votes}
          </span>
        </div>
      ) : (
        <></>
      )}

      {props.confirmed ? (
        <>
          <div
            className="w-full h-full rounded-2xl rounded-tr-[25px] absolute"
            style={{ boxShadow: "inset 0px 2px 4px 3px #0005" }}
          />
          <div className="w-14 h-14 absolute -bottom-0.5 -left-0.5 -top-3 right-3">
            <Image src={StarBorder} alt="Confirmed" className="w-full h-full" />
          </div>
          <span className="absolute -top-2 right-0.5 text-center text-black text-md font-medium text-md">
            {props.votes}
          </span>
        </>
      ) : (
        <></>
      )}

      <div
        className={`"BtnBg w-11 h-11 rounded-2xl flex-col justify-center items-center inline-flex border-[3px] ${
          props.enabled ? bgColor : "bg-brand-purple-trans-2"
        } ${
          props.selected
            ? props.enabled
              ? "border-brand-purple-light"
              : "border-white"
            : "border-transparent"
        }`}
      >
        <span
          className={`text-center text-xl font-normal ${
            props.enabled ? "text-black" : "text-white opacity-50"
          }`}
        >
          {format(props.date, "d")}
        </span>
      </div>
    </Link>
  );
};

export default DayButton;
