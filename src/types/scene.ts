export const sceneIds = [
  "dark-studio",
  "purple-gallery",
  "white-studio",
] as const;

export type SceneId = (typeof sceneIds)[number];
