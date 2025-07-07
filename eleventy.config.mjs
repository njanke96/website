import path from "node:path";
import * as sass from "sass";

export default function (eleventyConfig) {
  // static files
  eleventyConfig.addPassthroughCopy("**/assets/*");
  eleventyConfig.addPassthroughCopy("**/*.css");

  // scss
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      const result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || ".",
          this.config.dir.includes,
        ],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (_data) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addTemplateFormats("scss");
}
