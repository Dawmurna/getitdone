export type IconKey =
  | "wrench"
  | "home"
  | "calendar"
  | "briefcase"
  | "graduation"
  | "flower"
  | "camera"
  | "grid";

export interface Category {
  id: string;
  name: string;
  icon: IconKey;
  color: string;
  tint: string;
}

export const categories: Category[] = [
  { id: "artisans", name: "Artisans & Skilled Trades", icon: "wrench", color: "#E8501F", tint: "#FDEDE6" },
  { id: "home", name: "Home & Lifestyle", icon: "home", color: "#16A34A", tint: "#E6F6EC" },
  { id: "events", name: "Events & Celebrations", icon: "calendar", color: "#7C5CE0", tint: "#EFEAFC" },
  { id: "business", name: "Business & Professional Services", icon: "briefcase", color: "#2F6FDE", tint: "#E7EFFC" },
  { id: "education", name: "Education & Personal Development", icon: "graduation", color: "#F5A524", tint: "#FEF3DC" },
  { id: "beauty", name: "Beauty & Wellness", icon: "flower", color: "#E5487A", tint: "#FCE8EF" },
  { id: "photography", name: "Photography & Creative Services", icon: "camera", color: "#12A38A", tint: "#E1F5F1" },
];

export function getCategory(id: string): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export type ServiceMode = "On-site" | "Workshop" | "Remote";

export interface Provider {
  id: string;
  name: string;
  business?: string;
  title: string;
  categoryId: string;
  years: number;
  rating: number;
  reviews: number;
  jobs: string;
  location: string;
  areas: string[];
  languages: string[];
  response: string;
  tagline: string;
  bio: string;
  verified: boolean;
  insured: boolean;
}

export interface Service {
  id: string;
  providerId: string;
  title: string;
  categoryId: string;
  mode: ServiceMode;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
}

export const providers: Provider[] = [
  {
    id: "grace-home-cleaning",
    name: "Grace Home Cleaning Services",
    business: "Grace Home Cleaning Services",
    title: "Home Cleaning",
    categoryId: "home",
    years: 3,
    rating: 4.8,
    reviews: 124,
    jobs: "1.2k+",
    location: "Abuja, FCT",
    areas: ["Gwagwalada", "Kubwa", "Maitama", "Wuse"],
    languages: ["English", "Hausa"],
    response: "Usually responds within 1 hour",
    tagline: "Professional Cleaning Services for Homes & Offices",
    bio: "I'm Grace, the founder of Grace Home Cleaning Services. We provide reliable, professional and affordable cleaning services for homes, offices and short-let spaces. With 3+ years of experience, my team and I are committed to providing a clean, healthy and comfortable environment for our clients. Every job is done with care, and we always bring our own supplies so you don't have to worry about a thing.",
    verified: true,
    insured: true,
  },
  {
    id: "tunde-adeyemi",
    name: "Tunde Adeyemi",
    title: "Plumber",
    categoryId: "artisans",
    years: 5,
    rating: 4.9,
    reviews: 120,
    jobs: "600+",
    location: "Abuja, FCT",
    areas: ["Garki", "Wuse", "Jabi", "Gwarinpa"],
    languages: ["English", "Yoruba"],
    response: "Usually responds within 2 hours",
    tagline: "Leaks, pipes, water heaters and bathroom fittings",
    bio: "I fix leaks, install pipes, water heaters and bathroom fittings. I show up on time, explain the problem clearly and give you a fair price before I start.",
    verified: true,
    insured: false,
  },
  {
    id: "blessing-okafor",
    name: "Blessing Okafor",
    business: "Grace Events",
    title: "Event Planner",
    categoryId: "events",
    years: 6,
    rating: 4.8,
    reviews: 86,
    jobs: "300+",
    location: "Lagos, NG",
    areas: ["Lekki", "Ikeja", "Victoria Island"],
    languages: ["English", "Igbo"],
    response: "Usually responds within 1 hour",
    tagline: "Weddings, birthdays and corporate events done properly",
    bio: "From small birthday dinners to full weddings, I plan and decorate events so you can enjoy your own party. We handle vendors, setup and the day-of coordination.",
    verified: true,
    insured: true,
  },
  {
    id: "amina-yusuf",
    name: "Amina Yusuf",
    business: "Amina Stitches",
    title: "Tailor",
    categoryId: "artisans",
    years: 4,
    rating: 4.9,
    reviews: 74,
    jobs: "400+",
    location: "Abuja, FCT",
    areas: ["Wuse", "Garki", "Utako"],
    languages: ["English", "Hausa"],
    response: "Usually responds within 3 hours",
    tagline: "Custom outfits, alterations and traditional wear",
    bio: "I make custom outfits and do alterations, from Ankara and lace to corporate wear. I work from my workshop and take measurements in person or by video call.",
    verified: true,
    insured: false,
  },
  {
    id: "daniel-chukwudi",
    name: "Daniel Chukwudi",
    business: "Coach Daniel",
    title: "Fitness Coach",
    categoryId: "beauty",
    years: 5,
    rating: 4.9,
    reviews: 112,
    jobs: "500+",
    location: "Abuja, FCT",
    areas: ["Maitama", "Asokoro", "Wuse"],
    languages: ["English"],
    response: "Usually responds within 1 hour",
    tagline: "Personal training at your home, gym or park",
    bio: "I train people one on one at home, at the gym or outdoors. Every plan is built around your goals, schedule and fitness level.",
    verified: true,
    insured: true,
  },
  {
    id: "folake-adeyemi",
    name: "Folake Adeyemi",
    business: "Folake Consulting",
    title: "Business Consultant",
    categoryId: "business",
    years: 7,
    rating: 4.8,
    reviews: 64,
    jobs: "150+",
    location: "Lagos, NG",
    areas: ["Remote across Nigeria"],
    languages: ["English", "Yoruba"],
    response: "Usually responds within 4 hours",
    tagline: "Strategy, pricing and growth plans for small businesses",
    bio: "I help small business owners get clear on pricing, operations and growth. Sessions are practical and end with a plan you can start using the same week.",
    verified: true,
    insured: false,
  },
  {
    id: "lens-by-tobi",
    name: "Tobi Bakare",
    business: "Lens by Tobi",
    title: "Photographer",
    categoryId: "photography",
    years: 6,
    rating: 4.9,
    reviews: 156,
    jobs: "700+",
    location: "Abuja, FCT",
    areas: ["Abuja", "Nasarawa", "Suleja"],
    languages: ["English"],
    response: "Usually responds within 2 hours",
    tagline: "Portraits, events and brand photography",
    bio: "I shoot portraits, events and brand photos. You get edited images within a few days and a relaxed session where you don't have to pretend to be a model.",
    verified: true,
    insured: true,
  },
  {
    id: "ahmed-woodworks",
    name: "Ahmed Ibrahim",
    business: "Ahmed Woodworks",
    title: "Carpenter",
    categoryId: "artisans",
    years: 8,
    rating: 4.8,
    reviews: 98,
    jobs: "350+",
    location: "Abuja, FCT",
    areas: ["Kubwa", "Gwarinpa", "Lugbe"],
    languages: ["English", "Hausa"],
    response: "Usually responds within 3 hours",
    tagline: "Custom furniture, wardrobes and kitchen cabinets",
    bio: "I design and build custom furniture, wardrobes and kitchen cabinets. You choose the style and the wood, I handle the rest and deliver on the date we agreed.",
    verified: true,
    insured: false,
  },
  {
    id: "tunde-art-decor",
    name: "Tunde Art & Decor",
    title: "Painter",
    categoryId: "artisans",
    years: 5,
    rating: 4.8,
    reviews: 77,
    jobs: "250+",
    location: "Abuja, FCT",
    areas: ["Garki", "Maitama", "Jabi"],
    languages: ["English"],
    response: "Usually responds within 2 hours",
    tagline: "Interior and exterior painting with a clean finish",
    bio: "Interior and exterior painting, POP finishing and wall decor. We cover your furniture, work neatly and clean up before we leave.",
    verified: true,
    insured: false,
  },
  {
    id: "chioma-eze",
    name: "Chioma Eze",
    title: "Maths & Coding Tutor",
    categoryId: "education",
    years: 4,
    rating: 4.7,
    reviews: 52,
    jobs: "200+",
    location: "Abuja, FCT",
    areas: ["Online, anywhere in Nigeria"],
    languages: ["English", "Igbo"],
    response: "Usually responds within 2 hours",
    tagline: "Patient one-on-one lessons for students and beginners",
    bio: "I teach maths and beginner programming to secondary school students and career changers. Lessons are online, paced to you, and come with practice work.",
    verified: true,
    insured: false,
  },
];

export const services: Service[] = [
  { id: "s-plumbing", providerId: "tunde-adeyemi", title: "Fixing Leaks & Plumbing Repairs", categoryId: "artisans", mode: "On-site", price: 15000, duration: "1-2 hours", rating: 4.9, reviews: 120 },
  { id: "s-event", providerId: "blessing-okafor", title: "Event Planning & Decoration", categoryId: "events", mode: "On-site", price: 50000, duration: "Full day", rating: 4.8, reviews: 86 },
  { id: "s-tailoring", providerId: "amina-yusuf", title: "Custom Outfits & Tailoring", categoryId: "artisans", mode: "Workshop", price: 20000, duration: "3-5 days", rating: 4.9, reviews: 74 },
  { id: "s-fitness", providerId: "daniel-chukwudi", title: "Personal Fitness Training", categoryId: "beauty", mode: "On-site", price: 25000, duration: "1 hour", rating: 4.9, reviews: 112 },
  { id: "s-consulting", providerId: "folake-adeyemi", title: "Business Strategy Consultation", categoryId: "business", mode: "Remote", price: 30000, duration: "1-2 hours", rating: 4.8, reviews: 64 },
  { id: "s-clean-standard", providerId: "grace-home-cleaning", title: "Home Cleaning (Standard)", categoryId: "home", mode: "On-site", price: 15000, duration: "2-3 hours", rating: 4.8, reviews: 124 },
  { id: "s-clean-deep", providerId: "grace-home-cleaning", title: "Deep Cleaning", categoryId: "home", mode: "On-site", price: 30000, duration: "4-5 hours", rating: 4.8, reviews: 124 },
  { id: "s-clean-office", providerId: "grace-home-cleaning", title: "Office Cleaning", categoryId: "home", mode: "On-site", price: 25000, duration: "3-4 hours", rating: 4.8, reviews: 124 },
  { id: "s-clean-post", providerId: "grace-home-cleaning", title: "Post-Construction Cleaning", categoryId: "home", mode: "On-site", price: 40000, duration: "4-6 hours", rating: 4.8, reviews: 124 },
  { id: "s-photo", providerId: "lens-by-tobi", title: "Photography Services", categoryId: "photography", mode: "On-site", price: 30000, duration: "2 hours", rating: 4.9, reviews: 156 },
  { id: "s-furniture", providerId: "ahmed-woodworks", title: "Custom Furniture Design & Build", categoryId: "artisans", mode: "Workshop", price: 60000, duration: "1-2 weeks", rating: 4.8, reviews: 98 },
  { id: "s-painting", providerId: "tunde-art-decor", title: "Interior Painting Service", categoryId: "artisans", mode: "On-site", price: 35000, duration: "1 day", rating: 4.8, reviews: 77 },
  { id: "s-tutor", providerId: "chioma-eze", title: "Maths & Coding Lessons", categoryId: "education", mode: "Remote", price: 10000, duration: "1 hour", rating: 4.7, reviews: 52 },
];

export function getProvider(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function servicesByProvider(providerId: string): Service[] {
  return services.filter((s) => s.providerId === providerId);
}

export function providerLabel(p: Provider): string {
  return p.business ?? p.name;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  when: string;
  text: string;
}

export function reviewsFor(providerId: string): Review[] {
  if (providerId === "grace-home-cleaning") {
    return [
      { id: "r1", author: "Chioma A.", rating: 5, when: "2 weeks ago", text: "The team did an amazing job! My home looks so clean and fresh. They were punctual, professional and very friendly." },
      { id: "r2", author: "Tunde M.", rating: 5, when: "3 weeks ago", text: "Very reliable and thorough. I've booked them twice already and will definitely use their service again." },
      { id: "r3", author: "Amina B.", rating: 5, when: "1 month ago", text: "Great service! They paid attention to details and left everything spotless. Highly recommend!" },
    ];
  }
  return [
    { id: "r1", author: "Ngozi O.", rating: 5, when: "1 week ago", text: "Came on time, did exactly what we agreed and the price was fair. I would book again." },
    { id: "r2", author: "Ibrahim S.", rating: 5, when: "3 weeks ago", text: "Very professional and easy to talk to. The result was better than I expected." },
    { id: "r3", author: "Bisi A.", rating: 4, when: "2 months ago", text: "Good work overall. Communication was quick and they explained everything clearly." },
  ];
}

export interface Conversation {
  id: string;
  name: string;
  snippet: string;
  time: string;
  unread: boolean;
}

export const conversations: Conversation[] = [
  { id: "c1", name: "Grace Events", snippet: "Hi, I've confirmed the venue for Saturday.", time: "12m", unread: true },
  { id: "c2", name: "Tunde Art & Decor", snippet: "Sure! I'll bring the materials.", time: "1h", unread: true },
  { id: "c3", name: "Coach Amara", snippet: "Great! See you on Saturday.", time: "3h", unread: true },
  { id: "c4", name: "Ahmed Woodworks", snippet: "Okay, I'll be there at 9am.", time: "5h", unread: false },
  { id: "c5", name: "CleanHome Pro", snippet: "Your booking is confirmed.", time: "1d", unread: false },
];

export const timeSlots = [
  "8:00 AM - 11:00 AM",
  "9:00 AM - 12:00 PM",
  "12:00 PM - 3:00 PM",
  "3:00 PM - 6:00 PM",
];

export const locations = ["Abuja, FCT", "Lagos, NG"];
