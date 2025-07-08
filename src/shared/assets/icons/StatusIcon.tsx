import React from "react";

const StatusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.1875 22.75L19.6562 15H14.6562L15.5625 7.90625L9.78125 16.25H14.125L13.1875 22.75ZM10 27.5L11.25 18.75H5L16.25 2.5H18.75L17.5 12.5H25L12.5 27.5H10Z"
      fill="#486f8f"
    />
  </svg>
);

export { StatusIcon };
