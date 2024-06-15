
// Existing code

function showDatePicker() {
    const datePicker = flatpickr("#date-picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        defaultDate: "today",
        maxDate: new Date().fp_incr(30) // 30 days from now
    });

    const modalBody = document.getElementById("chatbot-body");
    modalBody.innerHTML += `
        <input type="text" id="date-picker" placeholder="Select date and time...">
        <button onclick="confirmBooking()">Confirm</button>
    `;
}

function confirmBooking() {
    const dateTime = document.getElementById("date-picker").value;
    output(dateTime);
}

// Existing code


const userMessage = [
    ["hi", "hey", "hello"],
    ["sure", "yes", "no"],
    ["are you genious", "are you nerd", "are you intelligent"],
    ["i hate you", "i dont like you"],
    ["how are you", "how is life", "how are things", "how are you doing"],
    ["i want to do booking", "do booking", "book appointment", "book", "book date", "book on date", "appointment", "book on date and time"],
    ["book appointment"],
    ["appointment"],
    ["fever"],
    ["corona"],

    ["how is corona", "how is covid 19", "how is covid19 situation", "what is corona"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "what are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you", "who is your creator"],
    [
      "your name please",
      "your name",
      "may i know your name",
      "what is your name",
      "what call yourself"
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "ok", "okay", "nice", "welcome"],
    ["thanks", "thank you"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["corona", "covid19", "coronavirus"],
    ["you are funny"],
    ["i dont know"],
    ["boring"],
    ["im tired"],
    ["who is the president", "who is the prime minister"],
    ["what is the capital of", "where is", "which country"],
    
    ["what is ", "how to ", "when", "when", "which"]
];

const botReply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    ["Okay"],
    ["Yes I am!"],
    ["I'm sorry about that. But I like you dude."],
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?"
    ],
    ["Please mention the doctor's name and date & time", "Please mention, Doctor's name and date & time"],
    ["Kindly mention, Doctor's name and Date & Time"],
    ["Mention, Doctor's name and Date & Time"],
    ["Rest and drink plenty of fluids. Medication isn't needed. Call the doctor if the fever is accompanied by a severe headache, stiff neck, shortness of breath, or other unusual signs or symptoms."],
    ["Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus. Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment."],

    ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
    [
      "Nothing much",
      "About to go to sleep",
      "Can you guess?",
      "I don't know actually"
    ],
    ["I am always young."],
    ["I am just a bot", "I am a bot. What are you?"],
    ["Sabitha Kuppusamy"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["You're welcome"],
    ["Briyani", "Burger", "Sushi", "Pizza"],
    ["Dude!"],
    ["Yes?"],
    ["Please stay home"],
    ["Glad to hear it"],
    ["Say something interesting"],
    ["Sorry for that. Let's chat!"],
    ["Take some rest, Dude!"],
    ["The current president is...", "The prime minister is..."],
    ["The capital is...", "It is located in...", "That country is..."],
    
    ["For searching on Google, add backend in code"]
];

const alternative = [
    "Same here, dude.",
    "That's cool! Go on...",
    "Dude...",
    "Ask something else...",
    "Hey, I'm listening..."
];

const synth = window.speechSynthesis;

function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
}

function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    input != "" && output(input);
    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
      if (e.code === "Enter") {
        let input = inputField.value.trim();
        input != "" && output(input);
        inputField.value = "";
      }
    });
});

let bookingStep = 0;
let bookingDetails = {};

function output(input) {
    let product;

    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

    text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .trim();

    if (bookingStep === 1) {
        bookingDetails.doctor = text;
        product = "Please mention the date and time for the appointment.";
        showDatePicker();
        bookingStep++;
    } else if (bookingStep === 2) {
        bookingDetails.dateTime = text;
        product = `Your appointment with Dr. ${bookingDetails.doctor} is booked for ${bookingDetails.dateTime}.`;
        bookingStep = 0;
        bookingDetails = {};
    } else {
        let comparedText = compare(userMessage, botReply, text);

        product = comparedText
          ? comparedText
          : alternative[Math.floor(Math.random() * alternative.length)];

        if (text.includes("booking") || text.includes("appointment") || text.includes("book on date and time")) {
            bookingStep = 1;
        }
    }

    addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
      for (let y = 0; y < replyArray[x].length; y++) {
        if (triggerArray[x][y] === string) {
          items = replyArray[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
    if (item) return item;
    else return containMessageCheck(string);
}

function containMessageCheck(string) {
    let expectedReply = [
      [
        "Good Bye, dude",
        "Bye, See you!",
        "Dude, Bye. Take care of your health in this situation."
      ],
      ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
      ["Have a pleasant evening!", "Good evening too", "Evening!"],
      ["Good morning, Have a great day!", "Morning, dude!"],
      ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
    ];
    let expectedMessage = [
      ["bye", "tc", "take care"],
      ["night", "good night"],
      ["evening", "good evening"],
      ["morning", "good morning"],
      ["noon"]
    ];
    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
      if (expectedMessage[x].includes(string)) {
        items = expectedReply[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
    return item;
}

function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(product);
}

function showDatePicker() {
    const datePicker = flatpickr("#date-picker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        defaultDate: "today",
        maxDate: new Date().fp_incr(30) // 30 days from now
    });

    const modalBody = document.getElementById("chatbot-body");
    modalBody.innerHTML += `
        <input type="text" id="date-picker" placeholder="Select date and time...">
        <button onclick="confirmBooking()">Confirm</button>
    `;
}

function confirmBooking() {
    const dateTime = document.getElementById("date-picker").value;
    output(dateTime);
}


