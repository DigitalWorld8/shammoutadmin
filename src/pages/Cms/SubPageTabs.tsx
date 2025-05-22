import { Tab } from '@headlessui/react';
import React, { useState } from 'react';

interface SubPage {
    pageUrlName: string;
    [key: string]: any;
}

interface SubPageTabsProps {
    subPages: SubPage[];
}

const SubPageTabs: React.FC<SubPageTabsProps> = ({ subPages, handleTabSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (!subPages?.length) return null;

    return (
        <div>
            {/* Tab buttons shown independently to avoid auto-focus */}
            <div className="flex space-x-4 mb-4">
                {subPages.map((subPage, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setSelectedIndex(idx)
                            const path = subPage.pageUrlName
                            handleTabSelect(subPage,path,1)
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-t ${selectedIndex === idx ? 'bg-white text-danger border-b-2 border-danger' : 'text-gray-500'
                            }`}
                    >
                        {subPage.pageUrlName}
                    </button>
                ))}
            </div>

            {/* Manually render selected content */}
            {selectedIndex !== null && (
                <div className="p-4 border rounded-b">
                    <h4 className="text-lg font-semibold">{subPages[selectedIndex].pageUrlName}</h4>
                    <p className="text-sm text-gray-600">Sub-page content here...</p>
                </div>
            )}
        </div>
    );
};

export default SubPageTabs;
