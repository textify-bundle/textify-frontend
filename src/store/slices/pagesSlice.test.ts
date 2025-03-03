import { describe, it, expect } from 'vitest';
import pagesReducer, {
    fetchTreeData,
    createNewProjectAndPage,
    restoreProject,
    removePageFromTree,
    updatePageTitle,
} from './pagesSlice';

describe('pagesSlice', () => {
    const initialState = {
        tree: [],
        loading: false,
        error: null,
        projectData: [],
    };

    it('should handle initial state', () => {
        expect(pagesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle fetchTreeData pending', () => {
        const actual = pagesReducer(initialState, fetchTreeData.pending);
        expect(actual.loading).toBe(true);
        expect(actual.error).toBe(null);
    });

    it('should handle fetchTreeData fulfilled', () => {
        const projectsData = [
            { id: 1, project_name: 'Project 1', isRemoved: false, date_of_change: '2023-01-01' },
        ];
        const pagesData = [
            { id: 1, project_id: 1, title: 'Page 1', markup_json: '', isRemoved: false },
        ];
        const action = {
            type: fetchTreeData.fulfilled.type,
            payload: { projectsData, pagesData },
        };
        const actual = pagesReducer(initialState, action);
        expect(actual.loading).toBe(false);
        expect(actual.tree).toHaveLength(4); 
    });

    it('should handle fetchTreeData rejected', () => {
        const action = {
            type: fetchTreeData.rejected.type,
            error: { message: 'Error fetching data' },
        };
        const actual = pagesReducer(initialState, action);
        expect(actual.loading).toBe(false);
        expect(actual.error).toBe('Error fetching data');
    });

    it('should handle createNewProjectAndPage fulfilled', () => {
        const mockProject = { id: 1, project_name: 'New Project', isRemoved: false, date_of_change: '2023-01-01' };
        const mockPage = { id: 1, project_id: 1, title: 'New Page', markup_json: '', isRemoved: false };
        const action = {
            type: createNewProjectAndPage.fulfilled.type,
            payload: { project: mockProject, page: mockPage },
        };
        const actual = pagesReducer(initialState, action);
        expect(actual.tree).toHaveLength(1);
        expect(actual.projectData).toContainEqual({
            id: mockProject.id,
            name: mockProject.project_name,
            dateOfChange: mockProject.date_of_change,
            isRemoved: mockProject.isRemoved,
        });
    });

    it('should handle restoreProject fulfilled', () => {
        const state = {
            ...initialState,
            projectData: [{ id: 1, name: 'Project 1', dateOfChange: '2023-01-01', isRemoved: true }],
        };
        const action = {
            type: restoreProject.fulfilled.type,
            meta: { arg: 1 },
        };
        const actual = pagesReducer(state, action);
        expect(actual.projectData[0].isRemoved).toBe(false);
    });

    it('should handle removePageFromTree fulfilled', () => {
        const state = {
            ...initialState,
            tree: [
                {
                    name: 'Project 1',
                    type: 'dropdown',
                    id: 1,
                    items: [{ id: 1, name: 'Page 1', type: 'link' }],
                },
            ],
        };
        const action = {
            type: removePageFromTree.fulfilled.type,
            payload: 1,
        };
        const actual = pagesReducer(state, action);
        expect(actual.tree[0].items).toHaveLength(0); // Page should be removed
    });

    it('should handle updatePageTitle fulfilled', () => {
        const state = {
            ...initialState,
            tree: [
                {
                    name: 'Project 1',
                    type: 'dropdown',
                    id: 1,
                    items: [{ id: 1, name: 'Old Title', type: 'link' }],
                },
            ],
        };

        const action = {
            type: updatePageTitle.fulfilled.type,
            meta: { arg: { pageId: 1, title: 'Updated Title' } },
        };

        const actual = pagesReducer(state, action);
        expect(actual.tree[0].items[0].name).toBe('Updated Title'); // Title should be updated
    });

    it('should handle fetchTreeData rejected with error message', () => {
        const action = {
            type: fetchTreeData.rejected.type,
            error: { message: 'Failed to fetch tree data' },
        };
        const actual = pagesReducer(initialState, action);
        expect(actual.loading).toBe(false);
        expect(actual.error).toBe('Failed to fetch tree data');
    });
});
