import WorldMap from "react-svg-worldmap";
export const TravelMap = () => {
  const data = [
    { country: "al", value: 2024 },
    { country: "fr", value: 2024 },
    { country: "au", value: 2019 },
    { country: "de", value: 2014 },
    { country: "be", value: 2024 },
    { country: "pt", value: 2023 },
    { country: "es", value: 2022 },
    { country: "gb", value: 1999 },
    // Singapore is not included in the map library's geography.
    { country: "nl", value: 2017 },
  ] as const;
  return (
    <WorldMap
      color="black"
      title="Countries I have visited"
      value-suffix="Visited"
      size="md"
      tooltipTextColor="black"
      data={[...data]}
    />
  );
};
