import { Accordion } from "@/shared/components/common/Acordion/Accordion";
import { Button } from "@/shared/components/common/Button/Button";
import { Button as UIButton } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/common/Checkbox/Checkbox";
import { Drawer, Input, Loader } from "@mantine/core";
import clsx from "clsx";
import { ArrowRight, Edit, Filter, SearchNormal1 } from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { HoverVideoMomentCard } from "@/shared/components/common/HoverVideoMomentCard";

import { useAppSelector } from "@/shared/hooks/useRedux";

import { EditProfileModal } from "./components/EditProfileModal/EditProfileModal";
import { useNavigate } from "react-router";
import { useGetMyEditions } from "@/shared/hooks/api/editions/getMyEditions";
import { useDebouncedCallback } from "@mantine/hooks";
import { enqueueSnackbar } from "notistack";

export const Profile = () => {
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState<
    "listed" | "unlisted" | undefined
  >();

  const [activeTier, setActiveTier] = useState<
    "common" | "rare" | "epic" | "legendary" | undefined
  >();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const user = useAppSelector((state) => state.user.user);

  const {
    data: editions,
    isLoading,
    isRefetching,
    refetch,
  } = useGetMyEditions(activeStatus, activeTier, search);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 500);
  const resetFilters = () => {
    setActiveStatus(undefined);
    setActiveTier(undefined);
    setSearch("");
  };

  // Auto-refresh logic for successful payments
  useEffect(() => {
    const fromPayment = sessionStorage.getItem('payment_success');
    if (fromPayment) {
      // Show toast notification
      enqueueSnackbar("Checking for new moments...", {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      
      // Refetch editions to get latest data
      refetch();
      
      // Clear the session flag
      sessionStorage.removeItem('payment_success');
      
      // Show success toast after a short delay (to allow refetch to complete)
      setTimeout(() => {
        enqueueSnackbar("New moment added to your collection!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }, 1000);
    }
  }, [refetch]);
  return (
    <div className="flex w-full flex-col gap-4 relative ">
      <div className="absolute top-15 flex justify-between w-full ">
        <img
          src="/images/marketplace_hero_1.png"
          className=" h-fit   object-cover "
          alt="marketplace"
        />
        <img
          src="/images/marketplace_hero_2.png"
          className=" overflow-hidden h-fit  object-cover"
          alt="marketplace"
        />
      </div>
      <div className="flex w-full text-center justify-center gap-[15px] z-10 flex-col items-center mt-20">
        <div className="flex  justify-center items-center border border-[#FD4725]/40 p-3 bg-[#FD4725]/5 rounded-full">
          <img
            src={user?.profile_picture_url || "/images/userpic.png"}
            className="w-[127px] h-[127px] rounded-full object-cover"
            alt="user"
          />
        </div>
        <h1 className="text-[52px] font-semibold leading-6 text-white">
          {user?.username}
        </h1>
        <div className="flex wf items-center bg-[#EF870A]/20 gap-2.5 px-2.5 py-[5px] mt-2 rounded-full">
          <div className="flex items-center gap-[5px]">
            <img src="/images/flag.svg" className="size-4" alt="verified" />
            <p className="text-white text-xs">
              <strong className="text-[#FFDEB3]">United States |</strong>{" "}
              <span className="text-[#FFDEB3]">Joined November, 2024 </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div
            className="w-10 h-10 cursor-pointer border rounded-full border-[#FFAD14]/40 flex items-center justify-center bg-[#FFAD14]/5"
            onClick={() => setIsEditProfileOpen(true)}
          >
            <Edit size={24} className="text-[#FFAD14]" />
          </div>
          {/* <div
            className="w-10 h-10 cursor-pointer border rounded-full bg-[#2AA2FD]/5 border-[#2AA2FD]/40 flex items-center justify-center"
            onClick={() => setIsFilterOpen(true)}
          >
            <ShareIcon className="size-6" />
          </div> */}
        </div>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-3xl font-black text-white mb-2">
            {editions?.length || 0}
          </div>
          <div className="text-white/60 text-sm uppercase tracking-wider">
            Total Moments
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2AA2FD]/10 to-[#2AA2FD]/5 backdrop-blur-xl rounded-2xl border border-[#2AA2FD]/20 p-6 text-center">
          <div className="text-3xl font-black text-[#2AA2FD] mb-2">
            {editions?.filter((e) => e.moment.tier === "legendary").length || 0}
          </div>
          <div className="text-white/60 text-sm uppercase tracking-wider">
            Legendary
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-6 text-center">
          <div className="text-3xl font-black text-orange-400 mb-2">
            {editions?.filter((e) => e.moment.tier === "rare").length || 0}
          </div>
          <div className="text-white/60 text-sm uppercase tracking-wider">
            Rare
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 text-center">
          <div className="text-3xl font-black text-purple-400 mb-2">
            {editions?.filter((e) => e.moment.tier === "epic").length || 0}
          </div>
          <div className="text-white/60 text-sm uppercase tracking-wider">
            Epic
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row w-full justify-between gap-4 mt-10">
        <div className="flex lg:w-full justify-start lg:justify-start gap-4 z-10 overflow-x-auto" />
        <div className="flex w-full  lg:flex-row gap-4 justify-end">
          <Input
            radius={100}
            className="lg:max-w-[240px] w-full "
            classNames={{
              input:
                "bg-[#1A1A1A] border  h-[40px] border-[#FFC03F]/40 text-[#FFDD99] placeholder:text-[#FFDD99] bg-[#FD4725]/5",
              section: "shrink-0 ",
            }}
            placeholder="Search"
            leftSection={
              <SearchNormal1 className="shrink-0" size={20} color="#FFDD99" />
            }
            onChange={(event) => debouncedSearch(event.target.value)}
          />
          <div className="flex lg:w-auto gap-2.5">
            <div
              className="w-10 h-10 cursor-pointer border rounded-full shrink-0  border-[#2AA2FD]/40 flex items-center justify-center"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={24} color="#2AA2FD" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full min-h-[350px]  mt-10 ">
        <div className="flex w-full justify-center">
          <div className="flex   items-center lg:justify-between justify-center gap-4 flex-wrap">
            {isLoading || isRefetching ? (
              <div className="flex w-full justify-center h-[350px] items-center">
                <Loader size="xl" color="#2AA2FD" />
              </div>
            ) : editions && editions.length > 0 ? (
              editions.map((item) => (
                <HoverVideoMomentCard
                  key={item.edition_id}
                  moment={item.moment}
                  onClick={() => {
                    navigate(
                      `/specific-moment/${item.moment.moment_id}?flow_token_id=${item.flow_token_id}&edition_id=${item.edition_id}`,
                    );
                  }}
                />
              ))
            ) : (
              <div className="flex w-full justify-center items-center h-[350px] flex-col gap-4">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    No Moments Yet
                  </h3>
                  <p className="text-white/60 mb-6">
                    Start your collection by purchasing moments from the
                    marketplace
                  </p>
                  <UIButton
                    onClick={() => navigate("/marketplace")}
                    className="bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2AA2FD] text-white font-bold px-8"
                  >
                    Browse Marketplace
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </UIButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        opened={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        position="right"
        size="lg"
        classNames={{
          header: "hidden",
          body: "p-0 bg-[#121212]",
          content: "p-0 bg-[#121212]",
        }}
      >
        <div className="flex shrink-0 w-full flex-col gap-4 p-2.5 pt-5 bg-[#121212]  rounded-[30px]">
          <div className="flex w-full px-5 justify-between items-center">
            <Button
              classNames={{
                root: "bg-transparent underline text-[#2AA2FD]",
              }}
              onClick={resetFilters}
            >
              Clear All
            </Button>
            <h1
              onClick={() => setIsFilterOpen(false)}
              className="text-[22px] cursor-pointer flex items-center gap-2.5 font-semibold text-white"
            >
              Add filters
              <ArrowRight size={24} />
            </h1>
          </div>
          <div className="flex w-full items-center flex-col gap-2.5">
            <Accordion title="Status" badge={activeStatus ? "1" : undefined}>
              <div className="flex w-full items-center flex-col gap-2 mt-[15px]">
                <div className="flex gap-2.5 items-center  justify-between">
                  <div
                    className={clsx(
                      "rounded-full flex font-bold -tracking-normal leading-4 items-center justify-center border h-[40px] border-white/20 text-white px-4  cursor-pointer",
                      {
                        "bg-white text-black!": activeStatus === "listed",
                      },
                    )}
                    onClick={() => setActiveStatus("listed")}
                  >
                    <span>Listed</span>
                  </div>
                  <div
                    className={clsx(
                      "rounded-full flex font-bold  leading-4 items-center justify-center border h-[40px] border-white/20 text-white px-4  cursor-pointer",
                      {
                        "bg-white text-black!": activeStatus === "unlisted",
                      },
                    )}
                    onClick={() => setActiveStatus("unlisted")}
                  >
                    Unlisted
                  </div>
                  {/* <div
                    className={clsx(
                      "rounded-full  flex font-bold leading-4 items-center justify-center border h-[40px] border-white/20 text-white px-4  cursor-pointer",
                      {
                        "bg-white text-black!": activeStatus === "All",
                      },
                    )}
                    onClick={() => setActiveStatus("All")}
                  >
                    &
                  </div> */}
                </div>
              </div>
            </Accordion>
            <Accordion title="Tier" badge={activeTier ? "1" : undefined}>
              <div className="flex w-full flex-col mt-[15px]">
                <div className="flex flex-col gap-2">
                  <Checkbox
                    checked={activeTier === "common"}
                    label="Common"
                    width={26}
                    height={26}
                    onChange={() => setActiveTier("common")}
                  />
                  <Checkbox
                    checked={activeTier === "rare"}
                    label="Rare"
                    width={26}
                    height={26}
                    onChange={() => setActiveTier("rare")}
                  />
                  <Checkbox
                    checked={activeTier === "epic"}
                    label="Epic"
                    width={26}
                    height={26}
                    onChange={() => setActiveTier("epic")}
                  />
                  <Checkbox
                    checked={activeTier === "legendary"}
                    label="Legendary"
                    width={26}
                    height={26}
                    onChange={() => setActiveTier("legendary")}
                  />
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </Drawer>
      <EditProfileModal
        opened={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
};
