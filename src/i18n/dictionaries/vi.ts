export type Dictionary = {
  meta: {
    homeTitle: string;
    homeDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    servicesTitle: string;
    servicesDesc: string;
    solutionsTitle: string;
    solutionsDesc: string;
    portfolioTitle: string;
    portfolioDesc: string;
    pricingTitle: string;
    pricingDesc: string;
    blogTitle: string;
    blogDesc: string;
    faqTitle: string;
    faqDesc: string;
    contactTitle: string;
    contactDesc: string;
    loginTitle: string;
    loginDesc: string;
    registerTitle: string;
    registerDesc: string;
    dashboardTitle: string;
    adminTitle: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    solutions: string;
    portfolio: string;
    pricing: string;
    blog: string;
    faq: string;
    contact: string;
    allServices: string;
    allSolutions: string;
    getQuote: string;
    login: string;
    register: string;
    dashboard: string;
    openAi: string;
    story: string;
    team: string;
    process: string;
  };
  common: {
    learnMore: string;
    viewAll: string;
    viewProject: string;
    getStarted: string;
    contactUs: string;
    readMore: string;
    back: string;
    from: string;
    minutes: string;
    features: string;
    capabilities: string;
    benefits: string;
    process: string;
    deliverables: string;
    painPoints: string;
    ourPackage: string;
    related: string;
    filterAll: string;
    noResults: string;
    loading: string;
    success: string;
    error: string;
    empty: string;
    required: string;
    optional: string;
    or: string;
    continue: string;
    save: string;
    cancel: string;
    search: string;
    status: string;
    materials: string;
    duration: string;
    result: string;
    before: string;
    after: string;
    industry: string;
    servicesUsed: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    heroCtaAi: string;
    heroDemoLabel: string;
    heroDemoPlaceholder: string;
    heroDemoSubmit: string;
    heroDemoHint: string;
    layers: { id: string; label: string; desc: string }[];
    statsProjects: string;
    statsIndustries: string;
    statsYears: string;
    statsClients: string;
    ecosystemTitle: string;
    ecosystemSubtitle: string;
    ecosystemSelect: string;
    servicesTitle: string;
    servicesSubtitle: string;
    labTitle: string;
    labSubtitle: string;
    labIndustry: string;
    labProject: string;
    labGoal: string;
    labBudget: string;
    labGenerate: string;
    labReset: string;
    labResultTitle: string;
    labResultEmpty: string;
    labModules: string;
    portfolioTitle: string;
    portfolioSubtitle: string;
    industriesTitle: string;
    industriesSubtitle: string;
    industriesProblems: string;
    industriesStack: string;
    industriesSolutions: string;
    industriesFeatures: string;
    industriesRelatedServices: string;
    industriesImpact: string;
    industriesOutcomes: string;
    industriesTimeline: string;
    industriesIdeal: string;
    industriesMedia: string;
    industriesVideo: string;
    industriesGallery: string;
    industriesFolder: string;
    industriesViewDetail: string;
    processTitle: string;
    processSubtitle: string;
    processSteps: { title: string; desc: string; code: string }[];
    mapTitle: string;
    mapSubtitle: string;
    mapBadge: string;
    mapAbout: string;
    mapServices: string;
    mapSolutions: string;
    mapPortfolio: string;
    mapPricing: string;
    mapPricingHint: string;
    mapBlog: string;
    mapFaq: string;
    mapFaqHint: string;
    mapContact: string;
    aboutTitle: string;
    aboutSubtitle: string;
    blogTitle: string;
    blogSubtitle: string;
    teamTitle: string;
    teamSubtitle: string;
    story: {
      title: string;
      lead: string;
      p1: string;
      p2: string;
      p3: string;
      p4: string;
      pillars: { label: string; value: string }[];
      audioPlay: string;
      audioPause: string;
      audioListening: string;
      audioMissing: string;
      audioError: string;
    };
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  ai: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    suggested: string;
    suggestions: string[];
    servicesTitle: string;
    briefTitle: string;
    missingTitle: string;
    convertCta: string;
    thinking: string;
    empty: string;
    close: string;
    open: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    storyTitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    valuesTitle: string;
    value1Title: string;
    value1Desc: string;
    value2Title: string;
    value2Desc: string;
    value3Title: string;
    value3Desc: string;
    value4Title: string;
    value4Desc: string;
    teamTitle: string;
    teamSubtitle: string;
    processTitle: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    detailCta: string;
    consultCta: string;
    consultTitle: string;
    consultSubtitle: string;
  };
  solutions: {
    badge: string;
    title: string;
    subtitle: string;
    detailCta: string;
    pillars: string;
    outcomes: string;
    media: string;
    processNote: string;
  };
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    filters: {
      all: string;
      website: string;
      cnc: string;
      print: string;
      signage: string;
    };
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    note: string;
    popular: string;
    cta: string;
    modulesLabel: string;
    driversLabel: string;
    fromLabel: string;
    selectedLabel: string;
    scopeLabel: string;
    compareAll: string;
    refLabel: string;
  };
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    featured: string;
    allPosts: string;
    categoriesLabel: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    stillTitle: string;
    stillCta: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formCompany: string;
    formService: string;
    formMessage: string;
    formSubmit: string;
    formSuccessTitle: string;
    formSuccessDesc: string;
    formError: string;
    formSelectService: string;
    infoTitle: string;
    infoEmail: string;
    infoPhone: string;
    infoAddress: string;
    infoHours: string;
    mapPlaceholder: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    email: string;
    password: string;
    name: string;
    company: string;
    confirmPassword: string;
    remember: string;
    forgot: string;
    loginCta: string;
    registerCta: string;
    noAccount: string;
    hasAccount: string;
    demoNote: string;
    successLogin: string;
    successRegister: string;
    errorGeneric: string;
  };
  dashboard: {
    welcome: string;
    overview: string;
    projects: string;
    quotes: string;
    messages: string;
    files: string;
    settings: string;
    newProject: string;
    recentProjects: string;
    openQuotes: string;
    statusDraft: string;
    statusReview: string;
    statusProduction: string;
    statusDone: string;
    emptyProjects: string;
    emptyQuotes: string;
    emptyMessages: string;
  };
  admin: {
    title: string;
    overview: string;
    leads: string;
    projects: string;
    content: string;
    clients: string;
    analytics: string;
    pipeline: string;
    revenue: string;
    activeProjects: string;
    newLeads: string;
    conversion: string;
    recentActivity: string;
    emptyLeads: string;
  };
  footer: {
    tagline: string;
    explore: string;
    company: string;
    capabilities: string;
    contact: string;
    legal: string;
    privacy: string;
    imprint: string;
    terms: string;
    cookies: string;
    rights: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    hours: string;
    follow: string;
    workspace: string;
    platform: string;
    industries: string;
    insights: string;
  };
  mobile: {
    start: string;
    lab: string;
    ai: string;
    contact: string;
  };
};

export const vi: Dictionary = {
  meta: {
    homeTitle: "PTC Creative | From Idea to Real Impact",
    homeDesc:
      "Nền tảng sáng tạo–sản xuất: CNC, Werbetechnik, Printing, Branding, Website & Marketing tại Đức.",
    aboutTitle: "Giới thiệu | PTC Creative",
    aboutDesc: "Creative Technology Partner — từ vật liệu đến thương hiệu số.",
    servicesTitle: "Hệ sinh thái dịch vụ | PTC Creative",
    servicesDesc: "Sáu năng lực liên kết: CNC, Werbetechnik, Printing, Branding, Website, Marketing.",
    solutionsTitle: "Giải pháp theo ngành | PTC Creative",
    solutionsDesc: "Giải pháp cho nhà hàng, nail, salon, shop, nha khoa, logistics và doanh nghiệp.",
    portfolioTitle: "Project Cases | PTC Creative",
    portfolioDesc: "Case study tương tác: vật liệu, công nghệ, before/after và kết quả.",
    pricingTitle: "Bảng giá | PTC Creative",
    pricingDesc: "Giá tham khảo minh bạch theo module năng lực.",
    blogTitle: "Lab Notes | PTC Creative",
    blogDesc: "Ghi chú kỹ thuật về sản xuất, branding và growth.",
    faqTitle: "FAQ | PTC Creative",
    faqDesc: "Câu hỏi về sản xuất, timeline, báo giá và vận hành tại Đức.",
    contactTitle: "Bắt đầu dự án | PTC Creative",
    contactDesc: "Mở brief dự án với PTC Creative.",
    loginTitle: "Đăng nhập | PTC Creative",
    loginDesc: "Truy cập Project Workspace.",
    registerTitle: "Đăng ký | PTC Creative",
    registerDesc: "Tạo tài khoản khách hàng PTC Creative.",
    dashboardTitle: "Workspace | PTC Creative",
    adminTitle: "Admin Console | PTC Creative",
  },
  nav: {
    home: "Trang chủ",
    about: "Giới thiệu",
    services: "Dịch vụ",
    solutions: "Giải pháp",
    portfolio: "Portfolio",
    pricing: "Bảng giá",
    blog: "Blog",
    faq: "FAQ",
    contact: "Liên hệ",
    allServices: "Tất cả dịch vụ",
    allSolutions: "Tất cả ngành",
    getQuote: "Bắt đầu dự án",
    login: "Đăng nhập",
    register: "Đăng ký",
    dashboard: "Workspace",
    openAi: "AI Assistant",
    story: "Câu chuyện PTC",
    team: "Đội ngũ",
    process: "Quy trình",
  },
  common: {
    learnMore: "Khám phá",
    viewAll: "Xem tất cả",
    viewProject: "Mở case",
    getStarted: "Bắt đầu",
    contactUs: "Liên hệ",
    readMore: "Đọc tiếp",
    back: "Quay lại",
    from: "Từ",
    minutes: "phút",
    features: "Tính năng",
    capabilities: "Năng lực",
    benefits: "Giá trị",
    process: "Quy trình",
    deliverables: "Bàn giao",
    painPoints: "Vấn đề phổ biến",
    ourPackage: "Stack giải pháp",
    related: "Liên quan",
    filterAll: "Tất cả",
    noResults: "Chưa có dữ liệu phù hợp.",
    loading: "Đang xử lý…",
    success: "Thành công",
    error: "Có lỗi xảy ra",
    empty: "Chưa có mục nào",
    required: "Bắt buộc",
    optional: "Tuỳ chọn",
    or: "hoặc",
    continue: "Tiếp tục",
    save: "Lưu",
    cancel: "Huỷ",
    search: "Tìm kiếm",
    status: "Trạng thái",
    materials: "Vật liệu / Công nghệ",
    duration: "Thời gian",
    result: "Kết quả",
    before: "Trước",
    after: "Sau",
    industry: "Ngành",
    servicesUsed: "Dịch vụ triển khai",
  },
  home: {
    heroBadge: "CREATIVE TECHNOLOGY PLATFORM · DE",
    heroTitle: "From Idea",
    heroTitleAccent: "to Real Impact",
    heroSubtitle:
      "PTC Creative biến ý tưởng thành nhận diện, vật liệu, sản xuất CNC/signage, nền tảng số và tăng trưởng — một hệ thống, không phải năm nhà thầu rời.",
    heroCtaPrimary: "Bắt đầu dự án",
    heroCtaSecondary: "Khám phá năng lực",
    heroCtaAi: "Mở AI Project Assistant",
    heroDemoLabel: "Thử nghiệm ý tưởng",
    heroDemoPlaceholder: "Tôi muốn mở một nhà hàng Việt tại Berlin…",
    heroDemoSubmit: "Tạo stack giải pháp",
    heroDemoHint: "Demo UI — gợi ý module phù hợp theo brief của bạn.",
    layers: [
      { id: "brand", label: "Brand", desc: "Hệ nhận diện, typography, hình khối" },
      { id: "material", label: "Material", desc: "Gỗ · Acrylic · Kim loại · Giấy" },
      { id: "production", label: "Production", desc: "CNC · Signage · Print" },
      { id: "digital", label: "Digital", desc: "Website · Component · Platform" },
      { id: "growth", label: "Growth", desc: "Local SEO · Ads · Signal" },
    ],
    statsProjects: "Projects shipped",
    statsIndustries: "Industry stacks",
    statsYears: "Years in craft",
    statsClients: "Active partners",
    ecosystemTitle: "Dịch vụ — 6 trụ cột",
    ecosystemSubtitle:
      "CNC & Manufacturing, Werbetechnik, Printing, Branding, Website, Marketing — chọn trụ cột để xem phạm vi và media.",
    ecosystemSelect: "Active module",
    servicesTitle: "Dịch Vụ",
    servicesSubtitle:
      "Sáu lĩnh vực liên kết — mỗi dịch vụ có màu nhận diện riêng và trang chi tiết chuyên sâu.",
    labTitle: "Project Lab",
    labSubtitle:
      "Cấu hình giải pháp theo ngành: chọn loại dự án, mục tiêu và ngân sách — nhận stack module trực quan.",
    labIndustry: "Ngành nghề",
    labProject: "Loại dự án",
    labGoal: "Mục tiêu",
    labBudget: "Ngân sách dự kiến",
    labGenerate: "Mô phỏng giải pháp",
    labReset: "Đặt lại",
    labResultTitle: "Solution stack",
    labResultEmpty: "Cấu hình tham số bên trái để sinh stack module.",
    labModules: "Modules được đề xuất",
    portfolioTitle: "Portfolio",
    portfolioSubtitle:
      "Website · CNC · Print · Signage — mỗi case là một hệ: vật liệu, dịch vụ, before/after và impact.",
    industriesTitle: "Giải pháp theo ngành",
    industriesSubtitle:
      "Mỗi ngành một stack chuyên sâu: biển–CNC–print–web–marketing, kèm ảnh/video minh họa và thư mục media local.",
    industriesProblems: "Vấn đề phổ biến",
    industriesStack: "Ecosystem module",
    industriesSolutions: "Giải pháp chuyên sâu",
    industriesFeatures: "Tính năng cốt lõi",
    industriesRelatedServices: "Dịch vụ liên quan",
    industriesImpact: "Tác động",
    industriesOutcomes: "Kết quả hướng tới",
    industriesTimeline: "Timeline",
    industriesIdeal: "Phù hợp",
    industriesMedia: "Hình ảnh & video",
    industriesVideo: "Video minh họa",
    industriesGallery: "Thư viện ảnh",
    industriesFolder: "Thư mục media local",
    industriesViewDetail: "Xem full stack ngành",
    processTitle: "Quy trình làm việc",
    processSubtitle:
      "Từ brief tại Berlin đến sản xuất, lắp đặt và launch — bốn bước một đội Phú · Tuyên · Chung.",
    processSteps: [
      {
        title: "Signal",
        desc: "Thu thập brief, ngữ cảnh ngành, ràng buộc không gian và mục tiêu tăng trưởng.",
        code: "01 / INTAKE",
      },
      {
        title: "System",
        desc: "Thiết kế hệ nhận diện, vật liệu, layout không gian và kiến trúc số.",
        code: "02 / DESIGN",
      },
      {
        title: "Fabricate",
        desc: "CNC, printing, Werbetechnik — biến bản vẽ thành vật thể và điểm chạm vật lý.",
        code: "03 / MAKE",
      },
      {
        title: "Launch",
        desc: "Website, booking, local presence và chiến dịch — đưa brand vào thị trường.",
        code: "04 / GROW",
      },
    ],
    mapTitle: "Bản đồ nền tảng PTC",
    mapSubtitle:
      "Một platform: giới thiệu, 6 nhóm dịch vụ, giải pháp theo ngành, portfolio, bảng giá, blog, FAQ và liên hệ.",
    mapBadge: "Full platform map",
    mapAbout: "Giới thiệu",
    mapServices: "Dịch vụ",
    mapSolutions: "Giải pháp theo ngành",
    mapPortfolio: "Portfolio",
    mapPricing: "Bảng giá",
    mapPricingHint: "Giá module tham khảo",
    mapBlog: "Blog",
    mapFaq: "FAQ",
    mapFaqHint: "Câu hỏi thường gặp",
    mapContact: "Liên hệ",
    aboutTitle: "Giới thiệu PTC Creative",
    aboutSubtitle:
      "Câu chuyện studio, đội ngũ production–design–growth và quy trình từ brief đến launch.",
    blogTitle: "Blog & kiến thức vận hành",
    blogSubtitle:
      "Ghi chú thực chiến cho SME tại Đức: marketing, thuế, brand và vận hành local.",
    teamTitle: "Hệ thống nhân sự",
    teamSubtitle:
      "Mr. Phú · Mr. Tuyên · Mr. Chung — core team Berlin. Bấm Play để xem video hồ sơ.",
    story: {
      title: "Câu chuyện PTC Creative",
      lead: "Berlin — nơi ba người bạn cùng chí hướng dựng nên một studio sáng tạo–sản xuất.",
      p1: "PTC Creative ra đời tại Berlin khi ba người bạn — Phú, Tuyên và Chung — nhận ra một khoảng trống rõ ràng trên thị trường: doanh nghiệp địa phương (nhà hàng, nail, salon, shop, phòng khám…) thường phải làm việc với quá nhiều nhà thầu rời rạc. Một bên làm biển, một bên in ấn, một bên web, một bên ads — brand bị lệch màu, timeline trượt, trách nhiệm đùn đẩy.",
      p2: "Phú mang vào PTC kinh nghiệm Bau thầu và thi công: hiểu mặt bằng, quy trình lắp đặt, an toàn công trường và cách “đưa bản vẽ xuống thực tế” theo chuẩn kỹ thuật Đức. Tuyên đóng vai trò công nghệ–kỹ thuật: CNC, vật liệu, hệ thống số, website và quy trình sản xuất có kiểm soát. Chung mang ngôn ngữ hình ảnh — nhiếp ảnh và thiết kế đồ họa — để brand nhất quán từ logo, name card, menu đến lightbox và social.",
      p3: "Cả ba đều sống tại Berlin, cùng nhìn thấy cộng đồng doanh nghiệp Việt và SME quốc tế cần một đối tác “từ ý tưởng đến hiện thực”: không chỉ đẹp trên mockup, mà sản xuất được, lắp được, vận hành được online. Đó là hạt giống của PTC — Precision · Technology · Creative.",
      p4: "Hôm nay PTC Creative vận hành như một creative technology platform tại Berlin: branding, CNC & manufacturing, Werbetechnik, printing, website và marketing — một brief, một đội, một tiêu chuẩn chất lượng. Từ mặt tiền phố Berlin đến Google Business Profile, mọi điểm chạm nói cùng một câu chuyện thương hiệu.",
      pillars: [
        { label: "Bau", value: "Mr. Phú" },
        { label: "Tech", value: "Mr. Tuyên" },
        { label: "Visual", value: "Mr. Chung" },
      ],
      audioPlay: "Nghe AI đọc câu chuyện",
      audioPause: "Tạm dừng",
      audioListening: "Đang phát AI Voice…",
      audioMissing: "Chưa có file audio local",
      audioError: "Không phát được audio",
    },
    ctaTitle: "Sẵn sàng biến ý tưởng thành hệ thống vận hành?",
    ctaSubtitle: "Mở brief trong 2 phút — hoặc để AI Project Assistant dựng stack sơ bộ.",
    ctaButton: "Mở brief dự án",
  },
  ai: {
    title: "AI Project Assistant",
    subtitle: "Chuyên gia dự án PTC — dựng brief, gợi ý module và phát hiện thông tin còn thiếu.",
    placeholder: "Mô tả ý tưởng, địa điểm, ngành và mục tiêu…",
    send: "Phân tích",
    suggested: "Suggested prompts",
    suggestions: [
      "Nhà hàng Việt 80m² tại Berlin — brand + biển + web",
      "Nail salon mới ở München cần logo, lightbox và booking",
      "Fleet 12 xe logistics — wrap + website + local ads",
      "Phòng nha khoa: wayfinding, brochure và landing page",
    ],
    servicesTitle: "Service suggestions",
    briefTitle: "Brief summary",
    missingTitle: "Missing information",
    convertCta: "Chuyển thành yêu cầu báo giá",
    thinking: "Đang phân tích brief…",
    empty: "Nhập ý tưởng để AI dựng stack giải pháp demo.",
    close: "Đóng",
    open: "AI Assistant",
  },
  about: {
    badge: "Berlin · Founders",
    title: "Câu chuyện PTC Creative",
    subtitle:
      "Ba người bạn tại Berlin — Phú, Tuyên, Chung — dựng platform sáng tạo–sản xuất từ Bau, kỹ thuật và hình ảnh.",
    storyTitle: "Câu chuyện PTC",
    storyP1:
      "PTC Creative ra đời tại Berlin khi Phú, Tuyên và Chung thấy SME cần một đối tác trọn gói thay vì nhiều nhà thầu rời.",
    storyP2:
      "Phú mang Bau & thi công, Tuyên mang công nghệ kỹ thuật, Chung mang nhiếp ảnh và thiết kế đồ họa.",
    storyP3:
      "Cùng chí hướng tại Berlin: từ ý tưởng đến biển, web và tăng trưởng — một hệ thống.",
    valuesTitle: "Nguyên tắc vận hành",
    value1Title: "Precision",
    value1Desc: "Bau, CNC, lắp đặt đúng chuẩn kỹ thuật Đức — không “gần đúng”.",
    value2Title: "System thinking",
    value2Desc: "Logo, biển, web, print là một hệ — không phải file rời.",
    value3Title: "Craft + tech",
    value3Desc: "Tay nghề thực địa gặp công nghệ và visual craft.",
    value4Title: "Long-term partner",
    value4Desc: "Ship xong vẫn đồng hành vận hành và iterate tại Berlin.",
    teamTitle: "Hệ thống nhân sự",
    teamSubtitle: "Hồ sơ core team PTC Creative — Berlin.",
    processTitle: "Quy trình làm việc",
  },
  services: {
    badge: "Dịch vụ",
    title: "Dịch Vụ",
    subtitle:
      "CNC & Manufacturing · Werbetechnik · Printing · Branding · Website · Marketing — một pipeline brief & QA.",
    detailCta: "Yêu cầu báo giá module này",
    consultCta: "Tư vấn trực tiếp",
    consultTitle: "Cần tư vấn cho lĩnh vực này?",
    consultSubtitle:
      "Team PTC tại Berlin phản hồi nhanh với hướng giải pháp và báo giá sơ bộ.",
  },
  solutions: {
    badge: "Giải pháp",
    title: "Giải pháp theo ngành",
    subtitle:
      "Stack chuyên sâu cho nhà hàng, nail, salon, shop, nha khoa, logistics và doanh nghiệp tại Đức — kèm media minh họa.",
    detailCta: "Nhận stack cho ngành của bạn",
    pillars: "Trụ giải pháp",
    outcomes: "Kết quả",
    media: "Media minh họa",
    processNote: "Brief → thiết kế → sản xuất Berlin → launch online–offline.",
  },
  portfolio: {
    badge: "Portfolio",
    title: "Dự án đã triển khai",
    subtitle: "Lọc Website · CNC · Print · Signage. Mỗi case: vật liệu, dịch vụ, before/after.",
    filters: {
      all: "Tất cả",
      website: "Website",
      cnc: "CNC",
      print: "Print",
      signage: "Signage",
    },
  },
  pricing: {
    badge: "Pricing",
    title: "Giá tham khảo theo module",
    subtitle:
      "Bảng giá định hướng theo từng năng lực PTC. Số liệu “từ” — báo giá chính thức sau khi chốt brief, vật liệu và tiến độ.",
    note: "Báo giá chi tiết trong 24–48 giờ làm việc. Phạm vi, vật liệu và lắp đặt có thể làm thay đổi mức giá cuối.",
    popular: "Khuyến nghị",
    cta: "Yêu cầu báo giá",
    modulesLabel: "Chọn module",
    driversLabel: "Yếu tố giá",
    fromLabel: "Giá từ",
    selectedLabel: "Đang chọn",
    scopeLabel: "Phạm vi",
    compareAll: "Xem đầy đủ",
    refLabel: "Richtpreis",
  },
  blog: {
    badge: "Knowledge",
    title: "Kiến thức vận hành & growth",
    subtitle:
      "Bài viết ngắn, thực dụng — từ khai trương cửa hàng, Google Ads local đến checklist web & biển hiệu tại Đức.",
    featured: "Nổi bật",
    allPosts: "Tất cả bài viết",
    categoriesLabel: "Chủ đề",
  },
  faq: {
    badge: "FAQ",
    title: "Câu hỏi thường gặp",
    subtitle:
      "Timeline, vật liệu, bảo hành, báo giá và lắp đặt — trả lời thẳng, lọc theo chủ đề.",
    stillTitle: "Chưa thấy câu trả lời?",
    stillCta: "Hỏi AI Assistant",
  },
  contact: {
    badge: "Project brief",
    title: "Bắt đầu dự án với PTC",
    subtitle:
      "Gửi brief — team Berlin phản hồi trong giờ làm việc với hướng stack và bước tiếp theo.",
    formName: "Họ và tên",
    formEmail: "Email",
    formPhone: "Điện thoại",
    formCompany: "Công ty",
    formService: "Module quan tâm",
    formMessage: "Mô tả dự án",
    formSubmit: "Gửi brief",
    formSuccessTitle: "Brief đã vào pipeline",
    formSuccessDesc: "Cảm ơn bạn. Team sẽ liên hệ với hướng tiếp theo.",
    formError: "Vui lòng điền các trường bắt buộc.",
    formSelectService: "Chọn module",
    infoTitle: "Kênh liên hệ",
    infoEmail: "Email",
    infoPhone: "Điện thoại",
    infoAddress: "Địa điểm",
    infoHours: "Giờ làm việc",
    mapPlaceholder: "Berlin / Đức — coverage toàn quốc",
  },
  auth: {
    loginTitle: "Đăng nhập Workspace",
    loginSubtitle: "Truy cập dự án, báo giá và file bàn giao.",
    registerTitle: "Tạo tài khoản khách",
    registerSubtitle: "Theo dõi pipeline dự án từ brief đến bàn giao.",
    email: "Email",
    password: "Mật khẩu",
    name: "Họ tên",
    company: "Công ty",
    confirmPassword: "Xác nhận mật khẩu",
    remember: "Ghi nhớ phiên",
    forgot: "Quên mật khẩu?",
    loginCta: "Đăng nhập",
    registerCta: "Tạo tài khoản",
    noAccount: "Chưa có tài khoản?",
    hasAccount: "Đã có tài khoản?",
    demoNote: "UI demo — không kết nối authentication thật.",
    successLogin: "Đăng nhập demo thành công.",
    successRegister: "Đăng ký demo thành công.",
    errorGeneric: "Không thể xử lý. Kiểm tra lại thông tin.",
  },
  dashboard: {
    welcome: "Project Workspace",
    overview: "Tổng quan",
    projects: "Dự án",
    quotes: "Báo giá",
    messages: "Tin nhắn",
    files: "Files",
    settings: "Cài đặt",
    newProject: "Brief mới",
    recentProjects: "Dự án gần đây",
    openQuotes: "Báo giá đang mở",
    statusDraft: "Draft",
    statusReview: "Review",
    statusProduction: "Production",
    statusDone: "Done",
    emptyProjects: "Chưa có dự án. Mở brief để bắt đầu.",
    emptyQuotes: "Chưa có báo giá.",
    emptyMessages: "Hộp thư trống.",
  },
  admin: {
    title: "Admin Console",
    overview: "Overview",
    leads: "Leads",
    projects: "Projects",
    content: "Content",
    clients: "Clients",
    analytics: "Analytics",
    pipeline: "Pipeline",
    revenue: "Revenue (demo)",
    activeProjects: "Active projects",
    newLeads: "New leads",
    conversion: "Conversion",
    recentActivity: "Recent activity",
    emptyLeads: "Không có lead mới.",
  },
  footer: {
    tagline:
      "Creative Technology Platform — từ vật liệu, CNC và Werbetechnik đến brand, website và growth tại Đức.",
    explore: "Khám phá",
    company: "Công ty",
    capabilities: "Năng lực",
    contact: "Liên hệ",
    legal: "Pháp lý",
    privacy: "Datenschutz",
    imprint: "Impressum",
    terms: "AGB",
    cookies: "Cookie",
    rights: "Đã đăng ký bản quyền.",
    ctaTitle: "Sẵn sàng biến ý tưởng thành hệ thống vận hành?",
    ctaSubtitle: "Mở brief dự án — team PTC phản hồi trong giờ làm việc.",
    ctaButton: "Bắt đầu dự án",
    hours: "Giờ làm việc",
    follow: "Kênh",
    workspace: "Workspace",
    platform: "Nền tảng",
    industries: "Ngành",
    insights: "Blog",
  },
  mobile: {
    start: "Dự án",
    lab: "Lab",
    ai: "AI",
    contact: "Liên hệ",
  },
};
