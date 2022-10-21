import { useEffect, useState } from "react";
import SearchBar from "components/SearchBar/SearchBar";
import { getRandomImage } from "modules/services";

const Main = () => {
    const [backgroundImage, setBackgroundImage] = useState<string>("");
    // 2 poprawna wersja
    // const [backgroundImage, setBackgroundImage] = useState<string>();
    useEffect(() => {
        (async () => {
            const randomImage = await getRandomImage();
            // można zrobić tak wtedy nie mamy undefined tylko zawsze "" kiedy nie ma zdjęcia
            setBackgroundImage(randomImage?.urls?.full ?? "");
            // 2 poprawna wersja:
            // setBackgroundImage(randomImage?.urls?.full);
        })();
    }, []);

    return (
        <>
            <div
                className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-center bg-no-repeat bg-cover text-white bg-white"
                style={{ backgroundImage: `url("${backgroundImage}")` }}
                // 2 poprawna wersja
                // style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
                >

                <div className="bg-black/[.35] backdrop-blur-md p-20 rounded-lg main__container">
                    <div className="text-5xl font-bold">Unsplash</div>
                    <div className="my-5 flex flex-col gap-3 font-semibold">
                        <div className="text-lg">
                            The internet's source of{" "}
                            <a href="link" className="underline">
                                freely-usable images.
                            </a>
                        </div>
                        <div className="text-lg">
                            Powered by creators everywhere.
                        </div>
                    </div>
                    <SearchBar size="big" />
                </div>
            </div>
        </>
    );
};

export default Main;