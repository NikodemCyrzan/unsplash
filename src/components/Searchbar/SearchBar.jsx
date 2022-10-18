import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * @param {{size?: "small" | "big", value?: string}} param
 */
export function SearchBar({ size = "small", value = "" }) {
    const [inputValue, setValue] = useState(value);
    const [autocomplete, setAutocomplete] = useState([]);
    const [isfocus, setFocus] = useState(false); // powinno być isFocus a jeszcze lepiej isFocused, setIsFocused
    // https://itnext.io/maintain-a-clean-code-based-in-react-part-2-c609ae9b559e

    const location = useNavigate();

    // możemy po prostu zrobić tak
    const results = autocomplete?.sort((a, b) => b.priority - a.priority);
    return (
        <>
            <div
                className="fixed top-0 right-0 bottom-0 left-0"
                style={{ display: isfocus ? "block" : "none" }}
                onClick={() => setFocus(false)}
            />
            <div
                className={`cursor-text relative p-2 flex max-w-2xl mx-auto radius-md bg-white text-black gap-3 ${
                    size === "big"
                        ? "shadow-lg rounded-lg"
                        : "w-full rounded-full bg-gray-200"
                }`}
                onClick={() => {
                    // tutaj możesz poćwiczyć i zrobić to z użyciem ref https://dmitripavlutin.com/react-useref-guide/
                    document.getElementById("searchInput").focus();
                }}
                onFocus={() => setFocus(true)}>
                <div className="w-8 flex items-center text-gray-500 justify-center">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    className="p-0 w-full focus:outline-none text-lg bg-transparent"
                    id="searchInput"
                    autoCorrect="off"
                    autoComplete="off"
                    type="text"
                    value={inputValue}
                    placeholder="Search free high-resolution photos"
                    // https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b
                    // warto dodać jakiś debounce tak żeby request szedł dopiero po jakimś czasie od wpisania a nie przy wpisaniu każdej literki
                    onChange={(e) => {
                        let value = e.target.value; // tutaj powinnen być const
                        setValue(value);
                        if (value.length >= 3)
                            // wszystkie fetche lepiej przenieść do osobnych funkcji
                            fetch(
                                `https://unsplash.com/nautocomplete/${value}`,
                                {
                                    method: "GET",
                                }
                            )
                                .then((res) => res.json())
                                .then((json) =>
                                    setAutocomplete(json.autocomplete)
                                );
                        // + np w tym przypadku lepiej zrobić coś takiego
                        // https://gomakethings.com/the-early-return-pattern-in-javascript/

                        // if (value.length < 3){
                        // 	return;
                        // }

                        // fetch(`https://unsplash.com/nautocomplete/${value}`, {
                        // 	method: "GET"
                        // })
                        // 	.then(res => res.json())
                        // 	.then(json => setAutocomplete(json.autocomplete));
                    }}
                    onKeyDown={(e) => {
                        if (e.code === "Enter")
                            location(`/photos/${inputValue}`);
                    }}
                />
                <div
                    className={`absolute right-0 left-0 top-full rounded-md overflow-hidden py-2 bg-white ${
                        inputValue.length >= 3 && isfocus ? "block" : "hidden"
                    }`}
                    style={{ boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.1)" }}>
                    {results.length ? (
                        results.map((e) => (
                            <Link
                                key={e.query}
                                className="py-1.5 px-4 block hover:bg-gray-100"
                                to={`/photos/${e.query}`}>
                                {e.query}
                            </Link>
                        ))
                    ) : (
                        <div className="py-1.5 px-4 block text-gray-400">
                            Nie znaleziono
                        </div>
                    )}
                    {/*  a jeszcze lepiej
							{!results?.length ? 
								<div className="null-hint">Nie znaleziono</div> 
							: null}
							{results.map(e => (
								<Link key={e.query} className="hint" to={`/photos/${e.query}`}>{e.query}</Link>
							))} 
						*/}
                </div>
            </div>
        </>
    );
}
