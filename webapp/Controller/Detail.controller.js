sap.ui.define(
    ["arvind/pp/penelope/matchange/Controller/baseController",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "arvind/pp/penelope/matchange/Controller/oDataCall",
        "sap/ui/core/routing/History",
          "sap/m/MessageBox",
        "sap/m/MessageToast"

        ],
    function (baseController, Fragment, Filter, FilterOp, oDataCall , History, MessageBox, MessageToast) {
        return baseController.extend("arvind.pp.penelope.matchange.Controller.AppRej", {
            onInit() {

                //oPage = this.getView().byId("idPage");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("Detail").attachMatched(this.RHM, this);
            },
            oLocalModel: "",
            sTabName:"",
            sDMSFlag:"",
            sDMSFile:"",
            RHM: function (oEvent) {
                debugger;
                const oFilter = [];
                var sReqNo = oEvent.getParameter("arguments").ReqNO;
                var sSubReqNo = oEvent.getParameter("arguments").SubReq;
                 sTabName = oEvent.getParameter("arguments").TabName;
                 sDMSFile = oEvent.getParameter("arguments").FabName;
                if (sTabName == 'ZPP_WP2') {
                    this.getView().byId("Detail_WP3").setVisible(false);
                    this.getView().byId("Detail_WP2").setVisible(true);
                    this.getView().byId("Detail_Other").setVisible(false);

                }
                else if (sTabName == 'ZPP_WP3') {
                    this.getView().byId("Detail_WP2").setVisible(false);
                    this.getView().byId("Detail_WP3").setVisible(true);
                    this.getView().byId("Detail_Other").setVisible(false);
                }
                else {
                    this.getView().byId("Detail_WP2").setVisible(false);
                    this.getView().byId("Detail_WP3").setVisible(false);
                    this.getView().byId("Detail_Other").setVisible(true);

                }


                var oFReqNo = new sap.ui.model.Filter("ZrequestNo", "EQ", sReqNo);
                oFilter.push(oFReqNo);
                var oFSubReqNo = new sap.ui.model.Filter("ZsubSerialNo", "EQ", sSubReqNo);
                oFilter.push(oFSubReqNo);


                var that = this;
                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();
                // if (sTabName == 'ZPP_WP2') or (sTabName == 'ZPP_WP3')
                // {    
                var ent = 'A';
                if ( sTabName == 'ZPP_WP2' || sTabName == 'ZPP_WP3')
                {
                    ent = 'A';
                }else
                {
                    ent = 'B';

                }
                  
                
               
                // if (sTabName != 'ZPP_WP1' || sTabName == 'ZPP_K_K10' || sTabName == 'ZPP_K_K5') 

                // if (sTabName == 'ZPP_WP1' || sTabName == 'ZPP_K_K10' || sTabName == 'ZPP_K_K5') 
                          
            //   if (sTabName == 'ZPP_K_K10') 
            //                 {
            //                     ent = 'B';
            
            //                 }       
            //     if (sTabName == 'ZPP_K_K5')
            //                 {
            //                     ent = 'B';
            
            //                 }       
                if (ent == 'A')
                   
                    {
                        var oBusy = new sap.m.BusyDialog({
                            title : "Updating Data",
                            text : "Please Wait...."
        
                        });

                        oBusy.open();
                        var EntitySet = '/ZDetil_WP2Set';
                    oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                        .then(function (responce) {
                            oBusy.close();
                            debugger;
                            oJson.setData(responce.results);
                            // oJson_creditlimit = oJson;

                            //    this.getView().setModel(oJson, "CreditLimit");
                            that.oLocalModel = oJson;
                            that.getView().setModel(that.oLocalModel, "Detail");
                            debugger;

                        })
                        .catch(function (Error, sPath) {
                            oBusy.close();
                            debugger;
                            MessageBox.error(Error.responseText.split("MSG:")[1]);

                        });

                }
                if (ent == 'B')
                {
                  
                    var EntitySet = '/ZDetailOtherSet';
                    oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                    .then(function (responce) {
                        debugger;
                        oJson.setData(responce.results);
                        // oJson_creditlimit = oJson;

                        //    this.getView().setModel(oJson, "CreditLimit");
                        that.oLocalModel = oJson;
                        that.getView().setModel(that.oLocalModel, "Detail");
                        debugger;

                    })
                    .catch(function (Error, sPath) {
                        debugger;
                        // MessageBox.error("Error in Processing");
                        MessageToast.show(Error.responseText.split("MSG:")[1]);
                        // MessageBox.error(Error.responseText.split("MSG:")[1]);

                    });
                }
                debugger;
                // var oTable = this.getView().byId("Detail_WP3");
	            // var aSticky = oTable.getSticky();     
                // //  || [];
                //  aSticky.push("ColumnHeaders");
                // oTable.setSticky(aSticky);
                // this.getView().byId("Detail_WP2").setVisible(false);
            },
            onDmsImage:function(oEvent){
                debugger;
                sDMSFlag = "";
                if (sTabName == 'ZPP_WP1') {
                    sDMSFlag = "X";
                }
                else if (sTabName == 'ZPP_WP2') {
                    sDMSFlag = "X";
                }
                else if (sTabName == 'ZPP_WP3') {
                    sDMSFlag = "X";
                }

                if (sDMSFlag = "X")
                {

                    const oRouter = this.getOwnerComponent().getRouter();
                   oRouter.navTo("DMS",{
                  
                        FabName:sDMSFile,
                      
                    });                        
                }

            },
            onBack: function () {

                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("init", {}, true);
                }
            },





        }
        );
    });