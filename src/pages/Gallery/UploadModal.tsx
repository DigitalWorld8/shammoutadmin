import React, { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import { createFileService, getFilesBtGalleryIdService, getFilesService } from '../../store/services/galleriesService';
import { useAppDispatch, useAppSelector } from '../../store';
import { BASE_GALLERY_PROD_URL } from '../../store/urls';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface UploadModalProps {
    onClose: () => void;
    onSave: (file: File, metadata: Metadata) => void;
}

interface Metadata {
    title: string;
    alternativeText: string;
    description: string;
    caption: string;
    galleryId: number;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onSave, filetype, searchTerm, isCmsPage, setSelectedImg, handleSetImage, selectedImg }) => {
    const { isLoadingCreate, galleryId } = useAppSelector(state => state.gallery);
    const [files, setFiles] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    const [shouldTriggerSetImage, setShouldTriggerSetImage] = useState(false);

    useEffect(() => {
        if (shouldTriggerSetImage && selectedImg) {
            handleSetImage();
            setShouldTriggerSetImage(false);
        }
    }, [selectedImg, shouldTriggerSetImage]);


    const uploadedFile = files[0]?.file || null;

    const formik = useFormik<Metadata>({
        initialValues: {
            title: '',
            alternativeText: '',
            description: '',
            caption: '',
            galleryId,
        },
        onSubmit: (values) => {
            if (!uploadedFile) return;

            const { title, alternativeText, description, caption } = values;

            const formData = new FormData();
            formData.append('galleryId', galleryId.toString());
            formData.append('Title', title.toLowerCase().trim());
            formData.append('alternativeText', alternativeText.toLowerCase().trim());
            formData.append('description', description.toLowerCase().trim());
            formData.append('caption', caption.toLowerCase().trim());
            formData.append('File', uploadedFile);

            dispatch(createFileService({ data: formData })).then((action) => {
                console.log('action', action.payload);
                let newFileCreate = `${BASE_GALLERY_PROD_URL}/${action.payload.fileName}`
                if (isCmsPage) {
                    setSelectedImg(newFileCreate)
                    handleSetImage(newFileCreate)
                }
                if (createFileService.fulfilled.match(action)) {
                    dispatch(getFilesService({ galleryid: galleryId, searchTerm, filetype }));
                    onSave(uploadedFile, values);

                }
            });
        }
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md relative shadow-xl max-h-[90vh] flex flex-col">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600">
                    <X size={20} />
                </button>

                <div className="px-6 pt-6 pb-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-semibold text-center">Upload File</h2>
                </div>

                <div className="overflow-y-auto px-6 py-4 flex-1">
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        allowFileTypeValidation={false}
                        allowRevert={false}
                        allowRemove={true}
                        name="file"
                        labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                    />

                    {uploadedFile && (
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    placeholder="Enter title"
                                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="alternativeText" className="block text-sm font-medium text-gray-700 mb-1">
                                    Alternative Text
                                </label>
                                <input
                                    type="text"
                                    id="alternativeText"
                                    name="alternativeText"
                                    value={formik.values.alternativeText}
                                    onChange={formik.handleChange}
                                    placeholder="Describe the image"
                                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    rows={3}
                                    placeholder="Add a short description"
                                    className="w-full border border-gray-300 px-3 py-2 rounded resize-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
                                    Caption
                                </label>
                                <input
                                    type="text"
                                    id="caption"
                                    name="caption"
                                    value={formik.values.caption}
                                    onChange={formik.handleChange}
                                    placeholder="Optional caption"
                                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white z-10 flex gap-4">
                    <button
                        onClick={() => formik.handleSubmit()}
                        disabled={!uploadedFile || isLoadingCreate}
                        className={`w-full px-4 py-2 rounded ${uploadedFile ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        {isLoadingCreate ? 'Loading...' : 'Save'}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
