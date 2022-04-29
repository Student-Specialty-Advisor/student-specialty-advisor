import alertify from "alertifyjs";
import AuthService from "./AuthService";
import fetchService from "./fetchService";

export const completeAchievement = (achievementDB, achievementTitle) => {
  var json = {};
  json[achievementDB] = true;
  var oldAchievements = JSON.parse(localStorage.getItem("userAchievements"));
  if (oldAchievements === null) {
    fetchService
      .doGET("achievements/" + AuthService.getCurrentUser().id)
      .then((response) => {
        if (response.success) {
          localStorage.setItem(
            "userAchievements",
            JSON.stringify(response.achievements)
          );
          if (response.achievements[achievementDB] === false) {
            fetchService
              .doPUT("achievements/" + AuthService.getCurrentUser().id, json)
              .then((response) => {
                if (response.success) {
                  localStorage.setItem(
                    "userAchievements",
                    JSON.stringify(response.achievements)
                  );
                  alertify.message(
                    "<strong>Achievement Completed!</strong><br/>" +
                      achievementTitle
                  );
                } else {
                  throw response;
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          throw response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (oldAchievements[achievementDB] === false) {
    fetchService
      .doPUT("achievements/" + AuthService.getCurrentUser().id, json)
      .then((response) => {
        if (response.success) {
          localStorage.setItem(
            "userAchievements",
            JSON.stringify(response.achievements)
          );
          alertify.message(
            "<strong>Achievement Completed!</strong><br/>" + achievementTitle
          );
        } else {
          throw response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export const createAchievementInfo = (achievementDB) => {
  switch (achievementDB) {
    case "quizCompletion":
      return {
        title: "Compatibility Quiz",
        description: "Submit the quiz questions and receive the results",
      };
    case "infoSectionCompletion":
      return {
        title: "Specialty Info",
        description: "Read the programs infomations for at least 1 minute",
      };
    case "videosCompletion":
      return {
        title: "Specialty Videos",
        description: "Watch the videos for at least 1 minute",
      };
    case "meetingsSectionCompletion":
      return {
        title: "About Meetings",
        description: "Read about the concept of meetings and adviors",
      };
    case "meetingsRequestCompletion":
      return {
        title: "Request a Meeting",
        description: "Request a meeting with an advisor",
      };
    case "forumCompletion":
      return { title: "Community Forum", description: "Come Back Soon!" };
    default:
      return { title: "Unknown", description: "how did this happen" };
  }
};
