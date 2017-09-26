var pageSession = new ReactiveDict();

Template.Register.onCreated(function() {
	pageSession.set("errorMessage", "");
	
});

Template.Register.onDestroyed(function() {
	
});

Template.Register.onRendered(function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false);

	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Register.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		// credentials
		var register_username = t.find('#register_username').value.trim();
		var register_password = t.find('#register_password').value;
		var confirm_password = t.find('#confirm_password').value;
		// personal info
		var register_email = t.find('#register_email').value.trim();
		var register_first_name = t.find('#register_first_name').value.trim();
		var register_last_name = t.find('#register_last_name').value.trim();
		var register_cell_no = t.find('#register_cell_no').value.trim();
		var register_country = t.find('#register_country').value.trim();


		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}

		// check password
		var min_password_len = 6;

		if(register_password !== confirm_password)
		{
			pageSession.set("errorMessage", "Your passwords don't match.");
			t.find('#confirm_password').focus();
			return false;
		}

		if(!isValidPassword(register_password, min_password_len)) // TODO make it strong
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;
		}

		// creating user
		submit_button.button("loading");
		Accounts.createUser({
			username: register_username,
			email: register_email,
			password : register_password,
			profile: {
				firstName: register_first_name,
				lastName: register_last_name,
				cellPhone: register_cell_no,
				country: register_country,
			}
		}, function(err) {
			submit_button.button("reset");
			if(err) {
				if (err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			} else {
				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
			}
		});
		return false;
	},

	"click .go-home": function(e, t) {
		Router.go("/");
	}
	
});

Template.Register.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}
	
});
