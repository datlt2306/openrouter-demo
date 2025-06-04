const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = userInput.value;
  addMessage('user', userMessage);
  userInput.value = '';

  try {
    console.log("Sending message to server:", userMessage); // Log outgoing message
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] }),
    });
    const data = await response.json();
    console.log("Received response from server:", data); // Log server response
    addMessage('bot', data.reply);
  } catch (error) {
    console.error("Error during API call:", error); // Log error details
    addMessage('bot', 'Error: Unable to fetch response.');
  }
});

function addMessage(role, content) {
  const messageDiv = document.createElement('div');
  messageDiv.className = role === 'user' ? 'user-message' : 'bot-message';
  messageDiv.textContent = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
