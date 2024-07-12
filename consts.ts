import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/colors.ts";

export const validRecordTypes = new Set(["A", "AAAA", "CNAME"]);

const yellowGreen = (str: string) => colors.rgb8(str, 155);
const orange = (str: string) => colors.rgb8(str, 179);

export const gradeColors = {
  "A+": colors.brightGreen,
  A: colors.brightGreen,
  "A-": colors.brightGreen,
  "B+": yellowGreen,
  B: yellowGreen,
  "B-": yellowGreen,
  "C+": colors.yellow,
  C: colors.yellow,
  "C-": colors.yellow,
  "D+": orange,
  D: orange,
  "D-": orange,
  F: colors.red,
};

export const analyzeEndpoint =
  "https://observatory-api.mdn.mozilla.net/api/v2/analyze";
