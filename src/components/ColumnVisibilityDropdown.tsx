import React from 'react';
import IconCaretDown from './Icon/IconCaretDown';
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';

type Column = {
    accessor: string;
    title: string;
};

interface ColumnVisibilityDropdownProps {
    columns: Column[];
    isHidden: (accessor: string) => boolean;
    toggleColumn: (accessor: string) => void;
}

const ColumnVisibilityDropdown: React.FC<ColumnVisibilityDropdownProps> = ({
    columns,
    isHidden,
    toggleColumn,
}) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div className="dropdown">
            <Dropdown
                placement={isRtl ? 'bottom-end' : 'bottom-start'}
                btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                button={
                    <>
                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                        <IconCaretDown className="w-5 h-5" />
                    </>
                }
            >
                <ul className="!min-w-[180px]">
                    {columns.map((col) => (
                        <li
                            key={col.accessor}
                            className="flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center px-4 py-1">
                                <label className="cursor-pointer mb-0">
                                    <input
                                        type="checkbox"
                                        checked={!isHidden(col.accessor)}
                                        className="form-checkbox"
                                        onChange={() => toggleColumn(col.accessor)}
                                    />
                                    <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </Dropdown>
        </div>
    );
};

export default ColumnVisibilityDropdown;
