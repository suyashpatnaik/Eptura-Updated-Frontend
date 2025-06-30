let currentLang = 'en'; // Default language

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

function startNewChat() {
  document.getElementById("chat-box").innerHTML = '';
}

function toggleLanguage() {
  const lang = document.getElementById('lang-toggle').value;
  currentLang = lang;

  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const input = document.getElementById('user-input');
  const search = document.getElementById('search');
  const newChat = document.getElementById('new-chat');
  const history = document.getElementById('chat-history');

  if (lang === 'jp') {
    title.innerText = 'エプチュラAI';
    subtitle.innerText = 'エプチュラAIへようこそ';
    input.placeholder = '何でも聞いてください...';
    search.placeholder = 'トピックで検索...';
    newChat.innerText = '+ 新しいチャット';
    history.innerText = 'チャット履歴';
  } else {
    title.innerText = 'Eptura AI';
    subtitle.innerText = 'Welcome to Eptura AI';
    input.placeholder = 'Ask me anything...';
    search.placeholder = 'Search by topic...';
    newChat.innerText = '+ New Chat';
    history.innerText = 'Chat History';
  }
}

function toggleTheme() {
  const container = document.getElementById("app");
  container.classList.toggle("dark-mode");
  container.classList.toggle("light-mode");
}

function sendMessage() {
  const inputEl = document.getElementById('user-input');
  const prompt = inputEl.value;

  if (!prompt.trim()) return;

  fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt, lang: currentLang })
  })
  .then(response => response.json())
  .then(data => {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div>${data.response}</div>`;
    if (data.image_url) {
      chatBox.innerHTML += `<img src="${data.image_url}" alt="Image result" />`;
    }
    inputEl.value = '';
  });
}