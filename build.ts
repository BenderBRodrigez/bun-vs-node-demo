import path from "node:path";
import svgr from "bun-plugin-svgr";
import tailwind from "bun-plugin-tailwind";

const outdir = path.join(process.cwd(), "dist");
await Bun.$`rm -rf ${outdir}`;

const start = performance.now();
const result = await Bun.build({
  entrypoints: ["serve.ts"],
  outdir,
  plugins: [tailwind, svgr],
  minify: true,
  target: "bun",
  sourcemap: "linked",
  env: "BUN_PUBLIC_*",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

if (!result.success) {
	for (const log of result.logs) console.error(log);
	process.exit(1);
}

for (const output of result.outputs) {
	const rel = path.relative(process.cwd(), output.path);
	console.log(` ${rel}  ${(output.size / 1024).toFixed(1)} KB`);
}

console.log(`\nDone in ${Math.round(performance.now() - start)}ms`);
