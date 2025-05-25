import React from "react";
import { Link } from "react-router-dom";
import { DesktopNavigation } from "./DesktopNavigation";
import Tippy from "@tippyjs/react";
import IconFile from "../../../../components/Icon/IconFile";
import { useAppSelector } from "../../../../store";
import Loader from "../../../../utils/Loader";

interface MainNavigationProps {
    isMobile: boolean;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ isMobile, header, labels, setLabels, submitHeaderData }) => {
    const { isLoadingUpdateConstComp } = useAppSelector(state => state.pages);

    return (
        <>
            {!isMobile && (
                <nav className=" relative bg-white/80 backdrop-blur-md w-full flex items-center gap-5 text-[rgba(30,57,94,1)] font-semibold flex-wrap justify-center py-4 px-4 shadow-sm border border-[#cccccc52]">
                    <div className=" relative w-full mx-auto flex justify-between items-center">
                        {/* Logo */}
                        {/* <img
                            src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/ef55696ff67ea3de1f900af9552cd47587ba243e"
                            alt="Shammout Group Logo"
                            className="aspect-[3.1] object-contain w-[120px] md:w-[167px]"
                        /> */}
                        <div className="relative inline-block">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/ef55696ff67ea3de1f900af9552cd47587ba243e"
                                alt="Logo"
                                className="aspect-[3.1] object-contain w-[120px] md:w-[167px]"
                            />
                            <button
                                onClick={() => {
                                    // setIsUploadModalOpen(true)
                                }}
                                className="absolute bottom-10 left-0 bg-white bg-opacity-90 p-1 rounded-full shadow  hover:text-white transition"
                                title="Edit Logo URL"
                            >
                                ✏️
                            </button>
                        </div>
                        {/* Desktop Navigation */}
                        <DesktopNavigation header={header} labels={labels} setLabels={setLabels} submitHeaderData={submitHeaderData} />

                        {/* Top-right Icon */}
                        {/* <div className="absolute top-4 right-4">
                            {isLoadingUpdateConstComp ? <Loader width={25} height={25} /> :
                                <Tippy content="Save Header Data">
                                    <span className="cursor-pointer" onClick={() => submitHeaderData()}>
                                        <IconFile size={18} />
                                    </span>
                                </Tippy>
                            }
                        </div> */}
                    </div>
                </nav>
            )}
        </>
    );
};
