interface Props {
  text: string;
  header: string;
}

export const Experience = ({ header, text }: Props) => {
  return (
    <section className="experience-container flex h-full w-full flex-col items-center justify-center space-y-8 px-8">
      <div className="space-y-4">
        <h1 className="font-helvetica text-left text-4xl text-black lg:text-6xl">
          {header.toUpperCase()}
        </h1>
        <h2 className="text-left text-sm text-black lg:text-xl">{text}</h2>
      </div>
    </section>
  );
};
