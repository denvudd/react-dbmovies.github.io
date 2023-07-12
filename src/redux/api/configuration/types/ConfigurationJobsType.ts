export type ConfigurationJobsApiResponse = ConfigurationJob[];

export interface ConfigurationJob {
  department: string;
  jobs: string[];
}