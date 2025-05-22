import React from "react";
import { useAppDispatch } from "../../../store";
import { setClickedKey, setShowModal } from "../../../store/slices/pagesSlice";

interface ContentData {
  id: string;
  title: string;
}

interface HeroSectionProps {
  comp: { id: string };
  contentData?: ContentData[]; // allow undefined
  textEditHandler: (comp: any, itemId: string, key: string) => (e: React.FormEvent<HTMLElement>) => void;
  setItem: () => void;
  segment: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  comp,
  contentData = [],
  textEditHandler,
  setItem,
  segment, handleClickEditIcon
}) => {

  const item = contentData.length > 0 ? contentData[0] : null;
  const title = item?.title || "";
  const dispatch = useAppDispatch();


  return (
    <div className="mt-[46px] max-md:mt-1 w-full max-w-[1199px] flex-col items-stretch max-md:max-w-full">
      <div className="relative flex flex-col  w-full text-[32px] text-white font-extrabold tracking-[-0.96px] leading-[1.1] pt-[117px] pb-[93px] px-[70px] rounded-[20px] max-md:pt-[60px] max-md:pb-[60px] max-md:px-5 max-md:min-h-[200px] overflow-hidden">

        <img
          src={item?.logo || ''}
          alt={title}
          className="absolute h-full w-full object-cover inset-0 rounded-[20px]"
          style={{
            objectPosition: "center center",
            minHeight: "auto",
          }}
        />

        <button
          onClick={() => {
            handleClickEditIcon(item)

            dispatch(setClickedKey('logo'))

          }}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-20"
          title="Edit Image"
        >
          ✏️
        </button>

        <div className="absolute inset-0 bg-black/30 rounded-[20px]" />
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={item ? textEditHandler(comp, item.id, "title") : undefined}
          className="relative z-10 max-md:text-[28px] max-md:leading-tight"
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
