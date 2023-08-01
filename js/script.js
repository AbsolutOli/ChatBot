const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add('chat', className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector('p');

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            body: userMessage,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            messageElement.textContent = `Not ${data.body}`;
        }).catch((error) => {
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).finally(() => {
            chatbox.scroll(0, chatbox.scrollHeight);
        });

    // const API_URL = "https://api.openai.com/v1/chat/completions";

    // const requestOptions = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${API_KEY}`
    //     },
    //     body: JSON.stringify({
    //         model: "gpt-3.5-turbo",
    //         messages: [{ role: "user", content: userMessage }]
    //     })
    // }

    // fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    //     console.log(data);
    // }).catch((error) => {
    //     console.log(error);
    // })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scroll(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scroll(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600)
}

sendChatBtn.addEventListener('click', handleChat);