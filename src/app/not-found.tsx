
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundIllustration = () => {
  return (
    <svg
      viewBox="0 0 900 490"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="A cute confused girl sitting behind the number 404"
    >
      <defs>
        <linearGradient id="purple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>

        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#783B45" />
          <stop offset="100%" stopColor="#321D38" />
        </linearGradient>

        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE0C9" />
          <stop offset="100%" stopColor="#F6B99F" />
        </linearGradient>

        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="450" cy="450" rx="370" ry="17" fill="#DCCBFA" opacity=".65" />

      {/* Floating decorations */}
      <circle cx="115" cy="150" r="35" fill="#E9DFFF" opacity=".6" />
      <circle cx="780" cy="120" r="24" fill="#E9DFFF" opacity=".7" />
      <circle cx="720" cy="300" r="12" fill="#C4B5FD" opacity=".5" />

      {/* Question marks */}
      <g className="animate-bounce" fill="#7C3AED" fontSize="58" fontWeight="bold">
        <text x="565" y="100">?</text>
      </g>
      <g fill="#A78BFA" fontSize="43" fontWeight="bold">
        <text x="620" y="150">?</text>
      </g>

      {/* Small sparkles */}
      <g fill="#A78BFA">
        <path d="M185 170 L192 190 L212 197 L192 204 L185 224 L178 204 L158 197 L178 190Z" />
        <path d="M720 210 L725 225 L740 230 L725 235 L720 250 L715 235 L700 230 L715 225Z" />
        <circle cx="270" cy="100" r="5" />
        <circle cx="650" cy="275" r="6" />
      </g>

      {/* Books on left */}
      <g>
        <rect x="62" y="390" width="130" height="24" rx="6" fill="#7C3AED" />
        <rect x="68" y="393" width="118" height="5" rx="2" fill="#C4B5FD" />
        <rect x="75" y="414" width="125" height="22" rx="5" fill="#F4B183" />
        <rect x="82" y="416" width="110" height="5" rx="2" fill="#FFE2C5" />
        <rect x="85" y="365" width="112" height="23" rx="5" fill="#4C3486" />
        <rect x="92" y="368" width="98" height="5" rx="2" fill="#C4B5FD" />
      </g>

      {/* Graduation cap */}
      <g transform="translate(120 255)">
        <path d="M-45 15 L20 -15 L85 15 L20 45Z" fill="#4C287F" />
        <path d="M-25 25 L20 48 L65 25 L65 43 Q20 75 -25 43Z" fill="#321D54" />
        <path d="M80 15 L80 65" stroke="#FBBF24" strokeWidth="4" />
        <circle cx="80" cy="68" r="5" fill="#FBBF24" />
      </g>

      {/* 404 shadow */}
      <text
        x="450"
        y="410"
        textAnchor="middle"
        fontSize="250"
        fontWeight="900"
        fill="#4C1D95"
        opacity=".12"
      >
        404
      </text>

      {/* Large 404 numbers */}
      <g
        fill="url(#purple)"
        stroke="#6D28D9"
        strokeWidth="2"
        strokeLinejoin="round"
        fontSize="230"
        fontWeight="900"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        <text x="210" y="410">4</text>
        <text x="690" y="410">4</text>
      </g>

      {/* Middle zero */}
      <ellipse cx="450" cy="345" rx="112" ry="112" fill="url(#purple)" />
      <ellipse cx="450" cy="345" rx="70" ry="70" fill="#F5F0FF" />
      <ellipse cx="450" cy="345" rx="70" ry="70" fill="none" stroke="#6D28D9" strokeWidth="5" />

      {/* Girl's hair behind face */}
      <path
        d="M325 185
           C305 105 360 65 450 75
           C545 65 595 130 570 230
           C590 275 565 350 520 350
           L380 350
           C320 330 290 265 325 185Z"
        fill="url(#hair)"
      />

      {/* Hair side locks */}
      <path
        d="M340 160 C290 185 305 285 350 320
           L375 290 L380 155Z"
        fill="#60313F"
      />
      <path
        d="M555 160 C610 205 575 300 535 320
           L520 280 L520 145Z"
        fill="#46243B"
      />

      {/* Neck */}
      <rect x="423" y="247" width="55" height="75" rx="22" fill="url(#skin)" />

      {/* Body / outfit */}
      <path
        d="M355 340
           Q355 290 410 285
           L490 285
           Q545 290 545 340
           L520 390
           L380 390Z"
        fill="#A78BFA"
      />

      {/* Shirt collar */}
      <path d="M410 290 L450 325 L490 290" fill="#DDD6FE" />

      {/* Hair headband */}
      <path
        d="M345 160 Q350 65 450 85 Q550 65 555 160"
        fill="none"
        stroke="#C084FC"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Hair bow */}
      <path d="M350 130 Q310 95 318 145 Q325 175 350 145Z" fill="#C084FC" />
      <path d="M350 130 Q385 95 380 145 Q370 175 350 145Z" fill="#A855F7" />
      <circle cx="350" cy="140" r="9" fill="#7C3AED" />

      {/* Face */}
      <ellipse cx="450" cy="193" rx="88" ry="102" fill="url(#skin)" />

      {/* Front hair */}
      <path
        d="M363 168
           Q350 95 430 90
           Q510 65 538 140
           Q540 165 520 183
           Q505 150 475 145
           Q430 180 385 168
           Q370 195 365 210Z"
        fill="url(#hair)"
      />

      {/* Hair fringe */}
      <path
        d="M390 151 Q410 95 465 119 Q490 125 505 153
           Q465 137 440 157 Q420 171 390 151Z"
        fill="#5B2C3A"
      />

      {/* Ears */}
      <ellipse cx="363" cy="208" rx="13" ry="20" fill="#F6B99F" />
      <ellipse cx="537" cy="208" rx="13" ry="20" fill="#F6B99F" />

      {/* Eyes */}
      <ellipse cx="415" cy="203" rx="19" ry="25" fill="#FFFFFF" />
      <ellipse cx="485" cy="203" rx="19" ry="25" fill="#FFFFFF" />

      <ellipse cx="418" cy="207" rx="12" ry="18" fill="#4A2938" />
      <ellipse cx="488" cy="207" rx="12" ry="18" fill="#4A2938" />

      <circle cx="422" cy="199" r="6" fill="white" />
      <circle cx="492" cy="199" r="6" fill="white" />

      {/* Eyebrows */}
      <path d="M395 168 Q415 155 433 168" stroke="#5B2C3A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M468 168 Q488 155 507 168" stroke="#5B2C3A" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="390" cy="235" rx="16" ry="8" fill="#F48E9D" opacity=".45" />
      <ellipse cx="510" cy="235" rx="16" ry="8" fill="#F48E9D" opacity=".45" />

      {/* Confused mouth */}
      <path d="M443 247 Q450 240 458 247" stroke="#A65362" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Hands resting on zero */}
      <ellipse cx="375" cy="304" rx="24" ry="15" fill="url(#skin)" />
      <ellipse cx="525" cy="304" rx="24" ry="15" fill="url(#skin)" />

      {/* Fingers */}
      <path d="M360 305 Q350 286 363 280 Q376 280 378 302" fill="url(#skin)" />
      <path d="M540 305 Q550 286 537 280 Q524 280 522 302" fill="url(#skin)" />

      {/* Small flower on outfit */}
      <g transform="translate(500 340)">
        <circle cx="0" cy="-7" r="5" fill="#FDE68A" />
        <circle cx="7" cy="0" r="5" fill="#FDE68A" />
        <circle cx="0" cy="7" r="5" fill="#FDE68A" />
        <circle cx="-7" cy="0" r="5" fill="#FDE68A" />
        <circle r="3" fill="#FFFFFF" />
      </g>

      {/* Right plant */}
      <g transform="translate(790 375)">
        <path d="M0 40 Q-30 -5 -50 0 Q-50 35 0 40Z" fill="#A78BFA" />
        <path d="M0 40 Q30 -15 50 0 Q45 35 0 40Z" fill="#8B5CF6" />
        <path d="M0 40 Q-10 -35 0 -45 Q15 -10 0 40Z" fill="#C4B5FD" />
        <path d="M-20 38 L20 38 L15 75 L-15 75Z" fill="#C4B5FD" />
        <path d="M-15 42 L15 42" stroke="#A78BFA" strokeWidth="4" />
      </g>
    </svg>
  );
};

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FC] flex items-center justify-center px-5 py-12">

      {/* Background decorations */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 w-[450px] h-[450px] rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">

        {/* Brand */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <span className="text-2xl font-extrabold text-[#24163D]">
            Mentor<span className="text-[#7C3AED]">Lagbe</span>
          </span>
        </Link>

        {/* Illustration */}
        <div className="w-full max-w-3xl mx-auto">
          <NotFoundIllustration />
        </div>

        {/* Text */}
        <div className="-mt-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#24163D]">
            Page Not <span className="text-[#7C3AED]">Found!</span>
          </h1>

          <p className="mt-5 max-w-xl mx-auto text-gray-500 text-base sm:text-lg leading-relaxed">
            Oops! Looks like you&apos;ve lost your way.
            The page you&apos;re looking for might have been moved,
            deleted, or never existed.
          </p>

          {/* Home button */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-8 py-4 text-white font-semibold shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-300"
          >
            <Home size={19} />
            Go Back Home
          </Link>

          <div className="mt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#7C3AED] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to homepage
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} MentorLagbe. All rights reserved.
        </p>

      </div>
    </main>
  );
};

export default NotFound;
