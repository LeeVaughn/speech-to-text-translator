async function uploadFile(url="", data= {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      authorization: "b62141f4d92b43f8a0f018ae6c8e018c",
      "content-type": "application/json",
      "Transfer-Encoding": "chunked" 
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

uploadFile("https://api.assemblyai.com/v2/upload", {audio_url: "/audio-files/peter-dawn.m4a"})
  .then(data => {
    console.log(data);
  })
  .catch((err) => console.error(err));
