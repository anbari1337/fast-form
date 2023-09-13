import React from "react";

const PasswordContext = React.createContext<string>("");
const PasswordDispatchContext = React.createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

export { PasswordContext, PasswordDispatchContext };
