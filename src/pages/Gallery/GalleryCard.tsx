import React, { useState } from 'react';
import { Eye, Share2, Trash } from 'lucide-react';
import CardPreviewModal from './CardPreviewModal';
import YoutubeModal from './YoutubeModal'; // 👈
import ShareModal from './ShareModal';
import DeleteModal from './DeleteModal';
import { useAppSelector } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import { deleteFileService, getFilesBtGalleryIdService, getFilesService, getGalleryByIdService } from '../../store/services/galleriesService';
import { BASE_GALLERY_PROD_URL } from '../../store/urls';


const cards = [
    { type: 'application', icon: '📄' },
    { type: 'video', icon: '📹' },
    { type: 'audio', icon: '🎵' },
    { type: 'image', icon: '🖼️' },
];


const GalleryCards = ({ items, filetype, searchTerm }) => {
    const dispatch = useAppDispatch()
    const { files, galleryId } = useAppSelector(state => state.gallery)
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isYoutubeOpen, setIsYoutubeOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    const handleViewClick = (card: any) => {
        setSelectedCard(card);
        setIsPreviewOpen(true);
    };

    const handleIconClick = (card: any) => {
        if (card.type.toLowerCase() === 'video') {
            setSelectedCard(card);
            setIsYoutubeOpen(true);
        }
    };
    const handleDeleteClick = () => {

        const id = selectedCard.id;
        dispatch(deleteFileService({ id })).then((action) => {
            if (deleteFileService.fulfilled.match(action)) {
                setIsDeleteOpen(false)
                dispatch(getFilesService({ galleryid: galleryId, searchTerm, filetype }));

            }
        })
    };


    const getDefaultPreview = (card: any) => {
        const fileType = card?.fileType?.toLowerCase(); // Normalize type
        const fileName = card?.fileName;

        const matchedCard = cards.find(c => c.type === fileType);

        if (fileType === 'image' && fileName) {
            return (
                <img
                    src={ `${BASE_GALLERY_PROD_URL}/${fileName}`}
                    alt={card.alternativeText || 'Image'}
                    onClick={() => handleIconClick(card)}
                    className="h-40 w-full object-cover "
                />
            );
        }

        return (
            <div
                onClick={() => handleIconClick(card)}
                className="flex flex-col items-center justify-center h-40 w-full text-4xl text-gray-500"
            >
                <span role="img" aria-label={fileType}>
                    {matchedCard?.icon || '📁'}
                </span>
                <p className="text-xs text-gray-400 mt-2">{fileType || 'unknown'}</p>
            </div>
        );
    };


    return (
        <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items && items.length > 0 && items?.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col"
                    >
                        {getDefaultPreview(card)}
                        <div className="p-4 flex-grow flex flex-col justify-between">
                            <div>
                                <p className="font-semibold">{card.title}</p>
                                <p className="text-sm text-gray-600">{card.fileName}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-sm text-gray-500">{card.size}</p>
                                <div className="flex gap-2">
                                    <Eye onClick={() => handleViewClick(card)} className="h-4 w-4 text-gray-600 cursor-pointer  hover:text-black" />
                                    <Share2
                                        onClick={() => {
                                            setSelectedCard(card);
                                            setIsShareOpen(true);
                                        }}
                                        className="h-4 w-4 text-gray-600 cursor-pointer hover:text-black"
                                    />
                                    <Trash onClick={() => {
                                        setSelectedCard(card);
                                        setIsDeleteOpen(true);
                                    }} className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            <CardPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} card={selectedCard} searchTerm={searchTerm} filetype={filetype} />
            <YoutubeModal isOpen={isYoutubeOpen} onClose={() => setIsYoutubeOpen(false)} />
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                card={selectedCard}
            />
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onDelete={handleDeleteClick}
                deleteData={{
                    id: selectedCard?.id || null,
                    itemName: selectedCard?.title || '',
                }}
            />
        </>
    );
};

export default GalleryCards;
