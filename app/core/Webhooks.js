export default class Webhooks {
    constructor(config){
        if (!config) return false;

        console.log('WebHooks',config)
        this.url = `https${this.url}/botkit/receive`
        this.user = config.userProfile._id;
        this.userProfile = config.userProfile;
        this.isBotConvo = true; // TKTK create method to check for bot convos
        this.sendTo = this.parseSendTo(config.sendTo); 
        this.dispatchSend = config.dispatchSend;
        this.dispatchReceive = config.dispatchReceive;
        this.dispatchTyping = config.dispatchTyping;
    }

    parseSendTo(sendTo){
        if (typeof sendTo === 'array' && sendTo.length === 1) return this.sendTo[0];
        else return sendTo;
    }

    connect(){
        /*
        if (Botkit.getCookie('botkit_guid')) {
            that.guid = Botkit.getCookie('botkit_guid');
            connectEvent = 'welcome_back';
        } else {
            that.guid = that.generate_guid();
            Botkit.setCookie('botkit_guid', that.guid, 1);
        }
        */

        //that.getHistory();

        // connect immediately
        let type = this.isBotConvo ? `hello:Bot:${this.sendTo}` : `hello`;
        this.request(this.url, {
            user: this.user, //should be guid
            user_profile: this.userProfile, 
            channel: 'webhook',
            type,
        }).then(function(message) {
            console.log('connect responds',message);
            //that.trigger(message.type, message);
        }).catch(function (err) {
            console.log('connect webhook_error', err);
        });;
    }

    request(url, body) {
        return new Promise((resolve,reject) => {
            const xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        var response = xmlhttp.responseText;
                        var message = null;
                        try { message = JSON.parse(response); } 
                        catch (err) { reject(err); return; }

                        resolve(message);

                    } else { reject(new Error('status_' + xmlhttp.status)); }
                }
            };

            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(JSON.stringify(body));
        });
    }

    send(message){
        const that = this;
        this.request(this.url, message)
            .then((message) => {
                console.log('return from send',message);
          //that.trigger(message.type, message);
        }).catch(function(err) {
          //that.trigger('webhook_error', err);
        });
    }
}