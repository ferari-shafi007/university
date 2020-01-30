const FBMessenger = require('fb-messenger')
const messenger = new FBMessenger({
        token: 'EAAIMbyzRBYIBANvI8UbGdKUEUbXf0fWRVzFjkqOEO1fGXJIJvw1teX6UoVZAMckoEWsZBCCMWrx7TIMcFteZAUPfjPhIVuLwcZBg1tpaGTCc5t53hnI8es1w3WfPI6B2FU8dXFgwEtvpg4o3aiMCZBiHgdOOd9j0AVoGj18XRAtypEBI3UCv2'
    }) // Will always use this page's token for request unless sent on each method

module.exports = messenger;