export interface IHero {
    id?: number;
    name?: string;
    description?: string;
    modified?: Date;
    resourceURI?: IUrl;
    urls?: string[];
    thumbnail: Image;
    comics?: any[];
    stories?: any[];
    events?: any[];
    series?: any[];
}

interface IUrl {
    type?: string;
    url?: string;
}

interface Image {
    path?: string;
    extension?: string;
}
