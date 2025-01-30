sap.ui.define(
    [], function(){
     return{
        callGetOdata:function(oModel , oFilter, EntitySet )
        {
            return new Promise(function(resolve,reject){
                debugger;
                // oModel.read("/MaterialChangeLogSet",  {
                    oModel.read(EntitySet,  {
                    filters: [oFilter],       
                    success: function (Request) {
                      debugger;
                        resolve(Request);
                       
                    },
                    error: function (Error ) {
                        debugger;
                        reject(Error);
                        
                    }

                }) 
                
            })

        }
     }   
    });