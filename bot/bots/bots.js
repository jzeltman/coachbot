const Bots = (controller) => {
    const onBoarding = (bot,message) => {
        bot.startConversation(message, (err, convo) => {
            convo.say({
                text: `Hey there, I'm coachbot. How can I help you succeed today?`,
            });
        });
    }

    controller.on('hello:Bot:Botkit', onBoarding);
}

export default Bots;