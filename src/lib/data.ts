import { adminDb } from '@/lib/firebase-admin';
import { mockStore } from '@/lib/mock-store';
import { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
    try {
        if (adminDb) {
            const snapshot = await adminDb.collection('projects').get();
            return snapshot.docs.map(doc => {
                const data = doc.data() as Partial<Project>;
                return {
                    id: doc.id,
                    name: data.name || "Unnamed Project",
                    current_health: data.current_health || "Green",
                    overall_progress: data.overall_progress || 0,
                    last_update_timestamp: data.last_update_timestamp || new Date().toISOString(),
                    accomplishments: data.accomplishments || [],
                    upcoming_steps: data.upcoming_steps || []
                } as Project;
            });
        }
    } catch (error) {
        console.warn("Failed to fetch from Firebase, falling back to mock store:", error);
    }
    return mockStore.getProjects();
}

export async function getProject(id: string): Promise<Project | null> {
    try {
        if (adminDb) {
            const doc = await adminDb.collection('projects').doc(id).get();
            if (doc.exists) {
                const data = doc.data() as Partial<Project>;
                return {
                    id: doc.id,
                    name: data.name || "Unnamed Project",
                    current_health: data.current_health || "Green",
                    overall_progress: data.overall_progress || 0,
                    last_update_timestamp: data.last_update_timestamp || new Date().toISOString(),
                    accomplishments: data.accomplishments || [],
                    upcoming_steps: data.upcoming_steps || []
                } as Project;
            }
            return null;
        }
    } catch (error) {
        console.warn("Failed to fetch from Firebase, falling back to mock store:", error);
    }
    return mockStore.getProject(id) || null;
}

export async function getIngestionLogs(): Promise<any[]> {
    try {
        if (adminDb) {
            const snapshot = await adminDb.collection('ingestion_logs')
                .orderBy('timestamp', 'desc')
                .limit(50)
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
    } catch (error) {
        console.warn("Failed to fetch ingestion logs:", error);
    }
    return [];
}
