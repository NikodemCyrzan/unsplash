import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "components/SearchBar/SearchBar";
import Modal from "components/Modal/Modal";
import { getImageInformations, getImages } from "modules/services";
import Image from "components/Image/Image";

// Column można przenieść do /components
type ColumProps = {
    // zamiast undefined można dać znak zapytania przed dwukropkiem, + tutaj też proszę stworzyć interface pod images
    // jeżeli mamy typy / interfacy ogólne/globalne to można stworzyć folder /src/Ts/types.ts tam je umieścić i z nich importować
    images?: any[];
    onImageClick?: (id: string) => void;
};

const Column = ({ images, onImageClick }: ColumProps) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Można skrócić zapis */}
            {images?.map((image) => (
                    <Image
                        key={image?.id}
                        imageData={image}
                        onClick={onImageClick}
                    />
                )
            )}
        </div>
    );
};

const Photos = () => {
    const { query } = useParams();
    // spróbuj na podstawie informacji które przychodzą z unsplasha stworzyć interface ( nie jest wskazane używanie any)
    const [images, setImages] = useState<any[]>([]);

    // jeżeli dajemy default value które jest takiego samego typu jaki useState to nie musimy go pisać
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const images = await getImages(query || "");

            setImages(images?.results ?? []);
        })();
    }, [query]);

    function handleImageClick(id: string) {
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
};

export default Photos;
