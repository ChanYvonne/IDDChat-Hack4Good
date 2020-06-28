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
            const validResponses = ['Yes', 'No', 'Not Sure'];
            const actionWords = ['tried to', 'made me', 'is making me', 'forcing me',"I don't want to",
             'touch','kiss','hold','secret', "don't tell", 'comfortable', 'uncomfortable'];
            const questionWords = ['consent', 'no', 'rights', 'someone you trust', 'healthy relationship'];

            // If the `text` is in the Array, a valid color was selected and send agreement.
            // const text_set = set(text.split(' '));
            // const actionWords_set = set(actionWords);
            if (new RegExp(actionWords.join("|")).test(text)) {
                await this.sendSuggestedActions(context);
            } else if (text.valueOf() === "Yes") {
                await context.sendActivity('Okay! Kissing is a way for two people to show them that they like each other, usually when they are dating. Even if you are dating, you should not do it without **consent.**');
                await context.sendActivity('If you have any questions about the **bolded** words, just ask!');
            } else if (text.valueOf() === "No") {
                await context.sendActivity('It’s okay to tell that person **no**! You have the **rights** to do so. No one should touch your body without your permission');
                await context.sendActivity("If the other person doesn’t listen to you when you say 'no,' and you feel uncomfortable, tell **someone you trust** right away.");
                await context.sendActivity('If you have any questions about the **bolded** words, just ask!');
            } else if (text.valueOf() === "Not Sure") {
                await context.sendActivity('That’s totally fine-- you don’t have to know right now. You should first get to know them better! It’s important that you build a **healthy relationship** before pursuing anything intimate.');
                await context.sendActivity('If you have any questions about the **bolded** words, just ask!');
            } else if (new RegExp(questionWords.join("|")).test(text.toLowerCase()) && (text.includes('?') || text.toLowerCase().includes('what'))){
                if (text.includes("consent")){
                    await context.sendActivity("**No means No!**\n\n" + "---" + "\n\n'Consent' means that BOTH people gladly say YES! It is NEVER okay for someone to do something with your body without consent.");
                }
                if (text.includes("rights")){
                    await context.sendActivity("## Know Your Rights:\n\n"+ "* I have the right to ask for what I want.\n\n" 
                    + "* I have the right to change my mind.\n\n" + "* I have the right to say no to anything when I feel I am not ready, it is unsafe or it violates my values.\n\n" + "* I have the right to have my needs and wants respected by others.");
                }
                if (text.includes("no")){
                    await context.sendActivity("## Other ways to say no:\n\n" 
                    +"* I don't want to\n\n" + "* I'm not sure\n\n" + "* Maybe not today\n\n" + "* I'm okay\n\n" +"* It’s also okay to come up with 'Excuses'");
                }
                if (text.includes("someone you trust")){
                    await context.sendActivity("**Who can I talk to?**\n\n" + "---" + "\n\nthis can be your parents, siblings, teachers, counselors, or even a friend. If you don't want to, you can call: 1-800-656-4673 (National Sexual Assault Hotline)");
                }
                if (text.includes("healthy relationship")) {
                    await context.sendActivity("**Respect, Honest, and Equality**\n\n" + "---" + "\n\nIn a healthy relationship, each person has his/her own interests, activities, friends, likes, and dislikes, but they also share some common interests, activities, friends, likes, and dislikes");
                }
            } else {
                await context.sendActivity("Thanks for sharing! I'd love to hear more if you want to say more.");
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hi, welcome to IDD Like to Talk. How is your day going?';
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
        var reply = MessageFactory.suggestedActions(['Yes', 'No', 'Not Sure'], 'Is that something you want to do?');
        await turnContext.sendActivity(reply);
    }
}

module.exports.EchoBot = EchoBot;
