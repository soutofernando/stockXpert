import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

interface Props {
  open?: boolean;
  class?: string;
  style?: string;
  children?: ComponentChildren;
}

function Modal(props: Props) {
  const {
    children,
    open,
  } = props;

  const id = `Modal`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open;

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  return (
    <div id={id} class={`py-12 bg-black bg-opacity-20 w-screen h-screen transition duration-150 ease-in-out z-10 absolute top-0 bottom-0 left-0 right-0 ${open ? "opacity-100 flex" : "opacity-0 invisible"}`}>
      {children}
    </div>
  );
}

export default Modal;
