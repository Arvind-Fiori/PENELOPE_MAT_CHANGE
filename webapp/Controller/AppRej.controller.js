sap.ui.define(
    ["arvind/pp/penelope/matchange/Controller/baseController",
        "sap/ui/core/Fragment",
         "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "arvind/pp/penelope/matchange/Controller/oDataCall"
    ],
    function(baseController , Fragment, Filter , FilterOp , oDataCall){
        return baseController.extend("arvind.pp.penelope.matchange.Controller.AppRej",{
            onInit() {

                //oPage = this.getView().byId("idPage");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("init").attachMatched(this.RHM, this);
            },
            oLocalModel: "",
            oModel : "",
            RHM: function (oEvent) {
                debugger;
                const oFilter = [];
                var that = this;
                var sUId = oEvent.getParameter("arguments").UID;
               
                var oUID = new sap.ui.model.Filter("ZuniqueId", "EQ", sUId);
                 oFilter.push(oUID);
                
                oModel = this.getOwnerComponent().getModel();               
                var oJson = new sap.ui.model.json.JSONModel();
                debugger;

                // oModel.read("/MaterialChangeLogSet", {
                    
                //     success: function (responce) {


                //         oJson.setData(responce.results);
                //         // oJson_creditlimit = oJson;

                //         //    this.getView().setModel(oJson, "CreditLimit");
                //         that.oLocalModel = oJson;
                //         this.getView().setModel(that.oLocalModel, "MaterialChangeLog");
                //         //    this.getView().byId("supplyTable").setModel(oJson,"CreditLimit");
                //         //  this.getView().byId("supplyTable").setModel(that.oLocalModel,"CreditLimit");
                //     }.bind(this),
                //     error: function () {

                        
                //     }

                // });
               
                var EntitySet = '/MaterialChangeLogSet';
                oDataCall.callGetOdata(oModel , oFilter , EntitySet )
                .then(function (responce) {
                    
                    oJson.setData(responce.results);
                    // oJson_creditlimit = oJson;

                    //    this.getView().setModel(oJson, "CreditLimit");
                    that.oLocalModel = oJson;
                    that.getView().setModel(that.oLocalModel, "MaterialChangeLog");
                    debugger;
                    //if ( oJson.getData()[1].ZtableName == "ZPP_WP1" ) 
                    //     or ( oJson.getData()[1].ZtableName == "ZPP_WP2" ) 
                    // or ( oJson.getData()[1].ZtableName == "ZPP_WP3" ) 
                   // {
                        //  that.getView().byId("MatChangeData").getColumns()[1].getHeader().setText("ZPP_WP1");
                   // }
                })
                .catch(function (Error, sPath) {
                    debugger;
                    MessageBox.error("Error in Processing");
                    
                });
                
                // this.getView().byId("MatChangeData").getText("satyen");
              //  this.getView().byId("MatChangeData").getColumns()[1].getHeader().setText("satyen");

           },
            onBack: function () {

                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("init");

            },
            onDetailPress: function (oEvent) {
                debugger;
              
                const oRouter = this.getOwnerComponent().getRouter();
                var vReqno = oEvent.getSource().getBindingContext("MaterialChangeLog").getObject().ZrequestNo;
                var vsubReqNo = oEvent.getSource().getBindingContext("MaterialChangeLog").getObject().ZsubSerialNo;
                var vTabName = oEvent.getSource().getBindingContext("MaterialChangeLog").getObject().ZtableName;
               
                var vFabName = oEvent.getSource().getBindingContext("MaterialChangeLog").getObject().ZwFn;
                oRouter.navTo("Detail",{
                    //  oRouter.navTo("Detail",{fId : sIndex});
                    ReqNO:vReqno,
                    SubReq:vsubReqNo ,
                    TabName:vTabName,
                    FabName:vFabName
                
                });



            },                




        }
    );
});