// On-view-load initialization
function init() {
   
    $("#search").click(search);
	//$(".image-button").click(expand);
    gadgets.window.adjustHeight();
   
}
$("li.image-button").live('click', function () {
      var curRowId = $(this).attr("id");
	expand(curRowId);
    });
 function monthConvert(d){

  var outMonth="";
    switch (d) {
        case '01':
    outMonth= "Jan";
    break;
  case '02':
   outMonth= "Feb";
    break;
  case '03':
    outMonth= "Mar";
    break;
  case '04':
    outMonth= "Apr";
break;
case '05':
    outMonth= "May";
    break;
  case '06':
    outMonth= "Jun";
    break;
  case '07':
    outMonth= "Jul";
    break;
  case '08':
    outMonth= "Aug";
break;
case '09':
    outMonth= "Sep";
    break;
  case '10':
    outMonth= "Oct";
    break;
  case '11':
    outMonth= "Nov";
    break;
  case '12':
    outMonth= "Dec";
break;
}
return outMonth;
}
function expand(id){

	 $(".content").html("");
	$('.firstdiv').css('background-color', '#FFFFFF');
	$('#div_'+id).css('background-color', '#F2F2F2');
	console.log("Expand Row Id::: "+ id);
	var discussionMessage="";
	var correctanswer="";
	var helfulanswer="";
	var rootmessage="";
	var myDate="";
	
	var request = osapi.jive.core.discussions.get({id: id});
	request.execute(function(response) { 
		console.log("Expanding discussion response is " + JSON.stringify(response.data));
		var discussionresult=response.data;
		
		if (response.error) {
			console.log("Error in get: "+response.error.message);
		}
		else{
			
			
				console.log("I'm inside Root Message Div");
				rootmessage +='<div>';
				rootmessage +='<ul>';
				rootmessage +='<li ><a href="'+discussionresult.messages.root.html.ref+'" target="_apps">'+discussionresult.messages.root.subject+'</a></li>';
				rootmessage +='<font size="2" color="black">';                                    
                rootmessage +='<ul>';                   
                rootmessage +='<div class="align">'+discussionresult.messages.root.content.text+'</div>';                  
                rootmessage +='</ul>';
                rootmessage +='</font>';
				rootmessage +='</ul>';
				rootmessage +='</div>';
			
			
			var request = response.data.messages.get( ) ;
			request.execute(function(response) {
			var result = response.data;
				if(!response.error) {
					
					 $.each(result, function(index, row) {
							console.log("Expanding discussion container response is " + JSON.stringify(response.data));
							var count=0;
							if(row.answer){
									myDate=row.creationDate.substr(0,10);                  
									myDate=myDate.split("-"); 
									dateM=myDate[1];
									var finalMonth=monthConvert(dateM);
									var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
									console.log("I'm inside expand if");
									correctanswer +='<div>';
									correctanswer +='<ul>';
									correctanswer +='<li><span style="color:Green;font-weight:bold">Correct Answer</span> </li>';
									correctanswer +='<li><img src="'+ row.author.avatarURL + '" width=\'25px\' height=\'25px\' border=\'0\'/> by&nbsp;';
									correctanswer +='<a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+row.author.username+'>'+row.author.name+'</a>';
									correctanswer +='&nbsp;on&nbsp; ' + newDate+ '</li>';
									correctanswer +='<li>'+row.content.text+ '</li>';
									correctanswer +='</ul>';
									correctanswer +='</div>';
									
									
								}
							if(row.helpful){
									myDate=row.creationDate.substr(0,10);                  
									myDate=myDate.split("-"); 
									dateM=myDate[1];
									var finalMonth=monthConvert(dateM);
									var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
									console.log("I'm inside expand if");
									helfulanswer +='<div>';
									helfulanswer +='<ul>';
									helfulanswer +='<li><span style="color:#FFBF00;font-weight:bold">Helpful Answer </span> </li>';
									helfulanswer +='<li><img src="'+ row.author.avatarURL + '" width=\'25px\' height=\'25px\' border=\'0\'/> by &nbsp;';
									helfulanswer +='<a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+row.author.username+'>'+row.author.name+'</a>';
									helfulanswer +='&nbsp;on&nbsp; '+ newDate + '</li>';
									helfulanswer +='<li>'+row.content.text+ '</li>';
									helfulanswer +='</ul>';
									helfulanswer +='</div>';
									
									
								}
																
								
					
					});
					discussionMessage +=rootmessage;
					discussionMessage +=correctanswer;
					discussionMessage +=helfulanswer;
					console.log("Html Content:: "+discussionMessage);
								$(".content").show();
								$(".content").html(discussionMessage);
				
				}
			
			
			});
		
		}
	
	
	});
	
	

}
// Perform a search and display the results
function search() {
    
    $("search-results").html("");
    gadgets.window.adjustHeight();
   /* var types = [];
    $("input:checked").each(function() {
        types.push(this.id);
    });*/
    var params = {
        //limit : $("#limit").val(),
        query : $("#query").val(),
        //sort : $("#sort-type").val(),
       // sortOrder : $("#sort-order").val()
        
        
    };

   
   /* if (types.length > 0) {
        params.type = types;
    }*/
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
            var html = "";
			var blog="";
			var discussion="";
			var update="";
			var document="";
			var post="";
			
            var rows = response.data;
            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var avatar="";
            var createdDate="";           
            var replyCount="";
            var likeCount="";
            var type="";
            var username="";
            var myDate="";
           // var str="";

            
            
            $.each(rows, function(index, row) {
            	url=row.resources.html.ref;
				subject=row.subject;
               	contentSummary=row.contentSummary;
                author=row.author.name;
                createdDate=row.creationDate;                   
                likeCount=row.likeCount;
                replyCount=row.replyCount;
                type=row.type;
                avatar=row.author.avatarURL;
                username=row.author.username;
                myDate=row.modificationDate.substr(0,10);                  
                myDate=myDate.split("-"); 
                dateM=myDate[1];
				var finalMonth=monthConvert(dateM);
				var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 


               if(row.type=="discussion")
               	{
					var discussionID = (url.substring(url.lastIndexOf("/"))).substr(1);
               	     // discussion +='<table border="1">';             
                    discussion +='<div id="div_'+discussionID+'" class="firstdiv">';
                    //discussion +='<p line-height:70%>';
                   // discussion +='<ol>';
					discussion +='<ul>';
                    discussion +='<li class="discussion"><a href="'+url+'" target="_apps">'+subject+'</a></li>';
                    discussion +='<li class="image-button" id="'+discussionID+'" ></li>';
                    //discussion +=<button type="button" style="float: right;" <a href="'+url+'"target="_apps">Expand</a></button></li>';
                    discussion +='</ul>';  
                    
                    discussion +='<font size="2" color="grey">';               
                    discussion +='<ul>';                   
                    //discussion +='<li>&nbsp;</li>';
                    //  discussion +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/>
                    discussion +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    //console.log("Author: "+author);                   
                    discussion +='</ul>';
                    discussion +='</font>';
                    
                    discussion +='<font size="2" color="black">';                                    
                    discussion +='<ul>';                   
                    discussion +='<div class="align">'+contentSummary+'</div>';                  
                    discussion +='</ul>';
                    discussion +='</font>';
                    
                    discussion +='<font size="2" color="grey">';                                 
                    discussion +='<ul>';                    
                   // discussion +='<li>Created:'+createdDate+'</li>';
                    discussion +='<li>Date:'+newDate+'</li>';                    
                    discussion +='Replies:'+replyCount+'';                  
                    discussion +='<li>Likes:'+likeCount+'</li>';                        
                    discussion +='</ul>';
                    discussion +='</font>';
                     // discussion +='</ol>';
                    //discussion +='</p>';
                    
                   // discussion +='</table>';
                         
                   discussion +='<hr size="1" color="lightgrey">';
				   discussion +='</div>';
                  // discussion +='<br>';
                                     
               }
               
			  if(row.type=="document")
               {
				var docID = (url.substring(url.lastIndexOf("-"))).substr(1);
                     document +='<div>';
		    document +='<ul>';
                    document +='<li class="document" ><a href="'+url+'" target="_apps">'+subject+'</a></li>';
					 document +='<li class="image-button" id="'+docID+'" ></li>';
                    document +='</ul>';
                    
                    document +='<font size="2" color="grey">';
                    document +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                    //document +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/>
                    document +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    document +='</ul>';
                    document +='</font>';
                    
                    document +='<font size="2" color="black">';     
                    document +='<ul>';                    
                    document +='<div class="align">'+contentSummary+'</div>';                   
                    document +='</ul>';
                    document +='</font>';     
                     
                    document +='<font size="2" color="grey">';
                    document +='<ul>';                                       
                   // document +='<li>Created:'+createdDate+'</li>';
                    document +='<li>Date:'+newDate+'</li>';                  
                    document +='Replies:'+replyCount+'';                  
                    document +='<li>Likes:'+likeCount+'</li>';              
                    document +='</ul>';                    
                    document +='</font>';
                    document +='</div>';
                    document +='<hr size="1" color="lightgrey">';   
                   // document +='<br>';
                  
                  
               }
			   if(row.type=="update")
               {
                     update +='<div>';
                     update +='<ul>';
                     update +='<li class="update" ><a href="'+url+'" target="_apps">'+contentSummary+'</a></li>';
                     update +='</ul>';
                    
                     update +='<font size="2" color="grey">';
                     update +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                     //update +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     update +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     update +='</ul>';
                     update +='</font>';
                     
                     update +='<font size="2" color="black">';     
                     update +='<ul>';                   
                     update +='<div class="align">'+contentSummary+'</div>';  
                     update +='</ul>';
                     update +='</font>';     
                   
                     update +='<font size="2" color="grey">';
                     update +='<ul>';                                       
                     //update +='<li>Created:'+createdDate+'</li>';
                     update +='<li>Date:'+newDate+'</li>';                 
                     update +='Replies:'+replyCount+'';                  
                     update +='<li>Likes:'+likeCount+'</li>';              
                     update +='</ul>';
                     update +='</font>';
                     update +='</div>';   
                     update +='<hr size="1" color="lightgrey">'; 
                     //update +='<br>';
                                    
                }
                
	            if(row.type=="post")
               {
                     post +='<div>';
	             post +='<ul>';
                     post +='<li class="post" ><a href="'+url+'" target="_apps">'+subject+'</a></li>';
                     post +='</ul>';
                    
                     post +='<font size="2" color="grey">';
                     post +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                    // post +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     post +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     post +='</ul>';
                     post +='</font>';
                     
                    // post +='<div align=left>';
                     post +='<font size="2" color="black">';  
                     post +='<ul>';  
                     post +='<div class="align">'+contentSummary+'</div>';  
                     post +='</ul>';
                     post +='</font>';  
                    // post +='</div>';
                   
                     post +='<font size="2" color="grey">';
                     post +='<ul>';                                       
                     //post +='<li>Created:'+createdDate+'</li>';
                     post +='<li>Date:'+newDate+'</li>';                  
                     post +='Replies:'+replyCount+'';                  
                     post +='<li>Likes:'+likeCount+'</li>';              
                     post +='</ul>';
                     post +='</font>';
                     post +='</div>';                
                     post +='<hr size="1" color="lightgrey">'; 
                   //  post +='<br>';
               }
                                  
            });
                       
                        html +=discussion;
			html +=document;
			html +=update;
			html +=post;
				
            console.log(html);
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
