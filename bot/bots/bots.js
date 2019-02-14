const Bots = (controller) => {
    console.log('Bots');
    controller.middleware.receive.use((bot, message, next) => {
        console.log('\n~~~~~~~~~~~~~~~~~~\nMessage Received\n~~~~~~~~~~~~~~~~~~\n',message,'\n~~~~~~~~~~~~~~~~~~');
        next();
    });

    controller.middleware.send.use((bot, message, next) => {
        console.log('\n~~~~~~~~~~~~~~~~~~\nMessage Sent\n~~~~~~~~~~~~~~~~~~\n',message,'\n~~~~~~~~~~~~~~~~~~');
        next();
    });
    
    const onBoarding = (bot,message) => {
        bot.startConversation(message, (err, convo) => {
            convo.say({
                text: `Hey there, I'm coachbot. How can I help you succeed today?`,
            });
        });
    }

    controller.hears(['Hello','hey','hi',`what's up`,'whats up'], 'message:Bot:Botkit', (bot, message) => {
        bot.startConversation(message,(err,convo) => {
            convo.addMessage(`All right. waddup homey`);
        })
    });


    controller.on('hello:Bot:Botkit', onBoarding);
    controller.hears('hello','hello:Bot:Botkit', onBoarding);
    controller.on('message:Bot:Botkit', function(bot, message) {
        bot.reply(message,{ 
            text: `I don't know what that means`,
        });
    });
}

export default Bots;