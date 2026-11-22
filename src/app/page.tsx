import Footer from "@/components/HomePage/Footer";
import Hero from "@/components/HomePage/Hero";
import Navbar from "@/components/HomePage/Navbar";
import PriceCard from "@/components/HomePage/PriceCard";
import SixTuitions from "@/components/HomePage/SixTuitions";
import StudentReview from "@/components/HomePage/StudentReview";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SixTuitions />
      <PriceCard />
      <StudentReview />
      <Footer />
    </main>
  );
}
