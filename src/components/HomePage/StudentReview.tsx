
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote, GraduationCap } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Class 10 Student",
    rating: 5,
    feedback:
      "My tutor explains every topic so clearly. I have improved a lot in Mathematics, and the learning experience has been amazing!",
    initials: "AR",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Class 9 Student",
    rating: 5,
    feedback:
      "Finding a good tutor was never this easy. The teaching method is excellent, and I feel much more confident now.",
    initials: "NJ",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    role: "HSC Student",
    rating: 4,
    feedback:
      "I really appreciate the support and guidance from my tutor. The lessons are well organized and easy to understand.",
    initials: "TA",
  },
  {
    id: 4,
    name: "Sadia Islam",
    role: "Class 8 Student",
    rating: 5,
    feedback:
      "MentorLagbe helped me find a tutor who understands my learning needs. I am very satisfied with my experience!",
    initials: "SI",
  },
];

const StudentReview = () => {
  return (
    <section className="bg-[#FBF9FF] py-20">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-[#EFE7FF] px-4 py-2 text-sm font-semibold text-[#8655D8]">
            Student Experiences
          </span>

          <h2 className="mt-4 text-3xl font-bold text-[#292044] md:text-4xl">
            What Our Students <span className="text-[#9563E9]">Say</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Real experiences and honest feedback from students who found
            their perfect tutors through MentorLagbe.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-[#292044]">4.8/5</h3>
            <div className="mt-1 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={17}
                  className="fill-[#F5B544] text-[#F5B544]"
                />
              ))}
            </div>
          </div>

          <div className="hidden h-12 w-px bg-purple-200 sm:block" />

          <p className="max-w-xs text-center text-sm text-gray-500 sm:text-left">
            Helping students learn better with trusted tutors and
            personalized guidance.
          </p>
        </div>

        {/* Review Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-5">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-5 md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full flex-col rounded-2xl border border-purple-200 bg-purple-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-100">

                  {/* Quote and Stars */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#9563E9]">
                      <Quote size={21} />
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-[#F5B544] text-[#F5B544]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Feedback */}
                  <p className="flex-1 text-sm leading-7 text-gray-600">
                    &ldquo;{review.feedback}&rdquo;
                  </p>

                  {/* Student Info */}
                  <div className="mt-6 flex items-center gap-3 border-t border-purple-200 pt-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9563E9] font-bold text-white">
                      {review.initials}
                    </div>

                    <div>
                      <h3 className="font-bold text-[#292044]">
                        {review.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {review.role}
                      </p>
                    </div>

                    <div className="ml-auto text-[#9563E9]">
                      <GraduationCap size={24} />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <CarouselPrevious className="static translate-y-0 border-purple-200 text-[#8655D8] hover:bg-[#9563E9] hover:text-white" />
            <CarouselNext className="static translate-y-0 border-purple-200 text-[#8655D8] hover:bg-[#9563E9] hover:text-white" />
          </div>
        </Carousel>

      </div>
    </section>
  );
};

export default StudentReview;
