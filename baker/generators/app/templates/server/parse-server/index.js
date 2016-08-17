import { ParseServer } from 'parse-server';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';

export default {
  setup(app, appName, settings, allowInsecureHTTPInParseDashboard = false) {
    Parse.initialize(settings.parseServerApplicationId, 'js-key', settings.parseServerMasterKey);
    Parse.serverURL = settings.parseServerURL;

    const api = new ParseServer({
      appId: settings.parseServerApplicationId,
      masterKey: settings.parseServerMasterKey,
      serverURL: settings.parseServerURL,
      databaseURI: settings.parseServerDatabaseURI,
    });

    app.use('/parse', api);

    app.use(
      '/dashboard',
      // eslint-disable-next-line new-cap
      ParseDashboard({
        apps: [{
          serverURL: settings.parseServerURL,
          appId: settings.parseServerApplicationId,
          masterKey: settings.parseServerMasterKey,
          appName,
          iconName: 'logo.png',
        }],
        iconsFolder: 'server/public/images',
        users: settings.parseServerDashboardUsers,
      }, allowInsecureHTTPInParseDashboard)
    );
  },
};
