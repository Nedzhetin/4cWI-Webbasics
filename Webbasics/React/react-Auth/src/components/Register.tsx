import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log("Success!");
    setSuccess(true);
  };

  return (
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 items-center w-1/4 h-1/2 bg-gray-100 p-6 rounded-md shadow-lg flex flex-col gap-4">
      {success ? (
        <div>
          <h1 className=" text-4xl ">Success!</h1>
        </div>
      ) : (
        <div>
          <p
            ref={errRef}
            className={errMsg ? "" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className=" text-4xl ">Register</h1>
          <form onSubmit={handleSubmit} className=" flex flex-col w-full">
            <label className="mb-2" htmlFor="username">
              Username:
              <span className={validName ? "" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 ml-2"
                />
              </span>
              <span className={validName || !user ? "hidden" : ""}>
                <FontAwesomeIcon icon={faTimes} className="text-red-500 ml-2" />
              </span>
              <br />
            </label>
            <input
              className="left-0 w- h-8 border border-gray-300 rounded-md p-2"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? "w-fit h-fit bg-black text-white p-2 rounded-md "
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label className="mb-2" htmlFor="password">
              Password:
              <span className={validPwd ? "" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 ml-2"
                />
              </span>
              <span className={validPwd || !pwd ? "hidden" : ""}>
                <FontAwesomeIcon icon={faTimes} className="text-red-500 ml-2" />
              </span>
              <br />
            </label>
            <input
              className="left-0 w- h-8 border border-gray-300 rounded-md p-2"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "w-fit h-fit bg-black text-white p-2 rounded-md "
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              requeres
              <ul>
                <li>Must be 8-24 characters and not begin with a number.</li>
                <li>
                  Must contain at least 1 uppercase letter, 1 lowercase letter,
                  1 number and 1 special character.
                </li>
                <li>
                  Allowed special characters: !@#$%^&amp;*()_-+=[]{}
                  |;:,.&lt;&gt;?
                </li>
              </ul>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 ml-2"
                />
              </span>
              <span className={validMatch || !matchPwd ? "hidden" : ""}>
                <FontAwesomeIcon icon={faTimes} className="text-red-500 ml-2" />
              </span>
              <br />
            </label>
            <input
              className="left-0 w- h-8 border border-gray-300 rounded-md p-2"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "w-fit h-fit bg-black text-white p-2 rounded-md "
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
              className="bg-blue-500 text-white p-2 mt-10 rounded-md"
            >
              Sign up
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default Register;
