sap.ui.define(["sap/ui/core/UIComponent"],

    function(UIComponent){
        return UIComponent.extend("arvind.pp.penelope.matchange.Component",{
    
            metadata:{
                manifest: "json"
             },
             init:function(){
                UIComponent.prototype.init.apply(this);
                 var oRouter = this.getRouter();
                 oRouter.initialize();
            },
    
            // createContent:function(){
    
            //     var oAppView = new sap.ui.view(
            //         {
            //             id: "idAppView",
            //             viewName: "arvind.test.1.view.App",
            //             type: "XML"
                        
    
            //         }
            //     );
                
            //     var oView1 = new sap.ui.view(
            //         {
            //             id:"idView1",
            //             viewName:"arvind.test.1.view.View1",
            //             type:"XML"
                        
    
            //         });
            //         var oView2 = new sap.ui.view(
            //             {
            //                 id:"idView2",
            //                 viewName:"arvind.test.1.view.View2",
            //                 type:"XML"
                            
    
            //             }
            //     );
            //     var oEmpty = new sap.ui.view(
            //         {
            //             id:"idView3",
            //             viewName:"arvind.test.1.view.empty",
            //             type:"XML"
                        
    
            //         }
            // );
            //     var oAppcon = oAppView.byId("idAppCon");
            //     oAppcon.addMasterPage(oView1);
            //     oAppcon.addDetailPage(oEmpty).addDetailPage(oView2);
            //     return oAppView;
    
            // },
            destroy:function(){
                UIComponent.prototype.destroy.apply(this, arguments);
            },
          
            
    
        });
    
    }
    
    );