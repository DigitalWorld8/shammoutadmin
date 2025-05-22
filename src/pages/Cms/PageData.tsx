import React from "react";
import Tippy from "@tippyjs/react";
import IconFile from "../../components/Icon/IconFile";
import IconPlus from "../../components/Icon/IconPlus";
import IconTrash from "../../components/Icon/IconTrash";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import Loader from "../../utils/Loader";
import IconChecks from "../../components/Icon/IconChecks";
import { useAppSelector } from "../../store";
import IconEye from "../../components/Icon/IconEye";
import { ExternalLink } from "lucide-react";
import { SHAMOUT_URL } from "../../store/urls";


interface PageDataProps {
    pageData: any; // (You can replace 'any' with a better type later if you want)
    savePageData: (data: any) => void;
    setIsSegmentModalOpen: (open: boolean) => void;
    setShowDeleteModal: (open: boolean) => void;
    setDeleteData: (data: { type: string; id: string; itemName: string }) => void;
    updatePageTitle: (title: string) => void;
    updatePageDescription: (description: string) => void;
}

const PageData: React.FC<PageDataProps> = ({
    pageData,
    savePageData,
    setIsSegmentModalOpen,
    setShowDeleteModal,
    setDeleteData,
    updatePageTitle,
    updatePageDescription, selectedLang, selectedPos
}) => {
    const { isLoadingUpdatePage } = useAppSelector(state => state.pages)
    return (
        <div className=" p-2">
            <div className="">
                {/* <div className="flex justify-end gap-1">
                    <Tippy content="Save Page Data">
                        <span className="cursor-pointer" onClick={() => savePageData(pageData)}>
                            <IconFile size={18} />
                        </span>
                    </Tippy>

                    <Tippy content="Add New Segment">
                        <span className="cursor-pointer" onClick={() => setIsSegmentModalOpen(true)}>
                            <IconPlus size={18} />
                        </span>
                    </Tippy>

                    <Tippy content="Delete Page">
                        <span
                            className="cursor-pointer text-gray-600 hover:text-primary"
                            onClick={() => {
                                setShowDeleteModal(true);
                                setDeleteData({
                                    type: "page",
                                    id: pageData?.id,
                                    itemName: pageData?.pageUrlName,
                                });
                            }}
                        >
                            <IconTrash size={18} />
                        </span>
                    </Tippy>
                </div> */}
                <div className="flex justify-end  gap-1 ">
                    <Tippy content="Delete Page">
                        <span
                            className="cursor-pointer p-1 rounded-full text-red-500 hover:text-white hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                            onClick={() => {
                                setShowDeleteModal(true);
                                setDeleteData({
                                    type: "page",
                                    id: pageData?.id,
                                    itemName: pageData?.pageUrlName,
                                });
                            }}

                        >
                            <IconTrashLines size={18} />
                        </span>
                    </Tippy>
                    <Tippy content="Preview Page">
                        <span
                            className="cursor-pointer p-1 rounded-full text-blue-500 hover:text-white hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
                            onClick={() => {
                                const pos = selectedPos?.value;
                                const lang = selectedLang?.value;
                                const newPageUrl = `${SHAMOUT_URL}/${pos}/${lang}/${pageData?.pageUrlName}`;
                                window.open(newPageUrl, '_blank', 'noopener,noreferrer');
                            }}                        >
                            <ExternalLink size={18} />
                        </span>
                    </Tippy>
                    {/* {isLoadingUpdatePage ?
                        <span>

                            <Loader width={20} height={20} />
                        </span>

                        :
                        <Tippy content="Save Page Data">
                            <span
                                onClick={() => savePageData(pageData)}
                                className="cursor-pointer p-1 rounded-full text-green-600 hover:text-white hover:bg-green-700 transition-all duration-200 transform hover:scale-110"
                            >
                                <IconChecks size={18} />
                            </span>
                        </Tippy>

                    } */}
                </div>

                <div className="min-w-[300px] max-w-[400px]">
                    <label
                        htmlFor="page-title"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '1.25rem', // bigger font size (text-xl)
                            fontWeight: 700, // bold
                            color: '#374151', // gray-700
                        }}
                    >
                        Page Title
                    </label>
                    <input
                        id="page-title"
                        type="text"
                        value={pageData?.title || ""}
                        onChange={(e) => updatePageTitle(e.target.value)}
                        style={{
                            marginBottom: '1.5rem',
                            fontSize: '1rem', // normal input text size (text-base)
                            fontWeight: 400, // normal weight
                            width: '100%',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            border: 'none',
                            borderBottom: '1px solid #D1D5DB', // only bottom border
                        }}
                    />

                    <label
                        htmlFor="page-description"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '1.25rem', // bigger font size
                            fontWeight: 700, // bold
                            color: '#374151', // gray-700
                        }}
                    >
                        Page Description
                    </label>
                    <textarea
                        id="page-description"
                        value={pageData?.description || ""}
                        onChange={(e) => updatePageDescription(e.target.value)}
                        style={{
                            marginBottom: '1.5rem',
                            fontSize: '1rem', // normal textarea text size
                            fontWeight: 400, // normal weight
                            width: '100%',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            border: 'none',
                            borderBottom: '1px solid #D1D5DB',
                            resize: 'none',
                        }}
                    />
                </div>


            </div>
        </div>
    );
};

export default PageData;
