const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventySass, {
        compileOptions: {
            permalink: function(contents, inputPath) {
                return (data) => data.page.filePathStem.replace(/^\/scss\//, "/css/") + ".css";
            }
        },
        sass: {
            style: "compressed",
            sourceMap: false
        }
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addWatchTarget("src/js/");

    // eleventyConfig.addPassthroughCopy("src/backend/js");
    // eleventyConfig.addWatchTarget("src/backend/js/");

    return {
        dir: {
            input: "src",
            output: "docs"
        }
    };
};