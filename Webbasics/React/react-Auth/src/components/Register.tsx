import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@.#$%]).{8,24}$/;
const REGISTER_URL = "/register";

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
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      setErrMsg("Registration Failed");
    }
  };

  return (
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 bg-gray-100 p-6 rounded-md shadow-lg flex flex-col gap-4">
      {success ? (
        <div>
          <h1 className="text-4xl text-center">Success!</h1>
        </div>
      ) : (
        <div>
          <p
            ref={errRef}
            className={`text-red-500 mb-2 ${errMsg ? "" : "hidden"}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-4xl mb-4 text-center">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            {/* Username */}
            <div className="relative">
              <label className="block mb-1" htmlFor="username">
                Username:
                <span className={validName ? "" : "hidden"}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
                <span className={validName || !user ? "hidden" : ""}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              </label>
              <input
                className="w-full h-8 box-border border border-gray-300 rounded-md p-2 text-base leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-none"
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
              <div
                id="uidnote"
                className={`absolute top-full left-0 mt-2 w-64 bg-black text-white p-2 rounded-md text-sm z-10 ${
                  userFocus && user && !validName ? "" : "hidden"
                }`}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1" htmlFor="password">
                Password:
                <span className={validPwd ? "" : "hidden"}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
                <span className={validPwd || !pwd ? "hidden" : ""}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              </label>
              <input
                className="w-full h-8 box-border border border-gray-300 rounded-md p-2 text-base leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-none"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <div
                id="pwdnote"
                className={`absolute top-full left-0 mt-2 w-72 bg-black text-white p-2 rounded-md text-sm z-10 ${
                  pwdFocus && !validPwd ? "" : "hidden"
                }`}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Requires:
                <ul className="list-disc ml-4 mt-1">
                  <li>8–24 characters</li>
                  <li>1 uppercase, 1 lowercase, 1 number, 1 special char</li>
                  <li>Allowed: !@#$%^&amp;*()_-+=[]{}|;:,.&lt;&gt;?</li>
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block mb-1" htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? "" : "hidden"}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
                <span className={validMatch || !matchPwd ? "hidden" : ""}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              </label>
              <input
                className="w-full h-8 box-border border border-gray-300 rounded-md p-2 text-base leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-none"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <div
                id="confirmnote"
                className={`absolute top-full left-0 mt-2 w-64 bg-black text-white p-2 rounded-md text-sm z-10 ${
                  matchFocus && !validMatch ? "" : "hidden"
                }`}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Must match the first password.
              </div>
            </div>

            <button
              disabled={!validName || !validPwd || !validMatch}
              className="bg-blue-500 text-white p-2 mt-6 rounded-md disabled:opacity-50 hover:bg-blue-600 transition-all"
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
