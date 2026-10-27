"use client";

import Image from "next/image";
import { useDesign } from "~/components/DesignPicker";

export function DesignHome() {
  const design = useDesign();
  if (design === "original") return null;
  return <section className={`design-home home-${design}`} aria-label="Daniel Sadler, full-stack developer">
    {design === "studio" && <>
      <div className="studio-disc" aria-hidden="true">ds.</div>
      <h1>Daniel<br />Sadler<span>.</span></h1>
      <p>Thoughtful interfaces.<br />Solid engineering.</p>
      <span className="home-role">Full-stack developer</span>
    </>}
    {design === "trail" && <>
      <p className="home-role">Developer. Runner. Curious person.</p>
      <h1>Good things<br />take a<br /><em>little exploring.</em></h1>
      <div className="trail-path" aria-hidden="true"><span /><span /><span /></div>
      <p>I’m Daniel Sadler. I build for the web,<br />then head outside.</p>
    </>}
    {design === "coffee" && <>
      <div className="coffee-heading"><span>Daniel Sadler</span><span>Web &amp; mobile</span></div>
      <h1>Made with<br /><em>care.</em></h1>
      <div className="coffee-bottom"><Image src="/photos/IMG_0054.webp" alt="A carefully poured flat white" width={200} height={240} /><p>From roasting coffee<br />to crafting software.<br /><br />Full-stack development,<br />with attention to detail.</p></div>
    </>}
    {design === "gallery" && <>
      <header><h1>Daniel Sadler</h1><p>Development &amp; everything in between.</p></header>
      <div className="contact-sheet">{["IMG_0054.webp", "IMG_0608.webp", "IMG_0706.webp", "IMG_0826.webp"].map((photo, i) => <Image key={photo} src={`/photos/${photo}`} width={240} height={240} alt={["Coffee", "Travel journal", "A moment outdoors", "Travel photography"][i] ?? "Travel photography"} />)}</div>
      <p className="gallery-caption">A selection of work, places and small discoveries.</p>
    </>}
    {design === "workshop" && <>
      <div className="workshop-heading"><span>Daniel Sadler</span><span>Full-stack developer</span></div>
      <h1>Built to<br />make sense.</h1>
      <div className="workshop-diagram" aria-hidden="true"><span>Interface</span><b>+</b><span>Logic</span><b>=</b><span>Experience</span></div>
      <p>React &amp; Next.js on the surface.<br />Node.js &amp; Postgres underneath.<br />Care throughout.</p>
    </>}
  </section>;
}
