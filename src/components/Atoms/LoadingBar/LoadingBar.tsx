interface Props {
  segments: string[];
}

export const LoadingBar = ({ segments }: Props) => {
  return (
    <div className="flex w-full flex-row border-b border-white pt-6">
      <div className="flex h-2 w-full flex-row">
        {segments.map((segment, index) => (
          <div
            key={segment}
            className={`h-2 w-1/6 bg-white ${index !== 0 ? "loadingfadeInFromLeft" : "loadingFadeIn"}`}
          />
        ))}
      </div>
    </div>
  );
};
