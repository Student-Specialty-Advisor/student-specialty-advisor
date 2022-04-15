import AuthService from "../../services/AuthService";
//import ChatBotSSAPrivate from "./ChatBotSSAPrivate";
import ChatBotSSAPublic from "./ChatBotSSAPublic";

function ChatBotSSA() {
  const isLoggedIn = AuthService.isLoggedIn();

  return isLoggedIn ? null : <ChatBotSSAPublic />;
}

export default ChatBotSSA;
