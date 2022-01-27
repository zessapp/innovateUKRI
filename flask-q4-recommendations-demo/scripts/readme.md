#

Install ts-node and run

```
USERNAME=**** PASSWORD=**** ts-node scriptname.ts
```

# Create a new Annotator and project

```
mutation MyMutation {
  createAnnotator(input: {name: "Hiren Umradia", id: "beb5c85d-71f0-4671-93d0-ca974b15aabc"})
  createAnnotationProject(input: {annotator_id: "beb5c85d-71f0-4671-93d0-ca974b15aabc", assignee: "hirenumradia", description: "This is a test project", id: "41d65be6-2829-4b32-8d49-1b3a53de6d6b", title: "Test Project"})
}
```

# Create annotation Tag

```
mutation MyMutation {
  createAnnotationTag(input: {display_name: "Prepared Ingredient", id: "2b384f30-0d1f-403c-8e90-66b78d1ebbf4", tag_name: "PREP"}) {
    id
    display_name
    createdAt
    tag_name
    updatedAt
  }
}

```

# Create tasks

```

```
