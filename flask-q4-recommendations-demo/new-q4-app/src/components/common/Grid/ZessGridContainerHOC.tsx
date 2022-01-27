import ZessGridContainer from "./ZessGridContainer"

export default function ZessGridContainerHOC() {
    return (
        <ZessGridContainer
            positions={{
                small: {
                    start: 1,
                    end: 2,
                },
                medium: {
                    start: 1,
                    end: 2,
                },
                large: {
                    start: 1,
                    end: 2,
                },
                xlarge: {
                    start: 1,
                    end: 2,
                },
            }}
        />
    )
}
