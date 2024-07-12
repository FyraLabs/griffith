# griffith

A Deno CLI tool providing a bulk interface to the MDN Web Observatory, using a
provided zonefile. Please note that this tool can't handle wildcard records.

## Usage

First, download your domain's zonefile from your DNS provider.

Then simply:

```bash
deno run -A main.ts myzonefile.txt
```

## TODO (contributors wanted!)

- Binary distribution
