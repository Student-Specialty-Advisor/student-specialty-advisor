import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { setupTree } from "./setupTree";

function ChatBotStatic() {
  const theme = {
    background: "white",
    headerBgColor: "var(--myorange)",
    headerFontColor: "black",
    headerFontSize: "16px",
    botBubbleColor: "orange",
    botFontColor: "black",
    userBubbleColor: "orange",
    userFontColor: "black",
  };

  let chatBotTree = setupTree();

  const findAnswer = (value) => {
    if (
      value.includes("contact") ||
      value.includes("report") ||
      value.includes("bug") ||
      value.includes("prob")
    ) {
      return chatBotTree.find("contact").value;
    }
    if (value.includes("feature") || value.includes("offer")) {
      return chatBotTree.find("features-def").value;
    }
    if (value.includes("quiz") || value.includes("test")) {
      return chatBotTree.find("features-quiz").value;
    }
    if (
      value.includes("info") ||
      value.includes("video") ||
      value.includes("overview") ||
      value.includes("curric") ||
      value.includes("opportunit") ||
      value.includes("program")
    ) {
      return chatBotTree.find("features-package").value;
    }
    if (
      value.includes("advisor") &&
      (value.includes("become") ||
        value.includes("apply") ||
        value.includes("join") ||
        value.includes("be"))
    ) {
      return chatBotTree.find("features-become").value;
    }
    if (
      value.includes("meet") ||
      value.includes("prof") ||
      value.includes("exp") ||
      value.includes("advi")
    ) {
      return chatBotTree.find("features-meeting").value;
    }
    if (
      value.includes("forum") ||
      value.includes("discuss") ||
      value.includes("opinion")
    ) {
      return chatBotTree.find("features-forum").value;
    }
    if (
      value.includes("sign") ||
      value.includes("create") ||
      value.includes("join") ||
      value.includes("make") ||
      value.includes("register")
    ) {
      return chatBotTree.find("account-signup").value;
    }
    if (
      (value.includes("log") ||
        value.includes("access") ||
        value.includes("connect")) &&
      !(
        value.includes("can't") ||
        value.includes("cannot") ||
        value.includes("forgot")
      )
    ) {
      return chatBotTree.find("account-login").value;
    }
    if (
      (value.includes("log") ||
        value.includes("access") ||
        value.includes("connect") ||
        value.includes("password") ||
        value.includes("email") ||
        value.includes("account")) &&
      (value.includes("can't") ||
        value.includes("cannot") ||
        value.includes("forgot") ||
        value.includes("lost") ||
        value.includes("know"))
    ) {
      return chatBotTree.find("account-lost").value;
    }
    if (
      value.includes("change") &&
      (value.includes("info") ||
        value.includes("password") ||
        value.includes("name") ||
        value.includes("year"))
    ) {
      return chatBotTree.find("account-change").value;
    }
    if (value.includes("change") && value.includes("email")) {
      return chatBotTree.find("account-change-email").value;
    }
    if (
      (value.includes("ssa") ||
        value.includes("website") ||
        value.includes("specialt") ||
        value.includes("advisor")) &&
      !(
        value.includes("become") ||
        value.includes("join") ||
        value.includes("apply")
      )
    ) {
      return chatBotTree.find("specialty-ssa").value;
    }
    if (
      value.includes("student") ||
      value.includes("engi") ||
      value.includes("space")
    ) {
      return chatBotTree.find("specialty-student").value;
    }
    if (
      (value.includes("account") || value.includes("email")) &&
      (value.includes("smu") || value.includes("medtech"))
    ) {
      return chatBotTree.find("account-smu").value;
    }
    if (
      (value.includes("bot") || value.includes("robot")) &&
      !value.includes("robotics")
    ) {
      return chatBotTree.find("robot").value;
    }
    if (
      value.includes("hi") ||
      value.includes("hey") ||
      value.includes("hello") ||
      value === "yo"
    ) {
      if (value.length <= 25) {
        return chatBotTree.find("greeting").value;
      }
    }
    if (
      value.includes("github") ||
      value.includes("dev") ||
      value.includes("open source") ||
      value.includes("opensource")
    ) {
      return chatBotTree.find("github").value;
    }
    if (
      value.includes("verif") &&
      (value.includes("account") || value.includes("email"))
    ) {
      return chatBotTree.find("verification").value;
    }
    return "Hmm.. I had trouble understanding your question 🤔";
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        placeholder="Ask me a question about SSA.."
        hideUserAvatar={true}
        bubbleStyle={{ wordWrap: "break-word" }}
        className="assistance-chat-bot"
        headerTitle="Assistance Chat Bot"
        style={{
          boxShadow: "0px 0px 5px 1px",
          borderRadius: "0",
          marginTop: "75px",
        }}
        height="calc(100vh - 80px)"
        width="100%"
        steps={[
          {
            id: "start",
            message:
              "Hey there, friend! I will be assisting you with Student Specialty Advisor!",
            trigger: "start2",
          },
          {
            id: "start2",
            message: "How can I help you today?",
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
              return findAnswer(previousValue.toLowerCase());
            },
            trigger: "user-start",
          },
        ]}
      />
    </ThemeProvider>
  );
}

export default ChatBotStatic;
