import React from "react";

interface InfoRowProps {
  title?: string;
  value?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ title = "", value = "" }) => {
  return (
    <p className="flex items-center shrink-0 mr-[10px] mb-[10px]  flex-wrap">
      <span className="font-outfit font-normal text-[10px]  leading-[14px] tracking-[-0.01em] uppercase text-white/60 ">
        {title}
      </span>
      <span className="font-medium text-[14px] leading-[14px] md:max-w-[350px] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap tracking-[-0.01em] text-white ml-1 uppercase">
        {value}
      </span>
    </p>
  );
};

export default InfoRow;
