"use client";

import Image from "next/image";
import LinkIcon from "../assets/link.svg";
import CrownIcon from "../assets/crown.svg";
import CrownIconTrans from "../assets/crown-trans.svg";
import StarBorder from "../assets/star-border.svg";
import StarIcon from "../assets/star.svg";
import HandIcon from "../assets/hand.svg";
import CheckIron from "../assets/check.svg";
import XIcon from "../assets/x.svg";
import GroupIcon from "../assets/group.svg";
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<null | number>(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const DM_NAME = "Andrew";

  // Handler for going to the previous month
  const goToPreviousMonth = () => {
    if (month === 0) {
      // if January
      setYear((prevYear) => prevYear - 1);
      setMonth(11); // December
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  // Handler for going to the next month
  const goToNextMonth = () => {
    if (month === 11) {
      // if December
      setYear((prevYear) => prevYear + 1);
      setMonth(0); // January
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const getFirstDateOfCalendar = (year: number, month: number): Date => {
    const firstOfMonth = new Date(year, month, 1);
    // 1 is Monday in getDay() where 0 is Sunday
    const daysToMonday = (firstOfMonth.getDay() || 7) - 1;
    firstOfMonth.setDate(firstOfMonth.getDate() - daysToMonday);
    return firstOfMonth;
  };

  const getLastDateOfCalendar = (year: number, month: number): Date => {
    const firstOfNextMonth = new Date(year, month + 1, 1);
    const lastOfMonth = new Date(
      firstOfNextMonth.getTime() - 24 * 60 * 60 * 1000
    ); // One day before the first of next month
    const daysToSunday = 7 - (lastOfMonth.getDay() || 7);
    lastOfMonth.setDate(lastOfMonth.getDate() + daysToSunday);
    return lastOfMonth;
  };

  const startDate = getFirstDateOfCalendar(year, month);
  const endDate = getLastDateOfCalendar(year, month);
  const totalDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1
  );

  console.log(totalDays);

  const dates: {
    date: Date;
    confirmed: boolean;
    availablePeople: string[];
    busyPeople: string[];
  }[] = Array(totalDays)
    .fill(null)
    .map((_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      return {
        date: currentDate,
        confirmed: false,
        // availablePeople: ["Dylan", "Brian", "Andrew", "PJ"],
        availablePeople: ["Dylan", "Brian", "PJ"],
        // availablePeople: [],
        busyPeople: ["Hannah", "B", "A"],
        // busyPeople: [],
      };
    });

  return (
    <main className="flex min-h-screen w-full h-full flex-col items-center justify-between p-4 bg-brand-purple-dark">
      <div className="Wrapper w-full max-w-xl min-h-full flex-col justify-center items-center gap-9 flex">
        <div className="Campaign self-stretch p-2 justify-center items-center gap-3 flex">
          <h1 className="text-center text-white text-2xl font-semibold">
            {"Andrew's Campaign"}
          </h1>
          <Image
            src={LinkIcon}
            alt="Copy link to campaign"
            className="cursor-pointer"
          />
        </div>

        <div className="NameInput self-stretch rounded-2xl border border-brand-purple-light justify-start items-center gap-1 flex overflow-clip">
          <div
            className={`"DMToggle w-12 self-stretch border-r border-brand-purple-light flex-col justify-center items-center flex ${
              DM_NAME === name ? " bg-brand-purple-light" : ""
            }`}
          >
            {DM_NAME === name ? (
              <Image src={CrownIcon} alt="Toggle DM mode" />
            ) : (
              <Image src={CrownIconTrans} alt="Toggle DM mode" />
            )}
            <span
              className={`"font-normal text-xs ${
                DM_NAME === name ? "text-white" : "text-brand-purple-trans-4"
              }`}
            >
              DM
            </span>
          </div>
          <input
            className="grow shrink basis-0 text-white text-base font-semibold bg-transparent p-2 outline-none"
            placeholder="Set name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="Calendar w-full p-6 flex-col justify-start items-center gap-8 flex">
          <div className="MonthControls w-96 justify-between items-center gap-11 flex">
            <button
              className="PrevBtn py-1 px-5 bg-brand-purple-mid rounded-md justify-center items-center gap-2.5 flex"
              onClick={goToPreviousMonth}
            >
              <div className="text-white text-xs font-bold">{"<"}</div>
            </button>
            <div className="MonthYear text-center text-white text-xl font-normal">
              {new Date(year, month).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
              })}
            </div>
            <button
              className="Next py-1 px-5 bg-brand-purple-mid rounded-md flex-col justify-center items-center gap-2.5 flex"
              onClick={goToNextMonth}
            >
              <div className=" text-white text-xs font-bold">{">"}</div>
            </button>
          </div>

          <div className="WeekBar w-full justify-between items-center flex">
            <div className="w-[44px] text-center text-white text-xs font-normal">
              Mo
            </div>
            <div className="w-[44px] text-center text-white text-xs font-normal">
              Tu
            </div>
            <div className="w-[44px] text-center text-white text-xs font-normal">
              We
            </div>
            <div className="w-[44px] text-center text-white text-xs font-normal">
              Th
            </div>
            <div className="w-[44px] text-center text-white text-xs font-normal">
              Fr
            </div>
            <div className="w-[44px] text-center text-white text-xs font-normal">
              Sa
            </div>
            <div className="w-[44px] text-center text-white text-xs font-normal">
              Su
            </div>
          </div>

          <div className="DateGrid w-full flex flex-col gap-4">
            {Array(Math.floor(totalDays / 7))
              .fill(null)
              .map((_, rowIndex) => (
                <div
                  className="DayGrid w-full justify-between items-start flex flex-row"
                  key={`r${rowIndex}`}
                >
                  {Array(7)
                    .fill(null)
                    .map((_, dayIndex) => (
                      <DayBtn
                        key={`r${rowIndex}c${dayIndex}`}
                        enabled={
                          !!dates[rowIndex * 7 + dayIndex].availablePeople.find(
                            (val) => DM_NAME === val
                          ) || DM_NAME === name
                        }
                        state={
                          dates[rowIndex * 7 + dayIndex].availablePeople.find(
                            (val) => name === val
                          )
                            ? "available"
                            : !!dates[rowIndex * 7 + dayIndex].busyPeople.find(
                                (val) => name === val
                              )
                            ? "busy"
                            : null
                        }
                        votes={
                          dates[rowIndex * 7 + dayIndex].availablePeople.length
                        }
                        onClick={() => setSelectedDate(rowIndex * 7 + dayIndex)}
                        confirmed={false}
                        date={dates[rowIndex * 7 + dayIndex].date.getDate()}
                        selected={selectedDate === rowIndex * 7 + dayIndex}
                      />
                    ))}
                </div>
              ))}
          </div>
        </div>

        <div
          className={`BtnRow self-stretch px-8 justify-between items-center flex ${
            name === "" ? "opacity-10" : ""
          }`}
        >
          <button
            className="BusyBtn flex flex-col gap-1 items-center"
            onClick={() => console.log("set busy")}
          >
            <Image src={XIcon} alt="Set busy" />
            <span className="BtnLabel  text-brand-red text-sm font-normal">
              Busy
            </span>
          </button>
          <button
            className="ConfirmBtn flex flex-col gap-1 items-center"
            onClick={() => console.log("set confirm")}
          >
            <Image src={StarIcon} alt="Set busy" />
            <span className="BtnLabel  text-brand-yellow text-sm font-normal">
              Confirm
            </span>
          </button>
          {selectedDate &&
          !!dates[selectedDate].availablePeople.find(
            (val) => DM_NAME === val
          ) &&
          DM_NAME !== name ? (
            <button
              className="AvailableBtn flex flex-col gap-1 items-center"
              onClick={() => console.log("request")}
            >
              <Image src={HandIcon} alt="Request date" />
              <span className="BtnLabel left-0 top-[48px]  text-center text-brand-purple-light text-sm font-normal">
                Request
              </span>
            </button>
          ) : (
            <></>
          )}
          <button
            className="AvailableBtn flex flex-col gap-1 items-center"
            onClick={() => console.log("set available")}
          >
            <Image src={CheckIron} alt="Set available" />
            <span className="BtnLabel left-0 top-[48px]  text-center text-brand-green text-sm font-normal">
              Available
            </span>
          </button>
        </div>

        <div className="InfoWrapper self-stretch flex-col justify-start items-start gap-1.5 flex">
          {selectedDate !== null ? (
            <>
              <span className="Day text-brand-purple-light text-base font-normal">
                {dates[selectedDate].date.toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="InfoBox w-full bg-white rounded border border-brand-green gap-2.5 flex">
                <div className="UserNumBox min-w-12 min-h-full bg-brand-green justify-center items-center gap-1 flex px-4">
                  <h2 className="text-black text-2xl font-bold">
                    {dates[selectedDate].availablePeople.length}
                  </h2>
                  <Image src={GroupIcon} alt="Attending members" />
                </div>
                <div className="InfoText w-full min-h-[64px] p-2 justify-start items-start flex-col">
                  {dates[selectedDate].availablePeople.length ? (
                    <>
                      <span className="text-black text-sm font-normal">
                        Available:
                        <br />
                      </span>
                      <p className="text-black text-md font-medium">
                        {dates[selectedDate].availablePeople.join(", ")}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {dates[selectedDate].busyPeople.length ? (
                    <>
                      <span className="text-black text-sm font-normal">
                        Busy:
                        <br />
                      </span>
                      <p className="text-black text-md font-medium">
                        {dates[selectedDate].busyPeople.join(", ")}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}

interface DayBtnProps {
  state: "available" | "busy" | null;
  votes: number;
  enabled: boolean;
  confirmed: boolean;
  onClick: () => void;
  date: number;
  selected: boolean;
}
const DayBtn = (props: DayBtnProps) => {
  const bgColor =
    props.state === null
      ? "bg-white"
      : props.state === "available"
      ? "bg-brand-green"
      : "bg-brand-red";

  return (
    <button
      className="DayBtn w-11 h-11 justify-center items-center inline-flex relative mb-2"
      onClick={props.onClick}
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
          {props.date}
        </span>
      </div>
    </button>
  );
};
