import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BASE_GALLERY_PROD_URL } from '../../../store/urls';

interface BrowseImagesModalProps {
    images: string[];
    onClose: () => void;
    onSelect: (image: string) => void;
    selected: string;
    setSelected: (image: string) => void;
    handleImageClick: (image: string) => void;
    handleSetImage: () => void;
}

const BrowseImagesModal: React.FC<BrowseImagesModalProps> = ({
    selected,
    setSelected,
    images,
    onClose,
    handleImageClick,
    handleSetImage
}) => {
    useEffect(() => {
        return () => {
            if (setSelected) {

                setSelected('');
            }
        };
    }, []);

    return (
        <div className="fixed  inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl w-[600px] max-h-[80vh] shadow-lg relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2 text-center">
                    Select an Image From Shammout Gallery
                </h2>

                {/* Scrollable content */}
                <div className=" overflow-y-auto px-6 pb-4 flex-1 bg-gray-300">
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((img) => (
                            <div
                                key={img}
                                className={`relative cursor-pointer rounded-xl border-2 transition-all ${selected === img
                                    ? 'border-green-500'
                                    : 'border-transparent hover:border-gray-300'
                                    }`}
                                onClick={() => handleImageClick(`${BASE_GALLERY_PROD_URL}/${img}`)}
                            >
                                <img
                                    src={`${BASE_GALLERY_PROD_URL}/${img}`}
                                    alt="Selectable"
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                {selected === `${BASE_GALLERY_PROD_URL}/${img}` && (
                                    <CheckCircle className="absolute top-2 right-2 text-green-500 w-6 h-6 bg-white rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fixed button */}
                <div className="p-4 border-t bg-white sticky bottom-0 z-10">
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleSetImage}
                            disabled={!selected}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
                        >
                            Set Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseImagesModal;
