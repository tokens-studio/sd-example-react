import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

register(StyleDictionary);

const generateConfig = (name, sources, buildPath = ".cache/tokens/") => {
  return {
    source: sources,
    platforms: {
      css: {
        preprocessors: ["tokens-studio"],
        transformGroup: "tokens-studio",
        transforms: ["size/pxToRem", "shadow/css/shorthand", "name/kebab"],
        buildPath: buildPath,
        files: [
          {
            destination: `${name}.css`,
            format: "css/variables",
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        preprocessors: ["tokens-studio"],
        transformGroup: "tokens-studio",
        transforms: ["size/pxToRem", "shadow/css/shorthand", "name/pascal"],
        buildPath: buildPath,
        files: [
          {
            format: "javascript/esm",
            destination: `${name}.js`,
            options: {
              outputReferences: true,
            },
          },
          {
            format: "typescript/module-declarations",
            destination: `${name}.d.ts`,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
};

const configs = {
  light: generateConfig("light", [
    "tokens/core.json",
    "tokens/light.json",
    "tokens/theme.json",
  ]),
  dark: generateConfig("dark", [
    "tokens/core.json",
    "tokens/dark.json",
    "tokens/theme.json",
  ]),
};

export const buildTokens = async () => {
  for (const cfg of Object.values(configs)) {
    const sd = new StyleDictionary(cfg);
    await sd.buildAllPlatforms();
  }
};

if (import.meta.url === import.meta.resolve(process.argv[1])) {
  buildTokens();
}
