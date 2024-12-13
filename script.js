document.addEventListener('DOMContentLoaded', function() {
    // Load messages from cookies if available
    const messages = loadMessagesFromCookies() || [];
    messages.forEach(message => addMessage(message.user, message.text));
});

function sendMessage() {
    const input = document.getElementById('user-input');
    const messageText = input.value.trim();
    if (messageText) {
        addMessage('User', messageText);
        input.value = '';
        // Simulating API call to Grok AI
        simulateGrokResponse(messageText);
        saveMessagesToCookies();
    }
}

function simulateGrokResponse(userMessage) {
    // Here we would actually call the Grok AI API
    // For now, we'll just simulate a response
    setTimeout(() => {
        const grokResponse = `Grok's witty response to: "${userMessage}"`;
        addMessage('Grok', grokResponse);
        saveMessagesToCookies();
    }, 1000); // Simulating network delay
}

function addMessage(user, text) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${user}:</strong> ${text}`;
    document.getElementById('chat-messages').appendChild(messageDiv);
    // Scroll to bottom
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
}

function saveMessagesToCookies() {
    const messages = Array.from(document.getElementById('chat-messages').children).map(div => ({
        user: div.querySelector('strong').textContent.replace(':', ''),
        text: div.textContent.split(': ')[1]
    }));
    document.cookie = `chatMessages=${JSON.stringify(messages)}; max-age=3600`; // Cookie expires in 1 hour
}

function loadMessagesFromCookies() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('chatMessages='));
    if (cookie) {
        return JSON.parse(cookie.split('=')[1]);
    }
    return null;
}
