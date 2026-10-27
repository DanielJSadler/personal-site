import {
  DanielSadlerSvg,
  MobileDanielSadlerSvg,
} from "~/components/Atoms/DanielSadlerSvg";
interface Props {
  visible: boolean;
  onClick: () => void;
  loading: boolean;
  loadingArray: string[];
}
import { LoadingBar } from "~/components/Atoms/LoadingBar/LoadingBar";

export const LandingPage = ({
  onClick,
  visible,
  loading,
  loadingArray,
}: Props) => {
  return (
    <section
      style={{ zIndex: 1000 }}
      className={`landing-page absolute z-[1000] flex h-screen w-screen flex-col items-center justify-center bg-black ${visible ? `flex` : `hidden`}`}
    >
      <button type="button" onClick={onClick} disabled={loading} className="mt-8 border border-white px-6 py-3 text-white" aria-label="Enter portfolio">{loading ? "Opening?" : "Enter portfolio"}</button>
      <div>
        <DanielSadlerSvg fill="white" className="hidden md:flex" />
        <MobileDanielSadlerSvg fill="white" className="flex md:hidden" />
        <div className="h-2">
          {loading && <LoadingBar segments={loadingArray} />}
        </div>
      </div>
    </section>
  );
};
