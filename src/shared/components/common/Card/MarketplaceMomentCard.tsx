import type { Moment } from "@/api/moments/getMoments";
import { Button } from "@/shared/components/common/Button/Button";
import { useGetPrice } from "@/shared/hooks/api/price/getPrice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useRedux";
import { setIsOpen } from "@/store/slices/authDrawerSlice";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router";

interface MarketplaceMomentCardProps {
  moment: Moment;
  isProfile?: boolean;
  onClick?: () => void;
}

export const MarketplaceMomentCard = ({
  moment,
  isProfile = false,
  onClick,
}: MarketplaceMomentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { data: oneFlowPrice } = useGetPrice();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-[310px] h-[495px]  bg-[url('/images/marketplaceBackCard.png')] p-2.5 bg-cover bg-center bg-no-repeat relative"
    >
      <div
        className="absolute z-10 top-5 left-5 text-xs py-[5.5px] uppercase px-2.5 rounded-full w-fit"
        style={{ color: "#C2E8FF", backgroundColor: "#0C6DB6" }}
      >
        Moments
      </div>
      <div className="flex flex-col gap-2.5  bg-[url('/images/marketplaceBackCard_2.png')] w-full h-full bg-cover bg-center bg-no-repeat">
        {!isHovered ? (
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={moment.poster_url || ""}
            className="w-[290px] h-[290px] rounded-t-[20px] object-cover"
            alt="marketplace"
          />
        ) : (
          <video
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={moment.video_url || ""}
            className="w-[290px] h-[290px] rounded-t-[20px] object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <div className="flex flex-col justify-center items-center -mt-[5px] z-10 gap-[15px]">
          <div className="flex items-center flex-col ">
            <p className={clsx("text-white ", isProfile && "mt-11")}>
              {moment.title}
            </p>
            <p className="text-xs text-white opacity-60 ">
              {moment.characters?.[0]?.name || ""}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {!isProfile && (
              <div className="flex w-full justify-center items-center gap-2.5">
                <span className="text-white text-xs opacity-60">
                  Lowest Ask
                </span>
                <span className="text-white text-xs">
                  {Number(moment.lowestAsk).toFixed(2)} FLOW
                  {oneFlowPrice && (
                    <span className="text-gray-400 uppercase text-xs ml-[5px]">
                      {" "}
                      ({(Number(moment.lowestAsk) * oneFlowPrice).toFixed(
                        2,
                      )}{" "}
                      USD)
                    </span>
                  )}
                </span>
              </div>
            )}
            {!isProfile && (
              <div className="flex w-full justify-center items-center gap-2.5">
                <span className="text-white text-xs opacity-60">Avg Sale</span>
                <span className="text-white text-xs">
                  {moment.avgSale} FLOW
                  {oneFlowPrice && (
                    <span className="text-gray-400 uppercase text-xs ml-[5px]">
                      {" "}
                      ({(Number(moment.avgSale) * oneFlowPrice).toFixed(2)} USD)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
          {!isProfile && (
            <div className="flex w-full justify-center items-center gap-2.5">
              <div className="bg-[#5C5C5C]/20 px-[18.5px] py-[5.5px] rounded-full flex justify-center items-center gap-[5px]">
                <span className="text-white text-xs opacity-60">Sold</span>
                <span className="text-white text-xs">
                  {moment.soldCount || 0}
                </span>
              </div>
              <div className="bg-[#5C5C5C]/20 px-[18.5px] py-[5.5px] rounded-full flex justify-center items-center gap-[5px]">
                <span className="text-white text-xs opacity-60">Total</span>
                <span className="text-white text-xs">
                  {moment.totalItems || 0}
                </span>
              </div>
            </div>
          )}
        </div>
        {!isProfile && (
          <div className="flex w-full justify-center items-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (user) {
                  navigate(`/payment/${moment.moment_id}`);
                } else {
                  dispatch(setIsOpen(true));
                }
              }}
              className="w-full z-50 max-w-[102px]"
            >
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
