const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Lire le cookie
const cookiePath = path.join(__dirname, "compte.txt");
let COOKIE = "";

if (fs.existsSync(cookiePath)) {
  COOKIE = fs.readFileSync(cookiePath, "utf8").trim();
}

if (!COOKIE) {
  console.log("❌ Mets ton cookie dans compte.txt d'abord !");
  process.exit(1);
}

console.log("✅ Cookie lu avec succès !");

// Page de test
app.get("/", (req, res) => {
  res.send("🤖 Angela est en ligne — créée par Ariel Aks Otaku ✨");
});

// Garder le bot éveillé
setInterval(async () => {
  try {
    await axios.get(`http://localhost:${PORT}`);
    console.log("✅ Angela reste éveillée...");
  } catch (e) {}
}, 300000); // 5 minutes

app.listen(PORT, () => {
  console.log(`✅ Serveur Angela démarré sur le port ${PORT}`);
  console.log("✨ Prête à répondre — Ariel Aks Otaku");
});
