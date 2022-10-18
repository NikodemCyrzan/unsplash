// najlepiej używać absolute imports https://dev.to/nilanth/no-more-import-in-react-2mbo
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { keys } from "../api/keys";
import { SearchBar } from "../components/SearchBar";
import { Modal } from "../components/Modal";
import "./photos.css";

// Warto używać funkcji strzałkowej
// const Photos = () =>  i wtedy na końcu export default Photos;
// https://www.robinwieruch.de/react-function-component/

export function Photos() {
	const { query } = useParams();
	const [photos, setPhotos] = useState([]);

	const [isModalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);

	useEffect(() => {
		fetch(`https://api.unsplash.com/search/photos/?client_id=${keys.access}&query=${query}&per_page=40`, {
			method: "GET"
		}).then(res => res.json())
			.then(json => setPhotos(json.results));
	}, [query]); // tutaj musimy dać query w dependencies, kiedy nie damy nic w deps'ach to requesty leca jeden za drugim cały czas 

	// Coś takiego najlepiej dać do oddzielnego komponentu a fetcha przenieść do osobnej funkcji + nazwy komponentów zaczynamy z dużej litery
	const img = e => <img alt={e.description} onClick={() => {
		fetch(`https://api.unsplash.com/photos/${e.id}?client_id=${keys.access}`, {
			method: "GET"
		}).then(res => res.json())
			.then(json => {
				setModalData(json)
				setModalOpen(true);
			});
	}} key={e.id} title={e.description} src={e.urls.regular} />;

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
			<Modal isOpen={isModalOpen} setOpen={setModalOpen} photoData={modalData} />
			{/* tutaj masz normalnie photos a w innych photots */}
			<div className="photos-topbar__wrapper">
				<SearchBar value={query} />
			</div>
			<div className="photots__container">
				{/* Tutaj też możemy zrobić osobne małe komponent które przyjmują tylko i wyłącznie arrayke */}
				<div className="photots-column">
					{
						firstColumn.map((e, i) => {
							return img(e);
						})
					}
				</div>
				<div className="photots-column">
					{
						secondColumn.map((e, i) => {
							return img(e);
						})
					}
				</div>
				<div className="photots-column">
					{
						thirdColumn.map((e, i) => {
							return img(e);
						})
					}
				</div>

			</div>
		</>
	);
}