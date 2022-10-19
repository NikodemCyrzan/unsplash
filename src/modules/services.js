import { keys } from "../api/keys";

const getRandomImage = async () => {
    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${keys.access}`,
            {
                method: "GET",
            }
        );
        return res.json();
    } catch (error) {
        return null;
    }
};

/**
 * @param {string} query
 */
const getImages = async (query) => {
    try {
        if (typeof query !== "string")
            throw new Error("'query' should be type of string");
        const res = await fetch(
            `https://api.unsplash.com/search/photos/?client_id=${keys.access}&query=${query}&per_page=40`,
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

/**
 * @param {string} value
 */
const getAutocomplete = async (value) => {
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

/**
 * @param {string} id
 */
const getImageInformations = async (id) => {
    try {
        if (typeof id !== "string")
            throw new Error("'id' should be type of string");

        const res = await fetch(
            `https://api.unsplash.com/photos/${id}?client_id=${keys.access}`,
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
