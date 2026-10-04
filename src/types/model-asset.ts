export type ModelAssetId =
  | "a1-orbit-gear"
  | "a2-tide-five"
  | "a3-modushell"
  | "a4-blade-of-chaos"
  | "a5-orbit-vase"
  | "a6-stone-guardian";

export type ModelSourceKind = "orbitart" | "external" | "cc0-derived";
export type ModelReviewStatus = "review" | "approved";
export type ModelPublicationStatus = "draft" | "review" | "published";

export type ModelAsset = {
  id: ModelAssetId;
  name: string;
  category: string;
  description: string;
  modelPath: `/models/showcase/${string}.glb`;
  posterPath: `/images/showcase/${string}.webp`;
  sourceKind: ModelSourceKind;
  sourceUrl?: string;
  creator?: string;
  licenseName?: string;
  licenseUrl?: string;
  attribution?: string;
  modifications: string;
  userApproved: boolean;
  rightsStatus: ModelReviewStatus;
  technicalStatus: ModelReviewStatus;
  publicationStatus: ModelPublicationStatus;
  rightsNote?: string;
};
