import clsx from "clsx";

interface CardProps {
  badge?: string;
  badgeColor?: string;
  badgeBgColor?: string;
  imageSrc: string;
  userAvatarSrc?: string;
  imageBorder?: string;
  title: string;
  subtitle: string;
  soldCount?: number;
  totalCount?: number;
  showGoldenPack?: boolean;
  className?: string;
}

const Card = ({
  badge = "Moments",
  imageBorder,
  badgeColor = "#C2E8FF",
  badgeBgColor = "#0C6DB6",
  imageSrc,
  userAvatarSrc,
  title,
  subtitle,
  soldCount,
  totalCount,
  showGoldenPack,
  className = "",
}: CardProps) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col p-2.5 gap-10 text-center bg-[url('/images/largeBackCard.svg')]  shrink-0 w-[310px] h-[455px]",
        className,
        imageBorder && "pt-5 px-[25px] gap-15",
      )}
    >
      <div
        className="absolute z-10 top-5 left-5 text-xs py-[5.5px] uppercase px-2.5 rounded-full w-fit"
        style={{ color: badgeColor, backgroundColor: badgeBgColor }}
      >
        {badge}
      </div>
      {imageBorder && (
        <img
          src={imageBorder}
          className="absolute z-0 top-0 left-0 w-full h-[308px]"
          alt="Image border"
        />
      )}
      <div
        className={clsx(
          "relative flex items-center justify-center bg-black rounded-2xl",
          imageBorder ? "h-[260px] w-[260px]" : "h-[290px]",
        )}
      >
        <img
          className="w-[196px] h-[196px] rounded-lg mx-auto object-contain object-center"
          src={imageSrc}
          alt={title}
        />
        {userAvatarSrc && (
          <img
            src={userAvatarSrc}
            className={clsx(
              "w-10 h-10 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              imageBorder && "-bottom-5!",
            )}
            alt="User avatar"
          />
        )}
      </div>
      <div className="flex flex-col gap-2.5 z-10">
        <p className="text-white uppercase">{title}</p>
        <p className="text-sm text-white opacity-60 uppercase">{subtitle}</p>
        {(soldCount !== undefined || totalCount !== undefined) && (
          <div className="flex w-full justify-center items-center gap-2.5">
            {soldCount !== undefined && (
              <div className="bg-[#5C5C5C]/20 px-[18.5px] py-[5.5px] rounded-full flex justify-center items-center gap-[5px]">
                <span className="text-white text-xs opacity-60">Sold</span>
                <span className="text-white text-xs">
                  {soldCount.toLocaleString()}
                </span>
              </div>
            )}
            {totalCount !== undefined && (
              <div className="bg-[#5C5C5C]/20 px-[18.5px] py-[5.5px] rounded-full flex justify-center items-center gap-[5px]">
                <span className="text-white text-xs opacity-60">Total</span>
                <span className="text-white text-xs">
                  {totalCount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {showGoldenPack && (
        <img
          src="/images/goldenPack.png"
          className="z-0 absolute bottom-0 right-0"
          alt="Golden pack"
        />
      )}
    </div>
  );
};

export default Card;
