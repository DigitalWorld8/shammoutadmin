import React from "react";

interface MilestoneCardProps {
    year: string;
    title: string;
    description: string;
    index: number;
    id: number;
    setContentData: React.Dispatch<React.SetStateAction<any[]>>;
    textEditHandler: Function;
    comp: any;
    contentData: any[];
    onDelete: (id: number) => void; // new
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
    year,
    title,
    description,
    index,
    id,
    textEditHandler, comp, contentData, onDelete
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
            <button
                onClick={() => onDelete(id)}
                className="
    absolute top-3 right-3 
    w-8 h-8 flex items-center justify-center 
    text-gray-400 hover:text-white 
    bg-gray-100 hover:bg-[#cc1f41] 
    rounded-full transition-colors duration-300 
    shadow-sm hover:shadow-md
  "
                aria-label="Delete milestone"
                title="Delete"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

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
