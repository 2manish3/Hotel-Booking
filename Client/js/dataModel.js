/**
 * Created by Manish on 04-08-2014.
 */
var dataManager = function () {
    var data1,
        init = function () {
            $.ajax({
                url:"http://localhost:8085/api/hotels?sortBy=Name",
                success:function(result){
                    if (typeof result ==  "object") {
                        new createStructure(result);
                    } else {
                        data1 = jQuery.parseJSON(result);
                        new createStructure(data1);
                    }
                }
            });
        };
    init();
    this.getData = function () {
        return data1;
    };
    this.makeServerRequest  = function(url, requestMethod, data, dataType, syncAsync, callBack){
        $.ajax({
            url:url,
//            type: requestMethod,
//            data: data ? data : null,
//            async: syncAsync ? syncAsync : true,
//            dataType: dataType ? dataType : "jsonp",
            success:function(result){
                callBack.call(this, result);
            }
        });
    };
}



