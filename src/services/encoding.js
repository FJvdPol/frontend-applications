/*
=== Start source ===
Generate a random number of 10 characters
from 6174
via https://gist.github.com/6174/6062387
*/
function genSalt() {
  return Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12)
}
/* === End source === */

/*
=== Start source ===
atob & btoa - turn string into base64 encoding and back
from Shog9
via https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
*/
export default {
  decode(string) {
    return atob(string).substring(20).slice(0, -20)
  },
  encode(string){
    return btoa(genSalt() + string + genSalt())
  }
}
/* === End source === */
