import { Plus } from 'lucide-react';
import UploadModal from '../../Gallery/UploadModal';
import { useState } from 'react';
import BrowseImagesModal from './BrowseImagesModal';
import { getFilesService } from '../../../store/services/galleriesService';
import { useAppDispatch, useAppSelector } from '../../../store';

const EditImageModal = ({ item, key, selectedImg, setSelectedImg, editImgHandler, setContentData, onClose, setPageData, selectedCard, setSelectedImgCard, pageData }: { onClose: () => void }) => {
    const dispatch = useAppDispatch();

    const { galleryInfo, galleryId, isLoading: isGalleryLoading, files, isLoading: isFilesLoading } = useAppSelector(state => state.gallery);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isBrowseOpen, setIsBrowseOpen] = useState(false);
    const handleSaveUpload = () => {
        setIsUploadModalOpen(false);
    };
    const handleOpenGallery = () => {

        dispatch(getFilesService({ galleryid: galleryId, filetype: 'image' })).then((action) => {
            if (getFilesService.fulfilled.match(action)) {
                setIsBrowseOpen(true)
            }
        })

    }
    const handleImageClick = (img: string) => {

        setSelectedImg(img);
    };


    const handleSetImage = (newFileCreate) => {

        editImgHandler(item, newFileCreate)
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-[340px] shadow-2xl relative animate-fade-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                    ✕
                </button>

                {/* Modal Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                    Edit Image
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Plus Icon Column */}
                    <div onClick={() => setIsUploadModalOpen(true)} className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-gray-500 transition-all cursor-pointer">
                        <Plus className="w-6 h-6 text-gray-600" />
                    </div>

                    {/* Label Column */}
                    <div onClick={handleOpenGallery} className="flex items-center justify-center rounded-xl bg-blue-50 p-4 font-medium text-blue-700 shadow-inner hover:bg-blue-100 transition-all cursor-pointer">
                        Browse
                    </div>
                </div>
            </div>
            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onSave={handleSaveUpload}
                    searchTerm={''}
                    filetype={''}
                    isCmsPage
                    setSelectedImg={setSelectedImg}
                    selectedImg={selectedImg}
                    handleSetImage={handleSetImage}
                />
            )}
            {isBrowseOpen &&
                <BrowseImagesModal
                    images={files?.items?.map((f) => f?.fileName)}
                    onClose={() => setIsBrowseOpen(false)}
                    setPageData={setPageData}
                    setSelectedImg={setSelectedImg}
                    selected={selectedImg}
                    handleImageClick={handleImageClick}
                    handleSetImage={handleSetImage}

                />
            }
        </div>
    );
};

export default EditImageModal;
