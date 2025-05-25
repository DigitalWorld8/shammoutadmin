import { useEffect, useState } from "react";
import { Settings } from "lucide-react";

export default function CardButtonEditor({ card, onUpdate, setSeg, seg }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Unified state object
    const [btnInfo, setBtnInfo] = useState({
        label: card?.btnLabel || "",
        link: card?.btnLink || "",
        linkType: card?.btnLinkType || "external", // 'external' or 'internal'
        style: card?.btnStyle || "outlined", // 'outlined' or 'contained'
    });
    useEffect(() => {
        setBtnInfo(card?.btnInfo)
    }, [])
    const handleSave = () => {
        onUpdate(btnInfo);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative inline-flex items-center gap-2">
            {/* Main Button */}
            <button
                type="button"
                className="flex-1 px-6 py-2 border-2 border-rose-600 text-rose-600 rounded-lg font-semibold hover:bg-rose-600 hover:text-white transition-colors"
                onClick={() => {
                    if (btnInfo.link) {
                        if (btnInfo.linkType === "external") {
                            window.open(btnInfo.link, "_blank");
                        } else {
                            window.location.href = btnInfo.link; // internal
                        }
                    }
                }}
            >
                {btnInfo.label}
            </button>

            {/* Settings Icon */}
            <button
                type="button"
                onClick={() => {
                    setSeg(seg)
                    setIsDropdownOpen((prev) => !prev)
                }}
                className="text-gray-500 hover:text-gray-800"
            >
                <Settings />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg p-4 shadow-md z-10 w-72">
                    {/* Label Input */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Button Label</label>
                        <input
                            type="text"
                            value={btnInfo.label}
                            onChange={(e) => setBtnInfo({ ...btnInfo, label: e.target.value })}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>

                    {/* Link Type */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Link Type</label>
                        <div className="flex gap-2">
                            <label className="text-sm">
                                <input
                                    type="radio"
                                    name="linkType"
                                    value="external"
                                    checked={btnInfo.linkType === "external"}
                                    onChange={(e) => setBtnInfo({ ...btnInfo, linkType: e.target.value })}
                                    className="mr-1"
                                />
                                External
                            </label>
                            <label className="text-sm">
                                <input
                                    type="radio"
                                    name="linkType"
                                    value="internal"
                                    checked={btnInfo.linkType === "internal"}
                                    onChange={(e) => setBtnInfo({ ...btnInfo, linkType: e.target.value })}
                                    className="mr-1"
                                />
                                Internal
                            </label>
                        </div>
                    </div>

                    {/* Link Input */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                            {btnInfo.linkType === "external" ? "External URL" : "Internal Path"}
                        </label>
                        <input
                            type="text"
                            value={btnInfo.link}
                            onChange={(e) => setBtnInfo({ ...btnInfo, link: e.target.value })}
                            placeholder={btnInfo.linkType === "external" ? "https://..." : "/about"}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>

                    {/* Style Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Button Style</label>
                        <div className="flex gap-2">
                            <label className="text-sm">
                                <input
                                    type="radio"
                                    name="style"
                                    value="outlined"
                                    checked={btnInfo.style === "outlined"}
                                    onChange={(e) => setBtnInfo({ ...btnInfo, style: e.target.value })}
                                    className="mr-1"
                                />
                                Outlined
                            </label>
                            <label className="text-sm">
                                <input
                                    type="radio"
                                    name="style"
                                    value="contained"
                                    checked={btnInfo.style === "contained"}
                                    onChange={(e) => setBtnInfo({ ...btnInfo, style: e.target.value })}
                                    className="mr-1"
                                />
                                Contained
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="px-4 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 text-sm"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}
