export interface IHero {
    id?: number;
    name?: string;
    description?: string;
    modified?: Date;
    resourceURI?: IUrl;
    urls?: string[];
    thumbnail: Image;
    comics?: IComicList[];
    stories?: IStoryList[];
    events?: IEventList[];
    series?: ISeriesList[];
}

interface IUrl {
    type?: string;
    url?: string;
}

interface Image {
    path?: string;
    extension?: string;
}

interface IComicList {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items: IComicSummary[]
}

interface IComicSummary {
    resourceURI?: string;
    name?: string;
}

interface IStoryList {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: IStorySummary[];
}

interface IStorySummary {
    resourceURI?: string;
    name?: string;
    type?: string;
}

interface IEventList {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: IEventSummary[];
}

interface IEventSummary {
    resourceURI?: string;
    name?: string;
}

interface ISeriesList {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: ISeriesSummary[];
}

interface ISeriesSummary {
    resourceURI?: string;
    name?: string;
}