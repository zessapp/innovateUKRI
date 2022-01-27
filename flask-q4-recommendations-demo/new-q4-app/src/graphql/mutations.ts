/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const finishNERTask = /* GraphQL */ `
  mutation FinishNERTask($task: FinishTaskInput) {
    finishNERTask(task: $task) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
          start
          end
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const finishClassificationTask = /* GraphQL */ `
  mutation FinishClassificationTask($task: FinishTaskInput) {
    finishClassificationTask(task: $task) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
          start
          end
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAnnotator = /* GraphQL */ `
  mutation CreateAnnotator(
    $input: CreateAnnotatorInput!
    $condition: ModelAnnotatorConditionInput
  ) {
    createAnnotator(input: $input, condition: $condition) {
      id
      username
      name
      email
      projects {
        items {
          id
          title
          description
          tasks_completed
          total_tasks
          task_type
          ner_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          classification_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          allergy_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          data_sources {
            items {
              id
              project_id
              data_source_id
              project {
                id
                title
                description
                tasks_completed
                total_tasks
                task_type
                assignee
                annotator_id
                createdAt
                updatedAt
              }
              data_source {
                id
                name
                description
                url
                type
                publisher
                volume_no
                issue_no
                edition
                year
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          assignee
          annotator {
            id
            username
            name
            email
            projects {
              items {
                id
                title
                description
                tasks_completed
                total_tasks
                task_type
                assignee
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          annotator_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAnnotator = /* GraphQL */ `
  mutation UpdateAnnotator(
    $input: UpdateAnnotatorInput!
    $condition: ModelAnnotatorConditionInput
  ) {
    updateAnnotator(input: $input, condition: $condition) {
      id
      username
      name
      email
      projects {
        items {
          id
          title
          description
          tasks_completed
          total_tasks
          task_type
          ner_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          classification_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          allergy_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          data_sources {
            items {
              id
              project_id
              data_source_id
              project {
                id
                title
                description
                tasks_completed
                total_tasks
                task_type
                assignee
                annotator_id
                createdAt
                updatedAt
              }
              data_source {
                id
                name
                description
                url
                type
                publisher
                volume_no
                issue_no
                edition
                year
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          assignee
          annotator {
            id
            username
            name
            email
            projects {
              items {
                id
                title
                description
                tasks_completed
                total_tasks
                task_type
                assignee
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          annotator_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnnotator = /* GraphQL */ `
  mutation DeleteAnnotator(
    $input: DeleteAnnotatorInput!
    $condition: ModelAnnotatorConditionInput
  ) {
    deleteAnnotator(input: $input, condition: $condition) {
      id
      username
      name
      email
      projects {
        items {
          id
          title
          description
          tasks_completed
          total_tasks
          task_type
          ner_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          classification_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          allergy_tasks {
            items {
              id
              project_id
              instruction {
                text
                full_instructions_url
              }
              status
              type
              metadata
              annotator_id
              tags {
                id
                name
                description
              }
              sample {
                text
              }
              issue {
                id
                notes
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          data_sources {
            items {
              id
              project_id
              data_source_id
              project {
                id
                title
                description
                tasks_completed
                total_tasks
                task_type
                assignee
                annotator_id
                createdAt
                updatedAt
              }
              data_source {
                id
                name
                description
                url
                type
                publisher
                volume_no
                issue_no
                edition
                year
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          assignee
          annotator {
            id
            username
            name
            email
            projects {
              items {
                id
                title
                description
                tasks_completed
                total_tasks
                task_type
                assignee
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          annotator_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAnnotationTaskIssueType = /* GraphQL */ `
  mutation CreateAnnotationTaskIssueType(
    $input: CreateAnnotationTaskIssueTypeInput!
    $condition: ModelAnnotationTaskIssueTypeConditionInput
  ) {
    createAnnotationTaskIssueType(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateAnnotationTaskIssueType = /* GraphQL */ `
  mutation UpdateAnnotationTaskIssueType(
    $input: UpdateAnnotationTaskIssueTypeInput!
    $condition: ModelAnnotationTaskIssueTypeConditionInput
  ) {
    updateAnnotationTaskIssueType(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnnotationTaskIssueType = /* GraphQL */ `
  mutation DeleteAnnotationTaskIssueType(
    $input: DeleteAnnotationTaskIssueTypeInput!
    $condition: ModelAnnotationTaskIssueTypeConditionInput
  ) {
    deleteAnnotationTaskIssueType(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const createAnnotationTaskIssueReason = /* GraphQL */ `
  mutation CreateAnnotationTaskIssueReason(
    $input: CreateAnnotationTaskIssueReasonInput!
    $condition: ModelAnnotationTaskIssueReasonConditionInput
  ) {
    createAnnotationTaskIssueReason(input: $input, condition: $condition) {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const updateAnnotationTaskIssueReason = /* GraphQL */ `
  mutation UpdateAnnotationTaskIssueReason(
    $input: UpdateAnnotationTaskIssueReasonInput!
    $condition: ModelAnnotationTaskIssueReasonConditionInput
  ) {
    updateAnnotationTaskIssueReason(input: $input, condition: $condition) {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnnotationTaskIssueReason = /* GraphQL */ `
  mutation DeleteAnnotationTaskIssueReason(
    $input: DeleteAnnotationTaskIssueReasonInput!
    $condition: ModelAnnotationTaskIssueReasonConditionInput
  ) {
    deleteAnnotationTaskIssueReason(input: $input, condition: $condition) {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const createAnnotationTaskIssue = /* GraphQL */ `
  mutation CreateAnnotationTaskIssue(
    $input: CreateAnnotationTaskIssueInput!
    $condition: ModelAnnotationTaskIssueConditionInput
  ) {
    createAnnotationTaskIssue(input: $input, condition: $condition) {
      id
      type {
        id
        type
        createdAt
        updatedAt
      }
      reason {
        id
        reason
        createdAt
        updatedAt
      }
      notes
      createdAt
      updatedAt
    }
  }
`;
export const updateAnnotationTaskIssue = /* GraphQL */ `
  mutation UpdateAnnotationTaskIssue(
    $input: UpdateAnnotationTaskIssueInput!
    $condition: ModelAnnotationTaskIssueConditionInput
  ) {
    updateAnnotationTaskIssue(input: $input, condition: $condition) {
      id
      type {
        id
        type
        createdAt
        updatedAt
      }
      reason {
        id
        reason
        createdAt
        updatedAt
      }
      notes
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnnotationTaskIssue = /* GraphQL */ `
  mutation DeleteAnnotationTaskIssue(
    $input: DeleteAnnotationTaskIssueInput!
    $condition: ModelAnnotationTaskIssueConditionInput
  ) {
    deleteAnnotationTaskIssue(input: $input, condition: $condition) {
      id
      type {
        id
        type
        createdAt
        updatedAt
      }
      reason {
        id
        reason
        createdAt
        updatedAt
      }
      notes
      createdAt
      updatedAt
    }
  }
`;
export const createAnnotationProject = /* GraphQL */ `
  mutation CreateAnnotationProject(
    $input: CreateAnnotationProjectInput!
    $condition: ModelAnnotationProjectConditionInput
  ) {
    createAnnotationProject(input: $input, condition: $condition) {
      id
      title
      description
      tasks_completed
      total_tasks
      task_type
      ner_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              text
              tag {
                id
                name
                description
              }
              start
              end
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      classification_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              text
              tag {
                id
                name
                description
              }
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      allergy_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              id
              tag {
                id
                name
                description
              }
              evidence {
                nextToken
              }
              createdAt
              updatedAt
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      data_sources {
        items {
          id
          project_id
          data_source_id
          project {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      assignee
      annotator {
        id
        username
        name
        email
        projects {
          items {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      annotator_id
      createdAt
      updatedAt
    }
  }
`;
export const updateAnnotationProject = /* GraphQL */ `
  mutation UpdateAnnotationProject(
    $input: UpdateAnnotationProjectInput!
    $condition: ModelAnnotationProjectConditionInput
  ) {
    updateAnnotationProject(input: $input, condition: $condition) {
      id
      title
      description
      tasks_completed
      total_tasks
      task_type
      ner_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              text
              tag {
                id
                name
                description
              }
              start
              end
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      classification_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              text
              tag {
                id
                name
                description
              }
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      allergy_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              id
              tag {
                id
                name
                description
              }
              evidence {
                nextToken
              }
              createdAt
              updatedAt
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      data_sources {
        items {
          id
          project_id
          data_source_id
          project {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      assignee
      annotator {
        id
        username
        name
        email
        projects {
          items {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      annotator_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnnotationProject = /* GraphQL */ `
  mutation DeleteAnnotationProject(
    $input: DeleteAnnotationProjectInput!
    $condition: ModelAnnotationProjectConditionInput
  ) {
    deleteAnnotationProject(input: $input, condition: $condition) {
      id
      title
      description
      tasks_completed
      total_tasks
      task_type
      ner_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              text
              tag {
                id
                name
                description
              }
              start
              end
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      classification_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              text
              tag {
                id
                name
                description
              }
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      allergy_tasks {
        items {
          id
          project_id
          instruction {
            text
            full_instructions_url
          }
          status
          type
          metadata
          annotator_id
          tags {
            id
            name
            description
          }
          sample {
            text
            annotations {
              id
              tag {
                id
                name
                description
              }
              evidence {
                nextToken
              }
              createdAt
              updatedAt
            }
          }
          issue {
            id
            type {
              id
              type
              createdAt
              updatedAt
            }
            reason {
              id
              reason
              createdAt
              updatedAt
            }
            notes
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      data_sources {
        items {
          id
          project_id
          data_source_id
          project {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      assignee
      annotator {
        id
        username
        name
        email
        projects {
          items {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      annotator_id
      createdAt
      updatedAt
    }
  }
`;
export const createAnnotationTagWithEvidence = /* GraphQL */ `
  mutation CreateAnnotationTagWithEvidence(
    $input: CreateAnnotationTagWithEvidenceInput!
    $condition: ModelAnnotationTagWithEvidenceConditionInput
  ) {
    createAnnotationTagWithEvidence(input: $input, condition: $condition) {
      id
      tag {
        id
        name
        description
      }
      evidence {
        items {
          id
          annotation_id
          citation_snippet
          last_updated
          annotator_id
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          title
          url
          year
          doi
          author
          notes
          pages_used
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAnnotationTagWithEvidence = /* GraphQL */ `
  mutation UpdateAnnotationTagWithEvidence(
    $input: UpdateAnnotationTagWithEvidenceInput!
    $condition: ModelAnnotationTagWithEvidenceConditionInput
  ) {
    updateAnnotationTagWithEvidence(input: $input, condition: $condition) {
      id
      tag {
        id
        name
        description
      }
      evidence {
        items {
          id
          annotation_id
          citation_snippet
          last_updated
          annotator_id
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          title
          url
          year
          doi
          author
          notes
          pages_used
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAnnotationTagWithEvidence = /* GraphQL */ `
  mutation DeleteAnnotationTagWithEvidence(
    $input: DeleteAnnotationTagWithEvidenceInput!
    $condition: ModelAnnotationTagWithEvidenceConditionInput
  ) {
    deleteAnnotationTagWithEvidence(input: $input, condition: $condition) {
      id
      tag {
        id
        name
        description
      }
      evidence {
        items {
          id
          annotation_id
          citation_snippet
          last_updated
          annotator_id
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          title
          url
          year
          doi
          author
          notes
          pages_used
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createNerAnnotationTask = /* GraphQL */ `
  mutation CreateNerAnnotationTask(
    $input: CreateNerAnnotationTaskInput!
    $condition: ModelNerAnnotationTaskConditionInput
  ) {
    createNerAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
          start
          end
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateNerAnnotationTask = /* GraphQL */ `
  mutation UpdateNerAnnotationTask(
    $input: UpdateNerAnnotationTaskInput!
    $condition: ModelNerAnnotationTaskConditionInput
  ) {
    updateNerAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
          start
          end
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteNerAnnotationTask = /* GraphQL */ `
  mutation DeleteNerAnnotationTask(
    $input: DeleteNerAnnotationTaskInput!
    $condition: ModelNerAnnotationTaskConditionInput
  ) {
    deleteNerAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
          start
          end
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createClassificationAnnotationTask = /* GraphQL */ `
  mutation CreateClassificationAnnotationTask(
    $input: CreateClassificationAnnotationTaskInput!
    $condition: ModelClassificationAnnotationTaskConditionInput
  ) {
    createClassificationAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateClassificationAnnotationTask = /* GraphQL */ `
  mutation UpdateClassificationAnnotationTask(
    $input: UpdateClassificationAnnotationTaskInput!
    $condition: ModelClassificationAnnotationTaskConditionInput
  ) {
    updateClassificationAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteClassificationAnnotationTask = /* GraphQL */ `
  mutation DeleteClassificationAnnotationTask(
    $input: DeleteClassificationAnnotationTaskInput!
    $condition: ModelClassificationAnnotationTaskConditionInput
  ) {
    deleteClassificationAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          text
          tag {
            id
            name
            description
          }
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAllergyAnnotationTask = /* GraphQL */ `
  mutation CreateAllergyAnnotationTask(
    $input: CreateAllergyAnnotationTaskInput!
    $condition: ModelAllergyAnnotationTaskConditionInput
  ) {
    createAllergyAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          id
          tag {
            id
            name
            description
          }
          evidence {
            items {
              id
              annotation_id
              citation_snippet
              last_updated
              annotator_id
              data_source {
                id
                name
                description
                url
                type
                publisher
                volume_no
                issue_no
                edition
                year
                createdAt
                updatedAt
              }
              title
              url
              year
              doi
              author
              notes
              pages_used
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAllergyAnnotationTask = /* GraphQL */ `
  mutation UpdateAllergyAnnotationTask(
    $input: UpdateAllergyAnnotationTaskInput!
    $condition: ModelAllergyAnnotationTaskConditionInput
  ) {
    updateAllergyAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          id
          tag {
            id
            name
            description
          }
          evidence {
            items {
              id
              annotation_id
              citation_snippet
              last_updated
              annotator_id
              data_source {
                id
                name
                description
                url
                type
                publisher
                volume_no
                issue_no
                edition
                year
                createdAt
                updatedAt
              }
              title
              url
              year
              doi
              author
              notes
              pages_used
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAllergyAnnotationTask = /* GraphQL */ `
  mutation DeleteAllergyAnnotationTask(
    $input: DeleteAllergyAnnotationTaskInput!
    $condition: ModelAllergyAnnotationTaskConditionInput
  ) {
    deleteAllergyAnnotationTask(input: $input, condition: $condition) {
      id
      project_id
      instruction {
        text
        full_instructions_url
      }
      status
      type
      metadata
      annotator_id
      tags {
        id
        name
        description
      }
      sample {
        text
        annotations {
          id
          tag {
            id
            name
            description
          }
          evidence {
            items {
              id
              annotation_id
              citation_snippet
              last_updated
              annotator_id
              data_source {
                id
                name
                description
                url
                type
                publisher
                volume_no
                issue_no
                edition
                year
                createdAt
                updatedAt
              }
              title
              url
              year
              doi
              author
              notes
              pages_used
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      issue {
        id
        type {
          id
          type
          createdAt
          updatedAt
        }
        reason {
          id
          reason
          createdAt
          updatedAt
        }
        notes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProjectDataSource = /* GraphQL */ `
  mutation CreateProjectDataSource(
    $input: CreateProjectDataSourceInput!
    $condition: ModelProjectDataSourceConditionInput
  ) {
    createProjectDataSource(input: $input, condition: $condition) {
      id
      project_id
      data_source_id
      project {
        id
        title
        description
        tasks_completed
        total_tasks
        task_type
        ner_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                text
                start
                end
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        classification_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                text
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        allergy_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                id
                createdAt
                updatedAt
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        data_sources {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        assignee
        annotator {
          id
          username
          name
          email
          projects {
            items {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        annotator_id
        createdAt
        updatedAt
      }
      data_source {
        id
        name
        description
        url
        type
        publisher
        volume_no
        issue_no
        edition
        year
        projects {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProjectDataSource = /* GraphQL */ `
  mutation UpdateProjectDataSource(
    $input: UpdateProjectDataSourceInput!
    $condition: ModelProjectDataSourceConditionInput
  ) {
    updateProjectDataSource(input: $input, condition: $condition) {
      id
      project_id
      data_source_id
      project {
        id
        title
        description
        tasks_completed
        total_tasks
        task_type
        ner_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                text
                start
                end
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        classification_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                text
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        allergy_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                id
                createdAt
                updatedAt
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        data_sources {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        assignee
        annotator {
          id
          username
          name
          email
          projects {
            items {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        annotator_id
        createdAt
        updatedAt
      }
      data_source {
        id
        name
        description
        url
        type
        publisher
        volume_no
        issue_no
        edition
        year
        projects {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProjectDataSource = /* GraphQL */ `
  mutation DeleteProjectDataSource(
    $input: DeleteProjectDataSourceInput!
    $condition: ModelProjectDataSourceConditionInput
  ) {
    deleteProjectDataSource(input: $input, condition: $condition) {
      id
      project_id
      data_source_id
      project {
        id
        title
        description
        tasks_completed
        total_tasks
        task_type
        ner_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                text
                start
                end
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        classification_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                text
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        allergy_tasks {
          items {
            id
            project_id
            instruction {
              text
              full_instructions_url
            }
            status
            type
            metadata
            annotator_id
            tags {
              id
              name
              description
            }
            sample {
              text
              annotations {
                id
                createdAt
                updatedAt
              }
            }
            issue {
              id
              type {
                id
                type
                createdAt
                updatedAt
              }
              reason {
                id
                reason
                createdAt
                updatedAt
              }
              notes
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        data_sources {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        assignee
        annotator {
          id
          username
          name
          email
          projects {
            items {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        annotator_id
        createdAt
        updatedAt
      }
      data_source {
        id
        name
        description
        url
        type
        publisher
        volume_no
        issue_no
        edition
        year
        projects {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createDataSource = /* GraphQL */ `
  mutation CreateDataSource(
    $input: CreateDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    createDataSource(input: $input, condition: $condition) {
      id
      name
      description
      url
      type
      publisher
      volume_no
      issue_no
      edition
      year
      projects {
        items {
          id
          project_id
          data_source_id
          project {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDataSource = /* GraphQL */ `
  mutation UpdateDataSource(
    $input: UpdateDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    updateDataSource(input: $input, condition: $condition) {
      id
      name
      description
      url
      type
      publisher
      volume_no
      issue_no
      edition
      year
      projects {
        items {
          id
          project_id
          data_source_id
          project {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDataSource = /* GraphQL */ `
  mutation DeleteDataSource(
    $input: DeleteDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    deleteDataSource(input: $input, condition: $condition) {
      id
      name
      description
      url
      type
      publisher
      volume_no
      issue_no
      edition
      year
      projects {
        items {
          id
          project_id
          data_source_id
          project {
            id
            title
            description
            tasks_completed
            total_tasks
            task_type
            ner_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            classification_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            allergy_tasks {
              items {
                id
                project_id
                status
                type
                metadata
                annotator_id
                createdAt
                updatedAt
              }
              nextToken
            }
            data_sources {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            assignee
            annotator {
              id
              username
              name
              email
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            annotator_id
            createdAt
            updatedAt
          }
          data_source {
            id
            name
            description
            url
            type
            publisher
            volume_no
            issue_no
            edition
            year
            projects {
              items {
                id
                project_id
                data_source_id
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEvidence = /* GraphQL */ `
  mutation CreateEvidence(
    $input: CreateEvidenceInput!
    $condition: ModelEvidenceConditionInput
  ) {
    createEvidence(input: $input, condition: $condition) {
      id
      annotation_id
      citation_snippet
      last_updated
      annotator_id
      data_source {
        id
        name
        description
        url
        type
        publisher
        volume_no
        issue_no
        edition
        year
        projects {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      url
      year
      doi
      author
      notes
      pages_used
      createdAt
      updatedAt
    }
  }
`;
export const updateEvidence = /* GraphQL */ `
  mutation UpdateEvidence(
    $input: UpdateEvidenceInput!
    $condition: ModelEvidenceConditionInput
  ) {
    updateEvidence(input: $input, condition: $condition) {
      id
      annotation_id
      citation_snippet
      last_updated
      annotator_id
      data_source {
        id
        name
        description
        url
        type
        publisher
        volume_no
        issue_no
        edition
        year
        projects {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      url
      year
      doi
      author
      notes
      pages_used
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvidence = /* GraphQL */ `
  mutation DeleteEvidence(
    $input: DeleteEvidenceInput!
    $condition: ModelEvidenceConditionInput
  ) {
    deleteEvidence(input: $input, condition: $condition) {
      id
      annotation_id
      citation_snippet
      last_updated
      annotator_id
      data_source {
        id
        name
        description
        url
        type
        publisher
        volume_no
        issue_no
        edition
        year
        projects {
          items {
            id
            project_id
            data_source_id
            project {
              id
              title
              description
              tasks_completed
              total_tasks
              task_type
              ner_tasks {
                nextToken
              }
              classification_tasks {
                nextToken
              }
              allergy_tasks {
                nextToken
              }
              data_sources {
                nextToken
              }
              assignee
              annotator {
                id
                username
                name
                email
                createdAt
                updatedAt
              }
              annotator_id
              createdAt
              updatedAt
            }
            data_source {
              id
              name
              description
              url
              type
              publisher
              volume_no
              issue_no
              edition
              year
              projects {
                nextToken
              }
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      url
      year
      doi
      author
      notes
      pages_used
      createdAt
      updatedAt
    }
  }
`;
