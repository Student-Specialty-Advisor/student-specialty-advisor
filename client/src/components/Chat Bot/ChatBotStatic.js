import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Tree from "./Tree";

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

  const setupTree = () => {
    var tree = new Tree("main", "This is the main node");
    tree.insert("main", "specialty", "This is the specialty parent node");
    tree.insert("main", "account", "This is the account parent node");
    tree.insert("main", "features", "This is the features parent node");
    tree.insert(
      "main",
      "robot",
      "Well, Siri tells me that I am not a bot, so.."
    );
    tree.insert(
      "main",
      "contact",
      "For any concerns, you can contact the team on the following email: studentspecialtyadvisor@outlook.com or through any link mentioned in the page footer."
    );

    tree.insert(
      "specialty",
      "specialty-ssa",
      "Student Specialty Advisor is a free web app made by MedTech students for MedTech students. Student Specialty Advisor will help you choose the right engineering specialty for you."
    );
    tree.insert(
      "specialty",
      "specialty-student",
      "Student Specialty Advisor is a space for both pre-engineering and engineering students. You can seek help from students, but can also lend a hand to other students."
    );

    tree.insert(
      "account",
      "account-signup",
      "If you have a MedTech or SMU email, you can create an account for free by clicking on the sign up button. It's up there on the right!"
    );
    tree.insert(
      "account",
      "account-login",
      "After successfully signing up, you can log into your account at any time and enjoy all the feature SSA has to offer. The login button is up there on the right!"
    );
    tree.insert(
      "account",
      "account-lost",
      "If you have trouble accessing your account, please contact the team on this email: studentspecialtyadvisor@outlook.com"
    );
    tree.insert(
      "account",
      "account-smu",
      "You need to have an SMU or MedTech Email account to be able to sign up. It's because we want to ensure that all the users are part of the SMU family!"
    );

    tree.insert(
      "features",
      "features-def",
      "SSA offers multiple features such as: compatibility quiz, a rich package of information and videos about specialties, a meeting system, a community forum and more! Create an account for free to access all of them!"
    );
    tree.insert(
      "features",
      "features-quiz",
      "Program Compatibility Quiz is one of the features you can enjoy once you create an account. It's about 20 questions & recommends a specialty that might suit your personality and grades."
    );
    tree.insert(
      "features",
      "features-package",
      "SSA has all of the information you need about all specialties in one place, in both video and text format. Join now to access all of it!"
    );
    tree.insert(
      "features",
      "features-meeting",
      "With an account, you can request meetings with 'Advisors'. These advisors are part of the SSA Team and are composed of professors, experts and students."
    );
    tree.insert(
      "features",
      "features-become",
      "If you want to become an advisor, you can apply using the form found in meetings/advisors section or contact the SSA team directly by email!"
    );
    tree.insert(
      "features",
      "features-forum",
      "SSA offers a community forum, a safe space for students to review and discuss the different specialties. Join the family now by signing up and express your opinion freely."
    );

    tree.insert("main", "greeting", "What's up!");

    tree.insert(
      "main",
      "github",
      "If you are curious about the development of Student Specialty Advisor, the team behind it or want to contribute, check out our github page!"
    );

    return tree;
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
        style={{ boxShadow: "0px 0px 5px 1px", marginTop: "80px" }}
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
