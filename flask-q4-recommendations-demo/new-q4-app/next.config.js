//const withImages = require('next-images')
const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")
const withTM = require("next-transpile-modules")([
    // "react-nlp-annotate",
    // "universal-data-tool",
    // "react-nlp-annotate",
    // "react-material-workspace-layout",
    // "react-image-annotate",
])

module.exports = withPlugins([
    [
        optimizedImages,
        {
            /* config for next-optimized-images */
            optimizeImagesInDev: true,
            handleImages: ["jpeg", "png", "svg", "webp", "gif"],
        },
    ],
    [withTM],
    {
        // ...
    },
    // your other plugins here
])
