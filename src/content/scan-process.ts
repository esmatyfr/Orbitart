import type { ModelAssetId } from "@/types/model-asset";

export const scanProcess = {
  assetId: "a1-orbit-gear",
  description: "Elinizdeki parçadan 3D baskıya uzanan 5 adımlı şeffaf süreç. Her parça kendi geometrisine göre değerlendirilir; toleranslar ve malzeme sınırları dahilinde en uygulanabilir çözümü birlikte netleştiririz.",
  steps: [
    {
      id: "sample",
      posterPath: "/images/showcase/process-sample.webp",
      posterAlt: "Numune incelemesini temsil eden Orbit Gear yüzey görünümü",
      title: "Fiziksel numune",
      description: "Mevcut parçanın formu, aşınma payı ve kullanım amacı incelenir.",
    },
    {
      id: "scan",
      posterPath: "/images/showcase/process-scan.webp",
      posterAlt: "Dişli yüzeyinden örneklenmiş temsili noktalar; gerçek tarama verisi değildir",
      title: "Tarama verisi",
      description: "Yüzey geometrisi taranarak dijital referans verisi çıkarılır.",
    },
    {
      id: "model",
      posterPath: "/images/showcase/process-model.webp",
      posterAlt: "Orbit Gear geometrisinin temsili tel kafes görünümü",
      title: "Dijital model",
      description: "Tarama verisi üretime uygun, temiz bir CAD modeline dönüştürülür.",
    },
    {
      id: "printing",
      posterPath: "/images/showcase/process-printing.webp",
      posterAlt: "Markasız FDM yazıcı ve tablasında katmanlar halinde oluşan temsili çark",
      title: "3D baskı",
      description: "Kullanım şartlarına en uygun malzemeyle katman katman üretilir.",
    },
    {
      id: "production",
      posterPath: "/images/showcase/process-result.webp",
      posterAlt: "Baskısı tamamlanmış parçayı temsil eden lavanta renkli çark renderı",
      title: "Üretim sonucu",
      description: "Ölçü ve yüzey kontrolü yapılarak kullanıma hazır teslim edilir.",
    },
  ],
} as const satisfies {
  assetId: ModelAssetId;
  description: string;
  steps: readonly { id: string; title: string; description: string; posterPath: string; posterAlt: string }[];
};
