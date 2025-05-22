import { useEffect, useState } from 'react';
import IconTabs from './IconTabs';
import PageModal from './PageModal';
import { useFormik } from 'formik';
import SegmentModal from './SegmentModal';
import { useAppDispatch } from '../../store/hooks';
import { createComponentService, createPageService, createSegmentService, deleteComponentService, deletePageService, deleteSegmentService, getMetaDataService, getPageByIdService, getPageBySubUrlService, getPagesService, getStaticComponentsService, getSubPathService } from '../../store/services/pagesService';
import { useAppSelector } from '../../store';
import { setSelectedPage, setSelectedSegmemt } from '../../store/slices/pagesSlice';
import ComponentModal from './ComponentModal';
import DeleteModal from './DeleteModal';
import { baseUrl, StaticComponent } from '../../store/urls';
import withGuard from '../../utils/withGuard';

const Cms = () => {

    const { pages, page, selectedPage, isLoading, selectedSegment } = useAppSelector((state) => state.pages);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const [deleteData, setDeleteData] = useState({
        type: '',
        id: null,
        itemName: ''
    });

    const [selectedPos, setSelectedPos] = useState({ label: 'sy', value: 'sy' })
    const [selectedLang, setSelectedLang] = useState({ label: 'English', value: 'english' })
    const [selectedPageUrlName, setSelectedPageUrlName] = useState('')
    const dispatch = useAppDispatch();
    const toggleCode = (codeType: string) => {
    };
    const [tabData, setTabData] = useState([

    ]);
    interface Component {
        type: string;
        content?: string;
    }

    interface Segment {
        name: string;
        description: string;
        components: Component[];
    }

    interface TabContent {
        title: string;
        description: string;
        segments: Segment[];
    }


    const [pageData, setPageData] = useState({})


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openComponentModal, setOpenComponentModal] = useState(false);


    const formik = useFormik({
        initialValues: {
            pageUrlName: '',
            language: selectedLang, // <-- use selectedLang here
            pos: selectedPos,       // <-- same for pos if needed
            title: '',
            description: '',
            editMode: false,
            subPage: ''
        },
        onSubmit: (values) => {
            if (!values.editMode) {
                const data = {
                    pageUrlName: values.subPage
                        ? `${values.subPage.label.toLowerCase().trim()}/${values.pageUrlName.trim().toLowerCase()}`
                        : values.pageUrlName.trim().toLowerCase(),
                    language: selectedLang.value,
                    pos: values.pos.value,
                    title: values.title.toLowerCase(),
                    description: values.description.toLowerCase(),
                };

                dispatch(createPageService(data)).then((action) => {

                    if (createPageService.fulfilled.match(action)) {
                        formik.handleReset()
                        dispatch(getPagesService({ country: selectedPos.value, language: selectedLang.value })).then((action) => {
                            if (getPagesService.fulfilled.match(action)) {
                                const data = action.payload.items
                                const newPage = data[0]
                                dispatch(setSelectedPage(newPage))
                                setTabData(JSON.parse(JSON.stringify(data)));
                                closeModal()
                            }
                        });
                    }
                })
            }
        }

    })


    const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);

    const segmentFormik = useFormik({
        initialValues: {
            editMode: false,
            pageId: selectedPage?.id,
            name: 'Segment Default Title',
            description: 'Segment Default Description',
            position: ''

        },
        onSubmit: async (values) => {


            try {
                const segmentAction = await dispatch(createSegmentService({
                    name: values.name,
                    description: values.description,
                    pageId: selectedPage.id,
                    position: pageData?.segments?.length + 1,
                }));

                segmentFormik.handleReset();

                if (createSegmentService.fulfilled.match(segmentAction)) {
                    const segmentID = segmentAction.payload.id;

                    const componentAction = await dispatch(createComponentService({
                        segmentID,
                        position: 1,
                        type: selectedComponent.type,
                        content: selectedComponent.content,
                    }));

                    if (createComponentService.fulfilled.match(componentAction)) {
                        const pagesAction = await dispatch(getPagesService({
                            country: selectedPos.value,
                            language: selectedLang.value,
                        }));

                        if (getPagesService.fulfilled.match(pagesAction)) {
                            const data = pagesAction.payload.items;
                            setTabData([...data]);
                            const currentPage = data?.find((item) => item.id === selectedPage.id)
                            dispatch(setSelectedPage(currentPage))
                        }
                    }
                }
            } catch (error) {
            }
        },

    });
    const componentFormik = useFormik({
        initialValues: {
            editMode: false,
            segmentID: selectedSegment?.id,
            type: {},
            position: 1,
        },
        onSubmit: (values) => {
            const { editMode, ...data } = values
            const dataToSend = {
                segmentID: selectedSegment.id,
                position: data.position,
                type: values.type.type,
                content: values.type.content
            }
            dispatch(createComponentService(dataToSend)).then((action) => {
                if (createComponentService.fulfilled.match(action)) {

                    componentFormik.handleReset()
                    setOpenComponentModal(false)
                    dispatch(getPagesService({ country: selectedPos.value, language: selectedLang.value })).then((action) => {
                        if (getPagesService.fulfilled.match(action)) {
                            const data = action.payload.items;
                            const currentPage = data?.find((item) => item.id === selectedPage.id)
                            dispatch(setSelectedPage(currentPage))

                            setTabData(JSON.parse(JSON.stringify(data)));
                        }
                    });
                }
            })
        },
    });

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (selectedPos?.value && selectedLang?.value) {
            dispatch(setSelectedPage(null))
            dispatch(setSelectedSegmemt(null))
            setSelectedComponent(null)

            dispatch(getPagesService({ country: selectedPos.value, language: selectedLang.value })).then((action) => {
                if (getPagesService.fulfilled.match(action)) {
                    const data = action.payload.items
                    setTabData(JSON.parse(JSON.stringify(data)));
                    if (data.length > 0) {

                        dispatch(setSelectedPage(data[0]))
                        dispatch(setSelectedSegmemt(data[0].segments[0]))
                    }
                }
            });
        }
    }, [selectedPos, selectedLang]);



    useEffect(() => {
        if (selectedPos?.value && selectedLang?.value && selectedPageUrlName) {
            dispatch(getPageBySubUrlService({
                country: selectedPos.value,
                language: selectedLang.value,
                pageUrlName: selectedPageUrlName,
            }));
        }
    }, [selectedPageUrlName, selectedPos, selectedLang, dispatch]);



    const handleDelete = () => {
        const id = deleteData.id;
        const type = deleteData.type
        const deleteServices: Record<string, any> = {
            page: deletePageService,
            segment: deleteSegmentService,
            component: deleteComponentService,
        };

        const service = deleteServices[type];

        if (!service) {
            alert('Invalid delete type.');
            return;
        }

        dispatch(service(id)).then((action: any) => {
            if (service.fulfilled.match(action)) {
                const pageId = selectedPage.id
                dispatch(getPagesService({ country: selectedPos.value, language: selectedLang.value })).then((action) => {
                    if (getPagesService.fulfilled.match(action)) {
                        const data = action.payload.items
                        setTabData(JSON.parse(JSON.stringify(data)));
                        dispatch(setSelectedPage(data.find((p) => p.id === pageId)))
                        dispatch(setSelectedSegmemt(data[0].segments[0]))
                        setShowDeleteModal(false)
                        setSelectedComponent(null)
                        const currentPage = data?.find((item) => item.id === selectedPage.id)
                        dispatch(setSelectedPage(currentPage))
                    }
                });
            }
        });
    };
    useEffect(() => {
        dispatch(getMetaDataService())
        dispatch(getStaticComponentsService())
    }, [selectedLang]);

    return (
        <div>
            <IconTabs
                segmentFormik={segmentFormik}
                setSelectedTabIndex={setSelectedTabIndex}
                selectedTabIndex={selectedTabIndex}
                setTabData={setTabData}
                tabData={tabData}
                selectedPos={selectedPos}
                setSelectedPos={setSelectedPos}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                selectedPageUrlName={selectedPageUrlName}
                setSelectedPageUrlName={setSelectedPageUrlName}
                toggleCode={toggleCode} tabs={['Add new page']} setIsModalOpen={setIsModalOpen} setIsSegmentModalOpen={setIsSegmentModalOpen}
                setOpenComponentModal={setOpenComponentModal}
                setDeleteData={setDeleteData}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedComponent={setSelectedComponent}
                selectedComponent={selectedComponent}
                pageData={pageData}
                setPageData={setPageData}
            />
            <PageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                formik={formik}
                selectedPos={selectedPos}
                selectedLang={selectedLang}

            />
            <SegmentModal
                isOpen={isSegmentModalOpen}
                onClose={() => setIsSegmentModalOpen(false)}
                formik={segmentFormik}
            />
            <ComponentModal
                isOpen={openComponentModal}
                onClose={() => setOpenComponentModal(false)}
                formik={componentFormik}
            />
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                deleteData={deleteData}
            />
        </div>
    );
};

export default withGuard(Cms);
