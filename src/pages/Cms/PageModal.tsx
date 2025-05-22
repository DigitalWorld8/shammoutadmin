import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import IconX from '../../components/Icon/IconX';
import { useFormik } from 'formik';
import Select from 'react-select';

import { FormikProps } from 'formik'; // import FormikProps type
import { useAppSelector } from '../../store';
import { customStyles } from '../../utils/selectStyle';
import { X } from 'lucide-react';
import { BASE_URL } from '../../store/urls';


interface PageModalProps {
    isOpen: boolean;
    onClose: () => void;
    formik: FormikProps<any>;
}

const PageModal: React.FC<PageModalProps> = ({ formik, isOpen, onClose, selectedLang, selectedPos }) => {
    const { isLoadingPage, subPages, selectedPage, pageUrl } = useAppSelector(state => state.pages)
    const editMode = formik.values.editMode;
    const url = `Current Url :${BASE_URL}/ ${selectedPos.value}/${selectedLang.value}${pageUrl
        ? `/${pageUrl}/${formik.values.pageUrlName}`
        : `/${formik.values.pageUrlName}`
        }`


    const options = [
        { value: 'sy', label: 'Syria' },
        // { value: 'uae', label: 'UAE' },
        // { value: 'kwait', label: 'Kuwait' },
    ];

    const languages = [
        { value: 'arabic', label: 'Arabic' },
        { value: 'english', label: 'English' },
    ];

    const subPagesOptions = subPages.map((subPage) => {
        return {
            label: subPage.pageUrlName,
            value: subPage.id
        }
    })

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {editMode ? 'Edit Page' : 'Add Page'}
                                </div>
                                <div className="p-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        {/* <label htmlFor="pos">Pos</label>
                                        <Select
                                            id="pos"
                                            name="pos"
                                            options={options}
                                            value={formik.values.pos}
                                            onChange={(selectedOption) => formik.setFieldValue('pos', selectedOption)}
                                            placeholder="Select Position"
                                            className='py-1'
                                            styles={customStyles}

                                        /> */}
                                        {/* <div className="mb-5">
                                            <label htmlFor="language">Language</label>
                                            <Select
                                                id="language"
                                                name="language"
                                                options={languages}
                                                value={formik.values.language}
                                                onChange={(selectedOption) => formik.setFieldValue('language', selectedOption)}
                                                placeholder="Select Language"
                                                styles={customStyles}

                                            />
                                        </div> */}
                                        {/* {formik.values.pos && formik.values.language &&
                                            <>
                                                <span>Current URL Path</span>
                                                <span>sy/english</span></>
                                        } */}
                                        <div className="mb-5">
                                            <label htmlFor="title">Title</label>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                className="form-input"
                                                placeholder="Enter Title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                            />
                                        </div>







                                        <div className="mb-5">
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="form-textarea resize-none min-h-[130px]"
                                                placeholder="Enter Description"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        {/* <div className="mb-5">
                                            <label htmlFor="pos">Sub Pages</label>
                                            <div className="relative flex items-center gap-2">
                                                <div className="flex-1">
                                                    <Select
                                                        id="subPages"
                                                        name="subPages"
                                                        options={subPagesOptions}
                                                        value={formik.values.subPage}
                                                        onChange={(selectedOption) => formik.setFieldValue("subPage", selectedOption)}
                                                        placeholder="Select Sub Page"
                                                        className="py-1"
                                                        menuPortalTarget={document.body}
                                                        styles={customStyles}
                                                    />
                                                </div>
                                                {formik.values.subPage && (
                                                    <button
                                                        type="button"
                                                        onClick={() => formik.setFieldValue("subPage", null)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Reset Sub Page"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div> */}
                                        <div className="mb-5">
                                            <label htmlFor="pageUrlName" className="block mb-1">
                                                Slug <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="pageUrlName"
                                                name="pageUrlName"
                                                type="text"
                                                className="form-input"
                                                placeholder="Enter Page Slug"
                                                value={formik.values.pageUrlName}
                                                onChange={formik.handleChange}
                                            />
                                        </div>

                                        {url}
                                        { }
                                        <div className="flex justify-end items-center mt-8">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={onClose}
                                                disabled={isLoadingPage}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                disabled={isLoadingPage}
                                            >
                                                {isLoadingPage ? 'Loading...' : editMode ? 'Update' : 'Add'}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div >
            </Dialog >
        </Transition >
    );
};

export default PageModal;
