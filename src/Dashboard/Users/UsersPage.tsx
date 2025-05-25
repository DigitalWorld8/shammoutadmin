import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserService, getDepartmentsService, getRolesService, getUsersService } from '../../store/services/usersService';
import { Dialog, Transition } from '@headlessui/react';
import UserModal from './UserModal';
import Select, { MultiValue } from 'react-select';
import DeleteModal from './DeleteUser';
import Tippy from '@tippyjs/react';
import IconUser from '../../components/Icon/IconUser';
import IconTrash from '../../components/Icon/IconTrash';
import SelectedUserBox from './SelectedUserBox';
import PromoteModal from './PromoteModal';
import ChangePasswordModal from './ChangePasswordModal';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import { useAppDispatch } from '../../store';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconRefresh from '../../components/Icon/IconRefresh';
import { customStyles ,selectOption} from '../../utils/selectStyle';
import { usersCols } from '../../tableColumns';
import { useToggleColumns } from '../../hooks/useToggleColumns';
import ColumnVisibilityDropdown from '../../components/ColumnVisibilityDropdown';

const stausOptions = [
    { value: 'isactive', label: 'Active' },
    { value: 'isfrozed', label: 'Frozen' },
    { value: 'isdeleted', label: 'Deleted' },
    { value: 'islocked', label: 'Locked' },
];
const UsersPage = () => {
    const dispatch = useAppDispatch();
    const { hiddenCols, toggleColumn, isHidden } = useToggleColumns();

    const { users, totalCount, pageSize, isLoading, isLoadingDelete, departments, roles } = useSelector((state: any) => state.users); // Get users and total count from Redux
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [editMode, setEditMode] = useState<any>(false);
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [statusFilters, setStatusFilters] = useState<selectOption[]>([]);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openPromoteModal, setOpenPromoteModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const [nameSearch, setNameSearch] = useState('');
    const [emailSearch, setEmailSearch] = useState('');

    const [page, setPage] = useState(1); // Local state for current page
    const [pageSizeLocal, setPageSize] = useState(10); // Local state for page size
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        const filters: string[] = [];

        // Add username filter if nameSearch exists
        if (nameSearch) {
            filters.push(`username@=${nameSearch}`);
        }

        // Add email filter if emailSearch exists
        if (emailSearch) {
            filters.push(`email@=${emailSearch}`);
        }

        // Add status filters
        if (statusFilters.length > 0) {
            filters.push(...statusFilters);
        }

        // Call the service with the correct filters
        dispatch(
            getUsersService({
                page,
                pageSize: pageSizeLocal,
                username: nameSearch,
                email: emailSearch,
                filters,
            })
        );
    }, [statusFilters, page, pageSizeLocal, nameSearch, emailSearch, dispatch]);

    // Formatting function for the date
    const formatDate = (date: string) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    // Filter users based on the search term
    const filteredUsers = users?.filter((user: any) => {
        return user.firstName || user.lastName || user.department || user.email || user.numberOfLogIn || user.lastLogIn;
    });

    // Sorting users based on the selected column
    const sortedUsers = sortBy(filteredUsers, sortStatus.columnAccessor);
    const sortedData = sortStatus.direction === 'desc' ? sortedUsers.reverse() : sortedUsers;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Frozen':
                return 'info';
            case 'Deleted':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    const depOptions = departments?.map((d) => {
        return {
            label: d,
            value: d,
        };
    });

    const rolesOptions = roles?.map((r) => {
        return {
            label: r,
            value: r,
        };
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, searchType: 'name' | 'email') => {
        const searchTerm = e.target.value;
        if (searchType === 'name') {
            setNameSearch(searchTerm.toUpperCase());
        }
        if (searchType === 'email') {
            setEmailSearch(searchTerm.toUpperCase());
        }
    };
    const handleRefresh = () => {
        dispatch(getUsersService({ page, pageSize: pageSizeLocal, username: nameSearch, email: emailSearch }));
    };

    const handleStatusChange = (selected: MultiValue<selectOption>) => {
        const selectedValues = new Set(selected.map((s) => s.value));

        const filtersArray = stausOptions.map((status) => {
            const isSelected = selectedValues.has(status.value);
            return { key: status.value, value: isSelected };
        });

        // Check if at least one filter is true
        const hasTrueFilter = filtersArray.some((filter) => filter.value);

        if (!hasTrueFilter) {
            setStatusFilters([]); // Don't set any filters if all are false
            return;
        }

        const filtersString = filtersArray.map((filter) => `${filter.key}==${filter.value}`).join(',');

        setStatusFilters([`${filtersString}`]);
    };

    const handleDepChange = (selected: selectOption) => {
        // Create a department filter string
        const depFilterString = selected ? `department@=${selected.value}` : '';

        // If a department filter is selected, append it to the existing statusFilters
        setStatusFilters((prevFilters) => {
            // Filter out any existing department filter to avoid duplication
            const updatedFilters = prevFilters.filter((filter) => !filter.includes('department@='));

            // Append the new department filter if selected
            if (depFilterString) {
                return [...updatedFilters, depFilterString];
            }

            return updatedFilters; // If no department is selected, return the previous filters without any change
        });
    };

    const handleDelete = () => {
        const data = {
            code: selectedUser.code,
            isdeleted: true,
        };
        dispatch(deleteUserService(data)).then((action) => {
            if (deleteUserService.fulfilled.match(action)) {
                dispatch(getUsersService({ page, pageSize: pageSizeLocal, username: nameSearch, email: emailSearch }));
                setOpenDeleteModal(false);
            }
        });
    };
    const handlePromote = () => {
        const data = {
            code: selectedUser.code,
            isdeleted: true,
        };
        dispatch(deleteUserService(data)).then((action) => {
            if (deleteUserService.fulfilled.match(action)) {
                dispatch(getUsersService({ page, pageSize: pageSizeLocal, username: nameSearch, email: emailSearch }));
            }
        });
    };

    useEffect(() => {
        dispatch(getDepartmentsService());
        dispatch(getRolesService());
    }, []);
    return (
        <div>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Users</h5>
                    <div className="ltr:ml-auto rtl:mr-auto flex items-center gap-4">
                        <ColumnVisibilityDropdown
                            columns={usersCols}
                            isHidden={isHidden}
                            toggleColumn={toggleColumn}
                        />

                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                setEditMode(false);
                                setAddContactModal(true);
                            }}
                        >
                            <IconUserPlus width={15} height={15} className="ltr:mr-2 rtl:ml-2" />
                            Add User
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-sm border border-primary text-primary hover:bg-primary hover:text-white" onClick={handleRefresh}>
                            <IconRefresh width={15} height={15} className="ltr:mr-2 rtl:ml-2" />
                            Refresh
                        </button>
                        {/* Search by name */}
                        <input type="text" className="form-input w-auto form-input-sm" placeholder="Search by name..." value={nameSearch} onChange={(e) => handleSearch(e, 'name')} />
                        {/* Search by email */}
                        <input type="text" className="form-input w-auto form-input-sm" placeholder="Search by email..." value={emailSearch} onChange={(e) => handleSearch(e, 'email')} />
                        <Select<selectOption, true> isMulti placeholder="Choose status" options={stausOptions} styles={customStyles} onChange={handleStatusChange} />{' '}
                        <Select<selectOption, true> placeholder="Choose departments" options={depOptions} styles={customStyles} onChange={handleDepChange} />{' '}
                    </div>
                </div>
                <div className="datatables">
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-80">
                            <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block"></span>
                        </div>
                    ) : (
                        <>
                            {selectedUser && (
                                <SelectedUserBox
                                    user={selectedUser}
                                    onClear={() => setSelectedUser(null)}
                                    onDelete={() => {
                                        setOpenDeleteModal(true);
                                    }}
                                    onPromote={() => {
                                        setOpenPromoteModal(true);
                                    }}
                                    onChangePassword={() => {
                                        setOpenPasswordModal(true);
                                    }}
                                    onEditInfo={() => {
                                        setEditMode(true);
                                        setAddContactModal(true);
                                    }}
                                />
                            )}
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover"
                                records={sortedData}
                                columns={[
                                    {
                                        accessor: '',
                                        title: '',
                                        sortable: false,
                                        render: (user) => (
                                            <div
                                                className="flex items-center w-max cursor-pointer"
                                                onClick={() => {
                                                    if (selectedUser && selectedUser.code === user.code) {
                                                        setSelectedUser(null);
                                                    } else {
                                                        setSelectedUser(user);
                                                    }
                                                }}
                                            >
                                                <IconUser fill={true} className="w-6 h-6" />
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: 'User',
                                        title: 'User',
                                        sortable: true,
                                        hidden: isHidden('User'),
                                        render: ({ firstName, lastName }) => (
                                            <div className="flex items-center w-max">
                                                <div>{firstName + ' ' + lastName}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: 'department',
                                        title: 'Department',
                                        sortable: true,
                                        hidden: isHidden('department'),
                                    },
                                    {
                                        accessor: 'numberOfLogIn',
                                        title: 'Logins',
                                        sortable: true,
                                        hidden: isHidden('numberOfLogIn'),
                                    },
                                    {
                                        accessor: 'lastLogIn',
                                        title: 'Last Login',
                                        sortable: true,
                                        hidden: isHidden('lastLogIn'),
                                        render: ({ lastLogIn }) => <div>{formatDate(lastLogIn)}</div>,
                                    },
                                    {
                                        accessor: 'email',
                                        sortable: true,
                                        hidden: isHidden('email')
                                    },
                                    {
                                        accessor: 'roles',
                                        title: 'Hotel',
                                        sortable: true,
                                        hidden: isHidden('roles'),
                                        render: ({ roles }) => {
                                            return (
                                                <Select isMulti placeholder="Choose roles" options={rolesOptions} styles={customStyles} value={roles.map((role) => ({ label: role, value: role }))} />
                                            );
                                        },
                                    },
                                    {
                                        accessor: 'status',
                                        title: 'Status',
                                        sortable: true,
                                        hidden: isHidden('status'),
                                        render: ({ status, reason }) => (
                                            <div className="flex items-center">
                                                <Tippy content={reason || ''} placement="bottom">
                                                    <span className={`badge bg-${getStatusColor(status)} cursor-pointer`}>{status}</span>
                                                </Tippy>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={totalCount}
                                recordsPerPage={pageSizeLocal}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={[10, 20, 30, 50, 100]}
                                onRecordsPerPageChange={(size) => setPageSize(size)}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                minHeight={200}
                                paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                            />
                        </>
                    )}
                </div>
            </div>
            <UserModal
                page={page}
                pageSizeLocal={pageSizeLocal}
                nameSearch={nameSearch}
                emailSearch={emailSearch}
                statusFilters={statusFilters}
                isOpen={addContactModal}
                onClose={() => {
                    setAddContactModal(false);
                }}
                selectedUser={selectedUser}
                editMode={editMode}
                depOptions={depOptions}
            />
            <DeleteModal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
                title="Delete user"
                content={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
                handleDelete={handleDelete}
                isLoadingDelete={isLoadingDelete}
            />
            <PromoteModal
                isOpen={openPromoteModal}
                setIsOpen={setOpenPromoteModal}
                title="Promote User to Admin"
                content="Are you sure you want to promote this user to an admin? This action grants them full administrative access."
                handlePromote={handlePromote}
                isLoadingPromote={isLoading}
            />
            <ChangePasswordModal isOpen={openPasswordModal} onClose={() => setOpenPasswordModal(false)} selectedUser={selectedUser} />
        </div>
    );
};

export default UsersPage;
