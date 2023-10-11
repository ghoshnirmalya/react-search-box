import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  setDropdownVisibility: Dispatch<SetStateAction<boolean>>,
  setValue: Dispatch<SetStateAction<string>>,
  clearInput: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownVisibility(false);
        clearInput ? setValue("") : undefined;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideClick;
