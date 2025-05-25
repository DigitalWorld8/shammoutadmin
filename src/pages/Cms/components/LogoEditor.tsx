import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';
import BrowseImagesModal from './BrowseImagesModal';
import UploadModal from '../../Gallery/UploadModal';
import { Plus } from 'lucide-react';

function LogoEditor({ isModalOpen, openModal, closeModal, saveLogo }) {
    const [isBrowseOpen, setIsBrowseOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const { galleryInfo, galleryId, isLoading: isGalleryLoading, files, isLoading: isFilesLoading } = useAppSelector(state => state.gallery);

    const { metaDataItems } = useAppSelector(state => state.pages);

    const logoItem = metaDataItems.find((item) => item.type === 'Logo');
    const initialLogo = logoItem ? JSON.parse(logoItem.content)[0]?.logo : '';

    const [tempLogo, setTempLogo] = useState(initialLogo);

    useEffect(() => {
        if (isModalOpen && logoItem) {
            const logo = JSON.parse(logoItem.content)[0]?.logo;
            setTempLogo(logo);
        }
    }, [isModalOpen, logoItem]);

    const handleSaveUpload = () => {
        setIsUploadModalOpen(false);
    };
    // if (!logo) return null;

    return (
        <>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg p-6 relative max-w-sm w-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative inline-block">
                            <img
                                src={tempLogo}
                                alt="Logo"
                                className="w-48 h-48 object-contain rounded-md  text-center"
                            />
                            <button
                                onClick={() => {
                                    setIsUploadModalOpen(true)
                                }}
                                className="absolute top-1 left-1 bg-white bg-opacity-90 p-1 rounded-full shadow hover:bg-pink-600 hover:text-white transition"
                                title="Edit Logo URL"
                            >
                                ✏️
                            </button>
                        </div>

                        {/* Action Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Upload Button */}
                            <div
                                // onClick={openUploadModal}
                                className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-pink-500 hover:bg-pink-50 transition-all cursor-pointer group"
                            >
                                <Plus className="w-6 h-6 text-gray-500 group-hover:text-pink-500" />
                            </div>

                            {/* Browse Button */}
                            <div
                                // onClick={openBrowseModal}
                                className="flex items-center justify-center rounded-xl bg-blue-50 p-4 font-medium text-blue-700 shadow-inner hover:bg-blue-100 transition-all cursor-pointer"
                            >
                                Browse
                            </div>
                        </div>
                        {/* 
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={() => saveLogo(tempLogo)}
                                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg px-4 py-2 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg px-4 py-2 transition"
                            >
                                Cancel
                            </button>
                        </div> */}
                    </div>
                </div>
            )}
            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onSave={handleSaveUpload}
                    searchTerm={''}
                    filetype={''}
                    isCmsPage
                    setSelectedImg={() => { }}
                    selectedImg={[]}
                    handleSetImage={() => { }}
                />
            )}
            {isBrowseOpen &&
                <BrowseImagesModal
                    images={files?.items?.map((f) => f?.fileName)}
                    onClose={() => setIsBrowseOpen(false)}
                    setPageData={() => { }}
                    setSelectedImg={() => { }}
                    selected={[]}
                    handleImageClick={() => { }}
                    handleSetImage={() => { }}

                />
            }
        </>
    );
}

export default LogoEditor;

