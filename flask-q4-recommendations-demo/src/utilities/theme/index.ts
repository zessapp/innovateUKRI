import HomeIcon from "public/assets/images/icons/home-icon.svg"
import MenusIcon from "public/assets/images/icons/menus-icon.svg"
import RecipesIcon from "public/assets/images/icons/recipes-icon.svg"
import SettingsIcon from "public/assets/images/icons/settings-icon.svg"
import MinusIcon from "public/assets/images/icons/minus-icon.svg"
import PlusIcon from "public/assets/images/icons/plus-icon.svg"
import { ZessTheme } from "config/theme"
import { isEmpty } from "lodash"
import { ThemedStyledProps } from "styled-components"
import { ZessGridBreakpointType } from "src/components/common/Grid/ZessGridContext"
import { ResponsiveGridProps } from "src/components/common/Grid/ZessRepsonsiveGrid"

export type Breakpoints = keyof ZessTheme["global"]["breakpoints"]

/**
 *
 * @param theme - The theme object from the props passed into the styled component
 * @param breakpoint - the name of the breakpoint
 */
export function getBreakpoint(
    theme: ZessTheme,
    breakpoint: Breakpoints
): number {
    if (!isEmpty(theme.global.breakpoints[breakpoint])) {
        const castedBreakpoint = theme.global.breakpoints[breakpoint] as {
            value: number
        }
        return castedBreakpoint.value
    }
}

/**
 *
 * @param theme - The theme object from the props passed into the styled component
 * @param size - The font style
 */
export function getFontSize(
    theme: ZessTheme,
    size: keyof ZessTheme["heading"]["level"]["1"]
): string {
    return theme.heading.level["1"][size]?.size
}

/**
 *
 * @param theme - The theme object from the props passed into the styled component
 * @param size - The font style
 */
export function getEdgeStyle(
    theme: ZessTheme,
    size: keyof ZessTheme["global"]["edgeSize"] | string
): string {
    return theme.global.edgeSize[size] ? theme.global.edgeSize[size] : size
}

// The grommet edgeStyle types are used for the padding sizes.
// The padding sizes include 'px' e.g '24px'.
// This function is used to get the value e.g '24'
export const getEdgeStyleValue = (edgeStyle: string): number => {
    try {
        // Remove the last 2 chars e.g (px, em, vh, vw etc..)
        const cleanedString = edgeStyle.replace(/ \w{2}$/, "")
        return parseInt(cleanedString)
    } catch (e) {
        throw new Error("Failed to parse the integer in getEdgeStyleValue()")
    }
}

interface StringTransformer {
    (string: string): string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function applyStringTransformations(
    originalString: string,
    transformers: StringTransformer[]
): string {
    let transformedString: string = originalString

    transformers.forEach((transformer: StringTransformer) => {
        transformedString = transformer(transformedString)
    })

    return transformedString
}

export type BreakpointObject<O = Object> = keyof O extends Breakpoints
    ? O
    : never

type BreakpointCSS = {
    small: string
    medium: string
    large: string
    xlarge: string
}

function createGridBreakpoints<O extends { [key: string]: string }>(
    theme: ZessTheme,
    breakpointCss: BreakpointObject<O>
): string {
    // We want the final breakpoints to be built in this order ["small", "medium", "large", "xlarge"]
    const mapBreakpointToIndexOrder = {
        small: 0,
        medium: 1,
        large: 2,
        xlarge: 3,
    }

    const breakpointsCssResponses: string[] = []

    const breakpoints = Object.keys(breakpointCss) as Breakpoints[]

    for (let index = 0; index < breakpoints.length; index++) {
        const breakpoint = breakpoints[index]

        if (breakpoint in mapBreakpointToIndexOrder) {
            const targetIndex: number = mapBreakpointToIndexOrder[breakpoint]

            // If mobile then just print out the CSS without a breakpoint as the first item in the array
            if (targetIndex === 0) {
                breakpointsCssResponses[targetIndex] = breakpointCss[breakpoint]
            } else {
                breakpointsCssResponses[targetIndex] = `
                @media only screen and (min-width: ${
                    getBreakpoint(theme, breakpoints[index - 1]) + 1
                }px) {
                ${breakpointCss[breakpoint]}
            }`
            }
        }
    }

    return breakpointsCssResponses.reduce(
        (previousCss: string, currentCss: string) => {
            return `${previousCss}${currentCss}`
        }
    )
}

export function generateZessGridBreakpoints<P>(
    props: ThemedStyledProps<P, ZessTheme>,
    zessGridColumns: ZessGridBreakpointType
) {
    const breakpoints = Object.keys(zessGridColumns) as [Breakpoints]

    // eslint-disable-next-line prefer-const
    let gridBreakpointsCss: BreakpointObject<BreakpointCSS> = {
        small: "",
        medium: "",
        large: "",
        xlarge: "",
    }

    for (let index = 0; index < breakpoints.length; index++) {
        const currentBreakpoint: Breakpoints = breakpoints[index]

        const columnCount = zessGridColumns[currentBreakpoint]

        gridBreakpointsCss[
            currentBreakpoint
        ] = `grid-template-columns: repeat(${columnCount}, ${
            100 / columnCount
        }vw);`
    }

    return createGridBreakpoints(props.theme, gridBreakpointsCss)
}

interface GridGaps {
    gridGap: string
    columnGap: string
    rowGap: string
}

export function generateZessGridGap<
    P extends ThemedStyledProps<ResponsiveGridProps, ZessTheme>
>(
    gridCss: string,
    componentProps: P,
    gridGapKey: keyof GridGaps,
    theme: ZessTheme
) {
    const gridGapCssStatement = {
        gridGap: "gap",
        columnGap: "column-gap",
        rowGap: "row-gap",
    }

    // Grid gaps
    gridCss = `${gridCss}
            ${
                gridGapKey &&
                `${gridGapCssStatement[gridGapKey]}: ` +
                    getEdgeStyle(theme, componentProps[gridGapKey])
            };
            `

    return gridCss
}

export function generateZessResponsiveGridBreakpoints<
    P extends ThemedStyledProps<ResponsiveGridProps, ZessTheme>
>(componentPropsWithTheme: P) {
    // eslint-disable-next-line prefer-const
    let gridBreakpointsCss: BreakpointObject<BreakpointCSS> = {
        small: "",
        medium: "",
        large: "",
        xlarge: "",
    }

    const breakpoints = Object.keys(gridBreakpointsCss) as [Breakpoints]

    for (let index = 0; index < breakpoints.length; index++) {
        const currentBreakpoint: Breakpoints = breakpoints[index]

        gridBreakpointsCss[currentBreakpoint] = generateZessResponsiveGridCss(
            componentPropsWithTheme,
            currentBreakpoint
        )
    }

    return createGridBreakpoints(
        componentPropsWithTheme.theme,
        gridBreakpointsCss
    )
}

export function generateZessResponsiveGridCss<
    P extends ThemedStyledProps<ResponsiveGridProps, ZessTheme>
>(componentPropsWithTheme: P, viewport: string) {
    /**
     * TODO - Break this into smaller functions
     */
    let gridCss: string = ""

    const theme: ZessTheme = componentPropsWithTheme.theme

    // eslint-disable-next-line prefer-const
    let gridTemplate: {
        rows: keyof ZessTheme["global"]["edgeSize"][] | string[] | []
        columns: keyof ZessTheme["global"]["edgeSize"][] | string[] | []
    } = {
        rows: [],
        columns: [],
    }

    for (const gridTemplateKey in gridTemplate) {
        if (
            Object.prototype.hasOwnProperty.call(gridTemplate, gridTemplateKey)
        ) {
            const gridTemplateItem:
                | ResponsiveGridProps["responsiveGrid"][Breakpoints]["rows"]
                | ResponsiveGridProps["responsiveGrid"][Breakpoints]["columns"] =
                componentPropsWithTheme.responsiveGrid[viewport][
                    gridTemplateKey
                ]

            if (gridTemplateItem) {
                // Get the number of columns or rows from the component
                const gridTemplateItemCount = gridTemplateItem.length

                // Get the number of columns or rows from the component
                gridTemplate[gridTemplateKey] = gridTemplateItem.reduce(
                    (prevString, currentString, index) => {
                        if (index + 1 < gridTemplateItemCount) {
                            return `${prevString}${getEdgeStyle(
                                theme,
                                currentString
                            )} `
                        } else {
                            return `${prevString}${getEdgeStyle(
                                theme,
                                currentString
                            )};`
                        }
                    },
                    `grid-template-${gridTemplateKey}:`
                )
            } else {
                gridTemplate[
                    gridTemplateKey
                ] = `grid-auto-${gridTemplateKey}: minmax(5rem, auto);`
            }
        }
        gridCss = `${gridCss}
        ${gridTemplate[gridTemplateKey]}
        `
    }

    // Grid template areas
    gridCss = `${gridCss}
    grid-template-areas: ${componentPropsWithTheme.responsiveGrid[viewport].areas};
    `
    // Grid gaps
    gridCss = componentPropsWithTheme.responsiveGrid[viewport].gridGap
        ? generateZessGridGap(
              gridCss,
              componentPropsWithTheme.responsiveGrid[viewport],
              "gridGap",
              componentPropsWithTheme.theme
          )
        : gridCss
    gridCss = componentPropsWithTheme.responsiveGrid[viewport].columnGap
        ? generateZessGridGap(
              gridCss,
              componentPropsWithTheme.responsiveGrid[viewport],
              "columnGap",
              componentPropsWithTheme.theme
          )
        : gridCss
    gridCss = componentPropsWithTheme.responsiveGrid[viewport].rowGap
        ? generateZessGridGap(
              gridCss,
              componentPropsWithTheme.responsiveGrid[viewport],
              "rowGap",
              componentPropsWithTheme.theme
          )
        : gridCss

    return gridCss
}

interface IIcons {
    [key: string]: string
}

export const Icons: IIcons = {
    home: HomeIcon,
    menus: MenusIcon,
    recipes: RecipesIcon,
    settings: SettingsIcon,
    minus: MinusIcon,
    plus: PlusIcon,
}

/*

TODO - Fluid layouts

    1. Typographic heirachy is defined by EMs with the base font specified as a ratio of the browser (VW)
        - Headings
    2. Each component should describe how it should respond to aspect rations
        - How does the layout change based on the aspect ratio?
        - Should the layout stop growing horizontaly at a maximum aspect ratio?
        - Should the layout stop growing verticaly at a maximum aspect ratio?
        - How do we deal with images distorting with pixels?
    3. Can we create a helper function in styled components to generate the correct CSS?
        - Use clamp(min, scale, max) syntax and generate it using some inputs from the component

*/
