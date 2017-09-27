Meteor.methods({
	insertCustomer: function(data) {
		if(!Customers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Customers.insert(data);
	},

	updateCustomer: function(id, data) {
		var doc = Customers.findOne({ _id: id });
		if(!Customers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Customers.update({ _id: id }, { $set: data });
	},

	removeCustomer: function(id) {
		var doc = Customers.findOne({ _id: id });
		if(!Customers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Customers.remove({ _id: id });
	}
});
