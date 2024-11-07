import { Button } from "~/components/Atoms/Button";

interface Props {
  handleButtonClick: (side: string) => void;
}

export const Navigation = ({ handleButtonClick }: Props) => {
  return (
    <div className="absolute bottom-4 grid w-full grid-cols-3 flex-row gap-2 space-y-0 px-4 lg:left-4 lg:top-4 lg:flex lg:w-[150px] lg:flex-col lg:gap-0 lg:space-y-4 lg:px-0">
      <Button label="Home" onClick={() => handleButtonClick("front")} />
      <Button label="Experience" onClick={() => handleButtonClick("bottom")} />
      <Button label="Skills" onClick={() => handleButtonClick("right")} />
      <Button label="About Me" onClick={() => handleButtonClick("top")} />
      <Button label="Portfolio" onClick={() => handleButtonClick("left")} />
      <Button label="Pictures" onClick={() => handleButtonClick("back")} />
    </div>
  );
};
