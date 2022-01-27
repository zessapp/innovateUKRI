// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AnnotationTask, AnnotationTaskCollection } = initSchema(schema);

export {
  AnnotationTask,
  AnnotationTaskCollection
};