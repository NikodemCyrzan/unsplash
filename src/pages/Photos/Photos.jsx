// najlepiej używać absolute imports https://dev.to/nilanth/no-more-import-in-react-2mbo
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { keys } from "../../api/keys";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Modal } from "../../components/Modal/Modal";

// Warto używać funkcji strzałkowej
// const Photos = () =>  i wtedy na końcu export default Photos;
// https://www.robinwieruch.de/react-function-component/

export function Photos() {
    const { query } = useParams();
    const [photos, setPhotos] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetch(
            `https://api.unsplash.com/search/photos/?client_id=${keys.access}&query=${query}&per_page=40`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((json) => setPhotos(json.results));
    }, [query]); // tutaj musimy dać query w dependencies, kiedy nie damy nic w deps'ach to requesty leca jeden za drugim cały czas

    // Coś takiego najlepiej dać do oddzielnego komponentu a fetcha przenieść do osobnej funkcji + nazwy komponentów zaczynamy z dużej litery
    const img = (e) => (
        <img
            className="w-full radius-md cursor-zoom-in"
            alt={e.description}
            onClick={() => {
                fetch(
                    `https://api.unsplash.com/photos/${e.id}?client_id=${keys.access}`,
                    {
                        method: "GET",
                    }
                )
                    .then((res) => res.json())
                    .then((json) => {
                        setModalData(json);
                        setModalOpen(true);
                    });
            }}
            key={e.id}
            title={e.description}
            src={e.urls.regular}
        />
    );

    // proponowałbym już wyżej podzielić zdjęcia na 3 kolumny
    const firstColumn = photos?.slice(0, 10);
    const secondColumn = photos?.slice(10, 20);
    const thirdColumn = photos?.slice(20);

    // jezeli chcesz zrobić to tak jak niżej robiłeś to możesz zrobić tak
    // const firstColumn = photos?.filter((_, index) => index % 3 === 0);
    // const secondColumn = photos?.filter((_, index) => index % 3 === 1);
    // const thirdColumn = photos?.filter((_, index) => index % 3 === 2);

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
