/**
 * Màu + ảnh local cho 6 dịch vụ.
 *
 * public/media/services/{folder}/
 *   cover.png | cover.jpg
 *   1.png … 4.png  (gallery)
 */
export type ServiceTheme = {
  color: string;
  folder: string;
  cover: string;
  gallery: string[];
};

function media(folder: string, file: string) {
  return `/media/services/${folder}/${file}`;
}

export function buildServiceMedia(folder: string): Pick<ServiceTheme, "cover" | "gallery"> {
  return {
    cover: media(folder, "cover.png"),
    gallery: [
      media(folder, "1.png"),
      media(folder, "2.png"),
      media(folder, "3.png"),
      media(folder, "4.png"),
      media(folder, "cover.jpg"),
      media(folder, "1.jpg"),
    ],
  };
}

/** Theme theo slug dịch vụ */
export const SERVICE_THEMES: Record<string, ServiceTheme> = {
  "cnc-manufacturing": {
    color: "#409cff",
    folder: "cnc",
    ...buildServiceMedia("cnc"),
  },
  werbetechnik: {
    color: "#ff4d00",
    folder: "werbetechnik",
    ...buildServiceMedia("werbetechnik"),
  },
  printing: {
    color: "#00dcd2",
    folder: "printing",
    ...buildServiceMedia("printing"),
  },
  branding: {
    color: "#b464ff",
    folder: "branding",
    ...buildServiceMedia("branding"),
  },
  website: {
    color: "#5b8cff",
    folder: "website",
    ...buildServiceMedia("website"),
  },
  marketing: {
    color: "#ff5c8a",
    folder: "marketing",
    ...buildServiceMedia("marketing"),
  },
};

export function getServiceTheme(slug: string): ServiceTheme {
  return (
    SERVICE_THEMES[slug] ?? {
      color: "#ff4d00",
      folder: "cnc",
      ...buildServiceMedia("cnc"),
    }
  );
}
