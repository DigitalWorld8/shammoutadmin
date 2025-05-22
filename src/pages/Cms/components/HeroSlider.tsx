
import React from "react";
import hero3 from "../../../assets/images/hero3.png"
import { Pencil } from "lucide-react";
import { useAppDispatch } from "../../../store";
import { setClickedKey, setItem, setShowModal } from "../../../store/slices/pagesSlice";

export interface SliderItem {
  imgUrl: string;
  title: string;
  description: string;
  btnLabel: string;
}

interface HeroSliderProps {
  sliderItems: SliderItem[];
  currentIndex: number;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  sliderItems,
  currentIndex,
  setItem, handleClickEditIcon
}) => {
  const dispatch = useAppDispatch();


  return (
    <div className="absolute h-full w-full inset-0 overflow-hidden">
      {sliderItems.map((item, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-opacity duration-1000 ease 
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={item?.logo}
            alt={item.title}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
      ))}

      {/* Render the edit button only once on the visible slide */}

      <button
        onClick={() => {
          handleClickEditIcon(sliderItems[currentIndex])
          dispatch(setClickedKey('logo'))


        }}
        className="absolute top-3 left-3 bg-white p-1 rounded-full shadow"
        title="Edit Image"
      >
        ✏️
      </button>
    </div>
  );
};
