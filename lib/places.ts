import rawPlaces from "../places-data.json";

export type DistrictName = "Kathmandu" | "Lalitpur" | "Bhaktapur";

export type PlaceSection = {
  title: string;
  content: string;
  badge?: string;
  image?: string;
  imageCaption?: string;
};

export type Place = {
  id: string;
  name: string;
  district: DistrictName;
  description: string;
  shortName: string;
  slug: string;
  image?: string;
  locationText: string;
  existenceText: string;
  descriptionText: string;
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

export const PLACE_IMAGES: Record<string, string> = {
  "basantapur-durbar-square": "/images/places/ktm_durbar_sqr.jpg",
  "kathesimbhu-stupa": "/images/places/kathesimbhu.jpg",
  "narayanhity-palace-museum": "/images/places/Narayanhiti palace.jpg",
  "tribhuwan-park": "/images/places/Tribhuwan Park.jpg",
  "swoyambhunath": "/images/places/swoyambhunath.jpg",
  "jal-binayak-koina-ganesh-chobhar": "/images/places/jalbinayak1.jpg",
  "taudaha": "/images/places/taudaha.jpg",
  "shesh-narayan-pharping": "/images/places/sheshnarayan2.jpg",
  "pharping-hydropower-station-soukhel-pharping": "/images/places/hydrostation.JPG",
  "dakshinkali-temple": "/images/places/dakshinkali.jpg",
  "bagh-bhairav-kirtipur": "/images/places/baghbhairab.jpg",
  "adinath-lokeshwor-chobhar": "/images/places/chobhar adinath.jpg",
  "patan-durbar-square": "/images/places/patan durbar square.jpg",
  "rato-machhindranath-tabahal-patan": "/images/places/rato machhindranath.jpg",
  "hiranya-varna-mahabihar-golden-temple-kwabahal-patan": "/images/places/golden temple.jpg",
  "kumbheshwara-temple": "/images/places/kumshiva.jpg",
  "mahabouddha-patan": "/images/places/mahabauddha.jpg",
  "rudra-varna-mahabihar-ukubahal": "/images/places/ukubahal.jpg",
  "central-zoo-jawalakhel": "/images/places/zoo.jpg",
  "ashokan-stupas-patan": "/images/places/lagan stupa.jpg",
  "godawari": "/images/places/godavari.JPG",
  "bajrabarahi-chapagaon": "/images/places/bajrabarahi temple.jpg",
  "nagdaha-dhapakhel": "/images/places/nagdaha.jpg",
  "santaneshwor-mahadev-jharuwarashi-badegaon": "/images/places/santaneswor.jpg",
  "karya-vinayak": "/images/places/karyabinayak.jpg",
  "sikali-khokana": "/images/places/sikali.jpg",
  "rato-machhindranath-bungamati": "/images/places/machhindra bungamati.jpg",
  "bhaktapur-durbar-square": "/images/places/bhaktapur Durbar square.jpg",
  "nyatapola-temple": "/images/places/nyatapol.jpg",
  "dattatreya-temple": "/images/places/dattatrya.jpg",
  "siddha-pokhari": "/images/places/siddha pokhari.jpg",
  "changu-narayan-bhaktapur": "/images/places/changunarayan.jpg",
  "doleshwor-mahadev-sipadol-bhaktapur": "/images/places/doleswor.jpg",
  "kailashnath-mahadev-statue-sanga": "/images/places/sanga mahadev.jpg",
};

const SECTION_IMAGES: Record<string, { image: string; caption: string }> = {
  // Basantapur sub-monuments
  "kasthamandap": { image: "/images/places/kasthamandap.jpg", caption: "Historic wooden pavilion Kasthamandap (Maru Sata)" },
  "gaddi baithak": { image: "/images/places/gaddi baithakk.jpg", caption: "Neoclassical Gaddi Baithak hall" },
  "kaal bhairav": { image: "/images/places/kaalbhairav.jpg", caption: "Colossal 12ft stone carving of Kaal Bhairav" },
  "taleju bell": { image: "/images/places/taleju bell.jpg", caption: "Sacred Taleju Bell and ceremonial drums" },
  "taleju bhawani": { image: "/images/places/taleju ktm.jpg", caption: "Towering Taleju Bhawani temple" },
  "hanuman dhoka": { image: "/images/places/basantapurmuseum.jpg", caption: "Hanuman Dhoka Royal Palace & Museum" },

  // Patan sub-monuments
  "krishna mandir": { image: "/images/places/krishna mandir.jpg", caption: "Shikhara-style stone Krishna Mandir" },
  "mul chowk": { image: "/images/places/mulchowk.jpg", caption: "Sacred ritual courtyard of Mul Chowk" },
  "sundari chowk": { image: "/images/places/sundari chowk.jpg", caption: "Sundari Chowk featuring the royal Tusha Hiti bath" },
  "keshav chowk": { image: "/images/places/keshav chowk.jpg", caption: "Keshav Narayan Chowk, courtyard of Patan Museum" },
  "bhandarkhal": { image: "/images/places/bhandarkhal.jpg", caption: "Bhandarkhal royal garden and water reservoir" },
  "patan museum": { image: "/images/places/patan museum.jpg", caption: "Patan Museum historical gallery" },
  "bhimsen temple": { image: "/images/places/bhimsen temple.jpg", caption: "Three-tiered pagoda of Bhimsen" },
  "vishwanath temple": { image: "/images/places/bishwanath.jpg", caption: "Vishwanath temple with guardian elephants" },
  "hari shankar temple": { image: "/images/places/harishankar.jpg", caption: "Hari Shankar temple dedicated to Vishnu & Shiva" },
  "taleju temple": { image: "/images/places/taleju patan.jpg", caption: "Taleju temple overlooking Patan palace" },
  "char narayan": { image: "/images/places/jagannarayan.jpg", caption: "Char Narayan temple, the oldest in Patan Durbar Square" },

  // Bhaktapur sub-monuments
  "55 window": { image: "/images/places/55 window palace.jpg", caption: "Palace of 55 Carved Windows" },
  "national art museum": { image: "/images/places/bhaktapur museum.jpg", caption: "National Art Museum of Bhaktapur" },

  // Ashokan Stupas
  "southern stupa": { image: "/images/places/lagan stupa.jpg", caption: "Southern Ashokan Stupa at Lagankhel" },
  "western stupa": { image: "/images/places/pucho thur.jpg", caption: "Western Ashokan Stupa at Pulchowk" },
  "eastern stupa": { image: "/images/places/teta thur.JPG", caption: "Eastern Ashokan Stupa at Imadol" },
  "northern stupa": { image: "/images/places/ibahi stupa.jpg", caption: "Northern Ashokan Stupa at Sankhamul" },

  // Other Subsections
  "bagalamukhi": { image: "/images/places/bagalamukhi.jpg", caption: "Bagalamukhi shrine within Kumbheshwara complex" },
  "pharping reservoir": { image: "/images/places/pharping reservoir.jpg", caption: "Masonry reservoir and intake channels at Pharping" },
};

function matchSectionImage(title: string): { image: string; caption: string } | undefined {
  const lower = title.toLowerCase();
  for (const [key, val] of Object.entries(SECTION_IMAGES)) {
    if (lower.includes(key)) {
      return val;
    }
  }
  return undefined;
}

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

function parseStructuredPlace(description: string): {
  locationText: string;
  existenceText: string;
  descriptionText: string;
  sections: PlaceSection[];
} {
  const blocks = description
    .split(/\n\s*\n+/)
    .map((item) => item.replace(/\r/g, " ").trim())
    .filter(Boolean);

  let locationText = "";
  let existenceText = "";
  let descriptionText = "";
  const sections: PlaceSection[] = [];

  let currentSubTitle = "";
  let currentSubContent: string[] = [];

  for (const block of blocks) {
    if (/^Location:\s*/i.test(block)) {
      locationText = block.replace(/^Location:\s*/i, "").trim();
      continue;
    }

    if (/^Existence:\s*/i.test(block)) {
      existenceText = block.replace(/^Existence:\s*/i, "").trim();
      continue;
    }

    if (/^Description:\s*/i.test(block)) {
      descriptionText = block.replace(/^Description:\s*/i, "").trim();
      continue;
    }

    // Check if this block looks like a subsection title (short, no terminal punctuation, or title-like)
    const isTitle =
      block.length <= 80 &&
      !block.endsWith(".") &&
      !block.includes(":\n") &&
      !block.includes(". ");

    if (isTitle) {
      if (currentSubTitle && currentSubContent.length > 0) {
        const secImg = matchSectionImage(currentSubTitle);
        sections.push({
          title: currentSubTitle,
          content: currentSubContent.join("\n\n"),
          badge: "Monument",
          image: secImg?.image,
          imageCaption: secImg?.caption,
        });
      }
      currentSubTitle = block;
      currentSubContent = [];
      continue;
    }

    if (currentSubTitle) {
      currentSubContent.push(block);
    } else if (!descriptionText) {
      descriptionText = block;
    } else {
      descriptionText += "\n\n" + block;
    }
  }

  if (currentSubTitle && currentSubContent.length > 0) {
    const secImg = matchSectionImage(currentSubTitle);
    sections.push({
      title: currentSubTitle,
      content: currentSubContent.join("\n\n"),
      badge: "Monument",
      image: secImg?.image,
      imageCaption: secImg?.caption,
    });
  }

  return {
    locationText,
    existenceText,
    descriptionText,
    sections,
  };
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

    const { locationText, existenceText, descriptionText, sections } = parseStructuredPlace(entry.description);

    // Also populate core sections so backwards-compatible iterators work smoothly
    const allSections: PlaceSection[] = [];
    if (locationText) {
      allSections.push({ title: "Location", content: locationText, badge: "Setting" });
    }
    if (existenceText) {
      allSections.push({ title: "Existence", content: existenceText, badge: "History" });
    }
    if (descriptionText) {
      allSections.push({ title: "Description", content: descriptionText, badge: "Architecture" });
    }
    allSections.push(...sections);

    const image = PLACE_IMAGES[slug];

    return {
      id: `${districtSlugs[district]}-${slug}`,
      name: entry.name,
      district,
      description: entry.description,
      shortName: buildShortName(entry.name),
      slug,
      image,
      locationText,
      existenceText,
      descriptionText,
      sections: allSections,
      summary: summarizeDescription(descriptionText || entry.description),
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
