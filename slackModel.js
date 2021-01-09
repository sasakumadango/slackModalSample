/*
 * Home View - Use Block Kit Builder to compose: https://api.slack.com/tools/block-kit-builder
 */

// ホーム画面
const homeViewModel = () => {
  // Intro message -
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*こんばんは！* 何をしましょうか？"
      },
      accessory: {
        type: "button",
        action_id: "do_deploy",
        text: {
          type: "plain_text",
          text: "デプロイ",
          emoji: true
        }
      }
    },
    {
      type: "divider"
    }
  ];

  // The final view -

  let view = {
    type: "home",
    title: {
      type: "plain_text",
      text: "Test Man"
    },
    blocks: blocks
  };

  return view;
};

const modal = buttonList => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "テストマンにお任せください"
    },
    submit: {
      type: "plain_text",
      text: "デプロイ"
    },
    blocks: [
      {
        type: "input",
        block_id: "branches",
        label: {
          type: "plain_text",
          text: "ブランチ"
        },
        element: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "ブランチ名",
            emoji: true
          },
          action_id: "chose_branch",
          options: buttonList
        }
      },
      {
        type: "input",
        block_id: "release_message",
        label: {
          type: "plain_text",
          text: "リリースメッセージ"
        },
        element: {
          action_id: "content",
          type: "plain_text_input",
          placeholder: {
            type: "plain_text",
            text: "ここに入力した内容が\n反映されます。"
          },
          multiline: true
        }
      }
    ]
  };
};

module.exports = { homeViewModel, modal };
