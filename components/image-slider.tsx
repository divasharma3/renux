"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  urls: string[];
}

export const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex),
        setSlideConfig({
          isBeginning: activeIndex === 0,
          isEnd: activeIndex === (urls.length ?? 0) - 1,
        });
    });
  }, [swiper, urls]);

  const activeSty =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-s-yellow-300";
  const inActiveSty = "hidden text-slate-400";

  return (
    <div className="group relative bg-slate-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault(), 
            swiper?.slideNext();
          }}
          className={cn(
            activeSty,
            "right-3 transition",{
              [inActiveSty]: slideConfig.isEnd,
              "hover:bg-secondary text-primary opacity-100": !slideConfig.isEnd,
            }
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault(), 
            swiper?.slidePrev();
          }}
          className={cn(
            activeSty,
            "left-3 transition",{
              [inActiveSty]: slideConfig.isBeginning,
              "hover:bg-secondary text-primary opacity-100": !slideConfig.isBeginning,
            }
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet:(_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              src={url}
              alt=""
              fill
              loading="eager"
              className="object-cover object-center -z-10 h-full w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
