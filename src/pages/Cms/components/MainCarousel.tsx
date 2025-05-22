import React, { useEffect, useState } from 'react'
import hero1 from "../../../assets/images/hero1.png"
import hero2 from "../../../assets/images/hero2.png"
import hero3 from "../../../assets/images/hero3.png"
import ArrowControls from './ArrowControls'
import { HeroContent } from './HeroContent'
import { HeroSlider } from './HeroSlider'
import { useAppDispatch } from '../../../store'
import { setShowModal } from '../../../store/slices/pagesSlice'
interface SliderItem {
    imgUrl: string;
    title: string;
    description: string;
    btnLabel: string;
}
const MainCarousel = ({ handleClickEditIcon, setItem, textEditHandler, contentData = [], setContentData, comp }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevSlide = () => {
        const prevIndex = currentIndex === 0 ? contentData.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
    };

    const handleNextSlide = () => {
        const nextIndex = (currentIndex + 1) % contentData.length;
        setCurrentIndex(nextIndex);
    };


    // Early return if contentData is empty or not an array
    if (!Array.isArray(contentData) || contentData.length === 0) {
        return null; // or a loader/spinner/placeholder
    }

    return (
        <section className="bg-[rgba(252,241,224,1)] overflow-hidden rounded-[30px] max-md:max-w-full">
            <div className="flex flex-col relative min-h-[623px] md:min-h-[723px] w-full px-4 md:px-[42px] py-11 max-md:max-w-full">
                <HeroSlider
                    sliderItems={contentData}
                    currentIndex={currentIndex}
                    setItem={setItem}
                    handleClickEditIcon={handleClickEditIcon}
                />
                <ArrowControls
                    handlePrevSlide={handlePrevSlide}
                    handleNextSlide={handleNextSlide}
                />
                {contentData.map((item, index) => (
                    index === currentIndex && (
                        <HeroContent
                            key={item.id}
                            contentData={contentData}
                            title={item.title}
                            itemId={item.id}
                            subtitle={item.description}
                            buttonText={item.btnLabel}
                            currentIndex={index}
                            textEditHandler={textEditHandler}
                            comp={comp}
                        />
                    )
                ))}

            </div>
        </section>
    );
};


export default MainCarousel