const url = document.getElementById("url");
const btn = document.getElementById("button");

//GIVES ERROR 429 ON GET REQUEST. NEED TO UPDATE MANIFEST TO VERSION 3. FIX ERROR HANDLING
const sendIt = (event) => {
  event.preventDefault();
  const URL = encodeURIComponent(url.value);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "80c173e79bmsh7ba9a6d6d9ee8eap1d6908jsna562a2144d6a",
      "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com",
    },
  };
  const response = async () => {
    await fetch(
      `https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess?url=${URL}&format=mp3&responseFormat=json&lang=en`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const API = response.YoutubeAPI;
        console.log(API);
        url.value = "";
        if (API === false || API === null || API === undefined) {
          btn.style.backgroundColor = "red";
          btn.innerText = "Couldn't find file";
          setInterval(() => {
            location.reload();
            return;
          }, 3000);
          return;
        }
        btn.style.backgroundColor = "green";
        btn.insertAdjacentText("beforebegin", `${API.titolo}`);
        btn.outerHTML = `<br> <a href="${API.urlMp3}"><button type="button" id="button">Download</button></a>`;
      })
      .catch((err) => {
        console.error(err);
        btn.style.backgroundColor = "red";
        btn.innerText = "Invalid URL";
        setInterval(() => {
          location.reload();
          return;
        }, 3000);
      });
  };
  response();

  // response.YoutubeAPI.urlMp3
};
btn.addEventListener("click", sendIt);
