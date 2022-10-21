const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
export const getRandomImage = async (): Promise<RadomImageType | null> => {
    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`,
            {
                method: "GET",
            }
        );
        return res.json();
    } catch (error) {
        return null;
    }
};

export const getImages = async (query: string): Promise<ImagesType | null> => {
    try {
        const res = await fetch(
            `https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_API_KEY}&query=${query}&per_page=40`,
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

export const getAutocomplete = async (
    value: string
): Promise<AutocompleteType | null> => {
    try {
        const res = await fetch(`https://unsplash.com/nautocomplete/${value}`, {
            method: "GET",
        });

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getImageInformations = async (
    id: string
): Promise<ImageInformationsType | null> => {
    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_API_KEY}`,
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
