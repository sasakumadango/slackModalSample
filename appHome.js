const axios = require("axios");
const qs = require("qs");

const apiUrl = "https://slack.com/api";

const slackModel = require("./slackModel");

const updateView = async () => {
  // The final view -
  const view = slackModel.homeViewModel();
  return JSON.stringify(view);
};

/* Display App Home */

const displayHome = async (user, data) => {
  const args = {
    token: process.env.SLACK_BOT_TOKEN,
    user_id: user,
    view: await updateView()
  };

  const result = await axios.post(
    `${apiUrl}/views.publish`,
    qs.stringify(args)
  );

  try {
    if (result.data.error) {
      console.log(result.data.error);
    }
  } catch (e) {
    console.log(e);
  }
};

/* Open a modal */

const openModal = async trigger_id => {
  // Git hub
  const githubAxios = axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.everest-preview+json"
    }
  });

  // ブランチ選択リスト
  let buttonList = [];
  await githubAxios
    .get("/repos/sasakumadango/macOSAlert/branches")
    .then(function(res) {
      const branches = res.data;
      branches.forEach(branche => {
        const element = {
          text: { type: "plain_text", text: branche.name },
          value: branche.name
        };
        buttonList.push(element);
      });
    })
    .catch(function(e) {
      console.log(e);
    });
  // console.log(buttonList);

  let modal = slackModel.modal(buttonList);
  const args = {
    token: process.env.SLACK_BOT_TOKEN,
    trigger_id: trigger_id,
    view: JSON.stringify(modal)
  };

  const result = await axios.post(`${apiUrl}/views.open`, qs.stringify(args));

  //console.log(result.data);
};

module.exports = { displayHome, openModal };
