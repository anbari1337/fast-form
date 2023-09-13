import React, { useContext, useState } from "react";
import { PasswordContext, PasswordDispatchContext } from "./passwordContext";

type InputProps = {
  name: string;
  placeholder: string;
  type: string;
};

const Input = ({ name, type, placeholder }: InputProps) => {
  const [value, setValue] = React.useState("");

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
const Password = () => {
  const password = useContext(PasswordContext);
  const setPassword = useContext(PasswordDispatchContext);

  if (setPassword === null) {
    throw new Error("Password must be a Decendent of PasswordDispatchContext");
  }

  return (
    <input
      name='password'
      type='password'
      value={password}
      placeholder='password'
      onChange={(e) => setPassword(e.target.value)}
    />
  );
};

const ConfirmPassword = ({ wasSubmit }: { wasSubmit: boolean }) => {
  const password = useContext(PasswordContext);
  const [value, setValue] = useState("");

  const error = password !== value && wasSubmit ? "Password doesn't match" : "";
  return (
    <div>
      <input
        name='confirmPassword'
        type='password'
        placeholder='confirm password'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <hr />
      {error && <span role='alert'>{error}</span>}
    </div>
  );
};

const PasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState("");
  return (
    <PasswordContext.Provider value={password}>
      <PasswordDispatchContext.Provider value={setPassword}>
        {children}
      </PasswordDispatchContext.Provider>
    </PasswordContext.Provider>
  );
};
let render = 0;

const FastForm = () => {
  const [wasSubmit, setWasSubmit] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    setWasSubmit(true);
    console.log(form.get("username"));
    console.log(form.get("password"));
    console.log(form.get("confirmPassword"));
  };

  render += 1;
  return (
    <>
      {render}
      <form onSubmit={handleSubmit}>
        <Input type='text' name='username' placeholder='username' />
        <PasswordProvider>
          <Password />
          <ConfirmPassword wasSubmit={wasSubmit} />
        </PasswordProvider>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

function App() {
  return (
    <div>
      <h1>Fast Form</h1>
      <FastForm />
    </div>
  );
}

export default App;
