"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Sparkles, Star, Heart } from "lucide-react";

const float = {
  y: [0, -12, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
};

function TeacherStudentScene() {
  return (
    <div className="relative mx-auto w-full max-w-[580px]">

      <div className="absolute inset-10 rounded-full bg-blue-500/20 blur-[90px]" />

      {/* Floating decorations */}
      <motion.div animate={float} className="absolute left-[8%] top-[15%] text-yellow-300">
        <Star size={25} fill="currentColor" />
      </motion.div>

      <motion.div animate={float} className="absolute right-[12%] top-[12%] text-pink-300">
        <Heart size={25} fill="currentColor" />
      </motion.div>

      <motion.div animate={float} className="absolute right-[5%] top-[45%] text-yellow-300">
        <Sparkles size={26} />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute left-[48%] top-[2%] text-4xl"
      >
        💡
      </motion.div>

      {/* Teacher and student */}
      <svg viewBox="0 0 620 490" className="relative z-10 w-full">

        <circle cx="310" cy="235" r="205" fill="#172D56" />
        <circle cx="310" cy="235" r="175" fill="#1D3968" />

        {/* Bookshelf */}
        <rect x="55" y="115" width="95" height="125" rx="9" fill="#263F70" />
        <rect x="65" y="125" width="15" height="65" rx="3" fill="#F6B96B" />
        <rect x="84" y="135" width="17" height="55" rx="3" fill="#75A8F5" />
        <rect x="105" y="120" width="15" height="70" rx="3" fill="#E99AB8" />
        <rect x="124" y="140" width="14" height="50" rx="3" fill="#A5B4FC" />

        {/* TEACHER */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Hair */}
          <path d="M160 160 Q145 65 222 65 Q302 60 291 165 L285 250 L167 250Z" fill="#30213B" />

          {/* Body */}
          <path d="M135 365 Q145 265 202 260 Q263 250 307 365 L320 440 L110 440Z" fill="#A5B4FC" />

          {/* Neck */}
          <rect x="195" y="222" width="43" height="48" rx="17" fill="#F5C6A5" />

          {/* Face */}
          <ellipse cx="218" cy="172" rx="64" ry="77" fill="#F8D1B4" />
          <path d="M154 165 Q145 82 220 86 Q290 80 282 157 Q260 130 241 126 Q210 155 160 145Z" fill="#30213B" />

          {/* Eyes */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ transformOrigin: "218px 175px" }}
          >
            <ellipse cx="195" cy="173" rx="5" ry="8" fill="#382A2D" />
            <ellipse cx="241" cy="173" rx="5" ry="8" fill="#382A2D" />
          </motion.g>

          {/* Smile */}
          <path d="M203 205 Q218 220 235 205" stroke="#A44C52" strokeWidth="3.5" strokeLinecap="round" />

          {/* Teaching hand */}
          <motion.g
            animate={{ rotate: [-5, 12, -5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{ transformOrigin: "270px 292px" }}
          >
            <path d="M270 292 Q315 275 329 238" stroke="#4385ED" strokeWidth="29" strokeLinecap="round" />
            <path d="M329 238 Q338 222 345 205" stroke="#F5C6A5" strokeWidth="19" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* LITTLE GIRL */}
        <motion.g
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {/* Hair */}
          <path d="M352 192 Q345 110 420 105 Q494 105 491 198 L480 277 L364 275Z" fill="#59352C" />

          {/* Dress */}
          <path d="M350 365 Q360 282 419 277 Q480 280 498 365 L515 440 L330 440Z" fill="#F19AB9" />

          {/* Face */}
          <ellipse cx="418" cy="190" rx="59" ry="68" fill="#F8D2B6" />

          {/* Hair front */}
          <path d="M361 181 Q356 111 418 119 Q480 111 477 181 Q451 157 434 150 Q407 169 364 159Z" fill="#59352C" />

          {/* Bow */}
          <path d="M458 126 Q433 102 444 85 Q465 91 470 110 Q488 88 503 101 Q505 126 474 133Z" fill="#79B5FF" />

          {/* Eyes */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 3.7, repeat: Infinity }}
            style={{ transformOrigin: "418px 192px" }}
          >
            <ellipse cx="396" cy="191" rx="5" ry="8" fill="#382A2D" />
            <ellipse cx="440" cy="191" rx="5" ry="8" fill="#382A2D" />
          </motion.g>

          {/* Smile */}
          <path d="M404 222 Q419 235 435 222" stroke="#A44C52" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Study table */}
        <path d="M80 365 Q310 343 550 365 L545 390 Q310 410 85 390Z" fill="#D49B70" />
        <path d="M110 390 L125 463 L145 463 L145 393Z" fill="#A66F4B" />
        <path d="M490 390 L475 463 L495 463 L515 390Z" fill="#A66F4B" />

        {/* Notebook */}
        <path d="M220 345 L320 332 L345 360 L240 376Z" fill="#FFF8E9" />
        <path d="M241 353 L306 344 M245 361 L305 352" stroke="#A5B8D5" strokeWidth="2" />

        {/* Writing hand */}
        <motion.g
          animate={{ rotate: [-4, 5, -4] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          style={{ transformOrigin: "368px 341px" }}
        >
          <path d="M365 338 Q346 324 330 349" stroke="#F5C6A5" strokeWidth="17" strokeLinecap="round" />
          <path d="M348 340 L310 370" stroke="#FFD166" strokeWidth="5" strokeLinecap="round" />
        </motion.g>

        {/* Books */}
        <rect x="390" y="347" width="68" height="12" rx="3" fill="#75A8F5" />
        <rect x="395" y="335" width="60" height="12" rx="3" fill="#F5A4BE" />

      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090F20] px-6 py-16 text-white lg:px-12 lg:py-20">

      {/* Background glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <Sparkles size={15} />
            Your learning journey starts here
          </div>

          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.15] sm:text-6xl lg:text-7xl">
            The Right Mentor.
            <span className="mt-2 block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              A Brighter Future.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
            Every great journey starts with the right guidance.
            Find passionate tutors, learn with confidence, and
            unlock your true potential with MentorLagbe.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/browse-tuition"
              className="group flex items-center gap-3 rounded-xl bg-[#3978F6] px-7 py-4 font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1 hover:bg-blue-400"
            >
              Find Your Tutor
              <ArrowRight size={19} className="transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/sign-up"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-7 py-4 font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-400"
            >
              <BookOpen size={19} />
              Get Started
            </Link>
          </div>
        </motion.div>

        {/* Animated scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <TeacherStudentScene />
        </motion.div>

      </div>
    </section>
  );
}
