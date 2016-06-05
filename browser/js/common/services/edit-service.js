app.service('EditService', function($rootScope){
	this.getSchema = function(directiveType){
		if (directiveType == 'soloTable'){
			return {
				'type': 'object',
				'title': 'Solo Table',
				'properties': {
					'class': {
						'title': 'Class',
						'type': 'string'
					},
					'info_source': {
						'title': 'Info Source',
						'type': 'string'
					},
					'info_type': {
						'title': 'Info Type',
						'type': 'string',
						'enum': ['json', 'csv']
					}
				}
			};
		}
	};
});