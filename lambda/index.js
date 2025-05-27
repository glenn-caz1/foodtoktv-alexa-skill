
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to FoodTokTV Recipes! You can ask how to make a dish like shrimp cakes or banana bread. What would you like to cook?';
        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    }
};

const GetRecipeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetRecipeIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope?.request?.intent?.slots || {};
        console.log("~~~ All Slots Received:", JSON.stringify(slots));
        const recipeName = slots.RecipeName?.value || '';
        let speechText = '';
        if (recipeName.toLowerCase() === 'shrimp cakes') {
            speechText = 'To make shrimp cakes, combine chopped shrimp, breadcrumbs, egg, and seasoning. Form into patties and pan-fry until golden. Serve with dipping sauce.';
        } else if (recipeName.toLowerCase() === 'banana bread') {
            speechText = 'To make banana bread, mash ripe bananas and mix with sugar, eggs, flour, and baking soda. Pour into a loaf pan and bake until golden.';
        } else {
            speechText = `Sorry, I don’t have a recipe for ${recipeName} yet.`;
        }
        return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('You can ask me how to make a recipe like shrimp cakes or banana bread.')
            .reprompt('Which recipe would you like to hear?')
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak('Goodbye!').getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Sorry, I didn’t catch that. Try asking how to make shrimp cakes.')
            .reprompt('What recipe would you like to hear?')
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log("~~~ ERROR:", error.stack || error.message);
        return handlerInput.responseBuilder
            .speak('Sorry, something went wrong.')
            .reprompt('Try asking for a recipe.')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetRecipeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
