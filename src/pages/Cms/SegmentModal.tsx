import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import IconX from '../../components/Icon/IconX';
import { FormikProps } from 'formik';
import Select from 'react-select';
import { useAppSelector } from '../../store';

interface SegmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    formik: FormikProps<any>;
}

const SegmentModal: React.FC<SegmentModalProps> = ({ formik, isOpen, onClose }) => {
    const editMode = formik.values.editMode;
    const { isLoadingSegment } = useAppSelector(state => state.pages)


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
                                    {editMode ? 'Edit Segment' : 'Add Segment'}
                                </div>
                                <div className="p-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="form-input"
                                                placeholder="Enter Segment Name"
                                                value={formik.values.name}
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

                                        <div className="flex justify-end items-center mt-8">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={onClose}
                                                disabled={isLoadingSegment}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                disabled={isLoadingSegment}
                                            >
                                                {isLoadingSegment ? 'Loading...' : editMode ? 'Update' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SegmentModal;
