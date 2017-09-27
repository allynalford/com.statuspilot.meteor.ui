var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsAddCustomer.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsAddCustomer.onDestroyed(function() {
	
});

Template.UserSettingsAddCustomer.onRendered(function() {


	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettingsAddCustomer.events({
	'submit #add_customer_form' : function(e, t) {
		e.preventDefault();

		let submit_button = $(t.find(":submit"));

		// customer info
		let customer_name = t.find('#customer_name').value.trim();
		let customer_email = t.find('#customer_email').value.trim();
		let customer_phone = t.find('#customer_phone').value.trim();
		let customer_city = t.find('#customer_city').value.trim();
		let customer_state = t.find('#customer_state').value.trim();
		let customer_company = t.find('#customer_company').value.trim();

		submit_button.button("loading");

		let data = {
			name: customer_name,
			email: customer_email,
			phone: customer_phone,
			city: customer_city,
			state: customer_state,
			company: customer_company
		};

		Meteor.call('insertCustomer', data, function( error, result) {
			submit_button.button("reset");
			if ( error ) {
				pageSession.set("errorMessage", error);
			}
			if ( result ) {
				pageSession.set("errorMessage", "");
				Router.go("user_settings.customers");
			}
		});

		pageSession.set("errorMessage", "");

		return false;
	},

});

Template.UserSettingsAddCustomer.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	}
});
