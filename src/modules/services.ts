type RadomImageType = {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: number;
    blur_hash: string;
    downloads: number;
    likes: number;
    liked_by_user: boolean;
    description: string;
    exif: {
        make: string;
        model: string;
        exposure_time: string;
        aperture: string;
        focal_length: string;
        iso: number;
    };
    location: {
        name: string;
        city: string;
        country: string;
        position: {
            latitude: number;
            longitude: number;
        };
    };
    current_user_collections: {
        id: number;
        title: string;
        published_at: string;
        last_collected_at: string;
        updated_at: string;
    }[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        portfolio_url: string;
        bio: string;
        location: string;
        total_likes: number;
        total_photos: number;
        total_collections: number;
        instagram_username: string;
        twitter_username: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
        };
    };
};

const getRandomImage = async (): Promise<RadomImageType | null> => {
    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`,
            {
                method: "GET",
            }
        );
        return res.json();
    } catch (error) {
        return null;
    }
};

type ImagesType = {
    total: number;
    total_pages: number;
    results: {
        id: string;
        created_at: string;
        width: number;
        height: number;
        color: string;
        blur_hash: string;
        likes: number;
        liked_by_user: boolean;
        description: string;
        user: {
            id: string;
            username: string;
            name: string;
            first_name: string;
            last_name: string;
            instagram_username: string;
            twitter_username: string;
            portfolio_url: string;
            profile_image: {
                small: string;
                medium: string;
                large: string;
            };
            links: {
                self: string;
                html: string;
                photos: string;
                likes: string;
            };
        };
        urls: {
            raw: string;
            full: string;
            regular: string;
            small: string;
            thumb: string;
        };
        links: {
            self: string;
            html: string;
            download: string;
        };
    }[];
};

const getImages = async (query: string): Promise<ImagesType | null> => {
    try {
        if (typeof query !== "string")
            throw new Error("'query' should be type of string");
        const res = await fetch(
            `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}&query=${query}&per_page=40`,
            {
                method: "GET",
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

type AutocompleteType = {
    fuzzy: { query: string; priority: number }[];
    autocomplete: { query: string; priority: number }[];
    did_you_mean: { query: string; priority: number }[];
};

const getAutocomplete = async (
    value: string
): Promise<AutocompleteType | null> => {
    try {
        if (typeof value !== "string")
            throw new Error("'value' should be type of string");

        const res = await fetch(`https://unsplash.com/nautocomplete/${value}`, {
            method: "GET",
        });
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

type ImageInformationsType = {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string;
    user: {
        id: string;
        username: string;
        name: string;
        portfolio_url: string;
        bio: string;
        location: string;
        total_likes: number;
        total_photos: number;
        total_collections: number;
        instagram_username: string;
        twitter_username: string;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
        };
    };
    current_user_collections: {
        id: number;
        title: string;
        published_at: string;
        last_collected_at: string;
        updated_at: string;
    }[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
}[];

const getImageInformations = async (
    id: string
): Promise<ImageInformationsType | null> => {
    try {
        if (typeof id !== "string")
            throw new Error("'id' should be type of string");

        const res = await fetch(
            `https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`,
            {
                method: "GET",
            }
        );
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getRandomImage, getImages, getAutocomplete, getImageInformations };
