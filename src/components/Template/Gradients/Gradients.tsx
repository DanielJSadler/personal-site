import clsx from "clsx";

interface Props {
  currentClass: string;
}
export const Gradients = ({ currentClass }: Props) => {
  return (
    <>
      <div
        className={clsx(
          `absolute h-full w-full rounded-full bg-gradient-to-b from-[#00C2FF] to-[#293FFF] blur-3xl transition-opacity duration-[3000ms] md:h-2/3 md:w-2/3 md:duration-[1500ms]`,
          {
            "opacity-100": currentClass === "show-front",
            "opacity-0": currentClass !== "show-front",
          },
        )}
      />

      <div
        className={clsx(
          `absolute h-full w-full rounded-full bg-gradient-to-b from-[#00C2FF] to-[#FF29C3] blur-3xl transition-opacity duration-[3000ms] md:h-2/3 md:w-2/3 md:duration-[1500ms]`,
          {
            "opacity-100": currentClass === "show-right",
            "opacity-0": currentClass !== "show-right",
          },
        )}
      />

      <div
        className={clsx(
          `absolute h-full w-full rounded-full bg-gradient-to-b from-[#FF29C3] to-[#FFD700] blur-3xl transition-opacity duration-[3000ms] md:h-2/3 md:w-2/3 md:duration-[1500ms]`,
          {
            "opacity-100": currentClass === "show-back",
            "opacity-0": currentClass !== "show-back",
          },
        )}
      />

      <div
        className={clsx(
          `absolute h-full w-full rounded-full bg-gradient-to-b from-[#FFD700] to-[#4CAF50] blur-3xl transition-opacity duration-[3000ms] md:h-2/3 md:w-2/3 md:duration-[1500ms]`,
          {
            "opacity-100": currentClass === "show-left",
            "opacity-0": currentClass !== "show-left",
          },
        )}
      />

      <div
        className={clsx(
          `absolute h-full w-full rounded-full bg-gradient-to-b from-[#4CAF50] to-[#FF5733] blur-3xl transition-opacity duration-[3000ms] md:h-2/3 md:w-2/3 md:duration-[1500ms]`,
          {
            "opacity-100": currentClass === "show-top",
            "opacity-0": currentClass !== "show-top",
          },
        )}
      />

      <div
        className={clsx(
          `absolute h-full w-full rounded-full bg-gradient-to-b from-[#FF5733] to-[#00C2FF] blur-3xl transition-opacity duration-[3000ms] md:h-2/3 md:w-2/3 md:duration-[1500ms]`,
          {
            "opacity-100": currentClass === "show-bottom",
            "opacity-0": currentClass !== "show-bottom",
          },
        )}
      />
    </>
  );
};
