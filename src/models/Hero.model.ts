export interface IHero {
    id: number;
    name: string;
    description?: string;
    modified?: Date;
    resourceURI?: IUrl;
    urls?: string[];
    thumbnail: Image;
    comics?: any[];
    stories?: any[];
    events?: any[];
    series: ISeries[];
    favourite?: boolean;
}

interface Items {
    name: string;
    resourceURI: string;
}

interface ISeries {
    available: number;
    collectionURI: string;
    items: Items[];
}

interface IUrl {
    type?: string;
    url?: string;
}

interface Image {
    path: string;
    extension: string;
}
