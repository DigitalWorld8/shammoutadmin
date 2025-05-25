import React, { useEffect } from "react";
import ContactCard from "./ContactCard";
interface ContentData {
    id: string;
    title: string;
}

interface ReachUsSectionProps {
    comp: { id: string };
    contentData?: ContentData[]; // allow undefined
    textEditHandler: (comp: any, itemId: string, key: string) => (e: React.FormEvent<HTMLElement>) => void;
    setItem: () => void;
    segment: any;
}
const ReachUsSection: React.FC<ReachUsSectionProps> = ({
    comp,
    contentData = [],
    textEditHandler,
    setItem, seg,
    handleClickEditIcon, setPageData, setSeg
}) => {

    return (
        <section className=" max-md:mt-10">
            <div className="max-md:mt-10">
                <div className="gap-5 grid grid-cols-3 max-md:grid-cols-1">
                    {contentData?.map((contact, index) => (
                        <div key={index} className="w-full">
                            <ContactCard
                                comp={comp}
                                card={
                                    contact
                                }
                                seg={seg}
                                setSeg={setSeg}
                                setPageData={setPageData}
                                contentData={contentData}
                                index={index}
                                textEditHandler={textEditHandler}
                                setItem={setItem} handleClickEditIcon={handleClickEditIcon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReachUsSection;
