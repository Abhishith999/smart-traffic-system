// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyDaNMLLNcgv8NZPwBCjpIswrnpK-2UQNOg",
  authDomain: "smart-traffic-alert-syst-83b60.firebaseapp.com",
  projectId: "smart-traffic-alert-syst-83b60",
  storageBucket: "smart-traffic-alert-syst-83b60.firebasestorage.app",
  messagingSenderId: "887235933482",
  appId: "1:887235933482:web:979a5496481cc69afe9a53",
  measurementId: "G-4Q20VGGBLH"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form submit (Updated to use specific ID to prevent conflicts)
const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        // 🔐 Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 📦 Store extra details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          createdAt: new Date()
        });

        alert("User registered successfully! Please log in.");
        window.location.href = "login.html"; // Redirect to login on success

      } catch (error) {
        alert("Error: " + error.message);
      }
    });
}