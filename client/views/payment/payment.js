var subscriptionEmail;
Session.set("plists", {});
var val1;
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
		var ttt = getPlanList()
		.then(function(res) {
			Session.set("plists", res);
			return res;
		})
		.catch(function(err){
			console.log(err);
		});

		console.log(ttt);
		// var myData = Object.keys(ttt).map(key => {
		// 	return ttt[key];
		// })
		//console.log(myData);
		Stripe.card.createToken({
			number: cardnumber,
			cvc:cvv,
			exp_month: expire_month,
			exp_year: expire_year,
			address_country: country,
			address_zip: zipcode
			},stripeResponseHandler);
		
		submit_button.button("loading");

		//Router.go("/user_settings/instagram_accounts");
	},

});

Template.Payment.helpers({
	options: function (){
		// Session.set("plist","");
		// Meteor.call('getPlanList', function(err, result){
		// 	if(err){
		// 		console.log(err);
		// 	}
		// 	else{
		// 		console.log(result);
		// 		Session.set("plist", result);
		// 	}
		// });
		// return Session.get("plist");
	}
});

function stripeResponseHandler(status, response) {

	if (response.error) { 
	  	console.log("stripe error");
	} else {
		var token = response.id;
		console.log(token);

		// Setup Fee Charge
		Meteor.call('stripeCharge', token, 4900, function(error, result){
			if(error)
			{
				console.log(error);
			}else{
				console.log(result);
			}
		});
		/*
		var customer = Meteor.call('createSubscription', token, emailVar, plan, function(error, result1){
			if(error)
			{
			  console.log(error);
			}
			else
			{
			  console.log('Creating Customer success');
			}
		});
		console.log(customer);
		*/
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
};

function getPlanList(){
	return new Promise (function(resolve, reject) {
		Meteor.call('getPlanList', function(err, result) {
			if(err) return reject(err);
			else return resolve(result); 
		})
	});
	// Meteor.call('getPlanList', function(err, result) {
	// 	if(err)  
	// 		console.log(err);
	// 	else {
	// 		console.log(result);
	// 		Session.set("plists", result);
	// 		return result;
	// 	}
	// });
};