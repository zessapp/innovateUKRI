/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAnnotator = /* GraphQL */ `
  query GetAnnotator($id: ID!) {
    getAnnotator(id: $id) {
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
export const listAnnotators = /* GraphQL */ `
  query ListAnnotators(
    $filter: ModelAnnotatorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnotators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAnnotationTaskIssueType = /* GraphQL */ `
  query GetAnnotationTaskIssueType($id: ID!) {
    getAnnotationTaskIssueType(id: $id) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const listAnnotationTaskIssueTypes = /* GraphQL */ `
  query ListAnnotationTaskIssueTypes(
    $filter: ModelAnnotationTaskIssueTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnotationTaskIssueTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnnotationTaskIssueReason = /* GraphQL */ `
  query GetAnnotationTaskIssueReason($id: ID!) {
    getAnnotationTaskIssueReason(id: $id) {
      id
      reason
      createdAt
      updatedAt
    }
  }
`;
export const listAnnotationTaskIssueReasons = /* GraphQL */ `
  query ListAnnotationTaskIssueReasons(
    $filter: ModelAnnotationTaskIssueReasonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnotationTaskIssueReasons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        reason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnnotationTaskIssue = /* GraphQL */ `
  query GetAnnotationTaskIssue($id: ID!) {
    getAnnotationTaskIssue(id: $id) {
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
export const listAnnotationTaskIssues = /* GraphQL */ `
  query ListAnnotationTaskIssues(
    $filter: ModelAnnotationTaskIssueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnotationTaskIssues(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getAnnotationProject = /* GraphQL */ `
  query GetAnnotationProject($id: ID!) {
    getAnnotationProject(id: $id) {
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
export const listAnnotationProjects = /* GraphQL */ `
  query ListAnnotationProjects(
    $filter: ModelAnnotationProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnotationProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const getAnnotationTagWithEvidence = /* GraphQL */ `
  query GetAnnotationTagWithEvidence($id: ID!) {
    getAnnotationTagWithEvidence(id: $id) {
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
export const listAnnotationTagWithEvidences = /* GraphQL */ `
  query ListAnnotationTagWithEvidences(
    $filter: ModelAnnotationTagWithEvidenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnnotationTagWithEvidences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getNerAnnotationTask = /* GraphQL */ `
  query GetNerAnnotationTask($id: ID!) {
    getNerAnnotationTask(id: $id) {
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
export const listNerAnnotationTasks = /* GraphQL */ `
  query ListNerAnnotationTasks(
    $filter: ModelNerAnnotationTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNerAnnotationTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getClassificationAnnotationTask = /* GraphQL */ `
  query GetClassificationAnnotationTask($id: ID!) {
    getClassificationAnnotationTask(id: $id) {
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
export const listClassificationAnnotationTasks = /* GraphQL */ `
  query ListClassificationAnnotationTasks(
    $filter: ModelClassificationAnnotationTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassificationAnnotationTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getAllergyAnnotationTask = /* GraphQL */ `
  query GetAllergyAnnotationTask($id: ID!) {
    getAllergyAnnotationTask(id: $id) {
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
export const listAllergyAnnotationTasks = /* GraphQL */ `
  query ListAllergyAnnotationTasks(
    $filter: ModelAllergyAnnotationTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAllergyAnnotationTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              items {
                id
                annotation_id
                citation_snippet
                last_updated
                annotator_id
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
      nextToken
    }
  }
`;
export const getDataSource = /* GraphQL */ `
  query GetDataSource($id: ID!) {
    getDataSource(id: $id) {
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
export const listDataSources = /* GraphQL */ `
  query ListDataSources(
    $filter: ModelDataSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataSources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEvidence = /* GraphQL */ `
  query GetEvidence($id: ID!) {
    getEvidence(id: $id) {
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
export const listEvidences = /* GraphQL */ `
  query ListEvidences(
    $filter: ModelEvidenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvidences(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
