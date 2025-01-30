sap.ui.define(
    ["arvind/pp/penelope/matchange/Controller/baseController",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "arvind/pp/penelope/matchange/Controller/oDataCall",
        "sap/ui/core/routing/History"
        ],
    function (baseController, Fragment, Filter, FilterOp, oDataCall , History) {
        return baseController.extend("arvind.pp.penelope.matchange.Controller.AppRej", {
            onInit() {

                //oPage = this.getView().byId("idPage");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("DMS").attachMatched(this.RHM, this);
            },
            oLocalModel: "",
            sTabName:"",
            sDMSFlag:"",
            RHM: function (oEvent) {
                debugger;
                const oFilter = [];
                var sDMSFile = oEvent.getParameter("arguments").FabName;
               
                var oFDMSFile = new sap.ui.model.Filter("WFn", "EQ", sDMSFile);
                // oFilter.push(oFDMSFile);
              


                var that = this;
                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();
                // if (sTabName == 'ZPP_WP2') or (sTabName == 'ZPP_WP3')
                // {    
               
                
                
               
                        var EntitySet = "/sap/opu/odata/sap/ZPP_PENELOPE_MATCHANGE_SRV/ZMatImageSet('3010209906-2')/$value";
                 this.getView().byId("DMS").setSrc(EntitySet);
                    // oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                    //     .then(function (responce) {
                    //         debugger;
                    //         oJson.setData(responce.results);
                    //         // oJson_creditlimit = oJson;

                    //         //    this.getView().setModel(oJson, "CreditLimit");
                    //         that.oLocalModel = oJson;
                    //         that.getView().setModel(that.oLocalModel, "DMS");
                    //         debugger;

                    //     })
                    //     .catch(function (Error, sPath) {
                    //         debugger;
                    //         MessageBox.error("Error in Processing");

                    //     });
 
               

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