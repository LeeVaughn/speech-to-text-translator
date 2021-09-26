async function uploadFile(url="", data= {}) {
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

// uploadFile("https://api.assemblyai.com/v2/upload", {audio_url: "/audio-files/peter-dawn.m4a"})
//   .then(data => {
//     console.log(data);
//   })
//   .catch((err) => console.error(err));

transcribeFile("https://api.assemblyai.com/v2/transcript", {audio_url: "https://cdn.assemblyai.com/upload/4026f546-d110-4b35-b8f9-42c25ebdbab1"})
  .then(data => {
    console.log(data);
  })
  .catch((err) => console.error(err));

document.getElementById("twisters").addEventListener("change", () => {
  console.log("change");
});
