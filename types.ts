export type HistoryPoint = {
  id: number;
  scanned_at: string;
  grade: string | null;
  score: number | null;
};

export type History = HistoryPoint[];

export type Scan = {
  id: number;
  algorithm_version: number;
  scanned_at: string;
  error: string | null;
  grade: string | null;
  response_headers: Record<string, string> | null;
  score: number | null;
  status_code: number | null;
  tests_failed: number;
  tests_passed: number;
  tests_quantity: number;
};

export type AnalysisError = {
  statusCode: number;
  error: string;
  message: string;
};

export type Test = {
  expectation: string;
  name: string;
  link: string;
  title: string;
  pass: boolean | null;
  result: string;
  score_description: string;
  recommendation: string;
  score_modifier: number;
  data: unknown;
};

export type Analysis = {
  history: History;
  scan: Scan;
  tests: Record<string, Test>;
};

export type AnalyzeResponse = Analysis | AnalysisError;
