let pageSession = new ReactiveDict();

Template.Billing.onCreated(function() {
	pageSession.set("errorMessage", "");

});

Template.Billing.onDestroyed(function() {

});

Template.Billing.onRendered(function() {
	pageSession.set("errorMessage", "");



	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Billing.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}

});
