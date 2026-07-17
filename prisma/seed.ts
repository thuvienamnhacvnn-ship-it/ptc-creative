import {
  PrismaClient,
  Role,
  ContentStatus,
  AccountType,
  Locale,
  QuoteStatus,
  ProjectStatus,
  LeadSource,
  LeadStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ptc-creative.de" },
    update: { passwordHash, emailVerified: new Date(), role: Role.SUPER_ADMIN },
    create: {
      email: "admin@ptc-creative.de",
      passwordHash,
      name: "PTC Super Admin",
      phone: "+49 30 000000",
      role: Role.SUPER_ADMIN,
      accountType: AccountType.BUSINESS,
      preferredLocale: Locale.de,
      emailVerified: new Date(),
      termsAcceptedAt: new Date(),
      privacyAcceptedAt: new Date(),
      aiConsentAt: new Date(),
      company: { create: { name: "PTC Creative GmbH", website: "https://ptc-creative.de" } },
    },
  });

  await prisma.user.upsert({
    where: { email: "staff@ptc-creative.de" },
    update: { passwordHash, emailVerified: new Date() },
    create: {
      email: "staff@ptc-creative.de",
      passwordHash,
      name: "PTC Staff",
      role: Role.STAFF,
      preferredLocale: Locale.de,
      emailVerified: new Date(),
      termsAcceptedAt: new Date(),
      privacyAcceptedAt: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: "editor@ptc-creative.de" },
    update: { passwordHash, emailVerified: new Date() },
    create: {
      email: "editor@ptc-creative.de",
      passwordHash,
      name: "PTC Editor",
      role: Role.EDITOR,
      preferredLocale: Locale.vi,
      emailVerified: new Date(),
      termsAcceptedAt: new Date(),
      privacyAcceptedAt: new Date(),
    },
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@ptc-creative.de" },
    update: { passwordHash, emailVerified: new Date() },
    create: {
      email: "demo@ptc-creative.de",
      passwordHash,
      name: "Demo User",
      phone: "+49 30 1234567",
      role: Role.USER,
      accountType: AccountType.BUSINESS,
      preferredLocale: Locale.vi,
      emailVerified: new Date(),
      termsAcceptedAt: new Date(),
      privacyAcceptedAt: new Date(),
      aiConsentAt: new Date(),
      company: { create: { name: "Demo GmbH", industry: "restaurant" } },
      addresses: {
        create: {
          line1: "Musterstraße 1",
          city: "Berlin",
          postalCode: "10115",
          country: "DE",
          isPrimary: true,
        },
      },
    },
  });

  const categories = [
    { code: "CNC", icon: "Factory", visual: "cnc", sortOrder: 1 },
    { code: "WERBETECHNIK", icon: "Signpost", visual: "signage", sortOrder: 2 },
    { code: "PRINTING", icon: "Printer", visual: "print", sortOrder: 3 },
    { code: "BRANDING", icon: "Palette", visual: "brand", sortOrder: 4 },
    { code: "WEBSITE", icon: "Monitor", visual: "web", sortOrder: 5 },
    { code: "MARKETING", icon: "Megaphone", visual: "growth", sortOrder: 6 },
  ];

  for (const c of categories) {
    const cat = await prisma.serviceCategory.upsert({
      where: { code: c.code },
      update: { icon: c.icon, visual: c.visual, status: ContentStatus.PUBLISHED },
      create: {
        code: c.code,
        icon: c.icon,
        visual: c.visual,
        sortOrder: c.sortOrder,
        status: ContentStatus.PUBLISHED,
        translations: {
          create: [
            { locale: Locale.vi, name: c.code, description: `Nhóm dịch vụ ${c.code}` },
            { locale: Locale.de, name: c.code, description: `Leistungsgruppe ${c.code}` },
          ],
        },
      },
    });

    const slug = c.code.toLowerCase().replace(/_/g, "-");
    const service = await prisma.service.upsert({
      where: { slug },
      update: {
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        specs: ["SPEC-A", "SPEC-B", "SPEC-C"],
      },
      create: {
        slug,
        categoryId: cat.id,
        icon: c.icon,
        visual: c.visual,
        specs: ["SPEC-A", "SPEC-B", "SPEC-C"],
        sortOrder: c.sortOrder,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        translations: {
          create: [
            {
              locale: Locale.vi,
              slug,
              title: c.code === "CNC" ? "CNC & Manufacturing" : c.code,
              short: `Giải pháp ${c.code} cho doanh nghiệp tại Đức.`,
              description: `PTC Creative cung cấp ${c.code} với tiêu chuẩn sản xuất và thiết kế cao cấp, đồng bộ brand offline–online.`,
              capabilities: ["Tư vấn kỹ thuật", "Sản xuất / triển khai", "QA & bàn giao"],
              benefits: ["Một đối tác", "Chất lượng DE", "Timeline rõ"],
            },
            {
              locale: Locale.de,
              slug,
              title: c.code === "CNC" ? "CNC & Manufacturing" : c.code,
              short: `${c.code}-Lösungen für Unternehmen in DE.`,
              description: `PTC Creative liefert ${c.code} mit hohem Fertigungs- und Designstandard — offline und online abgestimmt.`,
              capabilities: ["Technische Beratung", "Fertigung / Umsetzung", "QA & Übergabe"],
              benefits: ["Ein Partner", "DE-Qualität", "Klare Timeline"],
            },
          ],
        },
      },
    });
    void service;
  }

  const industries = [
    { slug: "restaurant", icon: "UtensilsCrossed", palette: "warm", modules: ["branding", "menu", "signage", "website", "marketing"] },
    { slug: "nail", icon: "Sparkles", palette: "rose", modules: ["branding", "signage", "booking", "marketing"] },
    { slug: "salon", icon: "Scissors", palette: "soft", modules: ["branding", "wayfinding", "website"] },
    { slug: "shop", icon: "ShoppingBag", palette: "cool", modules: ["branding", "cnc", "signage", "website"] },
    { slug: "dental", icon: "HeartPulse", palette: "clinical", modules: ["branding", "wayfinding", "website"] },
    { slug: "logistics", icon: "Truck", palette: "industrial", modules: ["branding", "wrap", "website"] },
    { slug: "enterprise", icon: "Building2", palette: "graphite", modules: ["branding", "website", "print"] },
  ];

  for (let i = 0; i < industries.length; i++) {
    const ind = industries[i];
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: { status: ContentStatus.PUBLISHED, publishedAt: new Date() },
      create: {
        slug: ind.slug,
        icon: ind.icon,
        palette: ind.palette,
        modules: ind.modules,
        sortOrder: i + 1,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        translations: {
          create: [
            {
              locale: Locale.vi,
              slug: ind.slug,
              title: ind.slug.charAt(0).toUpperCase() + ind.slug.slice(1),
              short: `Giải pháp ngành ${ind.slug} tại Đức.`,
              description: `Stack dịch vụ PTC cho ${ind.slug}: nhận diện, sản xuất vật lý và nền tảng số.`,
              painPoints: ["Nhận diện yếu", "Thiếu đồng bộ online-offline", "Khó scale"],
              deliverables: ["Brand system", "Signage/Print", "Website", "Local growth"],
              packageText: `Gói ${ind.slug} — triển khai theo phase.`,
            },
            {
              locale: Locale.de,
              slug: ind.slug,
              title: ind.slug.charAt(0).toUpperCase() + ind.slug.slice(1),
              short: `Branchenlösung ${ind.slug} in DE.`,
              description: `PTC-Stack für ${ind.slug}: Identität, physische Produktion und digitale Plattform.`,
              painPoints: ["Schwache Sichtbarkeit", "Inkonsistente Touchpoints", "Schwer skalierbar"],
              deliverables: ["Brand-System", "Signage/Print", "Website", "Local Growth"],
              packageText: `Paket ${ind.slug} — phasenweise Umsetzung.`,
            },
          ],
        },
      },
    });
  }

  // 12 portfolio projects
  for (let i = 1; i <= 12; i++) {
    const slug = `case-${i}`;
    const industry = await prisma.industry.findFirst({
      orderBy: { sortOrder: "asc" },
      skip: (i - 1) % 7,
    });
    await prisma.portfolioProject.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        category: i % 2 === 0 ? "signage" : "website",
        industryId: industry?.id,
        status: ContentStatus.PUBLISHED,
        featured: i <= 3,
        sortOrder: i,
        tags: ["PTC", "DE", i % 2 === 0 ? "Physical" : "Digital"],
        gradient: "from-zinc-900 via-neutral-900 to-black",
        publishedAt: new Date(),
        translations: {
          create: [
            {
              locale: Locale.vi,
              slug,
              title: `Dự án mẫu ${i}`,
              description: `Case study ${i}: kết hợp thiết kế, sản xuất và digital cho khách hàng tại Đức.`,
              materials: "Acrylic · Aluminium · LED",
              duration: `${2 + (i % 4)} tuần`,
              result: "Tăng nhận diện và lead (số liệu khách).",
              beforeLabel: "Trước: nhận diện rời rạc",
              afterLabel: "Sau: hệ thống đồng bộ",
            },
            {
              locale: Locale.de,
              slug,
              title: `Musterprojekt ${i}`,
              description: `Case Study ${i}: Design, Fertigung und Digital für einen DE-Kunden.`,
              materials: "Acryl · Aluminium · LED",
              duration: `${2 + (i % 4)} Wochen`,
              result: "Mehr Sichtbarkeit und Leads (Kundenangabe).",
              beforeLabel: "Vorher: fragmentierte Marke",
              afterLabel: "Nachher: kohärentes System",
            },
          ],
        },
      },
    });
  }

  // 12 blog posts
  for (let i = 1; i <= 12; i++) {
    const slug = `lab-note-${i}`;
    await prisma.blogPost.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        status: ContentStatus.PUBLISHED,
        featured: i <= 2,
        readTime: 4 + (i % 5),
        publishedAt: new Date(Date.now() - i * 86400000),
        gradient: "from-stone-900 to-black",
        translations: {
          create: [
            {
              locale: Locale.vi,
              slug,
              title: `Lab Note ${i}: Vật liệu & brand tại Đức`,
              excerpt: `Ghi chú thực chiến số ${i} về sản xuất, signage và growth.`,
              content: `Nội dung Lab Note ${i}. Chia sẻ kinh nghiệm chọn vật liệu, quy trình CNC/Werbetechnik và đồng bộ digital marketing cho SME tại Đức. Không cam kết giá cố định — mỗi dự án có brief riêng.`,
              category: i % 2 === 0 ? "Sản xuất" : "Digital",
            },
            {
              locale: Locale.de,
              slug,
              title: `Lab Note ${i}: Material & Marke in DE`,
              excerpt: `Praxisnotiz ${i} zu Fertigung, Signage und Growth.`,
              content: `Lab Note ${i}. Erfahrungen zu Materialwahl, CNC/Werbetechnik und digitaler Abstimmung für KMU in Deutschland. Keine Pauschalpreise — jedes Projekt braucht einen eigenen Brief.`,
              category: i % 2 === 0 ? "Fertigung" : "Digital",
            },
          ],
        },
      },
    });
  }

  // 20 FAQs
  for (let i = 1; i <= 20; i++) {
    await prisma.fAQ.create({
      data: {
        category: i <= 10 ? "general" : "production",
        sortOrder: i,
        status: ContentStatus.PUBLISHED,
        translations: {
          create: [
            {
              locale: Locale.vi,
              question: `Câu hỏi thường gặp ${i}?`,
              answer: `Trả lời ${i}: PTC Creative làm việc theo brief rõ ràng, báo giá sau khi đủ thông tin kỹ thuật. Không cam kết deadline khi chưa khảo sát.`,
            },
            {
              locale: Locale.de,
              question: `Häufige Frage ${i}?`,
              answer: `Antwort ${i}: PTC Creative arbeitet mit klarem Brief; Angebote nach technischen Angaben. Keine Deadline-Zusage ohne Klärung.`,
            },
          ],
        },
      },
    });
  }

  // 4 team
  const team = [
    { name: "Alex Nguyen", initials: "AN", roleVi: "Creative Director", roleDe: "Creative Director" },
    { name: "Mira Hoffmann", initials: "MH", roleVi: "Production Lead", roleDe: "Production Lead" },
    { name: "Jonas Weber", initials: "JW", roleVi: "Web Lead", roleDe: "Web Lead" },
    { name: "Linh Tran", initials: "LT", roleVi: "Growth Strategist", roleDe: "Growth Strategist" },
  ];
  for (let i = 0; i < team.length; i++) {
    const t = team[i];
    await prisma.teamMember.create({
      data: {
        name: t.name,
        initials: t.initials,
        sortOrder: i + 1,
        status: ContentStatus.PUBLISHED,
        translations: {
          create: [
            { locale: Locale.vi, role: t.roleVi, bio: `${t.name} — ${t.roleVi} tại PTC Creative.` },
            { locale: Locale.de, role: t.roleDe, bio: `${t.name} — ${t.roleDe} bei PTC Creative.` },
          ],
        },
      },
    });
  }

  // 6 testimonials
  for (let i = 1; i <= 6; i++) {
    await prisma.testimonial.create({
      data: {
        authorName: `Client ${i}`,
        company: `Firma ${i} GmbH`,
        rating: 5,
        sortOrder: i,
        status: ContentStatus.PUBLISHED,
        translations: {
          create: [
            {
              locale: Locale.vi,
              quote: `PTC đồng bộ biển hiệu, print và website cho chúng tôi — quy trình rõ, chất lượng cao.`,
              role: "Geschäftsführer",
            },
            {
              locale: Locale.de,
              quote: `PTC hat Schilder, Print und Website für uns abgestimmt — klarer Prozess, hohe Qualität.`,
              role: "Geschäftsführer",
            },
          ],
        },
      },
    });
  }

  // pricing samples
  for (const cat of ["CNC", "WEBSITE", "BRANDING"]) {
    for (const tier of [
      { slug: "starter", price: "1.200", hi: false },
      { slug: "pro", price: "3.500", hi: true },
      { slug: "custom", price: "auf Anfrage", hi: false },
    ]) {
      await prisma.pricingPlan.create({
        data: {
          categoryCode: cat,
          slug: tier.slug,
          priceFrom: tier.price,
          highlighted: tier.hi,
          status: ContentStatus.PUBLISHED,
          translations: {
            create: [
              {
                locale: Locale.vi,
                name: `${cat} ${tier.slug}`,
                unit: "dự án",
                description: `Gói ${tier.slug} tham khảo cho ${cat}.`,
                features: ["Brief workshop", "Concept", "Bàn giao file"],
              },
              {
                locale: Locale.de,
                name: `${cat} ${tier.slug}`,
                unit: "Projekt",
                description: `Richtpaket ${tier.slug} für ${cat}.`,
                features: ["Brief-Workshop", "Konzept", "Dateiübergabe"],
              },
            ],
          },
        },
      });
    }
  }

  // Legal pages
  for (const key of ["privacy", "imprint", "terms", "cookies"] as const) {
    await prisma.page.upsert({
      where: { key },
      update: { status: ContentStatus.PUBLISHED },
      create: {
        key,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        translations: {
          create: [
            {
              locale: Locale.vi,
              slug: key,
              title:
                key === "privacy"
                  ? "Datenschutz"
                  : key === "imprint"
                    ? "Impressum"
                    : key === "terms"
                      ? "AGB"
                      : "Cookie Settings",
              body: `Nội dung pháp lý ${key} — cập nhật bởi Admin trước production. PTC Creative tuân thủ GDPR.`,
            },
            {
              locale: Locale.de,
              slug: key,
              title:
                key === "privacy"
                  ? "Datenschutzerklärung"
                  : key === "imprint"
                    ? "Impressum"
                    : key === "terms"
                      ? "AGB"
                      : "Cookie-Einstellungen",
              body: `Rechtlicher Inhalt ${key} — vor Produktion durch Admin aktualisieren. PTC Creative handelt DSGVO-konform.`,
            },
          ],
        },
      },
    });
  }

  // Sample quote + project for demo user
  const qr = await prisma.quoteRequest.create({
    data: {
      reference: "QR-DEMO-001",
      userId: demo.id,
      title: "Restaurant facade + website Berlin",
      categoryCode: "WERBETECHNIK",
      status: QuoteStatus.QUOTED,
      locale: Locale.vi,
      description: "Lightbox + booking website",
      specs: {
        productType: "Lightbox",
        material: "Aluminium + Acrylic",
        widthMm: 2400,
        heightMm: 600,
        thicknessMm: 80,
        quantity: 1,
        color: "RAL 9005",
        processType: "CNC + LED",
        finish: "Matt powder",
        location: "Berlin",
      },
      submittedAt: new Date(),
      quotes: {
        create: {
          authorId: admin.id,
          amountCents: 890000,
          currency: "EUR",
          validUntil: new Date(Date.now() + 14 * 86400000),
          notesVi: "Báo giá sơ bộ — chưa gồm lắp đặt ngoài giờ.",
          notesDe: "Richtangebot — Montage außerhalb der Geschäftszeiten nicht enthalten.",
          items: {
            create: [
              { title: "Lightbox system", quantity: 1, unitCents: 650000, sortOrder: 1 },
              { title: "Installation", quantity: 1, unitCents: 240000, sortOrder: 2 },
            ],
          },
        },
      },
    },
  });

  await prisma.lead.create({
    data: {
      reference: "LD-DEMO-001",
      status: LeadStatus.QUOTED,
      source: LeadSource.QUOTE,
      score: 78,
      name: demo.name,
      email: demo.email,
      company: "Demo GmbH",
      locale: Locale.vi,
      ownerId: demo.id,
      assigneeId: admin.id,
      quoteRequestId: qr.id,
    },
  });

  await prisma.project.create({
    data: {
      reference: "PRJ-DEMO-001",
      title: "Demo GmbH — Phase 1 Brand Kit",
      status: ProjectStatus.IN_PROGRESS,
      ownerId: demo.id,
      staffId: admin.id,
      progress: 35,
      milestones: {
        create: [
          {
            titleVi: "Concept",
            titleDe: "Konzept",
            status: "DONE",
            sortOrder: 1,
            completedAt: new Date(),
          },
          {
            titleVi: "Production",
            titleDe: "Produktion",
            status: "IN_PROGRESS",
            sortOrder: 2,
          },
        ],
      },
    },
  });

  await prisma.systemSetting.upsert({
    where: { key: "ai" },
    update: { value: { model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash", enabled: true } },
    create: {
      key: "ai",
      value: { model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash", enabled: true },
    },
  });

  console.log("Seed complete.");
  console.log("Admin: admin@ptc-creative.de / Password123!");
  console.log("User:  demo@ptc-creative.de / Password123!");
  console.log("Staff: staff@ptc-creative.de / Password123!");
  console.log("Editor: editor@ptc-creative.de / Password123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
