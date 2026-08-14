// Force TS Server update
import { notFound } from "next/navigation";
import { palettes } from "@/data/palettes";
import dynamic from "next/dynamic";

const SchoolHomepageDemo = dynamic(() => import("./SchoolHomepageDemo"));
const StreetwearStoreDemo = dynamic(() => import("./StreetwearStoreDemo"));
const GamerPortfolioDemo = dynamic(() => import("./GamerPortfolioDemo"));
const CoffeeRoasterDemo = dynamic(() => import("./CoffeeRoasterDemo"));
const LogisticsTradeDemo = dynamic(() => import("./LogisticsTradeDemo"));
const ErpSoftwareDemo = dynamic(() => import("./ErpSoftwareDemo"));
const MobilityAppDemo = dynamic(() => import("./MobilityAppDemo"));
const GameStudioDemo = dynamic(() => import("./GameStudioDemo").then(mod => mod.GameStudioDemo));
const NalandaArchiveDemo = dynamic(() => import("./NalandaArchiveDemo").then(mod => mod.NalandaArchiveDemo));
const EnergyCorpDemo = dynamic(() => import("./EnergyCorpDemo").then(mod => mod.EnergyCorpDemo));
const MusicStreamingDemo = dynamic(() => import("./MusicStreamingDemo").then(mod => mod.MusicStreamingDemo));
const SmartphoneLaunchDemo = dynamic(() => import("./SmartphoneLaunchDemo").then(mod => mod.SmartphoneLaunchDemo));
const DesignerPortfolioDemo = dynamic(() => import("./DesignerPortfolioDemo").then(mod => mod.DesignerPortfolioDemo));
const TravelPlannerDemo = dynamic(() => import("./TravelPlannerDemo").then(mod => mod.TravelPlannerDemo));
const HeritageRestaurantDemo = dynamic(() => import("./HeritageRestaurantDemo").then(mod => mod.HeritageRestaurantDemo));
const FootballEngineeringDemo = dynamic(() => import("./FootballEngineeringDemo").then(mod => mod.FootballEngineeringDemo));
const EnergyDrinkDemo = dynamic(() => import("./EnergyDrinkDemo").then(mod => mod.EnergyDrinkDemo));
const IceCreamDemo = dynamic(() => import("./IceCreamDemo").then(mod => mod.IceCreamDemo));
const FurniturePremiumDemo = dynamic(() => import("./FurniturePremiumDemo").then(mod => mod.FurniturePremiumDemo));
const ChocolatePremiumDemo = dynamic(() => import("./ChocolatePremiumDemo").then(mod => mod.ChocolatePremiumDemo));
const WindEnergyDemo = dynamic(() => import("./WindEnergyDemo").then(mod => mod.WindEnergyDemo));
const FoodDeliveryDemo = dynamic(() => import("./FoodDeliveryDemo").then(mod => mod.FoodDeliveryDemo));
const ArtisanalPencilDemo = dynamic(() => import("./ArtisanalPencilDemo").then(mod => mod.ArtisanalPencilDemo));
const WallpaperDecorDemo = dynamic(() => import("./WallpaperDecorDemo").then(mod => mod.WallpaperDecorDemo));
const DevOpsTerminalDemo = dynamic(() => import("./DevOpsTerminalDemo").then(mod => mod.DevOpsTerminalDemo));
const ReforestationNonprofitDemo = dynamic(() => import("./ReforestationNonprofitDemo").then(mod => mod.ReforestationNonprofitDemo));
const TravelLuggageDemo = dynamic(() => import("./TravelLuggageDemo").then(mod => mod.TravelLuggageDemo));
const AerospaceDemo = dynamic(() => import("./AerospaceDemo").then(mod => mod.AerospaceDemo));
const IndianStorybookDemo = dynamic(() => import("./IndianStorybookDemo").then(mod => mod.IndianStorybookDemo));
const BerryDessertDemo = dynamic(() => import("./BerryDessertDemo").then(mod => mod.BerryDessertDemo));
const CarpetDemo = dynamic(() => import("./CarpetDemo").then(mod => mod.CarpetDemo));
const WatchDemo = dynamic(() => import("./WatchDemo").then(mod => mod.WatchDemo));
const SnackDemo = dynamic(() => import("./SnackDemo").then(mod => mod.SnackDemo));
const DairyFarmDemo = dynamic(() => import("./DairyFarmDemo").then(mod => mod.DairyFarmDemo));
const PipeManufacturingDemo = dynamic(() => import("./PipeManufacturingDemo").then(mod => mod.PipeManufacturingDemo));
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const palette = palettes.find((p) => p.id === slug);
  
  if (!palette) {
    return { title: "Demo Not Found | MayaKit" };
  }

  return {
    title: `${palette.id.replace("-", " ")} Demo | MayaKit`,
  };
}

export default async function ColorComboDemoPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ swapped?: string }>;
}) {
  const { slug } = await params;
  const { swapped } = await searchParams;
  let palette = palettes.find((p) => p.id === slug);

  if (!palette) {
    notFound();
  }

  if (swapped === "true") {
    palette = {
      ...palette,
      colors: [palette.colors[1], palette.colors[0]]
    };
  }

  return (
    <div className="w-full relative">
      {palette.topicOverride === "school" ? (
        <SchoolHomepageDemo palette={palette} />
      ) : palette.topicOverride === "streetwear" ? (
        <StreetwearStoreDemo palette={palette} />
      ) : palette.topicOverride === "gaming" ? (
        <GamerPortfolioDemo palette={palette} />
      ) : palette.topicOverride === "coffee" ? (
        <CoffeeRoasterDemo palette={palette} />
      ) : palette.topicOverride === "logistics" ? (
        <LogisticsTradeDemo palette={palette} />
      ) : palette.topicOverride === "erp" ? (
        <ErpSoftwareDemo palette={palette} />
      ) : palette.topicOverride === "mobility" ? (
        <MobilityAppDemo palette={palette} />
      ) : palette.topicOverride === "studio" ? (
        <GameStudioDemo palette={palette} />
      ) : palette.topicOverride === "nalanda" ? (
        <NalandaArchiveDemo palette={palette} />
      ) : palette.topicOverride === "energy" ? (
        <EnergyCorpDemo palette={palette} />
      ) : palette.topicOverride === "music" ? (
        <MusicStreamingDemo palette={palette} />
      ) : palette.topicOverride === "smartphone" ? (
        <SmartphoneLaunchDemo palette={palette} />
      ) : palette.topicOverride === "portfolio" ? (
        <DesignerPortfolioDemo palette={palette} />
      ) : palette.topicOverride === "travel" ? (
        <TravelPlannerDemo palette={palette} />
      ) : palette.topicOverride === "restaurant" ? (
        <HeritageRestaurantDemo palette={palette} />
      ) : palette.topicOverride === "football-maker" ? (
        <FootballEngineeringDemo palette={palette} />
      ) : palette.topicOverride === "energy-drink" ? (
        <EnergyDrinkDemo palette={palette} />
      ) : palette.topicOverride === "ice-cream" ? (
        <IceCreamDemo palette={palette} />
      ) : palette.topicOverride === "furniture" ? (
        <FurniturePremiumDemo palette={palette} />
      ) : palette.topicOverride === "chocolate" ? (
        <ChocolatePremiumDemo palette={palette} />
      ) : palette.topicOverride === "wind-energy" ? (
        <WindEnergyDemo palette={palette} />
      ) : palette.topicOverride === "food-delivery" ? (
        <FoodDeliveryDemo palette={palette} />
      ) : palette.topicOverride === "pencil-maker" ? (
        <ArtisanalPencilDemo palette={palette} />
      ) : palette.topicOverride === "wallpaper" ? (
        <WallpaperDecorDemo palette={palette} />
      ) : palette.topicOverride === "devops" ? (
        <DevOpsTerminalDemo palette={palette} />
      ) : palette.topicOverride === "reforestation" ? (
        <ReforestationNonprofitDemo palette={palette} />
      ) : palette.topicOverride === "travel-bag" ? (
        <TravelLuggageDemo palette={palette} />
      ) : palette.topicOverride === "aerospace" ? (
        <AerospaceDemo palette={palette} />
      ) : palette.topicOverride === "indian-storybook" ? (
        <IndianStorybookDemo palette={palette} />
      ) : palette.topicOverride === "berry-food" ? (
        <BerryDessertDemo palette={palette} />
      ) : palette.topicOverride === "carpet" ? (
        <CarpetDemo palette={palette} />
      ) : palette.topicOverride === "watch" ? (
        <WatchDemo palette={palette} />
      ) : palette.topicOverride === "snack" ? (
        <SnackDemo palette={palette} />
      ) : palette.topicOverride === "dairy-farm" ? (
        <DairyFarmDemo palette={palette} />
      ) : palette.topicOverride === "pipe-manufacturing" ? (
        <PipeManufacturingDemo palette={palette} />
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <p className="font-mono text-xl">Demo layout for "{palette.topicOverride || 'default'}" not yet implemented.</p>
        </div>
      )}
    </div>
  );
}

// IDE cache update for WallpaperDecorDemo
