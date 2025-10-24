import { useEffect, useId, useRef, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

export default function Collapse({ title, children, defaultOpen = false }) {
  // id UNIQUE par instance (évite tout conflit ARIA / label / CSS)
  const uid = useId();

  // état LOCAL au composant, aucune prop de contrôle
  const [open, setOpen] = useState(defaultOpen);

  // animation hauteur
  const [maxH, setMaxH] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setMaxH(open ? el.scrollHeight : 0);
  }, [open, children]);

  // recalcule si la fenêtre bouge (contenu responsive)
  useEffect(() => {
    const onResize = () => {
      if (!contentRef.current) return;
      setMaxH(open ? contentRef.current.scrollHeight : 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <div
      data-collapse={uid} // juste utile pour le debug
      className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm overflow-hidden"
    >
      {/* HEADER : pas d'état partagé, pas de CSS global */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left text-white font-semibold text-lg hover:bg-white/10 transition"
      >
        <span>{title}</span>

        {/* on bloque la propagation sur l’icône au cas où un parent aurait un onClick */}
        <FaChevronUp
          onClick={(e) => e.stopPropagation()}
          className={`text-white text-sm transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Corps avec animation via max-height (scopé à l’instance) */}
      <div
        id={`${uid}-panel`}
        ref={contentRef}
        style={{ maxHeight: `${maxH}px`, transition: "max-height 300ms ease" }}
        className="overflow-hidden"
      >
        <div className="px-5 py-3 text-white/90">{children}</div>
      </div>
    </div>
  );
}
