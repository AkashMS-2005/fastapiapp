import api from "./api";

import type { Job } from "../types/job";

class JobService {

    async getJobs(): Promise<Job[]> {

        const response = await api.get<Job[]>("/job/");

        return response.data;

    }

    async getJobById(id: number): Promise<Job> {

        const response = await api.get<Job>(`/job/${id}`);

        return response.data;

    }

    async createJob(job: Job): Promise<Job> {

        const response = await api.post<Job>(
            "/job/",
            job
        );

        return response.data;

    }

    async updateJob(
        id: number,
        job: Job
    ): Promise<Job> {

        const response = await api.put<Job>(
            `/job/${id}`,
            job
        );

        return response.data;

    }

    async deleteJob(id: number): Promise<void> {

        await api.delete(
            `/job/${id}`
        );

    }

}

export default new JobService();