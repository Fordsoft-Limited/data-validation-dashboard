import{b as yt}from"./chunk-JCXLZDN3.js";import{a as _t}from"./chunk-PSUU27KI.js";import{a as Ct}from"./chunk-ZUNNH25A.js";import{a as St}from"./chunk-FIIS3JHD.js";import{b as nt}from"./chunk-6YX36K4P.js";import{e as Z,f as ot,g as at,h as rt,j as pt,k as gt}from"./chunk-GKUFW2RI.js";import{a as it}from"./chunk-D6OM4TL4.js";import{c as lt}from"./chunk-UNZMK42Y.js";import"./chunk-VZKXXVR6.js";import"./chunk-NG4D23UF.js";import{a as A}from"./chunk-HDDFEM7G.js";import{d as st,f as ct,j as dt,k as ut,n as mt}from"./chunk-VTKS6MIP.js";import"./chunk-XVURSSVY.js";import"./chunk-KMIFLFRM.js";import"./chunk-5TMXRYYI.js";import{g as tt,h as et}from"./chunk-JSMWOMP6.js";import"./chunk-5Q75OANQ.js";import{$ as l,Aa as g,Ca as y,D as u,Da as _,Db as N,E as m,Ea as C,Fa as I,Fb as R,Ia as L,Ib as k,Jb as B,Lb as V,Lc as Q,Mc as X,Nb as K,Ob as W,Q as D,R as S,Ra as T,Rb as z,Sb as F,Ta as q,Ub as U,Vb as G,_b as J,ba as f,cc as E,db as M,ha as r,hb as O,hc as Y,ia as n,ib as j,ja as h,na as p,oa as w,pa as s,r as v,s as b,sc as H,vc as $,x,y as P,ya as c}from"./chunk-AWEHUNTX.js";import"./chunk-DM275RSA.js";var Dt=()=>["name","category","description"];function vt(e,d){e&1&&(r(0,"tr")(1,"th"),c(2,"Description"),n(),r(3,"th"),c(4,"Category"),n(),r(5,"th"),c(6,"Event Sources"),n(),r(7,"th"),c(8,"Status"),n(),r(9,"th"),c(10,"Date"),n(),h(11,"th"),n())}function bt(e,d){if(e&1){let t=p();r(0,"input",18),C("ngModelChange",function(i){u(t);let o=s().$implicit;return _(o.description,i)||(o.description=i),m(i)}),n()}if(e&2){let t=s().$implicit;y("ngModel",t.description)}}function xt(e,d){if(e&1&&c(0),e&2){let t=s().$implicit;g(" ",t.description||"No description available"," ")}}function Pt(e,d){if(e&1){let t=p();r(0,"input",18),C("ngModelChange",function(i){u(t);let o=s().$implicit;return _(o.category,i)||(o.category=i),m(i)}),n()}if(e&2){let t=s().$implicit;y("ngModel",t.category)}}function wt(e,d){if(e&1&&c(0),e&2){let t=s().$implicit;g(" ",t.category||"No category available"," ")}}function It(e,d){if(e&1){let t=p();r(0,"input",18),C("ngModelChange",function(i){u(t);let o=s().$implicit;return _(o.name,i)||(o.name=i),m(i)}),n()}if(e&2){let t=s().$implicit;y("ngModel",t.name)}}function Lt(e,d){if(e&1&&c(0),e&2){let t=s().$implicit;g(" ",t.name," ")}}function Tt(e,d){if(e&1){let t=p();r(0,"input",18),C("ngModelChange",function(i){u(t);let o=s().$implicit;return _(o.status,i)||(o.status=i),m(i)}),n()}if(e&2){let t=s().$implicit;y("ngModel",t.status)}}function qt(e,d){if(e&1&&c(0),e&2){let t=s().$implicit;g(" ",t.status||"No status available"," ")}}function Mt(e,d){if(e&1&&(r(0,"tr",15)(1,"td")(2,"p-cellEditor"),l(3,bt,1,1,"ng-template",16)(4,xt,1,1,"ng-template",17),n()(),r(5,"td")(6,"p-cellEditor"),l(7,Pt,1,1,"ng-template",16)(8,wt,1,1,"ng-template",17),n()(),r(9,"td")(10,"p-cellEditor"),l(11,It,1,1,"ng-template",16)(12,Lt,1,1,"ng-template",17),n()(),r(13,"td")(14,"p-cellEditor"),l(15,Tt,1,1,"ng-template",16)(16,qt,1,1,"ng-template",17),n()(),r(17,"td"),c(18),T(19,"date"),n()()),e&2){let t=d.$implicit;f("pEditableRow",t),D(18),g(" ",q(19,2,t.event_date,"short")," ")}}function Ot(e,d){if(e&1){let t=p();r(0,"p-table",12,0),C("selectionChange",function(i){u(t);let o=s();return _(o.selectedUsers,i)||(o.selectedUsers=i),m(i)}),w("onPage",function(i){u(t);let o=s();return m(o.onPageChange(i))}),l(2,vt,12,0,"ng-template",13)(3,Mt,20,5,"ng-template",14),n()}if(e&2){let t=s();f("value",t.users),y("selection",t.selectedUsers),f("rowHover",!0)("rows",t.pageSize)("paginator",!0)("totalRecords",t.totalRecords)("scrollable",!0)("filterDelay",0)("globalFilterFields",L(9,Dt))}}var ht=(()=>{class e{constructor(t,a,i,o){this.userService=t,this.messageService=a,this.authService=i,this.customerService=o,this.users=[],this.selectedUsers=[],this.pageSize=100,this.totalRecords=0,this.currentPage=1,this.loading=!1,this.errorMessage="",this.hasErrors=!1,this.userAddedError=!1}ngOnInit(){this.loadAuditLog(this.currentPage,this.pageSize)}loadAuditLog(t,a){this.loading=!0,this.customerService.getAuditLog(t,a).subscribe(i=>{this.loading=!1,i&&i.data&&i.data.results?(this.users=i.data.results.map(o=>({name:o.posted_by?.name||"Unknown",description:o.description||"No description available",category:o.category||"No category available",status:o.status||"Unknown",event_date:o.event_date?new Date(o.event_date):null})),this.totalRecords=i.data.count):(this.users=[],this.messageService.add({severity:"info",summary:"No Data",detail:"No logs found."}))},i=>{this.loading=!1,this.users=[],this.messageService.add({severity:"error",summary:"Error",detail:"Failed to load audit logs."})})}onPageChange(t){this.currentPage=t.page+1,this.pageSize=t.rows,this.loadAuditLog(this.currentPage,this.pageSize)}onGlobalFilter(t,a){t.filterGlobal(a.target.value,"contains")}showSuccessMessage(t){this.messageService.add({severity:"success",summary:"Success",detail:t})}showErrorMessage(t){this.messageService.add({severity:"error",summary:"Error",detail:t})}static{this.\u0275fac=function(a){return new(a||e)(S(_t),S(E),S(A),S(Ct))}}static{this.\u0275cmp=x({type:e,selectors:[["app-audit-log"]],features:[I([E,J])],decls:17,vars:1,consts:[["dt1",""],[1,"card",2,"overflow","hidden"],[1,"flex","gap-5","mb-4","justify-content-end","flex-wrap"],[1,"flex","flex-column","gap-2"],["for","region"],["formControlName","user","placeholder","Enter username"],["for","businessUnit"],["formControlName","category","placeholder","Select Category"],["for","dateRange"],[1,"flex","gap-2"],["type","date","formControlName","dateRange","pInputText","",1,"date-range"],["dataKey","event_uid","editMode","row","scrollHeight","400px","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries",3,"value","selection","rowHover","rows","paginator","totalRecords","scrollable","filterDelay","globalFilterFields","selectionChange","onPage",4,"ngIf"],["dataKey","event_uid","editMode","row","scrollHeight","400px","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries",3,"selectionChange","onPage","value","selection","rowHover","rows","paginator","totalRecords","scrollable","filterDelay","globalFilterFields"],["pTemplate","header"],["pTemplate","body"],[3,"pEditableRow"],["pTemplate","input"],["pTemplate","output"],["pInputText","","type","text","required","",3,"ngModelChange","ngModel"]],template:function(a,i){a&1&&(r(0,"div",1)(1,"form")(2,"div",2)(3,"div",3)(4,"label",4),c(5,"Filter By User :"),n(),h(6,"p-dropdown",5),n(),r(7,"div",3)(8,"label",6),c(9,"Filter By Category :"),n(),h(10,"p-dropdown",7),n(),r(11,"div",3)(12,"label",8),c(13,"Filter By Date:"),n(),r(14,"div",9),h(15,"input",10),n()()()(),l(16,Ot,4,10,"p-table",11),n()),a&2&&(D(16),f("ngIf",i.users&&i.users.length))},dependencies:[M,ct,Y,ut,dt,Q,tt,W,R,k,B,F,z,K,V,O],styles:[".flex-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}.flex-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]{flex-grow:1}@media (max-width: 600px){.flex-container[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.flex-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:77%;margin-bottom:10px}.flex-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%], .flex-container[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%}}.errors[_ngcontent-%COMP%]{color:red;font-size:14px}.notification[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;padding:15px;text-align:center;font-size:18px;z-index:1000;display:none}.success[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff}.error[_ngcontent-%COMP%]{background-color:#f44336}@keyframes _ngcontent-%COMP%_slide-down{0%{top:-50px;opacity:0}to{top:0;opacity:1}}.notification.active[_ngcontent-%COMP%]{display:block;animation:_ngcontent-%COMP%_slide-down .5s ease-in-out}.card[_ngcontent-%COMP%]{max-width:100%;overflow:hidden}form[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;width:100%}.flex[_ngcontent-%COMP%]{display:flex;gap:1rem;flex-wrap:wrap;justify-content:flex-end}.flex-column[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.mb-4[_ngcontent-%COMP%]{margin-bottom:16px}"]})}}return e})();var Et=(()=>{class e{getUsersData(){return[{id:"1000",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"Admin",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1001",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1002",name:"Bamboo Watch",email:"johsnon123456@gmail.com",role:"Admin",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1003",name:"Bamboo Bukky",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1004",name:"Shola Bose",email:"johsnonshole@gmail.com",role:"Admin",inventoryStatus:"ENABLE",date:"2019-02-09"},{id:"1005",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1006",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1007",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1008",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1009",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1010",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1011",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1012",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1013",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1014",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1015",name:"Bamboo Watch",email:"johsnon@gmail.com",role:"User",inventoryStatus:"DISABLE",date:"2019-02-09"},{id:"1016",code:"k8l6j58jl",name:"Lime Band",description:"Product Description",image:"lime-band.jpg",price:79,category:"Fitness",quantity:12,inventoryStatus:"INSTOCK",rating:3},{id:"1017",code:"v435nn85n",name:"Mini Speakers",description:"Product Description",image:"mini-speakers.jpg",price:85,category:"Clothing",quantity:42,inventoryStatus:"INSTOCK",rating:4},{id:"1018",code:"09zx9c0zc",name:"Painted Phone Case",description:"Product Description",image:"painted-phone-case.jpg",price:56,category:"Accessories",quantity:41,inventoryStatus:"INSTOCK",rating:5},{id:"1019",code:"mnb5mb2m5",name:"Pink Band",description:"Product Description",image:"pink-band.jpg",price:79,category:"Fitness",quantity:63,inventoryStatus:"INSTOCK",rating:4},{id:"1020",code:"r23fwf2w3",name:"Pink Purse",description:"Product Description",image:"pink-purse.jpg",price:110,category:"Accessories",quantity:0,inventoryStatus:"OUTOFSTOCK",rating:4},{id:"1021",code:"pxpzczo23",name:"Purple Band",description:"Product Description",image:"purple-band.jpg",price:79,category:"Fitness",quantity:6,inventoryStatus:"LOWSTOCK",rating:3},{id:"1022",code:"2c42cb5cb",name:"Purple Gemstone Necklace",description:"Product Description",image:"purple-gemstone-necklace.jpg",price:45,category:"Accessories",quantity:62,inventoryStatus:"INSTOCK",rating:4},{id:"1023",code:"5k43kkk23",name:"Purple T-Shirt",description:"Product Description",image:"purple-t-shirt.jpg",price:49,category:"Clothing",quantity:2,inventoryStatus:"LOWSTOCK",rating:5},{id:"1024",code:"lm2tny2k4",name:"Shoes",description:"Product Description",image:"shoes.jpg",price:64,category:"Clothing",quantity:0,inventoryStatus:"INSTOCK",rating:4},{id:"1025",code:"nbm5mv45n",name:"Sneakers",description:"Product Description",image:"sneakers.jpg",price:78,category:"Clothing",quantity:52,inventoryStatus:"INSTOCK",rating:4},{id:"1026",code:"zx23zc42c",name:"Teal T-Shirt",description:"Product Description",image:"teal-t-shirt.jpg",price:49,category:"Clothing",quantity:3,inventoryStatus:"LOWSTOCK",rating:3},{id:"1027",code:"acvx872gc",name:"Yellow Earbuds",description:"Product Description",image:"yellow-earbuds.jpg",price:89,category:"Electronics",quantity:35,inventoryStatus:"INSTOCK",rating:3},{id:"1028",code:"tx125ck42",name:"Yoga Mat",description:"Product Description",image:"yoga-mat.jpg",price:20,category:"Fitness",quantity:15,inventoryStatus:"INSTOCK",rating:5},{id:"1029",code:"gwuby345v",name:"Yoga Set",description:"Product Description",image:"yoga-set.jpg",price:20,category:"Fitness",quantity:25,inventoryStatus:"INSTOCK",rating:8}]}getProductsWithOrdersData(){return[{id:"1000",code:"f230fh0g3",name:"Bamboo Watch",description:"Product Description",image:"bamboo-watch.jpg",price:65,category:"Accessories",quantity:24,inventoryStatus:"INSTOCK",rating:5,orders:[{id:"1000-0",productCode:"f230fh0g3",date:"2020-09-13",amount:65,quantity:1,customer:"David James",status:"PENDING"},{id:"1000-1",productCode:"f230fh0g3",date:"2020-05-14",amount:130,quantity:2,customer:"Leon Rodrigues",status:"DELIVERED"},{id:"1000-2",productCode:"f230fh0g3",date:"2019-01-04",amount:65,quantity:1,customer:"Juan Alejandro",status:"RETURNED"},{id:"1000-3",productCode:"f230fh0g3",date:"2020-09-13",amount:195,quantity:3,customer:"Claire Morrow",status:"CANCELLED"}]},{id:"1001",code:"nvklal433",name:"Black Watch",description:"Product Description",image:"black-watch.jpg",price:72,category:"Accessories",quantity:61,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1001-0",productCode:"nvklal433",date:"2020-05-14",amount:72,quantity:1,customer:"Maisha Jefferson",status:"DELIVERED"},{id:"1001-1",productCode:"nvklal433",date:"2020-02-28",amount:144,quantity:2,customer:"Octavia Murillo",status:"PENDING"}]},{id:"1002",code:"zz21cz3c1",name:"Blue Band",description:"Product Description",image:"blue-band.jpg",price:79,category:"Fitness",quantity:2,inventoryStatus:"LOWSTOCK",rating:3,orders:[{id:"1002-0",productCode:"zz21cz3c1",date:"2020-07-05",amount:79,quantity:1,customer:"Stacey Leja",status:"DELIVERED"},{id:"1002-1",productCode:"zz21cz3c1",date:"2020-02-06",amount:79,quantity:1,customer:"Ashley Wickens",status:"DELIVERED"}]},{id:"1003",code:"244wgerg2",name:"Blue T-Shirt",description:"Product Description",image:"blue-t-shirt.jpg",price:29,category:"Clothing",quantity:25,inventoryStatus:"INSTOCK",rating:5,orders:[]},{id:"1004",code:"h456wer53",name:"Bracelet",description:"Product Description",image:"bracelet.jpg",price:15,category:"Accessories",quantity:73,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1004-0",productCode:"h456wer53",date:"2020-09-05",amount:60,quantity:4,customer:"Mayumi Misaki",status:"PENDING"},{id:"1004-1",productCode:"h456wer53",date:"2019-04-16",amount:2,quantity:30,customer:"Francesco Salvatore",status:"DELIVERED"}]},{id:"1005",code:"av2231fwg",name:"Brown Purse",description:"Product Description",image:"brown-purse.jpg",price:120,category:"Accessories",quantity:0,inventoryStatus:"OUTOFSTOCK",rating:4,orders:[{id:"1005-0",productCode:"av2231fwg",date:"2020-01-25",amount:120,quantity:1,customer:"Isabel Sinclair",status:"RETURNED"},{id:"1005-1",productCode:"av2231fwg",date:"2019-03-12",amount:240,quantity:2,customer:"Lionel Clifford",status:"DELIVERED"},{id:"1005-2",productCode:"av2231fwg",date:"2019-05-05",amount:120,quantity:1,customer:"Cody Chavez",status:"DELIVERED"}]},{id:"1006",code:"bib36pfvm",name:"Chakra Bracelet",description:"Product Description",image:"chakra-bracelet.jpg",price:32,category:"Accessories",quantity:5,inventoryStatus:"LOWSTOCK",rating:3,orders:[{id:"1006-0",productCode:"bib36pfvm",date:"2020-02-24",amount:32,quantity:1,customer:"Arvin Darci",status:"DELIVERED"},{id:"1006-1",productCode:"bib36pfvm",date:"2020-01-14",amount:64,quantity:2,customer:"Izzy Jones",status:"PENDING"}]},{id:"1007",code:"mbvjkgip5",name:"Galaxy Earrings",description:"Product Description",image:"galaxy-earrings.jpg",price:34,category:"Accessories",quantity:23,inventoryStatus:"INSTOCK",rating:5,orders:[{id:"1007-0",productCode:"mbvjkgip5",date:"2020-06-19",amount:34,quantity:1,customer:"Jennifer Smith",status:"DELIVERED"}]},{id:"1008",code:"vbb124btr",name:"Game Controller",description:"Product Description",image:"game-controller.jpg",price:99,category:"Electronics",quantity:2,inventoryStatus:"LOWSTOCK",rating:4,orders:[{id:"1008-0",productCode:"vbb124btr",date:"2020-01-05",amount:99,quantity:1,customer:"Jeanfrancois David",status:"DELIVERED"},{id:"1008-1",productCode:"vbb124btr",date:"2020-01-19",amount:198,quantity:2,customer:"Ivar Greenwood",status:"RETURNED"}]},{id:"1009",code:"cm230f032",name:"Gaming Set",description:"Product Description",image:"gaming-set.jpg",price:299,category:"Electronics",quantity:63,inventoryStatus:"INSTOCK",rating:3,orders:[{id:"1009-0",productCode:"cm230f032",date:"2020-06-24",amount:299,quantity:1,customer:"Kadeem Mujtaba",status:"PENDING"},{id:"1009-1",productCode:"cm230f032",date:"2020-05-11",amount:299,quantity:1,customer:"Ashley Wickens",status:"DELIVERED"},{id:"1009-2",productCode:"cm230f032",date:"2019-02-07",amount:299,quantity:1,customer:"Julie Johnson",status:"DELIVERED"},{id:"1009-3",productCode:"cm230f032",date:"2020-04-26",amount:299,quantity:1,customer:"Tony Costa",status:"CANCELLED"}]},{id:"1010",code:"plb34234v",name:"Gold Phone Case",description:"Product Description",image:"gold-phone-case.jpg",price:24,category:"Accessories",quantity:0,inventoryStatus:"OUTOFSTOCK",rating:4,orders:[{id:"1010-0",productCode:"plb34234v",date:"2020-02-04",amount:24,quantity:1,customer:"James Butt",status:"DELIVERED"},{id:"1010-1",productCode:"plb34234v",date:"2020-05-05",amount:48,quantity:2,customer:"Josephine Darakjy",status:"DELIVERED"}]},{id:"1011",code:"4920nnc2d",name:"Green Earbuds",description:"Product Description",image:"green-earbuds.jpg",price:89,category:"Electronics",quantity:23,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1011-0",productCode:"4920nnc2d",date:"2020-06-01",amount:89,quantity:1,customer:"Art Venere",status:"DELIVERED"}]},{id:"1012",code:"250vm23cc",name:"Green T-Shirt",description:"Product Description",image:"green-t-shirt.jpg",price:49,category:"Clothing",quantity:74,inventoryStatus:"INSTOCK",rating:5,orders:[{id:"1012-0",productCode:"250vm23cc",date:"2020-02-05",amount:49,quantity:1,customer:"Lenna Paprocki",status:"DELIVERED"},{id:"1012-1",productCode:"250vm23cc",date:"2020-02-15",amount:49,quantity:1,customer:"Donette Foller",status:"PENDING"}]},{id:"1013",code:"fldsmn31b",name:"Grey T-Shirt",description:"Product Description",image:"grey-t-shirt.jpg",price:48,category:"Clothing",quantity:0,inventoryStatus:"OUTOFSTOCK",rating:3,orders:[{id:"1013-0",productCode:"fldsmn31b",date:"2020-04-01",amount:48,quantity:1,customer:"Simona Morasca",status:"DELIVERED"}]},{id:"1014",code:"waas1x2as",name:"Headphones",description:"Product Description",image:"headphones.jpg",price:175,category:"Electronics",quantity:8,inventoryStatus:"LOWSTOCK",rating:5,orders:[{id:"1014-0",productCode:"waas1x2as",date:"2020-05-15",amount:175,quantity:1,customer:"Lenna Paprocki",status:"DELIVERED"},{id:"1014-1",productCode:"waas1x2as",date:"2020-01-02",amount:175,quantity:1,customer:"Donette Foller",status:"CANCELLED"}]},{id:"1015",code:"vb34btbg5",name:"Light Green T-Shirt",description:"Product Description",image:"light-green-t-shirt.jpg",price:49,category:"Clothing",quantity:34,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1015-0",productCode:"vb34btbg5",date:"2020-07-02",amount:98,quantity:2,customer:"Mitsue Tollner",status:"DELIVERED"}]},{id:"1016",code:"k8l6j58jl",name:"Lime Band",description:"Product Description",image:"lime-band.jpg",price:79,category:"Fitness",quantity:12,inventoryStatus:"INSTOCK",rating:3,orders:[]},{id:"1017",code:"v435nn85n",name:"Mini Speakers",description:"Product Description",image:"mini-speakers.jpg",price:85,category:"Clothing",quantity:42,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1017-0",productCode:"v435nn85n",date:"2020-07-12",amount:85,quantity:1,customer:"Minna Amigon",status:"DELIVERED"}]},{id:"1018",code:"09zx9c0zc",name:"Painted Phone Case",description:"Product Description",image:"painted-phone-case.jpg",price:56,category:"Accessories",quantity:41,inventoryStatus:"INSTOCK",rating:5,orders:[{id:"1018-0",productCode:"09zx9c0zc",date:"2020-07-01",amount:56,quantity:1,customer:"Abel Maclead",status:"DELIVERED"},{id:"1018-1",productCode:"09zx9c0zc",date:"2020-05-02",amount:56,quantity:1,customer:"Minna Amigon",status:"RETURNED"}]},{id:"1019",code:"mnb5mb2m5",name:"Pink Band",description:"Product Description",image:"pink-band.jpg",price:79,category:"Fitness",quantity:63,inventoryStatus:"INSTOCK",rating:4,orders:[]},{id:"1020",code:"r23fwf2w3",name:"Pink Purse",description:"Product Description",image:"pink-purse.jpg",price:110,category:"Accessories",quantity:0,inventoryStatus:"OUTOFSTOCK",rating:4,orders:[{id:"1020-0",productCode:"r23fwf2w3",date:"2020-05-29",amount:110,quantity:1,customer:"Kiley Caldarera",status:"DELIVERED"},{id:"1020-1",productCode:"r23fwf2w3",date:"2020-02-11",amount:220,quantity:2,customer:"Graciela Ruta",status:"DELIVERED"}]},{id:"1021",code:"pxpzczo23",name:"Purple Band",description:"Product Description",image:"purple-band.jpg",price:79,category:"Fitness",quantity:6,inventoryStatus:"LOWSTOCK",rating:3,orders:[{id:"1021-0",productCode:"pxpzczo23",date:"2020-02-02",amount:79,quantity:1,customer:"Cammy Albares",status:"DELIVERED"}]},{id:"1022",code:"2c42cb5cb",name:"Purple Gemstone Necklace",description:"Product Description",image:"purple-gemstone-necklace.jpg",price:45,category:"Accessories",quantity:62,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1022-0",productCode:"2c42cb5cb",date:"2020-06-29",amount:45,quantity:1,customer:"Mattie Poquette",status:"DELIVERED"},{id:"1022-1",productCode:"2c42cb5cb",date:"2020-02-11",amount:135,quantity:3,customer:"Meaghan Garufi",status:"DELIVERED"}]},{id:"1023",code:"5k43kkk23",name:"Purple T-Shirt",description:"Product Description",image:"purple-t-shirt.jpg",price:49,category:"Clothing",quantity:2,inventoryStatus:"LOWSTOCK",rating:5,orders:[{id:"1023-0",productCode:"5k43kkk23",date:"2020-04-15",amount:49,quantity:1,customer:"Gladys Rim",status:"RETURNED"}]},{id:"1024",code:"lm2tny2k4",name:"Shoes",description:"Product Description",image:"shoes.jpg",price:64,category:"Clothing",quantity:0,inventoryStatus:"INSTOCK",rating:4,orders:[]},{id:"1025",code:"nbm5mv45n",name:"Sneakers",description:"Product Description",image:"sneakers.jpg",price:78,category:"Clothing",quantity:52,inventoryStatus:"INSTOCK",rating:4,orders:[{id:"1025-0",productCode:"nbm5mv45n",date:"2020-02-19",amount:78,quantity:1,customer:"Yuki Whobrey",status:"DELIVERED"},{id:"1025-1",productCode:"nbm5mv45n",date:"2020-05-21",amount:78,quantity:1,customer:"Fletcher Flosi",status:"PENDING"}]},{id:"1026",code:"zx23zc42c",name:"Teal T-Shirt",description:"Product Description",image:"teal-t-shirt.jpg",price:49,category:"Clothing",quantity:3,inventoryStatus:"LOWSTOCK",rating:3,orders:[{id:"1026-0",productCode:"zx23zc42c",date:"2020-04-24",amount:98,quantity:2,customer:"Bette Nicka",status:"DELIVERED"}]},{id:"1027",code:"acvx872gc",name:"Yellow Earbuds",description:"Product Description",image:"yellow-earbuds.jpg",price:89,category:"Electronics",quantity:35,inventoryStatus:"INSTOCK",rating:3,orders:[{id:"1027-0",productCode:"acvx872gc",date:"2020-01-29",amount:89,quantity:1,customer:"Veronika Inouye",status:"DELIVERED"},{id:"1027-1",productCode:"acvx872gc",date:"2020-06-11",amount:89,quantity:1,customer:"Willard Kolmetz",status:"DELIVERED"}]},{id:"1028",code:"tx125ck42",name:"Yoga Mat",description:"Product Description",image:"yoga-mat.jpg",price:20,category:"Fitness",quantity:15,inventoryStatus:"INSTOCK",rating:5,orders:[]},{id:"1029",code:"gwuby345v",name:"Yoga Set",description:"Product Description",image:"yoga-set.jpg",price:20,category:"Fitness",quantity:25,inventoryStatus:"INSTOCK",rating:8,orders:[{id:"1029-0",productCode:"gwuby345v",date:"2020-02-14",amount:4,quantity:80,customer:"Maryann Royster",status:"DELIVERED"}]}]}getUsersMini(){return Promise.resolve(this.getUsersData().slice(0,5))}getUsersSmall(){return Promise.resolve(this.getUsersData().slice(0,10))}getUsers(){return Promise.resolve(this.getUsersData())}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})();var jt=[{path:"",component:ht}],ye=(()=>{class e{static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275mod=P({type:e})}static{this.\u0275inj=b({providers:[Et],imports:[yt,j,mt,$,X,St,H,ot,et,it,lt,rt,at,Z,st,G,U,pt,gt,nt,N.forChild(jt)]})}}return e})();export{ye as AuditLogModule,jt as userRoutes};
