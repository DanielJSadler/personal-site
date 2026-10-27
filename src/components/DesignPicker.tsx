"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const designs = [
  { id: "original", name: "Original", description: "Your signature mark and soft colour washes." },
  { id: "studio", name: "Play studio", description: "Cobalt, butter yellow and oversized geometric type." },
  { id: "trail", name: "Off the clock", description: "Trail green, lilac and a relaxed outdoor rhythm." },
  { id: "coffee", name: "Coffee break", description: "Roast brown, porcelain blue and warm editorial type." },
  { id: "gallery", name: "Contact sheet", description: "A photographic grid with a gallery-white frame." },
  { id: "workshop", name: "Workshop", description: "Graph paper, technical lettering and visible structure." },
] as const;
type Design = (typeof designs)[number]["id"];
const DesignContext = createContext<Design>("original");
export const useDesign = () => useContext(DesignContext);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<Design>("original");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-design");
      if (designs.some(item => item.id === saved)) setDesign(saved as Design);
    } catch { /* Browsing with storage disabled still supports live previews. */ }
  }, []);
  const choose = (value: Design) => {
    setDesign(value);
    try { localStorage.setItem("portfolio-design", value); } catch { /* Optional persistence. */ }
  };
  return <DesignContext.Provider value={design}>
    <div data-design={design} className="design-root">
      {children}
      <details className="design-picker">
        <summary>Design: {designs.find(item => item.id === design)?.name}</summary>
        <fieldset>
          <legend>Choose a look</legend>
          {designs.map(item => <label key={item.id}>
            <input type="radio" name="design" value={item.id} checked={design === item.id} onChange={() => choose(item.id)} />
            <span><strong>{item.name}</strong><small>{item.description}</small></span>
          </label>)}
        </fieldset>
      </details>
    </div>
  </DesignContext.Provider>;
}
