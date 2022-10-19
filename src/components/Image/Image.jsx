const Image = ({ imageData, onClick }) => {
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
