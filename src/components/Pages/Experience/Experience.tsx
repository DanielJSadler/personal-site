import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

interface Props {
  setPage: (page: number) => void;
  text: string;
  header: string;
}

export const Experience = ({ setPage, header, text }: Props) => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center space-y-8 px-8 lg:px-[250px]">
      <div className="space-y-4">
        <h1 className="text-left text-6xl lg:text-center">{header}</h1>
        <h2 className="text-left lg:text-center">{text}</h2>
      </div>
    </section>
  );
};
