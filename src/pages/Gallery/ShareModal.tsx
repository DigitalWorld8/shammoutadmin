import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Check, Copy } from 'lucide-react';

const ShareModal = ({
    isOpen,
    onClose,
    card,
}: {
    isOpen: boolean;
    onClose: () => void;
    card: any;
}) => {
    const [copied, setCopied] = useState(false);
    const shareLink = card?.fileUrlPath;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-semibold mb-4">Share File</Dialog.Title>

                                <div className="flex items-center border rounded-md overflow-hidden">
                                    <span className="bg-gray-100 px-3 flex items-center">
                                        <svg
                                            className="w-4 h-4 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M10 14l2-2-2-2m5 2H4m16 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={shareLink}
                                        readOnly
                                        className="flex-1 px-3 py-2 text-sm border-none outline-none"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="bg-blue-500 p-2 text-white hover:bg-blue-600"
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        onClick={onClose}
                                        className="text-sm text-gray-600 hover:text-black"
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ShareModal;
