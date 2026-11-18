import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = (id)=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=(a,b)=>a+Math.random()*(b-a);
const pi=Math.PI;
const SKEY='ugn-tank-v1';
const species=[
 ['Clownfish','reef','🐠','#ff8d35',.75,'A cheerful resident that enjoys exploring a coral garden.'],
 ['Blue Tang','reef','🐟','#278fee',.92,'An energetic blue explorer with a sunny yellow tail.'],
 ['Yellow Tang','reef','🐠','#ffe263',.89,'A glowing yellow fish that loves open swimming lanes.'],
 ['Royal Gramma','reef','🐟','#aa69e6',.67,'A tiny jewel of violet and gold.'],
 ['Copperband Butterflyfish','reef','🐠','#efbd6d',.89,'An elegant glider with striking narrow bands.'],
 ['Flame Angelfish','reef','🐠','#f65e40',.8,'A vivid coral-red visitor with a lively personality.'],
 ['Mandarinfish','reef','🐟','#46d6a1',.61,'A tiny painterly fish with flowing fins.'],
 ['Banggai Cardinalfish','reef','🐠','#e7e3c8',.72,'A slow, graceful drifter with long spines.'],
 ['Foxface Rabbitfish','reef','🐠','#eceb83',.9,'A bold tropical fish with a dark face.'],
 ['Moorish Idol','reef','🐠','#faf5cb',.92,'A striking striped silhouette with long fins.'],
 ['Chromis','reef','🐟','#60cddc',.54,'A peaceful little fish that sparkles as it turns.'],
 ['Firefish Goby','reef','🐟','#f88b84',.55,'An elegant darting fish with a bright tail.'],
 ['Bicolor Blenny','reef','🐟','#efb25f',.52,'A curious little fish that likes exploring rocks.'],
 ['Green Wrasse','reef','🐟','#89df88',.7,'An agile emerald swimmer.'],
 ['Purple Tang','reef','🐠','#7b75e8',.9,'A vibrant violet reef fish.'],
 ['Emperor Angelfish','reef','🐠','#5c9ef1',1.07,'A stately patterned angelfish.'],
 ['Neon Tetra','fresh','🐟','#39d1f2',.36,'A tiny freshwater flash of electric blue.'],
 ['Cardinal Tetra','fresh','🐟','#4f94f9',.38,'A brilliant schooling fish with a crimson stripe.'],
 ['Guppy','fresh','🐟','#f5a2be',.42,'A colorful little dancer with a flowing tail.'],
 ['Betta','fresh','🐠','#be73ec',.72,'An elegant fish with beautiful sweeping fins.'],
 ['Goldfish','fresh','🐠','#ffba4c',.85,'A timeless golden aquarium companion.'],
 ['Koi','fresh','🐟','#f7ebdc',1.2,'A floating work of art in white and orange.'],
 ['Discus','fresh','🐠','#71c3ef',.95,'A calm, round-bodied jewel of freshwater.'],
 ['Angelfish','fresh','🐠','#d0d5ee',1.0,'A graceful fish with tall delicate fins.'],
 ['Cory Catfish','fresh','🐟','#b9aa83',.48,'A charming bottom-dwelling explorer.'],
 ['Otocinclus','fresh','🐟','#abbd91',.36,'A tiny algae-grazing catfish.'],
 ['Zebra Danio','fresh','🐟','#a8cae9',.5,'A quick silver-blue schooling fish.'],
 ['Cherry Barb','fresh','🐠','#d5556d',.46,'A sparkling ruby-red freshwater fish.'],
 ['Harlequin Rasbora','fresh','🐟','#ecb789',.5,'A coppery little schooling fish.'],
 ['Rainbowfish','fresh','🐟','#5fe0cf',.78,'An iridescent fish that glimmers in the light.'],
 ['Pearl Gourami','fresh','🐠','#d8bde0',.9,'A slow and beautiful labyrinth fish.'],
 ['Dwarf Gourami','fresh','🐠','#ef9479',.7,'A jewel-toned peaceful glider.'],
 ['Bala Shark','fresh','🦈','#c9d9e6',1.2,'A sleek silver freshwater swimmer.'],
 ['Axolotl','special','🦎','#f3abc6',.8,'An adorable amphibian with feathery external gills.'],
 ['Seahorse','special','🪸','#efb96e',.7,'A tiny upright drift through the water.'],
 ['Leafy Sea Dragon','special','🐉','#98c887',1.0,'A fantastical leaf-shaped ocean wanderer.'],
 ['Moon Jellyfish','invert','🪼','#bacbf9',1.0,'A translucent moon drifting through the blue.'],
 ['Blue Jellyfish','invert','🪼','#6fdaf6',.95,'A softly pulsing bell of underwater light.'],
 ['Crystal Jellyfish','invert','🪼','#b3f9ef',.85,'A delicate transparent ocean lantern.'],
 ['Octopus','invert','🐙','#bd7cb7',1.0,'An intelligent eight-armed resident.'],
 ['Cuttlefish','invert','🦑','#d7a1bd',.85,'A fascinating creature with shifting colors.'],
 ['Squid','invert','🦑','#e8b3ad',.88,'An elegant darting cephalopod.'],
 ['Starfish','invert','⭐','#ffaf72',.56,'A calm resident of the sea floor.'],
 ['Blue Starfish','invert','⭐','#659df6',.54,'A brilliant star resting between the rocks.'],
 ['Sea Urchin','invert','🦔','#9b81d5',.48,'A spiny little sculpture on the sea bed.'],
 ['Cleaner Shrimp','invert','🦐','#edac9a',.42,'A tiny long-antennaed cleaner.'],
 ['Ghost Shrimp','invert','🦐','#b9d8cd',.39,'A translucent little crustacean.'],
 ['Hermit Crab','invert','🦀','#d7a583',.48,'A wandering shell with curious claws.'],
 ['Fiddler Crab','invert','🦀','#e89370',.53,'A charming claw-waving resident.'],
 ['Nerite Snail','invert','🐚','#d6c4a2',.38,'A tiny slow-moving spiral shell.'],
 ['Sea Turtle','ocean','🐢','#8cc7a2',1.45,'A gentle flipper-powered ocean traveller.'],
 ['Manta Ray','ocean','🦈','#7a9cb8',1.6,'An elegant underwater wing gliding effortlessly.'],
 ['Stingray','ocean','🦈','#b2a28b',1.28,'A silky swimmer that floats above the seabed.'],
 ['Reef Shark','ocean','🦈','#9ab8c7',1.6,'A smooth powerful silhouette in the open water.'],
 ['Hammerhead Shark','ocean','🦈','#9db2bf',1.62,'An unmistakable ocean explorer.'],
 ['Whale Shark','ocean','🦈','#718eac',1.85,'A magnificent spotted gentle giant, scaled for display.'],
 ['Dolphin','ocean','🐬','#9cc6d9',1.58,'A playful and athletic marine mammal.'],
 ['Orca','ocean','🐋','#c8dee7',1.9,'A striking black-and-white ocean icon.'],
 ['Sunfish','ocean','🐟','#b9bdb0',1.6,'A huge and fascinating disc-shaped fish.'],
 ['Lionfish','ocean','🐠','#ed9f82',1.1,'A mesmerizing display of striped fin rays.'],
 ['Pufferfish','ocean','🐡','#f2d484',.93,'An adorably round swimmer.'],
 ['Porcupinefish','ocean','🐡','#e9ca92',1.0,'A curious spiky little globe.'],
 ['Moray Eel','ocean','🐍','#9da780',1.05,'A winding serpent-like reef resident.']
].map((s,i)=>({id:'s'+i,name:s[0],cat:s[1],icon:s[2],color:s[3],size:s[4],desc:s[5]}));
const decors=[
 {id:'coral',name:'Branch coral',icon:'🪸',desc:'A living-looking branching reef sculpture.'},
 {id:'fan',name:'Sea fan',icon:'🌿',desc:'A delicate waving fan-shaped coral.'},
 {id:'kelp',name:'Tall kelp',icon:'🌱',desc:'A forest of swaying aquatic leaves.'},
 {id:'grass',name:'Seagrass',icon:'🌾',desc:'Fine blades of underwater greenery.'},
 {id:'anemone',name:'Anemone',icon:'🌸',desc:'Soft tentacles sway with the current.'},
 {id:'rock',name:'Stone cluster',icon:'🪨',desc:'Natural-looking layered aquarium rock.'},
 {id:'arch',name:'Stone arch',icon:'🗿',desc:'A scenic shelter to swim through.'},
 {id:'driftwood',name:'Driftwood',icon:'🪵',desc:'A twisted weathered piece of natural wood.'},
 {id:'shell',name:'Giant shell',icon:'🐚',desc:'A pearlescent shell on the ocean floor.'},
 {id:'ruins',name:'Ancient ruins',icon:'🏛️',desc:'A small lost temple beneath the surface.'},
 {id:'castle',name:'Mini castle',icon:'🏰',desc:'A playful piece of sunken fantasy.'},
 {id:'treasure',name:'Treasure chest',icon:'🧰',desc:'A glittering secret among the stones.'},
 {id:'crystal',name:'Crystal cluster',icon:'💎',desc:'A softly glowing mineral formation.'},
 {id:'mushroom',name:'Sea mushrooms',icon:'🍄',desc:'A colorful fantasy reef garden.'}
];
const moods=[
 {id:'daylight',name:'Tropical daylight',icon:'☀️',light:'#81e8ff',sun:85,time:13,back:'lagoon'},
 {id:'sunset',name:'Golden hour',icon:'🌅',light:'#f9b18b',sun:70,time:18,back:'reef'},
 {id:'moon',name:'Moonlit ocean',icon:'🌙',light:'#718ef9',sun:26,time:23,back:'abyss'},
 {id:'dream',name:'Dream lagoon',icon:'✨',light:'#b690ff',sun:62,time:16,back:'violet'},
 {id:'deep',name:'Deep sea',icon:'🌌',light:'#4589dc',sun:14,time:2,back:'abyss'},
 {id:'forest',name:'Emerald twilight',icon:'🌿',light:'#8beac6',sun:47,time:17,back:'kelp'}
];
const presets=[
 {id:'lagoon',name:'Azure Sanctuary',icon:'🏝️',shape:'classic',back:'lagoon',sub:'sand',mood:'daylight',life:['Clownfish','Blue Tang','Yellow Tang','Royal Gramma','Chromis','Sea Turtle'],dec:['coral','coral','rock','kelp','anemone','fan','shell','coral']},
 {id:'reef',name:'Coral Kingdom',icon:'🪸',shape:'panorama',back:'reef',sub:'gold',mood:'sunset',life:['Clownfish','Clownfish','Mandarinfish','Emperor Angelfish','Purple Tang','Moorish Idol','Moon Jellyfish'],dec:['coral','coral','coral','fan','anemone','arch','crystal','grass']},
 {id:'river',name:'River Garden',icon:'🌿',shape:'classic',back:'kelp',sub:'gravel',mood:'forest',life:['Neon Tetra','Neon Tetra','Neon Tetra','Guppy','Discus','Cory Catfish','Axolotl'],dec:['kelp','grass','grass','driftwood','rock','rock','fan']},
 {id:'midnight',name:'Midnight Abyss',icon:'🌙',shape:'tower',back:'abyss',sub:'black',mood:'deep',life:['Moon Jellyfish','Blue Jellyfish','Crystal Jellyfish','Manta Ray','Seahorse'],dec:['crystal','crystal','rock','anemone','coral']},
 {id:'fantasy',name:'Celestial Sea',icon:'💜',shape:'cube',back:'violet',sub:'pink',mood:'dream',life:['Betta','Leafy Sea Dragon','Seahorse','Octopus','Crystal Jellyfish'],dec:['crystal','mushroom','arch','fan','anemone','ruins']}
];
const defaultState=()=>({name:'The Azure Sanctuary',shape:'classic',scale:100,substrate:'sand',background:'lagoon',plantDensity:58,rockDensity:55,waterColor:'#38b9ce',clarity:82,bubbles:50,current:30,swimSpeed:55,glass:true,bubbleVisible:true,particles:true,caustics:true,sun:76,lightColor:'#81e8ff',daytime:14,autoday:false,sound:false,autoOrbit:false,reducedMotion:false,quality:'auto',mood:'daylight',life:[],decor:[]});
let state=defaultState(), saved=localStorage.getItem(SKEY);
try{if(saved){const data=JSON.parse(saved);state={...state,...data};state.life=Array.isArray(data.life)?data.life.slice(0,130):[];state.decor=Array.isArray(data.decor)?data.decor.slice(0,160):[]}}catch{console.warn('A saved tank was not readable.');}
let nextId=1;for(const o of [...state.life,...state.decor]){if(Number.isFinite(o.uid))nextId=Math.max(nextId,o.uid+1)}
const toast=(message)=>{const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2700)};
const persist=()=>{try{localStorage.setItem(SKEY,JSON.stringify(state))}catch{toast('Storage is full. Export your tank to keep a copy.')}};
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.1,110);camera.position.set(0,3.15,17);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
$('scene').appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.dampingFactor=.055;controls.enablePan=false;controls.minDistance=5;controls.maxDistance=29;controls.minPolarAngle=.37;controls.maxPolarAngle=pi-.2;controls.target.set(0,1.95,0);controls.update();
const ambient=new THREE.HemisphereLight(0x9fefff,0x10212a,1.35);scene.add(ambient);
const key=new THREE.DirectionalLight(0xc8f5ff,3.0);key.position.set(-3,11,6);scene.add(key);
const fill=new THREE.PointLight(0x59c9ec,24,22);fill.position.set(3,5,3);scene.add(fill);
const decorRoot=new THREE.Group(),lifeRoot=new THREE.Group(),bubbleRoot=new THREE.Group(),particleRoot=new THREE.Group(),tankRoot=new THREE.Group();scene.add(tankRoot);tankRoot.add(decorRoot,lifeRoot,bubbleRoot,particleRoot);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:0x06141d,roughness:1}));floor.rotation.x=-pi/2;floor.position.y=-.29;scene.add(floor);
const stage=new THREE.Mesh(new THREE.CylinderGeometry(5.5,5.9,.3,64),new THREE.MeshStandardMaterial({color:0x102a32,metalness:.64,roughness:.31}));stage.position.y=-.17;scene.add(stage);
let bounds={w:9,h:5.25,d:4.4};let fishModels=[],decorModels=[],bubbles=[],particles=[],clickables=[],tankShell=new THREE.Group();tankRoot.add(tankShell);
const geoCache=new Map();
const sphere=(r=1,w=16,h=12)=>new THREE.SphereGeometry(r,w,h);
const mat=(color,roughness=.65,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness,side:THREE.DoubleSide});
const mbox=(w,h,d,c)=>new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));
const mesh=(geometry,material,parent,position=[0,0,0])=>{const o=new THREE.Mesh(geometry,material);o.position.set(...position);parent.add(o);return o};
const color=(v)=>new THREE.Color(v);
const tint=(base,mult)=>new THREE.Color(base).multiplyScalar(mult);
const randomSeed=(n)=>{const x=Math.sin(n*127.1+31.7)*43758.5453;return x-Math.floor(x)};
const shapeDims=()=>{const shape=state.shape;let w=9,h=5.25,d=4.4;if(shape==='panorama'){w=12.1;h=4.5;d=3.65}if(shape==='tower'){w=5.3;h=7.1;d=4.3}if(shape==='cube'){w=6.4;h=6.2;d=5.6}const f=state.scale/100;return {w:w*f,h:h*f,d:d*f}};
const innerPoint=(bottom=false)=>[rnd(-bounds.w*.39,bounds.w*.39),bottom?.18:rnd(.65,bounds.h-.48),rnd(-bounds.d*.35,bounds.d*.35)];
function clearGroup(g){while(g.children.length){const c=g.children[0];g.remove(c);c.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>{if(m.dispose)m.dispose()})}})}}
function buildTank(){
 bounds=shapeDims();clearGroup(tankShell);const {w,h,d}=bounds;
 const baseColor={sand:'#d9cfad',gold:'#c8a472',gravel:'#7c8580',black:'#31373f',pink:'#ca9aa1'}[state.substrate]||'#d9cfad';
 const sand=mbox(w-.12,.22,d-.12,baseColor);sand.position.y=.11;sand.material.roughness=1;tankShell.add(sand);
 const sandTop=mesh(new THREE.PlaneGeometry(w-.13,d-.13),mat(baseColor,1),tankShell,[0,.228,0]);sandTop.rotation.x=-pi/2;
 const black=mat('#10232d',.32,.65);
 for(const y of [.02,h]){const upper=(y===h);const yy=upper?h+.035:-.035;for(const z of [-d/2,d/2]){const r=mbox(w+.1,.095,.10,'#19353e');r.position.set(0,yy,z);r.material=black;tankShell.add(r)}for(const x of [-w/2,w/2]){const r=mbox(.1,.095,d+.1,'#19353e');r.position.set(x,yy,0);r.material=black;tankShell.add(r)}}
 const edgeMat=new THREE.MeshStandardMaterial({color:0x3a6672,roughness:.22,metalness:.65});
 for(const x of [-w/2,w/2])for(const z of [-d/2,d/2]){const bar=mesh(new THREE.BoxGeometry(.07,h+.12,.07),edgeMat,tankShell,[x,h/2,z]);}
 const backcolors={lagoon:'#0b5464',abyss:'#071526',reef:'#12436a',kelp:'#0e413b',violet:'#2b234f'};
 scene.background=new THREE.Color(backcolors[state.background]||backcolors.lagoon);
 scene.fog=new THREE.FogExp2(scene.background,.0135);
 const back=mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({color:backcolors[state.background]||backcolors.lagoon,side:THREE.DoubleSide}),tankShell,[0,h/2,-d/2+.015]);back.geometry.dispose();back.geometry=new THREE.PlaneGeometry(w,h);
 const wm=new THREE.MeshPhysicalMaterial({color:state.waterColor,transparent:true,opacity:.045+((100-state.clarity)/100)*.09,roughness:.07,metalness:0,depthWrite:false,side:THREE.DoubleSide});
 const front=mesh(new THREE.PlaneGeometry(w-.05,h-.08),wm,tankShell,[0,h/2,d/2]);front.visible=state.glass;
 const left=mesh(new THREE.PlaneGeometry(d,h),wm.clone(),tankShell,[-w/2,h/2,0]);left.rotation.y=pi/2;left.visible=state.glass;
 const right=mesh(new THREE.PlaneGeometry(d,h),wm.clone(),tankShell,[w/2,h/2,0]);right.rotation.y=pi/2;right.visible=state.glass;
 const surface=mesh(new THREE.PlaneGeometry(w-.11,d-.11,12,8),new THREE.MeshPhysicalMaterial({color:state.waterColor,transparent:true,opacity:.22,roughness:.16,metalness:.15,depthWrite:false,side:THREE.DoubleSide}),tankShell,[0,h-.08,0]);surface.rotation.x=-pi/2;surface.userData.isSurface=true;
 // Subtle reflective streaks and physical-looking water column.
 const glow=mesh(new THREE.PlaneGeometry(w*.75,h*.62),new THREE.MeshBasicMaterial({color:state.lightColor,transparent:true,opacity:.055,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}),tankShell,[0,h*.60,-d/2+.025]);glow.userData.glow=true;
 tankShell.userData={surface,front,left,right,wm,glow};
 stage.scale.set(Math.max(.8,w/10),1,Math.max(.8,d/4.8));
 controls.target.set(0,h*.46,0);controls.maxDistance=Math.max(23,w*2.5);controls.minDistance=Math.max(3.9,d*.8);
 camera.position.set(0,h*.56,Math.max(14,w*1.8));controls.update();
}
function nodeDecor(it,p,scale=1){
 const g=new THREE.Group();g.position.set(...p);g.scale.setScalar(scale);g.userData={uid:it.uid,kind:'decor',type:it.type};decorRoot.add(g);
 const type=it.type,variation=it.uid*3.213;
 const mineral=mat(['#506a68','#778380','#686e76','#556b79'][it.uid%4],1),coral=mat(['#d89193','#dca97b','#e6caa6','#a789bf','#88c5b3'][it.uid%5]),leaf=mat(['#438c72','#397865','#5eaa86','#648c65'][it.uid%4]),wood=mat('#795745',.95);
 const makeRock=(x,y,z,s=1)=>{const r=mesh(new THREE.DodecahedronGeometry(s,1),mineral,g,[x,y,z]);r.scale.set(rnd(.65,1.4),rnd(.44,.85),rnd(.62,1.25));r.rotation.set(rnd(0,2),rnd(0,2),rnd(0,2));return r};
 const stem=(a,b,r,m)=>{const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),diff=B.clone().sub(A);const cylinder=mesh(new THREE.CylinderGeometry(r*.63,r,diff.length(),6),m,g,A.clone().add(B).multiplyScalar(.5).toArray());cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),diff.normalize());return cylinder};
 if(type==='rock'||type==='arch'){if(type==='rock'){for(let j=0;j<5;j++)makeRock(rnd(-.56,.56),rnd(.10,.38),rnd(-.45,.45),rnd(.25,.52))}else{for(let j=0;j<5;j++){makeRock(-.57, .18+j*.17,0,.3);makeRock(.57,.18+j*.17,0,.3)}for(let j=0;j<5;j++)makeRock(-.6+j*.3,1.14,0,.26)}}
 else if(type==='coral'||type==='crystal'){for(let i=0;i<8;i++){const a=i*pi*2/8+variation,r=rnd(.13,.49);const m=type==='crystal'?mat(['#8fd4f7','#c5a1f6','#75f0e5'][i%3],.22,.18):coral;const end=[Math.cos(a)*r,rnd(.55,1.35),Math.sin(a)*r];if(type==='crystal'){const c=mesh(new THREE.ConeGeometry(rnd(.13,.23),end[1],5),m,g,[end[0],end[1]/2,end[2]]);c.rotation.z=rnd(-.2,.2)}else{stem([0,.15,0],end,rnd(.055,.10),m);stem(end,[end[0]*1.45,end[1]+rnd(.15,.4),end[2]*1.25],.05,m)}}}
 else if(type==='kelp'||type==='grass'||type==='fan'){const num=type==='grass'?15:type==='kelp'?8:14;for(let j=0;j<num;j++){const x=rnd(-.55,.55),z=rnd(-.5,.5),h=type==='kelp'?rnd(1.1,2.6):type==='grass'?rnd(.3,.75):rnd(.6,1.5);const end=[x+rnd(-.20,.20),h,z];if(type==='fan'){stem([0,.07,0],end,.028,leaf);const ball=mesh(sphere(.09,7,6),leaf,g,end);ball.scale.set(.8,1.3,.55)}else{const blade=mesh(new THREE.ConeGeometry(type==='grass'?.048:.11,h,4),leaf,g,[x,h/2,z]);blade.rotation.z=rnd(-.23,.23);blade.userData.sway=rnd(0,7)}}}
 else if(type==='anemone'||type==='mushroom'){const base=mesh(sphere(.36),coral,g,[0,.18,0]);base.scale.y=.55;for(let j=0;j<15;j++){const a=j*2.399,r=rnd(.2,.42),h=rnd(.42,.8);const m=type==='mushroom'?coral:mat(['#c8abf0','#d8a5c0','#e4b5ad'][j%3]);stem([Math.cos(a)*r*.5,.2,Math.sin(a)*r*.5],[Math.cos(a)*r,h,Math.sin(a)*r],.04,m);const tip=mesh(sphere(type==='mushroom'?.15:.075,10,8),m,g,[Math.cos(a)*r,h,Math.sin(a)*r]);tip.scale.y=.45}}
 else if(type==='driftwood'){for(let j=0;j<5;j++){const p=[rnd(-.5,.5),.1,rnd(-.25,.25)],q=[rnd(-.8,.8),rnd(.6,1.7),rnd(-.4,.4)];stem(p,q,rnd(.08,.16),wood)}}
 else if(type==='shell'){const sh=mesh(sphere(.55,14,12),mat('#e1cfc0',.35),g,[0,.26,0]);sh.scale.set(1,.48,.67);for(let j=0;j<8;j++){const strip=mesh(new THREE.TorusGeometry(.26+j*.035,.015,5,25,pi*.95),mat('#c5b2a8'),g,[0,.33,.03]);strip.rotation.set(pi/2,0,j*.08)}}
 else if(type==='ruins'||type==='castle'){const stone=mat('#889995',.95);const floor=mesh(new THREE.BoxGeometry(1.3,.16,1.1),stone,g,[0,.08,0]);for(let j=0;j<4;j++){const x=j%2?-.47:.47,z=j<2?-.36:.36;const p=mesh(new THREE.CylinderGeometry(.1,.14,type==='castle'?1.18:.83,7),stone,g,[x,type==='castle'?.65:.47,z]);if(type==='castle'){const tip=mesh(new THREE.ConeGeometry(.17,.37,5),mat('#628397'),g,[x,1.4,z])}}if(type==='castle'){mesh(new THREE.BoxGeometry(1.05,.26,1.0),stone,g,[0,1.05,0])}else{const top=mesh(new THREE.BoxGeometry(1.26,.17,.4),stone,g,[0,.96,-.1])}}
 else if(type==='treasure'){const box=mesh(new THREE.BoxGeometry(.86,.43,.57),wood,g,[0,.26,0]);const lid=mesh(new THREE.BoxGeometry(.91,.14,.63),mat('#b39348',.35,.5),g,[0,.54,0]);const clasp=mesh(new THREE.BoxGeometry(.12,.3,.04),mat('#dabb60',.3,.6),g,[0,.42,.31])}
 g.rotation.y=Number.isFinite(it.rot)?it.rot:rnd(-pi,pi);g.traverse(o=>{if(o.isMesh)o.userData.owner=g});clickables.push(...g.children.filter(o=>o.isMesh));decorModels.push({g,it});return g;
}
function buildDecor(){
 clearGroup(decorRoot);decorModels=[];clickables=[];
 const countPlants=Math.floor(state.plantDensity/7),countRocks=Math.floor(state.rockDensity/12);
 for(let i=0;i<countPlants;i++){const type=i%4===0?'fan':i%3===0?'grass':'kelp';nodeDecor({uid:-1000-i,type},[rnd(-bounds.w*.43,bounds.w*.43),.2,rnd(-bounds.d*.40,bounds.d*.36)],rnd(.55,1.2))}
 for(let i=0;i<countRocks;i++){nodeDecor({uid:-2000-i,type:'rock'},[rnd(-bounds.w*.43,bounds.w*.43),.2,rnd(-bounds.d*.38,bounds.d*.34)],rnd(.55,1.4))}
 state.decor.forEach(it=>nodeDecor(it,[clamp(it.x,-.42,.42)*bounds.w,.21,clamp(it.z,-.40,.40)*bounds.d],it.scale||1));
}
function fin(g,shape,color,opacity=1){return mesh(shape,new THREE.MeshStandardMaterial({color,side:THREE.DoubleSide,transparent:opacity<1,opacity,roughness:.65}),g)}
function buildCreature(it){
 const spec=species.find(s=>s.id===it.sid);if(!spec)return;
 const g=new THREE.Group();const body=new THREE.Group();g.add(body);g.userData={kind:'life',uid:it.uid,sid:spec.id};
 const base=mat(spec.color,.46,.05),dark=mat(tint(spec.color,.7),.55),bright=mat(tint(spec.color,1.25),.46),white=mat('#f5faf5',.3),black=mat('#091b25',.15);
 const size=spec.size*clamp(Number(it.size)||1,.5,2.1),special=spec.name;
 // The animal faces toward +X. Rotation about Y follows its moving direction.
 if(spec.name.includes('Jellyfish')){
  const bell=mesh(new THREE.SphereGeometry(.42,20,12,0,pi*2,0,pi*.55),new THREE.MeshPhysicalMaterial({color:spec.color,transparent:true,opacity:.63,roughness:.12,metalness:.08,side:THREE.DoubleSide,emissive:spec.color,emissiveIntensity:.18}),body,[0,.1,0]);bell.scale.set(1,.7,1);
  for(let j=0;j<10;j++){const a=j*2*pi/10;const tent=mesh(new THREE.CylinderGeometry(.008,.024,rnd(.5,.85),5),bright,body,[Math.cos(a)*.28,-.32,Math.sin(a)*.28]);tent.rotation.z=Math.sin(a)*.12}body.rotation.z=.14;
 }else if(['Starfish','Blue Starfish'].includes(special)){
  for(let j=0;j<5;j++){const a=j*2*pi/5;const arm=mesh(new THREE.ConeGeometry(.17,.7,5),base,body,[Math.cos(a)*.25,0,Math.sin(a)*.25]);arm.rotation.z=pi/2-a;arm.rotation.x=pi/2;}mesh(sphere(.24),bright,body);
 }else if(['Sea Urchin'].includes(special)){
  mesh(sphere(.3),base,body);for(let j=0;j<35;j++){const v=new THREE.Vector3().setFromSphericalCoords(1,Math.acos(1-2*(j+.5)/35),j*2.399);const spike=mesh(new THREE.ConeGeometry(.044,.4,4),dark,body,v.clone().multiplyScalar(.35).toArray());spike.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v)}
 }else if(['Octopus','Cuttlefish','Squid'].includes(special)){
  const head=mesh(sphere(.41),base,body,[.05,.22,0]);head.scale.set(1.0,1.1,.8);for(let j=0;j<8;j++){const a=j*2*pi/8;const arm=mesh(new THREE.CylinderGeometry(.037,.085,.68,6),base,body,[Math.cos(a)*.31,-.36,Math.sin(a)*.31]);arm.rotation.z=Math.sin(a)*.38;arm.rotation.x=Math.cos(a)*.35}
  for(const z of [-.24,.24])mesh(sphere(.062,10,8),black,body,[.27,.30,z]);
 }else if(['Nerite Snail','Hermit Crab','Fiddler Crab','Cleaner Shrimp','Ghost Shrimp'].includes(special)){
  const shell=mesh(sphere(.35),base,body,[0,.12,0]);shell.scale.set(1.1,.7,.8);for(let j=0;j<6;j++){const leg=mesh(new THREE.CylinderGeometry(.015,.028,.32,5),dark,body,[j%2?.18:-.18,-.12,((j/2|0)-1)*.19]);leg.rotation.x=j%2?.45:-.45}for(const z of [-.17,.17])mesh(sphere(.045),black,body,[.32,.18,z]);
 }else if(['Sea Turtle','Axolotl'].includes(special)){
  const b=mesh(sphere(.54),base,body);b.scale.set(1.2,.45,.8);const head=mesh(sphere(.22),bright,body,[.62,0,0]);for(const a of [-1,1])for(const z of [-1,1]){const flipper=mesh(sphere(.28),bright,body,[a*.28,-.1,z*.42]);flipper.scale.set(1.2,.15,.55)}mesh(sphere(.055),black,body,[.77,.07,.18]);
 }else if(['Manta Ray','Stingray'].includes(special)){
  const b=mesh(sphere(.42),base,body,[0,0,0]);b.scale.set(1.15,.20,1.4);for(const s of [-1,1]){const wing=fin(body,new THREE.ConeGeometry(.35,1.12,3),base.color);wing.position.z=s*.67;wing.rotation.x=s*pi/2}const tail=mesh(new THREE.ConeGeometry(.045,1.5,5),dark,body,[-.9,0,0]);tail.rotation.z=pi/2;
 }else if(['Seahorse','Leafy Sea Dragon'].includes(special)){
  const b=mesh(sphere(.28),base,body,[0,0,0]);b.scale.set(.66,1.7,.6);const snout=mesh(sphere(.17),bright,body,[.20,.43,0]);snout.scale.x=1.65;const tail=mesh(new THREE.TorusGeometry(.24,.08,6,15,pi*1.5),dark,body,[-.16,-.54,0]);tail.rotation.z=.4;mesh(sphere(.037),black,body,[.24,.48,.12]);
  if(special==='Leafy Sea Dragon')for(let j=0;j<7;j++){const leaf=mesh(new THREE.ConeGeometry(.16,.5,4),bright,body,[rnd(-.2,.2),rnd(-.65,.65),rnd(-.15,.15)]);leaf.rotation.z=rnd(-1.6,1.6)}
 }else{
  const shark=['Reef Shark','Hammerhead Shark','Whale Shark','Dolphin','Orca'].includes(special);
  const round=['Goldfish','Discus','Pufferfish','Porcupinefish','Sunfish'].includes(special);
  const b=mesh(sphere(.46,22,14),base,body);
  b.scale.set(round?.96:1.55,round?1.04:.68,.55);
  if(shark)b.scale.set(1.94,.65,.55);
  const tail=fin(body,new THREE.ConeGeometry(.32,.72,3),base.color);tail.position.set(shark?-.95:-.73,0,0);tail.rotation.set(0,0,-pi/2);tail.userData.tail=true;
  const dorsal=fin(body,new THREE.ConeGeometry(.24,.50,3),dark.color);dorsal.position.set(-.10,.39,0);dorsal.rotation.z=shark?-.3:.12;
  for(const z of [-.23,.23]){const eye=mesh(sphere(.062,12,10),white,body,[.47,.15,z]);eye.scale.set(1.0,1,.43);mesh(sphere(.032,9,7),black,body,[.49,.15,z+(z>0?.055:-.055)])}
  for(const z of [-.30,.30]){const side=fin(body,new THREE.ConeGeometry(.16,.40,3),bright.color);side.position.set(-.15,-.18,z);side.rotation.x=z>0?-pi/2:pi/2}
  if(shark){const finTop=fin(body,new THREE.ConeGeometry(.29,.66,3),base.color);finTop.position.set(-.13,.49,0)}
  if(special==='Orca'){mesh(sphere(.18),white,body,[.12,-.22,.0]).scale.set(2.5,.38,1.75)}
  if(special==='Clownfish'||special==='Moorish Idol'||special==='Banggai Cardinalfish'){for(const x of [-.30,.11,.42]){const band=mesh(new THREE.CylinderGeometry(.345,.345,.09,16),white,body,[x,0,0]);band.rotation.z=pi/2;band.scale.z=.78}}
  if(special==='Neon Tetra'||special==='Cardinal Tetra'||special==='Zebra Danio'){const stripe=mesh(new THREE.BoxGeometry(.85,.04,.04),mat('#6df9ef',.25),body,[0,.11,.33]);}
  if(special==='Pufferfish'||special==='Porcupinefish'){for(let j=0;j<17;j++){const v=new THREE.Vector3().setFromSphericalCoords(.44,Math.acos(1-2*(j+.5)/17),j*2.399);const sp=mesh(new THREE.ConeGeometry(.035,.13,4),bright,body,v.toArray());sp.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.clone().normalize())}}
 }
 body.scale.setScalar(size*.63);g.position.set(Number.isFinite(it.x)?it.x:0,Number.isFinite(it.y)?it.y:2,Number.isFinite(it.z)?it.z:0);
 g.traverse(o=>{if(o.isMesh){o.userData.owner=g;clickables.push(o)}});
 lifeRoot.add(g);
 const phase=rnd(0,2*pi),speed=rnd(.24,.54),angle=rnd(0,2*pi),radius=rnd(.35,.95);
 const item={g,body,it,spec,phase,speed,angle,radius,y0:g.position.y,dir:1,feed:0,age:0};fishModels.push(item);return item;
}
function buildLife(){
 clearGroup(lifeRoot);fishModels=[];state.life.forEach(it=>buildCreature({...it,x:clamp(Number(it.x)||0,-bounds.w*.4,bounds.w*.4),y:clamp(Number(it.y)||1.5,.55,bounds.h-.55),z:clamp(Number(it.z)||0,-bounds.d*.38,bounds.d*.38)}));
}
function rebuildBubbles(){
 clearGroup(bubbleRoot);bubbles=[];const n=state.bubbleVisible?Math.ceil(state.bubbles*1.3):0;
 const bubbleMat=new THREE.MeshPhysicalMaterial({color:0xb5faff,transparent:true,opacity:.32,roughness:.04,metalness:.16,depthWrite:false});
 const geom=sphere(.055,8,6);
 for(let i=0;i<n;i++){const r=rnd(.55,1.25),x=(i%3-1)*bounds.w*.29+rnd(-.18,.18),y=rnd(.3,bounds.h-.2),z=-bounds.d*.20+rnd(-.45,.45);const o=mesh(geom,bubbleMat,bubbleRoot,[x,y,z]);o.scale.setScalar(r);bubbles.push({o,x,z,speed:rnd(.3,.8),phase:rnd(0,pi*2)})}
 clearGroup(particleRoot);particles=[];
 if(state.particles){const geometry=new THREE.BufferGeometry(),pts=[];for(let i=0;i<200;i++){pts.push(rnd(-bounds.w*.48,bounds.w*.48),rnd(.23,bounds.h-.12),rnd(-bounds.d*.45,bounds.d*.45))}geometry.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));const points=new THREE.Points(geometry,new THREE.PointsMaterial({color:0xbaf5ed,size:.025,transparent:true,opacity:.43,depthWrite:false}));particleRoot.add(points);particles.push(points)}
}
function configureLight(){
 const time=Number(state.daytime),cycle=Math.max(0,Math.sin(((time-6)/24)*2*pi));
 const strength=Number(state.sun)/100;key.intensity=.28+strength*(.9+2.25*cycle);ambient.intensity=.65+strength*(.8+.9*cycle);
 fill.color.set(state.lightColor);fill.intensity=6+strength*25;
 tankShell.userData.glow?.material.color.set(state.lightColor);
 tankShell.userData.glow?.material&&(tankShell.userData.glow.material.opacity=.018+strength*.075);
 scene.background.set({lagoon:'#0b5464',abyss:'#071526',reef:'#12436a',kelp:'#0e413b',violet:'#2b234f'}[state.background]||'#0b5464').multiplyScalar(.52+.55*strength);
 scene.fog.color.copy(scene.background);
 if(tankShell.userData.surface){tankShell.userData.surface.material.color.set(state.waterColor);tankShell.userData.surface.material.opacity=.13+(100-state.clarity)*.002;}
 if(tankShell.userData.front){for(const o of [tankShell.userData.front,tankShell.userData.left,tankShell.userData.right]){o.visible=state.glass;o.material.color.set(state.waterColor);o.material.opacity=.035+(100-state.clarity)*.0017}}
}
function rebuildAll(){buildTank();buildDecor();buildLife();rebuildBubbles();configureLight();refreshResidents();updateStats();persist()}
function makeAnimal(sid,qty=1,save=true){
 const spec=species.find(s=>s.id===sid);if(!spec)return;
 if(state.life.length+qty>110){toast('Creature limit reached. Remove some residents first.');return;}
 for(let i=0;i<qty;i++){const p=innerPoint();const it={uid:nextId++,sid,x:p[0],y:p[1],z:p[2],size:1};state.life.push(it);buildCreature(it)}
 if(save){refreshResidents();updateStats();persist();toast(spec.name+' welcomed to your sanctuary')}
}
function addDecor(type,qty=1,save=true){if(state.decor.length+qty>150){toast('Decoration limit reached');return}const d=decors.find(d=>d.id===type);if(!d)return;
 for(let i=0;i<qty;i++){const it={uid:nextId++,type,x:rnd(-.34,.34),z:rnd(-.31,.31),scale:rnd(.75,1.22),rot:rnd(-pi,pi)};state.decor.push(it);nodeDecor(it,[it.x*bounds.w,.22,it.z*bounds.d],it.scale)}
 if(save){updateStats();persist();toast(d.name+' added')}
}
function applyPreset(id,confirmReplace=true){
 const p=presets.find(p=>p.id===id);if(!p)return;
 if(confirmReplace&&!confirm('Replace the current aquarium with '+p.name+'? Export your current tank first if you want to keep it.'))return;
 const m=moods.find(x=>x.id===p.mood);state={...defaultState(),name:'The '+p.name,shape:p.shape,substrate:p.sub,background:p.back,mood:p.mood,lightColor:m.light,sun:m.sun,daytime:m.time,life:[],decor:[]};
 p.life.forEach(name=>{const s=species.find(s=>s.name===name);if(s){const pt=innerPoint();state.life.push({uid:nextId++,sid:s.id,x:rnd(-2,2),y:rnd(.8,3.8),z:rnd(-1.2,1.2),size:1})}});
 p.dec.forEach(type=>state.decor.push({uid:nextId++,type,x:rnd(-.38,.38),z:rnd(-.35,.35),rot:rnd(-pi,pi),scale:rnd(.72,1.2)}));
 syncUI();rebuildAll();toast(p.name+' has come to life');
}
function refreshResidents(){
 const el=$('residents');el.replaceChildren();$('population-note').textContent=state.life.length+' inhabitants';
 if(!state.life.length){el.innerHTML='<p class="hint">Your sanctuary is quiet. Add your first aquatic resident above.</p>';return}
 for(const it of state.life.slice().reverse()){const s=species.find(x=>x.id===it.sid);if(!s)continue;const d=document.createElement('div');d.className='live-item';const ic=document.createElement('span');ic.textContent=s.icon;const name=document.createElement('b');name.textContent=s.name;const view=document.createElement('button');view.textContent='View';view.setAttribute('aria-label','Inspect '+s.name);view.onclick=()=>inspect('life',it.uid);const remove=document.createElement('button');remove.textContent='×';remove.setAttribute('aria-label','Remove '+s.name);remove.onclick=()=>removeItem('life',it.uid);d.append(ic,name,view,remove);el.appendChild(d)}
}
function updateStats(){$('stat-fish').textContent=state.life.length;$('stat-plants').textContent=state.decor.length+Math.floor(state.plantDensity/7);$('species-count').textContent=species.length+' species'}
function renderCatalog(){
 const term=$('species-search').value.toLowerCase().trim(),cat=$('species-category').value,c=$('species-catalog');c.replaceChildren();
 const matches=species.filter(s=>(cat==='all'||cat===s.cat)&&s.name.toLowerCase().includes(term));
 if(!matches.length){c.innerHTML='<p class="empty">No species match your search.</p>';return;}
 for(const s of matches){const b=document.createElement('button');b.className='item';b.title=s.desc;b.innerHTML='<span class="fish-icon">'+s.icon+'</span><strong></strong><small></small><span class="plus">+</span>';b.querySelector('strong').textContent=s.name;b.querySelector('small').textContent={fresh:'Freshwater',reef:'Coral reef',ocean:'Open ocean',invert:'Invertebrate',special:'Special life'}[s.cat];b.onclick=()=>makeAnimal(s.id);c.appendChild(b)}
}
function buildMenus(){
 const decorEl=$('decor-catalog');for(const d of decors){const b=document.createElement('button');b.className='tile';b.innerHTML='<span class="emoji">'+d.icon+'</span><b></b><small>+ Add to tank</small>';b.querySelector('b').textContent=d.name;b.onclick=()=>addDecor(d.id);decorEl.appendChild(b)}
 const moodEl=$('mood-catalog');for(const m of moods){const b=document.createElement('button');b.className='tile';b.innerHTML='<span class="emoji">'+m.icon+'</span><b></b><small>Lighting preset</small>';b.querySelector('b').textContent=m.name;b.dataset.mood=m.id;b.onclick=()=>{state.mood=m.id;state.lightColor=m.light;state.sun=m.sun;state.daytime=m.time;state.background=m.back;syncUI();buildTank();buildDecor();buildLife();rebuildBubbles();configureLight();persist();toast(m.name+' lighting applied')};moodEl.appendChild(b)}
 const presetEl=$('preset-catalog');for(const p of presets){const b=document.createElement('button');b.className='tile';b.innerHTML='<span class="emoji">'+p.icon+'</span><b></b><small>Load world</small>';b.querySelector('b').textContent=p.name;b.onclick=()=>applyPreset(p.id);presetEl.appendChild(b)}
 renderCatalog();updateStats();
}
const mapping=[
 ['tank-shape','shape','select'],['tank-scale','scale','number'],['substrate','substrate','select'],['background','background','select'],
 ['plant-density','plantDensity','number'],['rock-density','rockDensity','number'],['water-color','waterColor','color'],['water-opacity','clarity','number'],['bubbles','bubbles','number'],['current','current','number'],['swim-speed','swimSpeed','number'],
 ['show-glass','glass','bool'],['show-bubbles','bubbleVisible','bool'],['show-particles','particles','bool'],['show-caustics','caustics','bool'],
 ['sun-intensity','sun','number'],['light-color','lightColor','color'],['daytime','daytime','number'],['autoday','autoday','bool'],['sound-toggle','sound','bool'],['tank-name','name','text'],['quality','quality','select'],['auto-orbit','autoOrbit','bool'],['reduced-motion','reducedMotion','bool']
];
function syncUI(){
 for(const [id,key,type] of mapping){const el=$(id);if(!el)continue;if(type==='bool')el.checked=Boolean(state[key]);else el.value=state[key]}
 for(const [id] of mapping){const el=$(id),o=$(id+'-val');if(o){o.textContent=id==='daytime'?String(Math.floor(state.daytime)).padStart(2,'0')+':'+(state.daytime%1?'30':'00'):String(el.value)+'%'}}
 $('scene-title').textContent=state.name;$('dock-audio').textContent=state.sound?'♫ Sound on':'♫ Sound off';$('dock-audio').setAttribute('aria-pressed',state.sound);
 document.querySelectorAll('[data-mood]').forEach(b=>b.classList.toggle('active',b.dataset.mood===state.mood));applyQuality();
}
let audioContext,audioNodes=[];
function setAudio(on){if(on){if(!audioContext){try{audioContext=new (window.AudioContext||window.webkitAudioContext)();const buffer=audioContext.createBuffer(1,audioContext.sampleRate*2,audioContext.sampleRate),d=buffer.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const noise=audioContext.createBufferSource();noise.buffer=buffer;noise.loop=true;const low=audioContext.createBiquadFilter();low.type='lowpass';low.frequency.value=225;const gain=audioContext.createGain();gain.gain.value=.045;noise.connect(low);low.connect(gain);gain.connect(audioContext.destination);noise.start();audioNodes=[noise,low,gain]}catch{state.sound=false;toast('Ambient audio is unavailable in this browser')}}audioContext?.resume()}else{audioContext?.suspend()}syncUI()}
function applyQuality(){
 const q=state.quality,scale=q==='low'?1:q==='medium'?1.4:q==='high'?Math.min(devicePixelRatio,2):Math.min(devicePixelRatio,innerWidth<780?1.25:1.65);
 renderer.setPixelRatio(scale);renderer.setSize(innerWidth,innerHeight);
}
function bindControls(){
 document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('panel-'+b.dataset.tab).classList.add('active')});
 $('species-search').oninput=renderCatalog;$('species-category').onchange=renderCatalog;
 for(const [id,key,type] of mapping){const el=$(id);const refresh=()=>{state[key]=type==='bool'?el.checked:type==='number'?Number(el.value):el.value;if(key==='name'){$('scene-title').textContent=state.name||'Untitled Sanctuary';}const o=$(id+'-val');if(o)o.textContent=id==='daytime'?String(Math.floor(state.daytime)).padStart(2,'0')+':'+(state.daytime%1?'30':'00'):String(el.value)+'%';if(['shape','scale','substrate','background','plantDensity','rockDensity'].includes(key)){buildTank();buildDecor();buildLife();rebuildBubbles();configureLight()}else if(['bubbles','bubbleVisible','particles'].includes(key))rebuildBubbles();else if(['waterColor','clarity','glass','sun','lightColor','daytime'].includes(key))configureLight();if(key==='quality')applyQuality();if(key==='sound')setAudio(state.sound);persist()};el.addEventListener(type==='number'||type==='color'?'input':'change',refresh)}
 $('btn-save').onclick=()=>{persist();toast('Aquarium saved to this browser ✓')};$('feed-now').onclick=feed;$('dock-feed').onclick=feed;
 $('clear-life').onclick=()=>{if(!confirm('Remove all aquatic life from this tank?'))return;state.life=[];buildLife();refreshResidents();updateStats();persist();toast('Your aquarium is ready for new visitors')};
 $('dock-bubble').onclick=()=>{state.bubbleVisible=!state.bubbleVisible;$('show-bubbles').checked=state.bubbleVisible;rebuildBubbles();persist();toast(state.bubbleVisible?'Bubbles on':'Bubbles off')};
 $('dock-camera').onclick=$('reset-view').onclick=()=>{camera.position.set(0,bounds.h*.56,Math.max(14,bounds.w*1.8));controls.target.set(0,bounds.h*.46,0);controls.update();toast('View recentered')};
 $('pause').onclick=()=>{paused=!paused;$('pause').textContent=paused?'▶ Resume':'Ⅱ Pause';toast(paused?'Time paused':'Life continues')};
 $('dock-audio').onclick=()=>{state.sound=!state.sound;setAudio(state.sound);persist()};
 $('btn-photo').onclick=$('studio-photo').onclick=()=>{const hidden=[...document.querySelectorAll('.sidebar,.dock,.top,.mode-pill,.right-hint,#inspector,.sidebar-toggle,.copyright')];hidden.forEach(x=>x.style.visibility='hidden');renderer.render(scene,camera);try{const a=document.createElement('a');a.href=renderer.domElement.toDataURL('image/png');a.download='UGN-Tank-'+new Date().toISOString().slice(0,10)+'.png';a.click();toast('Aquarium image captured')}catch{toast('Screenshot failed on this device')}finally{hidden.forEach(x=>x.style.visibility='')}};
 $('btn-random').onclick=()=>applyPreset(presets[Math.floor(Math.random()*presets.length)].id);
 $('reset-all').onclick=()=>{if(confirm('Reset your aquarium and replace all its settings?'))applyPreset('lagoon',false)};
 $('export').onclick=()=>{const data={format:'UGN-Tank',version:1,exportedAt:new Date().toISOString(),aquarium:state};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='UGN-Tank-'+Date.now()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);toast('Aquarium exported ✓')};
 $('import').onclick=()=>$('import-file').click();
 $('import-file').onchange=async(e)=>{const f=e.target.files?.[0];if(!f)return;try{if(f.size>1000000)throw Error('File too large');const j=JSON.parse(await f.text());if(j.format!=='UGN-Tank'||j.version!==1||!j.aquarium||typeof j.aquarium!=='object'||!Array.isArray(j.aquarium.life)||!Array.isArray(j.aquarium.decor))throw Error('Invalid aquarium file');const a=j.aquarium;const base=defaultState();const allowedShapes=['classic','panorama','tower','cube'];const next={...base,...Object.fromEntries(Object.entries(base).filter(([k])=>!['life','decor'].includes(k)).map(([k,v])=>[k,typeof a[k]===typeof v?a[k]:v]))};next.shape=allowedShapes.includes(next.shape)?next.shape:base.shape;next.scale=clamp(next.scale,75,140);next.plantDensity=clamp(next.plantDensity,0,100);next.rockDensity=clamp(next.rockDensity,0,100);next.name=String(next.name).slice(0,42);next.life=a.life.slice(0,110).filter(o=>o&&species.some(s=>s.id===o.sid)).map(o=>({uid:nextId++,sid:o.sid,x:clamp(Number(o.x)||0,-4,4),y:clamp(Number(o.y)||1.2,.4,6),z:clamp(Number(o.z)||0,-2.5,2.5),size:clamp(Number(o.size)||1,.5,2.1)}));next.decor=a.decor.slice(0,150).filter(o=>o&&decors.some(d=>d.id===o.type)).map(o=>({uid:nextId++,type:o.type,x:clamp(Number(o.x)||0,-.42,.42),z:clamp(Number(o.z)||0,-.4,.4),rot:clamp(Number(o.rot)||0,-pi,pi),scale:clamp(Number(o.scale)||1,.4,2.5)}));state=next;syncUI();rebuildAll();toast('Aquarium imported ✓')}catch(err){toast('Could not import: '+err.message)}e.target.value=''};
 $('inspect-close').onclick=()=>$('inspector').classList.remove('open');$('inspect-remove').onclick=()=>{if(selected)removeItem(selected.kind,selected.uid)};
 $('enter').onclick=()=>{$('welcome').classList.add('hidden');setTimeout(()=>$('welcome').remove(),700);if(innerWidth<780)toggleSidebar(false)};
 $('sidebar-toggle').onclick=()=>toggleSidebar(!$('sidebar').classList.contains('open'));
 $('dock-zen').onclick=$('zen-mode').onclick=()=>{zen=!zen;document.querySelector('.top').style.display=zen?'none':'';$('sidebar').style.display=zen?'none':'';$('sidebar-toggle').style.display=zen?'none':'';document.querySelector('.right-hint').style.display=zen?'none':'';$('mode-pill').textContent=zen?'☾ Zen mode · Press Z to exit':'◈ Free exploration';$('dock-zen').classList.toggle('active',zen);toast(zen?'Breathe. Just watch the water.':'Welcome back to your studio')};
 addEventListener('keydown',e=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;if(e.key.toLowerCase()==='z')$('dock-zen').click();if(e.key==='Escape'){$('inspector').classList.remove('open');if(zen)$('dock-zen').click()};if(e.key.toLowerCase()==='f')feed()});
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();applyQuality()});
}
function toggleSidebar(on){$('sidebar').classList.toggle('open',on);$('sidebar-toggle').setAttribute('aria-expanded',String(on));$('sidebar-toggle').textContent=on?'× Close':'☰ Customize'}
let feedUntil=0;function feed(){feedUntil=performance.now()+7000;for(const f of fishModels){f.feed=rnd(.4,1.5)}toast('Feeding time! Watch the fish gather ✧')}
let selected=null;
function inspect(kind,uid){
 const item=kind==='life'?state.life.find(x=>x.uid===uid):state.decor.find(x=>x.uid===uid);if(!item)return;
 const spec=kind==='life'?species.find(s=>s.id===item.sid):decors.find(d=>d.id===item.type);if(!spec)return;
 selected={kind,uid};$('inspector').classList.add('open');$('inspect-kind').textContent=kind==='life'?'Aquatic resident':'Aquarium decoration';$('inspect-name').textContent=spec.name;$('inspect-desc').textContent=spec.desc;
 $('inspect-details').textContent=kind==='life'?'Part of your living sanctuary · '+({fresh:'Freshwater',reef:'Coral reef',ocean:'Open ocean',invert:'Invertebrate',special:'Special life'}[spec.cat]):'Hand-placed habitat piece';
 const ctrl=$('inspect-controls');ctrl.replaceChildren();
 const label=document.createElement('label');label.className='field';label.textContent='Size';const range=document.createElement('input');range.type='range';range.min=kind==='life'?.5:.4;range.max=kind==='life'?2:2.5;range.step=.05;range.value=kind==='life'?(item.size||1):(item.scale||1);range.style.width='100%';range.oninput=()=>{item[kind==='life'?'size':'scale']=Number(range.value);const obj=kind==='life'?fishModels.find(f=>f.it.uid===uid):decorModels.find(d=>d.it.uid===uid);if(obj){if(kind==='life')obj.body.scale.setScalar(obj.spec.size*.63*Number(range.value));else obj.g.scale.setScalar(Number(range.value))}persist()};label.append(range);ctrl.append(label);
 if(kind==='decor'){const row=document.createElement('div');row.className='row';const b=document.createElement('button');b.className='btn ghost';b.textContent='↻ Rotate';b.onclick=()=>{item.rot=(item.rot||0)+pi/4;decorModels.find(d=>d.it.uid===uid)?.g.rotation.set(0,item.rot,0);persist()};const c=document.createElement('button');c.className='btn ghost';c.textContent='⎘ Duplicate';c.onclick=()=>addDecor(item.type);row.append(b,c);ctrl.append(row)}
}
function removeItem(kind,uid){
 if(kind==='life'){state.life=state.life.filter(x=>x.uid!==uid);buildLife();refreshResidents()}else{state.decor=state.decor.filter(x=>x.uid!==uid);buildDecor()}
 selected=null;$('inspector').classList.remove('open');updateStats();persist();toast('Removed from your tank');
}
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let downPosition=null;
renderer.domElement.addEventListener('pointerdown',e=>{downPosition=[e.clientX,e.clientY]});
renderer.domElement.addEventListener('pointerup',e=>{
 if(!downPosition||Math.hypot(e.clientX-downPosition[0],e.clientY-downPosition[1])>7)return;
 const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
 raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(clickables,false);
 const o=hits.find(hit=>hit.object.userData.owner);if(o){const data=o.object.userData.owner.userData;if(data.kind==='life'&&data.uid>0)inspect('life',data.uid);else if(data.kind==='decor'&&data.uid>0)inspect('decor',data.uid)}
});
let paused=false,zen=false,last=performance.now(),frame=0,fpsClock=performance.now(),frames=0;
function animate(now){
 requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.06);last=now;frames++;
 if(now-fpsClock>950){$('stat-fps').textContent=Math.round(frames*1000/(now-fpsClock));fpsClock=now;frames=0}
 if(!paused){const gentle=state.reducedMotion?.38:1,active=(.22+state.swimSpeed/110)*gentle;
 if(state.autoday){state.daytime=(state.daytime+dt*.007)%24;configureLight();$('daytime').value=state.daytime;$('daytime-val').textContent=String(Math.floor(state.daytime)).padStart(2,'0')+':00'}
 for(const f of fishModels){
  f.age+=dt;const t=f.age,sp=f.speed*active*(1+state.current/180);
  if(now<feedUntil)f.feed=clamp(f.feed+dt,.0,1.6);else f.feed=Math.max(0,f.feed-dt*.4);
  const destination=now<feedUntil?new THREE.Vector3(Math.sin(f.phase)*.8,bounds.h*.72,Math.cos(f.phase)*.4):new THREE.Vector3(Math.sin(t*sp+f.phase)*bounds.w*.35,clamp(f.y0+Math.sin(t*sp*.7+f.phase)*.75,.5,bounds.h-.55),Math.cos(t*sp*.78+f.phase)*bounds.d*.32);
  const velocity=destination.clone().sub(f.g.position),distance=velocity.length();const mix=clamp(dt*(.4+f.feed*.7),0,.09);
  f.g.position.lerp(destination,mix);if(distance>.02){const angle=Math.atan2(-velocity.z,velocity.x);let diff=(angle-f.g.rotation.y+pi*3)%(pi*2)-pi;f.g.rotation.y+=clamp(diff,-dt*2,dt*2)}
  f.body.rotation.z=Math.sin(t*1.6+f.phase)*.035;f.body.rotation.y=Math.sin(t*4+f.phase)*.075;
  if(f.spec.name.includes('Jellyfish')){const pulse=1+Math.sin(t*2+f.phase)*.12;f.body.scale.setScalar(f.spec.size*.63*pulse)}
 }
 for(const b of bubbles){b.o.position.y+=dt*b.speed*(.5+state.bubbles/75);if(b.o.position.y>bounds.h-.1)b.o.position.y=.2;b.o.position.x=b.x+Math.sin(now*.001+b.phase+b.o.position.y)*.095}
 if(tankShell.userData.surface&&state.caustics){const m=tankShell.userData.surface.material;m.opacity=.13+(100-state.clarity)*.002+Math.sin(now*.0012)*.024}
 for(const o of decorModels){if(['kelp','grass','fan','anemone'].includes(o.it.type)){o.g.rotation.z=Math.sin(now*.0007+o.it.uid)*.022*(.2+state.current/60)}}
 if(state.autoOrbit&&!zen){const a=now*.00005;camera.position.x=Math.sin(a)*Math.max(bounds.w*.55,5);camera.position.z=Math.cos(a)*Math.max(bounds.w*1.4,12);camera.lookAt(controls.target)}
 }
 controls.update();renderer.render(scene,camera);
}
buildMenus();bindControls();syncUI();
if(!saved)applyPreset('lagoon',false);else rebuildAll();
requestAnimationFrame(animate);
window.addEventListener('DOMContentLoaded',()=>{$('loading')?.classList.add('done');setTimeout(()=>$('loading')?.remove(),800)});
$('loading')?.classList.add('done');setTimeout(()=>$('loading')?.remove(),800);
