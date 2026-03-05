export type ProjectHealth = "Green" | "Yellow" | "Red";

export interface Project {
    id: string;
    name: string;
    current_health: ProjectHealth;
    overall_progress: number;
    last_update_timestamp: Date | string; // Use string for serialized passing
    accomplishments: string[];
    upcoming_steps: string[];
}

export interface RawUpdate {
    id: string;
    projectId: string;
    raw_text: string;
    timestamp: Date | string;
}

export interface ProjectUpdate {
    project_id: string;
    updated_accomplishments: string[];
    upcoming_steps: string[];
    project_health: ProjectHealth;
    last_update_timestamp: string;
}

export interface BulkSynthesizeResponse {
    updates: ProjectUpdate[];
}
