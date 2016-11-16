const fs = require('fs');

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
  // Vertical Menu
  //---------------------------------------------------------------------------
  let verticalMenu = document.createElement('div');
  verticalMenu.classList.add('vertical-menu');
  widget.appendChild(verticalMenu);

  //---------------------------------------------------------------------------
  // Toggle Side Drawer Button
  //---------------------------------------------------------------------------
  let toggleSideDrawerBtn = document.createElement('div');
  toggleSideDrawerBtn.classList.add('toggle-side-drawer-btn');
  widget.appendChild(toggleSideDrawerBtn);

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
    }
  };



  refreshProcList();

  return widget;
};




let t = initWidget();
document.body.appendChild(t);
