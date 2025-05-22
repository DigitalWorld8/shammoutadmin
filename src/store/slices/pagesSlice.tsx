import { createSlice } from '@reduxjs/toolkit';
import { logInService } from '../services/authService';
import { createComponentService, createPageService, createSegmentService, deleteComponentService, deletePageService, deleteSegmentService, editStaticComponentsService, getFormsService, getMetaDataService, getPageByIdService, getPageBySubUrlService, getPagesService, getStaticComponentsService, getSubPathService, updateComponentService, updatePageService, updateSegmentService } from '../services/pagesService';
import { ensureExtensible } from '../../utils/objectHelpers';

interface Page {
    id: number;
    pageUrlName: string;
    language: string;
    pos: string;
    title: string;
    isDeleted: boolean;
    status: string;
    description: string;
    segments: any[];
    staticComponents: any[];
}
interface MetaData {
    id: number;
    type: string;
    content: Record<string, any>[];
}
interface Segment {
    pageID: number;
    position: number;
    name: string;
    description: string;
}
interface staticComp {
    id: number;
    position: number;
    type: string;
    content: string;
}
interface Form {
    id: number;
    email: string;
    phoneNumber: string;
    description: string;
    services: string;
    isValid: boolean;

}
const defaultPage: Page = {
    id: 0,
    pageUrlName: '',
    language: '',
    pos: '',
    title: '',
    isDeleted: false,
    status: '',
    description: '',
    segments: [],
    staticComponents: []
};


interface pageState {
    pages: Page[];
    subPages: Page[];
    forms: Form[]
    page: Page | null;
    isLoading: boolean;
    isLoadingPage: boolean;
    isLoadingSegment: boolean;
    isLoadingUpdateSegment: boolean;
    isLoadingComponent: boolean;
    isLoadingMetaData: boolean;
    isLoadingUpdatePage: boolean;
    isLoadingForms: boolean;
    isLoadingDelete: boolean;
    showModal: boolean;
    isLoadingUpdateConstComp: boolean;
    metaDataItems: MetaData[];
    selectedPage: Page | null;
    selectedSegment: Segment | null;
    staticComp: staticComp[];
    pageUrl: string; subPages: Page[];
    item: {};
    clickedKey: string


}

const initialState: pageState = {
    pages: [],
    subPages: [],
    page: null,
    isLoading: false,
    isLoadingPage: false,
    isLoadingSegment: false,
    isLoadingComponent: false,
    isLoadingUpdateSegment: false,
    isLoadingUpdatePage: false,
    isLoadingForms: false,
    forms: [],
    isLoadingDelete: false,
    metaDataItems: [],
    isLoadingMetaData: false,
    isLoadingUpdateConstComp: false,
    selectedPage: null,
    selectedSegment: null,
    staticComp: [],
    subPagesByPath: [],
    pageUrl: "",
    showModal: false,
    item: {},
    clickedKey: 'logo'

};
const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setSelectedPage(state, action) {
            state.selectedPage = action.payload;
        },
        setPageUrl(state, action) {
            state.pageUrl = action.payload;
        },
        setSelectedSegmemt(state, action) {
            state.selectedSegment = action.payload;
        },
        setShowModal(state, action) {
            state.showModal = action.payload;
        },
        setItem(state, action) {
            state.item = action.payload;
        },
        setClickedKey(state, action) {
            state.clickedKey = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ======================== getSubPathService =======================

            .addCase(getSubPathService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubPathService.fulfilled, (state, action) => {
                state.subPagesByPath[action.meta.arg.pageUrlName] = action.payload;
                state.isLoading = false;
            })
            .addCase(getSubPathService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== GET PAGE BY SUB URL =======================
            .addCase(getPageBySubUrlService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPageBySubUrlService.fulfilled, (state, action) => {

                // state.page = action.payload;
                // state.selectedPage = action.payload;
                state.isLoading = false;
            })
            .addCase(getPageBySubUrlService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== getPagesService =======================

            .addCase(getPagesService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPagesService.fulfilled, (state, action) => {
                const { items } = action.payload;
                state.pages = items;
                state.isLoading = false;
            })
            .addCase(getPagesService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== createPageService =======================

            .addCase(createPageService.pending, (state) => {
                state.isLoadingPage = true;
            })
            .addCase(createPageService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoadingPage = false;
            })
            .addCase(createPageService.rejected, (state) => {
                state.isLoadingPage = false;
            })
            // ======================== GET BY ID =======================

            .addCase(getPageByIdService.pending, (state, action) => {
                state.isLoadingPage = true;
            })
            .addCase(getPageByIdService.fulfilled, (state, action) => {
                const data = action.payload;
                state.selectedPage = data;
                state.isLoadingPage = false;
            })

            .addCase(getPageByIdService.rejected, (state) => {
                state.isLoadingPage = false;
            })
            // ======================== createSegmentService =======================
            .addCase(createSegmentService.pending, (state) => {
                state.isLoadingSegment = true;
            })
            .addCase(createSegmentService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoadingSegment = false;
            })
            .addCase(createSegmentService.rejected, (state) => {
                state.isLoadingSegment = false;
            })
            // ======================== UPDATE COMPONENT  =======================
            .addCase(updateComponentService.pending, (state) => {
                state.isLoadingComponent = true;
            })
            .addCase(updateComponentService.fulfilled, (state, action) => {
                state.isLoadingComponent = false;
            })
            .addCase(updateComponentService.rejected, (state) => {
                state.isLoadingComponent = false;
            })
            // ======================== CREATE COMPONENT  =======================
            .addCase(createComponentService.pending, (state) => {
                state.isLoadingComponent = true;
            })
            .addCase(createComponentService.fulfilled, (state, action) => {
                const data = action.payload;
                state.isLoadingComponent = false;
            })
            .addCase(createComponentService.rejected, (state) => {
                state.isLoadingComponent = false;
            })
            // ======================== CREATE COMPONENT  =======================
            .addCase(getStaticComponentsService.pending, (state) => {

                state.isLoading = true;
            })
            .addCase(getStaticComponentsService.fulfilled, (state, action) => {
                state.staticComp = action.payload.items
                state.isLoading = false;
            })
            .addCase(getStaticComponentsService.rejected, (state) => {
                state.isLoading = false;
            })
            // ======================== GET COMPONENTS META DATA =======================
            .addCase(getMetaDataService.pending, (state) => {
                state.isLoadingMetaData = true;
            })
            .addCase(getMetaDataService.fulfilled, (state, action) => {
                const data = action.payload;
                state.metaDataItems = data.items;
                state.isLoadingMetaData = false;
            })
            .addCase(getMetaDataService.rejected, (state) => {
                state.isLoadingMetaData = false;
            })
            // ======================== DELETE PAGE SEERVICE =======================

            .addCase(deletePageService.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deletePageService.fulfilled, (state, action) => {
                state.isLoadingDelete = false;
            })
            .addCase(deletePageService.rejected, (state) => {
                state.isLoadingDelete = false;
            })
            // ======================== DELETE SEGMENT SEERVICE =======================

            .addCase(deleteSegmentService.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deleteSegmentService.fulfilled, (state, action) => {
                state.isLoadingDelete = false;
            })
            .addCase(deleteSegmentService.rejected, (state) => {
                state.isLoadingDelete = false;
            })
            // ======================== DELETE Component SEERVICE =======================

            .addCase(deleteComponentService.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deleteComponentService.fulfilled, (state, action) => {
                state.isLoadingDelete = false;
            })
            .addCase(deleteComponentService.rejected, (state) => {
                state.isLoadingDelete = false;
            })
            // ======================== EDIT  CONST COMPONENT  =======================

            .addCase(editStaticComponentsService.pending, (state) => {
                state.isLoadingUpdateConstComp = true;
            })
            .addCase(editStaticComponentsService.fulfilled, (state, action) => {
                state.isLoadingUpdateConstComp = false;
            })
            .addCase(editStaticComponentsService.rejected, (state) => {
                state.isLoadingUpdateConstComp = false;
            })
            .addCase(updateSegmentService.pending, (state) => {
                state.isLoadingUpdateSegment = true;
            })
            .addCase(updateSegmentService.fulfilled, (state, action) => {
                state.isLoadingUpdateSegment = false;
            })
            .addCase(updateSegmentService.rejected, (state) => {
                state.isLoadingUpdateSegment = false;
            })
            .addCase(updatePageService.pending, (state) => {
                state.isLoadingUpdatePage = true;
            })
            .addCase(updatePageService.fulfilled, (state, action) => {
                state.isLoadingUpdatePage = false;
            })
            .addCase(updatePageService.rejected, (state) => {
                state.isLoadingUpdatePage = false;
            })
            .addCase(getFormsService.pending, (state) => {
                state.isLoadingForms = true;
            })
            .addCase(getFormsService.fulfilled, (state, action) => {
                const data = action.payload
                state.forms = data
                state.isLoadingForms = false;
            })
            .addCase(getFormsService.rejected, (state) => {
                state.isLoadingForms = false;
            })
    },
});
export const { setSelectedPage, setSelectedSegmemt, setPageUrl, setShowModal, setItem ,setClickedKey} = pagesSlice.actions;

export default pagesSlice.reducer;
