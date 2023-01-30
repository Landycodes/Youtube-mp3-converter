const url = document.getElementById("url");
const btn = document.getElementById("button");

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

        if (API === false || API === null || API === undefined) {
          btn.style.backgroundColor = "red";
          btn.innerText = "Something went wrong :(";
          setInterval(() => {
            location.reload();
            return;
          }, 3000);
        }

        btn.insertAdjacentText("beforebegin", `${API.titolo}`);
        if (API.urlMp3) {
          btn.outerHTML = `<br> <a href="${API.urlMp3}"><button class="btn btn-success btn-sm m-1 mt-2 p-0 pl-1 pr-1" type="button" id="button">Download</button></a>`;
        } else {
          btn.style.backgroundColor = "red";
          btn.innerText = "oops! Try again";
          setInterval(() => {
            location.reload();
            return;
          }, 3000);
        }

        url.value = "";
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
};
btn.addEventListener("click", sendIt);
