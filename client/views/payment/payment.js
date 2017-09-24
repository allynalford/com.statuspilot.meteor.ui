var subscriptionEmail;

Template.Payment.onCreated(function() {
	
});

Template.Payment.onDestroyed(function() {
	
});

Template.Payment.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
	var ttt = getPlanList()
	.then(function(res) {
		var i = 0;
		for(i=0;i<3;i++){
			if(res[i].id) {
				$('#plans').append($('<option>',{
					value: res[i].id,
					text:  res[i].name
				}));
			}
		}
		console.log(res);
		return res;
	})
	.catch(function(err){
		console.log(err);
	});

	if(Session.get('isRegistered') == true){
		Router.go("/user_settings/instagram_accounts");
	}
	Session.set('isRegistered', true);
});

Template.Payment.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		// your account info
		var register_username = t.find('#register_username').value.trim();
		var register_email = t.find('#register_email').value.trim();
		subscriptionEmail = register_email;
		var register_phone = t.find('#register_phone').value.trim();

		// Payment info
		var plans = t.find('#plans').value.trim();
		var setupfee = t.find('#setupfee').value.trim();
		var cardnumber = t.find('#cardnumber').value.trim();
		var expire_year = t.find('#expire_year').value.trim();
		var expire_month = t.find('#expire_month').value.trim();
		var cvv = t.find('#cvv').value.trim();  cvv = "293";
		var country = t.find('#country').value.trim();
		var zipcode = t.find('#zipcode').value.trim(); zipcode = "03-234";

		// email validation checking
		if(!isValidEmail(register_email))
		{
			t.find('#register_email').focus();
			return false;
		}
		
		// Stripe Getting the Token
		Stripe.card.createToken({
			number: cardnumber,
			cvc:cvv,
			exp_month: expire_month,
			exp_year: expire_year,
			address_country: country,
			address_zip: zipcode
			},stripeResponseHandler);
		
		submit_button.button("loading");
		sweetAlert("Setup fee and your Subscription is successfully charged!");
	},

});

Template.Payment.helpers({

});

function stripeResponseHandler(status, response) {

	if (response.error) { 
	  	console.log("stripe error");
	} else {
		var token = response.id;
		console.log(token);

		var iSetupFee = $('#setupfee').find(":selected").val();
		var setupfee = 0.00;
		if(iSetupFee == 2) setupfee = 99.00;
		if(iSetupFee == 3) setupfee = 199.00;
		console.log(setupfee);

		// Setup Fee Charge
		Meteor.call('stripeCharge', token, setupfee, function(error, result){
			if(error)
			{
				console.log(error);
			}else{
				console.log(result);
			}
		});
		
		// Stripe Subscription
		var plan = $('#plans').find(":selected").val();
		console.log(plan);
		
		Meteor.call('createSubscription', token, subscriptionEmail, plan, function(error, customer){
			if(error)
			{
			  console.log(error);
			}
			else
			{
			  console.log('Creating Customer success');
			  console.log(customer);
			  Router.go("/user_settings/instagram_accounts");
			}
		});
	}
};

function getPlanList(){
	return new Promise (function(resolve, reject) {
		Meteor.call('getPlanList', function(err, result) {
			if(err) return reject(err);
			else return resolve(result); 
		})
	});
};