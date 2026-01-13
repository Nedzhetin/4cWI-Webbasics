import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const app = express();
const port = process.env.PORT || 3500;

const firebaseConfig = {
  apiKey: "AIzaSyBEJeUrVGxKOZH8uQFZpFzOgA2Eisp5t8g",
  authDomain: "userdb-c004c.firebaseapp.com",
  projectId: "userdb-c004c",
  storageBucket: "userdb-c004c.firebasestorage.app",
  messagingSenderId: "3500078196",
  appId: "1:3500078196:web:9192dd36b14f2b930ecd21",
  measurementId: "G-Z3D4K4XVDD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function tryGettingAllUsers(req, res) {
  try {
    const snap = await getDocs(collection(db, "Users"));
    const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ error: err.message || "Failed to fetch users" });
  }
}

async function tryRegisterUser(req, res) {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const docRef = await addDoc(collection(db, "Users"), {
      user,
      pwd,
      createdAt: Date.now(),
    });
    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("Failed to register user:", err);
    res.status(500).json({ error: err.message || "Failed to register user" });
  }
}

app.get("/users", async (req, res) => {
  await tryGettingAllUsers(req, res);
});

app.post("/register", async (req, res) => {
  await tryRegisterUser(req, res);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
