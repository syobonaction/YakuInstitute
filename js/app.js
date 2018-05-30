myApp = angular.module('myApp', ['ngSanitize']);

/* Services */
myApp.service('data',function(){
  var assetData = assets || [];
  var assetTypes = {
    all: {type:"none", name:"All"},
    lecture: {type:"lecture", name:"Lecture"},
    talk: {type:"talk", name:"Talk"},
    seminar: {type:"seminar", name:"Seminar"}
  }
  var data = {
    services: [
      {
        name: "BVOIP",
        lines:[
          "Any",
          "IPFLEX",
          "AVOICS",
          "VDNA",
          "BVOIP_DSL",
          "AVPN",
          "MIS_BVOIP",
          "VCON"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"],
          assetTypes["ip"],
          assetTypes["tn"],
          assetTypes["siteid"]
        ]
      },
      {
        name: "MIS",
        lines:[
          "Any",
          "AVOICSMIS"
        ],
        types:[
          assetTypes["all"],
          assetTypes["ip"]
        ]
      },
      {
        name: "CGCSC",
        lines:[
          "Any"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"]
        ]
      },
      {
        name: "VGCSC",
        lines:[
          "Any",
          "EVPN"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"]
        ]
      },
      {
        name: "NSD",
        lines:[
          "Any",
          "AVPN"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"],
          assetTypes["tn"],
          assetTypes["circuitid"]
        ]
      },
      {
        name: "DOW",
        lines:[
          "Any",
          "NS_DOWCHMCL",
          "NS_DWC2"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"]
        ]
      },
      {
        name: "ACE/CICA",
        lines:[
          "Any",
          "NS_ACEX"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"]
        ]
      },
      {
        name: "GM",
        lines:[
          "Any",
          "GM_M_AND_Q",
          "GLOBAL_GM",
          "GM_PD"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"]
        ]
      },
      {
        name: "MHO",
        lines:[
          "Any",
          "Advanced Managed",
          "Internally Managed",
          "Performance Managed",
          "Mixed Managed",
          "Basic Monitoring",
          "Advanced Monitoring",
          "No Monitoring"
        ],
        types:[
          assetTypes["all"],
          assetTypes["siteid"]
        ]
      },
      {
        name: "GAMMA",
        lines:[
          "Any"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"]
        ]
      },
      {
        name: "VT",
        lines:[
          "Any",
          "AVPN"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"],
          assetTypes["ip"],
          assetTypes["siteid"]
        ]
      },
      {
        name: "SOIL",
        lines:[
          "Any"
        ],
        types:[
          assetTypes["all"],
          assetTypes["hostname"],
          assetTypes["siteid"]
        ]
      },
      {
        name: "AWS",
        lines:[
          "Any"
        ],
        types:[
          assetTypes["all"],
          assetTypes["venuecode"]
        ]
      },
      {
        name: "LNS",
        lines:[
          "Any"
        ],
        types:[
          assetTypes["all"],
          assetTypes["circuitid"]
        ]
      }
    ]
  };

  return {
    getData: function() {
      return data;
    },
    getAssets: function() {
      return assetData;
    },
    setAssets: function() {
      localStorage.setItem('assets',JSON.stringify(assetData));
    }
  };
});

/* Filters */
myApp.filter('fltrMonth',function(data){
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return function(item) {
    var arr = [];
    for(i in item){
      if(item[i].month==month && item[i].year == year){
        arr.push(item[i]);
      }
    }
    return arr;
  }
});

myApp.filter('fltrArchive',function(data){
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return function(item) {
    var arr = [];
    for(i in item){
      if(item[i].year < year) {
        arr.push(item[i]);
      } else if(item[i].month < month && item[i].year == year) {
        arr.push(item[i]);
      }
    }
    return arr;
  }
});

/* Controllers */
myApp.controller('ctrlMain',function($scope, $sce, data){
  $scope.trustSrc = function(src) {
    if(src=="#"){
      return "template";
    } else {
      return $sce.trustAsResourceUrl(src);
    }

  }
  $scope.navTab = 1;
  $scope.tabSel = "tabSel";
  $scope.currentEvent = {};
  var date = new Date();
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var month = months[date.getMonth()];
  $scope.titles = [
    $sce.trustAsHtml(month),
    $sce.trustAsHtml("Past Events"),
    $sce.trustAsHtml("What is Yaku?")
  ]
  $scope.displayInfo = function(evt) {
    $scope.currentEvent.title = evt.title;
    $scope.currentEvent.presenter = evt.presenter;
    $scope.currentEvent.text = evt.text;
    $scope.currentEvent.url = evt.url;
  }
});

myApp.controller('ctrlResults',function($scope, data){
  //test assets
  $scope.assets = data.getAssets();
  $scope.removeAsset = function(asset) {
    data.getAssets().splice(assets.indexOf(asset),1);
    data.setAssets();
    return false;
  }
});

myApp.controller('ctrlSearch',function($scope,data,$sce){
  $scope.data = data.getData();
  $scope.newAsset = '';
  $scope.confMessage = $sce.trustAsHtml("");
  $scope.resetSearch = function() {
    $scope.data.serviceLineSel.line = "Any";
    $scope.data.typeSel = {type:"none", name: "All"};
  }
  $scope.addAsset = function() {

    if($scope.newAsset=='') {
      $scope.confMessage = $sce.trustAsHtml("Please enter an asset ID");
    } else {
      $scope.confMessage = $sce.trustAsHtml("Added "+ $scope.newAsset + " to asset records.");
      data.getAssets().push(new Asset($scope.data.servicesSel.name, $scope.data.typeSel, $scope.newAsset,"",$scope.data.serviceLineSel.line,""));
      data.setAssets();
      $scope.newAsset = '';
    }
  }
});
