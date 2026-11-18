// All photos live in /public/images. To upgrade quality, export the originals from Figma
// at 2x and overwrite the files below using the SAME file names. No code changes needed.

export const heroImage = "/images/hero.jpg";
export const ctaImage = "/images/cta-woman.jpg";

/** Photo for each service, by service id. Services without an entry fall back to a category tile. */
export const serviceImages: Record<string, string> = {
  "s-plumbing": "/images/services/plumbing.jpg",
  "s-event": "/images/services/event.jpg",
  "s-tailoring": "/images/services/tailoring.jpg",
  "s-fitness": "/images/services/fitness.jpg",
  "s-consulting": "/images/services/consulting.jpg",
  "s-clean-standard": "/images/services/clean-standard.jpg",
  "s-clean-deep": "/images/services/clean-deep.jpg",
  "s-clean-office": "/images/services/clean-office.jpg",
  "s-clean-post": "/images/services/clean-post-construction.jpg",
  "s-photo": "/images/services/rec-photography.jpg",
  "s-furniture": "/images/services/dash-furniture.jpg",
  "s-painting": "/images/services/dash-painting.jpg",
};

export function serviceImage(serviceId: string): string | undefined {
  return serviceImages[serviceId];
}

/** Profile photos, matched on the display name used around the app. */
const avatarMap: Record<string, string> = {
  "Tunde Adeyemi": "/images/avatars/tunde-adeyemi.jpg",
  "Blessing Okafor": "/images/avatars/blessing-okafor.jpg",
  "Amina Yusuf": "/images/avatars/amina-yusuf.jpg",
  "Amina Stitches": "/images/avatars/amina-yusuf.jpg",
  "Daniel Chukwudi": "/images/avatars/daniel-chukwudi.jpg",
  "Coach Daniel": "/images/avatars/daniel-chukwudi.jpg",
  "Folake Adeyemi": "/images/avatars/folake-adeyemi.jpg",
  "Folake Consulting": "/images/avatars/folake-adeyemi.jpg",
  "Grace Home Cleaning Services": "/images/avatars/grace-home-cleaning.jpg",
  "Grace Events": "/images/avatars/grace-events.jpg",
  "Tunde Art & Decor": "/images/avatars/tunde-art-decor.jpg",
  "Ahmed Woodworks": "/images/avatars/ahmed-woodworks.jpg",
  "Ahmed Ibrahim": "/images/avatars/ahmed-woodworks.jpg",
  "Coach Amara": "/images/avatars/coach-amara.jpg",
  "CleanHome Pro": "/images/avatars/cleanhome-pro.jpg",
};

export function avatarFor(name: string): string | undefined {
  return avatarMap[name];
}

/** Gallery shown at the top of a provider profile: first image is the large one. */
const galleries: Record<string, string[]> = {
  "grace-home-cleaning": [
    "/images/gallery/main.jpg",
    "/images/gallery/g1.jpg",
    "/images/gallery/g2.jpg",
    "/images/gallery/g3.jpg",
    "/images/gallery/g4.jpg",
  ],
};

export function galleryFor(providerId: string, serviceIds: string[]): string[] {
  if (galleries[providerId]) return galleries[providerId];
  return serviceIds.map((id) => serviceImages[id]).filter((s): s is string => !!s);
}

export const portfolios: Record<string, string[]> = {
  "grace-home-cleaning": [
    "/images/portfolio/1.jpg",
    "/images/portfolio/2.jpg",
    "/images/portfolio/3.jpg",
    "/images/portfolio/4.jpg",
  ],
};
