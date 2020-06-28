// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        // this.onMessage(async (context, next) => {
        //     const replyText = `Echo: ${ context.activity.text }`;
        //     await context.sendActivity(MessageFactory.text(replyText, replyText));
        //     // By calling next() you ensure that the next BotHandler is run.
        //     await next();
        // });

        this.onMessage(async (context, next) => {
            const text = context.activity.text;

            // Create an array with the valid color options.
            const validColors = ['Red', 'Blue', 'Yellow'];

            // If the `text` is in the Array, a valid color was selected and send agreement.
            if (validColors.includes(text)) {
                await context.sendActivity(`I agree, ${ text } is the best color.`);
            } else {
                await context.sendActivity('Please select a color.');
            }

            // After the bot has responded send the suggested actions.
            await this.sendSuggestedActions(context);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
    async sendSuggestedActions(turnContext) {
        var reply = MessageFactory.suggestedActions(['Red', 'Yellow', 'Blue'], 'What is the best color?');
        await turnContext.sendActivity(reply);
    }
}

module.exports.EchoBot = EchoBot;
