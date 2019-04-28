var counter=0;
var updatePosCounter=0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }
  
    return null;
};

function updatePosition(position) {
    if (position) {
      window.lat = position.coords.latitude;
      window.lng = position.coords.longitude;
    }
   
  }

  
      function currentLocation() {
    return {lat:window.lat, lng:window.lng};
    };


function realtimeSetup(){
    var redraw = function(payload) {
      mark.setVisible(true);
        lat = payload.message.lat;
        lng = payload.message.lng;
        
        if(stopCounter==true){
          map.setCenter({lat:lat, lng:lng, alt:0});
          stopCounter=false;
          console.log("stopCounter"+ stopCounter);
        }

        mark.setPosition({lat:lat, lng:lng, alt:0});
        
      };
  
      var pnChannel = "map2-channel";
  
      var pubnub = new PubNub({
        publishKey:   'pub-c-1bd86339-b475-421c-a353-e29beaa6d8c9',
        subscribeKey: 'sub-c-3c92ff94-69c0-11e9-8122-22455f4026bf'
      });
  
      pubnub.subscribe({channels: [pnChannel]});
      pubnub.addListener({message:redraw});
  
      setInterval(function() {
        pubnub.publish({channel:pnChannel, message:currentLocation()});
      }, 5000);
}

    
    