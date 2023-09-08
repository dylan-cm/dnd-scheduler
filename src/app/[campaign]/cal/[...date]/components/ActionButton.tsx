"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface ActionButtonProps {
  color: string;
  label: string;
  icon: string | StaticImport;
  onClick: () => void;
}
const ActionButton = ({ color, label, icon, onClick }: ActionButtonProps) => {
  return (
    <button
      className="AvailableBtn flex flex-col gap-1 items-center"
      onClick={onClick}
    >
      <Image src={icon} alt={`Set ${label}`} />
      <span
        className={`BtnLabel left-0 top-[48px]  text-center text-sm font-normal ${color}`}
      >
        {label}
      </span>
    </button>
  );
};

export default ActionButton;
