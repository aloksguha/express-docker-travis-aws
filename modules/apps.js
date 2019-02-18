let apps = {};

let getApps = (req, res) => {
  const userId = req.params.userId;
  res.json(apps[userId] || []);
};

let createApp = (req, res) => {
  const userId = req.params.userId;
  const name = req.body.appName;
  const id = Math.random().toString(36).substring(7);

  const app = {
    id,
    userId,
    name
  };
  if (apps[userId]) {
    apps[userId].push(app);
  } else {
    apps[userId] = [app];
  }

  res.json(app);
};

let removeApp = (req, res) => {
  const { userId, appId } = req.params;
  const userApps = apps[userId];

  if (userApps && userApps.length) {
    if (userApps.length === 1) {
      delete apps[userId];
    } else if (userApps.length > 1) {
      apps[userId] = apps[userId].filter(app => app.id !== appId);
    }
  } else {
    res.json({
      message: "App not found"
    });
  }

  res.json({
    message: "App Removed Successfully."
  });
};

module.exports = {
  getApps,
  createApp,
  removeApp
};
