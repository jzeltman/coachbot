const messageTemplate = (config) => {
    let message = { 
        user: params.user, 
        channel: 'socket',
        text: params.text,
        type : this.isBotConvo ? `message:Bot:${this.sendTo}` : 'message',
    }

    if (params.userProfile) message.userProfile = params.userProfile;

    return message;
}