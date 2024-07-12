import type { AnalyzeResponse } from "./types.ts";
import { analyzeEndpoint } from "./consts.ts";

export const analyze = async (host: string): Promise<AnalyzeResponse> => {
  const params = new URLSearchParams({
    host,
  });

  const res = await fetch(`${analyzeEndpoint}?${params}`);

  return await res.json();
};
