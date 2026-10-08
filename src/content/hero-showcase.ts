import type { ModelAssetId } from "@/types/model-asset";

export type HeroPalette = {
  background: string;
  accent: string;
  glow: string;
  glowOpacity?: number;
  platformRimEmission?: number;
  buttonBackground: string;
  buttonText: string;
};

export type HeroShowcaseItem = {
  assetId: ModelAssetId;
  order: number;
  track: "technical" | "creative";
  serviceLabel: string;
  description: string;
  palette: HeroPalette;
};

export const heroShowcase: readonly HeroShowcaseItem[] = [
  {
    assetId: "a1-orbit-gear",
    order: 0,
    track: "technical",
    serviceLabel: "Teknik tasarım",
    description: "Dişli geometrisi ve işlevsel prototipleme.",
    palette: {
      background: "#101317",
      accent: "#AEBAC6",
      glow: "#73869A",
      buttonBackground: "#C5CFD8",
      buttonText: "#12161A",
    },
  },
  {
    assetId: "a2-tide-five",
    order: 1,
    track: "technical",
    serviceLabel: "Marin modelleme",
    description: "Marin parçaları için dijital form ve prototip.",
    palette: {
      background: "#12151A",
      accent: "#E8E9E6",
      glow: "#FFFFFF",
      glowOpacity: 0.28,
      platformRimEmission: 1,
      buttonBackground: "#F1F1ED",
      buttonText: "#14171B",
    },
  },
  {
    assetId: "a3-modushell",
    order: 2,
    track: "technical",
    serviceLabel: "Prototipleme",
    description: "Özel muhafaza ve ürün prototipi geliştirme.",
    palette: {
      background: "#171207",
      accent: "#EAB442",
      glow: "#F4A72B",
      buttonBackground: "#F2BF4A",
      buttonText: "#1A1408",
    },
  },
  {
    assetId: "a4-blade-of-chaos",
    order: 3,
    track: "creative",
    serviceLabel: "Yaratıcı üretim",
    description: "Karmaşık fantastik form ve yüzey ayrıntıları.",
    palette: {
      background: "#170B08",
      accent: "#F05A32",
      glow: "#FF7A3D",
      buttonBackground: "#FF7950",
      buttonText: "#1D0B06",
    },
  },
  {
    assetId: "a5-orbit-vase",
    order: 4,
    track: "creative",
    serviceLabel: "Özel tasarım",
    description: "Organik form ve dekoratif obje modelleme.",
    palette: {
      background: "#081512",
      accent: "#45B79B",
      glow: "#65D6B7",
      buttonBackground: "#8DE5CC",
      buttonText: "#0B1914",
    },
  },
  {
    assetId: "a6-stone-guardian",
    order: 5,
    track: "creative",
    serviceLabel: "Heykel ve dijitalleştirme",
    description: "Taş heykel yüzeyi ve organik form örneği.",
    palette: {
      background: "#171109",
      accent: "#C9A36D",
      glow: "#E5BE82",
      buttonBackground: "#D8B57D",
      buttonText: "#1B140B",
    },
  },
] as const satisfies readonly HeroShowcaseItem[];
