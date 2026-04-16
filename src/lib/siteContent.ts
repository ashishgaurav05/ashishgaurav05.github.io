export interface WorkRole {
  title: string;
  company: string;
  dates: string;
  location: string;
  paragraph: string;
  bullets: string[];
}

export interface LetsGoContent {
  paragraphs: string[];
  bullets: string[];
  externalLink?: {
    label: string;
    href: string;
  };
}

export interface CapabilitySection {
  id: "sourcing" | "due_diligence" | "valuation_and_financial_analysis" | "market_and_industry_research";
  title: string;
  isPlaceholder: boolean;
  references: string[];
}

function normalizeBlock(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function extractSection(raw: string, sectionName: string): string {
  const pattern = new RegExp(
    `## ${sectionName}\\n([\\s\\S]*?)(?:\\n---\\n|\\n##\\s|$)`
  );
  const match = raw.match(pattern);
  return match ? normalizeBlock(match[1]) : "";
}

export function getAboutMeParagraphs(raw: string): string[] {
  const section = extractSection(raw, "about_me");
  if (!section) return [];
  return section
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function cleanInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .trim();
}

export function getLetsGoContent(raw: string): LetsGoContent {
  const section = extractSection(raw, "about_lets_go");
  if (!section) {
    return { paragraphs: [], bullets: [] };
  }

  const blocks = section
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const paragraphs: string[] = [];
  const bullets: string[] = [];
  let externalLink: LetsGoContent["externalLink"];

  for (const block of blocks) {
    if (block.startsWith("- ")) {
      bullets.push(cleanInlineMarkdown(block.replace(/^- /, "")));
      continue;
    }

    if (block.startsWith("External link:")) {
      const linkMatch = block.match(/\[(.+?)\]\((.+?)\)/);
      if (linkMatch) {
        externalLink = {
          label: linkMatch[1].trim(),
          href: linkMatch[2].trim()
        };
      }
      continue;
    }

    paragraphs.push(cleanInlineMarkdown(block));
  }

  return { paragraphs, bullets, externalLink };
}

function splitReferenceLines(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("PLACEHOLDER"));
}

export function getCapabilitySections(raw: string): CapabilitySection[] {
  const definitions: Array<{ id: CapabilitySection["id"]; title: string }> = [
    { id: "sourcing", title: "Sourcing" },
    { id: "due_diligence", title: "Due diligence" },
    { id: "valuation_and_financial_analysis", title: "Valuation & financial analysis" },
    { id: "market_and_industry_research", title: "Market & industry research" }
  ];

  return definitions.map(({ id, title }) => {
    const section = extractSection(raw, id);
    const isPlaceholder = /PLACEHOLDER/i.test(section);
    const references = splitReferenceLines(section).map((line) => cleanInlineMarkdown(line));

    return {
      id,
      title,
      isPlaceholder,
      references
    };
  });
}

function getField(block: string, field: string): string {
  const match = block.match(new RegExp(`^${field}:\\s*(.+)$`, "m"));
  return match ? match[1].trim() : "";
}

export function getWorkRoles(raw: string): WorkRole[] {
  const section = extractSection(raw, "work_experience");
  if (!section) return [];

  const roleBlocks = section
    .split(/### role_\d+\n/g)
    .map((item) => normalizeBlock(item))
    .filter((item) => item.length > 0);

  return roleBlocks.map((block) => {
    const paragraphMatch = block.match(/paragraph:\n([^\n]+)/m);
    const bulletsBlockMatch = block.match(/bullets:\n([\s\S]*)$/m);
    const bullets = bulletsBlockMatch
      ? bulletsBlockMatch[1]
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.startsWith("- "))
          .map((line) => line.replace(/^- /, ""))
      : [];

    return {
      title: getField(block, "title"),
      company: getField(block, "company"),
      dates: getField(block, "dates"),
      location: getField(block, "location"),
      paragraph: paragraphMatch ? paragraphMatch[1].trim() : "",
      bullets
    };
  });
}
