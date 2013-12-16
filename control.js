 document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    // StatusBar.styleDefault();
    // navigator.splashscreen.hide();
    //iosStatusBar = window.plugins.statusBar;

    var pushNotification = window.plugins.pushNotification;
    // alert(pushNotification);
    var myID = localStorage.getItem('clientStorage');
    var clientID = JSON.parse(myID);
    console.log("id:" + clientID);
    console.log("session" + Session.get('ClientId'));
     pushNotification.register(successHandler, errorHandler,{"senderID":"1091640860814","ecb":"onNotificationGCM"});
 }


 successHandler = function(result) {
     alert('Callback Success! Result = '+result)
     var userID = Meteor.userId() ? Meteor.userId() : Session.get('ClientId');
     // Meteor.call('tokenApnInsert', result, userID);
     var doWeHaveToken = GcmTokens.findOne({'_id': result});
     console.log(doWeHaveToken)
     if (doWeHaveToken) {
       if (doWeHaveToken.userId != userID && Meteor.userId())
         GcmTokens.update({'_id': result}, {$set: {userId: userID}})
     } else {
       GcmTokens.insert({_id:result,
         userId: userID,
         devicemodel: device.model,
         deviceversion: device.version,
         deviceplatform: device.platform,
         deviceuuid: device.uuid
       })
     }
 }

 errorHandler = function(error) {
     alert(error);
 }

 onNotificationGCM = function(e) {
         switch( e.event )
         {
             case 'registered':
                 if ( e.regid.length > 0 )
                 {
                     console.log("Regid " + e.regid);
                     alert('registration id = '+e.regid);
                 }
             break;

             case 'message':
               // this is the actual push notification. its format depends on the data model from the push server
               alert('message = '+e.message+' msgcnt = '+e.msgcnt);
             break;

             case 'error':
               alert('GCM error = '+e.msg);
             break;

             default:
               alert('An unknown GCM event has occurred');
               break;
         }
     }
