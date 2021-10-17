import type { Options } from "tsup";

export const tsup: Options = {
  splitting: true,
  sourcemap: true,
  clean: false,
  entryPoints: ["src/core/index.tsx"],
  dts: true,
  format: [],
};
