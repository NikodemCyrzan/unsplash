// najlepiej używać absolute imports https://dev.to/nilanth/no-more-import-in-react-2mbo
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Modal } from "../../components/Modal/Modal";
import { getImageInformations, getImages } from "../../modules/services";
import Image from "../../components/Image/Image";

const Column = ({ images, onImageClick }) => {
    return (
        <div className="flex flex-col gap-4">
            {images?.map((image) => {
                return (
                    <Image
                        key={image?.id}
                        imageData={image}
                        onClick={onImageClick}
                    />
                );
            })}
        </div>
    );
};

// Warto używać funkcji strzałkowej
// const Photos = () =>  i wtedy na końcu export default Photos;
// https://www.robinwieruch.de/react-function-component/

export function Photos() {
    const { query } = useParams();
    const [images, setImages] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        (async () => {
            const images = await getImages(query);

            setImages(images?.results);
        })();
    }, [query]);

    function handleImageClick(id) {
        (async () => {
            const info = await getImageInformations(id);
            setModalData(info);
            setModalOpen(true);
        })();
    }

    const firstColumn = images?.slice(0, images?.length / 3);
    const secondColumn = images?.slice(
        images?.length / 3,
        (images?.length / 3) * 2
    );
    const thirdColumn = images?.slice((images?.length / 3) * 2);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
                photoData={modalData}
            />
            <div className="px-5 py-2.5">
                <SearchBar value={query} />
            </div>
            <div className="mx-auto my-10 max-w-screen-2xl px-10 flex gap-4">
                <Column
                    key="1"
                    images={firstColumn}
                    onImageClick={handleImageClick}
                />
                <Column
                    key="2"
                    images={secondColumn}
                    onImageClick={handleImageClick}
                />
                <Column
                    key="3"
                    images={thirdColumn}
                    onImageClick={handleImageClick}
                />
            </div>
        </>
    );
}
