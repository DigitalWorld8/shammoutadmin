import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import InputField from './InputFieldProps';
import { useAppDispatch } from '../../store/hooks';
import { getPagesService, updateComponentService } from '../../store/services/pagesService';
import { useAppSelector } from '../../store';
import MainCarousel from './components/MainCarousel';
import { Values } from './components/Values';
import { About } from './components/About';
import { Industries } from './components/Industries';
import { Milestones } from './components/milestones';
import { PartnerBanner } from './components/PartnerBanner';
import HeroSection from './components/HeroSection';
import AssistanceSection from './components/AssistanceSection';
import ReachUsSection from './components/ReachUsSection';
import EditImageModal from './components/EditImageModal';
import { setShowModal } from '../../store/slices/pagesSlice';

interface ComponentContent {
    title: string;
    desc: string;
    'btn-text': string;
    'btn-url': string;
}

interface ComponentsProps {
    Components: {
        id: number;
        segmentID: number;
        type: string;
        content: string;
        position: number;
    } | null;
}

const Components: React.FC<ComponentsProps> = ({ selectedImg, setSelectedImg, key, item, setItem, setSeg, seg, segmentProp, comp, setTabData, selectedPos, selectedLang, setShowDeleteModal, setDeleteData, setPageData, pageData }) => {
    const dispatch = useAppDispatch()
    const { showModal } = useAppSelector(state => state.pages)
    const { clickedKey } = useAppSelector(state => state.pages)


    // useEffect(() => {
    //     if (comp?.content) {
    //         try {
    //             const parsed = JSON.parse(comp.content);

    //             setContentData(parsed);
    //         } catch (error) {
    //             setContentData([]);
    //         }
    //     }
    // }, []);

    const formik = useFormik({
        initialValues: {
            content: [
            ],
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            const contentString = JSON.stringify(values.content);
            const payload = {
                ...values,
                content: contentString,
            };
            const data = {
                id: comp.id,
                segmentID: comp.segmentID,
                type: comp.type,
                content: payload.content,
                position: 1
            }
            // dispatch(updateComponentService(data)).then((action: any) => {
            //     if (updateComponentService.fulfilled.match(action)) {
            //         dispatch(getPagesService({ country: selectedPos.value, language: selectedLang.value })).then((action) => {
            //             if (getPagesService.fulfilled.match(action)) {
            //                 const data = action.payload.items;
            //                 setTabData(JSON.parse(JSON.stringify(data)));
            //                 // dispatch(setSelectedComponent(null))
            //             }
            //         });
            //     }
            // });

        }
    });


    if (!comp) {
        return (
            <p className="text-gray-500 dark:text-gray-400">
                Click on a component to view its details.
            </p>
        );
    }

    const editImgHandler = (clickedItem, file) => {
        console.log('clickedKey', clickedKey);
        console.log('file', file);

        if (!clickedItem || !clickedKey) {
            console.warn("Missing clickedItem or key");
            return;
        }


        const updatedSegments = pageData?.segments?.map(segment => {
            if (segment.id !== seg?.id) return segment;

            const firstComponent = segment.components[0];
            if (!firstComponent?.parsedContent) {
                console.warn('No parsedContent found. Skipping update for this segment.');
                return segment;
            }

            let contentArray = [];
            try {
                contentArray = Array.isArray(firstComponent.parsedContent)
                    ? firstComponent.parsedContent
                    : JSON.parse(firstComponent.parsedContent);
            } catch (e) {
                console.error('Failed to parse content JSON:', e);
                return segment;
            }

            const updatedContent = contentArray.map(contentItem =>
                contentItem.id === clickedItem.id
                    ? { ...contentItem, [clickedKey]: selectedImg || file }
                    : contentItem
            );

            const updatedComponent = {
                ...firstComponent,
                parsedContent: updatedContent,
            };

            return {
                ...segment,
                components: [updatedComponent, ...segment.components.slice(1)],
            };
        });

        setPageData(prev => ({
            ...prev,
            segments: updatedSegments,
        }));
    };


    // console.log('pageData', pageData);
    // console.log('comp', comp);


    const textEditHandler = (comp, itemId, key) => (e) => {
        const value = e.target.innerText;

        setPageData((prevData) => {
            if (!Array.isArray(prevData?.segments)) return prevData;

            const updatedSegments = prevData.segments.map((seg) => {
                if (seg.id !== segmentProp.id) return seg;

                const updatedComponents = seg.components.map((component) => {
                    if (component.id !== comp.id) return component;

                    const updatedContent = component.parsedContent.map((item) => {
                        if (item.id !== itemId) return item;

                        // Handle array key like "addresses.0"
                        if (key.startsWith("addresses.")) {
                            const index = Number(key.split(".")[1]);
                            const updatedAddresses = [...item.addresses];
                            updatedAddresses[index] = value;
                            return { ...item, addresses: updatedAddresses };
                        }

                        return { ...item, [key]: value };
                    });

                    return { ...component, parsedContent: updatedContent };
                });

                return { ...seg, components: updatedComponents };
            });

            return { ...prevData, segments: updatedSegments };
        });
    };

    // useEffect(() => {
    //     if (item?.id && selectedImg) {
    //         editImgHandler(item); 
    //     }
    // }, [item]);

    const handleClickEditIcon = (clickedItem) => {
        if (!clickedItem) return;
        console.log('clickedItem From handleClickEditIcon', clickedItem);
        console.log('segmentProp', segmentProp);

        setSeg(segmentProp)
        setItem(clickedItem)
        // editImgHandler(clickedItem);
        dispatch(setShowModal(true));

    };

console.log('seg',seg);


    return (
        <>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {comp.type === 'Main Carousel' &&
                    <MainCarousel handleClickEditIcon={handleClickEditIcon} comp={comp} textEditHandler={textEditHandler} setItem={setItem} contentData={comp?.parsedContent}
                        pageData={pageData}
                        setPageData={setPageData} />
                }
                {comp.type === 'About Section' &&
                    <About handleClickEditIcon={handleClickEditIcon} editImgHandler={editImgHandler} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Hero Section' &&
                    <HeroSection handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Reach Us Section' &&
                    <ReachUsSection setSeg={setSeg} seg={segmentProp} setPageData={setPageData} handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Reach Us Section with cta' &&
                    <ReachUsSection setSeg={setSeg} seg={segmentProp}  setPageData={setPageData} handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Assistance Section' &&
                    <AssistanceSection handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Partner Form' &&
                    <PartnerBanner handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Milestones Section' &&
                    <Milestones setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Industries Section' &&
                    <Industries editImgHandler={editImgHandler} handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {comp.type === 'Values Section' &&
                    <Values handleClickEditIcon={handleClickEditIcon} setItem={setItem} comp={comp} textEditHandler={textEditHandler} contentData={comp?.parsedContent} />
                }
                {/* 
    

                {comp.type === 'Values Section' &&
                    <Values contentData={contentData} setContentData={setContentData} setItem={setItem} />
                } */}


                {/* 
                <button disabled={isLoadingComponent} onClick={formik.handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                    {isLoadingComponent ? "Loading ..." : "Save Changes"}
                </button> */}
                {/* 
            <button
                onClick={() => {
                    setShowDeleteModal(true)

                    setDeleteData({
                        type: 'component',
                        id: comp.id,
                        itemName: comp.type
                    })
                }}
                type="button" className="px-4 py-2 bg-danger text-white rounded m-1">

                Delete
            </button> */}

            </form>
            {showModal && <EditImageModal key={key} item={item} selectedImg={selectedImg} setSelectedImg={setSelectedImg} editImgHandler={editImgHandler} pageData={pageData} onClose={() => dispatch(setShowModal(false))} setPageData={setPageData} />}
        </>
    );
};

export default Components;
