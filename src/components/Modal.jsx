import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

// przy komponentach najlepiej robić taką strukture :
//
//	/components
//		/Modal
//			/Modal.jsx
//			/modal.css
//
//
// może najlepiej zrób sobie tego unsplasha w Typescripcie im szybciej sie go nauczysz tym lepiej
// https://www.youtube.com/watch?v=FJDVKeh7RJI
// https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
/**
 * @param {{isOpen: boolean, setOpen: (value: boolean) => void, photoData: object}}
 */
export function Modal({isOpen, setOpen, photoData}){
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
            <div className="modal__wrapper" active={isOpen.toString()}>
				{/*  tego onClicka używamy dwa razy może warto wynieśc go do funkcji? np handleClick */}
                <div className="modal__background" onClick={() => setOpen(false)}></div>
                <div className="modal__container">
                    <div className="close" onClick={() => setOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className="image__container">
                        <img src={photoData.urls.regular} alt="modal" />
                    </div>
                    <div className="image-data__container">
                        <div className="data-section"><span>Author:</span><span>{photoData.user.name}</span></div>
                    </div>
                    <div className="image-data__container">

						 {/* 
							photoData.location.city != null ? `, ${photoData.location.city}` : ""  
							photoData.location.city ? `, ${photoData.location.city}` : ""
							a jeszcze lepiej przenieść do do osobnej zmiennej
						 */}
                        <div className="data-section">
							<span>Location:</span>
							<span>{photoData.location.country}{photoData.location.city != null ? `, ${photoData.location.city}` : ""}</span>
						</div>
                    </div>
                </div>
            </div>
        );
}