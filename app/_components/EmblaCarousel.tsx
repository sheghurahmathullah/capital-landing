import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type CardType = {
  id: number;
  title: string;
  image: string;
  content: string;
};

type PropType = {
  cards: CardType[];
  options?: EmblaOptionsType;
};

const ImageCarousel: React.FC<PropType> = ({ cards, options }) => {
  const [cardRef, _cardApi] = useEmblaCarousel({
    ...options,
    dragFree: false,
    containScroll: "trimSnaps",
    loop: true,
  }, [Autoplay()]);

  return (
    <section className="relative mx-auto max-w-full space-y-8 overflow-hidden px-2 h-[350px] md:h-[400px] lg:h-[450px]">
      {/* Card Carousel */}
      <div className="embla relative w-full h-full overflow-hidden" ref={cardRef}>
        <div className="embla__container flex py-4">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="embla__slide flex-[0_0_92%] md:flex-[0_0_60%] lg:flex-[0_0_55%] min-w-0 pl-2"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative mx-1 md:mx-2 lg:mx-4 h-[300px] md:h-[350px] lg:h-[400px]">
                {/* Red corner circles */}
                <div className="absolute -top-3 -right-3 w-5 md:w-8 h-5 md:h-8">
                  <div className="bg-red-500 rounded-full w-full h-full"></div>
                </div>
                <div className="absolute -bottom-3 -left-3 w-5 md:w-8 h-5 md:h-8">
                  <div className="bg-red-500 rounded-full w-full h-full"></div>
                </div>

                <div className="p-3 md:p-4 lg:p-6 h-full flex flex-col">
                  <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-2">{card.title}</h2>
                  <div className="relative w-full h-24 md:h-28 lg:h-32 mb-2 rounded-md overflow-hidden">
                    <Image
                      src={card.image}
                      alt={`Illustration for ${card.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs md:text-sm lg:text-base text-gray-700 flex-1 overflow-y-auto pr-2">
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
