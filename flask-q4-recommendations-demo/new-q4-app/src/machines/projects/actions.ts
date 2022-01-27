import { assertEventType } from "../project/model"
import { projectsModel } from "./model"

export const saveProjects = projectsModel.assign({
    projects: (_, event) => {
        assertEventType(event, "done.invoke.getProjects")
        return event.data
    },
})
