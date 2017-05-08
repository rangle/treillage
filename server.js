// const express = require('express');
// const webpack = require('webpack');
// const chalk = require('chalk');
// // const path = require('path');
// const config = require('./webpack.config');
//
// const app = express();
// const compiler = webpack(config);
// const PORT = process.env.PORT || 3000;
//
// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: config.output.publicPath,
//   entry: config.output.path,
//   stats: 'minimal',
// }));
//
// app.use(require('webpack-hot-middleware')(compiler));
//
// // app.use(serveWebpackClient({
// //   distPath: path.join(__dirname, 'dist'),
// //   indexFileName: 'index.html',
// //   webpackConfig: config,
// // }));
//
// app.listen(PORT, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//
//   console.info(`Listening on port ${ chalk.yellow(PORT) }`);
// });

// const path = require('path');
// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const config = require('./webpack.config');
//
// const app = express();
// const compiler = webpack(config);
//
// // Apply CLI dashboard for your webpack dev server
// compiler.apply(new DashboardPlugin());
//
// const host = process.env.HOST || 'localhost';
// const port = process.env.PORT || 3000;
//
// function log() {
//   arguments[0] = '\nWebpack: ' + arguments[0];
//   console.log.apply(console, arguments);
// }
//
// app.use(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
//   stats: {
//     colors: true,
//   },
//   historyApiFallback: true,
// }));
//
// app.use(webpackHotMiddleware(compiler));
//
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './src/index.html'));
// });
//
// app.listen(port, host, (err) => {
//   if (err) {
//     log(err);
//     return;
//   }
//
//   log('App is listening at http://%s:%s', host, port);
// });
