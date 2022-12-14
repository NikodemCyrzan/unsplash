import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAutocomplete } from "modules/services";
import debounce from "lodash.debounce";

type SearchBarProps = {
    size?: "small" | "big";
    value?: string;
};

const SearchBar = ({ size = "small", value = "" }: SearchBarProps) => {
    const [inputValue, setValue] = useState<string>(value);
    const [autocomplete, setAutocomplete] = useState<any>([]);
    const [isFocused, setFocused] = useState<boolean>(false);

    const searchInputRef = useRef<any>();

    const location = useNavigate();

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setValue(value);

        if (value.length < 3) return null;

        (async () => {
            const res = await getAutocomplete(value);
            setAutocomplete(res?.autocomplete);
        })();
    };
    const debouncedResults = useMemo(() => {
        return debounce(handleInputChange, 300);
    }, []);

    useEffect(() => {
        searchInputRef.current.value = value;
    }, [value]);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const results = autocomplete?.sort(
        (a: any, b: any) => b.priority - a.priority
    );
    return (
        <>
            <div
                className={`fixed top-0 right-0 bottom-0 left-0 ${
                    isFocused ? "block" : "hidden"
                }`}
                onClick={() => setFocused(false)}
            />
            <div
                className={`cursor-text relative p-2 flex max-w-2xl mx-auto radius-md bg-white text-black gap-3 ${
                    size === "big"
                        ? "shadow-lg rounded-lg"
                        : "w-full rounded-full bg-gray-200"
                }`}
                onClick={() => {
                    searchInputRef.current.focus();
                }}
                onFocus={() => setFocused(true)}>
                <div className="w-8 flex items-center text-gray-500 justify-center">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    className="p-0 w-full focus:outline-none text-lg bg-transparent"
                    ref={searchInputRef}
                    autoCorrect="off"
                    autoComplete="off"
                    type="text"
                    placeholder="Search free high-resolution photos"
                    onChange={debouncedResults}
                    onKeyDown={(e) => {
                        if (e.code === "Enter")
                            location(`/photos/${inputValue}`);
                    }}
                />
                <div
                    className={`absolute right-0 left-0 top-full rounded-md overflow-hidden py-2 bg-white ${
                        inputValue.length >= 3 && isFocused ? "block" : "hidden"
                    }`}
                    style={{ boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.1)" }}>
                    {!results?.length ? (
                        <div className="py-1.5 px-4 block text-gray-400">
                            Nie znaleziono
                        </div>
                    ) : null}
                    {results.map((e: any) => (
                        <Link
                            key={e.query}
                            className="py-1.5 px-4 block hover:bg-gray-100"
                            to={`/photos/${e.query}`}>
                            {e.query}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchBar;
