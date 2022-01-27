import {
    AnnotationTag,
    AnnotationTaskStatus,
    NerAnnotationTask,
    Annotator,
    AnnotationTaskType,
    CreateAnnotatorInput,
    AllergyAnnotationTask,
    CreateAllergyAnnotationTaskInput,
} from "../../../src/API"
import { WithoutTypename } from "../../utils/types"
import { IAllergyTaskBlueprint as IAllergyTaskBlueprintVars } from "../taskBlueprints/AllergyTaskBlueprint"
import {} from "uuid"

export const blueprint: CreateAllergyAnnotationTaskInput = {
    id: "1234-1234-1234-1234",
    annotator_id: "beb5c85d-71f0-4671-93d0-ca974b15aabc",
    instruction: {
        full_instructions_url: "https://zess.co/",
        text:
            "Please add the allergen information for the following ingredient",
    },
    project_id: "c633b0c6-359d-49b7-8108-a653b1b01a15",
    sample: {
        text: "",
    },
    status: AnnotationTaskStatus.TODO,
    tags: [
        {
            id: "celery",
            description:
                "This includes celery stalks, leaves, seeds and the root called celeriac. You can  find celery in celery salt, salads, some meat products, soups and stock cubes.",
            name: "Celery",
        },
        {
            id: "cereals-containing-gluten",
            description:
                "Wheat (such as spelt and Khorasan wheat/Kamut), rye, barley and oats is often found in foods containing flour, such as some types of baking powder, batter, breadcrumbs, bread, cakes, couscous, meat products, pasta, pastry, sauces, soups and fried foods which are dusted with flour.",
            name: "Cereals containing gluten",
        },
        {
            id: "crustaceans",
            description:
                "Crabs, lobster, prawns and scampi are crustaceans. Shrimp paste, often used in Thai and south-east Asian curries or salads, is an ingredient to look out for.",
            name: "Crustaceans",
        },
        {
            id: "eggs",
            description:
                "Eggs are often found in cakes, some meat products, mayonnaise, mousses, pasta, quiche, sauces and pastries or foods brushed or glazed with egg.",
            name: "Eggs",
        },
        {
            id: "fish",
            description:
                "You will find this in some fish sauces, pizzas, relishes, salad dressings, stock cubes and Worcestershire sauce.",
            name: "Fish",
        },
        {
            id: "lupin",
            description:
                "Yes, lupin is a flower, but it’s also found in flour! Lupin flour and seeds can be used in some types of bread, pastries and even in pasta.",
            name: "Lupin",
        },
        {
            id: "milk",
            description:
                "Milk is a common ingredient in butter, cheese, cream, milk powders and yoghurt. It can also be found in foods brushed or glazed with milk, and in powdered soups and sauces.",
            name: "Milk",
        },
        {
            id: "molluscs",
            description:
                "These include mussels, land snails, squid and whelks, but can also be commonly found in oyster sauce or as an ingredient in fish stews",
            name: "Molluscs",
        },
        {
            id: "mustard",
            description:
                "Liquid mustard, mustard powder and mustard seeds fall into this category. This ingredient can also be found in breads, curries, marinades, meat products, salad dressings, sauces and soups.",
            name: "Mustard",
        },
        {
            id: "nuts",
            description:
                "Liquid mustard, mustard powder and mustard seeds fall into this category. This ingredient can also be found in breads, curries, marinades, meat products, salad dressings, sauces and soups.",
            name: "Nuts",
        },
        {
            id: "peanuts",
            description:
                "Liquid mustard, mustard powder and mustard seeds fall into this category. This ingredient can also be found in breads, curries, marinades, meat products, salad dressings, sauces and soups.",
            name: "Peanuts",
        },
        {
            id: "sesame seeds",
            description:
                "Liquid mustard, mustard powder and mustard seeds fall into this category. This ingredient can also be found in breads, curries, marinades, meat products, salad dressings, sauces and soups.",
            name: "Sesame seeds",
        },
        {
            id: "soya",
            description:
                "Often found in bean curd, edamame beans, miso paste, textured soya protein, soya flour or tofu, soya is a staple ingredient in oriental food. It can also be found in desserts, ice cream, meat products, sauces and vegetarian products.",
            name: "Soya",
        },
        {
            id: "sulphur-dioxide",
            description:
                "This is an ingredient often used in dried fruit such as raisins, dried apricots and prunes. You might also find it in meat products, soft drinks, vegetables as well as in wine and beer. If you have asthma, you have a higher risk of developing a reaction to sulphur dioxide.",
            name: "Sulphur dioxide",
        },
        {
            id: "not-ing",
            description: "Not Ingredient",
            name: "Flag it is not an ingredient",
        },
    ],
    type: AnnotationTaskType.ALLERGIES,
    metadata: "{}",
}

export const tasks: Partial<
    WithoutTypename<CreateAllergyAnnotationTaskInput>
>[] = [
    {
        id: "78fdb971-0421-44d4-9d90-8f8cdc29c7ca",
        sample: {
            text: "Tomato",
        },
    },
    {
        id: "15d7e8a0-28fe-4a84-b85c-80b9289a91e8",
        sample: {
            text: "Quiche",
        },
    },
    {
        id: "320ba163-a0e8-4c48-8a31-a6a6ed4e3ef4",
        sample: {
            text: "Peanut",
        },
    },
    {
        id: "3f4c5a5d-a0d8-419d-ae37-1a18012887ce",
        sample: {
            text: "Salad",
        },
    },
]

export const annotator: WithoutTypename<CreateAnnotatorInput> = {
    id: "beb5c85d-71f0-4671-93d0-ca974b15aabc",
    name: "Hiren Umradia",
    email: "hiren@zess.co",
    username: "hirenumradia",
}
