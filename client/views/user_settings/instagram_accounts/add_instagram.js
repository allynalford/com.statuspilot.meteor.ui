var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsAddInstagram.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsAddInstagram.onDestroyed(function() {
	
});

Template.UserSettingsAddInstagram.onRendered(function() {


	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettingsAddInstagram.events({
	'submit #add_instagram_form' : function(e, t) {
		e.preventDefault();

		let submit_button = $(t.find(":submit"));

		// instagram info
		let add_instagram = t.find('#add_instagram').value.trim();
		let add_insta_pass = t.find('#add_insta_pass').value.trim();
		let confirm_insta_pass = t.find('#confirm_insta_pass').value.trim();
		// targets
		let add_target_audience = t.find('#add_target_audience').value.trim();
		let add_target_hashtags = t.find('#add_target_hashtags').value.trim();

		let features_save_user_stats = $(e.target).find('#save_user_stats').prop('checked');
		let features_like_hashtag = $(e.target).find('#like_hashtag').prop('checked');
		let features_like_medias_by_location = $(e.target).find('#like_medias_by_location').prop('checked');
		let features_like_timeline = $(e.target).find('#like_timeline').prop('checked');

		// check instagram pass
		if(add_insta_pass !== confirm_insta_pass)
		{
			pageSession.set("errorMessage", "Instagram passwords don't match.");
			t.find('#confirm_insta_pass').focus();
			return false;
		}

		submit_button.button("loading");

		Instagrams.insert({
			belongs_to: Users.findOne()._id,
			active : false,
			lastPayDate : null,
			paid : false,
			username : add_instagram,
			password : add_insta_pass,
			targetAudience : add_target_audience,
			targetUsers : add_target_hashtags,
			features : {
				save_user_stats: {
					start_timestamp: 0,
					repeat_time: 3600,
					bot_params: "",
					active: features_save_user_stats ? true : false
				},
				like_hashtag: {
					start_timestamp: 0,
					repeat_time: 21600,
					bot_params: {
						hashtag: add_target_hashtags.split(','),
						amount: 8
					},
					active: features_like_hashtag ? true : false
				},
				like_medias_by_location: {
					start_timestamp: 0,
					repeat_time: 21600,
					bot_params: {
						locations: [ "Moscow", "Novosibirsk"],
						amount: 8
					},
					active: features_like_medias_by_location ? true : false
				},
				like_timeline: {
					start_timestamp: 0,
					repeat_time: 21600,
					bot_params: {
						amount: 8
					},
					active: features_like_timeline ? true : false
				}
			}
		}, function( error, result) {
			submit_button.button("reset");
			if ( error ) {
				console.log ( 'Instagram insert error is:' + error );
				pageSession.set("errorMessage", error);
			}
			if ( result ) {
				console.log ( 'Instagram insert result is:' + result );
				pageSession.set("errorMessage", "");
				Router.go("user_settings.instagram_accounts");
			}
		});

		pageSession.set("errorMessage", "");

		return false;
	},

});

Template.UserSettingsAddInstagram.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	}
});
