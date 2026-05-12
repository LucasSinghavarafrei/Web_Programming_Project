class ChatHistory {
    constructor() { this.messages = []; }
    addMessage(message) { this.messages.push(message); }
    getHistory() { return this.messages; }
}

const historyMessages = new ChatHistory();
let chatbotIntents = []; 

// 1. Charger le JSON une seule fois au chargement de la page
fetch('../json/intent.json')
    .then(response => {
        if (!response.ok) throw new Error('Erreur de fichier JSON');
        return response.json();
    })
    .then(data => { chatbotIntents = data.intents; })
    .catch(error => console.error("Attention : Utilisez Live Server pour lire le fichier JSON localement.", error));

// 2. Traiter le message
function processMessage(message) {
    let response = "I'm sorry, I don't have information on that topic. Try asking about courses or campus!";
    const lowerMessage = message.toLowerCase();

    chatbotIntents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if (lowerMessage.includes(pattern.toLowerCase())) {
                // Choisit une réponse au hasard dans celles proposées
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });
    return response;
}

// 3. Afficher les bulles dans la boîte
function showMessage(message, type, save = true) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    const msgElement = document.createElement('p');
    msgElement.textContent = message;
    msgElement.className = type;
    chatBox.appendChild(msgElement);

    // Fait défiler le chat vers le bas automatiquement
    chatBox.scrollTop = chatBox.scrollHeight;

    if (save) historyMessages.addMessage({ text: message, sender: type });
}

// 4. Fonction principale pour gérer l'envoi
function handleSend() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value.trim();

    if (userMessage === "") return; // Stoppe si le champ est vide

    showMessage(userMessage, 'user');
    inputField.value = ""; // Vide le champ tout de suite

    // Petit délai de réflexion du bot (400ms) pour faire plus naturel
    setTimeout(() => {
        const botResponse = processMessage(userMessage);
        showMessage(botResponse, 'bot');
    }, 400);
}

// 5. Initialisation des événements quand la page est chargée
window.addEventListener('load', () => {
    // Restaurer l'historique
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(msg => {
            showMessage(msg.text, msg.sender, false);
            historyMessages.addMessage(msg);
        });
    }

    // ÉCOUTER LA TOUCHE ENTRÉE
    const inputField = document.getElementById('user-input');
    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }

    // ÉCOUTER LE CLIC SUR "SEND"
    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }
});

// Sauvegarder l'historique en quittant la page
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('chatHistory', JSON.stringify(historyMessages.getHistory()));
});