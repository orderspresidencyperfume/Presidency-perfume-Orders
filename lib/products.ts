import fs from "fs";
import path from "path";

export type ProductCollection = "inspired" | "signature";
export type Gender = "Men" | "Women" | "Unisex";
export type ProductType = "Perfume" | "Attar";

export type Product = {
  slug: string;
  name: string;
  folder: string;
  gender: Gender;
  collection: ProductCollection;
  type: ProductType;
  inspiredBy?: string;
  description: string;
  scentStory: string;
  whenToWear: string[];
  howToUse: string;
  fragranceFamily: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: {
    label: string;
    price: number;
  }[];
  images: string[];
};

function getImages(folder: string) {
  const folderPath = path.join(
    process.cwd(),
    "public",
    "perfumes",
    folder
  );

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(webp|png|jpg|jpeg)$/i.test(file))
    .sort((a, b) => {
      const aNumber = parseInt(a.match(/\d+/)?.[0] || "9999");
      const bNumber = parseInt(b.match(/\d+/)?.[0] || "9999");

      return aNumber - bNumber;
    });

  return files.map(
    (file) =>
      `/perfumes/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`
  );
}

function createProduct(data: Omit<Product, "images">): Product {
  return {
    ...data,
    images: getImages(data.folder),
  };
}

export const products: Product[] = [
  createProduct({
    slug: "accento",
    name: "Accento",
    folder: "ACCENTO",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A refined Presidency signature fragrance with a polished and elegant character.",
    scentStory:
      "Accento is presented as a distinctive Presidency fragrance designed for effortless everyday elegance.",
    whenToWear: [
      "Daytime",
      "Office",
      "Brunch",
      "Evening",
      "Everyday wear",
    ],
    howToUse:
      "Spray lightly on pulse points such as the wrists and neck.",
    fragranceFamily: ["Fresh", "Floral", "Woody"],
    notes: {
      top: ["Fresh Accord"],
      heart: ["Floral Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "african-oud",
    name: "African Oud",
    folder: "AFRICAN OUD",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Jasmin flower",
    description:
      "A rich and elegant Presidency fragrance with an oud-inspired character and floral depth.",
    scentStory:
      "African Oud combines a deep oud atmosphere with a refined floral character for a distinctive fragrance experience.",
    whenToWear: [
      "Evening",
      "Special occasions",
      "Celebrations",
      "Night events",
    ],
    howToUse:
      "Apply lightly to pulse points and clothing.",
    fragranceFamily: ["Oud", "Floral", "Warm"],
    notes: {
      top: ["Floral Accord"],
      heart: ["Jasmine Accord"],
      base: ["Oud Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "all-time",
    name: "All Time",
    folder: "ALL TIME",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Louis Vuitton Pacific Chill",
    description:
      "A fresh and uplifting Presidency fragrance designed for an effortless everyday presence.",
    scentStory:
      "All Time brings a fresh, bright and easygoing fragrance character to your daily routine.",
    whenToWear: [
      "Daytime",
      "Casual outings",
      "Travel",
      "Warm weather",
      "Everyday wear",
    ],
    howToUse:
      "Spray on pulse points for a fresh fragrance experience.",
    fragranceFamily: ["Fresh", "Fruity", "Aquatic"],
    notes: {
      top: ["Fresh Citrus"],
      heart: ["Fruity Accord"],
      base: ["Clean Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "alpha",
    name: "Alpha",
    folder: "ALPHA",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Jean Paul Gaultier Ultra Male",
    description:
      "A confident and expressive Presidency fragrance with a warm, sweet and charismatic character.",
    scentStory:
      "Alpha opens with an inviting aromatic impression before developing into a rich and smooth warm character.",
    whenToWear: [
      "Evening",
      "Night out",
      "Date nights",
      "Special occasions",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Sweet", "Warm", "Aromatic"],
    notes: {
      top: ["Aromatic Accord"],
      heart: ["Sweet Accord"],
      base: ["Warm Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "aqua-di-blue",
    name: "Aqua Di Blue",
    folder: "Aqua Di Blue",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Armani Acqua di Gio",
    description:
      "A fresh aquatic Presidency fragrance with a clean and sophisticated character.",
    scentStory:
      "Aqua Di Blue creates a refreshing aquatic impression with an effortless everyday elegance.",
    whenToWear: [
      "Daytime",
      "Office",
      "Travel",
      "Warm weather",
      "Everyday wear",
    ],
    howToUse:
      "Spray on pulse points and clothing.",
    fragranceFamily: ["Aquatic", "Fresh", "Citrus"],
    notes: {
      top: ["Fresh Citrus"],
      heart: ["Aquatic Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "black-oud",
    name: "Black Oud",
    folder: "BLACK OUD",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Warm and oud notes",
    description:
      "A deep and luxurious Presidency fragrance built around a warm oud-inspired character.",
    scentStory:
      "Black Oud creates an enveloping fragrance experience with warmth, depth and a refined oud character.",
    whenToWear: [
      "Evening",
      "Formal occasions",
      "Celebrations",
      "Cooler days",
    ],
    howToUse:
      "Apply lightly to pulse points for a refined fragrance trail.",
    fragranceFamily: ["Oud", "Warm", "Woody"],
    notes: {
      top: ["Warm Accord"],
      heart: ["Oud Accord"],
      base: ["Woody Amber Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "bright-star",
    name: "Bright Star",
    folder: "BRIGHT STAR",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A bright Presidency signature with an elegant and uplifting personality.",
    scentStory:
      "Bright Star is designed around a radiant fragrance character that feels polished and inviting.",
    whenToWear: [
      "Daytime",
      "Brunch",
      "Casual occasions",
      "Everyday wear",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Fresh", "Bright", "Floral"],
    notes: {
      top: ["Bright Accord"],
      heart: ["Floral Accord"],
      base: ["Soft Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "coco-blast",
    name: "Coco Blast",
    folder: "COCO BLAST",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Xerjoff Purple",
    description:
      "A rich and expressive Presidency fragrance with a sweet and luxurious character.",
    scentStory:
      "Coco Blast creates a memorable sweet impression with a smooth and polished finish.",
    whenToWear: [
      "Evening",
      "Date nights",
      "Parties",
      "Special occasions",
    ],
    howToUse:
      "Apply to pulse points and clothing.",
    fragranceFamily: ["Sweet", "Floral", "Warm"],
    notes: {
      top: ["Fruity Accord"],
      heart: ["Floral Accord"],
      base: ["Sweet Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "coco-vanilla",
    name: "Coco Vanilla",
    folder: "COCO VANILLA",
    gender: "Women",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Kayali Vanilla 28",
    description:
      "A warm and inviting vanilla-led Presidency fragrance with a soft, elegant character.",
    scentStory:
      "Coco Vanilla surrounds the wearer in a smooth vanilla character designed for effortless elegance.",
    whenToWear: [
      "Evening",
      "Date nights",
      "Brunch",
      "Celebrations",
      "Special moments",
    ],
    howToUse:
      "Apply to pulse points for a soft fragrance trail.",
    fragranceFamily: ["Vanilla", "Sweet", "Warm"],
    notes: {
      top: ["Warm Accord"],
      heart: ["Vanilla Accord"],
      base: ["Amber & Woods"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "cool-elixir",
    name: "Cool Elixir",
    folder: "COOL ELIXIR",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Ajmal Blu",
    description:
      "A cool and refreshing Presidency fragrance with an aquatic everyday character.",
    scentStory:
      "Cool Elixir creates a crisp and refreshing presence designed for effortless daily wear.",
    whenToWear: [
      "Daytime",
      "Office",
      "Travel",
      "Warm weather",
      "Everyday wear",
    ],
    howToUse:
      "Spray lightly over pulse points and clothing.",
    fragranceFamily: ["Fresh", "Aquatic", "Clean"],
    notes: {
      top: ["Fresh Accord"],
      heart: ["Aquatic Accord"],
      base: ["Clean Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "desert-rain",
    name: "Desert Rain",
    folder: "DESERT RAIN",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Dolce & Gabbana Velvet Desert Oud",
    description:
      "A rich and warm Presidency fragrance inspired by an elegant oud and desert atmosphere.",
    scentStory:
      "Desert Rain creates a deep and enveloping character with warm woods and an elegant oud-inspired presence.",
    whenToWear: [
      "Evening",
      "Formal occasions",
      "Celebrations",
      "Night events",
      "Cooler seasons",
    ],
    howToUse:
      "Use a few sprays on pulse points and clothing.",
    fragranceFamily: ["Oud", "Warm", "Woody"],
    notes: {
      top: ["Warm Spices"],
      heart: ["Rose & Incense"],
      base: ["Oud & Amber"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "desire-ice",
    name: "Desire Ice",
    folder: "DESIRE ICE",
    gender: "Men",
    collection: "signature",
    type: "Perfume",
    description:
      "A crisp Presidency fragrance with a cool and refreshing personality.",
    scentStory:
      "Desire Ice brings a clean, bright and refreshing presence that feels easy to wear.",
    whenToWear: [
      "Daytime",
      "Office",
      "Casual outings",
      "Travel",
      "Warm weather",
    ],
    howToUse:
      "Spray onto pulse points for a fresh everyday impression.",
    fragranceFamily: ["Fresh", "Cool", "Aquatic"],
    notes: {
      top: ["Cool Fresh Accord"],
      heart: ["Aquatic Accord"],
      base: ["Clean Woods"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "elite-aqua",
    name: "Elite Aqua",
    folder: "ELITE AQUA",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Rasasi Hawas",
    description:
      "A fresh, energetic and aquatic Presidency fragrance created for a confident everyday presence.",
    scentStory:
      "Elite Aqua moves through a refreshing aquatic character before settling into a clean woody finish.",
    whenToWear: [
      "Daytime",
      "Office",
      "Casual outings",
      "Travel",
      "Warm weather",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Fresh", "Aquatic", "Woody"],
    notes: {
      top: ["Fresh Citrus"],
      heart: ["Aquatic Notes"],
      base: ["Woody Notes"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "fruit-punch",
    name: "Fruit Punch",
    folder: "FRUIT PUNCH",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Oreo cookies",
    description:
      "A playful Presidency fragrance with a sweet and fruity character.",
    scentStory:
      "Fruit Punch creates an expressive sweet impression designed to feel fun and inviting.",
    whenToWear: [
      "Daytime",
      "Casual outings",
      "Brunch",
      "Parties",
    ],
    howToUse:
      "Spray lightly on pulse points.",
    fragranceFamily: ["Fruity", "Sweet", "Gourmand"],
    notes: {
      top: ["Fruity Accord"],
      heart: ["Sweet Accord"],
      base: ["Gourmand Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "guilty",
    name: "Guilty",
    folder: "GUILTY",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Gucci Guilty",
    description:
      "A confident Presidency fragrance with a modern and elegant character.",
    scentStory:
      "Guilty is designed to create a polished fragrance impression that transitions beautifully from daytime to evening.",
    whenToWear: [
      "Office",
      "Daytime",
      "Evening",
      "Special occasions",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Aromatic", "Fresh", "Woody"],
    notes: {
      top: ["Aromatic Accord"],
      heart: ["Floral Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "imaginary",
    name: "Imaginary",
    folder: "Imaginary",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A distinctive Presidency fragrance designed around a clean, modern and imaginative character.",
    scentStory:
      "Imaginary offers a refined fragrance journey created for effortless everyday presence.",
    whenToWear: [
      "Daytime",
      "Office",
      "Travel",
      "Everyday wear",
    ],
    howToUse:
      "Spray lightly on pulse points.",
    fragranceFamily: ["Fresh", "Clean", "Woody"],
    notes: {
      top: ["Fresh Accord"],
      heart: ["Clean Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "intensity-blue",
    name: "Intensity Blue",
    folder: "INTENSITY BLUE",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "D&G Light Blue Intense",
    description:
      "A fresh and energetic Presidency fragrance with a crisp aquatic personality.",
    scentStory:
      "Intensity Blue brings a refreshing blue fragrance character made for confident daily wear.",
    whenToWear: [
      "Daytime",
      "Office",
      "Travel",
      "Warm weather",
      "Casual occasions",
    ],
    howToUse:
      "Spray onto pulse points and clothing.",
    fragranceFamily: ["Fresh", "Aquatic", "Citrus"],
    notes: {
      top: ["Citrus Accord"],
      heart: ["Aquatic Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "jannat-ul-firdous",
    name: "Jannat Ul Firdous",
    folder: "JANNAT UL FIRDOUS",
    gender: "Unisex",
    collection: "inspired",
    type: "Attar",
    inspiredBy: "Blend of Spices",
    description:
      "A rich Presidency fragrance with a warm and expressive spicy character.",
    scentStory:
      "Jannat Ul Firdous creates a deep and inviting impression through its warm aromatic personality.",
    whenToWear: [
      "Evening",
      "Special occasions",
      "Celebrations",
      "Night events",
    ],
    howToUse:
      "Apply a small amount to pulse points.",
    fragranceFamily: ["Spicy", "Warm", "Woody"],
    notes: {
      top: ["Spice Accord"],
      heart: ["Warm Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "6 ML", price: 299 },
      { label: "12 ML", price: 599 },
    ],
  }),

  createProduct({
    slug: "jasmin",
    name: "Jasmin",
    folder: "JASMIN",
    gender: "Women",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Warm and oud notes",
    description:
      "An elegant Presidency fragrance with a soft floral character.",
    scentStory:
      "Jasmin creates a graceful floral impression with a warm and refined finish.",
    whenToWear: [
      "Daytime",
      "Brunch",
      "Evening",
      "Special occasions",
    ],
    howToUse:
      "Apply lightly to pulse points.",
    fragranceFamily: ["Floral", "Warm", "Elegant"],
    notes: {
      top: ["Floral Accord"],
      heart: ["Jasmine Accord"],
      base: ["Warm Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "knight-out",
    name: "Knight Out",
    folder: "KNIGHT OUT",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Fruity and oud combination",
    description:
      "A rich Presidency fragrance blending an expressive fruity character with deep oud warmth.",
    scentStory:
      "Knight Out combines vibrant fruity notes with a luxurious oud-inspired base for an impressive evening presence.",
    whenToWear: [
      "Evening",
      "Night out",
      "Parties",
      "Special occasions",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Fruity", "Oud", "Warm"],
    notes: {
      top: ["Fruity Accord"],
      heart: ["Aromatic Accord"],
      base: ["Oud Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "most-needed",
    name: "Most Needed",
    folder: "MOST NEEDED",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Giorgio Armani",
    description:
      "A refined Presidency fragrance with a confident and elegant character.",
    scentStory:
      "Most Needed creates a sophisticated fragrance impression designed for memorable everyday presence.",
    whenToWear: [
      "Office",
      "Daytime",
      "Evening",
      "Special occasions",
    ],
    howToUse:
      "Spray lightly on pulse points.",
    fragranceFamily: ["Woody", "Aromatic", "Elegant"],
    notes: {
      top: ["Aromatic Accord"],
      heart: ["Fresh Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "ocean",
    name: "Ocean",
    folder: "OCEAN",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A refreshing Presidency signature with a clean aquatic atmosphere.",
    scentStory:
      "Ocean creates an airy and refreshing fragrance experience designed for effortless daily wear.",
    whenToWear: [
      "Daytime",
      "Office",
      "Travel",
      "Warm weather",
      "Everyday wear",
    ],
    howToUse:
      "Spray on pulse points and clothing.",
    fragranceFamily: ["Aquatic", "Fresh", "Clean"],
    notes: {
      top: ["Fresh Accord"],
      heart: ["Aquatic Accord"],
      base: ["Clean Woods"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "ocean-chill",
    name: "Ocean Chill",
    folder: "Ocean Chill",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Louis Vuitton Pacific Chill",
    description:
      "A fresh and lively Presidency fragrance with an uplifting aquatic character.",
    scentStory:
      "Ocean Chill delivers a bright, refreshing fragrance experience designed to feel effortless and energizing.",
    whenToWear: [
      "Daytime",
      "Travel",
      "Warm weather",
      "Casual outings",
    ],
    howToUse:
      "Spray generously over pulse points and clothing.",
    fragranceFamily: ["Fresh", "Fruity", "Aquatic"],
    notes: {
      top: ["Fresh Citrus"],
      heart: ["Fruity Accord"],
      base: ["Clean Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "pure-magic",
    name: "Pure Magic",
    folder: "PURE MAGIC",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A distinctive Presidency signature created with an elegant and inviting fragrance personality.",
    scentStory:
      "Pure Magic offers a refined fragrance journey designed to feel smooth and memorable.",
    whenToWear: [
      "Daytime",
      "Evening",
      "Special occasions",
      "Everyday wear",
    ],
    howToUse:
      "Spray lightly on pulse points.",
    fragranceFamily: ["Elegant", "Warm", "Soft"],
    notes: {
      top: ["Fresh Accord"],
      heart: ["Soft Floral Accord"],
      base: ["Warm Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "purple-oud",
    name: "Purple Oud",
    folder: "PURPLE OUD",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A rich Presidency fragrance with an elegant oud-inspired atmosphere.",
    scentStory:
      "Purple Oud creates a sophisticated and enveloping fragrance presence with rich warmth.",
    whenToWear: [
      "Evening",
      "Formal occasions",
      "Celebrations",
      "Night events",
    ],
    howToUse:
      "Apply lightly to pulse points.",
    fragranceFamily: ["Oud", "Warm", "Woody"],
    notes: {
      top: ["Warm Accord"],
      heart: ["Oud Accord"],
      base: ["Amber Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "shaghaf-oudh",
    name: "Shaghaf Oudh",
    folder: "SHAGHAF OUDH",
    gender: "Unisex",
    collection: "inspired",
    type: "Attar",
    inspiredBy: "Blend of Spices",
    description:
      "A rich and warm Presidency fragrance with an expressive oud character.",
    scentStory:
      "Shaghaf Oudh creates a luxurious warm impression with an inviting depth.",
    whenToWear: [
      "Evening",
      "Celebrations",
      "Special occasions",
      "Night events",
    ],
    howToUse:
      "Apply a small amount to pulse points.",
    fragranceFamily: ["Oud", "Spicy", "Warm"],
    notes: {
      top: ["Spicy Accord"],
      heart: ["Oud Accord"],
      base: ["Warm Woody Accord"],
    },
    sizes: [
      { label: "6 ML", price: 299 },
      { label: "12 ML", price: 599 },
    ],
  }),

  createProduct({
    slug: "sheikh",
    name: "Sheikh",
    folder: "SHEIKH",
    gender: "Men",
    collection: "inspired",
    type: "Attar",
    inspiredBy: "Bin Shaikh Ahmed Al Maghribi",
    description:
      "A rich and elegant Presidency attar with a warm, traditional and sophisticated character.",
    scentStory:
      "Sheikh creates a deep fragrance presence built around warmth, spices and refined woods.",
    whenToWear: [
      "Evening",
      "Special occasions",
      "Celebrations",
      "Formal occasions",
    ],
    howToUse:
      "Apply a small amount to pulse points.",
    fragranceFamily: ["Warm", "Spicy", "Woody"],
    notes: {
      top: ["Spices"],
      heart: ["Warm Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "6 ML", price: 299 },
      { label: "12 ML", price: 599 },
    ],
  }),

  createProduct({
    slug: "sphair",
    name: "Sphair",
    folder: "SPHAIR",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Bleu De Chanel",
    description:
      "A refined blue-style Presidency fragrance with a fresh, aromatic and woody character.",
    scentStory:
      "Sphair brings together a fresh opening with an elegant aromatic and woody character.",
    whenToWear: [
      "Daytime",
      "Office",
      "Evening",
      "Everyday wear",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Fresh", "Aromatic", "Woody"],
    notes: {
      top: ["Citrus Accord"],
      heart: ["Aromatic Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "spiced-rapture",
    name: "Spiced Rapture",
    folder: "Spiced Rapture",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "LV Nomade",
    description:
      "A sophisticated Presidency fragrance with a warm, expressive and adventurous character.",
    scentStory:
      "Spiced Rapture creates a memorable fragrance impression through a rich and warm aromatic journey.",
    whenToWear: [
      "Evening",
      "Travel",
      "Special occasions",
      "Night out",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Warm", "Spicy", "Woody"],
    notes: {
      top: ["Warm Spices"],
      heart: ["Aromatic Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "stronger-with-me",
    name: "Stronger With Me",
    folder: "STRONGER WITH ME",
    gender: "Men",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Azzaro The Most Wanted Parfum",
    description:
      "A powerful and warm Presidency fragrance with a rich, confident personality.",
    scentStory:
      "Stronger With Me creates a bold and inviting fragrance impression with a warm and memorable finish.",
    whenToWear: [
      "Evening",
      "Date nights",
      "Parties",
      "Night out",
    ],
    howToUse:
      "Spray lightly on pulse points.",
    fragranceFamily: ["Warm", "Sweet", "Woody"],
    notes: {
      top: ["Aromatic Accord"],
      heart: ["Warm Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "success",
    name: "Success",
    folder: "SUCCESS",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A polished Presidency signature designed for a confident and refined presence.",
    scentStory:
      "Success presents a smooth fragrance character designed for memorable everyday elegance.",
    whenToWear: [
      "Office",
      "Daytime",
      "Evening",
      "Special occasions",
    ],
    howToUse:
      "Spray lightly on pulse points.",
    fragranceFamily: ["Elegant", "Aromatic", "Woody"],
    notes: {
      top: ["Fresh Accord"],
      heart: ["Aromatic Accord"],
      base: ["Woody Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "tonka",
    name: "Tonka",
    folder: "TONKA",
    gender: "Unisex",
    collection: "signature",
    type: "Perfume",
    description:
      "A smooth Presidency signature built around a warm and comforting tonka character.",
    scentStory:
      "Tonka focuses on a soft, warm and inviting character designed for effortless daily elegance.",
    whenToWear: [
      "Everyday",
      "Evening",
      "Date nights",
      "Relaxed occasions",
    ],
    howToUse:
      "Apply a few sprays to pulse points.",
    fragranceFamily: ["Warm", "Sweet", "Tonka"],
    notes: {
      top: ["Aromatic Notes"],
      heart: ["Warm Accord"],
      base: ["Tonka Bean"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "vanilla-rapture",
    name: "Vanilla Rapture",
    folder: "VANILLA RAPTURE",
    gender: "Unisex",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Lattafa Khamrah",
    description:
      "A warm, rich and inviting Presidency fragrance with a beautifully spiced gourmand character.",
    scentStory:
      "Vanilla Rapture opens with a warm aromatic impression, develops into a rich sweet heart and settles into a smooth vanilla-tonka dry down.",
    whenToWear: [
      "Evening occasions",
      "Date nights",
      "Special celebrations",
      "Night out",
      "Cooler days",
    ],
    howToUse:
      "Spray lightly on the wrists, neck and behind the ears.",
    fragranceFamily: ["Warm", "Sweet", "Spicy", "Gourmand"],
    notes: {
      top: ["Cinnamon", "Nutmeg", "Bergamot"],
      heart: ["Dates", "Praline", "Tuberose", "Mahonial"],
      base: [
        "Vanilla",
        "Tonka Bean",
        "Amberwood",
        "Myrrh",
        "Benzoin",
        "Akigalawood",
      ],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),

  createProduct({
    slug: "yaraa",
    name: "Yaraa",
    folder: "YARAA",
    gender: "Women",
    collection: "inspired",
    type: "Perfume",
    inspiredBy: "Lattafa Yaraa",
    description:
      "A soft and elegant Presidency fragrance with a feminine and inviting character.",
    scentStory:
      "Yaraa creates a graceful fragrance journey with a soft and memorable finish.",
    whenToWear: [
      "Daytime",
      "Brunch",
      "Date nights",
      "Special occasions",
    ],
    howToUse:
      "Spray lightly on pulse points and clothing.",
    fragranceFamily: ["Floral", "Sweet", "Soft"],
    notes: {
      top: ["Fruity Accord"],
      heart: ["Floral Accord"],
      base: ["Sweet Soft Accord"],
    },
    sizes: [
      { label: "30 ML", price: 450 },
      { label: "50 ML", price: 650 },
    ],
  }),
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getInspiredProducts() {
  return products.filter(
    (product) => product.collection === "inspired"
  );
}

export function getSignatureProducts() {
  return products.filter(
    (product) => product.collection === "signature"
  );
}

export function getProductsByGender(gender: Gender) {
  return products.filter(
    (product) => product.gender === gender
  );
}