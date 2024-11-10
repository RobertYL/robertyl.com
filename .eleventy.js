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

    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/pdf");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addWatchTarget("src/js/");

    // eleventyConfig.addPassthroughCopy("src/backend/js");
    // eleventyConfig.addWatchTarget("src/backend/js/");

    // for linking exam materials
    eleventyConfig.addShortcode("exam", (id, ...files) => files.map(x=>`
        [[${x}]](/assets/pdf/${id}/${x[0].toUpperCase()}${x.slice(1)}.pdf) 
    `.trim()).join(" "));

    return {
        dir: {
            input: "src",
            output: "docs"
        }
    };
};