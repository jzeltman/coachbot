import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug'
       debug('botkit:webserver');
import http from 'http';

import Routes from './routes';

const Server = controller => {
    const webserver = express();
          webserver.use(bodyParser.json());
          webserver.use(bodyParser.urlencoded({ extended: true }));
    const server = http.createServer(webserver);
    server.listen(process.env.PORT || 3000, null, function() {
        debug('Express webserver configured and listening at http://localhost:' + process.env.PORT || 3000);
    });

    Routes(webserver,controller);

    controller.webserver  = webserver;
    controller.httpserver = server;

    return webserver;
};

export default Server; 