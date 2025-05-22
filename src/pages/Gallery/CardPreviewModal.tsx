import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Download, Save, Edit } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getFilesService, updateFileService } from '../../store/services/galleriesService';
import { BASE_GALLERY_PROD_URL } from '../../store/urls';

type CardType = {
    title: string;
    fileName: string;
    type: string;
    size: string;
    caption?: string;
    description?: string;
    alternativeText?: string;
    createdDate?: string;
    createdBy?: string;
    image?: string;
    icon?: string;
    fileUrlPath?: string;
    fileType?: string;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    card: CardType | null;
}

const CardPreviewModal: React.FC<Props> = ({ isOpen, onClose, card, filetype, searchTerm,fileName }) => {
    const { isLoadingCreate } = useAppSelector(state => state.gallery)
    const dispatch = useAppDispatch();
    const [editableCard, setEditableCard] = useState<CardType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { galleryId } = useAppSelector(state => state.gallery)
    useEffect(() => {
        if (card) {
            setEditableCard({ ...card });
            setIsEditMode(false);
        }
    }, [card]);

    const handleTextChange = (field: keyof CardType, value: string) => {
        if (!editableCard) return;
        setEditableCard({ ...editableCard, [field]: value });
    };

    const handleSave = () => {
        // if (!editableCard) return;
        const data = {
            id: editableCard?.id,
            title: editableCard?.title,
            alternativeText: editableCard?.alternativeText,
            description: editableCard?.description,
            caption: editableCard?.caption,
            galleryId,
        }

        dispatch(updateFileService({ data })).then((action) => {
            if (updateFileService.fulfilled.match(action)) {
                setIsEditMode(false);
                dispatch(getFilesService({ galleryid: galleryId, searchTerm, filetype }));

            }
        })
    };

    const renderPreview = () => {
        const type = editableCard?.fileType?.toLowerCase();

        if (type === 'image' && editableCard?.image) {
            return <img src={editableCard.image} alt={editableCard.alternativeText || editableCard.title} className="max-h-64 object-contain rounded" />;
        }

        if (type === 'video' && editableCard?.fileUrlPath) {
            return (
                <video controls className="max-h-64 w-full rounded">
                    <source src={editableCard.fileUrlPath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        }

        if (type === 'audio' && editableCard?.fileUrlPath) {
            return (
                <audio controls className="w-full">
                    <source src={editableCard.fileUrlPath} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            );
        }

        return <div className="text-6xl text-gray-500">{editableCard?.icon || '📄'}</div>;
    };
const handleDownload = async (filename: string = 'file') => {
    try {
        const fileUrl = `${BASE_GALLERY_PROD_URL}/${filename}`;
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename; // Only the file name, not the full URL
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Download failed:', error);
    }
};


    if (!editableCard) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto shadow-xl p-6 z-50">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                        <X className="w-5 h-5" />
                    </button>

                    <Dialog.Title className="text-lg font-semibold mb-6">File Details</Dialog.Title>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Preview */}
                        <div className="flex items-center justify-center bg-gray-100 p-6 rounded-lg">
                            {renderPreview()}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-between">
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => setIsEditMode((prev) => !prev)}
                                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                                >
                                    {isEditMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    {isEditMode ? 'Save Mode' : 'Edit Mode'}
                                </button>
                            </div>

                            <div className="space-y-2 text-sm text-gray-700">
                                {[
                                    ['Title', 'title'],
                                    ['Caption', 'caption'],
                                    ['Description', 'description'],
                                    ['Alternative Text', 'alternativeText'],
                                ].map(([label, key]) => (
                                    <p key={key}>
                                        <strong>{label}:</strong>{' '}
                                        {isEditMode ? (
                                            <span
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => handleTextChange(key as keyof CardType, e.currentTarget.textContent || '')}
                                                className="outline-none border-b border-dashed border-transparent focus:border-gray-400"
                                            >
                                                {editableCard[key as keyof CardType] ?? ''}
                                            </span>
                                        ) : (
                                            <span>{editableCard[key as keyof CardType] ?? ''}</span>
                                        )}
                                    </p>
                                ))}

                                <p><strong>Filename:</strong> {editableCard.fileName}</p>
                                <p><strong>Type:</strong> {editableCard.type}</p>
                                <p><strong>Size:</strong> {editableCard.size}</p>
                                <p><strong>Created Date:</strong> {editableCard.createdDate ? new Date(editableCard.createdDate).toLocaleString() : 'N/A'}</p>
                                <p><strong>Created By:</strong> {editableCard.createdBy}</p>
                            </div>

                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    onClick={handleSave}
                                    disabled={!isEditMode || isLoadingCreate}
                                    className={`flex items-center gap-2 px-4 py-2 rounded transition ${isEditMode
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoadingCreate ? 'Loading...' :
                                        <>
                                            <Save className="w-4 h-4" /> Save
                                        </>
                                    }
                                </button>

                                {editableCard.fileName && (
                                    <button
                                        onClick={() => handleDownload(editableCard.fileName)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        <Download className="w-4 h-4" /> Download
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default CardPreviewModal;
