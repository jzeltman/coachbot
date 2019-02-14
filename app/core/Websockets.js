export default class Websocket {
    constructor(config){
        if (!config) return false;

        console.log('WebHooks',config)
        this.url = `ws${config.url}`;
        this.user = config.userProfile._id;
        this.userProfile = config.userProfile;
        this.isBotConvo = true; // TKTK create method to check for bot convos
        this.sendTo = this.parseSendTo(config.sendTo); 
        this.dispatchSend = config.dispatchSend;
        this.dispatchReceive = config.dispatchReceive;
        this.dispatchTyping = config.dispatchTyping;

        this.addMessage.bind(this);
    }

    parseSendTo(sendTo){
        if (typeof sendTo === 'array' && sendTo.length === 1) return this.sendTo[0];
        else return sendTo;
    }

    connect(){
        console.log('Websockets connect',this.url);
        this.ws = new WebSocket(this.url);
        this.ws.onopen = this.WSonOpenHandler.bind(this);
        this.ws.onmessage = this.WSonMessageHandler.bind(this);
        this.ws.onerror = (e) => { console.log(e.message); };
        this.ws.onclose = (e) => { console.log(e.code, e.reason); };
    }

    addMessage(params){
        let message = { 
            user: params.user, 
            channel: 'socket',
            text: params.text,
            type : this.isBotConvo ? `message:Bot:${this.sendTo}` : 'message',
        }

        if (params.userProfile) message.userProfile = params.userProfile;

        return message;
    }

    WSonOpenHandler(e) {
        let type = this.isBotConvo ? `hello:Bot:${this.sendTo}` : `hello`;
        this.WSsend({
            user: this.user, 
            channel: 'socket',
            user_profile: this.userProfile, 
            type,
        });
    }

    WSonMessageHandler(e) {
        let message = JSON.parse(e.data);
        switch (message.type){
            case 'typing':
                this.dispatchTyping();
                break;
            case 'message':
                message.from = this.sendTo;
                console.log('message received',message);
                this.dispatchReceive(message);
                break;
            case 'default':
                break;
        }
    }

    WSsend(message){ console.log('WSsend',message);this.ws.send(JSON.stringify(message)); }
}