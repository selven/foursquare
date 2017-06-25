import './sass/search.scss';
import './sass/results.scss';
const $ = require('jquery');
const results_template = require('./templates/results.handlebars');

export default {
	div : $('#search'),
	results : $('#results'),

	foursquare : {
		url : 'https://api.foursquare.com/v2/',
		version : '20131016',
		client_id : '5OEBPXO5YC1OR2LLADQT3KCU0BRNZPGZ3AYKB2BIOOJ55OKJ',
		client_secret : 'HRICESWDWAA1V1UBS4UR2EIVFNZFHUENG5CASPLBJSJR4BER'
	},

	events : function() {
		var self = this;

		this.div.on('submit', 'form', function(e) {
			e.preventDefault();
			self.submit_form($(this).find('input').val());
		});
	},
	
	show_results : function(results) {
		console.log(results);
		var html = results_template(results);
		console.log(html);
		$('#results').html(html);
	},
	
	get_data : function(endpoint) {
		var self = this;
		$.getJSON(this.foursquare.url + endpoint+'&v='+this.foursquare.version+'&client_id='+this.foursquare.client_id+'&client_secret='+this.foursquare.client_secret, function(response) {
			self.show_results(response.response.groups[0].items);
		});
	},
	
	submit_form : function(val) {
		val = 'London';
		this.div.addClass('searched');
		this.get_data('venues/explore?near='+val);
	},
	
	init : function() {
		this.events();
	}
}