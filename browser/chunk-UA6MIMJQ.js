import{a as q,b as G,c as J,d as Q,e as W}from"./chunk-BL7XLXFW.js";import{a as B}from"./chunk-Y2TWHHJT.js";import{a as $,b as A}from"./chunk-SDXV7PTX.js";import{a as X}from"./chunk-ZUNNH25A.js";import{b as H,c as K}from"./chunk-UNZMK42Y.js";import"./chunk-VZKXXVR6.js";import"./chunk-NG4D23UF.js";import"./chunk-5TMXRYYI.js";import"./chunk-JSMWOMP6.js";import"./chunk-5Q75OANQ.js";import{$ as u,Aa as x,D as b,Db as V,E as v,Fa as M,Ia as g,Q as a,R as f,_b as h,ba as l,cb as P,cc as w,db as k,ea as S,ha as c,hc as j,ia as s,ib as L,ja as T,ka as E,la as F,na as y,nb as U,oa as D,pa as p,s as N,uc as O,vc as z,x as R,y as I,ya as C}from"./chunk-AWEHUNTX.js";import"./chunk-DM275RSA.js";var ee=()=>[5,10,25],te=()=>({"min-width":"50rem"}),oe=()=>({"margin-left":"1em","margin-right":"2px",width:"2.5em",height:"2.5em","margin-top":"1em"}),ie=()=>({width:"2.5em",height:"2.5em","margin-left":"1em","margin-top":"1em"});function ne(o,r){if(o&1&&(c(0,"th"),C(1),s()),o&2){let e=r.$implicit;a(),x(" ",e.header," ")}}function re(o,r){if(o&1&&(c(0,"tr"),u(1,ne,2,1,"th",4),s()),o&2){let e=r.$implicit;a(),l("ngForOf",e)}}function ae(o,r){if(o&1&&T(0,"p-treeTableToggler",8),o&2){let e=p(2).$implicit;l("rowNode",e)}}function le(o,r){if(o&1){let e=y();c(0,"p-button",11),D("click",function(){b(e);let i=p(3).$implicit,n=p();return v(n.download(i))}),s()}o&2&&S(g(2,oe))}function ce(o,r){if(o&1){let e=y();c(0,"p-button",12),D("click",function(){b(e);let i=p(3).$implicit,n=p();return v(n.delete(i.node.data.uid))}),s()}o&2&&S(g(2,ie))}function de(o,r){if(o&1&&(E(0),u(1,le,1,3,"p-button",9)(2,ce,1,3,"p-button",10),F()),o&2){let e=p(2).rowData;a(),l("ngIf",e.downloadVisible),a(),l("ngIf",e.deleteVisible)}}function se(o,r){if(o&1&&(c(0,"td"),u(1,ae,1,1,"p-treeTableToggler",6),c(2,"span"),C(3),s(),u(4,de,3,2,"ng-container",7),s()),o&2){let e=r.$implicit,t=r.index,i=r.last,n=p().rowData;a(),l("ngIf",t===0),a(2),x(" ",n[e.field],""),a(),l("ngIf",i)}}function pe(o,r){if(o&1&&(c(0,"tr",5),u(1,se,5,3,"td",4),s()),o&2){let e=r.$implicit,t=r.columns;l("ttRow",e)("ttSelectableRow",e),a(),l("ngForOf",t)}}var Y=(()=>{class o{constructor(e,t,i,n){this.messageService=e,this.customerService=t,this.http=i,this.confirmationService=n,this.files=[],this.cols=[],this.selectedNode={},this.currentPage=1,this.pageSize=20}ngOnInit(){this.cols=[{field:"reportName",header:"Report Name"},{field:"createdBy",header:"Created By"},{field:"fileSize",header:"File Size"},{field:"status",header:"Status"},{field:"date",header:"Date"}],this.fetchReports()}parentDownload(e,t){this.customerService.getScheduleReportListDownload(e).subscribe({next:i=>{let n=t||"default_report.zip",_=new Blob([i],{type:"application/zip"}),d=URL.createObjectURL(_);console.log(d);let m=document.createElement("a");m.href=d,m.download=n,m.click(),URL.revokeObjectURL(d)},error:i=>{console.error("Error during download:",i),alert("An error occurred while downloading the file. Please try again.")}})}childDownloaded(e,t){this.customerService.getScheduleReportListDownloadFile(e,t).subscribe({next:i=>{let n=t||"default_report.xlsx",_=new Blob([i],{type:"application/xlsx"}),d=URL.createObjectURL(_);console.log(d);let m=document.createElement("a");m.href=d,m.download=n,m.click(),URL.revokeObjectURL(d)},error:i=>{console.error("Error during download:",i),alert("An error occurred while downloading the file. Please try again.")}})}delete(e){let i=e?.node?.data?.uid;this.confirmationService.confirm({message:"Are you sure you want to delete this report?",accept:()=>{this.deleteParent(e)},reject:()=>{console.log("Report deletion cancelled.")}})}deleteParent(e){this.customerService.getScheduleReportListDelete(e).subscribe(t=>{t.code===200?(console.log("Response:",t.data),alert(t.data)):(console.error("Error response:",t),alert("Failed to delete the report."))},t=>{console.error("Error occurred:",t),alert("An error occurred while deleting the report.")})}download(e){let t=e?.node,i=t?.data.reportName,n=t?.data.uid,_=t?.children?.map(d=>d.data.reportName)||[];console.log("Child Report Names:",_),e.level==0?(this.parentDownload(n,i),console.log("This is parent node with ",i,n)):(this.childDownloaded(n,i),console.log("This is a child node",i,n))}convertToTree(e){return e?.map(t=>({data:{reportName:t.report_name,createdBy:t.scheduled_by?.name||"Unknown",fileSize:t.report_size,status:t.status,date:new Date(t.date_created).toLocaleDateString(),deleteVisible:!0,downloadVisible:!0,uid:t.uid},children:(t.files_metadata||[]).map(i=>({data:{deleteVisible:!1,downloadVisible:!0,reportName:i.name,createdBy:t.scheduled_by?.name||"Unknown",fileSize:i.file_size,status:t.status,uid:t.uid,date:new Date(t.date_created).toLocaleDateString()}}))}))}fetchReports(){this.customerService.getCustomerScheduleReportList(this.currentPage,this.pageSize).subscribe({next:e=>{e?.code==200&&e?.status=="Success"&&(this.files=this.convertToTree(e.data?.results||[]))},error:e=>{console.error("Failed to fetch reports:",e)}})}nodeSelect(e){this.messageService.add({severity:"info",summary:"Node Selected",detail:e.node.data.reportName})}nodeUnselect(e){this.messageService.add({severity:"warn",summary:"Node Unselected",detail:e.node.data.reportName})}static{this.\u0275fac=function(t){return new(t||o)(f(w),f(X),f(U),f(h))}}static{this.\u0275cmp=R({type:o,selectors:[["app-download"]],features:[M([w])],decls:6,vars:10,consts:[[1,"card"],["dataKey","reportName",3,"value","columns","paginator","rows","rowsPerPageOptions","scrollable","tableStyle"],["pTemplate","header"],["pTemplate","body"],[4,"ngFor","ngForOf"],[3,"ttRow","ttSelectableRow"],[3,"rowNode",4,"ngIf"],[4,"ngIf"],[3,"rowNode"],["icon","pi pi-file-excel","rounded","true","severity","info","pTooltip","Download Excel","tooltipPosition","top",3,"style","click",4,"ngIf"],["icon","pi pi-trash","rounded","true","severity","danger","pTooltip","Delete Item","tooltipPosition","top",3,"style","click",4,"ngIf"],["icon","pi pi-file-excel","rounded","true","severity","info","pTooltip","Download Excel","tooltipPosition","top",3,"click"],["icon","pi pi-trash","rounded","true","severity","danger","pTooltip","Delete Item","tooltipPosition","top",3,"click"]],template:function(t,i){t&1&&(c(0,"div",0),T(1,"p-toast")(2,"p-confirmDialog"),c(3,"p-treeTable",1),u(4,re,2,1,"ng-template",2)(5,pe,2,3,"ng-template",3),s()()),t&2&&(a(3),l("value",i.files)("columns",i.cols)("paginator",!0)("rows",50)("rowsPerPageOptions",g(8,ee))("scrollable",!0)("scrollable",!0)("tableStyle",g(9,te)))},dependencies:[P,k,q,j,Q,J,G,O,H,$]})}}return o})();var me=[{path:"",component:Y}],Me=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=I({type:o})}static{this.\u0275inj=N({providers:[h],imports:[L,V.forChild(me),W,B,z,K,A]})}}return o})();export{Me as DownloadModule,me as downloadRoutes};
