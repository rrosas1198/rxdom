import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: ["src/index.ts"],
    declaration: true,
    alias: {
        src: resolve(__dirname, "src")
    },
    rollup: {
        emitCJS: true,
        esbuild: { target: "es2020" },
        output: { inlineDynamicImports: true }
    }
});
