import { useEffect, useState } from "react";
import {keys} from "../api/keys";
import { SearchBar } from "../components/SearchBar";
import "./main.css";

export function Main(){
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        fetch(`https://api.unsplash.com/photos/random?client_id=${keys.access}`, {
            method: "GET"
        }).then(res => res.json())
        .then(json => setBackgroundImage(json.urls.full));
    }, []);

    return (
    <>
        <div className="main__wrapper" style={{backgroundImage: `url("${backgroundImage}")`}}>
            <div className="main__container">
                <div className="main-title">Unsplash</div>
                <div className="main-p">
                    <div className="main-p-line">
                        The internet's source of <a href="asd">freely-usable images.</a>
                    </div>
                    <div className="main-p-line">
                        Powered by creators everywhere.
                    </div>
                </div>
                <SearchBar size="big" />
            </div>
        </div>
    </>
    );
}