import rawPlaces from "../places-data.json";

export type DistrictName = "Kathmandu" | "Lalitpur" | "Bhaktapur";

export type PlaceSection = {
  title: string;
  content: string;
};

export type Place = {
  id: string;
  name: string;
  district: DistrictName;
  description: string;
  shortName: string;
  slug: string;
  sections: PlaceSection[];
  summary: string;
  stats: string[];
};

type RawPlace = {
  name: string;
  district: string;
  description: string;
};

const districtOrder: DistrictName[] = ["Kathmandu", "Lalitpur", "Bhaktapur"];

const districtSlugs: Record<DistrictName, string> = {
  Kathmandu: "kathmandu",
  Lalitpur: "lalitpur",
  Bhaktapur: "bhaktapur",
};

const districtLabels: Record<DistrictName, string> = {
  Kathmandu: "Kathmandu",
  Lalitpur: "Lalitpur",
  Bhaktapur: "Bhaktapur",
};

const districtDescriptions: Record<DistrictName, string> = {
  Kathmandu:
    "The historic heart of the valley, where temples, courtyards, funeral ghats, and hilltop stupas still mark the city’s ceremonial rhythm.",
  Lalitpur:
    "Patan carries the valley’s most concentrated memory of carved wood, courtyards, and Buddhist monastery life, wrapped around its old royal square.",
  Bhaktapur:
    "Bhaktapur preserves the feel of a medieval Newar capital, with its tiered temples, palace compounds, and square-by-square civic texture.",
};

const keywordPattern =
  /^(Location|Existence|Description|Descriptions|History|Historical and Religious Importance|Religious Importance|Location and Existence|Location & Existence|Location, Existence & Descriptions|Location, Existence|Location & Existence & Descriptions|Other places|Location and Existence & Descriptions)$/i;

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/[,]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildShortName(name: string): string {
  const withoutParenthesis = name.replace(/\s*\([^)]*\)/g, "").trim();
  const withComma = withoutParenthesis.replace(/,\s*.*$/, "").trim();
  return withComma || withoutParenthesis;
}

function isHeadingLike(text: string): boolean {
  const compact = text.replace(/\s+/g, " ").trim();
  if (!compact || compact.length > 90) return false;
  if (compact.includes(":")) return false;
  if (keywordPattern.test(compact)) return false;
  if (/^[\d.]+/.test(compact)) return false;
  if (/^(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4}|[A-Z][A-Za-z0-9&/()'-]+(?:\s+[A-Z][A-Za-z0-9&/()'-]+){0,5})$/.test(compact)) {
    return true;
  }
  return false;
}

function parseSections(description: string): PlaceSection[] {
  const paragraphs = description
    .split(/\n\s*\n+/)
    .map((item) => item.replace(/\r/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const sections: PlaceSection[] = [];
  let currentTitle = "Overview";
  let currentContent: string[] = [];

  for (const paragraph of paragraphs) {
    if (isHeadingLike(paragraph)) {
      if (currentContent.length > 0) {
        sections.push({ title: currentTitle, content: currentContent.join(" ") });
      }
      currentTitle = paragraph;
      currentContent = [];
      continue;
    }

    currentContent.push(paragraph);
  }

  if (currentContent.length > 0) {
    sections.push({ title: currentTitle, content: currentContent.join(" ") });
  }

  return sections.length > 1 ? sections : [{ title: "Overview", content: description.replace(/\s+/g, " ").trim() }];
}

function summarizeDescription(description: string): string {
  const normal = description.replace(/\s+/g, " ").trim();
  const firstSentenceMatch = normal.match(/[^.!?]+[.!?]/);
  if (firstSentenceMatch) {
    return firstSentenceMatch[0].trim();
  }
  return normal.slice(0, 200);
}

function extractStats(description: string): string[] {
  const findings = [
    ...description.matchAll(/(\d+\.?\d*\s*(?:m|km|ft|kg|sq\.?\s*m|ft\.?|ropanis|hectares|years|stories|storeys|A\.D|CE|B\.S|N\.S))/gi),
    ...description.matchAll(/(\d{4}\s*(?:A\.D|B\.S|N\.S|CE))/gi),
    ...description.matchAll(/(\d{2,3}\s*(?:m\.|km\.|ft\.?))/gi),
  ];

  const values = findings
    .map((match) => match[1].replace(/\s+/g, " ").trim())
    .filter((value, index, arr) => value && arr.indexOf(value) === index)
    .slice(0, 3);

  return values;
}

function buildPlaceList(): Place[] {
  const slugUsage = new Map<string, number>();

  return (rawPlaces as RawPlace[]).map((entry) => {
    const district = (entry.district as DistrictName) || "Kathmandu";
    const baseSlug = slugifyName(entry.name);
    const nextIndex = slugUsage.get(baseSlug) ?? 0;
    const slug = nextIndex === 0 ? baseSlug : `${baseSlug}-${nextIndex}`;
    slugUsage.set(baseSlug, nextIndex + 1);

    const sections = parseSections(entry.description);

    return {
      id: `${districtSlugs[district]}-${slug}`,
      name: entry.name,
      district,
      description: entry.description,
      shortName: buildShortName(entry.name),
      slug,
      sections,
      summary: summarizeDescription(entry.description),
      stats: extractStats(entry.description),
    };
  });
}

export const places: Place[] = buildPlaceList();
export const districtNames = districtOrder;
export const districtData = districtOrder.map((district) => ({
  district,
  slug: districtSlugs[district],
  label: districtLabels[district],
  description: districtDescriptions[district],
  places: places.filter((place) => place.district === district),
}));

export function getDistrictBySlug(slug: string): DistrictName | undefined {
  const district = districtOrder.find((value) => districtSlugs[value] === slug);
  return district;
}

export function getPlaceByDistrictAndSlug(district: string, slug: string): Place | undefined {
  const resolvedDistrict = getDistrictBySlug(district) ?? district;
  return places.find((place) => place.district === resolvedDistrict && place.slug === slug);
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((place) => place.slug === slug);
}

export function getFeaturedPlaces(): Record<DistrictName, Place[]> {
  return districtOrder.reduce((accumulator, district) => {
    const districtPlaces = places.filter((place) => place.district === district);
    const featured = districtPlaces.slice(0, 3);
    accumulator[district] = featured;
    return accumulator;
  }, {} as Record<DistrictName, Place[]>);
}

export function getDistrictIntro(district: DistrictName): string {
  return districtDescriptions[district];
}

export function getDistrictPath(district: DistrictName): string {
  return `/${districtSlugs[district]}`;
}

export const siteMeta = {
  title: "Khaḍga & Chāitya | Kathmandu Valley Heritage Guide",
  description:
    "Explore 51 heritage places across Kathmandu, Lalitpur, and Bhaktapur with a faithful guide to the valley’s temples, courtyards, and sacred sites.",
};
