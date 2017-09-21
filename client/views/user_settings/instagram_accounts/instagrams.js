var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsInstagrams.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsInstagrams.onDestroyed(function() {
	
});

Template.UserSettingsInstagrams.onRendered(function() {


	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettingsInstagrams.events({
	'submit .instagrams_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(e.target).find(":submit");
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
						start_timestamp: Date.now(),
						repeat_time: 180,
						bot_params: "",
						active: features_save_user_stats ? 1 : 0
					},
					like_hashtag: {
						start_timestamp: Date.now(),
						repeat_time: 180,
						bot_params: {
							hashtag: target_hashtags.split(',')
						},
						active: features_like_hashtag ? 1 : 0
					},
					like_medias_by_location: {
						start_timestamp: Date.now(),
						repeat_time: 180,
						bot_params: {
							locations: [ "Moscow", "Novosibirsk"],
							amount: 1
						},
						active: features_like_medias_by_location ? 1 : 0
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
				pageSession.set("infoMessage", "Instagram profile updated for <strong>" + username + "</strong>");
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

Template.UserSettingsInstagrams.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	InstagramAccounts: function() {
		return Instagrams.find({belongs_to:Meteor.userId()}, {});
	}
	
});


Template.InstagramAccountSingle.helpers({
	checkedIf: function(value) {
		return value ? "checked" : ""
	},
});