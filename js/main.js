/* rotating roles */
(function(){
  var roles=[
    "computer engineering student",
    "GSoC '25 contributor — Debian / FOSSology",
    "backend & systems software builder",
    "linux & open-source enthusiast",
    "arabic tech educator"
  ];
  var el=document.getElementById('typed');
  var ri=0,ci=0,del=false;
  function tick(){
    var w=roles[ri];
    if(!del){ci++;if(ci>w.length){del=true;setTimeout(tick,1700);return;}}
    else{ci--;if(ci===0){del=false;ri=(ri+1)%roles.length;}}
    el.textContent=w.slice(0,ci);
    setTimeout(tick,del?28:58);
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){tick();}
  else{el.textContent=roles[1];}
})();

/* terminal typing */
(function(){
  var lines=[
    {p:true, t:"whoami"},
    {p:false,t:"ahmed gamal — computer engineering, menoufia university",c:"tw"},
    {p:true, t:"cat focus.txt"},
    {p:false,t:"backend engineering · systems software · open source",c:"tg"},
    {p:true, t:"systemctl status gsoc25"},
    {p:false,t:"● gsoc25.service — Debian packaging for FOSSology",c:"tc"},
    {p:false,t:"   Active: completed (29 PHP packages, reproducible builds)",c:"td"},
    {p:true, t:"ls ~/values"},
    {p:false,t:"simplicity/  clean-code/  continuous-learning/",c:"ty"},
    {p:true, t:"sudo make something-reliable",last:true}
  ];
  var body=document.getElementById('term-body');
  var li=0,ch=0,cur=null;
  function newLine(){
    var L=lines[li];
    cur=document.createElement('div');cur.className='tl';
    if(L.p){
      var pr=document.createElement('span');pr.className='tp';pr.textContent='ahmed@linux';
      var pr2=document.createElement('span');pr2.className='td';pr2.textContent=':~$ ';
      cur.appendChild(pr);cur.appendChild(pr2);
      cur._txt=L.t;cur._out=null;
    }else{
      var s=document.createElement('span');s.className=L.c||'tw';
      cur.appendChild(s);cur._txt=L.t;cur._out=s;
    }
    body.appendChild(cur);ch=0;
  }
  function step(){
    if(li>=lines.length){
      var c=document.createElement('span');c.className='t-caret';body.appendChild(c);return;
    }
    if(!cur)newLine();
    var L=lines[li];
    if(ch<L.t.length){
      ch++;
      if(L.p){cur.appendChild(document.createTextNode(L.t.slice(ch-1,ch)));}
      else{cur._out.textContent=L.t.slice(0,ch);}
      setTimeout(step,L.p?55:8);
    }else{
      cur=null;li++;
      setTimeout(step,L.p?160:60);
    }
  }
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    lines.forEach(function(L){
      var d=document.createElement('div');d.className='tl';
      if(L.p){
        d.innerHTML='<span class="tp">ahmed@linux</span><span class="td">:~$ </span>';
        d.appendChild(document.createTextNode(L.t));
      }else{
        var s=document.createElement('span');s.className=L.c||'tw';s.textContent=L.t;d.appendChild(s);
      }
      body.appendChild(d);
    });
    var c=document.createElement('span');c.className='t-caret';body.appendChild(c);
  }else{step();}
})();

/* scroll reveal */
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('on');io.unobserve(en.target);}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e)});
})();
