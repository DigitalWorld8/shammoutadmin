// components/YoutubeModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type YoutubeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    videoUrl?: string;
};

const YoutubeModal = ({ isOpen, onClose, videoUrl }: YoutubeModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 z-40" />
                </Transition.Child>
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded bg-white shadow-xl transition-all">
                                <div className="text-right p-2">
                                    <button onClick={onClose} className="text-gray-500 hover:text-black">✖</button>
                                </div>
                                <iframe
                                    title="YouTube Video"
                                    src={videoUrl || "https://www.youtube.com/embed/tgbNymZ7vqY"}
                                    className="w-full h-[250px] md:h-[550px]"
                                    allowFullScreen
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default YoutubeModal;
