import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { MilestoneCard } from "./MilestoneCard";

export const Milestones: React.FC = ({ comp,
    contentData = [],
    textEditHandler,
    setItem, setPageData, segmentProp
}) => {


    const { i18n } = useTranslation()
    const lang = i18n.language

    const [activeIndex, setActiveIndex] = useState(1);



    const [showContent, setShowContent] = useState(true);

    const handleIndexChange = (index: number) => {
        setShowContent(false); // temporarily hide content
        setActiveIndex(index);
        setTimeout(() => {
            setShowContent(true); // re-show after transition
        }, 100); // adjust duration as needed
    };

    const handleAddMilestone = () => {
        const newMilestone = {
            id: Date.now(),
            year: "1900",
            title: "Default Title",
            description: "Default Description",
        };

        setPageData((prev) => {
            const updatedPage = { ...prev };

            const targetSegment = updatedPage.segments.find(seg => seg.id === segmentProp.id);
            if (!targetSegment) return prev;

            const targetComponent = targetSegment.components.find(c => c.id === comp.id);
            if (!targetComponent) return prev;

            // Parse the existing content array if needed   
            let updatedContent = Array.isArray(targetComponent.parsedContent)
                ? [...targetComponent.parsedContent]
                : JSON.parse(targetComponent.content);

            updatedContent.push(newMilestone);

            // Update both content (stringified) and parsedContent (actual array)
            targetComponent.content = JSON.stringify(updatedContent);
            targetComponent.parsedContent = updatedContent;

            return updatedPage;
        });

        setActiveIndex(contentData.length); // select the newly added one
    };
    const handleDeleteMilestone = (id: number) => {
        setPageData((prev) => {
            const updatedPage = { ...prev };

            const targetSegment = updatedPage.segments.find(seg => seg.id === segmentProp.id);
            if (!targetSegment) return prev;

            const targetComponent = targetSegment.components.find(c => c.id === comp.id);
            if (!targetComponent) return prev;

            let updatedContent = Array.isArray(targetComponent.parsedContent)
                ? [...targetComponent.parsedContent]
                : JSON.parse(targetComponent.content);

            updatedContent = updatedContent.filter(m => m.id !== id);

            targetComponent.content = JSON.stringify(updatedContent);
            targetComponent.parsedContent = updatedContent;

            return updatedPage;
        });

        // Reset active index safely
        if (activeIndex >= contentData.length - 1) {
            setActiveIndex(Math.max(0, contentData.length - 2));
        }
    };


    const carouselDesktop = (
        <div className="w-full mt-[60px] max-md:mt-10 flex gap-2">
            {contentData?.map((milestone, index) => (
                <div
                    key={index}
                    className={`
                transition-all duration-700 ease-in-out 
                cursor-pointer will-change-[flex-basis] h-[200px] min-h-[200px] 
                ${index === activeIndex
                            ? "flex-grow basis-2/3 transform scale-100"
                            : "flex-grow-0 basis-[80px]  opacity-80 hover:opacity-100"
                        }
              `}
                    onClick={() => handleIndexChange(index)}
                >
                    {index === activeIndex ? (
                        <MilestoneCard
                            year={milestone.year}
                            title={milestone.title}
                            description={milestone.description}
                            index={index}
                            id={milestone.id}
                            textEditHandler={textEditHandler}
                            comp={comp}
                            contentData={contentData}
                            onDelete={handleDeleteMilestone}
                        />

                    ) : (
                        <div className="
                  h-full bg-white 
                  shadow-[0px_10px_31px_rgba(215,228,249,0.25)] 
                  border border-[rgba(17,17,17,0.1)] 
                  rounded-[17px] p-4 
                  flex items-center
                  transition-all duration-500 ease-in-out
                  hover:shadow-lg hover:border-[rgba(204,31,65,0.3)]
                  hover:bg-[rgba(204,31,65,0.05)]
                ">
                            <div className="
                    transform -rotate-90 whitespace-nowrap 
                    text-[rgba(204,31,65,1)] font-extrabold text-lg
                    transition-all duration-300
                  ">
                                {milestone.year}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );


    return (
        <section id="history" className="flex w-full max-w-[1178px] flex-col">
            <div className="mb-4 text-justify">
                <button
                    onClick={handleAddMilestone}
                    className="px-4 py-2 bg-[#CC1F41] text-white rounded-lg shadow hover:bg-opacity-90 transition"
                >
                    + Add Milestone
                </button>
            </div>
            {carouselDesktop}
        </section>
    );
};
