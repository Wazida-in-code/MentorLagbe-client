
const LoadingGirl = () => {
  return (
    <svg
      viewBox="0 0 400 330"
      className="w-full h-auto max-w-[400px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hair" x1="100" y1="50" x2="290" y2="270">
          <stop stopColor="#79404C" />
          <stop offset="1" stopColor="#321E3C" />
        </linearGradient>

        <linearGradient id="dress" x1="150" y1="190" x2="250" y2="300">
          <stop stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>

        <linearGradient id="book" x1="150" y1="250" x2="250" y2="300">
          <stop stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* Floating stars */}
      <g className="animate-pulse">
        <path d="M70 90 L76 108 L94 114 L76 120 L70 138 L64 120 L46 114 L64 108Z" fill="#A78BFA" />
        <path d="M320 65 L325 79 L340 84 L325 89 L320 104 L315 89 L300 84 L315 79Z" fill="#F9A8D4" />
        <path d="M305 200 L309 211 L320 215 L309 219 L305 230 L301 219 L290 215 L301 211Z" fill="#C4B5FD" />
      </g>

      {/* Floating hearts */}
      <g className="animate-bounce">
        <path d="M105 165 C85 145 60 170 105 205 C150 170 125 145 105 165Z" fill="#F9A8D4" />
        <path d="M290 130 C280 120 265 135 290 155 C315 135 300 120 290 130Z" fill="#C4B5FD" />
      </g>

      {/* Ground */}
      <ellipse cx="200" cy="302" rx="115" ry="12" fill="#DDD1F8" />

      {/* Back hair */}
      <path
        d="M116 115 Q90 35 190 38 Q300 30 285 140 L270 225 L120 225Z"
        fill="url(#hair)"
      />

      {/* Hair side locks */}
      <path d="M115 105 Q75 150 110 245 Q130 270 145 220Z" fill="#5C3040" />
      <path d="M280 100 Q320 160 285 240 Q270 260 255 210Z" fill="#47243C" />

      {/* Body */}
      <path
        d="M132 205 Q140 175 175 180 L225 180 Q260 180 270 215 L280 290 L120 290Z"
        fill="url(#dress)"
      />

      {/* Neck */}
      <rect x="178" y="155" width="44" height="50" rx="18" fill="#F8C8B0" />

      {/* Face */}
      <ellipse cx="200" cy="125" rx="77" ry="82" fill="#FFD9C5" />

      {/* Hair top */}
      <path
        d="M124 125 Q105 35 195 40 Q285 30 276 120 Q260 95 238 93 Q205 115 175 85 Q150 120 124 125Z"
        fill="url(#hair)"
      />

      {/* Hair fringe */}
      <path
        d="M132 102 Q155 50 194 72 Q225 60 255 104 Q220 91 200 113 Q165 126 132 102Z"
        fill="#60313F"
      />

      {/* Hair band */}
      <path d="M128 92 Q195 25 270 95" stroke="#C084FC" strokeWidth="9" fill="none" strokeLinecap="round" />

      {/* Hair bow */}
      <path d="M140 65 Q105 35 116 76 Q125 94 143 75Z" fill="#C084FC" />
      <path d="M143 65 Q175 35 169 76 Q158 94 143 75Z" fill="#A78BFA" />
      <circle cx="143" cy="73" r="7" fill="#7C3AED" />

      {/* Eyes */}
      <ellipse cx="170" cy="130" rx="12" ry="17" fill="#493044" />
      <ellipse cx="230" cy="130" rx="12" ry="17" fill="#493044" />
      <circle cx="174" cy="124" r="5" fill="white" />
      <circle cx="234" cy="124" r="5" fill="white" />

      {/* Blush */}
      <ellipse cx="148" cy="153" rx="15" ry="8" fill="#F49BAF" opacity=".55" />
      <ellipse cx="252" cy="153" rx="15" ry="8" fill="#F49BAF" opacity=".55" />

      {/* Smile */}
      <path d="M190 157 Q200 167 210 157" stroke="#B65D70" strokeWidth="3" strokeLinecap="round" />

      {/* Arms */}
      <path d="M140 210 Q115 225 135 255" stroke="#FFD9C5" strokeWidth="20" strokeLinecap="round" />
      <path d="M260 210 Q285 225 265 255" stroke="#FFD9C5" strokeWidth="20" strokeLinecap="round" />

      {/* Open book */}
      <g className="animate-bounce">
        <path d="M105 240 Q150 220 200 250 L200 300 Q150 270 105 285Z" fill="url(#book)" />
        <path d="M295 240 Q250 220 200 250 L200 300 Q250 270 295 285Z" fill="#DDD6FE" />
        <path d="M200 250 L200 300" stroke="#8B5CF6" strokeWidth="3" />
        <path d="M125 250 Q155 240 180 255" stroke="white" strokeWidth="3" opacity=".8" />
        <path d="M125 265 Q155 255 180 270" stroke="white" strokeWidth="3" opacity=".8" />
        <path d="M220 255 Q250 240 275 250" stroke="#A78BFA" strokeWidth="3" />
        <path d="M220 270 Q250 255 275 265" stroke="#A78BFA" strokeWidth="3" />
      </g>

      {/* Small flower on dress */}
      <g transform="translate(245 215)">
        <circle cy="-5" r="5" fill="#FDE68A" />
        <circle cx="5" r="5" fill="#FDE68A" />
        <circle cy="5" r="5" fill="#FDE68A" />
        <circle cx="-5" r="5" fill="#FDE68A" />
        <circle r="3" fill="white" />
      </g>
    </svg>
  );
};

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#F8F7FC] flex items-center justify-center overflow-hidden px-5 relative">

      {/* Background decorations */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg text-center">

        {/* Brand */}
        <h2 className="text-2xl font-extrabold text-[#24163D]">
          Mentor<span className="text-[#7C3AED]">Lagbe</span>
        </h2>

        {/* Illustration */}
        <div className="my-5">
          <LoadingGirl />
        </div>

        {/* Loading text */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#35205C]">
          A Little Learning Magic! ✨
        </h1>

        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          Our little learner is getting things ready for you...
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          <span className="w-3 h-3 rounded-full bg-[#7C3AED] animate-bounce [animation-delay:0ms]" />
          <span className="w-3 h-3 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:150ms]" />
          <span className="w-3 h-3 rounded-full bg-[#F0ABFC] animate-bounce [animation-delay:300ms]" />
        </div>

        <p className="mt-5 text-xs font-medium tracking-wide text-purple-400">
          GOOD THINGS TAKE A LITTLE TIME 💜
        </p>

      </div>
    </main>
  );
};

export default Loading;
