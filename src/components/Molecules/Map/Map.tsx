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
    { country: "uk", value: 1999 },
    { country: "sg", value: 2019 },
    { country: "nl", value: 2017 },
  ];
  return (
    <WorldMap
      color="black"
      title="Countries I have visited"
      value-suffix="Visited"
      size="md"
      tooltipTextColor="black"
      data={data}
    />
  );
};
