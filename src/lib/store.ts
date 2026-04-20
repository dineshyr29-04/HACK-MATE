
export interface Project {
    id: string;
    name: string;
    problem: string;
    timeLeft: string;
    type?: string;
    prizeCategory?: string;
    judgingFocus?: string[];
    teamSize?: string;
    isTeam?: boolean;
    teamId?: string;
    createdAt: number;
    lastModified: number;
}

export interface ProjectState {
    currentStageId?: string;
    checklist: Record<string, Record<number, boolean>>; // stageId -> { index -> bool }
    customPrompts: Record<string, string>; // stageId -> promptContent
    comments: Record<string, { user: string; text: string; time: number }[]>; // stageId -> comments
    assignments: Record<string, string>; // stageId -> userName
    aiInsights: Record<string, string>; // stageId -> result
}

const STORAGE_KEYS = {
    PROJECTS: 'hackathon-copilot-projects',
    STATE: 'hackathon-copilot-state',
};

import { supabase, isSupabaseConfigured } from './supabase';

export const store = {
    getProjects: async (): Promise<Project[]> => {
        // Try Supabase first if configured
        if (isSupabaseConfigured()) {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('last_modified', { ascending: false });

                if (!error && Array.isArray(data)) {
                    // Update local cache
                    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
                    return data;
                }
            } catch (e) {
                console.warn("Supabase fetch failed, falling back to local storage", e);
            }
        }

        // Local Storage Fallback
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    },

    saveProject: async (project: Project) => {
        try {
            // 1. Update Local Cache (Immediate)
            const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
            let projects: Project[] = [];
            try {
                const parsed = JSON.parse(raw || '[]');
                projects = Array.isArray(parsed) ? parsed : [];
            } catch {
                projects = [];
            }

            const existing = projects.findIndex((p: any) => p.id === project.id);
            const updatedProject = { ...project, lastModified: Date.now() };

            if (existing >= 0) {
                projects[existing] = { ...projects[existing], ...updatedProject };
            } else {
                // Generate a more robust 8-char unique Team ID (Digits + Letters)
                const timestamp = Date.now().toString(36).slice(-3);
                const random = Math.random().toString(36).substring(2, 7).toUpperCase();
                updatedProject.teamId = `HM-${random}${timestamp.toUpperCase()}`;
                projects.unshift({ ...updatedProject, createdAt: Date.now() });
            }
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

            // 2. Sync to Supabase (Background)
            if (isSupabaseConfigured()) {
                await supabase.from('projects').upsert({
                    id: updatedProject.id,
                    name: updatedProject.name,
                    problem: updatedProject.problem,
                    time_left: updatedProject.timeLeft,
                    type: updatedProject.type,
                    prize_category: updatedProject.prizeCategory,
                    judging_focus: updatedProject.judgingFocus,
                    team_size: updatedProject.teamSize,
                    is_team: updatedProject.isTeam,
                    team_id: updatedProject.teamId,
                    last_modified: updatedProject.lastModified
                });
            }
        } catch (e) {
            console.error("Save project failed", e);
        }
    },

    findProjectByTeamId: async (teamId: string): Promise<Project | null> => {
        if (!isSupabaseConfigured()) return null;
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('team_id', teamId.toUpperCase())
                .single();
            
            if (!error && data) {
                const project: Project = {
                    id: data.id,
                    name: data.name,
                    problem: data.problem,
                    timeLeft: data.time_left,
                    type: data.type,
                    prizeCategory: data.prize_category,
                    judgingFocus: data.judging_focus,
                    teamSize: data.team_size,
                    isTeam: data.is_team,
                    teamId: data.team_id,
                    createdAt: data.created_at || Date.now(),
                    lastModified: data.last_modified || Date.now()
                };
                await store.saveProject(project);
                return project;
            }
            return null;
        } catch (e) {
            console.error("Find team failed", e);
            return null;
        }
    },

    getProjectState: async (projectId: string): Promise<ProjectState> => {
        if (isSupabaseConfigured()) {
            try {
                const { data, error } = await supabase
                    .from('project_state')
                    .select('*')
                    .eq('project_id', projectId)
                    .single();

                if (!error && data) {
                    const state: ProjectState = {
                        checklist: data.checklist || {},
                        customPrompts: data.custom_prompts || {},
                        comments: data.comments || {},
                        assignments: data.assignments || {},
                        aiInsights: data.ai_insights || {}
                    };
                    // Update local cache
                    const raw = localStorage.getItem(STORAGE_KEYS.STATE);
                    let allStates: any = {};
                    try {
                        allStates = JSON.parse(raw || '{}');
                        if (typeof allStates !== 'object' || allStates === null) allStates = {};
                    } catch {
                        allStates = {};
                    }
                    allStates[projectId] = state;
                    localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(allStates));
                    return state;
                }
            } catch (e) {
                console.warn("Supabase state fetch failed", e);
            }
        }

        // Local Storage Fallback
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.STATE);
            if (!raw) return { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };
            const allStates = JSON.parse(raw);
            if (!allStates || typeof allStates !== 'object') return { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };
            return allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };
        } catch {
            return { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };
        }
    },

    saveProjectState: async (projectId: string, state: Partial<ProjectState>) => {
        // 1. Update Local Cache (Immediate)
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const currentState = allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };
        const newState = { ...currentState, ...state };
        allStates[projectId] = newState;
        localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(allStates));

        // 2. Sync to Supabase (Background)
        if (isSupabaseConfigured()) {
            try {
                await supabase.from('project_state').upsert({
                    project_id: projectId,
                    checklist: newState.checklist,
                    custom_prompts: newState.customPrompts,
                    comments: newState.comments,
                    assignments: newState.assignments,
                    ai_insights: newState.aiInsights,
                    updated_at: Date.now()
                });
            } catch (e) {
                console.error("Supabase state sync failed", e);
            }
        }
    },

    updateChecklist: async (projectId: string, stageId: string, index: number, checked: boolean) => {
        // Get current state (prefer local for speed)
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const state = allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };

        const stageChecklist = state.checklist[stageId] || {};
        stageChecklist[index] = checked;

        await store.saveProjectState(projectId, {
            checklist: { ...state.checklist, [stageId]: stageChecklist }
        });
    },

    saveCustomPrompt: async (projectId: string, stageId: string, content: string) => {
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const state = allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };

        await store.saveProjectState(projectId, {
            customPrompts: { ...state.customPrompts, [stageId]: content }
        });
    },

    addComment: async (projectId: string, stageId: string, user: string, text: string) => {
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const state = allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };

        const stageComments = state.comments[stageId] || [];
        const newComments = [...stageComments, { user, text, time: Date.now() }];

        await store.saveProjectState(projectId, {
            comments: { ...state.comments, [stageId]: newComments }
        });
    },

    updateAssignment: async (projectId: string, stageId: string, userName: string) => {
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const state = allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };

        await store.saveProjectState(projectId, {
            assignments: { ...state.assignments, [stageId]: userName }
        });
    },

    saveAIInsight: async (projectId: string, stageId: string, result: string) => {
        const allStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.STATE) || '{}');
        const state = allStates[projectId] || { checklist: {}, customPrompts: {}, comments: {}, assignments: {}, aiInsights: {} };

        await store.saveProjectState(projectId, {
            aiInsights: { ...state.aiInsights, [stageId]: result }
        });
    },

    exportProject: async (projectId: string): Promise<string | null> => {
        // Since projects are synced to Supabase, we only need to share the ID
        // We prefix it with 'v2:' to distinguish from the old long Base64 format
        try {
            return `v2:${projectId}`;
        } catch (e) {
            console.error("Export failed", e);
            return null;
        }
    },

    importProject: async (encoded: string): Promise<string | null> => {
        try {
            // Check if it's the new short format
            if (encoded.startsWith('v2:')) {
                const projectId = encoded.split('v2:')[1];
                
                if (isSupabaseConfigured()) {
                    // Fetch the project from Supabase
                    const { data: project, error: pError } = await supabase
                        .from('projects')
                        .select('*')
                        .eq('id', projectId)
                        .single();
                    
                    if (!pError && project) {
                        // Success! Save to local storage for quick access
                        await store.saveProject(project);
                        // State will be fetched normally by StageSelection
                        return project.id;
                    }
                }
                return null;
            }

            // Fallback for old long links
            const json = decodeURIComponent(escape(window.atob(encoded)));
            const { project, state } = JSON.parse(json);

            if (!project || !project.id) return null;

            await store.saveProject(project);
            if (state) await store.saveProjectState(project.id, state);
            return project.id;
        } catch (e) {
            console.error("Import failed", e);
            return null;
        }
    },

    deleteProject: async (projectId: string) => {
        try {
            // 1. Update Local Cache
            const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
            if (raw) {
                const projects = JSON.parse(raw);
                const filtered = projects.filter((p: any) => p.id !== projectId);
                localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
            }

            // 2. Clear Local State
            const rawStates = localStorage.getItem(STORAGE_KEYS.STATE);
            if (rawStates) {
                const states = JSON.parse(rawStates);
                delete states[projectId];
                localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(states));
            }

            // 3. Delete from Supabase
            if (isSupabaseConfigured()) {
                await supabase.from('projects').delete().eq('id', projectId);
                await supabase.from('project_state').delete().eq('project_id', projectId);
            }
        } catch (e) {
            console.error("Delete project failed", e);
        }
    },

    findProjectByTeamId: async (teamId: string): Promise<Project | null> => {
        if (!isSupabaseConfigured()) return null;
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('team_id', teamId)
                .limit(1)
                .maybeSingle();
            
            if (error) {
                console.error("Supabase query error:", error);
                return null;
            }
            if (!data) return null;
            return data as Project;
        } catch (e) {
            console.error("Unexpected error in findProjectByTeamId:", e);
            return null;
        }
    },

    isConfigured: async (): Promise<boolean> => {
        return isSupabaseConfigured();
    }
};
