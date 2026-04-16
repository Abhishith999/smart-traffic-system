const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let users = []; // Temporary storage

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    // Save user
    users.push({ name, email, password });
    console.log("New User:", { name, email });

    // 🔥 This is where firewall integration happens
    // Example: sendToFirewall(req.body);

    res.json({ message: "User registered successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});