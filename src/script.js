const fs = require('fs');

const $ = require('jquery');

const css = `<style>\n${fs.readFileSync('./src/styles.css')}</style>`;


let initWidget = () => {
  document.head.innerHTML+=css;

  //---------------------------------------------------------------------------
  // Widget Container
  //---------------------------------------------------------------------------
  let widget = document.createElement('div');
  widget.classList.add('mbwm-workspace-management-widget');

  //---------------------------------------------------------------------------
  // Processes Side Drawer
  //---------------------------------------------------------------------------
  let procsSideDrawer = document.createElement('div');
  procsSideDrawer.classList.add('processes-side-drawer');
  widget.appendChild(procsSideDrawer);

  //---------------------------------------------------------------------------
  // Container
  //---------------------------------------------------------------------------
  let container = document.createElement('div');
  container.classList.add('container');
  widget.appendChild(container);

  //---------------------------------------------------------------------------
  // Vertical Menu
  //---------------------------------------------------------------------------
  let verticalMenu = document.createElement('div');
  verticalMenu.classList.add('vertical-menu');
  container.appendChild(verticalMenu);

  //---------------------------------------------------------------------------
  // Toggle Side Drawer Button
  //---------------------------------------------------------------------------
  let toggleSideDrawerBtn = document.createElement('div');
  toggleSideDrawerBtn.classList.add('toggle-side-drawer-btn');
  verticalMenu.appendChild(toggleSideDrawerBtn);

  toggleSideDrawerBtn.addEventListener('mousedown', (e) => {
    if(e.button === 0){
      if(procsSideDrawer.classList.contains('hidden')){
        // Drawer is hidden
        console.log('Show drawer');
        procsSideDrawer.classList.remove('hidden');
      }else{
        // Drawer isn't hidden
        console.log('Hide drawer');
        procsSideDrawer.classList.add('hidden');
      }
    }
  });



  //---------------------------------------------------------------------------
  // Func: Refresh Processes List
  //---------------------------------------------------------------------------
  let refreshProcList = () => {
    for(let i = 0; i < procsSideDrawer.childNodes.length; i++){
      procsSideDrawer.removeChild(procsSideDrawer.childNodes[i]);
    }

    for(let i = 0; i < 50; i++){
      let procData = {
        text: `Process ${i}`
      };
      let proc = document.createElement('process-btn');
      proc.classList.add('process-btn');
      proc.innerHTML = procData.text;
      proc._procData = procData;
      procsSideDrawer.appendChild(proc);
      makeElementDraggable(proc);
    }
  };



  refreshProcList();

  return widget;
};


global._elementBeingDragged;
let makeElementDraggable = (element) => {
  // console.log('makeElementDraggable');
  // console.log(element);


  let offsetX;
  let offsetY;

  let elemRef = $(element);

  element.addEventListener('mousedown', (e) => {
    console.log('drag');
    console.log(element);
    // off
    console.log(e);
    // console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);
    console.log(`page (${e.pageX}, ${e.pageY})`);
    console.dir(element);

    // var x = e.pageX - elemRef.offset().left;
    // var y = e.pageY - elemRef.offset().top;
    // console.log(`pos (${x}, ${y})`);
    offsetX = e.pageX - elemRef.offset().left;
    offsetY = e.pageY - elemRef.offset().top;
    console.log(`pos (${offsetX}, ${offsetY})`);

    // document.body.appendChild(element);
    let bounds = element.getBoundingClientRect();
    element.style.position = 'absolute';
    // element.style.left = `${e.pageX+x}px`;
    // element.style.top = `${e.pageY+y}px`;
    element.style.left = `${e.pageX-offsetX}px`;
    element.style.top = `${e.pageY-offsetY}px`;
    element.style.width = `${bounds.width}px`;
    element.style.height = `${bounds.height}px`;
    document.body.appendChild(element);
  });
};


let t = initWidget();
document.body.appendChild(t);
