import { Project, RawUpdate, ProjectHealth } from "@/types";

// In-memory store for local testing when Firebase is not configured
let mockProjects: Record<string, Project> = {
    "proj-1": {
        id: "proj-1",
        name: "Nexus Track Alpha",
        current_health: "Green",
        overall_progress: 20,
        last_update_timestamp: new Date().toISOString(),
        accomplishments: [
            "Initialized Next.js project",
            "Configured Ralph Lauren visual aesthetic"
        ],
        upcoming_steps: [
            "Build data ingestion API",
            "Integrate Gemini connection"
        ]
    },
    "proj-2": {
        id: "proj-2",
        name: "Q3 Marketing Campaign",
        current_health: "Yellow",
        overall_progress: 60,
        last_update_timestamp: new Date().toISOString(),
        accomplishments: [
            "Finalized budget",
            "Selected agency partners"
        ],
        upcoming_steps: [
            "Review creative pitch",
            "Sign vendor contracts"
        ]
    }
};

let mockUpdates: Record<string, RawUpdate[]> = {
    "proj-1": [],
    "proj-2": []
};

export const mockStore = {
    getProjects: () => Object.values(mockProjects),
    getProject: (id: string) => mockProjects[id],
    updateProject: (id: string, updates: Partial<Project>) => {
        if (mockProjects[id]) {
            mockProjects[id] = { ...mockProjects[id], ...updates };
            return mockProjects[id];
        }
        return null;
    },
    addRawUpdate: (update: RawUpdate) => {
        if (!mockUpdates[update.projectId]) {
            mockUpdates[update.projectId] = [];
        }
        mockUpdates[update.projectId].push(update);
    }
};
