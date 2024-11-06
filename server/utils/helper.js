


const wsEventMsg = (response) => {
    wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(response));
    }
  });
}

module.exports = wsEventMsg;