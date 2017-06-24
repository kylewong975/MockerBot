const lib = require('lib')({token: process.env.STDLIB_TOKEN});

/**
* message event
*
*   All events use this template, simply create additional files with different
*   names to add event responses
*
*   See https://api.slack.com/events-api for more details.
*
* @param {string} user The user id of the user that invoked this event (name is usable as well)
* @param {string} channel The channel id the event was executed in (name is usable as well)
* @param {string} text The text contents of the event
* @param {object} event The full Slack event object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/

module.exports = (user, channel, text = '', event = {}, botToken = null, callback) => {

  // Mock every message
	if (text.match(/.*/)) {
		text = randomCapitalize(text);
    callback(null, {
		text: `${text}`
    });
  } else {
    callback(null, {});
  }

};

//Randomly capitalizes some letters (50% chance to capitalize a letter)
function randomCapitalize(txt){
	var tmp = '';
	txt.toLowerCase(); //handle the case where user types in all caps.
	for(var x = 0; x < txt.length; x++)
	{
		var num = 1 + (Math.random() * 100); //1 to 100
		if(num <= 50)
		{
			tmp += txt.charAt(x);
		}
		else
			tmp += txt.charAt(x).toUpperCase();
	}
	return tmp;
}