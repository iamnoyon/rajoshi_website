"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import slides from "@/data/heroSlides.json";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <section className="relative text-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[300px] md:h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                  <div>
                    <span className="inline-block bg-white/10 text-sm px-4 py-1.5 rounded-full mb-4">
                      {slide.badge}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                      {slide.title}
                      <span className="block text-yellow-300">
                        {slide.highlight}
                      </span>
                      {slide.highlightSuffix}
                    </h1>
                    <p className="text-white/80 text-sm md:text-lg mb-6 max-w-md">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={slide.primaryBtnLink}
                        className="inline-flex items-center gap-2 bg-white text-[#042A55] px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                      >
                        {slide.primaryBtnText} <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
