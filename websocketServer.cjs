import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

const MAX_HISTORY = 4;  // Store only the last 1 message in history
const chatHistory = []; // Chat history array
let clientCounter = 0;  // To give each client a unique identifier
const clientNames = new Map(); // Store client names

console.log('WebSocket server started on ws://localhost:3001');

// Handling new WebSocket connections
wss.on('connection', function connection(ws) {
  clientCounter += .5;
  const clientName = `Client ${clientCounter}`;
  clientNames.set(ws, clientName);  // Associate client with name
  
  console.log(`${clientName} connected`);

  // Send the current chat history to the new client
  ws.send(JSON.stringify({ type: 'history', messages: chatHistory }));

  // Listen for incoming messages from the client
  ws.on('message', function incoming(data) {
    console.log(`${clientName} sent:`, data.toString());

    // Try to parse the received message
    try {
      const parsed = JSON.parse(data);
      if (parsed.message) {
        chatHistory.push(parsed.message);

        // Limit the history size to MAX_HISTORY
        if (chatHistory.length > MAX_HISTORY) {
          chatHistory.splice(0, chatHistory.length - MAX_HISTORY); // Keep the last `MAX_HISTORY` messages
        }
      }
    } catch (e) {
      console.error('Error parsing message:', e);
    }

    // Broadcast the current chat history to all clients
    const historyPayload = JSON.stringify({ type: 'history', messages: chatHistory });
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(historyPayload);
      }
    });
  });

  // Handle when a client disconnects
  ws.on('close', () => {
    console.log(`${clientName} disconnected`);
    clientNames.delete(ws);  // Clean up the map when client disconnects
  });

  // Handle any WebSocket errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
