import * as React from "react";
import { type SVGProps } from "react";
export const CubeTop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="196.186 106.516 96 96.931"
    className={props.className}
  >
    <g
      className={props.className}
      style={{
        strokeWidth: 4,
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    >
      <path d="M196.186 132.49h70.957v70.957h-70.957z" />
      <path d="M221.23 107.447h70.956v70.956H221.23zM266.913 203.447l25.273-25.273M196.186 203.447l25.273-25.273M196.186 132.72l25.273-25.273M266.913 132.72l25.273-25.273" />
    </g>

    <path
      d="m196.861 131.742 24.981-24.802 69.443-.424-24.105 24.978-70.319.248Z"
      className={props.className}
    />
  </svg>
);
