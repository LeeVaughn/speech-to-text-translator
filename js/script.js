const peterConstant = ["peter", "piper", "picked", "a", "peck", "of", "pickled", "peppers"];
const sallyConstant = ["silly", "sally", "swiftly", "shooed", "seven", "silly", "sheep"];
const woodchuckConstant = ["how", "much", "wood", "would", "a", "woodchuck", "chuck", "if", "a", "woodchuck", "could", "chuck", "wood"];
const seashellsConstant = ["she", "sells", "seashells", "by", "the", "seashore"];
// will be used to store which audio file was selected from the dropdown
let selectedFile;
// will be used to store index of selected audio file
let selectedFileIndex;
// will be used to store the ID of the transcribed file
let transcribedFileID;
// will be used to store the translated text
let transcribedText;
let accuracyPercent = 0;

// hide test results section upon page load
document.querySelector("main").style.display = "none";

/**
 * Transcribes audio file
 * 
 * @param {string} url - the URL to use in the POST request
 * @param {object} data - init object
 * @return {object} response data in the form of a JSON object
 */
async function transcribeFile(url="", data= {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      authorization: apiKey,
      "content-type": "application/json",
      "Transfer-Encoding": "chunked" 
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

/**
 * Get completed audio transcription
 * 
 * @param {string} url - the URL to use in the POST request
 * @param {object} data - init object
 * @return {object} response data in the form of a JSON object
 */
async function getTranscription(url="", data= {}) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      authorization: apiKey,
      "content-type": "application/json"
    }
  });
  return response.json();
}

/**
 * Displays error message
 * 
 * @param {string} msg - error message to display
 */
function displayError(msg) {
  const errorMessage = `<p class="error">${msg}</p>`;

  // makes sure main section is hidden before displaying error
  document.querySelector("main").style.display = "none";

  document.querySelector("body").insertAdjacentHTML("beforeend", errorMessage);
}

/**
 * Displays results of accuracy test
 * 
 * @param {string} text - transcribed text from the audio file
 */
 function displayResults(text) {
  console.log(text);
  testPhrase(text);
}

/**
 * Compares transcribed phrase to tongue twister constant
 * 
 * @param {string} text - transcribed text from the audio file
 */
 function testPhrase(text) {
  let correctPhrase;
  let correctWordCount = 0;

  if (selectedFileIndex === 1 || selectedFileIndex === 2) {
    correctPhrase = peterConstant;
  }
  if (selectedFileIndex === 3 || selectedFileIndex === 4) {
    correctPhrase = sallyConstant;
  }
  if (selectedFileIndex === 5 || selectedFileIndex === 6) {
    correctPhrase = woodchuckConstant;
  }
  if (selectedFileIndex === 7 || selectedFileIndex === 8) {
    correctPhrase = seashellsConstant;
  }
}

// listens for changes on the Audio Files dropdown, then transcribes the corresponding audio file based on the option selected
document.getElementById("twisters").addEventListener("change", () => {
  //the first URL in this array corresponds to the 2nd option in the twisters dropdown, "Peter Piper - Dawn"
  const audioURLs = [
    "https://github.com/LeeVaughn/tongue-twister-tester/blob/master/audio-files/peter-dawn.m4a?raw=true",
    "https://github.com/LeeVaughn/tongue-twister-tester/blob/master/audio-files/peter-lee.m4a?raw=true",
    "",
    "",
    "",
    "",
    "",
    ""
  ]

  Array.from(document.querySelector("#twisters").options).forEach((option, index) => {
    if (option.selected === true) {
      // the `index - 1` accounts for the fact that the first option in the twisters dropdown is not present in the audioURLs array
      selectedFile = audioURLs[index - 1];
      selectedFileIndex = index;
    }
  });

  transcribeFile("https://api.assemblyai.com/v2/transcript", {audio_url: selectedFile, punctuate: false, format_text: false})
    .then(data => {
      transcribedFileID = data.id;
    })
    .catch((err) => console.error(err));  
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  // removes any previously displayed error messages
  if (document.querySelector(".error")) {
    document.querySelector(".error").remove();
  }

  // displays error if an audio file isn't selected, else attempts to transcribe file
  if (!selectedFile) {
    displayError("Please select an audio file");
  } else {
    getTranscription(`https://api.assemblyai.com/v2/transcript/${transcribedFileID}`)
      .then(data => {
        if (data.status === "processing") {
          displayError("The data is still processing. Please try again in a moment.");
        } else {
          transcribedText = data.text;
          displayResults(transcribedText);
        }
      })
      .catch((err) => console.error(err));
  }
});
