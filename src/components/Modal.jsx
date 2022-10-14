import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./modal.css";

/**
 * @param {{isOpen: boolean, setOpen: (value: boolean) => void, photoData: object}}
 */
export function Modal({isOpen, setOpen, photoData}){
    if (photoData != null)
        return (
            <div className="modal__wrapper" active={isOpen.toString()}>
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
                        <div className="data-section"><span>Location:</span><span>{photoData.location.country}{photoData.location.city != null ? `, ${photoData.location.city}` : ""}</span></div>
                    </div>
                </div>
            </div>
        );
}