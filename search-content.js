// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}
 /* function getISOStrict(date) {
   
   if (Date.prototype.toISOString) {
        return date.toISOString().replace(/Z$/, "+0000");
    }

    function pad(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    }

    return date.getUTCDate();
       + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCFullYear() );
        + 'T' + pad( date.getUTCHours() )
       + ':' + pad( date.getUTCMinutes() )
       + ':' + pad( date.getUTCSeconds() )
       + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
       + '+0000'; 
} */

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
            var modifiedDate="";
            var creationDate="";
            var replyCount="";
            var likeCount="";
            var type="";
            var username="";
            
            
            $.each(rows, function(index, row) {   
					url=row.resources.html.ref;
                    subject=row.subject;
                    contentSummary=row.contentSummary;
                    author=row.author.name;
                    modifiedDate=row.modificationDate;
                    creationDate=row.creationDate;
                    likeCount=row.likeCount;
                    replyCount=row.replyCount;
                    type=row.type;
                    avatar=row.author.avatarURL;
                    username=row.author.username;
               
			   if(row.type=="discussion")
               {
                     
		    discussion +='<ul>';
                    discussion +='<li class="discussion" ><a href="'+url+'">'+subject+'</a></li>';
                    discussion +='</ul>';
                    
                    discussion +='<h5>';
                    discussion +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                    discussion +='<li>created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    discussion +='</ul>';
                   
                    discussion +='<ul>';
                    discussion +='<b>';
                    discussion +='<li>'+contentSummary+'</li>';
                    discussion +='</b>';
                    discussion +='</ul>';
                   
                    discussion +='<ul>';                                       
                    discussion +='<li>created:'+creationDate+'</li>';
                    discussion +='<li>Last Modified:'+modifiedDate+'</li>';                
                    discussion +='<li>Replies:'+replyCount+'</li>';                  
                    discussion +='<li>Likes:'+likeCount+'</li>';              
                    discussion +='</ul>';
                    
                    discussion +='</h5>';
                    discussion +='<hr>';                   
                  
               }
               
			  if(row.type=="document")
               {
                     
		     document +='<ul>';
                    document +='<li class="document" ><a href="'+url+'">'+subject+'</a></li>';
                    document +='</ul>';
                    
                    document +='<h5>';
                    document +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                    document +='<li>created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    document +='</ul>';
                   
                    document +='<ul>';
                    document +='<b>';
                    document +='<li>'+contentSummary+'</li>';
                    document +='</b>';
                    document +='</ul>';
                   
                    document +='<ul>';                                       
                    document +='<li>created:'+creationDate+'</li>';
                    document +='<li>Last Modified:'+modifiedDate+'</li>';                
                    document +='<li>Replies:'+replyCount+'</li>';                  
                    document +='<li>Likes:'+likeCount+'</li>';              
                    document +='</ul>';
                    
                   document +='</h5>';
                   document +='<hr>';                   
                  
                  
               }
			   if(row.type=="update")
               {
                     update +='<ul>';
                     update +='<li class="update" ><a href="'+url+'">'+subject+'</a></li>';
                     update +='</ul>';
                    
                     update +='<h5>';
                     update +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                     update +='<li>created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     update +='</ul>';
                   
                     update +='<ul>';
                     update +='<b>';
                     update +='<li>'+contentSummary+'</li>';
                     update +='</b>';
                     update +='</ul>';
                   
                     update +='<ul>';                                       
                     update +='<li>created:'+creationDate+'</li>';
                     update +='<li>Last Modified:'+modifiedDate+'</li>';                
                     update +='<li>Replies:'+replyCount+'</li>';                  
                     update +='<li>Likes:'+likeCount+'</li>';              
                     update +='</ul>';
                    
                     update +='</h5>';
                     update +='<hr>';                   
                  
                  
               }
			   if(row.type=="post")
               {
                     
				post +='<ul>';
                     post +='<li class="post" ><a href="'+url+'">'+subject+'</a></li>';
                     post +='</ul>';
                    
                     post +='<h5>';
                     post +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                     post +='<li>created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     post +='</ul>';
                   
                     post +='<ul>';
                     post +='<b>';
                     post +='<li>'+contentSummary+'</li>';
                     post +='</b>';
                     post +='</ul>';
                   
                     post +='<ul>';                                       
                     post +='<li>created:'+creationDate+'</li>';
                     post +='<li>Last Modified:'+modifiedDate+'</li>';                
                     post +='<li>Replies:'+replyCount+'</li>';                  
                     post +='<li>Likes:'+likeCount+'</li>';              
                     post +='</ul>';
                    
                     post +='</h5>';
                     post +='<hr>';                   
                  
                  
               }
            });
            
            
                        html +=discussion;
			html +="<br>"+document;
			html +="<br>"+update;
			html +="<br>"+post;
			html +="<br>"+blog;
			
            console.log(html);
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
