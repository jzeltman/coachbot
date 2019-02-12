const Identity = (controller) => {
    controller.middleware.spawn.use(function (bot, next) {
        bot.identity = {
            name: 'CoachBotkit',
            id: 'web',
        }
    });

    controller.middleware.receive.use( (bot, message, next) => {
        if (!message.user_profile) { next(); }
        else {
            console.log('update user');
            controller.storage.users.get(message.user, (err, user) => {
                if (!user) {
                    user = {
                        id: message.user,
                        attributes: {},
                    }
                }

                user.name = message.user_profile.name;

                for (var key in message.user_profile) {
                    if (key != 'name' && key != 'id') {
                        user.attributes[key] = message.user_profile[key];
                    }
                }
                controller.storage.users.save(user, err => { next(); });
            });
        }
    });
}

export default Identity;