this.BillingController = RouteController.extend({
	template: "Billing",


	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

  onAfterAction: function() {

  }

  });
