import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { useAppSelector } from '../../store';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  deleteData: {
    id: number | null;
    itemName: string;
  };
}

const DeleteModal = ({ isOpen, onClose, onDelete, deleteData }: DeleteModalProps) => {
  const { isLoadingDelete } = useAppSelector(state => state.gallery)
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
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-lg w-[90%] my-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                >
                  <IconX />
                </button>
                <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                  Delete
                </div>
                <div className="p-5 text-center">
                  <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                    <IconTrashLines />
                  </div>
                  <div className="text-base sm:w-3/4 mx-auto mt-5">
                    Are you sure you want to delete {deleteData.itemName}?
                  </div>

                  <div className="flex justify-center items-center mt-8">
                    <button
                      onClick={onClose}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onDelete}
                      type="button"
                      className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      disabled={isLoadingDelete}

                    >
                      {isLoadingDelete ? "Loading..." : "Delete"}

                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
