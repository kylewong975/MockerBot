const lib = require('lib')({token: process.env.STDLIB_TOKEN});

/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
	text = randomCapitalize(text);
  callback(null, {
    response_type: 'in_channel',
    text: `${text}`
  });

};

//Randomly capitalizes some letters (50% chance to capitalize a letter)
function randomCapitalize(txt){
	var tmp = '';
	txt = txt.toLowerCase(); //handle the case where user types in all caps.
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