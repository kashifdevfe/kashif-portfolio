import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });
    requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
        // cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      }
      requestAnimationFrame(loop);
    });
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          //   cursor.style.transform = `translate(${rect.left}px,${rect.top}px)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });
  }, []);

  return (
    <div className="cursor-main" ref={cursorRef}>
      <svg
        className="cursor-wand-svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handle */}
        <path
          d="M4.5 20.5L11.5 13.5"
          stroke="#4dff40"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Star */}
        <path
          d="M15 4L16.5 8L20.5 8.5L17.5 11.5L18.5 15.5L15 13.5L11.5 15.5L12.5 11.5L9.5 8.5L13.5 8L15 4Z"
          fill="#0b080c"
          stroke="#4dff40"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Small Sparkles */}
        <path d="M20 2L20.5 3.5L22 4L20.5 4.5L20 6L19.5 4.5L18 4L19.5 3.5L20 2Z" fill="#4dff40" />
        <path d="M8 3L8.5 4.5L10 5L8.5 5.5L8 7L7.5 5.5L6 5L7.5 4.5L8 3Z" fill="#4dff40" />
      </svg>
    </div>
  );
};

export default Cursor;
