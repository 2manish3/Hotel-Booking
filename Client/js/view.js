/**
 * Created by Manish on 04-08-2014.
 */


var createStructure = function (hotelData) {
    var init = function (hotelData) {
			opt = {callback: pageselectCallback};
			opt.items_per_page = 30;
			opt.num_display_entries = 5;
			opt.num_edge_entries = 5;
			$("#Pagination").pagination(hotelData.total, opt);         
        },
		buildUi = function(data){
			var container, hotelCtr, poster, h3, h5,p1,p2,p3,p4,p5,details,moreDetails, reqData = data.Establishments;
			if (data) {
                container = document.getElementById("parentCtr");
                for (var i = 0, j = 0; i < reqData.length; i++){
                    hotelCtr = document.createElement("div");
                    hotelCtr.className = "mainCtr";
                    poster = document.createElement("img");
                    poster.src = reqData[i].ImageUrl;

                    hotelCtr.appendChild(poster);

                    h3 = document.createElement("h3");
                    h3.innerHTML = reqData[i].Name+" <span class='rating star-"+reqData[i].Stars+"'></span>";
                    hotelCtr.appendChild(h3);

                    h5 = document.createElement("h5");
                    h5.innerHTML = reqData[i].Location;
                    hotelCtr.appendChild(h5);

                    details = document.createElement("div");
                    details.className = "details";
                    pr = document.createElement("p");
                    pr.innerHTML = "User Rating: "+ reqData[i].UserRating;
                    details.appendChild(pr)

                    p2 = document.createElement("p");
                    p2.innerHTML = "₹ "+ reqData[i].MinCost;
                    details.appendChild(p2);

                    p3 = document.createElement("p");
                    p3.innerHTML = "per Night";
                    details.appendChild(p3);
                    hotelCtr.appendChild(details);


                    moreDetails = document.createElement("div");

                    p4 = document.createElement("p");
                    p4.innerHTML = "Distance from International Airport <span id='distance'>"+ parseInt(reqData[i].Distance)+" Km</span>";
                    moreDetails.appendChild(p4);

                    p5 = document.createElement("p");
                    p5.innerHTML = "Trp Rating: <span id='trp'>"+ parseInt(reqData[i].TrpRating)+"</span>";
                    moreDetails.appendChild(p5);

                    hotelCtr.appendChild(moreDetails);
                    container.appendChild(hotelCtr);
                }
            }
		},
        refresh = function(Data){
            counter = 0;
            removeCntr = 0;
            $("#parentCtr").empty();			
            buildUi(Data);
			callServerFlg = false;
        },
		pageselectCallback = function(page_index, jq){
			if(callServerFlg)
				return;
			start = 0 + 30*page_index, end = start + 30;
			var url = "http://localhost:8085/api/hotels?sortBy="+sortparam+"&paging="+start+"|"+end;
			dataMgr.makeServerRequest(url,undefined, undefined, undefined, undefined, function(data){
				refresh(data);
			})
			return false;
		},sortparam = "Stars",start,end, opt, callServerFlg = false;

    $(".nav a").on("click",function(){
        //alert(this.value);
		var url;
		sortparam = this.getAttribute("value");
		if(this.sortFlg){
			this.sortFlg = false;
			url = "http://localhost:8085/api/hotels?sortBy="+sortparam+"&paging="+start+"|"+end;
		}else{
			this.sortFlg = true;
			url = "http://localhost:8085/api/hotels?sortBy=-"+sortparam+"&paging="+start+"|"+end;
		}
		$( this ).parent().parent().find( 'li.active-sort' ).removeClass( 'active-sort' );
        $( this ).parent().addClass( 'active-sort' );
        dataMgr.makeServerRequest(url,undefined, undefined, undefined, undefined, function(data){
            refresh(data);
        });
    });
	$("#collapseTwo input").on("click",function(){
        //alert(this.value);
		start=0, end=30;
        var url = "http://localhost:8085/api/hotels?sortBy="+this.value+"&paging="+start+"|"+end+"&filterBy=Stars|"+this.value;
        dataMgr.makeServerRequest(url,undefined, undefined, undefined, undefined, function(data){
			callServerFlg = true;
			$("#Pagination").pagination(data.total, opt);
            refresh(data);
        });
    });
	$("#resetAll").on("click",function(){
		start = 0 , end = 30;
		$("#nameFlte").val("");
		$("#collapseTwo input").removeAttr('checked');
		var url = "http://localhost:8085/api/hotels?sortBy="+sortparam+"&paging="+start+"|"+end;
		dataMgr.makeServerRequest(url,undefined, undefined, undefined, undefined, function(data){
			callServerFlg = true;
			$("#Pagination").pagination(data.total, opt);
			refresh(data);
		});
    });
	$("#searchBtn").on("click",function(){
		start=0, end=30;
		var url = "http://localhost:8085/api/hotels?sortBy="+sortparam+"&paging="+start+"|"+end+"&filterBy=Name|"+$("#nameFlte").val();
        dataMgr.makeServerRequest(url,undefined, undefined, undefined, undefined, function(data){
			callServerFlg = true;
			$("#Pagination").pagination(data.total, opt);
            refresh(data);
        });
	});
	$(document).ready(function(){
		// Create pagination element with options from form
		
	});
   $('#ex1').slider({
        formater: function(value) {
            return 'Current value: ' + value;
        }
    });
    init(hotelData);
}
