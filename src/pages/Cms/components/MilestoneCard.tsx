import React from "react";

interface MilestoneCardProps {
    year: string;
    title: string;
    description: string;
    index: number;
    setContentData: React.Dispatch<React.SetStateAction<any[]>>;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
    year,
    title,
    description,
    index,
    id,
    textEditHandler, comp, contentData
}) => {
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
        <div className="bg-white h-[200px] min-h-[200px]
            shadow-[0px_10px_31px_rgba(215,228,249,0.25)]
            border flex flex-col
            text-[22px] text-[rgba(30,57,94,1)]
            tracking-[-0.65px] leading-none 
            w-full p-8 rounded-[17px] 
            border-[rgba(17,17,17,0.1)] border-solid
            transition-all duration-500 ease-in-out
            hover:shadow-[0px_20px_40px_rgba(215,228,249,0.4)]"
        >
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(index, "year", id)}
                className="text-[rgba(204,31,65,1)] font-extrabold outline-none"
            >
                {year}
            </div>
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(index, "title", id)}
                className="font-bold mt-[18px] outline-none"
            >
                {title}
            </div>
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur(index, "description", id)}
                className="text-sm font-normal leading-loose tracking-[-0.43px] mt-[18px] outline-none"
            >
                {description}
            </div>
        </div>
    );
};
