// najlepiej używać absolute imports https://dev.to/nilanth/no-more-import-in-react-2mbo
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Modal } from "../../components/Modal/Modal";
import { getImageInformations, getImages } from "../../modules/services";

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

    // Coś takiego najlepiej dać do oddzielnego komponentu + nazwy komponentów zaczynamy z dużej litery
    const img = (e) => (
        <img
            className="w-full radius-md cursor-zoom-in"
            alt={e.description}
            onClick={() => {
                (async () => {
                    const info = await getImageInformations(e.id);
                    setModalData(info);
                    setModalOpen(true);
                })();
            }}
            key={e.id}
            title={e.description}
            src={e.urls.regular}
        />
    );

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
            {/* tutaj masz normalnie photos a w innych photots */}
            <div className="px-5 py-2.5">
                <SearchBar value={query} />
            </div>
            <div className="mx-auto my-10 max-w-screen-2xl px-10 flex gap-4">
                {/* Tutaj też możemy zrobić osobne małe komponent które przyjmują tylko i wyłącznie arrayke */}
                <div className="flex flex-col gap-4">
                    {firstColumn.map((e, i) => {
                        return img(e);
                    })}
                </div>
                <div className="flex flex-col gap-4">
                    {secondColumn.map((e, i) => {
                        return img(e);
                    })}
                </div>
                <div className="flex flex-col gap-4">
                    {thirdColumn.map((e, i) => {
                        return img(e);
                    })}
                </div>
            </div>
        </>
    );
}
