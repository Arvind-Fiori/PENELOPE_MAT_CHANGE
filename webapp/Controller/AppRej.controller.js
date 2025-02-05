sap.ui.define(
    ["arvind/pp/penelope/matchange/Controller/baseController",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "arvind/pp/penelope/matchange/Controller/oDataCall",
        "sap/m/MessageBox",
        "sap/m/MessageToast"
    ],
    function (baseController, Fragment, Filter, FilterOp, oDataCall, MessageBox, MessageToast) {
        return baseController.extend("arvind.pp.penelope.matchange.Controller.AppRej", {
            onInit() {

                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("init").attachMatched(this.RHM, this);
            },
            oLocalModel: "",
            oModel: "",
          
            upindex: "",
            RHM: function (oEvent) {
                debugger;
                // sap.ui.core.Core().byId("idPage").addTitle("HELLO");
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
                var oBusy = new sap.m.BusyDialog({
                    title: "Loading Data",
                    text: "Please Wait...."

                });
                oBusy.open();
                oDataCall.callGetOdata(oModel, oFilter, EntitySet)
                    .then(function (responce) {

                        oJson.setData(responce.results);
                        oBusy.close();
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
                        oBusy.close();
                        MessageBox.error("Error in Processing");

                    });

                // this.getView().byId("MatChangeData").getText("satyen");
                //  this.getView().byId("MatChangeData").getColumns()[1].getHeader().setText("satyen");

            },
            onSelectionChange: function (oEvent) {
                debugger;
                var sSelected = "";
                var sSelectedMessage = "";
                var oTableData = this.getView().byId("MatChangeData").getModel("MaterialChangeLog").getData();
                var oSelectLine = "";
                var oSelectedItem = oEvent.getParameters("MatChangeData").listItems;
                for (let index = 0; index < oSelectedItem.length; index++) {
                    sSelectedMessage = "";
                    const element = oSelectedItem[index];
                    sSelected = element.getSelected();

                    if (element.getSelected() == true) {

                        var sStatus = element.getBindingContext("MaterialChangeLog").getProperty("ZapprovalStatus");
                        if (sStatus == "A") {
                            oSelectLine = "X";
                            sSelectedMessage = "X";
                            element.setSelected(false);

                        }
                        if (sStatus == "R") {
                            oSelectLine = "X";
                            sSelectedMessage = "X";
                            element.setSelected(false);

                        }



                    }
                    if (oEvent.getParameters().selectAll != true) {
                        if (sSelectedMessage != "X") {
                            var sreqno = element.getBindingContext("MaterialChangeLog").getProperty("ZrequestNo");
                            var sPM2 = element.getBindingContext("MaterialChangeLog").getProperty("PM2");
                            var sZwFn = element.getBindingContext("MaterialChangeLog").getProperty("ZwFn");

                            for (let index = 0; index < oTableData.length; index++) {
                                //   if (sTabname == oTableData[index].ZtableName) {
                                if (sreqno == oTableData[index].ZrequestNo) {
                                    if (sPM2 == oTableData[index].PM2) {
                                        if (sZwFn == oTableData[index].ZwFn) {


                                            this.getView().byId("MatChangeData").getItems()[index].setSelected(sSelected);
                                        }

                                    }
                                }

                                //  }




                            }
                        }
                    }
                }


                if (oSelectLine == "X") {
                    MessageBox.error("You have Selected Approved / Rejected LineItem");
                    return;

                }
                else {


                }


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
                oRouter.navTo("Detail", {
                    //  oRouter.navTo("Detail",{fId : sIndex});
                    ReqNO: vReqno,
                    SubReq: vsubReqNo,
                    TabName: vTabName,
                    FabName: vFabName

                });



            },
            cnt: 0,
            ss: 0,
            updateStatue: function (Status) {
                debugger;
                var that = this;

                oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();

                this.oSelectedItem = this.getView().byId("MatChangeData").getItems();
                var sSelectedcnt = this.getView().byId("MatChangeData").getSelectedItems();
                this.ss = sSelectedcnt.length;
                this.cnt = 0;
                if (sSelectedcnt == 0) {
                    MessageBox.error("Please Selected any one Item");
                    return;
                }
                var vSuccess = 0;
                var vError = 0;
                var vMessage = "";
                var oBusy = new sap.m.BusyDialog({
                    title: "Updating Data",
                    text: "Please Wait...."

                });
                //  var oSendjson = new sap.ui.model.json.JSONModel();
                //  oSendjson.addData("A"="1","B"="2","C"="3");
                // oSendjson.push("A"="4","B"="5","C"="6");
                for (let i = 0; i < sSelectedcnt.length; i++) {
                    
                    var sPath = sSelectedcnt[i].getBindingContextPath();
                    var sIndex = sPath.split('/')[1];
                    this.upindex = sPath;
                    oJson = this.getView().getModel("MaterialChangeLog").getData()[sIndex];

                    var sReqNo = oJson.ZrequestNo;
                    var sSubReqNo = oJson.ZsubSerialNo;
                    oJson.ZapprovalStatus = Status;
                    // var EntitySet = '/MaterialChangeLogSet(ZrequestNo="' + sReqNo + '",ZsubSerialNo="' + sSubReqNo + '")';
                    var EntitySet = "/MaterialChangeLogSet(ZrequestNo='" + sReqNo + "',ZsubSerialNo='" + sSubReqNo + "')";

                    debugger;

                    oBusy.open();
                    oDataCall.UpdateCall(oModel, EntitySet, oJson)
                        .then(function (responce) {
                            oBusy.close();
                            that.cnt = that.cnt + 1;

                            vSuccess = vSuccess + 1;

                            debugger;
                            //  that.getView().byId("MatChangeData").bindAggregation("items", that.oLocalModel);
                            // that.getView().setModel(that.oLocalModel, "MaterialChangeLog");
                            // that.oLocalModel.setProperty('/0', that.jjj);

                            //  that.oLocalModel.setProperty(that.upindex, that.jjj);

                            //   that.getView().byId("MatChangeData").getBinding("items").refresh(true);

                            if (that.cnt == that.ss) {
                                var listBinding = that.getView().byId("MatChangeData");
                                var leaveModel = listBinding.getModel("MaterialChangeLog");
                                leaveModel.refresh(true);
                                var sSelecteditems = listBinding.getSelectedItems();

                                for (let index = 0; index < sSelecteditems.length; index++) {
                                    const element = sSelecteditems[index];
                                    element.setSelected(false);


                                }
                                vMessage = "Data Updated :" + vSuccess + " Error Record : " + vError;
                                MessageToast.show(vMessage);

                            }



                        })
                        .catch(function (Error, sPath) {
                            oBusy.close();
                            debugger;
                            that.cnt = that.cnt + 1;
                            var reqno = Error.responseText.split("MSG:")[1].split("%")[1];
                            var subno = Error.responseText.split("MSG:")[1].split("%")[2];
                            var message = Error.responseText.split("MSG:")[1].split("%")[3];
                            var listBinding = that.getView().byId("MatChangeData");
                            var sSelecteditems = listBinding.getSelectedItems();
                            for (let index = 0; index < sSelecteditems.length; index++) {
                                const element = sSelecteditems[index];
                                var actIndex = sSelecteditems[index].getBindingContextPath().split("/")[1];
                                var odata1 = that.oLocalModel.getData()[actIndex];
                                if (reqno == odata1.ZrequestNo) {
                                    if (subno == odata1.ZsubSerialNo) {

                                        odata1.ZapprovalStatus = 'E'
                                    }

                                }


                            }
                            var listBinding = that.getView().byId("MatChangeData");
                            var leaveModel = listBinding.getModel("MaterialChangeLog");
                            leaveModel.refresh(true);

                            vError = vError + 1;
                            vMessage = "Succes Record :" + vSuccess + " Error Record : " + vError + ":" + message;

                            MessageBox.error(message);


                        });

                }

            },
            onApprove: function (oEvent) {
                this.updateStatue("A");
            },
            onReject: function () {
                this.updateStatue("R");
            }



        }
        );
    });