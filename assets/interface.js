// Presentation layer only. Original game data and rules remain in index.html.
const sceneFiles=['forum','camp','villa','harbour','gate'];
const romanNumbers=['I','II','III','IV','V'];
const originalRenderPuzzle=renderPuzzle;
renderPuzzle=function(){
 originalRenderPuzzle();
 const room=ROOMS[state.room];
 const art=document.createElement('div');art.className='room-art';art.setAttribute('role','img');art.setAttribute('aria-label',room.name+' — '+room.subtitle);art.style.backgroundImage=`url('assets/${sceneFiles[state.room]}.webp')`;
 const caption=document.createElement('div');caption.className='room-art-caption';
 const number=document.createElement('small');number.textContent='ROOM '+romanNumbers[state.room];caption.append(number,document.createTextNode(room.name));art.append(caption);
 const route=document.createElement('div');route.className='room-route';route.setAttribute('aria-label','Room progress');
 ROOMS.forEach((r,i)=>{const stop=document.createElement('div');stop.className='route-stop'+(i===state.room?' current':i<state.room?' done':'');stop.textContent=(i<state.room?'✓ ': '')+romanNumbers[i];stop.title=r.name;stop.setAttribute('aria-label',r.name+(i<state.room?' complete':i===state.room?' current':' locked'));route.append(stop)});
 const body=document.getElementById('puzzleBody');body.prepend(art,route);
 document.getElementById('feedbackBox').setAttribute('role','status');
 document.querySelectorAll('.word-token').forEach(el=>{el.tabIndex=0;el.setAttribute('role','button');el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}})});
};
const originalSplash=showRoomSplash;
showRoomSplash=function(i){document.getElementById('roomSplash').style.setProperty('--splash-art',`url('assets/${sceneFiles[i]}.webp')`);originalSplash(i)};
const originalHud=buildHudProgress;
buildHudProgress=function(){originalHud();document.querySelectorAll('.hud-dot').forEach((el,i)=>{el.textContent=romanNumbers[i];el.title=ROOMS[i].name})};
const originalSlots=renderSlots;
renderSlots=function(){originalSlots();document.querySelectorAll('.placed-token').forEach(el=>{el.tabIndex=0;el.setAttribute('role','button');el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}})})};
