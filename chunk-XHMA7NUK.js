import{a as u}from"./chunk-FJW7QSLR.js";import{h as l,lb as a,m as s,mb as c,nb as b,r as d,u as h}from"./chunk-AWEHUNTX.js";var H=(()=>{class i{constructor(t,e){this.http=t,this.base=e,this.baseUrl=this.base._baseUrl+"/user"}changePassword(t){let e=new a({"Content-Type":"application/json"});return this.http.post(this.baseUrl+"/change/password",t,{headers:e}).pipe(s(r=>this.base.errorHandler(r)))}createUser(t){let e=new a({"Content-Type":"application/json"});return this.http.post(`${this.baseUrl}/create`,t,{headers:e})}getUserList(t,e){let r=new a({"Content-Type":"application/json"}),n=new c().set("page",t.toString()).set("page_size",e.toString());return this.http.get(this.baseUrl+"/list",{headers:r,params:n}).pipe(s(o=>this.base.errorHandler(o)))}updateUserStatus(t,e){let r=new a({"Content-Type":"application/json"}),n={is_active:e},o=`${this.baseUrl}/${t}/status/`;return this.http.patch(o,n,{headers:r}).pipe(s(p=>{throw console.error("Error in API call:",p),this.base.errorHandler(p),p}))}getTotalUser(){return this.http.get(`${this.baseUrl}/list`).pipe(l(t=>t.data.count),s(t=>this.base.errorHandler(t)))}logOutUser(t){let e=new a({"Content-Type":"application/json"});return this.http.post(this.baseUrl+"/logout",t,{headers:e}).pipe(s(r=>this.base.errorHandler(r)))}refreshToken(t){return this.http.post(this.baseUrl+"/token/refresh",t).pipe(s(e=>this.base.errorHandler(e)))}getAuditLog(t,e){let r=new a({"Content-Type":"application/json"}),n=new c().set("page",t.toString()).set("page_size",e.toString());return this.http.get(`${this.baseUrl}/events`,{headers:r,params:n}).pipe(s(o=>this.base.errorHandler(o)))}static{this.\u0275fac=function(e){return new(e||i)(h(b),h(u))}}static{this.\u0275prov=d({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{H as a};