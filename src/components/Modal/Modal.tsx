import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    photoData: { user: any; urls: any; location: any };
};

const Modal = ({ isOpen, setOpen, photoData }: ModalProps) => {
    if (!photoData) return null;

    const { user, urls, location } = photoData;

    const photoLocationItems = [location.city, location.country];
    const photoLocation = photoLocationItems.filter(Boolean).join(", ");

    const handleModalClose = () => setOpen(false);

    return (
        <div
            className={`fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[50] ${
                isOpen ? "block" : "hidden"
            }`}>
            <div
                className="cursor-zoom-out absolute top-0 right-0 bottom-0 left-0 bg-black/[.3]"
                onClick={handleModalClose}></div>
            <div className="w-[70vw] p-8 bg-white z-[2] rounded-md">
                <div
                    className="text-3xl cursor-pointer p-2.5 text-gray-300"
                    onClick={handleModalClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className="h-[500px] flex items-center justify-center">
                    <img
                        className="object-cover h-full max-w-full"
                        src={urls.regular}
                        alt="modal"
                    />
                </div>
                <div className="flex flex-col my-5 gap-2.5">
                    <span className="font-bold text-lg">Author:</span>
                    <span>{user.name}</span>
                </div>
                <div className="flex flex-col mt-5 gap-2.5">
                    <span className="font-bold text-lg">Location:</span>
                    <span>{photoLocation}</span>
                </div>
            </div>
        </div>
    );
};

export default Modal;
