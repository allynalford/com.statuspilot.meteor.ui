let pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsEditInstagram.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsEditInstagram.onDestroyed(function() {
	
});

Template.UserSettingsEditInstagram.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

});

Template.UserSettingsEditInstagram.events({
	'submit .instagrams_form' : function(e, t) {
		e.preventDefault();

		let submit_button = $(e.target).find(":submit");
		submit_button.button("loading");
		
		pageSession.set("errorMessage", "");
		pageSession.set("infoMessage", "");

		let this_id = $(e.target).find('.single-wrap').attr('data-id');
		let username = $(e.target).find('#username').val();
		let insta_pass = $(e.target).find('#password').val();
		let target_audience = $(e.target).find('#target-audience').val();
		let target_hashtags = $(e.target).find('#target-users').val();

		let features_save_user_stats = $(e.target).find('#save_user_stats').prop('checked');
		let features_like_hashtag = $(e.target).find('#like_hashtag').prop('checked');
		let features_like_medias_by_location = $(e.target).find('#like_medias_by_location').prop('checked');

		Instagrams.update({_id: this_id}, {
			$set: {
				password : insta_pass,
				targetAudience : target_audience,
				targetUsers : target_hashtags,
				features : {
					save_user_stats: {
						// start_timestamp: 0,
						repeat_time: 3600,
						bot_params: "",
						active: features_save_user_stats ? true : false
					},
					like_hashtag: {
						// start_timestamp: 0,
						repeat_time: 3600,
						bot_params: {
							hashtag: target_hashtags.split(','),
							amount: 8
						},
						active: features_like_hashtag ? true : false
					},
					like_medias_by_location: {
						// start_timestamp: 0,
						repeat_time: 3600,
						bot_params: {
							locations: [ "Dhaka", "Moscow" ],
							amount: 8
						},
						active: features_like_medias_by_location ? true : false
					}
				}
			}
		}, function (err, res) {
			if (err) {
				throw err;
				pageSession.set("errorMessage", err);
			}
			if (res) {
				console.log(res);
				submit_button.button("reset");
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Instagram profile updated!");
			}
		});

		return false;
	},

	'click .delete-instagram-account': function(e) {
		e.preventDefault();

		let this_id = $(e.target).parents('.single-wrap').attr('data-id');
		let username = $(e.target).parents('.single-wrap').find('#username').val();

		Instagrams.remove( {_id: this_id}, function(err, res){
			if (err) {
				throw err;
				pageSession.set("errorMessage", err);
			}
			if (res) {
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Instagram profile <strong>" + username + "</strong> removed");
			}
		});
	}

});

Template.UserSettingsEditInstagram.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	InstagramAccounts: function() {
		return Instagrams.find({belongs_to:Meteor.userId()}, {});
	},
	checkedIf: function(value) {
		return value ? "checked" : ""
	}

});