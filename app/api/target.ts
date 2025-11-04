const API_URL: string = "https://random-word-api.herokuapp.com/word?length=5";

export async function fetchTarget() {
    const res = await fetch(API_URL);
    console.log(res)
    const data = await res.json();
    return data[0];
}
