// debug network requests in the chrome debugger tool
// @ts-ignore
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.Buffer = global.Buffer || require("buffer").Buffer;
import { App } from "./src/app";
export default App;
