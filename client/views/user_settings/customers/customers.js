var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsCustomers.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsCustomers.onDestroyed(function() {
	
});

Template.UserSettingsCustomers.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

});

Template.UserSettingsCustomers.events({

	'click .edit-customer-account': function(e) {
		e.preventDefault();
		let this_id = $(e.target).parents('.tab-pane').attr('data-id');
		Router.go( "user_settings.edit_customer", mergeObjects(Router.currentRouteParams(), {instaId: this_id}) );
	},

	'click .delete-customer-account': function(e) {
		e.preventDefault();

		let this_id = $(e.target).parents('.tab-pane').attr('data-id');
		let username = $(e.target).parents('.tab-pane').find('.username').text();

		bootbox.dialog({
			message: "Are you sure to delete this customer account: <strong>" + username + "</strong>?",
			title: "Delete customer account",
			animate: true,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-danger",
					callback: function() {
						Meteor.call("removeCustomer", this_id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
	},

});

Template.UserSettingsCustomers.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	CustomerAccounts: function() {
		return Customers.find({});
	}
	
});