import React from "react";
import { useTranslation } from 'react-i18next';
import { setClickedKey } from "../../../store/slices/pagesSlice";
import { useDispatch } from "react-redux";

export const Values: React.FC = ({ comp,
    contentData = [],
    textEditHandler,
    setItem,
    handleClickEditIcon }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    console.log('contentData', contentData);

    const handleChange = (index, key, e, id) => {
        const newValue = e.target.innerText;

        const updated = [...contentData];
        updated[index] = {
            ...updated[index],
            [key]: newValue,
        };
        textEditHandler(comp, id, key)(e);

    };

    const handleBlur = (index, key, id) => (e) => {

        handleChange(index, key, e, id);
    };


    const titleIndex = contentData?.findIndex((v) => v.key === "title");
    const titleItem = contentData[titleIndex];


    return (
        <section
            id="about"
            className="bg-[rgba(30,57,94,1)] self-stretch flex w-full flex-col items-center text-white justify-center  max-md:mt-10 max-md:px-5 px-20  max-md:max-w-full"
        >
            <div className="flex w-full max-w-[1157px] flex-col items-stretch max-md:max-w-full">
                <h3
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleBlur(titleIndex, "title", titleItem?.id)}
                    className="text-xl font-extrabold leading-loose tracking-[-0.6px] mt-[17px] focus:outline-none"
                >
                    {contentData?.find((v) => v.key === "title")?.title}
                </h3>
                <div className="flex gap-5 flex-wrap justify-between mt-[62px] max-md:max-w-full max-md:mt-10">
                    {contentData?.filter((v) => v.key !== "title")?.map((value, index) => (
                        <React.Fragment key={value.key}>
                            <div className="flex flex-col items-start">
                                <div className="relative w-[93px] h-[93px]">
                                    <img
                                        src={value.logo}
                                        alt={`${value.key} icon`}
                                        className="w-full h-full object-contain"
                                    />
                                    <button
                                        onClick={() => {
                                            handleClickEditIcon(value)
                                            dispatch(setClickedKey('logo'))

                                        }}
                                        className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow z-10"
                                        title="Edit Image"
                                    >
                                        ✏️
                                    </button>
                                </div>

                                <h3
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={handleBlur(index, "title", value?.id)}
                                    className="text-xl font-extrabold leading-loose tracking-[-0.6px] mt-[17px] focus:outline-none"
                                >
                                    {value.title}
                                </h3>

                                <p
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={handleBlur(index, "description", value?.id)}
                                    className="text-sm font-normal leading-[21px] tracking-[-0.42px] self-stretch mt-[21px] focus:outline-none"
                                >
                                    {value.description}
                                </p>
                            </div>

                            {index !== contentData.length - 1 && (
                                <div className="border w-px shrink-0 h-[200px] mt-7 border-[rgba(255,255,255,0.5)] border-solid" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};
