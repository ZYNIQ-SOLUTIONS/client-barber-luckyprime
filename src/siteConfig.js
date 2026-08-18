const whatsappMessage = "Hello Lucky Prime Gents Salon, I would like to book an appointment.";

export const siteConfig = {
  name: "LUCKY PRIME",
  fullName: "Lucky Prime Gents Salon L.L.C",
  arabicName: "صالون لكي برايم للرجال ذ.م.م",
  arabicLocality: "ميدان دبي",
  role: "Luxury Gents Salon",
  tagline: "Premium Grooming & Luxury Gents Salon",
  location: "Meydan, Dubai",
  address: "Azizi Riviera, Building No. 48, Retail Shop 3, Meydan – Dubai, UAE",
  hours: "Daily · 10:00 AM – 11:00 PM",
  coordinates: {
    lat: "25.1764° N",
    lng: "55.3093° E",
  },
  phoneNumber: "+971508578652",
  phoneDisplay: "+971 50 857 8652",
  whatsappNumber: "971508578652",
  email: "luckyprimegentssalon@gmail.com",
  freshaUrl: "https://www.fresha.com/en-GB/a/lucky-prime-gents-salon-dubai-meydan-one-retail-no-3-azizi-riviera-puzopx12/all-offer?menu=true&share=true&pId=2724477",
  instagram: "https://instagram.com/luckyprimegents.salon",
  instagramHandle: "@luckyprimegents.salon",
  tiktok: "https://tiktok.com/@lucky.prime.gents",
  tiktokHandle: "@lucky.prime.gents",
  googleMapsUrl: "https://maps.google.com/?q=Azizi+Riviera+Building+48+Dubai",
  about: "Step into an exclusive gentlemen's sanctuary where precision barbering meets contemporary comfort in Meydan, Dubai. From razor-sharp fades and tailored beard sculpting to restorative hot towel therapy and VIP charcoal facials, every ritual is crafted for your best look.",
  services: [
    {
      name: "Signature Haircut & Style",
      desc: "Precision scissor & clipper cut, refreshing wash, scalp tonic, and bespoke matte styling.",
      price: "From AED 80",
    },
    {
      name: "Beard Sculpting & Hot Towel",
      desc: "Freehand razor line-up, warm essential oil infusion, and eucalyptus steam towel compress.",
      price: "From AED 60",
    },
    {
      name: "Lucky Prime Royal Combo",
      desc: "The complete reset: Signature cut, beard sculpting, express facial, and scalp massage.",
      price: "AED 180",
      featured: true,
    },
    {
      name: "VIP Charcoal / Skincare Facial",
      desc: "Deep pore detox, activated charcoal mask, sonic extraction, and cold stone hydration finish.",
      price: "From AED 120",
    },
    {
      name: "Hair Coloring & Keratin Care",
      desc: "Natural grey blending, custom highlights, or premium keratin smoothing therapy.",
      price: "Consultation",
    },
  ],
  images: {
    logo: "/images/logo.png",
    hero: "/images/ibraheem-hero.webp",
    heroVideo: "/videos/ibraheem-hero.mp4",
    portrait: "/images/ibraheem-editorial-v2.webp",
    detail: "/images/studio-detail.webp",
  },
  work: [
    { src: "/images/cut-01-fade.webp", label: "Skin Fade", alt: "Precision low fade from the side", width: 1536, height: 2048 },
    { src: "/images/cut-02-textured.webp", label: "Textured Crop", alt: "Textured curls with a clean taper", width: 2048, height: 1536 },
    { src: "/images/cut-03-beard.webp", label: "Beard Sculpt", alt: "Close-up beard line detailing", width: 1536, height: 2048 },
    { src: "/images/cut-04-detail.webp", label: "Razor Lineup", alt: "Detailed side part and neck taper", width: 2048, height: 1536 },
    { src: "/images/cut-05-styled.webp", label: "Royal Styling", alt: "Refined swept-back hairstyle", width: 1536, height: 2048 },
    { src: "/images/studio-detail.webp", label: "Master Craft", alt: "Close-up clipper work and precision tools", width: 2048, height: 1152 },
  ],
  get whatsappUrl() {
    if (!this.whatsappNumber) return "#contact";
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  },
};
