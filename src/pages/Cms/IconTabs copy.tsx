import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
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
import { setSelectedPage } from '../../store/slices/pagesSlice';
import Select from 'react-select';
import { getPageBySubUrlService, getSubPathService } from '../../store/services/pagesService';
const posOptions = [
    { label: 'sy', value: 'sy' }
]
const langOptions = [
    { label: 'English', value: 'english' },
    { label: 'Arabic', value: 'arabic' },
]
export interface Page {
    id: number;
    pageUrlName: string;
    language: string;
    pos: string;
    title: string;
    isDeleted: boolean;
    status: string;
    description: string;
    segments: any[];
}
const IconTabs = ({ toggleCode, tabs, setIsModalOpen, setIsSegmentModalOpen, selectedPos, setSelectedPos, selectedLang, setSelectedLang, selectedPageUrlName, setSelectedPageUrlName }) => {
    const { pages, page, selectedPage } = useAppSelector((state) => state.pages);
    const dispatch = useAppDispatch();
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleTabSelect = (selectedPage: Page) => {

        dispatch(getPageBySubUrlService({
            country: selectedPos.value,
            language: selectedLang.value,
            pageUrlName: selectedPage.pageUrlName,
        }));

    };
    const updatePage = (page) => {
        dispatch(setSelectedPage(page));
    };

    return (
        <div className="panel" id="icon">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Icon Tabs</h5>
                <div className='flex gap-1'>
                    {selectedPage.title}

                    <Select
                        id="pos"
                        name="pos"
                        options={posOptions}
                        value={selectedPos}
                        onChange={setSelectedPos}
                        placeholder="Select Pos"
                        className="py-1"
                    />

                    <Select
                        id="lang"
                        name="lang"
                        options={langOptions}
                        value={selectedLang}
                        onChange={setSelectedLang}
                        placeholder="Select Language"
                        className="py-1"
                    />

                    <button
                        type="button"
                        className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                        onClick={() => toggleCode('code3')}
                    >
                        <span className="flex items-center" onClick={() => setIsModalOpen(true)}>
                            {/* <IconPlus className="me-2" /> */}
                            Add New Page
                        </span>

                    </button>
                </div>

            </div>

            <Tab.Group>
                <Tab.List className="mt-3 mr-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                    {pages?.map((page, index) => (
                        <Tab as={Fragment} key={index}>
                            {({ selected }) => (
                                <button
                                    className={`-mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-danger
                                        dark:hover:border-b-black
                                        ${selected
                                            ? '!border-white-light !border-b-white text-danger !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                                            : ''}`}
                                    onClick={() => handleTabSelect(page)}

                                >
                                    {page.pageUrlName}
                                </button>
                            )}
                        </Tab>
                    ))}

                </Tab.List>



                <Tab.Panels key={selectedPage?.pageUrlName || 'default'}>
                    {selectedPage && (
                        <Tab.Panel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                                <div>
                                    <div className="flex flex-col min-w-[300px] max-w-[500px]">
                                        <div className='flex justify-end gap-1'>
                                            <Tippy content="Save Page Data">
                                                <span className='cursor-pointer'>
                                                    <IconFile size={18} />
                                                </span>
                                            </Tippy>
                                            <Tippy content="Add New Segment">
                                                <span className='cursor-pointer' onClick={() => setIsSegmentModalOpen(true)}>
                                                    <IconPlus size={18} />
                                                </span>
                                            </Tippy>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={selectedPage.title}
                                                className="mb-4 text-2xl font-semibold w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary"
                                            />

                                            <textarea
                                                value={selectedPage.description}
                                                className="mb-4 text-sm text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary resize-none"
                                            />
                                        </div>
                                    </div>

                                    <ReactSortable
                                        list={selectedPage.segments}
                                        setList={(newSegments) => {
                                            updatePage({ ...page, segments: newSegments });
                                        }}
                                        className="pl-4 space-y-4"
                                    >
                                        {selectedPage.segments.map((segment, sIdx) => (
                                            <div key={sIdx} className="border p-4 rounded bg-white dark:bg-[#1e293b] shadow">
                                                <div className="flex flex-col min-w-[300px] max-w-[500px]">
                                                    <div className='flex justify-end gap-1'>
                                                        <Tippy content="Save Segment Data">
                                                            <span className='cursor-pointer'>
                                                                <IconFile size={18} />
                                                            </span>
                                                        </Tippy>
                                                        <Tippy content="Add New Component">
                                                            <span className='cursor-pointer'>
                                                                <IconPlus size={18} />
                                                            </span>
                                                        </Tippy>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={segment.name}
                                                            className="mb-4 text-2xl font-semibold w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary"
                                                        />

                                                        <textarea
                                                            value={segment.description}
                                                            className="mb-4 text-sm text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary resize-none"
                                                        />
                                                    </div>
                                                </div>

                                                <ReactSortable
                                                    list={segment.components}
                                                    setList={(newComponents) => {
                                                        const updatedSegments = [...selectedPage.segments];
                                                        updatedSegments[sIdx] = {
                                                            ...segment,
                                                            components: newComponents
                                                        };
                                                        updatePage({ ...selectedPage, segments: updatedSegments });
                                                    }}
                                                    className="pl-4 mt-2 list-disc list-inside text-sm space-y-1"
                                                    tag="ul"
                                                >
                                                    {segment.components.map((comp, cIdx) => (
                                                        <li
                                                            key={cIdx}
                                                            className="w-fit cursor-pointer text-gray-500 hover:text-danger dark:text-gray-400"
                                                            onClick={() => setSelectedComponent(comp)}
                                                        >
                                                            Component Type: <span className="font-medium">{comp.type}</span>
                                                        </li>
                                                    ))}
                                                </ReactSortable>
                                            </div>
                                        ))}
                                    </ReactSortable>
                                </div>

                                <div className="border p-6 rounded bg-white dark:bg-[#1e293b] shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-xl font-semibold">Component Details</h5>
                                        <div className="flex items-center gap-3">
                                            <Tippy content="Edit Component">
                                                <span className="cursor-pointer text-gray-600 hover:text-primary">
                                                    <IconEdit size={18} />
                                                </span>
                                            </Tippy>
                                            <Tippy content="Delete Component">
                                                <span className="cursor-pointer text-gray-600 hover:text-primary">
                                                    <IconTrash size={18} />
                                                </span>
                                            </Tippy>
                                        </div>
                                    </div>

                                    {selectedComponent ? (
                                        <div>
                                            <p><strong>Type:</strong> {selectedComponent.type}</p>
                                            <p><strong>Content:</strong> {selectedComponent.content || 'No content provided'}</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">Click on a component to view its details.</p>
                                    )}
                                </div>
                            </div>
                        </Tab.Panel>
                    )}
                </Tab.Panels>

            </Tab.Group>
        </div>
    );
};

export default IconTabs;
