import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import Select from 'react-select';
import { FormikProps } from 'formik';
import IconX from '../../components/Icon/IconX';
import { useAppSelector } from '../../store';
import { customStyles } from '../../utils/selectStyle';
import { useAppDispatch } from '../../store/hooks';
import { getMetaDataService } from '../../store/services/pagesService';

interface ComponentModalProps {
    isOpen: boolean;
    onClose: () => void;
    formik: FormikProps<any>;
}

const ComponentModal: React.FC<ComponentModalProps> = ({ formik, isOpen, onClose }) => {
    const { isLoadingComponent, metaDataItems } = useAppSelector(state => state.pages);
    const editMode = formik.values.editMode;
    const dispatch = useAppDispatch();


    const typeOptions = metaDataItems.map((item) => {
        return {
            ...item, label: item.type, value: item.id
        }
    });

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
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-md text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {editMode ? 'Edit Component' : 'Add Component'}
                                </div>
                                <div className="p-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="type">Component Type</label>
                                            <Select
                                                id="type"
                                                name="type"
                                                options={typeOptions}
                                                menuPortalTarget={document.body}

                                                value={formik.values.type}
                                                onChange={(selectedOption) =>
                                                    formik.setFieldValue('type', selectedOption)
                                                }
                                                placeholder="Select Component Type"
                                                styles={customStyles}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={onClose}
                                                disabled={isLoadingComponent}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                disabled={isLoadingComponent}
                                            >
                                                {isLoadingComponent ? 'Loading...' : editMode ? 'Update' : 'Add'}
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

export default ComponentModal;
