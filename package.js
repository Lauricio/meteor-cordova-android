Package.describe({
  summary: "Cordova 3.3.0 for Android with core plugins"
});

Package.on_use(function (api) {
  api.export('Cordova');
  api.add_files('cordova-android.js', 'client');
});
