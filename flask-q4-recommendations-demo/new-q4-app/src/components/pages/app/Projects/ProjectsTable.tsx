import { Box } from "grommet"
import { useContext, FC } from "react"
import { useRouter } from "next/router"
import Table, { ITableRow } from "../../../common/Table"
import { AnnotationProject } from "src/API"
import { ProjectsMachineContext } from "src/machines/projects"

interface IAppMenusProps {}

const ProjectsTable: FC<IAppMenusProps> = () => {
    // Get the router
    const router = useRouter()

    const state = useContext(ProjectsMachineContext)

    const createRows = (data: AnnotationProject[]) => {
        const rows: ITableRow[] = []

        const enUKFormatter = new Intl.DateTimeFormat("en-UK", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Europe/London",
            timeZoneName: "short",
        })

        // eslint-disable-next-line array-callback-return
        data.map((item) => {
            rows.push({
                dataID: item.id,
                cells: [
                    {
                        value: item.title,
                    },
                    {
                        value: `${item.tasks_completed}/${item.total_tasks}`,
                    },
                    {
                        value: enUKFormatter.format(new Date(item.createdAt)),
                    },
                    {
                        value: enUKFormatter.format(new Date(item.createdAt)),
                    },
                ],
                onClickCallback: function () {
                    router.push(`/project/${item.id}`)
                },
            })
        })

        return rows
    }

    // Create the table headings
    const tableHeadings = [
        "Title",
        "Tasks Completed",
        "Created At",
        "Updated At",
    ]

    return (
        <Box>
            <Box direction="column">
                <Table
                    emptyMessage="There are no projects to show."
                    headings={tableHeadings}
                    rows={createRows(state.context?.projects)}
                />
            </Box>
        </Box>
    )
}

export default ProjectsTable
