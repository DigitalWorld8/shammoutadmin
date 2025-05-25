// components/UserModal.tsx
import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../store/hooks';
import { addNewUserService, getUsersService, updateUserService } from '../../store/services/usersService';
import { useSelector } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import { customStyles, selectOption } from '../../utils/selectStyle';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    page: number;
    nameSearch: string;
    emailSearch: string;
    pageSizeLocal: number;
    statusFilters: string[];
}

interface UserFormValues {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    selectedUser: object;
    editMode: boolean;
}
const UserModal = ({ isOpen, onClose, page, nameSearch, emailSearch, statusFilters, pageSizeLocal, selectedUser, editMode, depOptions }: UserModalProps) => {
    const { isLoadingAdd, isLoadingEdit } = useSelector((state: any) => state.users);
    const dispatch = useAppDispatch();
    console.log('selectedUser', selectedUser);

    useEffect(() => {
        if (editMode && selectedUser) {
            formik.setValues({
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                email: selectedUser.email,
                department: selectedUser.department
                    ? {
                          label: selectedUser.department,
                          value: selectedUser.department,
                      }
                    : null, // Or undefined if your Select expects it
            });
        } else {
            formik.setValues(formik.initialValues);
        }
    }, [editMode, selectedUser]);
    

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            department: null,
        },
        onSubmit: (values) => {
            if (editMode && selectedUser) {
                const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    department: values.department?.value,
                };
                dispatch(updateUserService({ data, code: selectedUser.code })).then((action) => {
                    if (updateUserService.fulfilled.match(action)) {
                        const filters = statusFilters.map((f) => `filters=${f.value}==true`);
                        getUsersService({
                            page,
                            pageSize: pageSizeLocal,
                            username: nameSearch,
                            email: emailSearch,
                            filters,
                        });
                        onClose();
                    }
                });
            } else {
                const data = {
                    ...values,
                    department: values.department.value,
                };
                dispatch(addNewUserService(data)).then((action) => {
                    if (addNewUserService.fulfilled.match(action)) {
                        const filters = statusFilters.map((f) => `filters=${f.value}==true`);
                        getUsersService({
                            page,
                            pageSize: pageSizeLocal,
                            username: nameSearch,
                            email: emailSearch,
                            filters,
                        });
                        onClose();
                    }
                });
            }
        },
    });

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                    <IconX />
                                </button>
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{editMode ? 'Edit User' : 'Add User'}</div>
                                <div className="p-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-5">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="Enter First Name"
                                                className="form-input"
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Enter Last Name"
                                                className="form-input"
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="email">Email</label>
                                            <input id="email" name="email" type="email" placeholder="Enter Email" className="form-input" onChange={formik.handleChange} value={formik.values.email} />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="department">Department</label>
                                            <Select<selectOption, true>
                                                value={formik.values.department}
                                                onChange={(selectedOption) => {
                                                    formik.setFieldValue('department', selectedOption);
                                                }}
                                                placeholder="Choose departments"
                                                options={depOptions}
                                                styles={customStyles}
                                                menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                                menuPosition="fixed"
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isLoadingAdd || isLoadingEdit}>
                                                {isLoadingAdd || isLoadingEdit ? 'Loading...' : 'Save Changes'}
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

export default UserModal;
