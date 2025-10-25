import { Accordion } from "@/shared/components/common/Acordion/Accordion";
import { Button } from "@/shared/components/common/Button/Button";
import { Checkbox } from "@/shared/components/common/Checkbox/Checkbox";
import {
  Drawer,
  Input,
  Loader,
  NumberInput,
  Select,
  Slider,
} from "@mantine/core";
import clsx from "clsx";
import { ArrowLeft, Filter, SearchNormal1 } from "iconsax-reactjs";
import { useState } from "react";
import { PremiumMomentCard } from "@/shared/components/common/Card/PremiumMomentCard";
import { useGetMoments } from "@/shared/hooks/api/moments/useGetMoments";
import { useDebouncedCallback } from "@mantine/hooks";
import { useGetCharacters } from "@/shared/hooks/api/characters/useGetCharacters";
import { useNavigate } from "react-router";
import { useGetUniverse } from "../SignIn/hooks/api/universe/useGetUniverse";

// const activeFilter = {
//   All: "created_at",
//   "Latest Purchases": "sold_date",
//   "Top Purchases": "most_sold",
// };

export const Marketplace = () => {
  const navigate = useNavigate();

  const [activeStatus, setActiveStatus] = useState<
    "listed" | "unlisted" | undefined
  >();

  const [activeTier, setActiveTier] = useState<
    "common" | "rare" | "epic" | "legendary" | undefined
  >();

  const [sortBy, setSortBy] = useState<
    | "avg_sale"
    | "created_at"
    | "tier"
    | "most_sold"
    | "sold_date"
    | "status"
    | "lowest_ask"
  >("avg_sale");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedUniverse, setSelectedUniverse] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const { data: characters } = useGetCharacters({
    page: 1,
    limit: 100,
  });

  const { data: universes } = useGetUniverse({ page: 1, limit: 100 });

  const {
    data: moments,
    isLoading,
    isRefetching,
  } = useGetMoments({
    page: 1,
    limit: 8,
    sortBy: sortBy,
    sortOrder: "DESC",
    status: activeStatus,
    universe: selectedUniverse,
    tier: activeTier,
    price: price,
    search: search,
    characters: selectedCharacters,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const debouncedSearch = useDebouncedCallback(handleSearch, 500);
  const resetFilters = () => {
    setActiveStatus(undefined);
    setActiveTier(undefined);
    setSelectedCharacters([]);
    setSearch("");
  };
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* AMBIENT GLOW EFFECTS - Same as landing page */}
      <div
        className="absolute top-[15%] left-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(42,162,253,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,74,60,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* MAIN CONTENT - Full width with centered content */}
      <div className="relative z-30 flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-5">
        <div className="flex w-full text-center justify-center flex-col items-center mt-8">
          <h1
            className="font-['Sofia_Sans',sans-serif] font-black uppercase text-center mb-3 sm:mb-5 px-2"
            style={{
              fontSize: "clamp(36px, 8vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #CBF6FF 50%, #2AA2FD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 80px rgba(42,162,253,0.3)",
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.4))",
            }}
          >
            Marketplace
          </h1>
          <p
            className="text-gray-400 leading-relaxed mb-4"
            style={{
              fontSize: "clamp(12px, 3.5vw, 16px)",
            }}
          >
            Discover, buy, and sell moments. Explore the world of Crowdflix!
          </p>

          {/* Quick Stats */}
          {moments && moments.length > 0 && (
            <div className="flex gap-6 justify-center text-sm mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[#2AA2FD] font-bold">
                  {moments.length}
                </span>
                <span className="text-white/60">Moments Available</span>
              </div>
            </div>
          )}
        </div>

        {/* SEARCH & FILTER SECTION - Glass morphism */}
        <div className="bg-[#1A1A1A]/70 backdrop-blur-[35px] border border-white/10 rounded-[30px] p-6 sm:p-8 mt-6">
          <div className="flex flex-col-reverse lg:flex-row w-full justify-between gap-4">
            <div className="flex w-full flex-col lg:flex-row gap-4">
              <Input
                radius={100}
                className="lg:max-w-[240px] w-full"
                classNames={{
                  input:
                    "bg-black/40 border h-[40px] border-[#2AA2FD]/40 text-white placeholder:text-white/50 backdrop-blur-sm hover:border-[#2AA2FD]/60 focus:border-[#2AA2FD] transition-colors",
                }}
                placeholder="Search moments..."
                leftSection={<SearchNormal1 size={20} color="#2AA2FD" />}
                onChange={(event) => debouncedSearch(event.target.value)}
              />
              <div className="flex w-full lg:w-auto gap-2.5">
                <div
                  className="w-10 h-10 cursor-pointer border rounded-full shrink-0 lg:hidden border-[#2AA2FD]/40 flex items-center justify-center backdrop-blur-sm hover:border-[#2AA2FD] transition-colors"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter size={24} color="#2AA2FD" />
                </div>
                <Select
                  radius={100}
                  className="lg:max-w-[240px] w-full"
                  classNames={{
                    input:
                      "bg-black/40 border h-[40px] border-[#2AA2FD]/40 text-white placeholder:text-white/50 backdrop-blur-sm hover:border-[#2AA2FD]/60 transition-colors",
                    dropdown:
                      "bg-[#1A1A1A] backdrop-blur-xl border border-[#2AA2FD]/30 text-white rounded-[10px]",
                    option: "hover:bg-[#2AA2FD]/20 hover:text-white text-white",
                  }}
                  placeholder="Sort by"
                  onChange={(value) => {
                    if (value) {
                      setSortBy(
                        value as
                          | "avg_sale"
                          | "created_at"
                          | "tier"
                          | "most_sold"
                          | "sold_date"
                          | "status"
                          | "lowest_ask",
                      );
                    }
                  }}
                  data={[
                    { value: "created_at", label: "Newest" },
                    { value: "tier", label: "Tier" },
                    { value: "most_sold", label: "Top Purchases" },
                    { value: "sold_date", label: "Latest Purchases" },
                    { value: "avg_sale", label: "Avg Sale" },
                    { value: "lowest_ask", label: "Lowest Ask" },
                    { value: "status", label: "Status" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:w-full justify-start   lg:justify-end gap-4 z-10 overflow-x-auto">
          <div className="flex w-full gap-2.5  justify-start lg:justify-end">
            {/* <div
              className={clsx(
                "rounded-full flex items-center justify-center border h-[40px] border-white/20 text-white px-5  cursor-pointer",
                {
                  "bg-white text-black!": activeFilter === "Packs",
                },
              )}
              onClick={() => setActiveFilter("Packs")}
            >
              Packs
            </div> */}
            {/* <div
              className={clsx(
                "rounded-full flex items-center justify-center border h-[40px] border-white/20 text-white px-5  cursor-pointer",
                {
                  "bg-white text-black!": activeFilter === "Moments",
                },
              )}
              onClick={() => setActiveFilter("Moments")}
            >
              Moments
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex w-full mt-6">
        <div className="lg:flex hidden w-[360px] shrink-0 flex-col gap-4">
          <div className="flex shrink-0 w-full flex-col gap-4 p-6 bg-[#1A1A1A]/70 backdrop-blur-[35px] border border-white/10 rounded-[30px]">
            <div className="flex w-full px-5 justify-between items-center">
              <h1 className="text-[22px] font-semibold text-white">
                Add filters
              </h1>
              {(activeStatus ||
                activeTier ||
                selectedCharacters.length > 0 ||
                search) && (
                <Button
                  classNames={{
                    root: "bg-transparent underline text-[#2AA2FD]",
                  }}
                  onClick={resetFilters}
                >
                  Clear All
                </Button>
              )}
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
                      onChange={() => {
                        if (activeTier === "common") {
                          setActiveTier(undefined);
                        } else {
                          setActiveTier("common");
                        }
                      }}
                    />
                    <Checkbox
                      checked={activeTier === "rare"}
                      label="Rare"
                      width={26}
                      height={26}
                      onChange={() => {
                        if (activeTier === "rare") {
                          setActiveTier(undefined);
                        } else {
                          setActiveTier("rare");
                        }
                      }}
                    />
                    <Checkbox
                      checked={activeTier === "epic"}
                      label="Epic"
                      width={26}
                      height={26}
                      onChange={() => {
                        if (activeTier === "epic") {
                          setActiveTier(undefined);
                        } else {
                          setActiveTier("epic");
                        }
                      }}
                    />
                    <Checkbox
                      checked={activeTier === "legendary"}
                      label="Legendary"
                      width={26}
                      height={26}
                      onChange={() => {
                        if (activeTier === "legendary") {
                          setActiveTier(undefined);
                        } else {
                          setActiveTier("legendary");
                        }
                      }}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion
                title="Universe"
                badge={
                  selectedUniverse.length > 0
                    ? selectedUniverse.length.toString()
                    : undefined
                }
              >
                <div className="flex w-full flex-col gap-2  mt-[15px]">
                  <Select
                    radius={100}
                    multiple
                    className="max-w-[240px]"
                    searchable
                    placeholder="Select here"
                    data={universes?.map((universe) => ({
                      value: universe.universe_id,
                      label: universe.name,
                    }))}
                    classNames={{
                      input:
                        "bg-black/40 border h-[40px] text-white border-[#2AA2FD]/40 placeholder:text-white/50 backdrop-blur-sm hover:border-[#2AA2FD]/60 transition-colors",
                      dropdown:
                        "bg-[#1A1A1A] backdrop-blur-xl border border-[#2AA2FD]/30 text-white rounded-[10px]",
                      option:
                        "hover:bg-[#2AA2FD]/20 hover:text-white text-white",
                    }}
                    onChange={(value) => {
                      if (value) {
                        if (selectedUniverse.includes(value)) {
                          setSelectedUniverse(
                            selectedUniverse.filter((u) => u !== value),
                          );
                        } else {
                          setSelectedUniverse([...selectedUniverse, value]);
                        }
                      }
                    }}
                  />
                  <div className="flex w-full flex-col gap-2">
                    {selectedUniverse.map((universe) => (
                      <div
                        key={universe}
                        className="text-white flex items-center  gap-2"
                      >
                        <img
                          src={
                            universes?.find((u) => u.universe_id === universe)
                              ?.logo_url
                          }
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {
                          universes?.find((u) => u.universe_id === universe)
                            ?.name
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion>
              <Accordion
                title="Characters"
                badge={
                  selectedCharacters.length > 0
                    ? selectedCharacters.length.toString()
                    : undefined
                }
              >
                <div className="flex w-full flex-col gap-2 mt-[15px]">
                  <Select
                    radius={100}
                    key={selectedCharacters.join(",")}
                    searchable
                    className="max-w-[240px]"
                    placeholder="Select here"
                    data={characters?.map((character) => ({
                      value: character.character_id,
                      label: character.name,
                    }))}
                    withCheckIcon={false}
                    classNames={{
                      input:
                        "bg-black/40 border h-[40px] text-white border-[#2AA2FD]/40 placeholder:text-white/50 backdrop-blur-sm hover:border-[#2AA2FD]/60 transition-colors",
                      dropdown:
                        "bg-[#1A1A1A] backdrop-blur-xl border border-[#2AA2FD]/30 text-white rounded-[10px]",
                      option:
                        "hover:bg-[#2AA2FD]/20 hover:text-white text-white",
                    }}
                    onChange={(value) => {
                      if (value) {
                        if (selectedCharacters.includes(value)) {
                          setSelectedCharacters(
                            selectedCharacters.filter((c) => c !== value),
                          );
                        } else {
                          setSelectedCharacters([...selectedCharacters, value]);
                        }
                      }
                    }}
                  />
                  <div className="flex w-full flex-col gap-2">
                    {selectedCharacters.map((character) => (
                      <div
                        key={character}
                        className="text-white flex items-center  gap-2"
                      >
                        <img
                          src={
                            characters?.find(
                              (c) => c.character_id === character,
                            )?.portrait_url
                          }
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {
                          characters?.find((c) => c.character_id === character)
                            ?.name
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion>
              <Accordion
                title="Price ( Lowest Ask )"
                badge={price ? "1" : undefined}
              >
                <div className="flex w-full flex-col gap-4 mt-[15px]">
                  <Slider
                    value={price}
                    onChange={(value) => setPrice(Number(value))}
                    label={null}
                    max={1000}
                    classNames={{
                      track: "bg-white/5",
                      thumb: "bg-white border-white w-[26px] h-[26px]",
                      mark: "bg-white",
                      bar: "bg-white/5",
                    }}
                  />
                  <NumberInput
                    radius={100}
                    prefix="FLOW "
                    hideControls
                    value={price}
                    onChange={(value) => setPrice(Number(value))}
                    className="max-w-[240px]"
                    classNames={{
                      input:
                        "bg-black/40 border h-[40px] text-white border-[#2AA2FD]/40 placeholder:text-white/50 backdrop-blur-sm hover:border-[#2AA2FD]/60 transition-colors",
                    }}
                  />
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl min-h-[350px]">
            {isLoading || isRefetching ? (
              <div className="col-span-full flex justify-center h-[350px] items-center">
                <Loader size="xl" color="#2AA2FD" />
              </div>
            ) : moments && moments.length > 0 ? (
              moments.map((item) => (
                <PremiumMomentCard
                  key={item.moment_id}
                  moment={item}
                  onClick={() => navigate(`/details/${item.moment_id}`)}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-[350px]">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    No Moments Found
                  </h3>
                  <p className="text-white/60">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        opened={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        position="left"
        size="100%"
        classNames={{
          header: "hidden",
          body: "p-0 bg-black",
          content: "p-0 bg-black",
        }}
      >
        <div className="flex shrink-0 w-full flex-col gap-4 p-6 bg-[#1A1A1A]/70 backdrop-blur-[35px] border border-white/10 rounded-[30px]">
          <div className="flex w-full px-5 justify-between items-center">
            <h1
              onClick={() => setIsFilterOpen(false)}
              className="text-[22px] cursor-pointer flex items-center gap-2.5 font-semibold text-white"
            >
              <ArrowLeft size={24} />
              Add filters
            </h1>
            <Button
              classNames={{
                root: "bg-transparent underline text-[#2AA2FD]",
              }}
              onClick={resetFilters}
            >
              Clear All
            </Button>
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
                    onChange={() => {
                      if (activeTier === "common") {
                        setActiveTier(undefined);
                      } else {
                        setActiveTier("common");
                      }
                    }}
                  />
                  <Checkbox
                    checked={activeTier === "rare"}
                    label="Rare"
                    width={26}
                    height={26}
                    onChange={() => {
                      if (activeTier === "rare") {
                        setActiveTier(undefined);
                      } else {
                        setActiveTier("rare");
                      }
                    }}
                  />
                  <Checkbox
                    checked={activeTier === "epic"}
                    label="Epic"
                    width={26}
                    height={26}
                    onChange={() => {
                      if (activeTier === "epic") {
                        setActiveTier(undefined);
                      } else {
                        setActiveTier("epic");
                      }
                    }}
                  />
                  <Checkbox
                    checked={activeTier === "legendary"}
                    label="Legendary"
                    width={26}
                    height={26}
                    onChange={() => {
                      if (activeTier === "legendary") {
                        setActiveTier(undefined);
                      } else {
                        setActiveTier("legendary");
                      }
                    }}
                  />
                </div>
              </div>
            </Accordion>
            <Accordion
              title="Universe"
              badge={
                selectedUniverse.length > 0
                  ? selectedUniverse.length.toString()
                  : undefined
              }
            >
              <div className="flex w-full flex-col gap-2  mt-[15px]">
                <Select
                  radius={100}
                  multiple
                  className="max-w-[240px]"
                  searchable
                  placeholder="Select here"
                  data={universes?.map((universe) => ({
                    value: universe.universe_id,
                    label: universe.name,
                  }))}
                  classNames={{
                    input:
                      "bg-white/5 border h-[40px] text-white border-white/20 placeholder:text-white/40 backdrop-blur-sm",
                    dropdown:
                      "bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-[10px]",
                    option: "hover:bg-white/10 hover:text-white",
                  }}
                  onChange={(value) => {
                    if (value) {
                      if (selectedUniverse.includes(value)) {
                        setSelectedUniverse(
                          selectedUniverse.filter((u) => u !== value),
                        );
                      } else {
                        setSelectedUniverse([...selectedUniverse, value]);
                      }
                    }
                  }}
                />
                <div className="flex w-full flex-col gap-2">
                  {selectedUniverse.map((universe) => (
                    <div
                      key={universe}
                      className="text-white flex items-center  gap-2"
                    >
                      <img
                        src={
                          universes?.find((u) => u.universe_id === universe)
                            ?.logo_url
                        }
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {universes?.find((u) => u.universe_id === universe)?.name}
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
            <Accordion
              title="Characters"
              badge={
                selectedCharacters.length > 0
                  ? selectedCharacters.length.toString()
                  : undefined
              }
            >
              <div className="flex w-full flex-col gap-2 mt-[15px]">
                <Select
                  radius={100}
                  key={selectedCharacters.join(",")}
                  searchable
                  className="max-w-[240px]"
                  placeholder="Select here"
                  data={characters?.map((character) => ({
                    value: character.character_id,
                    label: character.name,
                  }))}
                  withCheckIcon={false}
                  classNames={{
                    input:
                      "bg-white/5 border h-[40px] text-white border-white/20 placeholder:text-white/40 backdrop-blur-sm",
                    dropdown:
                      "bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-[10px]",
                    option: "hover:bg-white/10 hover:text-white",
                  }}
                  onChange={(value) => {
                    if (value) {
                      if (selectedCharacters.includes(value)) {
                        setSelectedCharacters(
                          selectedCharacters.filter((c) => c !== value),
                        );
                      } else {
                        setSelectedCharacters([...selectedCharacters, value]);
                      }
                    }
                  }}
                />
                <div className="flex w-full flex-col gap-2">
                  {selectedCharacters.map((character) => (
                    <div
                      key={character}
                      className="text-white flex items-center  gap-2"
                    >
                      <img
                        src={
                          characters?.find((c) => c.character_id === character)
                            ?.portrait_url
                        }
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {
                        characters?.find((c) => c.character_id === character)
                          ?.name
                      }
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
            <Accordion
              title="Price ( Lowest Ask )"
              badge={price ? "1" : undefined}
            >
              <div className="flex w-full flex-col gap-4 mt-[15px]">
                <Slider
                  value={price}
                  onChange={(value) => setPrice(Number(value))}
                  label={null}
                  max={1000}
                  classNames={{
                    track: "bg-white/5",
                    thumb: "bg-white border-white w-[26px] h-[26px]",
                    mark: "bg-white",
                    bar: "bg-white/5",
                  }}
                />
                <NumberInput
                  radius={100}
                  prefix="FLOW "
                  hideControls
                  value={price}
                  onChange={(value) => setPrice(Number(value))}
                  className="max-w-[240px]"
                  classNames={{
                    input:
                      "bg-white/5 border h-[40px] text-white border-white/20 placeholder:text-white/40 backdrop-blur-sm",
                  }}
                />
              </div>
            </Accordion>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
