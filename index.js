const fs = require("fs");
const path = require("path");

// Lire le cookie depuis compte.txt
const cookiePath = path.join(__dirname, "compte.txt");
const COOKIE = fs.existsSync(cookiePath) 
  ? fs.readFileSync(cookiePath, "utf8").trim() 
  : "";

if (!COOKIE) {
  console.log("❌ Mets ton cookie dans compte.txt d'abord !");
  process.exit(1);
}

const { login } = require("./utils/login");
const handleMessage = require("./handles/message");

global.GoatBot = {
  commands: new Map(),
  aliases: new Map(),
  config: {
    prefix: "", // Pas de préfixe → répond tout de suite
    adminUID: "", // Ton ID Facebook
    autoRead: true,
    typingIndicator: true
  }
};

async function startBot() {
  try {
    console.log("🔁 Connexion en cours...");
    
    const api = await login({ cookie: COOKIE });
    
    console.log("✅ Angela connectée ! — Ariel Aks Otaku 💙");

    // Écouter les messages
    api.listenMention(async (err, event) => {
      if (err) return console.error("Erreur :", err);
      
      // Répond en privé ET dans groupe
      await handleMessage({ api, event });
    });

    // Aussi les messages privés directs
    api.listen(async (err, event) => {
      if (err) return;
      if (event.type === "message") {
        await handleMessage({ api, event });
      }
    });

  } catch (err) {
    console.log("❌ Erreur connexion :", err.message);
    console.log("🔄 Réessai dans 10s...");
    setTimeout(startBot, 10000);
  }
}

startBot();
    
