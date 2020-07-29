$(function () {

	var colors = [
		'26e000', '2fe300', '37e700', '45ea00', '51ef00',
		'61f800', '6bfb00', '77ff02', '80ff05', '8cff09',
		'93ff0b', '9eff09', 'a9ff07', 'c2ff03', 'd7ff07',
		'f2ff0a', 'fff30a', 'ffdc09', 'ffce0a', 'ffc30a',
		'ffb509', 'ffa808', 'ff9908', 'ff8607', 'ff7005',
		'ff5f04', 'ff4f03', 'f83a00', 'ee2b00', 'e52000'
	];

	var rad2deg = 180 / Math.PI;
	var deg = 0;
	var bars = $('#bars');

	for (var i = 0; i < colors.length; i++) {

		deg = i * 12;

		// Create the colorbars

		$('<div class="colorBar">').css({
			backgroundColor: '#' + colors[i],
			transform: 'rotate(' + deg + 'deg)',
			top: -Math.sin(deg / rad2deg) * 80 + 100,
			left: Math.cos((180 - deg) / rad2deg) * 80 + 100,
		}).appendTo(bars);
	}

	var colorBars = bars.find('.colorBar');
	var numBars = 0, lastNum = -1;

	$('#lowcontrol').knobKnob({
		snap: 10,
		value: 0,
		turn: function (ratio) {
			numBars = Math.round(colorBars.length * ratio);

			// Update the dom only when the number of active bars
			// changes, instead of on every move

			if (numBars == lastNum) {
				return false;
			}
			lastNum = numBars;

			colorBars.removeClass('active').slice(0, numBars).addClass('active');
		}
	});
	$(function () {

		var lowslider = $('#lowslider'),
			min = lowslider.attr('min'),
			max = lowslider.attr('max'),
			currentValue = $('#currentValue');
		lowcontroltext = $('#lowcontroltextvalue');

		// Hiding the slider:
		lowslider.hide();

		$('#lowcontrol').knobKnob({
			snap: 10,
			value: 0,
			turn: function (ratio) {
				// Changing the value of the hidden slider
				lowslider.val(Math.round(ratio * (max - min) + min));

				// Updating the current value text
				currentValue.html(lowslider.val());
				lowcontroltext.html("Low: " + lowslider.val());
				if (lowslider.val() == 0) {
					lowcontroltext.html("Low: OFF");
				}
			}
		});

	});
	$(function () {

		var highslider = $('#highslider'),
			min = highslider.attr('min'),
			max = highslider.attr('max'),
			currentValue = $('#currentValue');
		highcontroltext = $('#highcontroltextvalue');

		// Hiding the slider:
		highslider.hide();

		$('#highcontrol').knobKnob({
			snap: 10,
			value: 0,
			turn: function (ratio) {
				// Changing the value of the hidden slider
				highslider.val(Math.round(ratio * (max - min) + min));

				// Updating the current value text
				currentValue.html(highslider.val());
				highcontroltext.html("High: " + highslider.val());
				if (highslider.val() == 0) {
					highcontroltext.html("High: OFF");
				}
			}
		});

	});


	lowslider.addEventListener("mousemove", function () {

		console.log($('#lowslider').val());
		var x = $('#lowslider').val();
		var conversion = ((x - 0) / (100 - 0))
			* (20 - (-20)) + (-20);

		eq.low.value = conversion;



	}, { passive: true });




	highslider.addEventListener("mousemove", function () {

		console.log($('#highslider').val());
		var x = $('#highslider').val();
		var conversion = ((x - 0) / (100 - 0))
			* (20 - (-20)) + (-20);

		eq.high.value = conversion;






	}, { passive: true });

	$('#highcontrol').knobKnob({
		snap: 10,
		value: 0,
		turn: function (ratio) {
			numBars = Math.round(colorBars.length * ratio);

			// Update the dom only when the number of active bars
			// changes, instead of on every move

			if (numBars == lastNum) {
				return false;
			}
			lastNum = numBars;

			colorBars.removeClass('active').slice(0, numBars).addClass('active');
		}
	});


});

