
$ai_manifest=[
    $scope.schema = {
        'type': 'object',
        'title': 'Solo Table',
        'properties': {
          'ai_title': {
            'title': 'table title',
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
      },
    $scope.model = {
        'info_source': 'Jonah'
      },

    $scope.form = [
        "*", {
          type: "submit",
          title: "Save"
        }
    ]
]
}