
function onRun(context) {
  var doc = context.document;
  var artboard = MSArtboardGroup.new()
  var artboardFrame = artboard.frame()
  var width;
  var height;
  var size = 8;
  var alert = makeAlert();
  var options  = handleAlertResponse(alert, alert.runModal());

  function makeArtboard(x,y,w,h){
      width = w;
      height = h;
      artboardFrame.setX(x)
      artboardFrame.setY(y)
      artboardFrame.setWidth(w)
      artboardFrame.setHeight(h)
      artboard.hasBackgroundColor = true;
      artboard.backgroundColor = MSColor.colorWithRed_green_blue_alpha(211/255,122/255,255/255,1);
  };

  function makeGrid(){
     var rect;
     var shapeGroup;
     var fill;

     for(var i = 1;i*size <= width;i++){
          rect = MSRectangleShape.alloc().init();
          rect.frame = MSRect.rectWithRect(NSMakeRect(i*size, 0, 1, height));
          shapeGroup = MSShapeGroup.shapeWithPath(rect);
          shapeGroup.style().addStylePartOfType(0)
          fill = shapeGroup.style().fills().firstObject();
          fill.color = MSColor.colorWithRed_green_blue_alpha(181/255,9/255,255/255,1.0)
          artboard.addLayers([shapeGroup]);
     }
     for(var i = 1;i*size <= height;i++){
          rect = MSRectangleShape.alloc().init();
          rect.frame = MSRect.rectWithRect(NSMakeRect(0, i*size, width, 1));
          shapeGroup = MSShapeGroup.shapeWithPath(rect);
          shapeGroup.style().addStylePartOfType(0);
          fill = shapeGroup.style().fills().firstObject();
          fill.color = MSColor.colorWithRed_green_blue_alpha(181/255,9/255,255/255,1.0)
          artboard.addLayers([shapeGroup]);
     }
  };

  function makeAlert(){
      var alert = COSAlertWindow.new();
      alert.setMessageText('Sheetie');
      alert.setInformativeText('Set the size of sheet');
      var Options = ['128x128', '256x256'];
      var Selection = createSelectionBox(Options, 0);
      alert.addAccessoryView(Selection);
      alert.addButtonWithTitle('Make');
      alert.addButtonWithTitle('Cancel');
      return alert;
  };

  function handleAlertResponse(alert, code) {
    if (code == "1000") {
        return {
	        	size : alert.viewAtIndex(0).stringValue()
        };
     }
     return null;
   };

  function createSelectionBox(options, selectedItemIndex) {
     var selectBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0,0,200,25));
     selectBox.addItemsWithObjectValues(options);
     selectBox.selectItemAtIndex(selectedItemIndex);
     return selectBox;
	 };

  function MakeArtboardForSize(){
    if(options.size == '128x128'){
      makeArtboard(0,0,128,128);
    }else if (options.size == '256x256') {
      makeArtboard(0,0,256,256);
    }
  }

  MakeArtboardForSize();
  doc.currentPage().addLayers([artboard])
  makeGrid();

};
