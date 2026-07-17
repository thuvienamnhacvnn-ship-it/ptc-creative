import type { TeamMember } from "@/types";
import { SITE } from "@/lib/constants";

/**
 * Hệ thống nhân sự PTC Creative — Berlin.
 *
 * Ảnh:  public/media/team/{id}.jpg|png|webp  (Phu.png …)
 * Video: public/media/team/Phu2.mp4 …
 */
export const team: TeamMember[] = [
  {
    id: "phu",
    name: "Mr. Phú",
    fullName: { vi: "Nguyễn Văn Phú", de: "Nguyen Van Phu" },
    role: {
      vi: "Bau & Thi công",
      de: "Bau & Ausführung",
    },
    focus: {
      vi: "Chuyên Bau thầu xây dựng · Lắp đặt tại Berlin",
      de: "Bauausführung · Montage in Berlin",
    },
    bio: {
      vi: "Nền tảng thực địa: khảo sát mặt bằng, thi công, lắp đặt biển–kết cấu và phối hợp thợ tại Berlin. Giữ dự án đúng timeline, an toàn và chuẩn kỹ thuật Đức.",
      de: "Praxis vor Ort: Aufmaß, Ausführung, Montage von Schildern und Konstruktionen, Koordination der Gewerke in Berlin. Projekte termintreu, sicher und nach DE-Standards.",
    },
    initials: "PH",
    code: "PTC-01",
    department: { vi: "Production / Bau", de: "Produktion / Bau" },
    location: "Berlin",
    basedIn: {
      vi: "Berlin, Đức",
      de: "Berlin, Deutschland",
    },
    email: "phu@ptc-creative.de",
    phone: "+4915223758632",
    phoneDisplay: "+49 1522 3758632",
    zalo: SITE.social.zalo,
    experienceYears: 12,
    joinYear: 2019,
    languages: {
      vi: ["Tiếng Việt", "Tiếng Đức (B1+)", "English (A2)"],
      de: ["Vietnamesisch", "Deutsch (B1+)", "Englisch (A2)"],
    },
    skills: {
      vi: [
        "Khảo sát / Aufmaß",
        "Thi công biển & kết cấu",
        "Lắp đặt lightbox / chữ nổi",
        "Quản lý thợ & timeline",
        "An toàn công trường DE",
      ],
      de: [
        "Aufmaß vor Ort",
        "Schilder- & Stahlbau",
        "Montage Lightbox / 3D-Buchstaben",
        "Gewerke-Koordination",
        "Baustellensicherheit DE",
      ],
    },
    expertise: {
      vi: ["Werbetechnik onsite", "Bau thầu", "Facade install"],
      de: ["Werbetechnik vor Ort", "Bauausführung", "Fassadenmontage"],
    },
    education: {
      vi: "Thực tiễn xây dựng & lắp đặt (VN → DE)",
      de: "Praxis Bau & Montage (VN → DE)",
    },
    availability: {
      vi: "On-site Berlin · T2–T6",
      de: "Vor Ort Berlin · Mo–Fr",
    },
    workMode: {
      vi: "Hiện trường + xưởng",
      de: "Baustelle + Werkstatt",
    },
    photo: "/media/team/Phu.png",
    photoCandidates: [
      "/media/team/Phu.png",
      "/media/team/Phu.jpg",
      "/media/team/phu.png",
      "/media/team/phu.jpg",
    ],
    video: "/media/team/Phu2.mp4",
    videoCandidates: [
      "/media/team/Phu2.mp4",
      "/media/team/phu2.mp4",
      "/media/team/phu.mp4",
    ],
    gradient: "from-amber-950 via-[#1a1410] to-[#06080e]",
  },
  {
    id: "tuyen",
    name: "Mr. Tuyên",
    fullName: { vi: "Trần Minh Tuyên", de: "Tran Minh Tuyen" },
    role: {
      vi: "Công nghệ & Kỹ thuật",
      de: "Technologie & Technik",
    },
    focus: {
      vi: "CNC · Hệ thống kỹ thuật · Nền tảng số",
      de: "CNC · Techniksysteme · Digitale Plattformen",
    },
    bio: {
      vi: "Cầu nối giữa ý tưởng và hệ thống: CNC, vật liệu kỹ thuật, website, automation và quy trình sản xuất. Biến brief thành file sản xuất và nền tảng số vận hành được.",
      de: "Brücke von Idee zu System: CNC, technische Materialien, Website, Automation und Fertigungsprozesse. Briefings werden produktionsreife Dateien und laufende digitale Plattformen.",
    },
    initials: "TY",
    code: "PTC-02",
    department: { vi: "Engineering", de: "Engineering" },
    location: "Berlin",
    basedIn: {
      vi: "Berlin, Đức",
      de: "Berlin, Deutschland",
    },
    email: "tuyen@ptc-creative.de",
    phone: SITE.phoneE164,
    phoneDisplay: SITE.phone,
    zalo: SITE.social.zalo,
    experienceYears: 10,
    joinYear: 2019,
    languages: {
      vi: ["Tiếng Việt", "Tiếng Đức (B2)", "English (B1)"],
      de: ["Vietnamesisch", "Deutsch (B2)", "Englisch (B1)"],
    },
    skills: {
      vi: [
        "CNC / CAD-CAM",
        "Vật liệu kỹ thuật",
        "Website & automation",
        "Quy trình sản xuất",
        "QA / dung sai",
      ],
      de: [
        "CNC / CAD-CAM",
        "Technische Materialien",
        "Website & Automation",
        "Fertigungsprozesse",
        "QA / Toleranzen",
      ],
    },
    expertise: {
      vi: ["CNC manufacturing", "Tech stack", "Digital systems"],
      de: ["CNC-Fertigung", "Tech-Stack", "Digitale Systeme"],
    },
    education: {
      vi: "Kỹ thuật / công nghệ ứng dụng",
      de: "Angewandte Technik / Engineering",
    },
    availability: {
      vi: "Studio + remote · T2–T6",
      de: "Studio + remote · Mo–Fr",
    },
    workMode: {
      vi: "Hybrid · Engineering desk",
      de: "Hybrid · Engineering",
    },
    photo: "/media/team/tuyen.jpg",
    photoCandidates: [
      "/media/team/Tuyen.png",
      "/media/team/tuyen.png",
      "/media/team/tuyen.jpg",
      "/media/team/tuyen.webp",
    ],
    video: "/media/team/tuyen.mp4",
    videoCandidates: [
      "/media/team/tuyen.mp4",
      "/media/team/Tuyen.mp4",
      "/media/team/tuyen.webm",
    ],
    gradient: "from-sky-950 via-[#0a1528] to-[#040810]",
  },
  {
    id: "chung",
    name: "Mr. Chung",
    fullName: { vi: "Lê Quốc Chung", de: "Le Quoc Chung" },
    role: {
      vi: "Ảnh & Thiết kế đồ họa",
      de: "Foto & Grafikdesign",
    },
    focus: {
      vi: "Brand visual · Photography · Print/Web",
      de: "Brand Visual · Fotografie · Print/Web",
    },
    bio: {
      vi: "Ngôn ngữ hình ảnh của PTC: brand identity, layout print, visual cho biển–web–social. Nhiếp ảnh và thiết kế giúp brand nhất quán từ mặt tiền đến màn hình.",
      de: "Die Bildsprache von PTC: Brand Identity, Printdesign, Visuals für Schilder, Web und Social. Foto und Design halten die Marke von der Fassade bis zum Screen konsistent.",
    },
    initials: "CH",
    code: "PTC-03",
    department: { vi: "Creative", de: "Creative" },
    location: "Berlin",
    basedIn: {
      vi: "Berlin, Đức",
      de: "Berlin, Deutschland",
    },
    email: "chung@ptc-creative.de",
    phone: SITE.phoneE164,
    phoneDisplay: SITE.phone,
    zalo: SITE.social.zalo,
    experienceYears: 9,
    joinYear: 2020,
    languages: {
      vi: ["Tiếng Việt", "Tiếng Đức (B1)", "English (B2)"],
      de: ["Vietnamesisch", "Deutsch (B1)", "Englisch (B2)"],
    },
    skills: {
      vi: [
        "Brand identity",
        "Layout print & packaging",
        "Nhiếp ảnh sản phẩm / không gian",
        "Visual biển & social",
        "Art direction",
      ],
      de: [
        "Brand Identity",
        "Print- & Packaging-Layout",
        "Produkt- / Raumfotografie",
        "Schilder- & Social-Visuals",
        "Art Direction",
      ],
    },
    expertise: {
      vi: ["Graphic design", "Photography", "Brand system"],
      de: ["Grafikdesign", "Fotografie", "Brand-System"],
    },
    education: {
      vi: "Thiết kế đồ họa & visual craft",
      de: "Grafikdesign & Visual Craft",
    },
    availability: {
      vi: "Studio · Shoot on request",
      de: "Studio · Shoot auf Anfrage",
    },
    workMode: {
      vi: "Creative studio",
      de: "Creative Studio",
    },
    photo: "/media/team/chung.jpg",
    photoCandidates: [
      "/media/team/Chung.png",
      "/media/team/chung.png",
      "/media/team/chung.jpg",
      "/media/team/chung.webp",
    ],
    video: "/media/team/chung.mp4",
    videoCandidates: [
      "/media/team/chung.mp4",
      "/media/team/Chung.mp4",
      "/media/team/chung.webm",
    ],
    gradient: "from-rose-950 via-[#140f14] to-[#07060a]",
  },
];
