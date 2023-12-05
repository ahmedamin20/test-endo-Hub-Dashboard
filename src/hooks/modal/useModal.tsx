import { Dispatch, SetStateAction, useState } from "react";

export default function useModal(): [
  openModal: () => void,
  closeModal: () => void,
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
] {
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setShowModal(!showModal);
    window.removeEventListener("keydown", handleEsc);
  }

  function openModal() {
    window.addEventListener("keydown", handleEsc);
    document.body.classList.add("overflow-hidden");
  }

  function handleEsc(event: KeyboardEvent) {
    if (event.key == "Escape") closeModal();
  }
  return [openModal, closeModal, showModal, setShowModal];
}
