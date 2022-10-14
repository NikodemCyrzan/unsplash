import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { keys } from "../api/keys";
import { SearchBar } from "../components/SearchBar";
import { Modal } from "../components/Modal";
import "./photos.css";

export function Photos(){
    const {query} = useParams();
    const [photos, setPhotos] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos/?client_id=${keys.access}&query=${query}&per_page=40`, {
            method: "GET"
        }).then(res => res.json())
        .then(json => setPhotos(json.results));
    });

    const img = e => <img alt={e.description} onClick={() => {
        fetch(`https://api.unsplash.com/photos/${e.id}?client_id=${keys.access}`, {
            method: "GET"
        }).then(res => res.json())
        .then(json => {
            setModalData(json)
            setModalOpen(true);
        });
    }} key={e.id} title={e.description} src={e.urls.regular}/>;

    return (
    <>
        <Modal isOpen={isModalOpen} setOpen={setModalOpen} photoData={modalData} />
        <div className="photos-topbar__wrapper">
            <SearchBar value={query} />
        </div>
        <div className="photots__container">
            <div className="photots-column">
            {
                photos.map((e, i) => {
                    if (i % 3 === 0)
                        return img(e);
                    return null;
                })
            }
            </div>
            <div className="photots-column">
            {
                photos.map((e, i) => {
                    if ((i + 1) % 3 === 0)
                        return img(e);
                    return null;
                })
            }
            </div>
            <div className="photots-column">
            {
                photos.map((e, i) => {
                    if ((i + 2) % 3 === 0)
                        return img(e);
                    return null;
                })
            }
            </div>
        </div>
    </>
    );
}