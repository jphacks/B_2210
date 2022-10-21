import { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"; //カルーセル用のタグをインポート
import { Pagination, Navigation, Autoplay } from "swiper"; //使いたい機能をインポート
import "swiper/css/bundle";

// カルーセルにする画像のソースをリストにします
const images = [
  "/sample-images/sample1.jpg",
  "/sample-images/sample2.jpg",
  "/sample-images/sample3.jpg",
  "/sample-images/sample4.jpg",
  "/sample-images/sample5.jpg",
  "/sample-images/sample6.jpg",
  "/sample-images/sample7.jpg",
  "/sample-images/sample8.jpg",
];

export const SampleIcons: FC = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={1}
      slidesPerView="auto"
      pagination={{
        clickable: true,
      }}
      navigation
      loop={true}
      className="block w-auto"
      breakpoints={{
        0: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 5,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {images.map((src: string, index: number) => {
        return (
          <SwiperSlide key={index}>
            <Image
              src={src}
              layout="responsive"
              width={128}
              height={128}
              alt="test_image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
