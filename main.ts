import { parseZone } from "dnsz";
import { Table } from "https://deno.land/x/cliffy@v1.0.0-rc.4/table/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { pooledMap } from "@std/async/pool";
import { analyze } from "./lib.ts";
import { Analysis, AnalysisError, AnalyzeResponse } from "./types.ts";
import { gradeColors, validRecordTypes } from "./consts.ts";

const { args } = await new Command()
  .name("griffith")
  .version("0.1.0")
  .description("A bulk interface to the MDN Web Observatory.")
  .arguments("<zonefile:file>")
  .parse(Deno.args);

const zone = parseZone(await Deno.readTextFile(args[0]));
const hostnames = zone.records
  .filter(
    (r) =>
      r.class == "IN" && validRecordTypes.has(r.type) && !r.name.includes("*"),
  )
  .map((r) => r.name);

const responses: [string, AnalyzeResponse][] = await Array.fromAsync(
  pooledMap(
    5, // Only send 5 requests at a time
    hostnames,
    async (host) => [host, await analyze(host)],
  ),
);

const results: [string, Analysis][] = responses.filter(
  (r): r is [string, Analysis] => "scan" in r[1],
);
const errors: [string, AnalysisError][] = responses.filter(
  (r): r is [string, AnalysisError] => !("scan" in r[1]),
);

new Table()
  .header(["Host", "Tests", "Failing Tests", "Score", "Grade"])
  .body(
    results.map(([host, analysis]) => [
      host,
      `${analysis.scan.tests_passed}/${analysis.scan.tests_quantity}`,
      analysis.scan.tests_failed === 0 ? "None" : Object.values(analysis.tests)
        .filter((t) => t.pass === false)
        .map((t) => t.title)
        .join(", "),
      analysis.scan.score!,
      gradeColors[analysis.scan.grade! as keyof typeof gradeColors](
        analysis.scan.grade!,
      ),
    ]),
  )
  .padding(1)
  .border()
  .render();

if (errors.length > 0) {
  console.log(`There were ${errors.length} errors:`);
  new Table()
    .header(["Host", "Message"])
    .body(errors.map(([host, error]) => [host, error.message]))
    .padding(1)
    .border()
    .render();
}
