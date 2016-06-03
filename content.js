var mtb = mtb || {};
mtb.randomShipit = mtb.randomShipit || {};

(function() {
	'use strict';

	var self = this;
	var shipitsArr = [
		':shipit:',
		':ship: :it:',
		':ship: :it:',
		':ship: :it:',
		':sheep: :it:',
		':sheep: :it:',
		':sheep: :it:',
		':sheep:',
		':sheep:',
		':sheep:',
		':package:',
		':package:',
		':package:',
		':ship: :it:',
		':boat: :it:',
		':speedboat: :it:',
		':fish: :it:',
		':tropical_fish: :it:',
		':truck: :it:',
		':rocket:',
		':ok:',
		':ok_hand:',
		':thumbsup:',
		':100:',
	];

	this.init = function() {
		self.appendShipitButton();
		self.setupBindings();
	};

	this.appendShipitButton = function() {
		var imageUrl = 'https://assets-cdn.github.com/images/icons/emoji/shipit.png';

		if (this.isDecember()) {
			imageUrl = chrome.extension.getURL('images/xmas/38x38.png');
		};

		$('.js-comment-and-button').after('<button type="button" class="btn js-random-shipit"><span class="btn-text">Random</span><img class="btn-icon" height="20" width="20" src="' + imageUrl + '"></button>');
	};

	this.isDecember = function() {
		var date = new Date();
		var month = date.getMonth();

		return month === 11;
	};

	this.setupBindings = function() {
		$(document).on('click', '.js-random-shipit', self.getRandomShipit);

		var gitHubElWrapper = document.getElementById('js-pjax-loader-bar');
		var observer = new window.MutationObserver(function(mutations, observer) {
			// fired when a mutation occurs
			if ($('.js-random-shipit').length === 0) {
				self.appendShipitButton();
			}
		});

		// define what element should be observed by the observer
		// and what types of mutations trigger the callback
		observer.observe(gitHubElWrapper, {
			subtree: false,
			attributes: true
		});
	};

	this.getRandomShipit = function() {
		var rnd = Math.floor(Math.random() * shipitsArr.length);
		var val = shipitsArr[rnd];
		var textToAdd = $('#new_comment_field').val() + ' ' + val;
		$('#new_comment_field').val(val);

		self.submitForm();
	};

	this.submitForm = function() {
		$('.js-new-comment-form').submit();
		$('#new_comment_field').val('');
	};
}).apply(mtb.randomShipit);

mtb.randomShipit.init();