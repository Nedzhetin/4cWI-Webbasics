import { auth, provider, db } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
const cookies = new Cookies();

const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
            C
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome to ChatApp
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Sign in to continue and chat with your friends.
          </p>

          <button
            onClick={signInWithGoogle}
            className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:shadow-md transition-shadow duration-150"
            aria-label="Sign in with Google"
          >
            {/* Google SVG */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fill="#4285F4"
                d="M21.35 11.1h-9.2v2.92h5.28c-.23 1.26-1.15 2.33-2.44 3.02v2.5h3.95c2.32-2.14 3.65-5.28 3.65-8.95 0-.6-.05-1.18-.19-1.69z"
              />
              <path
                fill="#34A853"
                d="M12.15 22c2.58 0 4.74-.85 6.32-2.33l-3.95-2.5c-1.08.73-2.46 1.16-3.9 1.16-2.99 0-5.52-2.02-6.42-4.73H1.69v2.98C3.28 19.93 7.41 22 12.15 22z"
              />
              <path
                fill="#FBBC05"
                d="M5.73 13.6a7.38 7.38 0 010-3.2V7.42H1.69a11.96 11.96 0 000 9.16l4.04-2.98z"
              />
              <path
                fill="#EA4335"
                d="M12.15 4.6c1.4 0 2.66.48 3.65 1.42l2.74-2.74C16.9 1.46 14.73.6 12.15.6 7.41.6 3.28 2.67 1.69 6.02l4.04 2.98c.9-2.71 3.43-4.4 6.42-4.4z"
              />
            </svg>

            <span>Sign in with Google</span>
          </button>

          <p className="mt-3 text-xs text-gray-400 text-center">
            We only store your basic profile to identify you in chats.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
