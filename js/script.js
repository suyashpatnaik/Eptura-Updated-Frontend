
function startNewChat() {
    document.getElementById('chat-box').innerHTML = '';
}

function sendMessage() {
    const input = document.getElementById('user-input').value;
    fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
    })
    .then(response => response.json())
    .then(data => {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML += '<div>' + data.response + '</div>';
        if (data.image_url) {
            chatBox.innerHTML += '<img src="' + data.image_url + '" alt="Image result" />';
        }
    });
}
