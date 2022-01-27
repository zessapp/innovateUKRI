interface IEvidenceAuthor {
    first_name: string
    middle_name: string
    last_name: string
}

type EvidenceType = "JournalEvidence" | "BookEvidence" | "UrlEvidence"

export interface IEvidence {
    /** The uuid for the evidence */
    id: string

    /** The title for the evidnece */
    title: string

    /** The type of the evidence */
    type: EvidenceType

    /** The URL for where to find the evidence */
    url?: string

    /** The year the evidence was published */
    year: string

    /** The citation that proves the conclusion  */
    citation_snippet: string

    /** The author of the evidence */
    author?: IEvidenceAuthor

    /** The publisher of the evidence  */
    publisher: string

    /** Any additonal notes or highlights for the evidence  */
    notes: string

    /** The date the evidence was accesed  */
    date_accesed: string

    /** The date the evidence was last updated */
    last_updated: string

    /** The id who updated the evidence last */
    last_updated_by: string
}

export interface IJournalEvidence extends IEvidence {
    /** The volume number of the journal */
    volume_no: string

    /** The issue number of the journal */
    issue_no: string

    /** The edition of the journal */
    edition: string

    /** The pages used from journal */
    pages_used: string
}

export interface IBookEvidence extends IEvidence {
    /** The volume number of the book */
    volume_no: String

    /** The issue number of the book */
    issue_no: String

    /** The edition of the book */
    edition: String

    /** The pages used from book */
    pages_used: String
}

export interface IUrlEvidence extends IEvidence {}
