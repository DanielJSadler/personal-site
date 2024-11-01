interface Props {
  text: string;
  header: string;
}

export const Experience = ({ header, text }: Props) => {
  return (
    <section className="experience-container flex h-full w-full flex-col items-center justify-center space-y-8 px-8">
      <div className="space-y-4">
        <h1 className="text-left text-4xl lg:text-center lg:text-6xl">
          {header}
        </h1>
        <h2 className="text-left text-sm lg:text-center lg:text-xl">{text}</h2>
      </div>
    </section>
  );
};
