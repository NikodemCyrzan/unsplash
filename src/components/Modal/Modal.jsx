import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//
// może najlepiej zrób sobie tego unsplasha w Typescripcie im szybciej sie go nauczysz tym lepiej
// https://www.youtube.com/watch?v=FJDVKeh7RJI
// https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
/**
 * @param {{isOpen: boolean, setOpen: (value: boolean) => void, photoData: object}}
 */
export function Modal({ isOpen, setOpen, photoData }) {
    // tutaj też early return by sie przydal i to mocno
    // if(!photoData){
    // 	return null
    // }
    // potem możemy zrobić coś takiego
    // const { user, urls, location } = photoData;
    // i odwoływać się do urls.regular czy user.name
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

    // można zrobić to tak:
    // const photoLocationCity = photoData.location.city;
    // const photoLocation = `${photoData.location.country} ${photoLocationCity ? `, ${photoLocationCity}` : ''}`

    // albo jeszcze lepiej

    // const photoLocationItems = [photoData.location.city, photoData.location.country]
    // const photoLocation = photoLocationItems.filter(Boolean).join(', ');

    if (photoData != null)
        return (
            <div
                className={`modal__wrapper fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[50] ${
                    isOpen ? "block" : "hidden"
                }`}>
                {/*  tego onClicka używamy dwa razy może warto wynieśc go do funkcji? np handleClick */}
                <div
                    className="cursor-zoom-out absolute top-0 right-0 bottom-0 left-0 bg-black/[.3]"
                    onClick={() => setOpen(false)}></div>
                <div className="w-[70vw] p-8 bg-white z-[2] rounded-md">
                    <div
                        className="text-3xl cursor-pointer p-2.5 text-gray-300"
                        onClick={() => setOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className="h-[500px] flex items-center justify-center">
                        <img
                            className="object-cover h-full max-w-full"
                            src={photoData.urls.regular}
                            alt="modal"
                        />
                    </div>
                    <div className="flex flex-col my-5 gap-2.5">
                        <span className="font-bold text-lg">Author:</span>
                        <span>{photoData.user.name}</span>
                    </div>
                    {/* 
							photoData.location.city != null ? `, ${photoData.location.city}` : ""  
							photoData.location.city ? `, ${photoData.location.city}` : ""
							a jeszcze lepiej przenieść do do osobnej zmiennej
						 */}
                    <div className="flex flex-col mt-5 gap-2.5">
                        <span className="font-bold text-lg">Location:</span>
                        <span>
                            {photoData.location.country}
                            {photoData.location.city != null
                                ? `, ${photoData.location.city}`
                                : ""}
                        </span>
                    </div>
                </div>
            </div>
        );
}
