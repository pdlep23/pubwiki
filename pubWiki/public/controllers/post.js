wikiApp.controller("postController", function($scope, $http, $routeParams) {
  // Controller for post view

  // CKEditor
  ClassicEditor.create(document.querySelector('#editor'), {
    toolbar: {
      items: ['heading', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'todoList', '|', 'outdent', 'indent', 'alignment', '|', 'blockQuote', 'insertTable', 'imageInsert', 'mediaEmbed', 'undo', 'redo', '|', 'code', 'codeBlock', 'htmlEmbed', 'MathType', 'ChemType', 'strikethrough', 'subscript', 'superscript', 'horizontalLine'],
      shouldNotGroupWhenFull: true
    },
    mediaEmbed: {
      previewsInData: true
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    licenseKey: '',
  })
  .then(editor => {
    window.editor = editor;
    editorReady();
  })
  .catch( error => {
    console.error('Oops, something went wrong!');
    console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
    console.warn('Build id: bojh7pnw6nnm-dfpekd22znn5');
    console.error(error);
  });

  // This function is called when the editor is ready (Your GET logic should go here)
  function editorReady(editor) {
		//if the parameter is filled
		//GET request to fill out the page's info to update wiki
		if($routeParams.urlName){
			$http.get('/api/wiki/post/' + $routeParams.urlName)
			.then(function(response){
				$scope.title = response.data[0].title;
				$scope.category = response.data[0].category;
				$scope.author = response.data[0].author;
				$scope.urlName = response.data[0].urlName;
				window.editor.setData(response.data[0].html);
				$scope.new = true;//lock out the the urlName
			})
			.catch(function(err) {
  			alert("URL does not exist");//urlName does not exist
			});
		} else{
    window.editor.setData("");//set data to blank
		}
  }

  // This function returns the HTML contents of the editor (Call this during your POST/PUT operations)
  function getHtml() {
    return window.editor.getData();//pull data
  }

	//Save button, if parameter has urlName
	//create updateWiki, use PUT request and take user to
	//the updated page
	//if no parameter, create newWiki, use POST request and take user to updated page
	$scope.post = () => {
		if($routeParams.urlName){
			let updateWiki = {
			title: $scope.title,
			category: $scope.category,
			author: $scope.author,
			urlName: $scope.urlName,
			html: getHtml(),
			password: $scope.password,
			updatedDate: Date.now()
		}
		updateWiki = JSON.stringify(updateWiki);
				$http.put(`/api/wiki/post/`+ $routeParams.urlName, updateWiki)
				.then(function(response){	
		  		
					window.location = '#!/' + $routeParams.urlName;
    		})
    		.catch(function(err) {
					if(err.data.message) {
						alert(err.data.message);
					} else {
						alert("Wrong Password");
					}
    		});
		}else{
		let newWiki = {
			title: $scope.title,
			category: $scope.category,
			author: $scope.author,
			urlName: $scope.urlName,
			html: getHtml(),
			password: $scope.password,
			createdDate: $scope.createdDate,
			updatedDate: $scope.updateDate
		}
		newWiki = JSON.stringify(newWiki);
		$http.post('/api/wiki/post', newWiki)
		.then(function(response) {
			console.log(response);
			console.log('New Wiki Added');
			window.location = '#!/' + $scope.urlName;
		})
		.catch(function(err) {
			console.log(err);
			if(err.data.message) {
				alert(err.data.message);
			} else {
				alert("url already used");
			}
			console.log('New Post error');
		})
		}	
	}

	
});
