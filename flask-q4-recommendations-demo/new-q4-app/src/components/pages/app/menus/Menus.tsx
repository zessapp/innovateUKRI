import { Box } from "grommet"
import { colours } from "../../../../../config/theme"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import SecureComponent from "../SecureComponent"
import Table, { ITableRow } from "../../../common/Table"
import AppPageHeader from "../AppPageHeader"
import { deleteMenu, listMenus } from "../../../../reducers/tasks"
import { RootState } from "../../../../reducers/rootReducer"

interface IAppMenusProps {}

const AppMenus: React.FC<IAppMenusProps> = () => {
    // Get the router
    const router = useRouter()

    // Get the redux dispatch function
    const dispatch = useDispatch()

    // Fetch the menu data
    const fetchData = () => {
        try {
            dispatch(listMenus())
        } catch (error) {
            console.log("Error loading menus", error)
        }
    }

    // Select the menu data from the state
    const menuState = useSelector((state: RootState) => state.menus.data)

    // Create the table headings
    const tableHeadings = ["Name"]

    // Fetch menu data on first load
    useEffect(() => {
        fetchData()
    }, [])

    const createRows = (data: typeof menuState) => {
        const rows: ITableRow[] = []

        // eslint-disable-next-line array-callback-return
        data.map((item) => {
            rows.push({
                dataID: item.id,
                cells: [
                    {
                        value: item.name,
                    },
                ],
                onClickCallback: function () {
                    router.push(`/app/menu/${item.id}`)
                },
            })
        })

        return rows
    }

    return (
        <SecureComponent>
            <Box direction="column">
                <AppPageHeader
                    heading="Menus"
                    button={{ title: "Create", href: `new-menu` }}
                />
                <Table
                    emptyMessage="There are no menus to show."
                    headings={tableHeadings}
                    rows={createRows(menuState)}
                    actions={[
                        {
                            name: "Delete",
                            actionProps: {
                                color: `${colours.errorRed} !important`,
                                hoverIndicator: {
                                    color: `${colours.brandGrey7}80`,
                                },
                            },
                            callback: function (dataID: string) {
                                dispatch(deleteMenu(dataID))
                            },
                        },
                    ]}
                />
            </Box>
        </SecureComponent>
    )
}

export default AppMenus
