import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getFilesService } from '../../../store/services/galleriesService';

const EditLogoModal = ({ item, selectedImg, setSelectedImg, editImgHandler, onClose }) => {
    const dispatch = useAppDispatch();
    const { galleryId } = useAppSelector(state => state.gallery);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isBrowseOpen, setIsBrowseOpen] = useState(false);

    const openUploadModal = () => setIsUploadModalOpen(true);
    const openBrowseModal = async () => {
        const action = await dispatch(getFilesService({ galleryid: galleryId, filetype: 'image' }));
        if (getFilesService.fulfilled.match(action)) {
            setIsBrowseOpen(true);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-[340px] shadow-xl relative animate-fade-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl transition"
                >
                    ✕
                </button>

                {/* Modal Title */}
                <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">
                    Edit Contact Info
                </h2>

                {/* Action Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Upload Button */}
                    <div
                        onClick={openUploadModal}
                        className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-pink-500 hover:bg-pink-50 transition-all cursor-pointer group"
                    >
                        <Plus className="w-6 h-6 text-gray-500 group-hover:text-pink-500" />
                    </div>

                    {/* Browse Button */}
                    <div
                        onClick={openBrowseModal}
                        className="flex items-center justify-center rounded-xl bg-blue-50 p-4 font-medium text-blue-700 shadow-inner hover:bg-blue-100 transition-all cursor-pointer"
                    >
                        Browse
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLogoModal;
