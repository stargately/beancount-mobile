// debug network requests in the chrome debugger tool
// @ts-ignore
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.Buffer = global.Buffer || require("buffer").Buffer;
import { App } from "./src/app";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default App;
