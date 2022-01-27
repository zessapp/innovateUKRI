module.exports = (() => {
    let presets

    if (require.main.path.match(/\/node_modules\/next\//)) {
        presets = ["next/babel"]
    } else {
        presets = ["next/babel", "@babel/preset-env", "@babel/preset-react"]
    }
    return {
        presets: presets,
        plugins: [
            [
                "styled-components",
                {
                    ssr: true,
                    displayName: true,
                    preprocess: false,
                },
            ],
        ],
    }
})()
