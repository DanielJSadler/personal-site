import { DanielSadlerSvg } from "~/components/Atoms/DanielSadlerSvg";
interface Props {
  visible: boolean;
  onClick: () => void;
  loading: boolean;
  loadingArray: string[];
}
import dynamic from "next/dynamic";
import { LoadingBar } from "~/components/Atoms/LoadingBar/LoadingBar";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const LoadingText = ({ loading }: { loading: boolean }) => (
  <div>
    {loading ? (
      <p className="font-helvetica text-base font-medium text-black">LOADING</p>
    ) : (
      <p className="font-helvetica text-base font-medium text-black">ENTER</p>
    )}
  </div>
);

export const LandingPage = ({
  onClick,
  visible,
  loading,
  loadingArray,
}: Props) => {
  return (
    <section
      onClick={onClick}
      className={`landing-page absolute z-50 flex h-screen w-screen flex-col items-center justify-center bg-black ${visible ? `flex` : `hidden`}`}
    >
      {visible && (
        <AnimatedCursor
          innerSize={0}
          outerSize={100}
          color="255, 255, 255"
          trailingSpeed={1}
          outerScale={2}
          outerAlpha={1}
          outerStyle={{
            mixBlendMode: "exclusion",
          }}
        >
          <LoadingText loading={loading} />
        </AnimatedCursor>
      )}
      <div>
        <DanielSadlerSvg fill="white" />
        <div className="h-2">
          {loading && <LoadingBar segments={loadingArray} />}
        </div>
      </div>
    </section>
  );
};
