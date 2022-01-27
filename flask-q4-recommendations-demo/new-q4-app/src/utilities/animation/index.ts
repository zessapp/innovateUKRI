import { SetUpdateFn } from "react-spring"

// TODO - Can we refactor this to be a custom hook?
export const scrollToPosition = (setY: SetUpdateFn<{
    y: number;
}>, y?: number) => setY({
    y: y ? y : 0,
    reset: true,
    from: { y: window.scrollY },
    //@ts-ignore
    onFrame: props => window.scroll(0, props.y)
})