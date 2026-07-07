import api from "./api";

import type {
  ResumeResponse,
  SemanticSearchResponse,
  RagSearchResponse,
  JobMatchResponse,
  EmbedResponse,
} from "../types/rag";

class RagService {

  analyseResume(resume_text: string) {
    return api.post<ResumeResponse>(
      "/rag/analyse-resume",
      {
        resume_text,
      }
    );
  }

  semanticSearch(query: string) {
    return api.post<SemanticSearchResponse>(
      "/rag/search",
      {
        query,
      }
    );
  }

  askAI(question: string) {
    return api.post<RagSearchResponse>(
      "/rag/ask",
      {
        question,
      }
    );
  }

  // ✅ Fixed
  jobMatch(
    skills: string[],
    experience: number
  ) {

    return api.post<JobMatchResponse>(
      "/rag/job-match",
      {
        skills: skills.join(", "),        // convert array -> string
        experience: experience.toString() // convert number -> string
      }
    );

  }

  embedJobs() {
    return api.post<EmbedResponse>(
      "/rag/embed-jobs"
    );
  }

}

export default new RagService();