import React from 'react';

export const Button = (props) => {
  return React.createElement("button", {
    ...props,
    className: "btn",
  });
}