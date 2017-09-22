
Meteor.startup(() => {

    Meteor.methods({
        createCustomer: function(stripeToken , email) {

            var Stripe = StripeAPI('sk_test_Xlvot5lSlBLb313mOMpaMrjH');

            var customer = Stripe.customers.create({
                email: email,
                source: stripeToken,
                }, function(err, customer) {
                    if(err)
                    {
                        console.log("Stripe customer create error");
                    }
                    else
                    {
                        console.log("Stripe Customer Create");
                    }
            });
        },
        chargeCard: function(stripeToken , amnt ,customer_id , description) {


                var Stripe = StripeAPI('sk_test_Xlvot5lSlBLb313mOMpaMrjH');

                var charge = Stripe.charges.create({
                    amount: amnt,
                    currency: "usd",
                    description: description,
                    customer: customer_id

                }, function(err, charge) {
                    
                    if(err)
                    {
                        console.log("Stripe Charge create error");
                    }
                    else
                    {
                        console.log("Stripe Charge Create");
                    }
                });
        },
        stripeSubscription: function(customer_id , plan) {

                var Stripe = StripeAPI('sk_test_Xlvot5lSlBLb313mOMpaMrjH');

                Stripe.subscriptions.create(customer_id, {
                    plan: plan
                }, function(err, subscription) {

                    if(err)
                    {
                        console.log("Stripe Subscription create error");
                    }
                    else
                    {
                        console.log("Stripe Subscription create error");
                    }
                });
        },
    });
});