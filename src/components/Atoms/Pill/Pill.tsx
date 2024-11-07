export const Pill = ({ label }: { label: string }) => {
  return (
    <div className="font-helvetica max-w-fit rounded-full border border-black px-2 py-1 text-sm font-normal text-black">
      {label.toUpperCase()}
    </div>
  );
};
