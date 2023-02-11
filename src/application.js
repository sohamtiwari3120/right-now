let synthesis = window.speechSynthesis;
// Regex to match all English language tags e.g en, en-US, en-GB
var langRegex = /^en(-[a-z]{2})?$/i;
let allVoices = []
let femaleVoices = []
let selectedVoice = null

async function setFemaleVoice() {
    if ('speechSynthesis' in window) {
        // Get the available voices and filter the list to only have English speakers
        allVoices = await new Promise(
            function (resolve, reject) {
                let id;
                id = setInterval(() => {
                    if (synthesis.getVoices().length !== 0) {
                        resolve(synthesis.getVoices());
                        clearInterval(id);
                    }
                }, 10);
            }
        );
        femaleVoices = allVoices.filter((voice) => voice.voiceURI.toLowerCase().includes("female") || voice.voiceURI.toLowerCase().includes("zira"));
        if (femaleVoices.length == 0) {
            femaleVoices = allVoices.filter((voice) => langRegex.test(voice.lang));
        }
        // Log the properties of the voices in the list
        selectedVoice = femaleVoices[0];
        utterance.voice = selectedVoice;
        document.querySelector("#errors").innerHTML = `Number of available female voices: ${femaleVoices.length}`
        console.log(selectedVoice)
    } else {
        console.log('Text-to-speech not supported.');
        alert('Text to speech not supported.')
    }
}
setFemaleVoice()

// image manipulation
let faceOrientationFlag = 1;
let img_container = document.getElementById('img-container');
let left_eye = document.getElementById('left-eye');
let right_eye = document.getElementById('right-eye');

var utterance = new SpeechSynthesisUtterance("");
// Set utterance properties
utterance.pitch = 1.0;
utterance.rate = 1.0;
utterance.volume = 1.0;
utterance.onstart = () => {
    if(faceOrientationFlag<3) {
        ChangeImage(faceOrientationFlag + 3);
    }
}
utterance.onend = () => {
    if(faceOrientationFlag>=3) {
        ChangeImage(faceOrientationFlag - 3);
    }
}

let ChangeImage = (flag_value) => {
    let svg = ``;
    let left_eye_cx = 35.9603
    let right_eye_cx = 69.8477
    faceOrientationFlag = flag_value
    if (faceOrientationFlag < 3) {
        /* closed svg */
        svg = `<svg width="107" height="133" viewBox="0 0 107 133" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="53.5" cy="53.4195" r="52.9796" fill="#4E3323"/>
        <circle cx="11.2917" cy="64.6014" r="10.1818" fill="#F2AE80"/>
        <rect x="1.6615" y="42.6232" width="103.681" height="69.6622" rx="4" fill="#4E3323"/>
        <circle cx="95.1605" cy="64.6014" r="10.1818" fill="#F7BF9A"/>
        <circle cx="95.1605" cy="64.6014" r="5.67409" fill="#EF937E"/>
        <rect x="15.5" y="49.5601" width="76" height="44" fill="#F7BF9A"/>
        <ellipse cx="53.5" cy="94.0601" rx="38" ry="38.5" fill="#F7BF9A"/>
        <ellipse cx="53.5" cy="50.0601" rx="38" ry="38.5" fill="#F7BF9A"/>
        <circle cx="11.2917" cy="64.6014" r="10.1818" fill="#F7BF9A"/>
        <circle cx="11.2918" cy="64.6014" r="5.67409" fill="#EF937E"/>
        <rect x="47.7578" y="64.8023" width="11.4844" height="11.44" fill="#EF937E"/>
        <ellipse cx="53.5" cy="76.2423" rx="5.74222" ry="5.81777" fill="#EF937E"/>
        <ellipse cx="53.5" cy="64.8778" rx="5.74222" ry="5.81777" fill="#EF937E"/>
        <circle cx="${left_eye_cx + (faceOrientationFlag - 1) * 5}" cy="55.0601" r="5" fill="#001C28" class='eyes' id='left-eye'/>
        <circle cx="${right_eye_cx + (faceOrientationFlag - 1) * 5}" cy="55.0601" r="5" fill="#001C28" class='eyes' id='right-eye'/>
        <mask id="mask0_3_187" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="6" width="87" height="88">
        <ellipse cx="53.5" cy="50.0601" rx="43.2578" ry="43.827" fill="#F7BF9A"/>
        </mask>
        <g mask="url(#mask0_3_187)">
        <circle cx="24.89" cy="-7.06648" r="49.9577" fill="#4E3323"/>
        <circle cx="104.109" cy="-5.50251" r="44.8668" fill="#4E3323"/>
        </g>
        <path d="M71.2604 97.3109C71.8137 97.9313 71.7618 98.8862 71.1133 99.4063C66.9488 102.746 61.9251 104.862 56.6053 105.501C51.2856 106.139 45.9037 105.273 41.067 103.014C40.3138 102.663 40.0372 101.747 40.428 101.014C40.8188 100.28 41.7287 100.006 42.4841 100.353C46.7755 102.325 51.5381 103.077 56.2464 102.512C60.9547 101.946 65.4038 100.088 69.1064 97.1562C69.7581 96.6402 70.707 96.6906 71.2604 97.3109Z" fill="#001C28"/>
        </svg>`
    } else {
        /* open svg */
        svg = `<svg width="107" height="133" viewBox="0 0 107 133" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="53.5" cy="53.4195" r="52.9796" fill="#4E3323"/>
        <circle cx="11.2917" cy="64.6014" r="10.1818" fill="#F2AE80"/>
        <rect x="1.66148" y="42.6232" width="103.681" height="69.6622" rx="4" fill="#4E3323"/>
        <circle cx="95.1605" cy="64.6014" r="10.1818" fill="#F7BF9A"/>
        <circle cx="95.1605" cy="64.6014" r="5.67409" fill="#EF937E"/>
        <rect x="15.5" y="49.5601" width="76" height="44" fill="#F7BF9A"/>
        <ellipse cx="53.5" cy="94.0601" rx="38" ry="38.5" fill="#F7BF9A"/>
        <ellipse cx="53.5" cy="50.0601" rx="38" ry="38.5" fill="#F7BF9A"/>
        <rect x="47.7578" y="64.8023" width="11.4844" height="11.44" fill="#EF937E"/>
        <ellipse cx="53.5" cy="76.2423" rx="5.74222" ry="5.81777" fill="#EF937E"/>
        <ellipse cx="53.5" cy="64.8778" rx="5.74222" ry="5.81777" fill="#EF937E"/>
        <circle cx="${left_eye_cx + (faceOrientationFlag - 4) * 5}" cy="55.0601" r="5" fill="#001C28"  class='eyes' id='left-eye'/>
        <circle cx="${right_eye_cx + (faceOrientationFlag - 4) * 5}" cy="55.0601" r="5" fill="#001C28"  class='eyes' id='right-eye'/>
        <mask id="mask0_3_210" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="36" y="92" width="35" height="34">
        <rect x="36.9884" y="92.2471" width="33.0232" height="33.0232" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_3_210)">
        <circle cx="53.5" cy="96.6974" r="15.53" fill="#001C28"/>
        </g>
        <mask id="mask1_3_210" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="37" y="81" width="33" height="32">
        <circle cx="53.5" cy="96.7554" r="15.53" fill="#001C28"/>
        </mask>
        <g mask="url(#mask1_3_210)">
        <circle cx="57.8307" cy="112.285" r="10.073" fill="#EE3466"/>
        </g>
        <circle cx="11.2917" cy="64.6014" r="10.1818" fill="#F7BF9A"/>
        <circle cx="11.2917" cy="64.6014" r="5.67409" fill="#EF937E"/>
        <mask id="mask2_3_210" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="5" width="89" height="90">
        <ellipse cx="53.5" cy="50.0601" rx="43.8257" ry="44.4023" fill="#F7BF9A"/>
        </mask>
        <g mask="url(#mask2_3_210)">
        <circle cx="24.89" cy="-7.06648" r="49.9577" fill="#4E3323"/>
        <circle cx="104.109" cy="-5.50251" r="44.8668" fill="#4E3323"/>
        </g>
        </svg>
        `
    }
    img_container.innerHTML = svg;
}

var initRachel = () => {
    img_container = document.getElementById('img-container');
    left_eye = document.getElementById('left-eye');
    right_eye = document.getElementById('right-eye');
    // websockets
    ChangeImage(1);
    var client_id = Date.now()
    document.querySelector("#ws-id").textContent = `Your identifier is: ${client_id}`;
    var ws = new WebSocket(`ws://128.2.204.249:8080/ws/${client_id}`);
    ws.onmessage = async function (event) {
        var messages = document.getElementById('messages')
        var message = document.createElement('li')
        let face_orientation_id = JSON.parse(await event.data.text());
        console.log(face_orientation_id)
        ChangeImage(face_orientation_id['flag'])
        let text_message = face_orientation_id['message'];
        if (text_message.length > 0) {
            var content = document.createTextNode(text_message)
            message.appendChild(content)
            messages.appendChild(message)
            for (let i = 0; selectedVoice == null && i < 1; i += 1) {
                await setFemaleVoice();
            }
            if (selectedVoice) {
                utterance.text = face_orientation_id['message'];
                if (utterance.text.length > 0)
                    synthesis.speak(utterance);
            }
        }

    };
}

function sendMessage(event) {
    var input = document.getElementById("messageText")
    ws.send(input.value)
    input.value = ''
    event.preventDefault()
}

function speak() {
    utterance.text = "Hello! I am Rachel."
    let heroContainer = document.getElementById("hero-container")
    heroContainer.innerHTML = `
    <div id="inner-container" class="w-100 container">
        <div id="img-container" class="mt-1 row w-100">
        </div>
        <ul id='messages'></ul>
        <div class="row w-100">
            <div class="fw-light" id="ws-id"></div>
        </div>
        <h5 id="errors"></h5>
    </div>
    `
    initRachel();
    setTimeout(() => {
        ChangeImage(faceOrientationFlag);
        synthesis.speak(utterance);
    }, 500);
}
// setInterval(() => {
//     ChangeImage(faceOrientationFlag);
//     faceOrientationFlag = faceOrientationFlag + 1;
//     faceOrientationFlag = faceOrientationFlag % 6;
// }, 1000);