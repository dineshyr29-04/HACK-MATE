
export interface Project {
    id: string;
    name: string;
    problem: string;
    timeLeft: string;
    createdAt: number;
    lastModified: number;
}

export interface ProjectState {
    currentStageId?: string;
    checklist: Record<string, Record<number, boolean>>; // stageId -> { index -> bool }
    customPrompts: Record<string, string>; // stageId -> promptContent
}

const STORAGE_KEYS = {
    PROJECTS: 'hackathon-copilot-projects',
    STATE: 'hackathon-copilot-state',
};

export const store = {
    getProjects: (): Project[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveProject: (project: Project) => {
        const projects = store.getProjects();
        const existing = projects.findIndex(p => p.id === project.id);
        if (existing >= 0) {
            projects[existing] = { ...projects[existing], ...project, lastModified: Date.now() };
        } else {
            projects.unshift({ ...project, createdAt: Date.now(), lastModified: Date.now() });
        }
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    },

    getProjectState: (projectId: string): ProjectState => {
        try {
            const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
            return allStates[projectId] || { checklist: {}, customPrompts: {} };
        } catch {
            return { checklist: {}, customPrompts: {} };
        }
    },

    saveProjectState: (projectId: string, state: Partial<ProjectState>) => {
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const currentState = allStates[projectId] || { checklist: {}, customPrompts: {} };
        allStates[projectId] = { ...currentState, ...state };
        localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(allStates));
    },

    updateChecklist: (projectId: string, stageId: string, index: number, checked: boolean) => {
        const state = store.getProjectState(projectId);
        const stageChecklist = state.checklist[stageId] || {};
        stageChecklist[index] = checked;
        store.saveProjectState(projectId, {
            checklist: { ...state.checklist, [stageId]: stageChecklist }
        });
    },

    saveCustomPrompt: (projectId: string, stageId: string, content: string) => {
        const state = store.getProjectState(projectId);
        store.saveProjectState(projectId, {
            customPrompts: { ...state.customPrompts, [stageId]: content }
        });
    },

    exportProject: (projectId: string): string | null => {
        const projects = store.getProjects();
        const project = projects.find(p => p.id === projectId);
        if (!project) return null;

        const state = store.getProjectState(projectId);
        const payload = { project, state };
        try {
            // Safe Base64 encoding for UTF-8
            return window.btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
        } catch (e) {
            console.error("Export failed", e);
            return null;
        }
    },

    importProject: (encoded: string): string | null => {
        try {
            // Safe Base64 decoding
            const json = decodeURIComponent(escape(window.atob(encoded)));
            const { project, state } = JSON.parse(json);

            if (!project || !project.id) return null;

            // Import as a new project to avoid conflict? Or overwrite? 
            // For a "Shared" view, let's upsert.
            // NOTE: In a real app we might verify timestamps or ask user. 
            // Here we silently upsert.
            store.saveProject(project);
            store.saveProjectState(project.id, state);
            return project.id;
        } catch (e) {
            console.error("Import failed", e);
            return null;
        }
    }
};
