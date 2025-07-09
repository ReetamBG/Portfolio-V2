import React from "react";

const SectionHeader = ({
  text,
  icon,
  order = "normal",
}: {
  text: string;
  icon: React.ReactNode;
  order?: "normal" | "reversed";
}) => {
  return (
    <div>
      <h3
        className={`font-bold text-xl sm:text-3xl ${
          order === "normal" ? "text-left" : "text-right"
        }`}
      >
        {text}
      </h3>
      <div className="relative">
        <hr className="border-t-2 border-foreground/40 mt-2 mb-10 sm:mb-14" />
        <span
          className={`bg-foreground text-background p-2 sm:p-4 rounded-full absolute -top-5 sm:-top-7 ${
            order === "normal" ? "right-5 sm:right-7" : "left-5 sm:left-7"
          }`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
};

export default SectionHeader;
