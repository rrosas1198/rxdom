/// <reference types="vitest" />
import { resolve } from "node:path";
import type { UserConfig } from "vitest";

export default <UserConfig>{
    test: {
        include: ["src/**/__test__/**/*.spec.ts", "src/**/__test__/**/*.spec.tsx"]
    },
    resolve: {
        alias: {
            src: resolve(__dirname, "src")
        }
    }
};
