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
    <div className="min-h-screen bg-black text-white pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <img
                src={user?.profile_picture_url || "/images/userpick.png"}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#2AA2FD]/20"
                alt="user"
              />
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#2AA2FD] rounded-full flex items-center justify-center border-4 border-black hover:bg-[#1e90ff] transition-all"
              >
                <Edit size={18} className="text-white" />
              </button>
            </div>
          </div>

          <h1 className="font-black text-5xl lg:text-6xl uppercase mb-3 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            {user?.username}
          </h1>

          <div className="flex items-center justify-center gap-2 text-white/60 mb-8">
            <img src="/images/flag.svg" className="w-4 h-4" alt="country" />
            <span>United States</span>
            <span>•</span>
            <span>Joined November, 2024</span>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
            <div className="text-3xl font-black text-white mb-2">
              {editions?.length || 0}
            </div>
            <div className="text-white/60 text-sm uppercase tracking-wider">
              Total Moments
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600/10 to-purple-600/5 backdrop-blur-xl rounded-2xl border border-purple-600/20 p-6 text-center">
            <div className="text-3xl font-black text-purple-400 mb-2">
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
          <div className="bg-gradient-to-br from-[#2AA2FD]/10 to-[#2AA2FD]/5 backdrop-blur-xl rounded-2xl border border-[#2AA2FD]/20 p-6 text-center">
            <div className="text-3xl font-black text-[#2AA2FD] mb-2">
              {editions?.filter((e) => e.moment.tier === "epic").length || 0}
            </div>
            <div className="text-white/60 text-sm uppercase tracking-wider">
              Epic
            </div>
          </div>
        </div>

        {/* Search & Filter - Consistent with Marketplace */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="font-black text-3xl uppercase text-white">
            My Collection
          </h2>
          <div className="flex gap-3">
            <Input
              radius={100}
              className="w-full sm:w-[240px]"
              classNames={{
                input:
                  "bg-black/40 border h-[40px] border-[#2AA2FD]/40 text-white placeholder:text-white/50 backdrop-blur-sm",
                section: "shrink-0",
              }}
              placeholder="Search moments..."
              leftSection={<SearchNormal1 className="shrink-0" size={20} color="#2AA2FD" />}
              onChange={(event) => debouncedSearch(event.target.value)}
            />
            <div
              className="w-10 h-10 cursor-pointer border rounded-full border-[#2AA2FD]/40 flex items-center justify-center hover:bg-[#2AA2FD]/10 transition-all"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={24} color="#2AA2FD" />
            </div>
          </div>
        </div>

        {/* Moments Grid */}
        <div className="min-h-[350px]">
          {isLoading || isRefetching ? (
            <div className="flex w-full justify-center h-[350px] items-center">
              <Loader size="xl" color="#2AA2FD" />
            </div>
          ) : editions && editions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {editions.map((item) => (
                <HoverVideoMomentCard
                  key={item.edition_id}
                  moment={item.moment}
                  onClick={() => {
                    navigate(
                      `/specific-moment/${item.moment.moment_id}?flow_token_id=${item.flow_token_id}&edition_id=${item.edition_id}`,
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full justify-center items-center h-[350px] flex-col gap-4">
              <div className="text-center max-w-md">
                <h3 className="text-white text-3xl font-black uppercase mb-3">
                  No Moments Yet
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Start your collection by purchasing moments from the
                  marketplace
                </p>
                <UIButton
                  onClick={() => navigate("/marketplace")}
                  className="bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2AA2FD] text-white font-black text-lg uppercase tracking-wider h-14 px-8 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Browse Marketplace
                </UIButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <Drawer
        opened={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        position="right"
        size="lg"
        classNames={{
          header: "hidden",
          body: "p-0 bg-black",
          content: "p-0 bg-black border-l border-white/10",
        }}
      >
        <div className="flex shrink-0 w-full flex-col gap-4 p-6 bg-black">
          <div className="flex w-full justify-between items-center mb-4">
            <h1 className="text-2xl font-black uppercase text-white">
              Filters
            </h1>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="border-[#2AA2FD]/40 text-[#2AA2FD] hover:bg-[#2AA2FD]/10 w-full"
          >
            Clear All Filters
          </Button>
          <div className="flex w-full items-center flex-col gap-2.5">
            <Accordion title="Status" badge={activeStatus ? "1" : undefined}>
              <div className="flex w-full items-center flex-col gap-2 mt-4">
                <div className="flex gap-3 items-center w-full">
                  <div
                    className={clsx(
                      "rounded-full flex font-bold uppercase tracking-wider text-sm items-center justify-center border h-[40px] border-white/20 text-white px-6 cursor-pointer transition-all hover:bg-white/10",
                      {
                        "bg-[#2AA2FD] border-[#2AA2FD] text-white": activeStatus === "listed",
                      },
                    )}
                    onClick={() => setActiveStatus("listed")}
                  >
                    <span>Listed</span>
                  </div>
                  <div
                    className={clsx(
                      "rounded-full flex font-bold uppercase tracking-wider text-sm items-center justify-center border h-[40px] border-white/20 text-white px-6 cursor-pointer transition-all hover:bg-white/10",
                      {
                        "bg-[#2AA2FD] border-[#2AA2FD] text-white": activeStatus === "unlisted",
                      },
                    )}
                    onClick={() => setActiveStatus("unlisted")}
                  >
                    Unlisted
                  </div>
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

