import Botkit from 'botkit';
import Identity from './identity'; 
import WebServer from './server';
import Bots from '../bots/bots';

const configuration = {
    replyWithTyping: true,
    json_file_store: __dirname + '/.data/db/',
}
const controller = Botkit.anywhere(configuration);

Identity(controller);
WebServer(controller);
Bots(controller);

controller.openSocketServer(controller.httpserver);
controller.startTicking();