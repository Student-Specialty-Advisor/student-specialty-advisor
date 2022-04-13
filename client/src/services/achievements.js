import alertify from "alertifyjs";
import AuthService from "./AuthService";
import fetchService from "./fetchService";

export const completeAchievement = (achievementDB, achievementTitle) => {
  var json = {};
  json[achievementDB] = true;
  var oldAchievements = JSON.parse(localStorage.getItem("userAchievements"));
  if (oldAchievements[achievementDB] === false) {
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
