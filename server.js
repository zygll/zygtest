const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',  // 设置响应头Content-Type为text/event-stream
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString(),
      message: 'This is a test message'
    };
    //  
    const event = `event: message\ndata: ${JSON.stringify(data)}\n\n`;  // 构造EventSource数据
    res.write(event);  // 发送EventSource数据
  }, 1000);

});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
