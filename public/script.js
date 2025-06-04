const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = userInput.value;
    addMessage("user", userMessage);
    userInput.value = "";

    // Show typing indicator
    const typingIndicator = addMessage("bot", "Đang phản hồi...");

    try {
        console.log("Gửi yêu cầu đến máy chủ:", userMessage); // Hiển thị thông tin gửi yêu cầu
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [{ role: "user", content: userMessage }] }),
        });
        const data = await response.json();
        console.log("Nhận phản hồi từ máy chủ:", data); // Hiển thị thông tin nhận phản hồi
        typingIndicator.remove(); // Xóa mục chỉ báo đang gõ
        addMessage("bot", data.reply);
    } catch (error) {
        console.error("Lỗi trong quá trình gọi API:", error); // Hiển thị thông tin lỗi
        typingIndicator.remove(); // Remove typing indicator
        addMessage("bot", "Lỗi: Không thể lấy phản hồi.");
    }
});

function addMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.className = role === "user" ? "user-message" : "bot-message";
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv; // Return the message element for further manipulation
}
