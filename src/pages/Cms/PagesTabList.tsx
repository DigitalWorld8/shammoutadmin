'use client';

import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageUrl } from '../../store/slices/pagesSlice';
import { useAppSelector } from '../../store';
import LogoEditor from './components/LogoEditor';

interface Page {
    title: string;
    pageUrlName: string;
}

interface PagesTabListProps {
    tabData: Page[];
    handleTabSelect: (page: Page, pageUrlName: string, index: number) => void;
    setIsModalOpen: (value: boolean) => void;
}

const PagesTabList = ({ tabData, handleTabSelect, setIsModalOpen, saveChanges }: PagesTabListProps) => {
    const dispatch = useDispatch();
    const { isLoadingUpdateConstComp } = useAppSelector(state => state.pages)


    const [logo, setLogo] = useState('https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/ef55696ff67ea3de1f900af9552cd47587ba243e');
    const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

    const openModal = () => setIsLogoModalOpen(true);
    const closeModal = () => setIsLogoModalOpen(false);

    const saveLogo = (newLogo) => {
        setLogo(newLogo);
        closeModal();
    };




    return (
        <div className="flex justify-between items-center border-b border-white-light dark:border-[#191e3a]">
            {/* Left side: Tabs */}
            <Tab.List className="flex flex-wrap">
                {tabData.map((page, index) => (
                    <Tab as={Fragment} key={index}>
                        {({ selected }) => (
                            <div className="flex flex-col items-center">
                                <button
                                    className={`
                        relative
                        ${selected ? 'bg-[#1E395E] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}
                        block rounded-lg px-4 py-2 transition-all duration-200
                        focus:outline-none focus:ring-0 focus:ring-primary focus:border-transparent
                        ltr:mr-2 rtl:ml-2
                      `}

                                    onClick={() => handleTabSelect(page, page.pageUrlName, index)}
                                >
                                    {page.title}
                                </button>

                                {selected && (
                                    <div className="mt-2 flex items-center justify-center">
                                        <span
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                dispatch(setPageUrl(page.title));
                                            }}
                                            className="cursor-pointer flex items-center justify-center w-6 h-6 border-2 border-[#1E395E] rounded-full text-[#1E395E] text-xl transition-transform transform hover:scale-110"
                                        >
                                            +
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </Tab>
                ))}


            </Tab.List>

            {/* Right side: Save Changes button */}
            <div className="flex items-center gap-4 mt-4">

                <button
                    onClick={() => {
                        setIsLogoModalOpen(true);

                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-200"
                >
                    Edit Logo
                </button>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        dispatch(setPageUrl(''));
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-200"
                >
                    + Add New Page
                </button>
                <button
                    disabled={isLoadingUpdateConstComp}
                    onClick={saveChanges}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoadingUpdateConstComp ? 'Loading...' : 'Save Changes'}
                </button>

            </div>
            
            <LogoEditor
                logo={logo}
                isModalOpen={isLogoModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                saveLogo={saveLogo}
            />

        </div>
    );
};

export default PagesTabList;
