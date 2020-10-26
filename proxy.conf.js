const PROXY_CONFIG = [
    {
      context: [
        "/",
      ],
      // target: 'https://localhost:8080',
      target: 'http://nodeytest.herokuapp.com/',
      changeOrigin: true,
      secure: false,
  
      router: function (req) {
        console.log("Server Request received: " + req.originalUrl);
        var target = 'http://nodeytest.herokuapp.com/'; // or some custom code
        return target;
      },
      logLevel: "debug",
    }
  ]
  module.exports = PROXY_CONFIG;