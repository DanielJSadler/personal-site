export const Pill = ({ label }: { label: string }) => {
  return (
    <div className="max-w-fit rounded-full border border-white px-2 py-1 text-xs">
      {label.toUpperCase()}
    </div>
  );
};
