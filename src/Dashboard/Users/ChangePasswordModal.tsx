// components/ChangePasswordModal.tsx
import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../store/hooks';
// import { changeUserPasswordService } from '../../store/services/usersService';
import { useSelector } from 'react-redux';
import { changeUserPasswordService } from '../../store/services/usersService';
import IconX from '../../components/Icon/IconX';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ChangePasswordFormValues {
    email: string;
    oldPassword: null;
    password: string;
    confirmPassword: string;
}

const ChangePasswordModal = ({ isOpen, onClose, selectedUser }: ChangePasswordModalProps) => {

    const { isLoadingChPass } = useSelector((state: any) => state.users);
    const dispatch = useAppDispatch();
    const formik = useFormik<ChangePasswordFormValues>({
        initialValues: {
            email: selectedUser?.email,
            oldPassword: null,
            password: '',
            confirmPassword: '',
        },
        onSubmit: (values) => {
            // Handle password change request here
            const data = values;
            console.log('data', data);

            dispatch(changeUserPasswordService(data)).then((action) => {
                if (changeUserPasswordService.fulfilled.match(action)) {
                    onClose();
                }
            });
        },
    });
    useEffect(() => {
        if (selectedUser?.email) {
            formik.setFieldValue('email', selectedUser.email);
        }
    }, [selectedUser]);

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
                                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Change Password</div>
                                <div className="p-5">
                                    <form onSubmit={formik.handleSubmit}>
                                        {/* <div className="mb-5">
                                            <label htmlFor="email">Email</label>
                                            <input id="email" name="email" type="email" placeholder="Enter Email" className="form-input" onChange={formik.handleChange} value={formik.values.email} />
                                        </div> */}
                                        {/* <div className="mb-5">
                                            <label htmlFor="oldPassword">Old Password</label>
                                            <input
                                                id="oldPassword"
                                                name="oldPassword"
                                                type="password"
                                                placeholder="Enter Old Password"
                                                className="form-input"
                                                onChange={formik.handleChange}
                                                value={formik.values.oldPassword}
                                            />
                                        </div> */}
                                        <div className="mb-5">
                                            <label htmlFor="password">New Password</label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter New Password"
                                                className="form-input"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="confirmPassword">Confirm New Password</label>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm New Password"
                                                className="form-input"
                                                onChange={formik.handleChange}
                                                value={formik.values.confirmPassword}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isLoadingChPass}>
                                                {!isLoadingChPass ? 'Change Password' : 'loading...'}
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

export default ChangePasswordModal;
