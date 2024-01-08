<html>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.plivo.com/sdk/browser/v2/plivo.min.js"></script>
  <script type="text/javascript">
    var plivoClient;
    function configure(){
      var options = {
      "debug":"DEBUG",
      "permOnClick":true,
      "audioConstraints":{"optional":[{"googAutoGainControl":false},{"googEchoCancellation":false}]},
      "enableTracking":true
      };
      plivoClient = new window.Plivo(options);
      plivoClient.client.login("t9bet180328020915","t9bet180328")
    }
    function makeCall(){
      var dest = document.getElementById('number').value
      console.log(dest)
      var extraHeaders = {'X-PH-Test1': 'test1', 'X-PH-Test2': 'test2'};
      plivoClient.client.call(dest, extraHeaders);
    }
    $( document ).ready(function(){
      configure();
      console.log('configure completed')
    });
  </script>
</head>
<body>
<img src="https://s3.amazonaws.com/plivo_blog_uploads/static_assets/images/press/logo-on-white.png" height="100px" />
<form action="javascript:makeCall()">
  <h2>Enter the phone number to call </h2><input type="text" id="number"/>
  <input type="submit" value="Call" />
</form>
</body>
</html>