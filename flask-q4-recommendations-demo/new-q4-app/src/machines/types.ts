import { Model } from "xstate/lib/model"

export type GetEventObject<M extends Model<any, any, any>> = ReturnType<
    M["events"][keyof M["events"]]
>

export interface IReactNerAnnotation {
    label: string
    text: string
    textId: string
}
