# griffith

A Deno CLI tool providing a bulk interface to the MDN Web Observatory, using a
provided zonefile. Please note that this tool can't handle wildcard records.

## Usage

First, obtain the tool, you can either clone this repository or
[grab a compiled version](https://nightly.link/FyraLabs/griffith/workflows/deno/main?preview).

Then, download your domain's zonefile from your DNS provider.

Finally:

```bash
# replace griffith with `deno run -A main.ts` if running from source
griffith myzonefile.txt
```
