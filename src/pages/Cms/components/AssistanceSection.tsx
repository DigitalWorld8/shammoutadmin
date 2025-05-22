import React from "react";
import { setClickedKey } from "../../../store/slices/pagesSlice";
import { useDispatch } from "react-redux";

const AssistanceSection: React.FC = ({ comp,
    contentData = [],
    textEditHandler,
    setItem,
    handleClickEditIcon }) => {
    const dispatch = useDispatch()
    const item = contentData?.[0];

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


    if (!item) {
        return <div className="text-red-500">No content data available</div>;
    }

    return (
        <section className="relative flex flex-col relative min-h-[290px] w-full text-white justify-center mt-[82px] px-20 py-[75px] rounded-[23px] max-md:mt-10 max-md:px-5">
            <img
                src={item?.logo}
                alt="assistanceSection.backgroundAlt"
                className="absolute h-full w-full object-cover inset-0 rounded-[23px]"
            />
            <button
                onClick={() => {
                    handleClickEditIcon(item)
                    dispatch(setClickedKey('logo'))

                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                title="Edit Image"
            >
                ✏️
            </button>
            <div className="relative w-[472px] max-w-full">
                <h2
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleBlur(0, "title", item.id)}
                    className="text-[32px] font-extrabold leading-[35px] tracking-[-0.96px] max-md:max-w-full"
                >
                    {item.title}
                </h2>
                <div className="flex w-[394px] max-w-full items-stretch gap-2 text-[10px] font-semibold leading-none mt-8">
                    <a
                        // href={`mailto:${current.email}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleBlur(0, "email", item.id)}
                        className="self-stretch min-h-[41px] flex items-center px-[22px] py-3.5 rounded-[6.376px] bg-white/20 hover:bg-white/30 transition-colors max-md:px-5"
                    >
                        {item.email}
                    </a>
                    <a
                        // href={`tel:${current.phone}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleBlur(0, "phone", item.id)}
                        className="bg-[rgba(204,31,65,1)] border flex min-h-[41px] items-center gap-1.5 justify-center px-[22px] py-[13px] rounded-md border-[rgba(204,31,65,1)] border-solid hover:bg-[rgba(184,28,59,1)] transition-colors max-md:px-5"
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/1a6ba54892ad6337a8fb3bb46815a360cd68559e?placeholderIfAbsent=true"
                            alt="assistanceSection.phoneAlt"
                            className="aspect-[0.93] object-contain w-3.5 self-stretch shrink-0 my-auto"
                        />
                        <span className="self-stretch my-auto">{item.phone}</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AssistanceSection;
