import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Next, Prev } from "../icon";

const apiSilder = [
  {
    id: 0,
    url: "https://theme.hstatic.net/200000306687/1000886682/14/slideShow_f1_3.png?v=104",
  },
  {
    id: 1,
    url: "https://theme.hstatic.net/200000306687/1000886682/14/slideShow_f1_2.png?v=104",
  },
  {
    id: 2,
    url: "https://theme.hstatic.net/200000306687/1000886682/14/slideShow_f1_1.png?v=104",
  },
];
const BannerSilder = () => {
  const [activeSlide, setActiveSLide] = useState(0);

  useEffect(() => {
    const slideAuto = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(slideAuto);
    };
  }, [activeSlide]);
  const nextSlide = () => {
    const index = activeSlide + 1 === apiSilder.length ? 0 : activeSlide + 1;
    setActiveSLide(index);
  };
  const prevSlide = () => {
    const index = activeSlide - 1 < 0 ? apiSilder.length - 1 : activeSlide - 1;
    setActiveSLide(index);
  };

  return (
    <div className="banner w-full h-[40vh] lg:h-[80vh] rounded-2xl mb-10 relative overflow-hidden">
      <div className="absolute inset-0">
        {apiSilder.map((item, index) => (
          <img
            src={item.url}
            className={`${
              activeSlide === item.id
                ? "max-w-auto scale-100"
                : "max-w-0 scale-0"
            } transition-all`}
            key={item.id}
            alt=""
          />
        ))}
      </div>
      <div
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 text-2xl text-white left-5 cursor-pointer"
      >
        <Prev />
      </div>
      <div
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 text-2xl text-white right-5 cursor-pointer"
      >
        <Next />
      </div>
    </div>
  );
};

export default BannerSilder;
