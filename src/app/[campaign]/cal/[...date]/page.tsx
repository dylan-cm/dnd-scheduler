import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  subDays,
  addMonths,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LinkIcon from "@/assets/link.svg";
import StarIcon from "@/assets/.svg";
import HandIcon from "@/assets/hand.svg";
import CheckIcon from "@/assets/check.svg";
import XIcon from "@/assets/x.svg";
import GroupIcon from "@/assets/group.svg";
import CrownIcon from "@/assets/crown-purple.svg";
import ActionButton from "./components/ActionButton";
import DayButton from "./components/DayButton";
import LinkCopier from "./components/LinkCopier";

function fetchUser() {
  const dm = cookies().get("dm");
  const user = {
    dm: dm === undefined ? undefined : dm.value === "true",
    name:
      cookies().get("name") === undefined
        ? undefined
        : decodeURI(cookies().get("name")?.value || ""),
    campaign:
      cookies().get("campaign") === undefined
        ? undefined
        : decodeURI(cookies().get("campaign")?.value || ""),
  };
  return user;
}

type CalendarPageProps = {
  params: { date: string[] };
};

const CalendarPage = ({ params: { date } }: CalendarPageProps) => {
  const user = fetchUser();
  if (Object.values(user).some((item) => item === undefined)) redirect("/");

  if (date.length < 2 || date.length > 3) return <p>Invalid Date</p>;
  const year = Number(date[0]);
  const month = Number(date[1]);
  const selectedDay = Number(date[2]) || null;
  const selectedDate =
    selectedDay === null ? null : new Date(year, month - 1, selectedDay);

  // Define the start and end days of the month
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));

  // Calculate leading and trailing days
  const daysBefore = (startDate.getDay() + 6) % 7; // Adjust for Monday as the first day of the week
  const daysAfter = 6 - ((endDate.getDay() + 6) % 7); // Adjust for Monday as the first day of the week

  const leadingDays =
    daysBefore === 0
      ? []
      : eachDayOfInterval({
          start: subDays(startDate, daysBefore),
          end: subDays(startDate, 1),
        });

  const currentMonthDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const trailingDays =
    daysAfter === 0
      ? []
      : eachDayOfInterval({
          start: addDays(endDate, 1),
          end: addDays(endDate, daysAfter),
        });

  const allDays = [...leadingDays, ...currentMonthDays, ...trailingDays];

  const dates: {
    date: Date;
    confirmed: boolean;
    dmBusy: boolean;
    availablePeople: string[];
    busyPeople: string[];
  }[] = allDays.map((_, index) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);
    return {
      date: currentDate,
      confirmed: false,
      dmBusy: true,
      // availablePeople: ["Dylan", "Brian", "Andrew", "PJ"],
      availablePeople: ["Dylan", "Brian", "PJ"],
      // availablePeople: [],
      busyPeople: ["Hannah", "B"],
    };
  });

  const setDateAvailable = () =>
    console.log("available", selectedDay && dates[selectedDay].date);
  const setDateBusy = () =>
    console.log("busy", selectedDay && dates[selectedDay].date);
  const requestDate = () =>
    console.log("request", selectedDay && dates[selectedDay].date);
  const confirmDate = () =>
    console.log("confirm", selectedDay && dates[selectedDay].date);

  return (
    <main className="flex min-h-screen w-full h-full flex-col items-center justify-between p-4 bg-brand-purple-dark">
      <div className="Wrapper w-full max-w-xl min-h-full flex-col justify-center items-center gap-9 flex">
        {/* Campaign Title */}
        <div className="w-full text-center">
          <div className="Campaign self-stretch p-2 justify-center items-center gap-3 flex">
            <h1 className="text-center text-white text-2xl font-semibold">
              {user.campaign}
            </h1>
            <LinkCopier
              link={`${process.env.BASE_URL}${encodeURI(user.campaign || "")}`}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-center gap-4">
            {user.dm ? (
              <div
                className={`"w-full flex-col justify-center items-center flex`}
              >
                <Image src={CrownIcon} alt="DM" />
                <span
                  className={`"font-normal text-xs text-brand-purple-light`}
                >
                  DM
                </span>
              </div>
            ) : (
              <></>
            )}

            <h2>{user.name}</h2>
          </div>
        </div>
        {/* Controls */}
        <div className="w-96 justify-between items-center gap-11 flex">
          <Link
            className="py-1 px-5 bg-brand-purple-mid rounded-md flex-col justify-center items-center gap-2.5 flex"
            href={`/${encodeURI(user.campaign || "")}/cal/${format(
              addMonths(new Date(year, month - 1), -1),
              "yyyy/MM"
            )}`}
          >
            <div className=" text-white text-xs font-bold">{"<"}</div>
          </Link>
          <div className="text-center text-white text-xl font-normal">
            {format(new Date(year, month - 1), "MMMM yyyy")}
          </div>
          <Link
            className="py-1 px-5 bg-brand-purple-mid rounded-md flex-col justify-center items-center gap-2.5 flex"
            href={`/${encodeURI(user.campaign || "")}/cal/${format(
              addMonths(new Date(year, month - 1), 1),
              "yyyy/MM"
            )}`}
          >
            <div className=" text-white text-xs font-bold">{">"}</div>
          </Link>
        </div>
        {/* Days of week */}
        <div className="w-full grid grid-cols-7 justify-items-center gap-2">
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
        {/* Day Grid */}
        <div className="w-full grid grid-cols-7 justify-items-center gap-2">
          {dates.map((day) => (
            <DayButton
              key={day.date.toString()}
              campaign={user.campaign || ""}
              votes={3}
              enabled={user.dm || !day.dmBusy}
              confirmed={false}
              date={day.date}
              selected={
                selectedDate !== null &&
                format(day.date, "dd/MM/yy") ===
                  format(selectedDate, "dd/MM/yy")
              }
              state={
                day.availablePeople.find(
                  (name) => name.toLowerCase() === user.name
                )
                  ? "available"
                  : day.busyPeople.find(
                      (name) => name.toLowerCase() === user.name
                    )
                  ? "busy"
                  : null
              }
            />
          ))}
        </div>
        {/* Date info */}
        <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
          {selectedDate !== null ? (
            <>
              <span className="Day text-brand-purple-light text-base font-normal">
                {format(selectedDate, "MMMM do, yyyy")}
              </span>
              <div className="w-full bg-white rounded border border-brand-green gap-2.5 flex">
                <div className="min-w-12 min-h-full bg-brand-green justify-center items-center gap-1 flex px-4">
                  <h2 className="text-black text-2xl font-bold">
                    {dates[0].availablePeople.length}
                  </h2>
                  <Image src={GroupIcon} alt="Attending members" />
                </div>
                <div className=" w-full min-h-[64px] p-2 justify-start items-start flex-col">
                  {dates[0].availablePeople.length ? (
                    <>
                      <span className="text-black text-sm font-normal">
                        Available:
                        <br />
                      </span>
                      <p className="text-black text-md font-medium">
                        {dates[0].availablePeople.join(", ")}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {dates[0].busyPeople.length ? (
                    <>
                      <span className="text-black text-sm font-normal">
                        Busy:
                        <br />
                      </span>
                      <p className="text-black text-md font-medium">
                        {dates[0].busyPeople.join(", ")}
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
      <Link
        href={`/${user.campaign}`}
        className="underline px-8 py-2 text-brand-purple-light"
      >
        Sign out
      </Link>
    </main>
  );
};

export default CalendarPage;

export function Home() {
  // const setDateAvailable = () =>
  //   console.log("available", selectedDate && dates[selectedDate].date);
  // const setDateBusy = () =>
  //   console.log("busy", selectedDate && dates[selectedDate].date);
  // const requestDate = () =>
  //   console.log("request", selectedDate && dates[selectedDate].date);
  // const confirmDate = () =>
  //   console.log("confirm", selectedDate && dates[selectedDate].date);

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

        {/* <div
          className={`BtnRow self-stretch px-8 justify-between items-center flex ${
            name === "" ? "opacity-10 pointer-events-none" : ""
          }`}
        >
          <ActionButton
            color="text-brand-red"
            label="Busy"
            icon={XIcon}
            onClick={setDateBusy}
          />
          {dmMode ? (
            <ActionButton
              color="text-brand-yellow"
              label="Confirm"
              icon={StarIcon}
              onClick={confirmDate}
            />
          ) : selectedDate !== null &&
            dates[selectedDate].busyPeople.find((name) => name === DM_NAME) ? (
            <ActionButton
              color="text-brand-purple-light"
              label="Request"
              icon={HandIcon}
              onClick={requestDate}
            />
          ) : (
            <></>
          )}
          <ActionButton
            color="text-brand-green"
            label="Available"
            icon={CheckIcon}
            onClick={setDateAvailable}
          />
        </div> */}
      </div>
    </main>
  );
}
