var stripe = require("stripe")("sk_test_Xlvot5lSlBLb313mOMpaMrjH");
Meteor.startup(() => {

    Meteor.methods({
        createSubscription: function(stripeToken, email, plan){

            /*
            var Stripe = StripeAPI('sk_test_Xlvot5lSlBLb313mOMpaMrjH');

            var customer_id;
            Stripe.customers.create({
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
                        console.log(customer);
                        customer_id = customer.id;
                    }
            });
            */
            /*
            Stripe.customers.createSubscription({
                customerId: customer_id,
                items: [
                    {
                        plan: plan,
                    },
                ],
            }, function(err, subscription) {

                if(err)
                {
                    console.log("Stripe Subscription create error");
                    console.log(err);
                }
                else
                {
                    console.log("Stripe Subscription create ");
                    console.log(subscription);
                }
            });
            */
            stripe.customers.create({
                account_balance:0,    // starting account balance for customer, cents
                business_vat_id:null, //cusomter's VAT identification number
                coupon: null,         // coupon code
                description: null,    // arbitrary string which u can attach to a customer object.
                email: email,      //customer email address
                source: stripeToken,         // token or source's Id
                metadata:null,             //set of key/value; it is useful for storing additional information.
                }, function(err, customer) {
                  if(err)
                  {
                    console.log(err);
                  }
                  else {
                      var customer_id = customer.id;  // customer id is required for the customer subscription
                      console.log(customer);
            
                        //        creating subscription
                      stripe.subscriptions.create({
                        customer: customer_id,         // customer id
                        items: [                       //subscription items list
                          {
                            plan: plan,     //plan Id
                          },
                        ],
                      }, function(err, subscription) {
                         if(err)
                         {
                           console.log(err);
                         }
                         else {
                           console.log(subscription);
                           console.log("subscription charged");
                        }
                    });
                }
            });
        },
        getPlanList: function() {
            return new Promise (function(resolve, reject) {
                stripe.plans.list(
                    function(err, plans) {
                        if(err) return reject(err);
                        else {
                            var planlist = plans.data;
                            console.log(planlist);
                            var l =  planlist.length;
                            var i =0; 
                            var plist = {};
                            for(i=0; i<l; i=i+1){
                                plist[i] = {};
                                plist[i]['id'] = planlist[i].id;
                                plist[i]['name'] = planlist[i].name;
                            }
                            console.log(plist);
                            return resolve(plist);
                        }
                    }
                );
            });
        },
        createCustomer: function(stripeToken , email) {

            var Stripe = StripeAPI('sk_test_Xlvot5lSlBLb313mOMpaMrjH');

            var customer = Stripe.customers.create({
                email: email,
                source: stripeToken,
                }, function(err, customer) {
                    if(err)
                    {
                        console.log("Stripe customer create error");
                        return {
                            status: 0,
                            data: null
                        }
                    }
                    else
                    {
                        console.log("Stripe Customer Create");
                        console.log(customer);
                        return {
                            status: 1,
                            data: customer
                        };

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
                        return {
                            status: 0,
                            data: null
                        }
                    }
                    else
                    {
                        console.log("Stripe Charge Create");
                        return {
                            status: 1,
                            data: charge
                        };
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
                        return subscription;
                    }
                });
        },
    });
});
