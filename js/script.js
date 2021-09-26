async function uploadFile(url="", data= {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      authorization: apiKey,
      "Transfer-Encoding": "chunked" 
    },
    body: "binary"
  });
  return response.json();
}

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

// uploadFile("https://api.assemblyai.com/v2/upload", {audio_url: "https://github.com/LeeVaughn/tongue-twister-tester/blob/master/audio-files/peter-dawn.m4a?raw=true"})
//   .then(data => {
//     console.log(data);
//   })
//   .catch((err) => console.error(err));

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
