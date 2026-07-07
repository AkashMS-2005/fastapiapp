export interface ResumeRequest {
  resume_text: string;
}

export interface ResumeResponse {
  analysis: string;
}

export interface RagSearchRequest {
  question: string;
}

export interface RagSearchResponse {
  answer: string;
}

export interface JobSearchRequest {
  query: string;
}

export interface SemanticSearchResult {

    job_id?: number;

    title: string;

    description: string;

    salary?: number;

    score: number;

}

export interface SemanticSearchResponse {
  results: SemanticSearchResult[];
}

export interface JobMatchRequest {
  skills: string[];
  experience: number;
}

export interface JobMatchResult {
    job_id?: number;
    title: string;
    description: string;
    salary?: number;
    match_score: number;
}

export interface JobMatchResponse {
    matches: JobMatchResult[];
}
export interface EmbedResponse {
  message: string;
  count: number;
}