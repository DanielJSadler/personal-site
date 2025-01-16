export const Pill = ({ label }: { label: string }) => {
  return (
    <div className="max-w-fit rounded-full border border-black px-2 py-1 text-xs font-normal text-black md:text-sm">
      {label.toUpperCase()}
    </div>
  );
};
