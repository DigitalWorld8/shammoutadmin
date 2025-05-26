import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import IconFile from "../../components/Icon/IconFile";
import { setSelectedSegmemt } from "../../store/slices/pagesSlice";
import IconPlus from "../../components/Icon/IconPlus";

import IconTrash from "../../components/Icon/IconTrash";
import Components from "./SelectedComponent";
import Swal from 'sweetalert2';
import IconChecks from "../../components/Icon/IconChecks";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import { useAppSelector } from "../../store";
import Loader from "../../utils/Loader";
import { updateSegmentService } from "../../store/services/pagesService";
import { useAppDispatch } from "../../store/hooks";
import { s } from "@fullcalendar/core/internal-common";
import { GripHorizontal } from "lucide-react";

interface ContentProps {
    pageData: any;
    setPageData: (data: any) => void;

    setOpenComponentModal: (open: boolean) => void;
    setShowDeleteModal: (open: boolean) => void;
    setDeleteData: (data: { type: string; id: string; itemName: string }) => void;
    updateSegmentName: (index: number, name: string) => void;
    updateSegmentDescription: (index: number, description: string) => void;
    setSelectedComponent: (component: any) => void;
    setIsSegmentModalOpen: (component: any) => void;
    selectedLang: string;
    selectedPos: string;
    componentFormik: any;
    setTabData: (data: any) => void;
}

const Content: React.FC<ContentProps> = ({
    pageData,
    setPageData,

    setOpenComponentModal,
    setShowDeleteModal,
    setDeleteData,
    updateSegmentName,
    updateSegmentDescription,
    setSelectedComponent,
    selectedLang,
    selectedPos,
    componentFormik,
    setTabData, setIsSegmentModalOpen
}) => {
    const { isLoadingUpdateSegment } = useAppSelector(state => state.pages)
    const dispatch = useAppDispatch();
    const [seg, setSeg] = useState({})
    const [item, setItem] = useState({})
    const [selectedImg, setSelectedImg] = useState<string | undefined>('');

    const addNewComponent = (segment) => {
        if (segment.components.length > 0) {
            showAlert(13)
        } else {

            dispatch(setSelectedSegmemt(segment));
            setOpenComponentModal(true);
        }

    }
    const showAlert = async (type: number) => {
        if (type === 13) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You Cant Create Multiple Components To The Same Segment!',
                // footer: '<a href="javascript:;">Why do I have this issue?</a>',
                padding: '2em',
                customClass: 'sweet-alerts',
            });
        }
    }

    if (!Array.isArray(pageData?.segments) || pageData?.segments.length === 0) {
        return (
            <div className="flex items-center justify-center p-6 border border-gray-300 bg-gray-100 rounded-lg">
                <div className="text-center">
                    <span className="text-2xl font-semibold text-gray-700 mb-2 block">No Elements Available</span>
                    <p className="text-sm text-gray-500 mb-4">It looks like there are no Elements in this page yet. You can add one from the side to get started.</p>
                    {/* <button
                        onClick={() => setIsSegmentModalOpen(true)}  // Assuming you have a function to open the modal
                        className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-all duration-200"
                    >
                        <IconPlus size={20} className="mr-2" />
                        Add New Segment
                    </button> */}
                </div>
            </div>
        );
    }
    const saveSegmentData = (segment: any, newSegments) => {
        console.log('segmentsssssssssssssssssssssssssssssssss', segment);
        // Get the actual new index of the moved segment
        const newIndex = newSegments.findIndex(s => s.id === segment.id);
        let cleanedSegment = segment
        cleanedSegment.position = newIndex + 1;
        console.log('cleanedSegment', cleanedSegment);

        dispatch(updateSegmentService(cleanedSegment))
    };
    const handleSegmentReorder = (newSegments) => {
        const updatedSegments = newSegments.map((segment, index) => ({
            ...segment,
            position: index + 1,
        }));

        setPageData(prev => ({
            ...prev,
            segments: updatedSegments,
        }));
    };

    return (
        <ReactSortable
            list={pageData.segments}
            setList={handleSegmentReorder}

            className="pl-4 space-y-4"
        >

            {[...pageData?.segments]?.sort((a, b) => a.position - b.position)?.map((segment, sIdx) => {
                const hasMainCarousel = segment?.components?.some(comp => comp.type === 'MainCarousel');

                return (
                    <div key={sIdx} className="border p-4 rounded bg-white dark:bg-[#1e293b] shadow">
                        <div className="flex flex-col ">
                            <div className="flex justify-end  gap-1">
                                <Tippy content="Drag Segment">
                                    <span
                                        className="cursor-move p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
                                    >
                                        <GripHorizontal size={18} />
                                    </span>
                                </Tippy>
                                <Tippy content="Delete Segment">
                                    <span
                                        className="cursor-pointer p-1 rounded-full text-red-500 hover:text-white hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                                        onClick={() => {
                                            setShowDeleteModal(true);
                                            setDeleteData({
                                                type: "segment",
                                                id: segment?.id,
                                                itemName: segment?.name,
                                            });
                                        }}
                                    >
                                        <IconTrashLines size={18} />
                                    </span>
                                </Tippy>

                            </div>
                            {!hasMainCarousel && (
                                <div className="flex flex-col min-w-[300px] max-w-[500px]">
                                    <input
                                        type="text"
                                        value={segment?.name || ""}
                                        onChange={(e) => updateSegmentName(sIdx, e.target.value)}
                                        className="mb-4 text-2xl font-semibold w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary"
                                    />
                                    <textarea
                                        value={segment?.description || ""}
                                        onChange={(e) => updateSegmentDescription(sIdx, e.target.value)}
                                        className="mb-4 text-sm text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary resize-none"
                                    />
                                </div>
                            )}
                        </div>

                        {/* If there are no components */}
                        {segment?.components?.length === 0 && (
                            <div className="flex items-center justify-center p-6 border border-gray-300 bg-gray-100 rounded-lg">
                                <div className="text-center">
                                    <span className="text-2xl font-semibold text-gray-700 mb-2 block">
                                        No Components Available
                                    </span>
                                    <p className="text-sm text-gray-500 mb-4">
                                        It looks like there are no components in this segment yet. You can add one to get started.
                                    </p>
                                    <button
                                        onClick={() => addNewComponent(segment)}
                                        className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-all duration-200"
                                    >
                                        <IconPlus size={20} className="mr-2" />
                                        Add New Component
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* If there are components */}
                        {Array.isArray(segment?.components) && segment?.components.length > 0 && (
                            <ReactSortable
                                list={segment.components}
                                setList={(newComponents) => {
                                    const updatedSegments = [...pageData.segments];
                                    updatedSegments[sIdx] = {
                                        ...updatedSegments[sIdx],
                                        components: newComponents,
                                    };
                                    setPageData({
                                        ...pageData,
                                        segments: updatedSegments,
                                    });
                                }}
                                className="pl-4 mt-2 list-disc list-inside text-sm space-y-1"
                                tag="ul"
                            >
                                {segment.components.map((comp, cIdx) => (
                                    <li
                                        key={comp?.id || cIdx}
                                        className="list-none cursor-pointer text-gray-500 hover:text-danger dark:text-gray-400"
                                        onClick={() => setSelectedComponent(comp)}
                                    >
                                        <Components
                                            comp={comp}
                                            selectedLang={selectedLang}
                                            selectedPos={selectedPos}
                                            formik={componentFormik}
                                            setTabData={setTabData}
                                            setDeleteData={setDeleteData}
                                            setShowDeleteModal={setShowDeleteModal}
                                            setPageData={setPageData}
                                            pageData={pageData}
                                            segmentProp={segment}
                                            seg={seg}
                                            setSeg={setSeg}
                                            item={item}
                                            setItem={setItem}
                                            selectedImg={selectedImg}
                                            setSelectedImg={setSelectedImg}
                                        />
                                    </li>
                                ))}
                                
                            </ReactSortable>
                        )}
                    </div>
                );
            })}


        </ReactSortable>
    );
};

export default Content;
