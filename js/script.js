const peterConstant = ["peter", "piper", "picked", "a", "peck", "of", "pickled", "peppers"];
const sallyConstant = ["silly", "sally", "swiftly", "shooed", "seven", "silly", "sheep"];
const woodchuckConstant = ["how", "much", "wood", "would", "a", "woodchuck", "chuck", "if", "a", "woodchuck", "could", "chuck", "wood"];
const seashellsConstant = ["she", "sells", "seashells", "by", "the", "seashore"];
// will be used to track which audio file was selected from the dropdown
let selectedFile;


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

// transcribeFile("https://api.assemblyai.com/v2/transcript", {audio_url: "https://github.com/LeeVaughn/tongue-twister-tester/blob/master/audio-files/peter-dawn.m4a?raw=true"})
//   .then(data => {
//     console.log(data);
//   })
//   .catch((err) => console.error(err));

getTranscription("https://api.assemblyai.com/v2/transcript/njts9e60i-0322-46a5-9167-253baa130f82")
.then(data => {
  console.log(data);
})
.catch((err) => console.error(err));

// getTranscription(`https://api.assemblyai.com/v2/transcript/${fileId}`)
// .then(data => {
//   console.log(data);
// })
// .catch((err) => console.error(err));

document.getElementById("twisters").addEventListener("change", () => {
  console.log("change");
});
