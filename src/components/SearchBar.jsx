import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./searchbar.css";

/**
 * @param {{size?: "small" | "big", value?: string}} param
 */
export function SearchBar({size = "small", value = ""}){
    const [inputValue, setValue] = useState(value);
    const [autocomplete, setAutocomplete] = useState([]);
    const [isfocus, setFocus] = useState(false);
    
    const location = useNavigate();

    return (
        <>
            <div className="search-bar__closer" style={{display: isfocus ? "block" : "none"}} onClick={() => setFocus(false)} />
            <div className={size}>
                <div className="search-bar__wrapper" 
                    onClick={() => {
                        document.getElementById("searchInput").focus();
                    }}
                    onFocus={() => setFocus(true)}>
                    <div className="icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input id="searchInput" autoCorrect="off" autoComplete="off" type="text" value={inputValue} placeholder="Search free high-resolution photos" 
                        onChange={e => {
                            let value = e.target.value;
                            setValue(value);
                            if (value.length >= 3)
                                fetch(`https://unsplash.com/nautocomplete/${value}`, {
                                    method: "GET"
                                })
                                .then(res => res.json())
                                .then(json => setAutocomplete(json.autocomplete));
                        }} 
                        onKeyDown={e => {
                            if (e.code === "Enter")
                                location(`/photos/${inputValue}`);
                        }}
                        />
                    <div className="hint__wrapper" style={{display: (inputValue.length >= 3 && isfocus ? "block" : "none")}}>
                        {
                            autocomplete.length > 0 ?
                                autocomplete.sort((a, b) => b.priority - a.priority).map(e => {
                                    return <Link key={e.query} className="hint" to={`/photos/${e.query}`}>{e.query}</Link>
                                })
                            :
                                <div className="null-hint">Nie znaleziono</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}