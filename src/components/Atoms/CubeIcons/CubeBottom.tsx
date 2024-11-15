import * as React from "react";
import { type SVGProps } from "react";
export const CubeBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="196.186 106.818 96.319 96.629"
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
      d="m196.861 131.742 24.981-24.802M198.206 203.062l23.578-25.103 70.721.131-25.349 25.19-68.95-.218Z"
      className={props.className}
    />
  </svg>
);
