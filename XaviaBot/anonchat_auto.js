import axios from 'axios';

const agentUsername = "@your_agent_username"; // Set your agent username here

const onLoad = () => {
  if (!global.hasOwnProperty("anonchat_auto")) global.anonchat_auto = {};
}

const onCall = async ({ message }) => {
  const { senderID, threadID, body } = message;

  if (senderID == global.botID) return;
  if (!global.anonchat_msg.hasOwnProperty(threadID) || !global.anonchat_msg[threadID]) return;
  if (body.startsWith(`ac off`)) return;

  const requestData = {
    uid: senderID,
    agent_username: agentUsername,
    message: body
  };

  try {
    const response = await axios.post("https://chat.whisperly.repl.co/send_message", requestData);
    const { data } = response;
    if (data.success) {
      await message.react("✅");
    } else {
      console.error(`AnonChat message sending failed: ${data.message}`);
    }
  } catch (err) {
    console.error(err);
  }
}

export default {
  onLoad,
  onCall
};
