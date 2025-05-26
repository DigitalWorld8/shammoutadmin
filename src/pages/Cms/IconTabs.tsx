import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '../../components/Highlight';
import IconCode from '../../components/Icon/IconCode';
import IconHome from '../../components/Icon/IconHome';
import IconUser from '../../components/Icon/IconUser';
import IconPhone from '../../components/Icon/IconPhone';
import IconInfoCircle from '../../components/Icon/IconInfoCircle';
import IconPlus from '../../components/Icon/IconPlus';
import { ReactSortable } from 'react-sortablejs';
import IconFile from '../../components/Icon/IconFile';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconTrash from '../../components/Icon/IconTrash';
import IconEdit from '../../components/Icon/IconEdit';
import { useAppSelector } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import { editStaticComponentsService, getPageByIdService, getPageBySubUrlService, getPagesService, getStaticComponentsService, getSubPathService, updatePageService, updateSegmentService } from '../../store/services/pagesService';
import Select from 'react-select';
import { setPageUrl, setSelectedPage, setSelectedSegmemt } from '../../store/slices/pagesSlice';
import MainCarousel from './components/MainCarousel';
import Components from './SelectedComponent';
import SubPageTabs from './SubPageTabs';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import PageData from './PageData';
import Content from './Content';
import PageFilter from './PageFilter';
import PagesTabList from './PagesTabList';
import Swal from 'sweetalert2';
import EditLogoModal from './components/EditLogoModal';

const posOptions = [
    { label: 'sy', value: 'sy' }
]
const langOptions = [
    { label: 'English', value: 'english' },
    { label: 'Arabic', value: 'arabic' },
]

const IconTabs = ({ segmentFormik, pageData,
    setPageData,
    componentFormik,
    tabs,
    tabData,
    setTabData,
    selectedLang,
    setSelectedLang,
    selectedPos,
    setSelectedPos,
    toggleCode,
    setIsModalOpen,
    setIsSegmentModalOpen,
    setOpenComponentModal,
    selectedComponent,
    setSelectedComponent,
    setDeleteData,
    setShowDeleteModal, }) => {
    const [typeLogo, setTypeLogo] = useState('')
    const dir = selectedLang.value === 'english' ? 'ltr' : 'rtl'
    const { pages, page, selectedPage, subPages, metaDataItems, staticComp, isLoading, isLoadingSegment, isLoadingComponent } = useAppSelector((state) => state.pages);
    const isLoadingCreate = isLoadingSegment || isLoadingComponent || isLoading
    const header = staticComp?.filter((c) => c.language === selectedLang?.value)?.find((c) => c.type === 'header')
    const footer = staticComp?.filter((c) => c.language === selectedLang?.value)?.find((c) => c.type === 'footer')

    useEffect(() => {
        if (selectedPage) {
            setPageData(JSON.parse(JSON.stringify(selectedPage)));
        }
    }, [selectedPage]);

    useEffect(() => {
        if (!pageData?.segments?.length) return;

        const alreadyParsed = pageData.segments.every(segment =>
            segment.components.every(component => Array.isArray(component.parsedContent))
        );

        if (alreadyParsed) return;

        const updatedPageData = {
            ...pageData,
            segments: pageData.segments.map((segment) => {
                const updatedComponents = segment.components.map((component) => {
                    let parsedContent = [];

                    try {
                        parsedContent = JSON.parse(component.content || "[]");
                    } catch (err) {
                        console.error("Failed to parse component content:", err);
                    }

                    return {
                        ...component,
                        parsedContent,
                    };
                });

                return {
                    ...segment,
                    components: updatedComponents,
                };
            }),
        };

        setPageData(updatedPageData);
    }, [pageData]);





    const dispatch = useAppDispatch();

    const [labels, setLabels] = React.useState<Record<string, string>>({

    });
    console.log('labels', labels);

    const [footerData, setFooterData] = useState<any>();

    useEffect(() => {
        if (footer?.content) {
            try {
                const parsed = JSON.parse(footer.content);
                setFooterData(parsed);
            } catch (error) {
            }
        }
    }, [footer?.content])

    const updatePageTitle = (newTitle) => {
        (setPageData({
            ...pageData,
            title: newTitle,
        }));
    };

    const updatePageDescription = (newDescription) => {
        (setPageData({
            ...pageData,
            description: newDescription,
        }));
    };

    const updateSegmentName = (segmentIndex, newName) => {
        const updatedSegments = [...pageData.segments];
        updatedSegments[segmentIndex] = {
            ...updatedSegments[segmentIndex],
            name: newName,
        };

        (setPageData({
            ...pageData,
            segments: updatedSegments,
        }));
    };

    const updateSegmentDescription = (segmentIndex, newDescription) => {
        const updatedSegments = [...pageData.segments];
        updatedSegments[segmentIndex] = {
            ...updatedSegments[segmentIndex],
            description: newDescription,
        };

        (setPageData({
            ...pageData,
            segments: updatedSegments,
        }));
    };


    const handleTabSelect = (selectedPage: Page, path: string, level: number) => {

        dispatch(setSelectedPage(selectedPage))
        const clonedPage = JSON.parse(JSON.stringify(selectedPage));
        delete clonedPage.chosen;


        dispatch(getPageBySubUrlService({ country: selectedPos.value, language: selectedLang.value, pageUrlName: path })).then((action) => {
            if (getPageBySubUrlService.fulfilled.match(action)) {
                (setPageData(action.payload))

            }
        })
    };


    const savePageData = (pageData) => {
        const {
            id,
            title,
            description,
            isDeleted,
            status,
            segments = [],
        } = pageData;

        // Early return if no segments
        if (!segments.length) {
            console.warn("No segments to save. Aborting dispatch.");
            return;
        }

        // Check if any segment's first component has invalid content
        const hasInvalidContent = segments.some((segment) => {
            const firstComponent = segment.components?.[0];
            const content = firstComponent?.content;

            return (
                content === undefined ||
                content === null ||
                (Array.isArray(content) && content.length === 0) ||
                (typeof content === "string" && content.trim() === "")
            );
        });

        if (hasInvalidContent) {
            console.warn("At least one segment has a component with invalid content. Aborting dispatch.");
            return;
        }

        const simplifiedSegments = segments.map(seg => ({
            id: seg.id,
            pageId: id,
            name: seg.name,
            description: seg.description,
            position: seg.position,
            components: seg.components.map(({ chosen, ...rest }) => rest),
        }));

        const data = {
            id,
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            isDeleted,
            status,
            segments: simplifiedSegments,
        };

        dispatch(updatePageService(data)).then((action) => {
            if (updatePageService.fulfilled.match(action)) {
                dispatch(getPagesService({ country: selectedPos.value, language: selectedLang.value })).then((action) => {
                    if (getPagesService.fulfilled.match(action)) {
                        const data = action.payload.items;
                        setTabData(JSON.parse(JSON.stringify(data)));
                        if (data.length > 0) {
                            const editedPage = data.find((p) => p.id === id);
                            if (editedPage) {
                                dispatch(setSelectedPage(editedPage));
                                // dispatch(setSelectedSegmemt(editedPage[0].segments[0]))
                            }
                        }
                    }
                });
            }
        });
    };




    const saveChanges = async () => {
        try {

            // Map over all segments and their components to update the content
            const updatedSegments = pageData.segments.map((segment) => {
                const { selected, ...restSegment } = segment;

                const updatedComponents = restSegment.components?.map((component) => {
                    // Check if the component has content that needs to be serialized

                    if (component.parsedContent) {
                        try {
                            // Parse the content if it's a JSON string and update the content
                            const updatedContent = JSON.stringify(component.parsedContent); // Serialize it back if needed
                            const { parsedContent, selected, ...restComponent } = component;

                            return { ...restComponent, content: updatedContent };
                        } catch (error) {
                            // If it's not a valid JSON string, leave it as it is
                            console.log('Error parsing content:', error);
                            return component;
                        }
                    }
                    return component;
                });

                return {
                    ...restSegment,
                    components: updatedComponents,
                };
            });

            // Update the pageData with the modified segments
            const updatedPageData = { ...pageData, segments: updatedSegments };

            // Save updated pageData to the backend
            await Promise.all([savePageData(updatedPageData)]);

            // If you need to save other static components (like header and footer), do so here
            const content = JSON.stringify(labels);
            await dispatch(editStaticComponentsService({
                data: {
                    id: header.id,
                    type: 'header',
                    content,
                    language: selectedLang.value
                }
            }));

            const footerContent = JSON.stringify(footerData);

            await dispatch(editStaticComponentsService({
                data: {
                    id: footer.id,
                    type: 'footer',
                    content: footerContent,
                    language: selectedLang.value
                }
            }));

        } catch (error) {
            console.log('Error saving changes:', error);
        }
    };



    const typeOptions = metaDataItems.map((item) => {
        return {
            ...item, label: item.type, value: item.id
        }
    });

    const showAlert = async (type: number) => {
        if (type !== 10) return;

        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to add a new component?',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            padding: '2em',
            customClass: 'sweet-alerts',
            preConfirm: async () => {
                // Set loading manually
                Swal.showLoading();

                await segmentFormik.submitForm(); // Submit the form first
            }
        });

        if (result.isConfirmed) {
            // After form submit + loading, show success
            Swal.fire({
                title: 'Added!',
                text: 'Component has been added.',
                icon: 'success',
                customClass: 'sweet-alerts',
            });
        }
    };


    const handleAddNew = (component: any) => {
        showAlert(10);
        setSelectedComponent(component)
    };

    const [showEditLogoModal, setShowLogoModal] = useState(false)
    const handleClickEditIcon = (type) => {
        console.log('type', type);
        setTypeLogo(type)
        setShowLogoModal(true)
    }


    return (
        <div className="panel" id="icon" style={{
            direction: dir
        }}>
            <PageFilter
                selectedPos={selectedPos}
                setSelectedPos={setSelectedPos}
                posOptions={posOptions}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                langOptions={langOptions}
            />

            <Tab.Group >
                <PagesTabList
                    tabData={tabData}
                    handleTabSelect={handleTabSelect}
                    setIsModalOpen={setIsModalOpen}
                    saveChanges={saveChanges}
                />
                <Tab.Panels>

                    {pageData &&

                        <div className="grid gap-6 pt-5 " style={{ gridTemplateColumns: '15% 85%' }}>
                            {/* First Div (20%) */}
                            <div className="p-4 bg-white rounded-lg shadow-md border ">
                                <h2 className="text-lg font-bold mb-4 text-[#191e3a]">Components</h2>
                                <h6 className="text-xs mb-4 ">Select the component you want to add:</h6>
                                <ul className="space-y-2">
                                    {typeOptions.map((item) => (
                                        <li
                                            key={item.id}
                                            className="p-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                                            onClick={() => handleAddNew(item)}
                                        >
                                            <div className="font-semibold text-gray-800">{item.label}</div>
                                            {/* <div className="text-sm text-gray-500">Type ID: {item.value}</div> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            {/* Second Div (80%) */}
                            <div>
                                <PageData
                                    pageData={pageData}
                                    savePageData={savePageData}
                                    setIsSegmentModalOpen={setIsSegmentModalOpen}
                                    setShowDeleteModal={setShowDeleteModal}
                                    setDeleteData={setDeleteData}
                                    updatePageTitle={updatePageTitle}
                                    updatePageDescription={updatePageDescription}
                                    selectedLang={selectedLang}
                                    selectedPos={selectedPos}
                                />
                                <div className="my-1">
                                    <Header
                                        handleClickEditIcon={handleClickEditIcon}
                                        pageData={pageData} labels={labels} setLabels={setLabels} selectedLang={selectedLang} />
                                </div>
                                <Content
                                    pageData={pageData}
                                    setPageData={setPageData}
                                    setOpenComponentModal={setOpenComponentModal}
                                    setShowDeleteModal={setShowDeleteModal}
                                    setDeleteData={setDeleteData}
                                    updateSegmentName={updateSegmentName}
                                    updateSegmentDescription={updateSegmentDescription}
                                    setSelectedComponent={setSelectedComponent}
                                    selectedLang={selectedLang}
                                    selectedPos={selectedPos}
                                    componentFormik={componentFormik}
                                    setTabData={setTabData}
                                    setIsSegmentModalOpen={setIsSegmentModalOpen}
                                />
                                <div className="my-1">
                                    <Footer handleClickEditIcon={handleClickEditIcon} footerData={footerData} setFooterData={setFooterData} selectedLang={selectedLang} />
                                </div>
                            </div>
                        </div>
                    }
                </Tab.Panels>
            </Tab.Group>
            {
                showEditLogoModal &&

                <EditLogoModal typeLogo={typeLogo} setFooterData={setFooterData} setLabels={setLabels} onClose={() => setShowLogoModal(false)} />
            }
        </div >
    );
};

export default IconTabs;
