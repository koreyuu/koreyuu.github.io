const jsonData = [
    {
        "name": "John",
        "time": "9:00 AM",
        "task": "Meeting"
    },
    {
        "name": "Jane",
        "time": "10:30 AM",
        "task": "Presentation"
    },
    {
        "name": "Bob",
        "time": "2:00 PM",
        "task": "Development"
    }
];

// 名前を検索し、結果を表示する関数
function searchName() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value;

    if (name.trim() === '') {
        return; // 名前が空の場合は処理しない
    }

    const matchingRows = jsonData.filter(row => row.name === name);

    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<p>User: ${name}</p>`;
    chatMessages.appendChild(userMessage);

    if (matchingRows.length > 0) {
        matchingRows.forEach(row => {
            const assistantMessage = document.createElement('div');
            assistantMessage.classList.add('assistant-message');
            assistantMessage.innerHTML = `<p>Assistant: 氏名: ${row.name}, 時刻: ${row.time}, 仕事内容: ${row.task}</p>`;
            chatMessages.appendChild(assistantMessage);
        });
    } else {
        const assistantMessage = document.createElement('div');
        assistantMessage.classList.add('assistant-message');
        assistantMessage.innerHTML = `<p>Assistant: 該当する名前は見つかりませんでした。</p>`;
        chatMessages.appendChild(assistantMessage);
    }

    nameInput.value = '';
}
// Enterキーのイベントハンドラを追加
document.getElementById('name-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Enterキーのデフォルトの挙動を無効化
        searchName(); // 名前の検索を実行
    }
});