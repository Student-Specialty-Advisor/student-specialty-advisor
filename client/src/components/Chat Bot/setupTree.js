import Tree from "./Tree";

export const setupTree = () => {
  var tree = new Tree("main", "This is the main node");
  tree.insert("main", "specialty", "This is the specialty parent node");
  tree.insert("main", "account", "This is the account parent node");
  tree.insert("main", "features", "This is the features parent node");
  tree.insert("main", "robot", "Well, Siri tells me that I am not a bot, so..");
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
    "If you have a MedTech or SMU email, you can create an account for free by clicking on 'Sign Up'. It's up there on the right!"
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
    "account",
    "account-change",
    "If you need to change your personal information such as: First name, Last name, University Year or Password, you can do so in your profile page! You can access from the top right corner."
  );
  tree.insert(
    "account-change",
    "account-change-email",
    "If you need to change your email address linked with your account, please contact the team on this email: studentspecialtyadvisor@outlook.com"
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
  tree.insert(
    "main",
    "verification",
    "Once you create an account, we will send a verification email to the address you used while signing up. Once you verify your email, you can start to access your account. If you face any problem with this process, do not hesitate to contact us!"
  );

  tree.insert("main", "greeting", "What's up!");

  tree.insert(
    "main",
    "github",
    "If you are curious about the development of Student Specialty Advisor, the team behind it or want to contribute, check out our github page!"
  );

  return tree;
};
