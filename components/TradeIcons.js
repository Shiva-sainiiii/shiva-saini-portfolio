// Templates ke saath dikhne wale chhote SVG icons. Naya trade add karo to yahan ek entry jodo (key = templates ka name).
const P = { width: 32, height: 32, viewBox: "0 0 32 32", "aria-hidden": "true", focusable: "false" };

const Tooth = () => (
  <svg {...P}>
    <path fill="#fff" d="M16 7c-1.7-1.5-3.5-2.3-5.4-2.3C7.6 4.7 5.5 7.2 5.5 10.8c0 2.7 1 4.5 1.8 7.1.7 2.4 1 6.6 3.2 6.6 1.9 0 2-3.9 2.9-5.7.6-1.3 1.5-2 2.6-2s2 .7 2.6 2c.9 1.8 1 5.7 2.9 5.7 2.2 0 2.5-4.2 3.2-6.6.8-2.6 1.8-4.4 1.8-7.1 0-3.6-2.1-6.1-5.1-6.1-1.9 0-3.7.8-5.4 2.3z" />
    <path fill="none" stroke="#9fb3bd" strokeWidth="1.1" strokeLinecap="round" d="M9.2 8.6c.9-.9 2-1.2 3-.9" />
  </svg>
);

const Dumbbell = () => (
  <svg {...P}>
    <rect x="1.5" y="12.5" width="3" height="7" rx="1.2" fill="#fff" />
    <rect x="5.5" y="8.5" width="4.5" height="15" rx="1.6" fill="#fff" />
    <rect x="10" y="14.7" width="12" height="2.6" fill="#c9ccd3" />
    <rect x="22" y="8.5" width="4.5" height="15" rx="1.6" fill="#fff" />
    <rect x="27.5" y="12.5" width="3" height="7" rx="1.2" fill="#fff" />
  </svg>
);

const GoldBricks = () => (
  <svg {...P}>
    <defs>
      <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE9A0" /><stop offset="1" stopColor="#E3A917" /></linearGradient>
    </defs>
    <g fill="url(#gb)" stroke="#9A6B00" strokeWidth="1" strokeLinejoin="round">
      <path d="M1.5 27.5 4 20.5h9l2.5 7z" />
      <path d="M16.5 27.5 19 20.5h9l2.5 7z" />
      <path d="M8.5 19.5 11 12.5h10l2.5 7z" />
    </g>
    <g stroke="#FFF6CF" strokeWidth="1.1" strokeLinecap="round">
      <path d="M5.4 22.4h6M20.4 22.4h6M12.7 14.4h6.6" />
    </g>
  </svg>
);

const NoodleBowl = () => (
  <svg {...P}>
    <g fill="none" strokeLinecap="round" strokeWidth="1.8" stroke="#FFD27A">
      <path d="M9 15c0-3.6 3-3 3-6.5" />
      <path d="M13.5 15c0-3.6 3-3 3-7" />
      <path d="M18 15c0-3.6 3-3 3-6.5" />
    </g>
    <g stroke="#E6B27A" strokeWidth="1.6" strokeLinecap="round">
      <path d="M21 3.5 26.5 14M24.5 2.8 29 12" />
    </g>
    <path fill="#fff" d="M3.5 15h25c0 6.8-5.6 12-12.5 12S3.5 21.8 3.5 15z" />
    <rect x="10.5" y="27" width="11" height="2.4" rx="1.2" fill="#fff" />
    <path fill="none" stroke="#e85d4a" strokeWidth="1.4" strokeLinecap="round" d="M7 19.5c3 1.6 15 1.6 18 0" />
  </svg>
);

const House = () => (
  <svg {...P}>
    <path fill="#fff" fillRule="evenodd" d="M4.5 14.8 16 4.8l11.5 10V27.5h-23zM13 27.5h6v-8.5h-6z" />
    <rect x="21.5" y="6.2" width="3.2" height="6" fill="#fff" />
  </svg>
);

const MAP = { Dentist: Tooth, Gym: Dumbbell, Jeweller: GoldBricks, Cafe: NoodleBowl, "Real Estate": House };

export default function TradeIcon({ name }) {
  const I = MAP[name];
  return I ? <span className="tico"><I /></span> : null;
}
