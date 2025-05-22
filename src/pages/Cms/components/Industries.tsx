import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import IndustryCard from "./IndustryCard";
// import { industries } from "./our-businses-data";
import LeftIcon from "./LeftIcon";
import RightIcon from "./ReftIcon";

export const Industries: React.FC = ({ comp,
    contentData = [],
    textEditHandler,
    setItem,
    handleClickEditIcon, editImgHandle }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const industries = contentData


  
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    // useEffect(() => {
    //     if (!emblaApi) return;

    //     const onSelect = () => {
    //         setSelectedIndex(emblaApi.selectedScrollSnap());
    //     };

    //     emblaApi.on("select", onSelect);
    //     onSelect();

    //     return () => {
    //         emblaApi.off("select", onSelect);
    //     };
    // }, [emblaApi]);

    return (
        <section
            id="businesses"
            className="flex w-full max-w-[1178px] flex-col  max-md:mt-10 max-md:max-w-full"
            style={{direction:'ltr'}}
        >
            <div className="w-full max-md:mt-10">
                <div className="flex justify-end mb-4 px-2" >
                    <button onClick={scrollPrev} className="p-2">
                        <LeftIcon />
                    </button>
                    <button onClick={scrollNext} className="p-2">
                        <RightIcon />
                    </button>
                </div>

                <div className="embla overflow-hidden" ref={emblaRef}>
                    <div className="embla__container flex -ml-4">
                        {industries.map((industry, index) => (
                            <div
                                key={index}
                                className="embla__slide pl-4 min-w-0 flex-[0_0_50%]"
                            >
                                <IndustryCard
                                    key={industry.id}
                                    index={index}
                                    contentData={industries}
                                    textEditHandler={textEditHandler}
                                    comp={comp}
                                    industry={industry}
                                    handleClickEditIcon={handleClickEditIcon}
                                    editImgHandler={handleClickEditIcon} 
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
