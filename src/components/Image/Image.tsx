import React from "react";

type ImageProps = {
    imageData: { description: string; id: string; urls: { regular: string } };
    onClick: (id: string) => void;
};

const Image = ({ imageData, onClick }: ImageProps) => {
    const { description, id, urls } = imageData;

    return (
        <img
            className="w-full radius-md cursor-zoom-in"
            alt={description}
            onClick={() => onClick(id)}
            title={description}
            src={urls.regular}
        />
    );
};

export default Image;
