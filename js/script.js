const peterConstant = ["peter", "piper", "picked", "a", "peck", "of", "pickled", "peppers"];
const sallyConstant = ["silly", "sally", "swiftly", "shooed", "seven", "silly", "sheep"];
const woodchuckConstant = ["how", "much", "wood", "would", "a", "woodchuck", "chuck", "if", "a", "woodchuck", "could", "chuck", "wood"];
const seashellsConstant = ["she", "sells", "seashells", "by", "the", "seashore"];
// will be used to store which audio file was selected from the dropdown
let selectedFile;
// will be used to store the ID of the transcribed file
let transcribedFileID;
// will be used to store the translated text
let transcribedText;

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

// getTranscription("https://api.assemblyai.com/v2/transcript/njts9e60i-0322-46a5-9167-253baa130f82")
// .then(data => {
//   console.log(data);
// })
// .catch((err) => console.error(err));

// getTranscription(`https://api.assemblyai.com/v2/transcript/${fileId}`)
// .then(data => {
//   console.log(data);
// })
// .catch((err) => console.error(err));


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
      selectedFile = audioURLs[index - 1]
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
  
  getTranscription(`https://api.assemblyai.com/v2/transcript/${transcribedFileID}`)
    .then(data => {
      console.log(data);
      if (data.status === "processing") {
        console.log("the data is still processing")
      } else {
        transcribedText = data.text;
        console.log(transcribedText)
      }
    })
    .catch((err) => console.error(err));
});
