import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { keys } from "../api/keys";
import { SearchBar } from "../components/SearchBar";
import "./photos.css";

export function Photos(){
    const {query} = useParams();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos/?client_id=${keys.access}&query=${query}&per_page=40`, {
            method: "GET"
        }).then(res => res.json())
        .then(json => setPhotos(json.results));
    }, []);

    return (
    <>
        <div className="photos-topbar__wrapper">
            <SearchBar value={query} />
        </div>
        <div className="photots__container">
            <div className="photots-column">
            {
                photos.map((e, i) => {
                    if (i % 3 === 0)
                        return <img key={e.id} title={e.description} src={e.urls.regular}/>
                    return null;
                })
            }
            </div>
            <div className="photots-column">
            {
                photos.map((e, i) => {
                    if ((i + 1) % 3 === 0)
                        return <img key={e.id} title={e.description} src={e.urls.regular}/>
                    return null;
                })
            }
            </div>
            <div className="photots-column">
            {
                photos.map((e, i) => {
                    if ((i + 2) % 3 === 0)
                        return <img key={e.id} title={e.description} src={e.urls.regular}/>
                    return null;
                })
            }
            </div>
        </div>
    </>
    );
}