import {
  registerPlugin
} from "./chunk-XGGD4S42.js";
import "./chunk-J4B6MK7R.js";

// node_modules/@capacitor-community/text-to-speech/dist/esm/definitions.js
var QueueStrategy;
(function(QueueStrategy2) {
  QueueStrategy2[QueueStrategy2["Flush"] = 0] = "Flush";
  QueueStrategy2[QueueStrategy2["Add"] = 1] = "Add";
})(QueueStrategy || (QueueStrategy = {}));

// node_modules/@capacitor-community/text-to-speech/dist/esm/index.js
var TextToSpeech = registerPlugin("TextToSpeech", {
  web: () => import("./web-XIJTT52M.js").then((m) => new m.TextToSpeechWeb())
});
if ("speechSynthesis" in window) {
  window.speechSynthesis;
}
export {
  QueueStrategy,
  TextToSpeech
};
//# sourceMappingURL=@capacitor-community_text-to-speech.js.map
