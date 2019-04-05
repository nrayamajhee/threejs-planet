!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){!function(e){var t=e.noise={};function r(e,t,r){this.x=e,this.y=t,this.z=r}r.prototype.dot2=function(e,t){return this.x*e+this.y*t},r.prototype.dot3=function(e,t,r){return this.x*e+this.y*t+this.z*r};var n=[new r(1,1,0),new r(-1,1,0),new r(1,-1,0),new r(-1,-1,0),new r(1,0,1),new r(-1,0,1),new r(1,0,-1),new r(-1,0,-1),new r(0,1,1),new r(0,-1,1),new r(0,1,-1),new r(0,-1,-1)],i=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],o=new Array(512),a=new Array(512);t.seed=function(e){e>0&&e<1&&(e*=65536),(e=Math.floor(e))<256&&(e|=e<<8);for(var t=0;t<256;t++){var r;r=1&t?i[t]^255&e:i[t]^e>>8&255,o[t]=o[t+256]=r,a[t]=a[t+256]=n[r%12]}},t.seed(0);var s=.5*(Math.sqrt(3)-1),d=(3-Math.sqrt(3))/6,h=1/6;function u(e){return e*e*e*(e*(6*e-15)+10)}function c(e,t,r){return(1-r)*e+r*t}t.simplex2=function(e,t){var r,n,i=(e+t)*s,h=Math.floor(e+i),u=Math.floor(t+i),c=(h+u)*d,l=e-h+c,p=t-u+c;l>p?(r=1,n=0):(r=0,n=1);var f=l-r+d,w=p-n+d,E=l-1+2*d,m=p-1+2*d,y=a[(h&=255)+o[u&=255]],g=a[h+r+o[u+n]],v=a[h+1+o[u+1]],M=.5-l*l-p*p,H=.5-f*f-w*w,R=.5-E*E-m*m;return 70*((M<0?0:(M*=M)*M*y.dot2(l,p))+(H<0?0:(H*=H)*H*g.dot2(f,w))+(R<0?0:(R*=R)*R*v.dot2(E,m)))},t.simplex3=function(e,t,r){var n,i,s,d,u,c,l=(e+t+r)*(1/3),p=Math.floor(e+l),f=Math.floor(t+l),w=Math.floor(r+l),E=(p+f+w)*h,m=e-p+E,y=t-f+E,g=r-w+E;m>=y?y>=g?(n=1,i=0,s=0,d=1,u=1,c=0):m>=g?(n=1,i=0,s=0,d=1,u=0,c=1):(n=0,i=0,s=1,d=1,u=0,c=1):y<g?(n=0,i=0,s=1,d=0,u=1,c=1):m<g?(n=0,i=1,s=0,d=0,u=1,c=1):(n=0,i=1,s=0,d=1,u=1,c=0);var v=m-n+h,M=y-i+h,H=g-s+h,R=m-d+2*h,b=y-u+2*h,S=g-c+2*h,T=m-1+.5,x=y-1+.5,L=g-1+.5,P=a[(p&=255)+o[(f&=255)+o[w&=255]]],j=a[p+n+o[f+i+o[w+s]]],k=a[p+d+o[f+u+o[w+c]]],W=a[p+1+o[f+1+o[w+1]]],O=.6-m*m-y*y-g*g,z=.6-v*v-M*M-H*H,G=.6-R*R-b*b-S*S,q=.6-T*T-x*x-L*L;return 32*((O<0?0:(O*=O)*O*P.dot3(m,y,g))+(z<0?0:(z*=z)*z*j.dot3(v,M,H))+(G<0?0:(G*=G)*G*k.dot3(R,b,S))+(q<0?0:(q*=q)*q*W.dot3(T,x,L)))},t.perlin2=function(e,t){var r=Math.floor(e),n=Math.floor(t);e-=r,t-=n;var i=a[(r&=255)+o[n&=255]].dot2(e,t),s=a[r+o[n+1]].dot2(e,t-1),d=a[r+1+o[n]].dot2(e-1,t),h=a[r+1+o[n+1]].dot2(e-1,t-1),l=u(e);return c(c(i,d,l),c(s,h,l),u(t))},t.perlin3=function(e,t,r){var n=Math.floor(e),i=Math.floor(t),s=Math.floor(r);e-=n,t-=i,r-=s;var d=a[(n&=255)+o[(i&=255)+o[s&=255]]].dot3(e,t,r),h=a[n+o[i+o[s+1]]].dot3(e,t,r-1),l=a[n+o[i+1+o[s]]].dot3(e,t-1,r),p=a[n+o[i+1+o[s+1]]].dot3(e,t-1,r-1),f=a[n+1+o[i+o[s]]].dot3(e-1,t,r),w=a[n+1+o[i+o[s+1]]].dot3(e-1,t,r-1),E=a[n+1+o[i+1+o[s]]].dot3(e-1,t-1,r),m=a[n+1+o[i+1+o[s+1]]].dot3(e-1,t-1,r-1),y=u(e),g=u(t),v=u(r);return c(c(c(d,f,y),c(h,w,y),v),c(c(l,E,y),c(p,m,y),v),g)}}(this)},function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n);const o={green:65280,blue:255};class a{constructor(){this.group=new THREE.Group,this.lithosphere=s(1,4,!0,o.green),this.hydrosphere=s(1,3,!1,o.blue),this.group.add(this.lithosphere),this.group.add(this.hydrosphere)}update(){this.group.rotation.y+=.01}}function s(e,t,r,n){i.a.seed(Math.random());let o=new THREE.IcosahedronGeometry(1,t);o.vertices.forEach(t=>{let n=e;r&&(n=e+i.a.simplex3(t.x,t.y,t.z)/10),t.x*=n,t.y*=n,t.z*=n});const a=new THREE.MeshPhysicalMaterial({color:n,roughness:1});return new THREE.Mesh(o,a)}class d{constructor(){!1===WEBGL.isWebGLAvailable()&&document.body.appendChild(WEBGL.getWebGLErrorMessage()),this.sceneSky=new THREE.Scene,this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1e3),this.cameraSky=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1e3),this.camera.position.set(0,0,5);const e=new THREE.DirectionalLight(16777215,.5);this.scene.add(e);const t=function(e){let t=(new THREE.TextureLoader).load(e);t.mapping=THREE.EquirectangularReflectionMapping,t.magFilter=THREE.LinearFilter,t.minFilter=THREE.LinearMipMapLinearFilter,t.encoding=THREE.sRGBEncoding;let r=THREE.ShaderLib.equirect,n=new THREE.ShaderMaterial({fragmentShader:r.fragmentShader,vertexShader:r.vertexShader,uniforms:r.uniforms,depthWrite:!1,side:THREE.BackSide});return n.uniforms.tEquirect.value=t,Object.defineProperty(n,"map",{get:function(){return this.uniforms.tEquirect.value}}),new THREE.Mesh(new THREE.IcosahedronBufferGeometry(100,2),n)}("textures/skybox/starmap.jpg");this.sceneSky.add(t),this.renderer=new THREE.WebGLRenderer,this.renderer.autoClear=!1,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.renderer.gammaOutput=!0,this.controls=new THREE.OrbitControls(this.camera),this.planet=new a,this.scene.add(this.planet.group),window.addEventListener("resize",()=>{this.resize()})}update(){requestAnimationFrame(()=>{this.update()}),this.planet.update(),this.camera.lookAt(this.scene.position),this.cameraSky.rotation.copy(this.camera.rotation),this.renderer.render(this.sceneSky,this.cameraSky),this.renderer.render(this.scene,this.camera)}resize(){let e=window.innerWidth/window.innerHeight;this.camera.aspect=e,this.camera.updateProjectionMatrix(),this.cameraSky.aspect=e,this.cameraSky.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}window.addEventListener("load",()=>{(new d).update()})}]);