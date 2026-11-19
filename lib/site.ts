/**
 * Photographic files in /public/images are crops of the only source in
 * this repository: the 416×2000 reference PNG (opaque frame 369×2000).
 * No separate high-resolution product, lifestyle, or mechanism files
 * were checked in. Replace these crops when original assets are available.
 */
export const site = {
  hero: {
    title: ["SHARE YOUR", "PHOTOS", "BEFORE THE", "NIGHT ENDS"],
    body: [
      "The stylish bag charm that transfers photos",
      "from your camera to your phone in seconds",
    ],
    cta: "RSVP NOW",
  },
  wordmark: "Glow Gadget",
  statement: ["AN SD CARD READER THAT", "DOUBLES AS A CHARM"],
  howItWorks: {
    heading: "HOW IT WORKS",
    steps: [
      {
        n: "1",
        lines: ["INSERT THE", "SD CARD"],
        image: "/images/step1.png",
        width: 158,
        height: 110,
        alt: "Digicam photo of three friends beside the Glow Gadget charm with an SD card",
      },
      {
        n: "2",
        lines: ["PLUG THE", "CHARM IN"],
        image: "/images/step2.png",
        width: 138,
        height: 119,
        alt: "Separated charm mechanism and hands plugging the reader into a phone",
      },
      {
        n: "3",
        lines: ["UPLOAD &", "SHARE!"],
        image: "/images/step3.png",
        width: 134,
        height: 113,
        alt: "Hands holding a phone gallery with the Glow Gadget reader attached",
      },
    ],
  },
  colorways: {
    heading: ["THREE", "WAYS TO", "GLOW"],
    swatches: [
      { id: "teal", label: "TEAL" },
      { id: "pink", label: "PINK" },
      { id: "kiwi", label: "KIWI" },
    ],
  },
  custom: {
    heading: ["WITH ADDITIONAL", "CUSTOMIZABILITY"],
  },
  brand: {
    tagline: "Where fashion meets function",
  },
  waitlist: {
    heading: "BE FIRST",
    placeholder: "Email email",
    button: "GET EARLY ACCESS",
  },
} as const;
