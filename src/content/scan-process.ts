import type { ModelAssetId } from "@/types/model-asset";

export const scanProcess = {
  assetId: "a1-orbit-gear",
  steps: [
    {
      id: "sample",
      posterPath: "/images/showcase/process-sample.webp",
      posterAlt: "Numune incelemesini temsil eden Orbit Gear yüzey görünümü",
      title: "Fiziksel numune",
      description: "Mevcut parçanın formu ve kullanım ihtiyacı incelenir.",
    },
    {
      id: "scan",
      posterPath: "/images/showcase/process-scan.webp",
      posterAlt: "Dişli yüzeyinden örneklenmiş temsili noktalar; gerçek tarama verisi değildir",
      title: "Tarama verisi",
      description: "Yüzey verisi, dijital çalışma için referans oluşturur.",
    },
    {
      id: "model",
      posterPath: "/images/showcase/process-model.webp",
      posterAlt: "Orbit Gear geometrisinin temsili tel kafes görünümü",
      title: "Dijital model",
      description: "Geometri, hedef üretim yöntemine göre değerlendirilir.",
    },
    {
      id: "printing",
      posterPath: "/images/showcase/process-printing.webp",
      posterAlt: "Markasız FDM yazıcı ve tablasında katmanlar halinde oluşan temsili çark",
      title: "3D baskı",
      description: "Baskı kafası hareket eder; parça, tabla üzerinde katman katman oluşur.",
    },
    {
      id: "production",
      posterPath: "/images/showcase/process-result.webp",
      posterAlt: "Baskısı tamamlanmış parçayı temsil eden lavanta renkli çark renderı",
      title: "Üretim sonucu",
      description: "Baskısı tamamlanan parça, son kontrol ve kullanım için değerlendirilir.",
    },
  ],
} as const satisfies {
  assetId: ModelAssetId;
  steps: readonly { id: string; title: string; description: string; posterPath: string; posterAlt: string }[];
};
