// // CSVデータ
// const csvData = `名前,年齢,メールアドレス
// Alice,25,alice@example.com
// Bob,30,bob@example.com
// Charlie,35,charlie@example.com
// Dave,40,dave@example.com
// Eve,45,eve@example.com`;

function csv2Array(filePath) { //csvﾌｧｲﾙﾉ相対ﾊﾟｽor絶対ﾊﾟｽ
	var csvData = new Array();
	var data = new XMLHttpRequest();	
	data.open("GET", filePath, true); //true:非同期,false:同期
	data.send(null);

	var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	return csvData;
}

// CSVデータを行ごとに分割し、配列に変換する関数
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const data = [];
  
    for (let i = 1; i < lines.length; i++) {
        const row = {};
        const values = lines[i].split(',');
  
        for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j];
        }
  
        data.push(row);
    }
  
    return data;
}

// 名前を検索し、結果を表示する関数
function searchName() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value;

    if (name.trim() === '') {
        return; // 名前が空の場合は処理しない
    }
    var csv = csv2Array('./csv/BKC_CSV.csv');
    const data = csv;
    const matchingRows = data.filter(row => row['名前'] === name);

    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.innerHTML = `<p>User: ${name}</p>`;
    chatMessages.appendChild(userMessage);

    if (matchingRows.length > 0) {
        const assistantMessage = document.createElement('div');
        assistantMessage.classList.add('assistant-message');
        assistantMessage.innerHTML = `<p>Assistant: ${JSON.stringify(matchingRows)}</p>`;
        chatMessages.appendChild(assistantMessage);
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
