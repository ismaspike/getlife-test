const ServicesModel = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    phone: string;
    email: string;
    website: string;
    address: {
        city: string;
        street: string;
        suite: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    }
}

export interface IAlbum {
    id: number;
    title: string;
    userId: number;
}

export interface IPost {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IPhoto {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export function serviceFetch(URL: string): Promise<IUser[] | IAlbum[] | IPost[] | IComment[] | IPhoto[]> {
    return new Promise((resolve, reject) => {
        fetch(URL, ServicesModel)
        .then(response => 
            response.json())
        .then(json => {
            resolve(json);
        })
        .catch(error => {
            reject(false);
        })
    })
}
