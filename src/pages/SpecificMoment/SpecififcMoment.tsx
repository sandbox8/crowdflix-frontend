import { Button } from "@/shared/components/common/Button/Button";
import InfoRow from "@/shared/components/common/InfoRow/InfoRow";
import Tag from "@/shared/components/common/Tag/Tag";
import { Carousel } from "@mantine/carousel";
import { useParams, useSearchParams } from "react-router";
import { useGetMomentById } from "@/shared/hooks/api/moments/useGetMomentById";
import { Loader } from "@mantine/core";
import Rank from "@/shared/assets/rank-1.svg?react";
import Rank2 from "@/shared/assets/rank-2.svg?react";
import Rank3 from "@/shared/assets/rank-3.svg?react";
import Rank4 from "@/shared/assets/rank-4.svg?react";
import Rank5 from "@/shared/assets/rank-5.svg?react";
import dayjs from "dayjs";
import { Input } from "@/shared/components/form/Input";
import {
  sendPrepareUserTransactionForSell,
  sendTransactionForCancelListing,
  sendTransactionForEditListingPrice,
  sendTransactionForSellNFT,
} from "../Payment/transactions";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useEffect, useMemo, useState } from "react";
import { useGetPrice } from "@/shared/hooks/api/price/getPrice";

export const SpecificMoment = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const flow_token_id = searchParams.get("flow_token_id");
  const edition_id = searchParams.get("edition_id");
  const { data: moment, isLoading } = useGetMomentById(id || "");
  const [price, setPrice] = useState<string>("");
  const { user } = useAppSelector((state) => state.user);
  const { data: oneFlowPrice } = useGetPrice();
  const isListed = useMemo(() => {
    return moment?.activeListings?.some(
      (listing) => listing.edition.edition_id === edition_id,
    );
  }, [moment, edition_id]);

  useEffect(() => {
    if (isListed) {
      const edition = moment?.activeListings?.find(
        (listing) => listing.edition.edition_id === edition_id,
      );
      setPrice(Number(edition?.price).toFixed(2) || "");
    }
  }, [isListed, moment, edition_id]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center h-screen items-center">
        <Loader size="xl" color="#2AA2FD" />
      </div>
    );
  }

  const handleSellMoment = async () => {
    if (user?.is_ready_to_sell) {
      await sendTransactionForSellNFT(
        flow_token_id || "",
        edition_id || "",
        price || "",
      );
    } else {
      await sendPrepareUserTransactionForSell();
    }
  };

  const handleCancelListing = async () => {
    const currentListing = moment?.activeListings?.find(
      (listing) => listing.edition.edition_id === edition_id,
    );
    await sendTransactionForCancelListing(
      currentListing?.listing_id || "",
      flow_token_id || "",
    );
  };

  const handleEditListingPrice = async () => {
    const currentListing = moment?.activeListings?.find(
      (listing) => listing.edition.edition_id === edition_id,
    );
    await sendTransactionForEditListingPrice(
      currentListing?.listing_id || "",
      flow_token_id || "",
      price || "",
    );
  };

  return (
    <div className="flex flex-col lg:flex-row relative w-full  min-h-screen mt-[60px]">
      <section className="lg:w-1/2 w-full    lg:ml-[80px] lg:mr-[40px] mb-[20px] lg:mb-0">
        <div className="flex">
          <ul className="flex justify-between flex-col gap-4 mr-[40px]">
            <li className="max-w-[140px]">
              <img src={moment?.poster_url || ""} alt="detailMoment" />
            </li>
            <li className="max-w-[140px]">
              <img src={moment?.poster_url || ""} alt="detailMoment" />
            </li>
            <li className="max-w-[140px]">
              <img src={moment?.poster_url || ""} alt="detailMoment" />
            </li>
          </ul>
          <div className=" w-full max-w-[460px]">
            <img
              className="w-full"
              src={moment?.poster_url || ""}
              alt="detailMoment"
            />
          </div>
        </div>
      </section>
      <section className=" flex flex-col lg:w-1/2 w-full">
        <div className="flex justify-between gap-2  flex-wrap mb-[25px]">
          <div className="flex">
            <Tag
              className="flex items-center justify-center mr-[2px] py-[5px] px-[14px]  text-white text-xs rounded-full bg-gradient-to-r from-[#9C0322] to-[#6B183A]"
              title={moment?.tier.toUpperCase()}
              titleColor="#fff"
            />
            <Tag
              className="bg-white inline-flex py-[5px] px-[10px] rounded-full text-sm font-medium "
              titleColor="#000"
              title="#3,498"
            />
          </div>
          <div className="flex gap-2">
            <Tag title="Status" value={moment?.status} />
            <Tag title="Scene Type" value={moment?.scene_type} />
          </div>
        </div>
        <div className="flex flex-row lg:mb-[15px] mb-[10px]">
          <h1 className="text-white font-outfit font-semibold text-[52px] leading-[54px] mr-[10px]">
            {moment?.title}
          </h1>
        </div>
        <div className="mb-[40px]">
          <h2 className="text-[#FFDEB3] text-[10px] leading-[14px] uppercase">
            {moment?.movie.title} {moment?.movie.release_year} -{" "}
            {moment?.scene_type}
          </h2>
        </div>
        <div className="bg-[#1A1A1A]/70 backdrop-blur-[35px]  pt-[40px] pb-[45px] px-[40px] rounded-[30px] mb-[40px]">
          <div className="flex justify-between  text-white  ">
            <div className="flex flex-col w-1/2">
              <p className="font-outfit font-normal text-[12px] leading-[14px] tracking-[-0.01em]  mb-[10px]">
                Set Price
              </p>
              <div className="flex items-baseline space-x-1 font-outfit uppercase mb-[32px]">
                <Input
                  className="w-full"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  leftSection={
                    <span className="text-[14px] leading-[34px] tracking-[-0.03em] font-normal text-gray-400 uppercase mr-[5px]">
                      F
                    </span>
                  }
                />
                {oneFlowPrice && (
                  <span className="text-gray-400 uppercase text-xs ml-[5px]">
                    {" "}
                    ({(Number(price) * oneFlowPrice).toFixed(2)} USD)
                  </span>
                )}
              </div>
              <p>
                <span className="text-[14px] leading-[34px] tracking-[-0.03em] font-normal text-gray-400 uppercase mr-[5px]">
                  Avg Sale
                </span>
                <span className="text-[14px] leading-[34px] tracking-[-0.03em] font-normal text-white uppercase mr-[15px]">
                  {Number(moment?.avgSale).toFixed(2)} FLOW
                </span>
                <span className="text-[14px] leading-[34px] tracking-[-0.03em] font-normal text-gray-400 uppercase mr-[5px]">
                  for sale
                </span>
                <span className="text-[14px] leading-[34px] tracking-[-0.03em] font-normal text-white uppercase">
                  {moment?.activeListings?.length}
                </span>
              </p>
            </div>
            <div className="w-1/2 flex flex-col items-end">
              <div className="flex flex-col  gap-2">
                <Button
                  onClick={() => {
                    if (isListed) {
                      handleEditListingPrice();
                    } else {
                      handleSellMoment();
                    }
                  }}
                  className="max-w-[191px] md:block hidden min-h-[60px] py-[14px] px-[30px]"
                >
                  {isListed ? "Change price" : "Sell Moment"}
                </Button>
                {isListed && (
                  <Button
                    onClick={() => {
                      handleCancelListing();
                    }}
                    className="max-w-[191px] md:block hidden min-h-[60px] py-[14px] px-[30px] bg-red-500"
                  >
                    Cancel Listing
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="flex flex-col w-full gap-2">
              <Button
                onClick={() => {
                  if (isListed) {
                    handleEditListingPrice();
                  } else {
                    handleSellMoment();
                  }
                }}
                className="w-full md:hidden block min-h-[60px] py-[14px] px-[30px]"
              >
                {isListed ? "Change price" : "Sell Moment"}
              </Button>
              {isListed && (
                <Button
                  onClick={() => {
                    handleCancelListing();
                  }}
                  className="w-full md:hidden block min-h-[60px] py-[14px] px-[30px] bg-red-500"
                >
                  Cancel Listing
                </Button>
              )}
            </div>
          </div>
        </div>
        {moment?.characters && moment?.characters.length > 0 && (
          <div className="flex p-[40px] bg-[#BD432E]/20 backdrop-blur-[35px] md:flex-row flex-col rounded-[30px] mb-[40px] justify-between">
            <div className="md:max-w-[60%] w-full">
              <h3 className="font-outfit font-normal text-[34px] leading-[34px] tracking-[-0.03em] uppercase text-white mb-[25px]">
                {moment.characters[0].name}
              </h3>
              <img
                className="w-full mb-[25px] md:hidden object-cover "
                src={
                  moment?.characters[0]?.portrait_url ||
                  "/images/IronManDetails.png"
                }
                alt="Character"
              />
              <p className="font-outfit font-normal text-[12px] leading-[18px] text-white max-w-[300px] mb-[25px]">
                {moment.summary}
              </p>
              <div className="flex flex-wrap">
                {moment.characters.map((character, index) => (
                  <InfoRow
                    key={character.character_id}
                    title={`Character ${index + 1}`}
                    value={character.name}
                  />
                ))}
              </div>
            </div>
            <div className="max-w-[23%] hidden md:block">
              <img
                className="w-full "
                src={
                  moment?.characters[0]?.portrait_url ||
                  "/images/IronManDetails.png"
                }
                alt="Character"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col pt-[40px] pr-0 pb-[40px] pl-[40px] bg-[#3941D3]/20 backdrop-blur-[35px] rounded-[30px] mb-[40px] justify-between">
          <div>
            <h3 className="font-outfit font-normal text-[34px] leading-[34px] tracking-[-0.03em] uppercase text-white mb-[10px]">
              {moment?.movie.title}:{" "}
              <span className="text-gray-400">{moment?.scene_type}</span>{" "}
              <span className="font-outfit font-medium text-[12px] leading-[22px] tracking-[-0.01em] uppercase text-gray-400">
                {moment?.movie.release_year}
              </span>
            </h3>
            <div className="mb-[25px]">
              {moment?.tags &&
                moment?.tags.map((tag) => (
                  <Tag key={tag.tag_id} title={tag.name} titleColor="#FFDEB3" />
                ))}
            </div>
          </div>
          <div className="mb-[25px]">
            <Carousel
              slideGap={10}
              slideSize="25%"
              emblaOptions={{
                loop: true,
                align: "start",
                slidesToScroll: 3,
              }}
              withControls={false}
              classNames={{
                indicator: "bg-white w-[10px] h-[10px] rounded-full",
              }}
              className="w-full max-w-[100%]"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Carousel.Slide key={index}>
                  <div className=" flex flex-col mr-[15px] text-center shrink-0 w-[210px]">
                    <img
                      className="w-[210px] h-[310px]  mx-auto"
                      src={moment?.movie.poster_url || ""}
                      alt={`${moment?.movie.title} poster`}
                    />
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
          <div className="flex flex-wrap lg:pr-[40px]">
            <InfoRow title="Movie Title" value={moment?.movie.title} />
            <InfoRow
              title="Release Year"
              value={moment?.movie.release_year.toString()}
            />
            <InfoRow title="Scene Type" value={moment?.scene_type} />
            <InfoRow title="Status" value={moment?.status} />
            <InfoRow title="Tier" value={moment?.tier} />
            <InfoRow
              title="Created At"
              value={dayjs(moment?.created_at).format("DD.MM.YYYY")}
            />
          </div>
        </div>
        <div className="flex flex-col md:p-[40px] p-[20px]  bg-[#1A1A1A]/70 backdrop-blur-[35px] rounded-[30px] mb-[40px]">
          <div className="flex">
            <h2 className="font-outfit font-semibold text-[22px] leading-[22px] text-white">
              WEEKLY LEADERBOARD
            </h2>
          </div>
          <div className="w-full lg:max-w-3xl  mx-auto mt-8 ">
            <div className="grid grid-cols-5 items-center text-xs text-gray-400 mb-2 px-8">
              <div className="col-span-1 ">RANK</div>
              <div className="col-span-1 lg:block hidden">COLLECTIONS</div>
              <div className="col-span-1">RANK</div>
              <div className="col-span-2">USERNAME</div>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 items-center bg-[#442326]/70 backdrop-blur-[40px] rounded-[32px] py-4 mb-2 px-8">
              <Rank className="w-8 h-8" />
              <div className="font-outfit font-medium text-[14px] lg:block hidden leading-[14px] tracking-[-0.01em] text-white">
                5
              </div>
              <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                #2
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <img
                  src="/images/userpick.png"
                  className="w-8 h-8 rounded-full ring-2 ring-[#FF3636]"
                  alt="avatar"
                />
                <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis  font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  @num1SEAfANSD
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 items-center py-3 px-8">
              <Rank2 className="w-8 h-8" />
              <div className="font-outfit font-medium text-[14px] lg:block hidden leading-[14px] tracking-[-0.01em] text-white">
                17
              </div>
              <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                #1
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <img
                  src="/images/userpick.png"
                  className="w-8 h-8 rounded-full ring-2 ring-[#C8FE36]"
                  alt="avatar"
                />
                <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis  font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  @EWW
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-4 items-center py-3 px-8">
              <Rank3 className="w-8 h-8" />
              <div className="font-outfit font-medium lg:block hidden text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                45
              </div>
              <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                #3
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <img
                  src="/images/userpick.png"
                  className="w-8 h-8 rounded-full ring-2 ring-[#FFD800]"
                  alt="avatar"
                />
                <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis  font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  @wemby
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-4 items-center py-3 px-8">
              <Rank4 className="w-8 h-8" />
              <div className="font-outfit lg:block hidden font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                17
              </div>
              <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                #4
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <img
                  src="/images/userpick.png"
                  className="w-8 h-8 rounded-full ring-2 ring-[#00C9FF]"
                  alt="avatar"
                />
                <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis  font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  @MaktW2n
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-4 items-center py-3 px-8">
              <Rank5 className="w-8 h-8" />
              <div className="font-outfit lg:block hidden font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                3
              </div>
              <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                #5
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <img
                  src="/images/userpick.png"
                  className="w-8 h-8 rounded-full ring-2 ring-[#FF3636]"
                  alt="avatar"
                />
                <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis  font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  @SEAfANSD
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-4 items-center py-3 px-8">
              <Rank className="w-8 h-8" />
              <div className="font-outfit lg:block hidden font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                72
              </div>
              <div className="font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                #6
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <img
                  src="/images/userpick.png"
                  className="w-8 h-8 rounded-full ring-2 ring-[#FFD800]"
                  alt="avatar"
                />
                <span className="font-outfit text-overflow-ellipsis overflow-hidden text-ellipsis  font-medium text-[14px] leading-[14px] tracking-[-0.01em] text-white">
                  @Twtbttttt
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#18181B] rounded-[30px] md:p-[40px] p-[20px] w-full mb-[40px]">
            <h2 className="font-outfit font-semibold text-[22px] leading-[22px] tracking-[0px] text-white mb-[30px]">
              Latest Bids
            </h2>

            <div className="mb-10">
              <div className="text-white/70 font-outfit font-medium text-[14px] leading-[14px] tracking-[-0.01em] mb-[30px]">
                HISTORY
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/userpick.png"
                      alt=""
                      className="w-10 h-10  rounded-full ring-2 ring-[#FFD800]"
                    />
                    <span className=" text-white font-medium text-overflow-ellipsis overflow-hidden text-ellipsis  md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      @wemby
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 font-medium md:text-[14px] text-[12px]  leading-[14px] tracking-[-0.01em]">
                      $8.00
                    </span>
                    <span className="text-white/40 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      FLOW
                    </span>
                    <span className="text-white/70 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em] ml-6">
                      AT 05:00 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/userpick.png"
                      alt=""
                      className="w-10 h-10 rounded-full ring-2 ring-[#00C9FF]"
                    />
                    <span className="text-white font-medium text-overflow-ellipsis overflow-hidden text-ellipsis  md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      @MaktW2n
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      $10.00
                    </span>
                    <span className="text-white/40 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      FLOW
                    </span>
                    <span className="text-white/70 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em] ml-6">
                      AT 05:25 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/userpick.png"
                      alt=""
                      className="w-10 h-10 rounded-full ring-2 ring-[#FF3636]"
                    />
                    <span className="text-white font-medium text-overflow-ellipsis overflow-hidden text-ellipsis  md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      @SEAfANSD
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      $11.00
                    </span>
                    <span className="text-white/40 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                      FLOW
                    </span>
                    <span className="text-white/70 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em] ml-6">
                      AT 07:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white/70 font-outfit font-semibold text-[16px] mb-4">
              HIGHEST BID:
            </div>
            <div className="flex items-center  justify-between bg-[#232348] rounded-[24px] px-6 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/images/userpick.png"
                  alt=""
                  className="w-10 h-10  rounded-full ring-2 ring-[#FFD800]"
                />
                <span className="text-white font-medium text-overflow-ellipsis overflow-hidden text-ellipsis  md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                  @Twtbttttt
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/90 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                  $13.00
                </span>
                <span className="text-white/40 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em]">
                  FLOW
                </span>
                <span className="text-white/70 font-medium md:text-[14px] text-[12px] leading-[14px] tracking-[-0.01em] ml-6">
                  AT 09:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <div className="bg-[#18181B] items-center justify-center  flex flex-wrap rounded-[30px] p-[40px] w-full max-w-5xl mx-auto  gap-8">
           
            <div className="bg-gradient-to-br from-[#3B1952]  via-[#24113B] min-w-[160px] to-[#18181B] rounded-[32px] p-8 flex flex-col items-center">
              <div className="w-28 h-3 rounded-[12px] bg-gradient-to-r from-[#A136E2] to-[#7035FF] opacity-80 mb-5" />
              <InfoRow title="UNLISTED" value="OWNED" />
              <div className="font-outfit font-medium text-[34px] leading-[34px] tracking-[-0.03em] text-white px-5 py-2">
                306
              </div>
            </div>
      
            <div className="bg-gradient-to-br from-[#212142] via-[#222D60] min-w-[160px] to-[#18181B] rounded-[32px] p-8 flex flex-col items-center">
              <div className="w-28 h-3 rounded-[12px] bg-gradient-to-r from-[#4266F6] to-[#12B8F6] opacity-80 mb-5" />
              <InfoRow title="FOR SALE" value="OWNED" />
              <div className="font-outfit font-medium text-white text-[34px] leading-[34px] tracking-[-0.03em]  rounded-lg px-5 py-2">
                198
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#193952] via-[#164A6E] min-w-[160px] to-[#18181B] rounded-[32px] p-8 flex flex-col items-center">
              <div className="w-28 h-3 rounded-[12px] bg-gradient-to-r from-[#4EDEFB] to-[#179FE9] opacity-80 mb-5" />
              <InfoRow title="LOCKED" value="OWNED" />
              <div className="font-outfit font-medium text-[34px] leading-[34px] tracking-[-0.03em] text-white px-5 py-2">
                459
              </div>
            </div>
      
            <div className="bg-gradient-to-br from-[#143D30] via-[#1F3928] min-w-[160px] to-[#18181B] rounded-[32px] p-8 flex flex-col items-center">
              <div className="w-28 h-3 rounded-[12px] bg-gradient-to-r from-[#48B968] to-[#A8EB36] opacity-80 mb-5" />
              <div className="font-outfit font-normal text-[10px] leading-[14px] tracking-[-0.01em] text-white">
                HIDDEN IN PACKS
              </div>

              <div className="font-outfit font-medium text-[34px] leading-[34px] tracking-[-0.03em] text-white px-5 py-2">
                1.389
              </div>
            </div>
      
            <div className="bg-gradient-to-br from-[#595D1A] via-[#47471C] min-w-[160px] to-[#18181B] rounded-[32px] p-8 flex flex-col items-center">
              <div className="w-28 h-3 rounded-[12px] bg-gradient-to-r from-[#E2CF36] to-[#B0A623] opacity-80 mb-5" />
              <div className="font-outfit font-normal text-[10px] leading-[14px] tracking-[-0.01em] text-white">
                IN THE LOCKER
              </div>
              <div className="font-outfit font-medium text-[34px] leading-[34px] tracking-[-0.03em] text-white px-5 py-2">
                94
              </div>
            </div>
         
            <div className="bg-gradient-to-br  min-w-[160px] from-[#5E231C] via-[#321914] to-[#18181B] rounded-[32px] p-8 flex flex-col items-center">
              <div className="w-28 h-3 rounded-[12px] bg-gradient-to-r from-[#E26436] to-[#E23836] opacity-80 mb-5" />
              <div className="font-outfit font-normal text-[10px] leading-[14px] tracking-[-0.01em] text-white">
                BURNED
              </div>
              <div className="font-outfit font-medium text-[34px] leading-[34px] tracking-[-0.03em] text-white px-5 py-2">
                35
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default SpecificMoment;
