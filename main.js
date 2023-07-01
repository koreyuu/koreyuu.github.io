// CSVファイル読み込み
function csvToArray(path) {
  var csvData = new Array();
  var data = new XMLHttpRequest();  
  data.open("GET", path, false);
  data.send(null);
  var LF = String.fromCharCode(10);
  var CR = String.fromCharCode(13);
  var lines = data.responseText.replace(/\n/g,'').split(CR);
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

    const data = csvToArray('https://docs.google.com/spreadsheets/d/e/2PACX-1vRd6SSkeoF4Q7GpqTp_5l9vg5_3fBAcmaPW55qq2Sg-VuVznkRXusKidnTxmbVGoHIKYuH5RHB9HTkN/pub?gid=213972052&single=true&output=csv');
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

console.log(data);