import{Y as h,_a as l,c as r,r as c}from"./chunk-AWEHUNTX.js";import{a}from"./chunk-DM275RSA.js";var g=(()=>{class n{constructor(){this._config={ripple:!0,inputStyle:"outlined",menuMode:"static",colorScheme:"light",componentTheme:"purple",scale:14,menuTheme:"light",topbarTheme:"purple",menuProfilePosition:"start"},this.state={staticMenuDesktopInactive:!1,overlayMenuActive:!1,configSidebarVisible:!1,staticMenuMobileActive:!1,menuHoverActive:!1,rightMenuActive:!1,topbarMenuActive:!1,menuProfileActive:!1,sidebarActive:!1,anchored:!1},this.config=h(this._config),this.configUpdate=new r,this.overlayOpen=new r,this.topbarMenuOpen=new r,this.menuProfileOpen=new r,this.configUpdate$=this.configUpdate.asObservable(),this.overlayOpen$=this.overlayOpen.asObservable(),this.topbarMenuOpen$=this.topbarMenuOpen.asObservable(),this.menuProfileOpen$=this.menuProfileOpen.asObservable(),l(()=>{let e=this.config();this.updateStyle(e)&&this.changeTheme(),this.changeScale(e.scale),this.onConfigUpdate()})}updateStyle(e){return e.componentTheme!==this._config.componentTheme||e.colorScheme!==this._config.colorScheme}onMenuToggle(){this.isOverlay()&&(this.state.overlayMenuActive=!this.state.overlayMenuActive,this.state.overlayMenuActive&&this.overlayOpen.next(null)),this.isDesktop()?this.state.staticMenuDesktopInactive=!this.state.staticMenuDesktopInactive:(this.state.staticMenuMobileActive=!this.state.staticMenuMobileActive,this.state.staticMenuMobileActive&&this.overlayOpen.next(null))}onTopbarMenuToggle(){this.state.topbarMenuActive=!this.state.topbarMenuActive,this.state.topbarMenuActive&&this.topbarMenuOpen.next(null)}onOverlaySubmenuOpen(){this.overlayOpen.next(null)}showConfigSidebar(){this.state.configSidebarVisible=!0}isOverlay(){return this.config().menuMode==="overlay"}isDesktop(){return window.innerWidth>991}isSlim(){return this.config().menuMode==="slim"}isSlimPlus(){return this.config().menuMode==="slim-plus"}isHorizontal(){return this.config().menuMode==="horizontal"}isMobile(){return!this.isDesktop()}onConfigUpdate(){this._config=a({},this.config()),this.configUpdate.next(this.config())}isRightMenuActive(){return this.state.rightMenuActive}openRightSidebar(){this.state.rightMenuActive=!0}onMenuProfileToggle(){this.state.menuProfileActive=!this.state.menuProfileActive,this.state.menuProfileActive&&this.isHorizontal()&&this.isDesktop()&&this.menuProfileOpen.next(null)}changeTheme(){let{colorScheme:e,componentTheme:t}=this.config(),u=document.getElementById("theme-link").getAttribute("href").split("/").map(o=>o==this._config.componentTheme?o=t:o==`theme-${this._config.colorScheme}`?o=`theme-${e}`:o).join("/");this.replaceThemeLink(u)}replaceThemeLink(e){let t="theme-link",s=document.getElementById(t),i=s.cloneNode(!0);i.setAttribute("href",e),i.setAttribute("id",t+"-clone"),s.parentNode.insertBefore(i,s.nextSibling),i.addEventListener("load",()=>{s.remove(),i.setAttribute("id",t)})}changeScale(e){document.documentElement.style.fontSize=`${e}px`}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=c({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();export{g as a};