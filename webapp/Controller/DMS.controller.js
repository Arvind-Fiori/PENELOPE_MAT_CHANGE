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
    function (baseController, Fragment, Filter, FilterOp, oDataCall , History , MessageBox, MessageToast) {
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
               
                
                var sPathStart = "/sap/opu/odata/sap/ZPP_PENELOPE_MATCHANGE_SRV/ZMatImageSet('";
                var sPathEnd = "')/$value";
                var EntitySet = sPathStart+sDMSFile+sPathEnd;
                        // var EntitySet = "/sap/opu/odata/sap/ZPP_PENELOPE_MATCHANGE_SRV/ZMatImageSet('3010209906-2')/$value";
                    
                        this.getView().byId("DMS").setSrc(EntitySet);
                        // this.getView().byId("idNotFound").setVisible(false);
                        // this.getView().byId("DMS").setAlt("satyen");
                 
                  
            },
   
            onError:function(oEvent)
            {
                debugger;
                // this.getView().byId("idNotFound").setVisible(true);
                MessageBox.error('Image Not Found');
                this.onBack();
               
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