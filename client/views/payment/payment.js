var emailVar;
Template.Payment.onCreated(function() {
	
});

Template.Payment.onDestroyed(function() {
	
});

Template.Payment.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
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
		var register_email = t.find('#register_email').value.trim(); emailVar = register_email;
		var register_phone = t.find('#register_phone').value.trim();
		// Payment info
		var plans = t.find('#plans').value.trim();
		var setupfee = t.find('#setupfee').value.trim();
		var cardnumber = t.find('#cardnumber').value.trim();
		var expire_year = t.find('#expire_year').value.trim();
		var expire_month = t.find('#expire_month').value.trim();
		var cvv = t.find('#cvv').value.trim();
		var country = t.find('#country').value.trim();
		var zipcode = t.find('#zipcode').value.trim();

		// check email
		if(!isValidEmail(register_email))
		{
			t.find('#register_email').focus();
			return false;
		}

		Stripe.card.createToken({
			number: cardnumber,
			cvc:cvv,
			exp_month: expire_month,
			exp_year: expire_year,
			address_country: country,
			address_zip: zipcode
			},stripeResponseHandler);
		// creating user
		submit_button.button("loading");

		//Router.go("/user_settings/instagram_accounts");
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

		Meteor.call('createCustomer', token,emailVar,function(error, result1){
			if(error)
			{
			  console.log(error);
			}
			else
			{
			  console.log('customer');
			  //var customer_id = result1.id;
			  var description = "Tripwire Description";
			  console.log(description);
			  console.log(result1);
			  //console.log(customer_id);
				/*
			  	Meteor.call('chargeCard', token ,amnt,customer_id,description, function(error, result2){
				  if(error)
				  {
					console.log(error);
				  }
				  else
				  {
					console.log('payment');
					console.log(result2);

					var charge_id = result2.id;

					var plan_name ="tripwire_plan";

						Meteor.call('stripeSubscription',customer_id,plan_name, function(error, result3){

							if(error)
							{
							console.log(error);
							}
							else{
								console.log('Subscription');
								console.log(result3);
								var subscription_id = result3.id;
								var subscriber_id = subscriberId;
								var plan_ID =  "tripwire_plan";
								var data =  {
												"userId": "",
												"customerId": customer_id,
												"chargeId": charge_id,
												"subscriptionId": subscription_id,
											};
							}
							
						});
					}
				});
				*/
			}
		});
		
	}
}
