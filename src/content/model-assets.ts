import type { ModelAsset, ModelAssetId } from "@/types/model-asset";

/** Process accessory selected on 2026-10-02; separate from the six hero choices. */
export const processPrinterAsset = {
  id: "process-fdm-printer",
  name: "Markasız FDM yazıcı",
  modelPath: "/models/showcase/process-fdm-printer.glb",
  posterPath: "/images/showcase/process-printing.webp",
  sourceKind: "orbitart",
  creator: "Orbitart için Codex ile özgün prosedürel Blender üretimi",
  modifications: "Yeni özgün model; harici geometri veya marka tasarımı kullanılmadı.",
  userApproved: true,
  rightsStatus: "approved",
  technicalStatus: "approved",
  representation: "Markasız, temsili FDM yazıcı; gerçek makine veya çalıştırılabilir baskı yolu değildir.",
} as const satisfies Pick<ModelAsset, "name" | "modelPath" | "posterPath" | "sourceKind" | "creator" | "modifications" | "userApproved" | "rightsStatus" | "technicalStatus"> & { id: string; representation: string };

export const modelAssets: readonly ModelAsset[] = [
  {
    id: "a1-orbit-gear",
    name: "Orbit Gear",
    category: "Teknik modelleme",
    description:
      "Dişli geometrisi üzerinden teknik tasarım ve prototipleme hizmetlerini temsil eden özgün model.",
    modelPath: "/models/showcase/a1-orbit-gear.glb",
    posterPath: "/images/showcase/a1-orbit-gear.webp",
    sourceKind: "orbitart",
    modifications: "Orbitart için Blender'da özgün üretim.",
    userApproved: true,
    rightsStatus: "approved",
    technicalStatus: "approved",
    publicationStatus: "published",
  },
  {
    id: "a2-tide-five",
    name: "Tide Five",
    category: "Marin modelleme",
    description:
      "Marin formlu parçaların dijital tasarımını ve prototiplemesini temsil eden özgün model.",
    modelPath: "/models/showcase/a2-tide-five.glb",
    posterPath: "/images/showcase/a2-tide-five.webp",
    sourceKind: "orbitart",
    modifications: "Orbitart için Blender'da özgün üretim.",
    userApproved: true,
    rightsStatus: "approved",
    technicalStatus: "approved",
    publicationStatus: "published",
  },
  {
    id: "a3-modushell",
    name: "ModuShell",
    category: "Prototipleme",
    description:
      "Özel elektronik muhafaza tasarımı ve prototip geliştirme sürecini temsil eden özgün model.",
    modelPath: "/models/showcase/a3-modushell.glb",
    posterPath: "/images/showcase/a3-modushell.webp",
    sourceKind: "orbitart",
    modifications: "Orbitart için Blender'da özgün üretim.",
    userApproved: true,
    rightsStatus: "approved",
    technicalStatus: "approved",
    publicationStatus: "published",
  },
  {
    id: "a4-blade-of-chaos",
    name: "Blade of Chaos",
    category: "Yaratıcı üretim",
    description:
      "Karmaşık yüzey ve malzeme ayrıntılarını gösteren, harici kaynaklı temsili fantastik obje.",
    modelPath: "/models/showcase/a4-blade-of-chaos.glb",
    posterPath: "/images/showcase/a4-blade-of-chaos.webp",
    sourceKind: "external",
    sourceUrl:
      "https://sketchfab.com/3d-models/blade-of-chaos-god-of-war-1c23158349954342ad74bc002d01007e",
    creator: "DeLeon (@dele0n)",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    attribution:
      "Blade of Chaos - God of War by DeLeon (@dele0n), CC BY 4.0. Blender'da üçgen sayısı ve doku boyutu optimize edildi; özgün renkler korundu.",
    modifications:
      "Geometri azaltıldı ve dokular web için sıkıştırıldı; malzeme renkleri değiştirilmedi.",
    userApproved: true,
    rightsStatus: "approved",
    technicalStatus: "approved",
    publicationStatus: "published",
    rightsNote:
      "Kullanıcı A4 seçimini onayladı. Kaynak sanatçının konsept sanatına dair notu atıf ve yayın öncesi incelemede görünür tutulmalı.",
  },
  {
    id: "a5-orbit-vase",
    name: "Orbit Vase",
    category: "Yaratıcı üretim",
    description:
      "Organik formlu dekoratif obje tasarımı ve dijital modelleme sürecini temsil eden özgün model.",
    modelPath: "/models/showcase/a5-twin-orbit-vase.glb",
    posterPath: "/images/showcase/a5-twin-orbit-vase.webp",
    sourceKind: "orbitart",
    modifications: "Orbitart için Blender'da özgün üretim.",
    userApproved: true,
    rightsStatus: "approved",
    technicalStatus: "approved",
    publicationStatus: "published",
  },
  {
    id: "a6-stone-guardian",
    name: "Stone Guardian",
    category: "Heykel ve dijitalleştirme",
    description:
      "Taş heykel formunu gösteren, CC0 tarama kaynağından düzenlenmiş temsili model.",
    modelPath: "/models/showcase/a6-astral-lion.glb",
    posterPath: "/images/showcase/a6-astral-lion.webp",
    sourceKind: "cc0-derived",
    sourceUrl: "https://zenodo.org/records/10324226",
    creator: "nebulousflynn; kaynak açıklamasında noe-3d.at taraması belirtilir",
    licenseName: "CC0 1.0 Universal",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    attribution:
      "Kaynak: Lion Statue - optimized, nebulousflynn, Zenodo. CC0 1.0. Sıcak kumtaşı renk düzenlemesi uygulandı.",
    modifications:
      "Gösterim kaidesi sadeleştirildi ve albedo sıcak kumtaşı/eskitilmiş altın tonlarına uyarlandı.",
    userApproved: true,
    rightsStatus: "approved",
    technicalStatus: "approved",
    publicationStatus: "published",
  },
] as const;

export const isPublishedModelAsset = (asset: ModelAsset) =>
    asset.userApproved &&
    asset.rightsStatus === "approved" &&
    asset.technicalStatus === "approved" &&
    asset.publicationStatus === "published";

export const publishedModelAssets = modelAssets.filter(isPublishedModelAsset);

export const getModelAsset = (id: ModelAssetId) => {
  const asset = modelAssets.find((item) => item.id === id);

  if (!asset) {
    throw new Error(`3D model kaydı bulunamadı: ${id}`);
  }

  return asset;
};
