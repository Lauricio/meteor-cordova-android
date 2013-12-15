Package.describe({
  summary: "Cordova 3.3.0 for Android with core plugins"
});

Package.on_use(function (api) {
  api.use(['standard-app-packages']);
  api.export(['Cordova', 'onNotificationGCM']);
  api.add_files('cordova-android.js', 'client');
  api.add_files('control.js', 'client');
});
