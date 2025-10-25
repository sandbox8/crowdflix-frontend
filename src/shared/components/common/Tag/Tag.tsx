import React from "react";

interface TagProps {
  title?: string;
  value?: string;
  titleColor?: string;
  valueColor?: string;
  className?: string;
  bgColor?: string;
  padding?: string;
}

const Tag: React.FC<TagProps> = ({
  title = "",
  value = "",
  titleColor = "#A48B6C",
  valueColor = "#FFDEB3",
  className = "inline-flex items-center justify-center py-[5px] px-[10px] rounded-full backdrop-blur text-sm font-medium bg-[#5A3306]",
  bgColor,
  padding,
}) => {
  return (
    <span
      className={className}
      style={{ background: bgColor, padding: padding }}
    >
      {title && <span style={{ color: titleColor }}>{title}</span>}
      {value && (
        <span className="ml-[5px]" style={{ color: valueColor }}>
          {value}
        </span>
      )}
    </span>
  );
};

export default Tag;
