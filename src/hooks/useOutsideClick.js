import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenEventCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, listenEventCapturing);

      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenEventCapturing
        );
    },
    [handler, listenEventCapturing]
  );

  return { ref };
}
