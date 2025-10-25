import Card from "../../shared/components/common/Card";
import { Button } from "@/shared/components/common/Button/Button";
import { Button as NewButton } from "@/shared/components/ui/button";
import {
  Card as NewCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useGetUniverse } from "../SignIn/hooks/api/universe/useGetUniverse";
import { useGetCharacters } from "@/shared/hooks/api/characters/useGetCharacters";
import { useGetMoments } from "@/shared/hooks/api/moments/useGetMoments";
import { useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const user = useAppSelector((state) => state.user.user);
  const { data: universe } = useGetUniverse({ page: 1, limit: 4 });
  const [limit, setLimit] = useState(14);
  const { data: characters } = useGetCharacters({
    page: 1,
    limit,
  });
  const { data: moments } = useGetMoments({
    page: 1,
    limit: 4,
    sortBy: "most_sold",
    sortOrder: "DESC",
  });

  return (
    <div className="flex w-full flex-col gap-2 mt-[100px] pb-4">
      <div className="bg-[url('/images/title_back_img.png')]  flex-col w-full h-[320px]  bg-center bg-scale  bg-no-repeat flex items-center justify-center gap-5">
        {user && (
          <div className="flex items-center gap-2 -mt-8">
            <p className="text-white">
              Good Morning,{" "}
              <span className="text-[#FB5756] ">{user.username || ""}</span>
            </p>
          </div>
        )}
        <h1 className="text-[30px] lg:text-[52px] text-white text-center font-bold">
          EXPLORE <br /> THE MARKETPLACE
        </h1>
        {/* NEW FIGMA DESIGN SYSTEM DEMO - SAFE INTEGRATION */}
        <div className="flex flex-col gap-6 mt-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              🎨 New Figma Design System
            </h3>
            <p className="text-gray-300 text-sm">
              Beautiful components from your Figma designs
            </p>
          </div>

          {/* New Badge System */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-blue-600 text-white">
              DEFAULT
            </span>
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-gray-600 text-white">
              SECONDARY
            </span>
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium bg-red-600 text-white">
              DESTRUCTIVE
            </span>
            <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium border-gray-300 text-gray-900">
              OUTLINE
            </span>
          </div>

          {/* New Button System */}
          <div className="flex flex-wrap gap-3 justify-center">
            <NewButton variant="default">Primary Button</NewButton>
            <NewButton variant="secondary">Secondary</NewButton>
            <NewButton variant="outline">Outline</NewButton>
            <NewButton variant="ghost">Ghost</NewButton>
          </div>

          {/* New Card System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NewCard className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">New Card System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  This uses the new Figma design system with proper spacing,
                  typography, and styling.
                </p>
              </CardContent>
            </NewCard>
            <NewCard className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Zero Breaking Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  All existing functionality remains intact while we gradually
                  integrate the new design.
                </p>
              </CardContent>
            </NewCard>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[76px]">
        <section className="flex  flex-col gap-15">
          <div className="flex flex-col lg:flex-row gap-10">
            <p className="text-[52px] leading-11 font-bold flex flex-col lg:self-end self-start text-white">
              By Universe
            </p>
            <p className="text-xs flex flex-col  lg:self-end self-start text-white">
              Dive into your favorite cinematic multiverses. <br /> Filter by
              iconic worlds, legendary heroes, and epic stories from the
              universes you love most!
            </p>
          </div>
          <div className="flex w-full items-center   justify-center gap-5 lg:justify-between flex-wrap">
            {isMobile ? (
              <Carousel
                withIndicators
                slideGap={10}
                withControls={false}
                classNames={{
                  indicator: "bg-white w-[10px] h-[10px] rounded-full",
                  indicators: "-bottom-5",
                }}
                className="w-[240px]"
              >
                {universe?.map((item) => (
                  <Carousel.Slide key={item.universe_id}>
                    <div className="p-2.5 bg-[#1A1A1A]/70 shrink-0 flex items-center justify-center rounded-xl w-[240px] h-[240px]">
                      <img src={item.logo_url} alt="" />
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel>
            ) : (
              <>
                {universe?.map((item) => (
                  <div
                    key={item.universe_id}
                    className="p-2.5 bg-[#1A1A1A]/70 shrink-0 flex items-center justify-center rounded-xl w-[240px] h-[240px]"
                  >
                    <img src={item.logo_url} alt="" />
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
        <section className="flex  flex-col gap-15">
          <div className="flex flex-col lg:flex-row gap-10">
            <p className="text-[52px] leading-11 font-bold flex flex-col lg:self-end self-start text-white">
              Discover Characters
            </p>
            <p className="text-xs flex flex-col  lg:self-end self-start text-white">
              Explore iconic heroes, villains, and legends from your favorite
              stories. <br /> Find their stories, their worlds, and their
              journeys!
            </p>
          </div>
          <div className="flex w-full items-center   justify-center gap-10 lg:justify-between flex-wrap">
            {isMobile ? (
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
                className="w-full max-w-[310px]"
              >
                {characters?.map((item) => (
                  <Carousel.Slide key={item.character_id}>
                    <div className=" flex flex-col p-5 gap-[15px] text-center bg-[url('/images/backCard.svg')] h-[207px] shrink-0 w-[160px]">
                      <img
                        className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto"
                        src={item.portrait_url}
                        alt={item.name}
                      />
                      <p className="text-xs text-white/80">{item.name}</p>
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel>
            ) : (
              <>
                {characters?.map((item) => (
                  <div
                    key={item.character_id}
                    className=" flex flex-col p-5 gap-[15px] text-center bg-[url('/images/backCard.svg')] shrink-0 w-[160px] h-[207px]"
                  >
                    <img
                      className="w-[120px] h-[120px] rounded-full object-cover object-center mx-auto"
                      src={item.portrait_url}
                      alt=""
                    />
                    <p className="text-xs text-white/80">{item.name}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex w-full justify-center">
            <Button
              onClick={() => setLimit(limit === 14 ? 100 : 14)}
              className="w-[135px] h-[60px] hidden lg:block"
            >
              {limit === 14 ? "View All" : "View Less"}
            </Button>
          </div>
        </section>
        <section className="flex relative flex-col gap-15">
          <div className="flex flex-col lg:flex-row  gap-10">
            <p className="text-[52px] leading-11 font-bold flex flex-col lg:self-end self-start text-white">
              Latest top Sales
            </p>
          </div>
          <div className="flex w-full items-center mb-10 md:mb-0  justify-center gap-5 lg:justify-between flex-wrap">
            {isMobile ? (
              <Carousel
                withIndicators
                slideGap={10}
                withControls={false}
                classNames={{
                  indicator: "bg-white w-[10px] h-[10px] rounded-full ",
                  indicators: "-bottom-5",
                }}
                className="w-full max-w-[310px]"
              >
                {moments?.map((item) => (
                  <Carousel.Slide key={item.moment_id}>
                    <Card
                      imageSrc={item.movie?.poster_url || ""}
                      userAvatarSrc="/images/userpick.png"
                      title={item.title}
                      subtitle="RingBearer42"
                      soldCount={9854}
                      totalCount={12000}
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            ) : (
              <>
                {moments?.map((item) => (
                  <Link to="/marketplace">
                    <Card
                      imageSrc={item?.poster_url || ""}
                      userAvatarSrc="/images/userpick.png"
                      title={item.title}
                      subtitle="RingBearer42"
                      soldCount={9854}
                      totalCount={12000}
                    />
                  </Link>
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
