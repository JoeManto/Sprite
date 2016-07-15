

function onRun(context) {

  var doc = context.document;
  var doc = context.document;
  var artboard = MSArtboardGroup.new()
  var artboardFrame = artboard.frame()
  var width;
  var height;
  var size = 8;

  function makeArtboard(x,y,w,h){
      width = w;
      height = h;
      artboardFrame.setX(x)
      artboardFrame.setY(y)
      artboardFrame.setWidth(w)
      artboardFrame.setHeight(h)
      artboard.hasBackgroundColor = true;
      artboard.backgroundColorGeneric =MSColor.colorWithNSColor(NSColor.colorWithGray(0.0))
  };

  function makeGrid(){
     var rect;
     var shapeGroup;
     for(var i = 1;i*size <= width;i++){
          rect = MSRectangleShape.alloc().init();
          rect.frame = MSRect.rectWithRect(NSMakeRect(i*size, 0, 1, height));
          shapeGroup = MSShapeGroup.shapeWithPath(rect);
          shapeGroup.style().addStylePartOfType(0)
          var fill = shapeGroup.style().fills().firstObject();
          fill.color = MSColor.colorWithRed_green_blue_alpha(181/255,9/255,255/255,1.0)
          artboard.addLayers([shapeGroup]);
     }

     for(var i = 1;i*size <= height;i++){
          rect = MSRectangleShape.alloc().init();
          rect.frame = MSRect.rectWithRect(NSMakeRect(0, i*size, width, 1));
          shapeGroup = MSShapeGroup.shapeWithPath(rect);
          shapeGroup.style().addStylePartOfType(0);
          var fill = shapeGroup.style().fills().firstObject();
          fill.color = MSColor.colorWithRed_green_blue_alpha(181/255,9/255,255/255,1.0)
          artboard.addLayers([shapeGroup]);
     }
  }

  makeArtboard(0,0,128,128)
  doc.currentPage().addLayers([artboard])
  makeGrid();

};
