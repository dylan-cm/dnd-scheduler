"use client";

import Image from "next/image";
import LinkIcon from "@/assets/link.svg";
import { useEffect, useState } from "react";

interface LinkCopierProps {
  link: string;
}

const LinkCopier = ({ link }: LinkCopierProps) => {
  const [copied, setCopied] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const fadeTimeout = setTimeout(() => {
        setOpacity(0);
      }, 1000); // start fading out after 1 second

      const hideTimeout = setTimeout(() => {
        setCopied(false);
        setOpacity(1); // reset opacity for next use
      }, 2000); // hide and reset after 2 seconds

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [copied]);

  return (
    <div className="relative">
      <button onClick={copyLink} className="focus:outline-none">
        <Image
          src={LinkIcon}
          alt="Copy link to campaign"
          className="cursor-pointer"
        />
      </button>
      {copied && (
        <div
          className="absolute -bottom-20 inset-0 flex items-center justify-center z-10 transition-opacity duration-1000"
          style={{ opacity: opacity }}
        >
          <div className="relative p-1 bg-brand-purple-light text-white text-xs font-semibold rounded shadow-md">
            Copied!
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid #B097F6",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkCopier;
