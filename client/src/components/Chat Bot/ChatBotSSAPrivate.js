import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import AuthService from "../../services/AuthService";
import Tree from "./Tree";

function ChatBotSSAPrivate() {
  const theme = {
    background: "white",
    headerBgColor: "var(--myorange)",
    headerFontColor: "black",
    headerFontSize: "16px",
    botBubbleColor: "var(--myorange)",
    botFontColor: "black",
    userBubbleColor: "var(--myorange)",
    userFontColor: "black",
  };
  const setupTree = () => {
    var tree = new Tree("main", "This is the main node");
    tree.insert("main", "specialty", "This is the specialty parent node");
    tree.insert("main", "achievements", "This is the achievements parent node");
    tree.insert("main", "quiz", "This is the quiz parent node");
    tree.insert("main", "information", "This is the information parent node");
    tree.insert("main", "videos", "This is the videos parent node");
    tree.insert("main", "meetings", "This is the meetings parent node");
    tree.insert("main", "forum", "This is the forum parent node");
    return tree;
  };
  //let chatBotTree = setupTree();

  const findAnswer = (value) => {
    return "start";
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floating={true}
        height="450px"
        headerTitle="SSA Chat Bot"
        style={{ boxShadow: "0px 0px 5px 1px" }}
        steps={[
          {
            id: "start",
            message: `Hey there, ${
              AuthService.getCurrentUser().firstName
            }! How can I help you?`,
            trigger: "user-start",
          },
          {
            id: "user-start",
            user: true,
            trigger: "reply",
          },
          {
            id: "reply",
            message: ({ previousValue, steps }) => {
              return findAnswer(previousValue);
            },
          },
        ]}
      />
    </ThemeProvider>
  );
}

export default ChatBotSSAPrivate;
