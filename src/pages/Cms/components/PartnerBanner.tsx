import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setClickedKey } from "../../../store/slices/pagesSlice";
import { useDispatch } from "react-redux";

interface ContentData {
    title: string;
    description: string;
    img: string;
    btnLabel: string;
}

interface PartnerBannerProps {
    contentData: ContentData;
    setContentData: React.Dispatch<React.SetStateAction<ContentData>>;
}

export const PartnerBanner: React.FC<PartnerBannerProps> = ({
    comp,
    contentData = [],
    textEditHandler,
    setItem,
    handleClickEditIcon
}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const navigate = useNavigate();
    const item = contentData[0];

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


    return (
        <section
            id="partner"
            className="relative flex flex-col relative min-h-[454px] max-w-full items-center justify-center  px-[70px] py-36 rounded-[23px] max-md:px-5"
        >
            <img
                src={item?.logo}
                alt={t("partner.bannerImageAlt")}
                className="absolute h-full w-full object-cover inset-0 rounded-[23px]"
            />
            <button
                onClick={() => {
                    handleClickEditIcon(item)

                    dispatch(setClickedKey('logo'))

                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow z-10"
                title="Edit Image"
            >
                ✏️
            </button>
            <div className="absolute inset-0 bg-black/30 rounded-[23px]" />
            <div className="relative mb-[-29px] w-[905px] max-w-full max-md:mb-2.5 z-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                    <div className="w-[64%] max-md:w-full max-md:ml-0">
                        <div className="relative grow text-white max-md:max-w-full max-md:mt-10">
                            <h2
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={handleBlur(0, "title", item?.id)}
                                className="text-[32px] font-extrabold leading-[35px] tracking-[-0.96px] max-md:max-w-full max-md:mr-2"
                            >
                                {item?.title}
                            </h2>
                            <p
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={handleBlur(0, "description", item?.id)}
                                className="text-sm font-medium leading-[21px] tracking-[-0.42px] mt-[30px] max-md:max-w-full"
                            >
                                {item?.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-[36%] ml-5 max-md:w-full max-md:ml-0">
                        <form className="relative w-full text-[10px] font-semibold leading-none max-md:mt-10">
                            <div className="mb-2">
                                <input
                                    type="email"
                                    placeholder={t("form.emailPlaceholder")}
                                    disabled
                                    className="self-stretch bg-neutral-100 w-full text-[rgba(30,57,94,1)] px-[19px] py-[18px] rounded-md"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="tel"
                                    placeholder={t("form.phonePlaceholder")}
                                    disabled
                                    className="self-stretch bg-neutral-100 w-full text-[rgba(164,164,164,1)] font-normal px-[19px] py-[18px] rounded-md"
                                />
                            </div>
                            <button
                                type="button"
                                className="self-stretch border-[color:var(--white,#FFF)] w-full text-white mt-[9px] px-[22px] py-[18px] rounded-[6.376px] border-[1.275px] border-solid hover:bg-white hover:bg-opacity-20 transition-colors max-md:px-5"
                            >
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={handleBlur(0, "btnLabel", item?.id)}
                                >
                                    {item?.btnLabel}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
