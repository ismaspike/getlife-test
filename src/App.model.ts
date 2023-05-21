export interface UsersModel {
    id: number;
    name: string;
    username: string;
    phone: string;
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

export interface AlbumsModel {
    id: number;
    title: string;
    userId: number;
}

export interface PostsModel {
    body: string;
    id: string;
    title: string;
    userId: string;
}