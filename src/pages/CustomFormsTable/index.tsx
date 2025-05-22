import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconXCircle from '../../components/Icon/IconXCircle';
import { DataTable } from 'mantine-datatable';
import { useAppDispatch, useAppSelector } from '../../store';
import { getFormsService } from '../../store/services/pagesService';
import withGuard from '../../utils/withGuard';

const PAGE_SIZES = [5, 10, 20, 50];

const CustomFormsTable = () => {
    const dispatch = useAppDispatch();
    const { forms } = useAppSelector((state) => state.pages);

    const { totalCount, page: currentPage, pageSize: currentSize, items } = forms || {};
    if (!forms) return <div>Loading...</div>;

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        dispatch(getFormsService({ page, pageSize }));
    }, [dispatch, page, pageSize]);

    return (
        <div className="panel mt-6">
            {/* Fixed Top Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b">
                <h2 className="text-xl font-semibold mb-2">Forms Records</h2>
            </div>

            {/* Table Container */}
            <div className="flex flex-col">
                {/* Table Header + Scrollable Body */}
                <div className="overflow-y-auto ">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={items || []}
                        columns={[
                            {
                                accessor: 'email',
                                title: 'Email',
                                sortable: false,
                            },
                            {
                                accessor: 'phoneNumber',
                                title: 'Phone No.',
                                sortable: false,
                            },
                            {
                                accessor: 'description',
                                title: 'Description',
                                sortable: false,
                            },
                            {
                                accessor: 'services',
                                title: 'Services',
                                sortable: false,
                                render: ({ services }) => {
                                    const serviceList = services?.split(',') || [];
                                    return (
                                        <div className="flex flex-wrap gap-1">
                                            {serviceList.map((service, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs rounded bg-primary text-white"
                                                >
                                                    {service.replace(/_/g, ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    );
                                },
                            },
                            {
                                accessor: 'lastSubmissionDate',
                                title: 'Date',
                                sortable: false,
                                render: ({ lastSubmissionDate }) => (
                                    <span >
                                        {lastSubmissionDate?.split('T')[0]}
                                    </span>
                                ),
                            },
                        ]}
                        totalRecords={totalCount || 0}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={setPage}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={(size) => {
                            setPageSize(size);
                            setPage(1);
                        }}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default withGuard(CustomFormsTable);
