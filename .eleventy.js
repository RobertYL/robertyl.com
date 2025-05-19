const eleventySass = require("eleventy-sass");
const katex = require("katex");

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

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addWatchTarget("src/js/");

    eleventyConfig.addPassthroughCopy("src/browserconfig.xml");
    eleventyConfig.addPassthroughCopy("src/site.webmanifest");

    // eleventyConfig.addPassthroughCopy("src/backend/js");
    // eleventyConfig.addWatchTarget("src/backend/js/");

    // for linking exam materials
    eleventyConfig.addShortcode("exam", (id, ...files) => files.map(x=>`
        [[${x}]](/assets/pdf/${id}/${x[0].toUpperCase()}${x.slice(1)}.pdf) 
    `.trim()).join(" "));

    // for LaTeX support with KaTeX
    eleventyConfig.addFilter("katex", (content) => {
        return content.replace(/\$\$([\S\s]+?)\$\$/g, (_, equation) => {
            const cleanEquation = equation.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

            return katex.renderToString(cleanEquation, {
                throwOnError: false,
                displayMode: true,
            });
        }).replace(/\$(.+?)\$/g, (_, equation) => {
            const cleanEquation = equation.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

            return katex.renderToString(cleanEquation, {
                throwOnError: false,
                displayMode: false,
            });
        });
    });

    return {
        dir: {
            input: "src",
            output: "docs",
        }
    };
};