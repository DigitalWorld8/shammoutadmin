import React from 'react';
import imageSrc from "../../../assets/images/bus-3.png";
import logoSrc from "../../../assets/images/logo-3.png";
import { useAppDispatch } from '../../../store';
import { setClickedKey } from '../../../store/slices/pagesSlice';

const IndustryCard = ({ comp, index, contentData, textEditHandler, handleClickEditIcon, industry, editImgHandler }) => {
  const currentData = industry;
  const dispatch = useAppDispatch()
  const handleBlur = (key, id) => (e) => {
    textEditHandler(comp, id, key)(e);
  };

  if (!currentData) {
    return <div className="text-red-500">No content data available</div>;
  }


  return (
    <div className="bg-[rgba(250,248,248,1)] w-full h-[600px] pb-10 rounded-[17px]">
      <div className="relative flex flex-col relative min-h-[340px] w-full pb-[274px] px-20 rounded-[17px_17px_0px_0px] max-md:pb-[100px] max-md:px-5">
        {/* background image */}
        <img
          src={currentData.imageSrc}
          alt={currentData.title}
          className="absolute h-full w-full object-cover inset-0 rounded-[17px_17px_0px_0px]"
        />
        <button
          onClick={() => {
            handleClickEditIcon(currentData)
            dispatch(setClickedKey('imageSrc'))
          }}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10"
          title="Edit Background"
        >
          ✏️
        </button>
        {/* Logo  image */}

          <div className="relative bg-white mb-[-55px] w-[155px] max-w-full pt-5 pb-2.5 px-[9px] rounded-[0px_0px_6px_6px] max-md:mb-2.5">
            <img
              src={currentData.logo}
              alt={`${currentData.title} logo`}
              className="aspect-[3.8] object-contain w-full"
            />
            <button
              onClick={() => {
                handleClickEditIcon(currentData)
                  dispatch(setClickedKey('logo'))


              }}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10"
              title="Edit Logo"
            >
              ✏️
            </button>
          </div>
      </div>
      <div className="flex flex-col items-stretch text-[rgba(30,57,94,1)] mt-[17px] px-9 max-md:px-5">
        <h3
          className="text-xl font-extrabold leading-loose tracking-[-0.6px] outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur("title", currentData.id)}
        >
          {currentData.title}
        </h3>
        <p
          className="text-sm font-normal leading-[21px] tracking-[-0.42px] mt-[29px] outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur("tagline", currentData.id)}
        >
          <span className="font-semibold">{currentData.tagline}</span>
        </p>
        <p
          className="text-sm font-normal leading-[21px] tracking-[-0.42px] mt-2 outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur("description", currentData.id)}
        >
          {currentData.description}
        </p>
      </div>
    </div>
  );
};

export default IndustryCard;
