// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}

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
               	     // discussion +='<table border="1">';             
                    discussion +='<div>';
                    //discussion +='<p line-height:70%>';
                   // discussion +='<ol>';
		    discussion +='<ul>';
                    discussion +='<li class="discussion"><a href="'+url+'"target="_apps">'+subject+'</a></li>';
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
                    discussion +='</div>';
                   // discussion +='</table>';
                         
                   discussion +='<hr size="1" color="lightgrey">';
                  // discussion +='<br>';
                                     
               }
               
			  if(row.type=="document")
               {
                     document +='<div>';
		    document +='<ul>';
                    document +='<li class="document" ><a href="'+url+'" target="_apps">'+subject+'</a></li>';
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
