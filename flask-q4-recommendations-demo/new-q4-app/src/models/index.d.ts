import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class AnnotationTask {
  readonly id: string;
  readonly description: string;
  constructor(init: ModelInit<AnnotationTask>);
  static copyOf(source: AnnotationTask, mutator: (draft: MutableModel<AnnotationTask>) => MutableModel<AnnotationTask> | void): AnnotationTask;
}

export declare class AnnotationTaskCollection {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  constructor(init: ModelInit<AnnotationTaskCollection>);
  static copyOf(source: AnnotationTaskCollection, mutator: (draft: MutableModel<AnnotationTaskCollection>) => MutableModel<AnnotationTaskCollection> | void): AnnotationTaskCollection;
}