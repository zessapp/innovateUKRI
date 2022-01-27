export const colours = {
    zessYellow: "#ECD561",
    healthyGreen: "#26A956",
    healthyGreenTint: "#67cb8c",
    healthyGreenShade: "#186a36",
    errorRed: "#DB4E38",
    deepGreen: "#0F3423",
    deepGreen2: "#224435",
    deepGreen3: "#355446",
    deepGreen4: "#496558",
    deepGreen5: "#5C7569",
    lightGreen: "#F4F5F1",
    softGreen: "#E1EBD3",
    darkGreen: "#263423",
    yellow: "#EDD657",
    black: "#11190F",
    brandBlack: "#040F02",
    brandGrey1: "#29332D",
    brandGrey2: "#454D48",
    brandGrey3: "#738078",
    brandGrey4: "#8D9991",
    brandGrey5: "#A8B3AC",
    brandGrey6: "#C2CCC5",
    brandGrey7: "#EBF2ED",
    grey1: "#333333",
    grey2: "#4D4D4D",
    grey3: "#808080",
    grey4: "#999999",
    grey5: "#B3B3B3",
    grey6: "#CCCCCC",
    grey7: "#ECECEC",
    grey8: "#F2F2F2",
    zessWhite: "#fffff3",
    white: "#FFFFFF",
}

export const theme = {
    button: {
        size: {
            small: {
                border: {
                    radius: "100rem",
                },
                pad: {
                    vertical: "clamp(10px, 0.5rem, 0.5rem)",
                    horizontal: "clamp(20px, 1rem, 1rem)",
                },
            },
            medium: {
                border: {
                    radius: "100rem",
                },
                pad: {
                    vertical: "clamp(12px, 0.7rem, 0.7rem)",
                    horizontal: "clamp(24px, 2rem, 2rem)",
                },
            },
            large: {
                border: {
                    radius: "100rem",
                },
                pad: {
                    vertical: "clamp(16px, 0.9rem, 0.9rem)",
                    horizontal: "clamp(32px, 3rem, 3rem)",
                },
            },
        },
        primary: {
            background: {
                color: {
                    dark: colours.zessYellow,
                    light: colours.healthyGreen,
                },
            },
        },
        default: {
            background: {
                color: { dark: "transparent", light: "transparent" },
            },
        },
        color: { dark: "white", light: "white" },
        border: {
            width: "2px",
            // "radius": "1.2rem"
        },
    },
    global: {
        colors: {
            brand: colours.healthyGreen,
            brandTint: colours.healthyGreen,
            brandShade: colours.healthyGreen,
            black: colours.black,
            active: "transparent",
            border: {
                light: colours.grey5,
                dark: colours.grey3,
            },
            focus: "transparent",
            placeholder: colours.brandGrey4,
            text: {
                light: colours.brandBlack,
                dark: colours.brandGrey7,
            },
            ...colours,
        },
        breakpoints: {
            small: {
                value: 768, // 12
            },
            medium: {
                value: 1280, // 20
            },
            large: {
                value: 1600, // 25
            },
            xlarge: {
                value: 2560,
            },
        },
        font: {
            family: "GT Walsheim Pro, sans-serif",
            height: "1.3rem",
            size: "1rem",
        },
        edgeSize: {
            none: "0px",
            hair: "1px",
            xxsmall: "0.125rem",
            xsmall: "0.25rem",
            small: "0.5rem",
            medium: "1rem",
            large: "2rem",
            xlarge: "4rem",
            xxlarge: "6rem",
            xxxlarge: "8rem",
            responsiveBreakpoint: "small",
        },
        control: {
            border: {
                radius: "0.3rem",
            },
        },
        input: {
            font: {
                height: "2.5rem",
            },
            padding: {
                horizontal: "1rem",
                vertical: "0rem",
            },
            extend: () => `
            border: none;
            color: ${theme.global.colors.deepGreen};
            background : ${theme.global.colors.grey7};
        `,
        },
    },

    font: {
        family: "GT Walsheim Pro, sans-serif",
        height: "1.3rem",
        maxWidth: "432px",
        size: "1rem",
    },
    heading: {
        font: {
            family: "Larken, sans-serif",
        },
        level: {
            "1": {
                xxsmall: {
                    size: "0.6rem",
                    height: "1rem",
                    maxWidth: "auto",
                },
                xsmall: {
                    size: "0.8rem",
                    height: "1.1rem",
                    maxWidth: "auto",
                },
                small: {
                    size: "0.9rem",
                    height: "1.2rem",
                    maxWidth: "auto",
                },
                medium: {
                    size: "1rem",
                    height: "1.6rem",
                    maxWidth: "auto",
                },
                large: {
                    size: "1.2rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xlarge: {
                    size: "1.4rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xxlarge: {
                    size: "1.7rem",
                    height: "2.3rem",
                    maxWidth: "auto",
                },
                xxxlarge: {
                    size: "2rem",
                    height: "2.5rem",
                    maxWidth: "auto",
                },
                superlarge: {
                    size: "2.3rem",
                    height: "2.95rem",
                    maxWidth: "auto",
                },
                megalarge: {
                    size: "2.6rem",
                    height: "3.35rem",
                    maxWidth: "auto",
                },
                ultralarge: {
                    size: "3rem",
                    height: "3.9rem",
                    maxWidth: "auto",
                },
            },
            "2": {
                xxsmall: {
                    size: "0.6rem",
                    height: "1rem",
                    maxWidth: "auto",
                },
                xsmall: {
                    size: "0.8rem",
                    height: "1.1rem",
                    maxWidth: "auto",
                },
                small: {
                    size: "0.9rem",
                    height: "1.2rem",
                    maxWidth: "auto",
                },
                medium: {
                    size: "1rem",
                    height: "1.6rem",
                    maxWidth: "auto",
                },
                large: {
                    size: "1.2rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xlarge: {
                    size: "1.4rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xxlarge: {
                    size: "1.7rem",
                    height: "2.3rem",
                    maxWidth: "auto",
                },
                xxxlarge: {
                    size: "2rem",
                    height: "2.5rem",
                    maxWidth: "auto",
                },
                superlarge: {
                    size: "2.3rem",
                    height: "2.95rem",
                    maxWidth: "auto",
                },
                megalarge: {
                    size: "2.6rem",
                    height: "3.35rem",
                    maxWidth: "auto",
                },
                ultralarge: {
                    size: "3rem",
                    height: "3.9rem",
                    maxWidth: "auto",
                },
            },
            "3": {
                xxsmall: {
                    size: "0.6rem",
                    height: "1rem",
                    maxWidth: "auto",
                },
                xsmall: {
                    size: "0.8rem",
                    height: "1.1rem",
                    maxWidth: "auto",
                },
                small: {
                    size: "0.9rem",
                    height: "1.2rem",
                    maxWidth: "auto",
                },
                medium: {
                    size: "1rem",
                    height: "1.6rem",
                    maxWidth: "auto",
                },
                large: {
                    size: "1.2rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xlarge: {
                    size: "1.4rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xxlarge: {
                    size: "1.7rem",
                    height: "2.3rem",
                    maxWidth: "auto",
                },
                xxxlarge: {
                    size: "2rem",
                    height: "2.5rem",
                    maxWidth: "auto",
                },
                superlarge: {
                    size: "2.3rem",
                    height: "2.95rem",
                    maxWidth: "auto",
                },
                megalarge: {
                    size: "2.6rem",
                    height: "3.35rem",
                    maxWidth: "auto",
                },
                ultralarge: {
                    size: "3rem",
                    height: "3.9rem",
                    maxWidth: "auto",
                },
            },
            "4": {
                xxsmall: {
                    size: "0.6rem",
                    height: "1rem",
                    maxWidth: "auto",
                },
                xsmall: {
                    size: "0.8rem",
                    height: "1.1rem",
                    maxWidth: "auto",
                },
                small: {
                    size: "0.9rem",
                    height: "1.2rem",
                    maxWidth: "auto",
                },
                medium: {
                    size: "1rem",
                    height: "1.6rem",
                    maxWidth: "auto",
                },
                large: {
                    size: "1.2rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xlarge: {
                    size: "1.4rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xxlarge: {
                    size: "1.7rem",
                    height: "2.3rem",
                    maxWidth: "auto",
                },
                xxxlarge: {
                    size: "2rem",
                    height: "2.5rem",
                    maxWidth: "auto",
                },
                superlarge: {
                    size: "2.3rem",
                    height: "2.95rem",
                    maxWidth: "auto",
                },
                megalarge: {
                    size: "2.6rem",
                    height: "3.35rem",
                    maxWidth: "auto",
                },
                ultralarge: {
                    size: "3rem",
                    height: "3.9rem",
                    maxWidth: "auto",
                },
            },
            "5": {
                xxsmall: {
                    size: "0.6rem",
                    height: "1rem",
                    maxWidth: "auto",
                },
                xsmall: {
                    size: "0.8rem",
                    height: "1.1rem",
                    maxWidth: "auto",
                },
                small: {
                    size: "0.9rem",
                    height: "1.2rem",
                    maxWidth: "auto",
                },
                medium: {
                    size: "1rem",
                    height: "1.6rem",
                    maxWidth: "auto",
                },
                large: {
                    size: "1.2rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xlarge: {
                    size: "1.4rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xxlarge: {
                    size: "1.7rem",
                    height: "2.3rem",
                    maxWidth: "auto",
                },
                xxxlarge: {
                    size: "2rem",
                    height: "2.5rem",
                    maxWidth: "auto",
                },
                superlarge: {
                    size: "2.3rem",
                    height: "2.95rem",
                    maxWidth: "auto",
                },
                megalarge: {
                    size: "2.6rem",
                    height: "3.35rem",
                    maxWidth: "auto",
                },
                ultralarge: {
                    size: "3rem",
                    height: "3.9rem",
                    maxWidth: "auto",
                },
            },
            "6": {
                xxsmall: {
                    size: "0.6rem",
                    height: "1rem",
                    maxWidth: "auto",
                },
                xsmall: {
                    size: "0.8rem",
                    height: "1.1rem",
                    maxWidth: "auto",
                },
                small: {
                    size: "0.9rem",
                    height: "1.2rem",
                    maxWidth: "auto",
                },
                medium: {
                    size: "1rem",
                    height: "1.6rem",
                    maxWidth: "auto",
                },
                large: {
                    size: "1.2rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xlarge: {
                    size: "1.4rem",
                    height: "1.8rem",
                    maxWidth: "auto",
                },
                xxlarge: {
                    size: "1.7rem",
                    height: "2.3rem",
                    maxWidth: "auto",
                },
                xxxlarge: {
                    size: "2rem",
                    height: "2.5rem",
                    maxWidth: "auto",
                },
                superlarge: {
                    size: "2.3rem",
                    height: "2.95rem",
                    maxWidth: "auto",
                },
                megalarge: {
                    size: "2.6rem",
                    height: "3.35rem",
                    maxWidth: "auto",
                },
                ultralarge: {
                    size: "3rem",
                    height: "3.9rem",
                    maxWidth: "auto",
                },
            },
        },
        responsiveBreakpoint: "small",
        weight: 600,
    },
    text: {
        xxsmall: {
            size: "0.6rem",
            height: "1rem",
            maxWidth: "auto",
        },
        xsmall: {
            size: "0.8rem",
            height: "1.1rem",
            maxWidth: "auto",
        },
        small: {
            size: "0.9rem",
            height: "1.2rem",
            maxWidth: "auto",
        },
        medium: {
            size: "1rem",
            height: "1.6rem",
            maxWidth: "auto",
        },
        large: {
            size: "1.2rem",
            height: "1.8rem",
            maxWidth: "auto",
        },
        xlarge: {
            size: "1.4rem",
            height: "1.8rem",
            maxWidth: "auto",
        },
        xxlarge: {
            size: "1.7rem",
            height: "2.3rem",
            maxWidth: "auto",
        },
        xxxlarge: {
            size: "2rem",
            height: "2.5rem",
            maxWidth: "auto",
        },
        superlarge: {
            size: "2.3rem",
            height: "2.95rem",
            maxWidth: "auto",
        },
        megalarge: {
            size: "2.6rem",
            height: "3.35rem",
            maxWidth: "auto",
        },
        ultralarge: {
            size: "3rem",
            height: "3.9rem",
            maxWidth: "auto",
        },
    },
    select: {
        background: "#ececec",
        control: {
            extend: () => `
            border: none;
        `,
        },
    },
    formField: {
        round: "0.3rem",
        border: {
            color: "transparent",
        },
        extend: () => `

            label {
                font-weight: 500;
                color: ${theme.global.colors.brandBlack};
            }

            div {
                border-radius: 0.3rem;
            }

            input, textarea {
                font-weight: 500;
            }
        `,
        disabled: {
            background: "#ececec",
        },
        focus: {
            background: "#ececec",
            border: {
                color: "transparent",
            },
        },
        error: {
            color: "errorRed",
        },
        label: {
            margin: {
                vertical: "small",
                horizontal: "none",
            },
        },
    },
    textInput: {},
    paragraph: {
        xxsmall: {
            size: "0.6rem",
            height: "1rem",
            maxWidth: "auto",
        },
        xsmall: {
            size: "0.8rem",
            height: "1.1rem",
            maxWidth: "auto",
        },
        small: {
            size: "0.9rem",
            height: "1.2rem",
            maxWidth: "auto",
        },
        medium: {
            size: "1rem",
            height: "1.6rem",
            maxWidth: "auto",
        },
        large: {
            size: "1.2rem",
            height: "1.8rem",
            maxWidth: "auto",
        },
        xlarge: {
            size: "1.4rem",
            height: "1.8rem",
            maxWidth: "auto",
        },
        xxlarge: {
            size: "1.7rem",
            height: "2.3rem",
            maxWidth: "auto",
        },
        xxxlarge: {
            size: "2rem",
            height: "2.5rem",
            maxWidth: "auto",
        },
        superlarge: {
            size: "2.3rem",
            height: "2.95rem",
            maxWidth: "auto",
        },
        megalarge: {
            size: "2.6rem",
            height: "3.35rem",
            maxWidth: "auto",
        },
        ultralarge: {
            size: "3rem",
            height: "3.9rem",
            maxWidth: "auto",
        },
    },
    table: {
        // "header": {
        //     "extend": {
        //         "border": "none",
        //     }
        // },
        // "extend": (props) => `
        // display:flex;
        // tr, th, td, thead, tbody {
        //     display:flex;
        // }`
    },
    menu: {
        extend: () => `

        padding: 1rem 0;

        button {
            padding: 0 1rem;
        }
    `,
    },
}

export type ZessTheme = typeof theme

export default theme
