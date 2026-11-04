export const stats = [
  {
    id: "clients",
    label: "Total Clients",
    value: "24",
    change: "+3 this month",
    trend: "up",
    icon: "users",
  },
  {
    id: "audits",
    label: "Total Audits",
    value: "128",
    change: "+12 this week",
    trend: "up",
    icon: "search",
  },
  {
    id: "completed",
    label: "Completed Audits",
    value: "96",
    change: "+8 vs last week",
    trend: "up",
    icon: "check",
  },
  {
    id: "progress",
    label: "Audits In Progress",
    value: "8",
    change: "-2 vs yesterday",
    trend: "down",
    icon: "clock",
  },
];

export const recentAudits = [
  {
    id: 1,
    client: "Nova Commerce",
    website: "novacommerce.io",
    auditDate: "Nov 4, 2026",
    seoScore: 92,
    status: "Completed",
  },
  {
    id: 2,
    client: "Bright Dental Care",
    website: "brightdental.com",
    auditDate: "Nov 3, 2026",
    seoScore: 78,
    status: "In Progress",
  },
  {
    id: 3,
    client: "Urban Fit Studio",
    website: "urbanfit.studio",
    auditDate: "Nov 2, 2026",
    seoScore: 64,
    status: "Failed",
  },
  {
    id: 4,
    client: "Harbor Legal Group",
    website: "harborlegal.com",
    auditDate: "Nov 1, 2026",
    seoScore: 88,
    status: "Completed",
  },
  {
    id: 5,
    client: "GreenLeaf Organics",
    website: "greenleaforganics.co",
    auditDate: "Oct 30, 2026",
    seoScore: 71,
    status: "In Progress",
  },
  {
    id: 6,
    client: "PixelCraft Agency",
    website: "pixelcraft.agency",
    auditDate: "Oct 28, 2026",
    seoScore: 95,
    status: "Completed",
  },
];

export const industries = [
  "E-commerce",
  "Healthcare",
  "Legal",
  "Fitness",
  "Marketing",
  "Food & Beverage",
  "Technology",
  "Real Estate",
  "Education",
  "Other",
];

export const initialClients = [
  {
    id: 1,
    businessName: "Nova Commerce",
    website: "https://novacommerce.io",
    contactPerson: "Sarah Chen",
    contactEmail: "sarah@novacommerce.io",
    industry: "E-commerce",
    status: "Active",
    lastAuditScore: 92,
    lastAuditDate: "Nov 4, 2026",
    performanceSummary: {
      technicalSeo: 94,
      contentQuality: 90,
      backlinks: 88,
      mobileUsability: 96,
      pageSpeed: 89,
    },
    auditHistory: [
      {
        id: 101,
        date: "Nov 4, 2026",
        score: 92,
        status: "Completed",
        notes: "Strong product schema and improved crawl coverage.",
      },
      {
        id: 102,
        date: "Oct 12, 2026",
        score: 86,
        status: "Completed",
        notes: "Fixed duplicate meta titles across category pages.",
      },
      {
        id: 103,
        date: "Sep 3, 2026",
        score: 81,
        status: "Completed",
        notes: "Baseline audit after site redesign.",
      },
    ],
  },
  {
    id: 2,
    businessName: "Bright Dental Care",
    website: "https://brightdental.com",
    contactPerson: "Dr. Emily Ward",
    contactEmail: "emily@brightdental.com",
    industry: "Healthcare",
    status: "Active",
    lastAuditScore: 78,
    lastAuditDate: "Nov 3, 2026",
    performanceSummary: {
      technicalSeo: 80,
      contentQuality: 76,
      backlinks: 70,
      mobileUsability: 88,
      pageSpeed: 74,
    },
    auditHistory: [
      {
        id: 201,
        date: "Nov 3, 2026",
        score: 78,
        status: "In Progress",
        notes: "Local SEO citations under review.",
      },
      {
        id: 202,
        date: "Sep 20, 2026",
        score: 74,
        status: "Completed",
        notes: "Added location pages and review schema.",
      },
    ],
  },
  {
    id: 3,
    businessName: "Harbor Legal Group",
    website: "https://harborlegal.com",
    contactPerson: "James Porter",
    contactEmail: "james@harborlegal.com",
    industry: "Legal",
    status: "Active",
    lastAuditScore: 88,
    lastAuditDate: "Nov 1, 2026",
    performanceSummary: {
      technicalSeo: 91,
      contentQuality: 87,
      backlinks: 84,
      mobileUsability: 90,
      pageSpeed: 85,
    },
    auditHistory: [
      {
        id: 301,
        date: "Nov 1, 2026",
        score: 88,
        status: "Completed",
        notes: "Practice-area landing pages ranking well.",
      },
      {
        id: 302,
        date: "Aug 18, 2026",
        score: 82,
        status: "Completed",
        notes: "Resolved thin content on attorney bios.",
      },
    ],
  },
  {
    id: 4,
    businessName: "PixelCraft Agency",
    website: "https://pixelcraft.agency",
    contactPerson: "Mia Lopez",
    contactEmail: "mia@pixelcraft.agency",
    industry: "Marketing",
    status: "Active",
    lastAuditScore: 95,
    lastAuditDate: "Oct 28, 2026",
    performanceSummary: {
      technicalSeo: 97,
      contentQuality: 94,
      backlinks: 92,
      mobileUsability: 98,
      pageSpeed: 93,
    },
    auditHistory: [
      {
        id: 401,
        date: "Oct 28, 2026",
        score: 95,
        status: "Completed",
        notes: "Excellent Core Web Vitals and internal linking.",
      },
      {
        id: 402,
        date: "Jul 9, 2026",
        score: 91,
        status: "Completed",
        notes: "Portfolio case studies optimized for keywords.",
      },
    ],
  },
  {
    id: 5,
    businessName: "Urban Fit Studio",
    website: "https://urbanfit.studio",
    contactPerson: "Marcus Lee",
    contactEmail: "marcus@urbanfit.studio",
    industry: "Fitness",
    status: "Inactive",
    lastAuditScore: 64,
    lastAuditDate: "Nov 2, 2026",
    performanceSummary: {
      technicalSeo: 62,
      contentQuality: 58,
      backlinks: 55,
      mobileUsability: 72,
      pageSpeed: 60,
    },
    auditHistory: [
      {
        id: 501,
        date: "Nov 2, 2026",
        score: 64,
        status: "Failed",
        notes: "Crawl blocked by robots.txt misconfiguration.",
      },
      {
        id: 502,
        date: "Jun 14, 2026",
        score: 69,
        status: "Completed",
        notes: "Class schedule pages indexed successfully.",
      },
    ],
  },
  {
    id: 6,
    businessName: "GreenLeaf Organics",
    website: "https://greenleaforganics.co",
    contactPerson: "Priya Nair",
    contactEmail: "priya@greenleaforganics.co",
    industry: "Food & Beverage",
    status: "Active",
    lastAuditScore: 71,
    lastAuditDate: "Oct 30, 2026",
    performanceSummary: {
      technicalSeo: 73,
      contentQuality: 75,
      backlinks: 68,
      mobileUsability: 82,
      pageSpeed: 70,
    },
    auditHistory: [
      {
        id: 601,
        date: "Oct 30, 2026",
        score: 71,
        status: "In Progress",
        notes: "Product page speed optimizations ongoing.",
      },
      {
        id: 602,
        date: "Aug 5, 2026",
        score: 67,
        status: "Completed",
        notes: "Added blog content around organic keywords.",
      },
    ],
  },
  {
    id: 7,
    businessName: "Skyline Realty",
    website: "https://skylinerealty.com",
    contactPerson: "Olivia Brooks",
    contactEmail: "olivia@skylinerealty.com",
    industry: "Real Estate",
    status: "Active",
    lastAuditScore: 83,
    lastAuditDate: "Oct 22, 2026",
    performanceSummary: {
      technicalSeo: 85,
      contentQuality: 80,
      backlinks: 79,
      mobileUsability: 91,
      pageSpeed: 78,
    },
    auditHistory: [
      {
        id: 701,
        date: "Oct 22, 2026",
        score: 83,
        status: "Completed",
        notes: "Listing schema and map embeds validated.",
      },
      {
        id: 702,
        date: "Sep 1, 2026",
        score: 77,
        status: "Completed",
        notes: "Neighborhood guide pages published.",
      },
    ],
  },
  {
    id: 8,
    businessName: "LearnSphere Academy",
    website: "https://learnsphere.edu",
    contactPerson: "Daniel Okonkwo",
    contactEmail: "daniel@learnsphere.edu",
    industry: "Education",
    status: "Inactive",
    lastAuditScore: 69,
    lastAuditDate: "Oct 10, 2026",
    performanceSummary: {
      technicalSeo: 71,
      contentQuality: 68,
      backlinks: 63,
      mobileUsability: 79,
      pageSpeed: 66,
    },
    auditHistory: [
      {
        id: 801,
        date: "Oct 10, 2026",
        score: 69,
        status: "Completed",
        notes: "Course catalog pagination needs improvement.",
      },
      {
        id: 802,
        date: "Jul 28, 2026",
        score: 72,
        status: "Completed",
        notes: "Instructor profile pages optimized.",
      },
    ],
  },
];

/** Snapshot used by the Dashboard Client Overview (unchanged shape). */
export const recentClients = initialClients.slice(0, 4).map((client) => ({
  id: client.id,
  businessName: client.businessName,
  website: client.website,
  lastAuditScore: client.lastAuditScore,
  lastAuditDate: client.lastAuditDate,
}));

export const clientOptions = initialClients
  .filter((client) => client.status === "Active")
  .map((client) => ({
    id: client.id,
    name: client.businessName,
    website: client.website.replace(/^https?:\/\//, ""),
  }));

export const pageTitles = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/audits": "SEO Audits",
  "/reports": "Reports",
  "/settings": "Settings",
};

export function getPageTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/clients/")) return "Client Details";
  if (pathname.startsWith("/audits/")) return "Audit Details";
  if (pathname.startsWith("/reports/")) return "Report Preview";
  return "Dashboard";
}

function buildDemoAnalysis(score) {
  const clamp = (value) => Math.max(0, Math.min(100, value));
  const variance = (delta) => clamp(score + delta);

  return {
    categories: {
      technicalSeo: variance(2),
      onPageSeo: variance(-1),
      performance: variance(-4),
      mobileFriendliness: variance(3),
      contentQuality: variance(-2),
      schemaMarkup: variance(-6),
    },
    issues: {
      critical: [
        {
          id: "c1",
          title: "Missing canonical tags on paginated pages",
          description:
            "Paginated archive URLs do not declare a canonical target, which can dilute ranking signals.",
          severity: "Critical",
        },
        {
          id: "c2",
          title: "Blocked CSS resources in robots.txt",
          description:
            "Important stylesheet paths are disallowed, preventing accurate rendering for crawlers.",
          severity: "Critical",
        },
      ],
      important: [
        {
          id: "i1",
          title: "Thin content on category landing pages",
          description:
            "Several category pages have fewer than 200 words of unique copy and weak internal linking.",
          severity: "Important",
        },
        {
          id: "i2",
          title: "Inconsistent heading hierarchy",
          description:
            "Multiple templates skip from H1 directly to H3, reducing topical clarity for crawlers.",
          severity: "Important",
        },
      ],
      warnings: [
        {
          id: "w1",
          title: "Image alt attributes incomplete",
          description:
            "About 18% of content images are missing descriptive alt text.",
          severity: "Warning",
        },
        {
          id: "w2",
          title: "Open Graph tags partially missing",
          description:
            "Blog posts share incomplete OG metadata, affecting social previews.",
          severity: "Warning",
        },
      ],
      passed: [
        {
          id: "p1",
          title: "HTTPS enabled site-wide",
          description: "All sampled URLs redirect securely over HTTPS.",
          severity: "Passed",
        },
        {
          id: "p2",
          title: "XML sitemap discoverable",
          description: "Sitemap is referenced in robots.txt and returns 200.",
          severity: "Passed",
        },
        {
          id: "p3",
          title: "Mobile viewport configured",
          description: "Responsive viewport meta tag is present on key templates.",
          severity: "Passed",
        },
      ],
    },
    recommendations: [
      "Add self-referencing canonical tags to all indexable templates.",
      "Unblock critical CSS/JS paths in robots.txt and re-test rendering.",
      "Expand unique copy on category pages and strengthen internal links.",
      "Normalize heading hierarchy (H1 → H2 → H3) across templates.",
      "Complete alt text for product and editorial images.",
      "Standardize Open Graph and Twitter card metadata on content pages.",
    ],
  };
}

export const initialAudits = [
  {
    id: 1,
    auditId: "AUD-2026-0112",
    clientId: 1,
    clientName: "Nova Commerce",
    website: "https://novacommerce.io",
    auditDate: "Nov 4, 2026",
    auditDateISO: "2026-11-04",
    seoScore: 92,
    status: "Completed",
    duration: "4m 18s",
    ...buildDemoAnalysis(92),
  },
  {
    id: 2,
    auditId: "AUD-2026-0111",
    clientId: 2,
    clientName: "Bright Dental Care",
    website: "https://brightdental.com",
    auditDate: "Nov 3, 2026",
    auditDateISO: "2026-11-03",
    seoScore: 78,
    status: "In Progress",
    duration: "2m 05s",
    ...buildDemoAnalysis(78),
  },
  {
    id: 3,
    auditId: "AUD-2026-0110",
    clientId: 5,
    clientName: "Urban Fit Studio",
    website: "https://urbanfit.studio",
    auditDate: "Nov 2, 2026",
    auditDateISO: "2026-11-02",
    seoScore: 64,
    status: "Failed",
    duration: "1m 12s",
    ...buildDemoAnalysis(64),
  },
  {
    id: 4,
    auditId: "AUD-2026-0109",
    clientId: 3,
    clientName: "Harbor Legal Group",
    website: "https://harborlegal.com",
    auditDate: "Nov 1, 2026",
    auditDateISO: "2026-11-01",
    seoScore: 88,
    status: "Completed",
    duration: "3m 44s",
    ...buildDemoAnalysis(88),
  },
  {
    id: 5,
    auditId: "AUD-2026-0108",
    clientId: 6,
    clientName: "GreenLeaf Organics",
    website: "https://greenleaforganics.co",
    auditDate: "Oct 30, 2026",
    auditDateISO: "2026-10-30",
    seoScore: 71,
    status: "In Progress",
    duration: "3m 01s",
    ...buildDemoAnalysis(71),
  },
  {
    id: 6,
    auditId: "AUD-2026-0107",
    clientId: 4,
    clientName: "PixelCraft Agency",
    website: "https://pixelcraft.agency",
    auditDate: "Oct 28, 2026",
    auditDateISO: "2026-10-28",
    seoScore: 95,
    status: "Completed",
    duration: "5m 02s",
    ...buildDemoAnalysis(95),
  },
  {
    id: 7,
    auditId: "AUD-2026-0106",
    clientId: 7,
    clientName: "Skyline Realty",
    website: "https://skylinerealty.com",
    auditDate: "Oct 22, 2026",
    auditDateISO: "2026-10-22",
    seoScore: 83,
    status: "Completed",
    duration: "3m 56s",
    ...buildDemoAnalysis(83),
  },
  {
    id: 8,
    auditId: "AUD-2026-0105",
    clientId: 8,
    clientName: "LearnSphere Academy",
    website: "https://learnsphere.edu",
    auditDate: "Oct 10, 2026",
    auditDateISO: "2026-10-10",
    seoScore: 69,
    status: "Completed",
    duration: "4m 27s",
    ...buildDemoAnalysis(69),
  },
  {
    id: 9,
    auditId: "AUD-2026-0104",
    clientId: 1,
    clientName: "Nova Commerce",
    website: "https://novacommerce.io",
    auditDate: "Oct 12, 2026",
    auditDateISO: "2026-10-12",
    seoScore: 86,
    status: "Completed",
    duration: "4m 09s",
    ...buildDemoAnalysis(86),
  },
  {
    id: 10,
    auditId: "AUD-2026-0103",
    clientId: 3,
    clientName: "Harbor Legal Group",
    website: "https://harborlegal.com",
    auditDate: "Sep 18, 2026",
    auditDateISO: "2026-09-18",
    seoScore: null,
    status: "Pending",
    duration: "—",
    categories: {
      technicalSeo: 0,
      onPageSeo: 0,
      performance: 0,
      mobileFriendliness: 0,
      contentQuality: 0,
      schemaMarkup: 0,
    },
    issues: { critical: [], important: [], warnings: [], passed: [] },
    recommendations: [],
  },
  {
    id: 11,
    auditId: "AUD-2026-0102",
    clientId: 2,
    clientName: "Bright Dental Care",
    website: "https://brightdental.com",
    auditDate: "Sep 20, 2026",
    auditDateISO: "2026-09-20",
    seoScore: 74,
    status: "Failed",
    duration: "0m 48s",
    ...buildDemoAnalysis(74),
  },
  {
    id: 12,
    auditId: "AUD-2026-0101",
    clientId: 4,
    clientName: "PixelCraft Agency",
    website: "https://pixelcraft.agency",
    auditDate: "Sep 9, 2026",
    auditDateISO: "2026-09-09",
    seoScore: 91,
    status: "Completed",
    duration: "4m 51s",
    ...buildDemoAnalysis(91),
  },
];

/** Keeps overview cards aligned with the requested demo totals. */
export const auditOverviewOffsets = {
  total: 116,
  completed: 89,
  inProgress: 6,
  failed: 22,
};

export function getAuditOverviewStats(audits) {
  const completed = audits.filter((a) => a.status === "Completed").length;
  const inProgress = audits.filter((a) => a.status === "In Progress").length;
  const failed = audits.filter((a) => a.status === "Failed").length;

  return {
    total: auditOverviewOffsets.total + audits.length,
    completed: auditOverviewOffsets.completed + completed,
    inProgress: auditOverviewOffsets.inProgress + inProgress,
    failed: auditOverviewOffsets.failed + failed,
  };
}

export function createPendingAudit({ client, websiteUrl, nextId, sequence }) {
  const now = new Date();
  const iso = now.toISOString().slice(0, 10);
  const auditDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    id: nextId,
    auditId: `AUD-2026-${String(sequence).padStart(4, "0")}`,
    clientId: client.id,
    clientName: client.businessName,
    website: websiteUrl.trim(),
    auditDate,
    auditDateISO: iso,
    seoScore: null,
    status: "Pending",
    duration: "—",
    categories: {
      technicalSeo: 0,
      onPageSeo: 0,
      performance: 0,
      mobileFriendliness: 0,
      contentQuality: 0,
      schemaMarkup: 0,
    },
    issues: { critical: [], important: [], warnings: [], passed: [] },
    recommendations: [],
  };
}

export function createEmptyClient() {
  return {
    businessName: "",
    website: "",
    contactPerson: "",
    contactEmail: "",
    industry: "",
    status: "Active",
  };
}

export function createClientRecord(formData, nextId) {
  return {
    id: nextId,
    businessName: formData.businessName.trim(),
    website: formData.website.trim(),
    contactPerson: formData.contactPerson.trim(),
    contactEmail: formData.contactEmail.trim(),
    industry: formData.industry,
    status: formData.status,
    lastAuditScore: null,
    lastAuditDate: "—",
    performanceSummary: {
      technicalSeo: 0,
      contentQuality: 0,
      backlinks: 0,
      mobileUsability: 0,
      pageSpeed: 0,
    },
    auditHistory: [],
  };
}

/**
 * Seeded report metadata keyed by audit id.
 * Keeps reports aligned with existing audits/clients.
 */
export const reportSeedMeta = {
  1: {
    status: "Available",
    generatedDate: "Nov 4, 2026",
    generatedDateISO: "2026-11-04",
  },
  2: {
    status: "Processing",
    generatedDate: "—",
    generatedDateISO: "2026-11-03",
  },
  3: {
    status: "Failed",
    generatedDate: "—",
    generatedDateISO: "2026-11-02",
  },
  4: {
    status: "Available",
    generatedDate: "Nov 1, 2026",
    generatedDateISO: "2026-11-01",
  },
  5: {
    status: "Processing",
    generatedDate: "—",
    generatedDateISO: "2026-10-30",
  },
  6: {
    status: "Available",
    generatedDate: "Oct 28, 2026",
    generatedDateISO: "2026-10-28",
  },
  7: {
    status: "Available",
    generatedDate: "Oct 22, 2026",
    generatedDateISO: "2026-10-22",
  },
  8: {
    status: "Available",
    generatedDate: "Oct 10, 2026",
    generatedDateISO: "2026-10-10",
  },
  9: {
    status: "Available",
    generatedDate: "Oct 12, 2026",
    generatedDateISO: "2026-10-12",
  },
  10: {
    status: "Pending",
    generatedDate: "—",
    generatedDateISO: "2026-09-18",
  },
  11: {
    status: "Failed",
    generatedDate: "—",
    generatedDateISO: "2026-09-20",
  },
  12: {
    status: "Available",
    generatedDate: "Sep 9, 2026",
    generatedDateISO: "2026-09-09",
  },
};

function defaultReportMeta(audit) {
  if (audit.status === "Completed") {
    return {
      status: "Available",
      generatedDate: audit.auditDate,
      generatedDateISO: audit.auditDateISO,
    };
  }

  if (audit.status === "In Progress") {
    return {
      status: "Processing",
      generatedDate: "—",
      generatedDateISO: audit.auditDateISO,
    };
  }

  if (audit.status === "Failed") {
    return {
      status: "Failed",
      generatedDate: "—",
      generatedDateISO: audit.auditDateISO,
    };
  }

  return {
    status: "Pending",
    generatedDate: "—",
    generatedDateISO: audit.auditDateISO,
  };
}

export function buildReportsFromAudits(audits) {
  return audits.map((audit) => {
    const meta = reportSeedMeta[audit.id] || defaultReportMeta(audit);
    const numeric = String(audit.auditId).replace(/\D/g, "") || String(audit.id);

    return {
      id: audit.id,
      reportId: `RPT-${numeric}`,
      auditId: audit.id,
      auditRef: audit.auditId,
      clientId: audit.clientId,
      clientName: audit.clientName,
      website: audit.website,
      auditDate: audit.auditDate,
      auditDateISO: audit.auditDateISO,
      seoScore: audit.seoScore,
      status: meta.status,
      generatedDate: meta.generatedDate,
      generatedDateISO: meta.generatedDateISO,
    };
  });
}

export function getReportOverviewStats(reports) {
  const available = reports.filter((r) => r.status === "Available").length;
  const pending = reports.filter(
    (r) => r.status === "Pending" || r.status === "Processing"
  ).length;

  const dayMs = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const recentlyGenerated = reports.filter((report) => {
    if (report.status !== "Available" || report.generatedDateISO === "—") {
      return false;
    }
    const time = new Date(report.generatedDateISO).getTime();
    if (Number.isNaN(time)) return false;
    return now - time <= 14 * dayMs;
  }).length;

  return {
    total: reports.length,
    available,
    recentlyGenerated,
    pending,
  };
}
