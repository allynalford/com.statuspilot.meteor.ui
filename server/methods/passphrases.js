Meteor.methods({
	privateKey: function () {
        return Meteor.settings.private.passphrase;
    },
});
