const threadSectionDOM = document.querySelector(".thread-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");

let inputText = "";
let inputContentText = "";


//最初はThreadの全てを読み込む
const getAllThreads = async () => {
    try {
        const response = await axios.get("/api/v1/threads");
        const allThreads = response.data;

        // 出力
        const threadsHTML = allThreads.map((thread) => {
            const { title, content } = thread;
            return `
            <div class="single-thread">
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
            `;
        }).join(''); // 修正
        threadSectionDOM.innerHTML = threadsHTML; // 修正: ここでスレッドを表示
    } catch(err){
        console.log(err);
    }
};

getAllThreads();

//postメソッド
inputTextDOM.addEventListener("change", (e) => {
    inputText = e.target.value;
    console.log(inputText);
});
inputContentDOM.addEventListener("change", (e) => {
    inputContentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();

    if(inputText && inputContentText) {
        try {
            await axios.post("/api/v1/thread", {
                title: inputText,
                content: inputContentText,
            });

            getAllThreads(); // 修正: 新しいスレッドを投稿した後にリストを更新
            // フォームの入力フィールドをクリア
            inputTextDOM.value = '';
            inputContentDOM.value = '';

            // ローカル変数もリセット
            inputText = '';
            inputContentText = '';
        } catch(err) {
            console.log(err);
        }
    }
});
