import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { ArrowUpDown } from 'lucide-react';
import UploadModal from './UploadModal';
import SearchInput from './SearchInput';
import { getFilesService, getGalleryByIdService } from '../../store/services/galleriesService';
import GalleryCards from './GalleryCard';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store';
import { Video, Image as ImageIcon, Music, File } from 'lucide-react';
import withGuard from '../../utils/withGuard';

const Gallery: React.FC = () => {
    const dispatch = useAppDispatch();
    const { galleryInfo, galleryId, isLoading: isGalleryLoading, files, isLoading: isFilesLoading } = useAppSelector(state => state.gallery);
    const items = files?.items;
    const { description, title } = galleryInfo || {};
    console.log('galleryInfo', galleryInfo);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
    const filetype = selectedOption?.value || '';
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);


    const options = [
        {
            value: 'video',
            label: (
                <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span>Video</span>
                </div>
            ),
        },
        {
            value: 'image',
            label: (
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>Image</span>
                </div>
            ),
        },
        {
            value: 'audio',
            label: (
                <div className="flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    <span>Audio</span>
                </div>
            ),
        },
        {
            value: 'application',
            label: (
                <div className="flex items-center gap-2">
                    <File className="w-4 h-4" />
                    <span>Application</span>
                </div>
            ),
        },
    ];


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortClick = () => {
        console.log('Sorting with:', selectedOption?.value);
    };

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFiles(acceptedFiles);
        setIsUploadModalOpen(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

    const handleSaveUpload = () => {
        setIsUploadModalOpen(false);
    };

    const handleFilterChange = (selected: any) => {
        setSelectedOption(selected);
    };

    useEffect(() => {
        dispatch(getGalleryByIdService({ id: galleryId })).then((action) => {
            if (getGalleryByIdService.fulfilled.match(action)) {

                dispatch(getFilesService({ galleryid: galleryId, searchTerm, filetype }));
            }
        });
    }, [searchTerm, selectedOption]);

    const renderContent = () => {
        switch (true) {
            case isFilesLoading:
                return (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="h-40 bg-gray-200 animate-pulse rounded" />
                        ))}
                    </div>
                );
            case items && items.length > 0:
                return <GalleryCards items={items} searchTerm={searchTerm} filetype={filetype} />;
            default:
                return <div className="text-center text-gray-500 mt-10">No files found.</div>;
        }
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{title || ''}</h1>
            <p className="text-gray-600 mb-6">{description || ''}</p>

            {/* Search + Filter + Sort */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="w-full md:w-1/3">
                    <SearchInput value={searchTerm} onChange={handleSearchChange} onSubmit={() => { }} />
                </div>

                <div className="w-full md:w-1/5">
                    <Select
                        options={options}
                        value={selectedOption}
                        onChange={handleFilterChange}
                        placeholder="Filter by..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                        isClearable
                    />
                </div>


                {/* <button
                    onClick={handleSortClick}
                    className="flex items-center gap-2 border px-4 py-2 rounded text-sm text-black hover:bg-gray-100 transition"
                >
                    <ArrowUpDown className="w-4 h-4" />
                    <span className="font-medium">Sort by: <span className="font-bold">Date (Z-A)</span></span>
                </button> */}

                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Upload
                </button>
            </div>

            {/* Gallery Content */}
            {renderContent()}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onSave={handleSaveUpload}
                    searchTerm={searchTerm}
                    filetype={filetype}
                />
            )}
        </div>
    );
};

export default withGuard(Gallery);


