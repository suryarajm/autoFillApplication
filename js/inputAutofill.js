var previousSelectedValues, selectionCount;

$(document).ready(function(){
	previousSelectedValues = new Array();
	selectionCount = 0;
});


/*
*list datas match to input value
*/
	function checkInputValue(inputFiled){
		var dataList = "";
		var currentElement = "";
		var listElement = "";
		var listHolderElement = document.getElementById("listHolderDiv");
		var enteredValue = inputFiled.value;
		if($(".namesOptionList").length){
			$(".namesOptionList").remove();
		}
		if(enteredValue.length >= 2){
			dataList = getExternalData(); 
			console.log("dataList: "+JSON.stringify(dataList));
			console.log("enteredValue: "+enteredValue);
	        if(dataList.names != null){
	        	for (var i = 0; i < dataList.names.length; i++) {
	        		currentElement = dataList.names[i];
	        		console.log("currentElement: "+currentElement);
	        		if(currentElement.indexOf(enteredValue) > -1 || currentElement.toLowerCase().indexOf(enteredValue) > -1 || currentElement.toUpperCase().indexOf(enteredValue) > -1){        		  
	        			 console.log("list: "+currentElement);
	        			 listElement = document.createElement("li");
	        			 listHolderElement.appendChild(listElement);
	        			 listElement.setAttribute("class", "namesOptionList");
	        			 listElement.appendChild(document.createTextNode(currentElement));
	        		}
	        	}
	        }

		}
		 $(".namesOptionList").click(function(){	
			var selectedOption = $(this).text();
			$("#inputNames").val(selectedOption);
			$(".namesOptionList").remove();
			saveToStack(selectedOption);
	     });    
	}

/*
*list previuous selected values
*/
	function checkPreviousvalue(){
		var listElement = "";
		var previousSelection = "";
		var listHolderElement = document.getElementById("listHolderDiv");
		if(previousSelectedValues.length > 0){
		  for(i = previousSelectedValues.length; i > 0; i--){		  	 
			  	previousSelection = previousSelectedValues[i-1];
			  	if($("#inputNames").val() != previousSelection){
			  		listElement = document.createElement("li");
			        listHolderElement.appendChild(listElement);
			        listElement.setAttribute("class", "namesOptionList");
			        listElement.appendChild(document.createTextNode(previousSelection));
			  	}				
		  }			
		}  

		$(".namesOptionList").click(function(){	
			var selectedOption = $(this).text();
			$("#inputNames").val(selectedOption);
			$(".namesOptionList").remove();
			saveToStack(selectedOption);
	    });    
	}

/*
*get external json file
*/
	function getExternalData(){
		var json = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "../json/dataList.json",
	        'dataType': "json",
	        'success': function (data) {
	            json = data;
	        }
	    });
	    return json;
	}

/*
*clear input field
*/
	function clearFields(){
	 	$("#inputNames").val("");
	}

/*
*save selected options into a stack
*/
	function saveToStack(selectedOption){
		if(selectionCount < 4){
			previousSelectedValues[selectionCount] = selectedOption;
			selectionCount ++;
		}
		else{
			for(var j=0;j<3;j++){
				previousSelectedValues[j] = previousSelectedValues[j+1];
			}
			previousSelectedValues[j] = selectedOption;
		}
		
	}


 

