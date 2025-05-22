// debug network requests in the chrome debugger tool
// @ts-ignore
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
import { LogBox } from "react-native";
import { App } from "./src/app";

global.Buffer = global.Buffer || require("buffer").Buffer;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default App;
