import debug from 'debug';
       debug('botkit:incoming_webhooks');

const Routes = (webserver,controller) => {
    debug('Configured /botkit/receive url');
    webserver.post('/botkit/receive', (req, res) => {
        res.status(200);
        controller.handleWebhookPayload(req, res);
    });
}

export default Routes;