// Sermons
// J.B. Rainwater, 2020-2025

    'use strict';
    // this function is strict...
    var URL = window.location.origin.replace("https://", "").replace("http://", "");
    var WWW = "<Site URL Here>";

    //Button Array
    var titleArray = [];
	var sermonSeriesArray = [];
	var sermonURLArray = [];
	var sermonImageArray = [];
	var podcastURLArray = [];
	var versesArray = [];
	var versesURLArray = [];
	var dateArray = [];
	var speakerArray = [];

	var sermonSeriesOptions = [];
	var speakerOptions = [];
	var monthOptions = [];
	var yearOptions = [];

    /*function createMainHeader(){
        $.each(H1TitleArray, function(index, value){
            //Creates single H1 page header
            $('#contentHeader').attr("class", H1ClassesMy).attr("style", H1StyleMy).html(value);
        });
    }*/

	function addOptions (series, speaker, year){
		
		var containSeries = sermonSeriesOptions.includes(series);
		var containSpeaker = speakerOptions.includes(speaker);
		var containYear = yearOptions.includes(year);
		
		//
		if (containSeries == false){
			sermonSeriesOptions.push(series);
		}else{
			//Do nothing
		}
		
		//
		if (containSpeaker == false){
			speakerOptions.push(speaker);
		}else{
			//Do nothing.
		}
		
		//
		if (containYear == false){
			yearOptions.push(year);
		}else{
			//Do nothing.
		}
		
		//Sorts Sermon Series and Speakers into alphabetical order.
		sermonSeriesOptions.sort();
		speakerOptions.sort();
	}

	//Adds the Dropdown options to the filters in the HTML file.
	function addDropDowns(){
		$.each(sermonSeriesOptions, function(index, value){
			$('<option/>',{
                'value' : value,
				'html' : value.replaceAll('-',' ')
            }).appendTo('#series select');
		});
		
		$.each(sermonSeriesOptions, function(index, value){
			$('<li/>',{
                'data-value' : value,
				'html' : value.replaceAll('-',' ')
            }).appendTo('#series ul');
		});
		
		$.each(speakerOptions, function(index, value){
			$('<option/>',{
                'value' : value.replace(' ','').substr(0,7).toLowerCase(),
				'html' : value
            }).appendTo('#speakers select');
		});
		
		$.each(speakerOptions, function(index, value){
			$('<li/>',{
                'data-value' : value.replace(' ','').substr(0,7).toLowerCase(),
				'html' : value
            }).appendTo('#speakers ul');
		});
		
		$.each(monthOptions, function(index, value){
			$('<option/>',{
                'value' : value,
				'html' : value
            }).appendTo('#month select');
		});
		
		$.each(monthOptions, function(index, value){
			$('<li/>',{
                'data-value' : value,
				'html' : value
            }).appendTo('#month ul');
		});
		
		$.each(yearOptions, function(index, value){
			$('<option/>',{
                'value' : value,
				'html' : value
            }).appendTo('#year select');
		});
		
		$.each(yearOptions, function(index, value){
			$('<li/>',{
                'data-value' : value,
				'html' : value
            }).appendTo('#year ul');
		});
	}

	//Takes the numerical date that is in the JSON files and determines what month it belongs to.
	function getMonth(date){
		var month;
		var monthNumber = date.substr(5,2);
		
		switch (monthNumber){
			case '01':
				month = 'January';
				break;
			case '02':
				month = 'February';
				break;
			case '03':
				month = 'March';
				break;
			case '04':
				month = 'April';
				break;
			case '05':
				month = 'May';
				break;
			case '06':
				month = 'June';
				break;
			case '07':
				month = 'July';
				break;
			case '08':
				month = 'August';
				break;
			case '09':
				month = 'September';
				break;
			case '10':
				month = 'October';
				break;
			case '11':
				month = 'November';
				break;
			case '12':
				month = 'December';
				break;
			default :
				month = 'January';
				break;
		}
		return month;
	}

	//Creates the overall content area for the sermon blocks.
    function createContentArea(){
        $.each(sermonURLArray, function(index, value){
			
			//Creates date string.
			var month = getMonth(dateArray[index]);
			var date = dateArray[index].substr(8);
			var year = dateArray[index].substr(0,4);
			var dateString = month + ' ' + date + ', ' + year;
			
			var speakerClass = speakerArray[index].replace(' ','').substr(0,7).toLowerCase();
			
			var mainClass = 'sermon ' + sermonSeriesArray[index].toLowerCase()+ ' ' + speakerClass + ' ' + month.toLowerCase() + ' ' + year;
			
			addOptions(sermonSeriesArray[index], speakerArray[index], year);
            
            //Creates multiple entries for every sermon in the sermons JSON file.
			//Creates entry wrapper.
            $('<div/>',{
                'class' : 'entry-col ' + mainClass,
				'id' : 'sermon-' + index,
				'display' : 'inline'
            }).appendTo('#page1');
			
			$('<div/>',{
                'class' : 'entry',
				'id' : 'entry-' + index
            }).appendTo('#sermon-'+index);
			
			//Create image.
            $('<div/>',{
                'class' : 'thumbnail-attachment',
				'id' : 'img-' + index,
				'html' : '<img src="' + sermonImageArray[index] + '" alt="">'
            }).appendTo('#entry-'+index);
			
			//Create entry body wrapper.
			$('<div/>',{
                'class' : 'entry-body',
				'id' : 'entry-body-' + index
            }).appendTo('#entry-'+index);
			
			//Create entry header and sermon video link.
			$('<h5/>',{
                'class' : 'entry-title',
				'html' : '<a href="' + value + '" target="_blank" alt="Link to the sermon for ' + titleArray[index] + '." aria-label="' + titleArray[index] + ' sermon video.">' + titleArray[index] + '</a>'
            }).appendTo('#entry-body-'+index);
			
			//Create entry meta data.
			$('<div/>',{
                'class' : 'entry-meta',
				'id' : 'entry-meta-' + index,
				'html' : '<span>on</span><time class="entry-date" datetime="' + dateArray[index] + '"> ' + ' ' + dateString + ' ' + '</time><span>by</span> ' + ' ' + speakerArray[index]
            }).appendTo('#entry-body-'+index);
			
			/*if (podcastURLArray[index] != ''){
				$('<a/>',{
					'href' : podcastURLArray[index],
					'target' : '_blank',
					'html' : '<img src="/assets/images/spotify_logo.svg" target="_blank" height="20" width="20"> Listen on Spotify'
				}).appendTo('#entry-body-'+index);
			}*/
			//Create Podcast link if the podcast link in the JSON file is not blank.
			if (podcastURLArray[index] != ''){
				$('<a/>',{
					'href' : podcastURLArray[index],
					'target' : '_blank',
					'alt' : titleArray[index] + ' sermon podcast."',
					'aria-label' : titleArray[index] + ' sermon podcast."',
					'html' : '<i class="bi bi-mic-fill"></i> Listen to our Podcast'
				}).appendTo('#entry-body-'+index);
			}
			
			//Create Bible verse URL links.
			if (versesURLArray[index] != '' || versesArray[index] != ''){
				$('<p/>',{
					'html' : '<a href="' + versesURLArray[index] + '" target="_blank" alt="Verses for ' + versesArray[index] + '." aria-label="Verses for ' + versesArray[index] + '."><i class="licon-book2"></i> ' + versesArray[index] + '</a>'
				}).appendTo('#entry-body-'+index);
			}
            
        });
    }
    
	//If the URL matches the URL for the allowed site(s), then the content is created.
    function orginURL (URL){
        if (URL == WWW){
            createContentArea();
			addDropDowns();
        }else{
            //Do Nothing.
        }
    }

    //Gets the content JSON file.
    $.ajaxSetup({ cache: false }); 
    $.getJSON("/assets/js/sermons.json", function (data){
        $.each(data.sermons, function(index, value){
            titleArray.push(value.title);
			sermonSeriesArray.push(value.sermonSeries);
            sermonURLArray.push(value.sermonURL);
			sermonImageArray.push(value.sermonImage);
			podcastURLArray.push(value.podcastURL);
            versesArray.push(value.verses);
            versesURLArray.push(value.versesURL);
            dateArray.push(value.date);
            speakerArray.push(value.speaker);
        });
		$.each(data.listOptions, function(index, value){
            monthOptions.push(value.month);
        });
    });

	//Shows all sermons with no filters.
	function showAll(){
		$('.sermon').show();
	}

	//Shows or hides sermons based on dropdown selections.
	function filter(filterItem){
		$('.sermon').show();
		if (filterItem == ''){
			showAll();
		}else{
			$('.sermon').hide();
			$(filterItem).show();
		}
	}

	//Addes classes to sermon blocks based on the speaker, date, and sermon series based on the JSON file.
	function getThis(This, type){
		var value = $(This).children().children('#' + type).children('select').val().toLowerCase();
		if (value != ''){
			return '.' + value;
		}else{
			return '';
		}
	}

	//Fixes an issue with Safari browsers that breaks the filter function.
	function getThisSafari(value){
		if (value != ''){
			return '.' + value;
		}else{
			return '';
		}
	}
	
	//Reloads the page to clear all dropdown options.
	function reset(){
		/*$.each($('#series>select>option'),function(i,v){v.removeAttr('selected')});
		$('#series>select>option:eq(0)').attr('selected',true);
		$('#series>ul>li:eq(0)').attr('class','mad-active');
		
		$.each($('#speakers>select>option'),function(i,v){v.removeAttr('selected')});
		$('#speakers>select>option:eq(0)').attr('selected',true);
		$('#speakers>ul>li:eq(0)').attr('class','mad-active');
		
		$('#month>select>option:eq(0)').attr('selected',true);
		showAll();*/
		location.reload();
	}

    $(document).ready(function () {
			
		
		
		$('.sort-row').change(function(){
			
			var selectedSeries;
			var selectedSpeaker;
			var selectedMonth;
			var selectedYear;
			var search;
			
			if(navigator.vendor == "Apple Computer, Inc."){
							
				//Fixes an issue with Safari browsers that does not setup the classes correctly.
				var series = $("#series ul li.mad-active").attr("data-value");
				var speaker = $("#speakers ul li.mad-active").attr("data-value");
				var month = $("#month ul li.mad-active").attr("data-value");
				var year = $("#year ul li.mad-active").attr("data-value");
				
				var safariSeries
				var safariSpeaker
				var safariMonth
				var safariYear
				
				safariSeries = "." + series;
				
				safariSpeaker = "." + speaker;
				
				safariMonth = "." + month;
				
				safariYear = "." + year;
				
				if((safariSeries == ".undefined") || (safariSeries == "") || (safariSeries == ".")){safariSeries = '';}
				
				if((safariSpeaker == ".undefined") || (safariSpeaker == "") || (safariSpeaker == ".")){safariSpeaker = '';}
				
				if((safariMonth == ".undefined") || (safariMonth == "") || (safariMonth == ".")){safariMonth = '';}
				
				if((safariYear == ".undefined") || (safariYear == "") || (safariYear == ".")){safariYear = '';}
				
				search = safariSeries.toString().toLowerCase() + safariSpeaker + safariMonth.toString().toLowerCase() + safariYear;
				
				filter(search)
			}else{
				selectedSeries = getThis(this, 'series');
				selectedSpeaker = getThis(this, 'speakers');
				selectedMonth = getThis(this, 'month');
				selectedYear = getThis(this, 'year');
				search = selectedSeries + selectedSpeaker + selectedMonth + selectedYear;
				filter(search);
			}
		})
		
		//Waits 750 milliseconds and the loads JSON file and content.
        setTimeout(function(){
            orginURL(URL);
        }, 750);
    });