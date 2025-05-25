// components/SelectedUserBox.tsx

import IconLock from '../../components/Icon/IconLock';
import IconTrash from '../../components/Icon/IconTrash';
import IconUser from '../../components/Icon/IconUser';
import IconX from '../../components/Icon/IconX';

interface SelectedUserBoxProps {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email?: string;
        department?: string;
        // Add other fields as needed
    };
    onClear: () => void;
    onDelete: () => void;
    onPromote: () => void;
    onChangePassword: () => void;
    onEditInfo: () => void;
}
export default function SelectedUserBox({ user, onClear, onDelete, onPromote, onChangePassword, onEditInfo }: SelectedUserBoxProps) {
    return (
        <div className="flex items-center justify-between p-3 mb-4 rounded border bg-gray-50 shadow-sm relative">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-black">Selected:</span>
                <span className="px-2 py-1 bg-white border rounded">
                    {user.firstName} {user.lastName}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1 border rounded text-orange-500 hover:bg-orange-50" onClick={onPromote}>
                    <IconUser size={16} /> Promote to Admin
                </button>
                <button className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 hover:bg-red-50" onClick={onDelete}>
                    <IconTrash size={16} /> Delete User
                </button>
                {/* New "Change Password" button */}
                <button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-500 hover:bg-blue-50" onClick={onChangePassword}>
                    <IconLock size={16} /> Change Password
                </button>
                <button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-500 hover:bg-blue-50" onClick={onEditInfo}>
                    <IconLock size={16} /> Edit Info
                </button>
            </div>
        </div>
    );
}
