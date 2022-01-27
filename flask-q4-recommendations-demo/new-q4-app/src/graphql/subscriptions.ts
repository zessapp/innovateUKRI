/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAnnotator = /* GraphQL */ `
  subscription OnCreateAnnotator {
    onCreateAnnotator {
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
export const onUpdateAnnotator = /* GraphQL */ `
  subscription OnUpdateAnnotator {
    onUpdateAnnotator {
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
export const onDeleteAnnotator = /* GraphQL */ `
  subscription OnDeleteAnnotator {
    onDeleteAnnotator {
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
export const onCreateAnnotationTaskIssueType = /* GraphQL */ `
  subscription OnCreateAnnotationTaskIssueType {
    onCreateAnnotationTaskIssueType {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAnnotationTaskIssueType = /* GraphQL */ `
  subscription OnUpdateAnnotationTaskIssueType {
    onUpdateAnnotationTaskIssueType {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAnnotationTaskIssueType = /* GraphQL */ `
  subscription OnDeleteAnnotationTaskIssueType {
    onDeleteAnnotationTaskIssueType {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAnnotationTaskIssueReason = /* GraphQL */ `
  subscription OnCreateAnnotationTaskIssueReason {
    onCreateAnnotationTaskIssueReason {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAnnotationTaskIssueReason = /* GraphQL */ `
  subscription OnUpdateAnnotationTaskIssueReason {
    onUpdateAnnotationTaskIssueReason {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAnnotationTaskIssueReason = /* GraphQL */ `
  subscription OnDeleteAnnotationTaskIssueReason {
    onDeleteAnnotationTaskIssueReason {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAnnotationTaskIssue = /* GraphQL */ `
  subscription OnCreateAnnotationTaskIssue {
    onCreateAnnotationTaskIssue {
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
export const onUpdateAnnotationTaskIssue = /* GraphQL */ `
  subscription OnUpdateAnnotationTaskIssue {
    onUpdateAnnotationTaskIssue {
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
export const onDeleteAnnotationTaskIssue = /* GraphQL */ `
  subscription OnDeleteAnnotationTaskIssue {
    onDeleteAnnotationTaskIssue {
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
export const onCreateAnnotationProject = /* GraphQL */ `
  subscription OnCreateAnnotationProject($assignee: String) {
    onCreateAnnotationProject(assignee: $assignee) {
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
export const onUpdateAnnotationProject = /* GraphQL */ `
  subscription OnUpdateAnnotationProject($assignee: String) {
    onUpdateAnnotationProject(assignee: $assignee) {
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
export const onDeleteAnnotationProject = /* GraphQL */ `
  subscription OnDeleteAnnotationProject($assignee: String) {
    onDeleteAnnotationProject(assignee: $assignee) {
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
export const onCreateAnnotationTagWithEvidence = /* GraphQL */ `
  subscription OnCreateAnnotationTagWithEvidence {
    onCreateAnnotationTagWithEvidence {
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
export const onUpdateAnnotationTagWithEvidence = /* GraphQL */ `
  subscription OnUpdateAnnotationTagWithEvidence {
    onUpdateAnnotationTagWithEvidence {
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
export const onDeleteAnnotationTagWithEvidence = /* GraphQL */ `
  subscription OnDeleteAnnotationTagWithEvidence {
    onDeleteAnnotationTagWithEvidence {
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
export const onCreateNerAnnotationTask = /* GraphQL */ `
  subscription OnCreateNerAnnotationTask($annotator_id: String) {
    onCreateNerAnnotationTask(annotator_id: $annotator_id) {
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
export const onUpdateNerAnnotationTask = /* GraphQL */ `
  subscription OnUpdateNerAnnotationTask($annotator_id: String) {
    onUpdateNerAnnotationTask(annotator_id: $annotator_id) {
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
export const onDeleteNerAnnotationTask = /* GraphQL */ `
  subscription OnDeleteNerAnnotationTask($annotator_id: String) {
    onDeleteNerAnnotationTask(annotator_id: $annotator_id) {
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
export const onCreateClassificationAnnotationTask = /* GraphQL */ `
  subscription OnCreateClassificationAnnotationTask($annotator_id: String) {
    onCreateClassificationAnnotationTask(annotator_id: $annotator_id) {
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
export const onUpdateClassificationAnnotationTask = /* GraphQL */ `
  subscription OnUpdateClassificationAnnotationTask($annotator_id: String) {
    onUpdateClassificationAnnotationTask(annotator_id: $annotator_id) {
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
export const onDeleteClassificationAnnotationTask = /* GraphQL */ `
  subscription OnDeleteClassificationAnnotationTask($annotator_id: String) {
    onDeleteClassificationAnnotationTask(annotator_id: $annotator_id) {
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
export const onCreateAllergyAnnotationTask = /* GraphQL */ `
  subscription OnCreateAllergyAnnotationTask($annotator_id: String) {
    onCreateAllergyAnnotationTask(annotator_id: $annotator_id) {
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
export const onUpdateAllergyAnnotationTask = /* GraphQL */ `
  subscription OnUpdateAllergyAnnotationTask($annotator_id: String) {
    onUpdateAllergyAnnotationTask(annotator_id: $annotator_id) {
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
export const onDeleteAllergyAnnotationTask = /* GraphQL */ `
  subscription OnDeleteAllergyAnnotationTask($annotator_id: String) {
    onDeleteAllergyAnnotationTask(annotator_id: $annotator_id) {
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
export const onCreateProjectDataSource = /* GraphQL */ `
  subscription OnCreateProjectDataSource {
    onCreateProjectDataSource {
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
export const onUpdateProjectDataSource = /* GraphQL */ `
  subscription OnUpdateProjectDataSource {
    onUpdateProjectDataSource {
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
export const onDeleteProjectDataSource = /* GraphQL */ `
  subscription OnDeleteProjectDataSource {
    onDeleteProjectDataSource {
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
export const onCreateDataSource = /* GraphQL */ `
  subscription OnCreateDataSource {
    onCreateDataSource {
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
export const onUpdateDataSource = /* GraphQL */ `
  subscription OnUpdateDataSource {
    onUpdateDataSource {
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
export const onDeleteDataSource = /* GraphQL */ `
  subscription OnDeleteDataSource {
    onDeleteDataSource {
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
export const onCreateEvidence = /* GraphQL */ `
  subscription OnCreateEvidence($annotator_id: String) {
    onCreateEvidence(annotator_id: $annotator_id) {
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
export const onUpdateEvidence = /* GraphQL */ `
  subscription OnUpdateEvidence($annotator_id: String) {
    onUpdateEvidence(annotator_id: $annotator_id) {
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
export const onDeleteEvidence = /* GraphQL */ `
  subscription OnDeleteEvidence($annotator_id: String) {
    onDeleteEvidence(annotator_id: $annotator_id) {
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
