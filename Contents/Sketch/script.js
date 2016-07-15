// Hello World, by Sam Deane — Source code available at [GitHub](https://github.com/BohemianCoding/plugins.examples.hello-world)
//
// This is an extremely simple plugin example, which illustrates how to add a menu command to the Plugins menu
// and execute some code when it is selected.

//
// ## Layout
//
// The first thing to do when making a plugin is to setup the folder structure, which should
// look something like this:
//
// ```
//    MyPlugin.sketchplugin/
//      Contents/
//        Sketch/
//          manifest.json
//          script.js
// ```
//
// ## Manifest
//
// The plugin needs a `manifest.json` file. This tells Sketch which menu items your plugin supplies,
// as well as giving some general information about the plugin such as its name, author, and so on.
//
// A single plugin can supply multiple menu items, and each one can execute different code,
// or they can all share code. In our case though, we just have one command.
//
//  ```json
// {
//     "name" : "Hello World!",
//     "identifier" : "com.sketchapp.examples.helloworld",
//     "version" : "1.0",
//     "description" : "Pretty much the smallest example Sketch Plugin you could have.",
//     "authorEmail" : "sam@sketchapp.com",
//     "author" : "Sam Deane",
//     "commands" : [
//     {
//       "script" : "hello-world.js",
//       "handler" : "onRun",
//       "shortcut" : "",
//       "name" : "Hello World!",
//       "identifier" : "helloworld"
//     }
//   ]
// }
// ```

// ## Code
// ### Defining The Run Handler
//
// In the manifest, we told Sketch that every time the "Hello World!" menu is selected,
// we want to execute  a javascript handler called `onRun`.
//
// So now we need to put some code into the `hello-world.js` file to implement that command.

function onRun(context) {

  // We are passed a context variable when we're run.
  // This is a dictionary containing a reference to the document,
  // the current selection, the plugin, current URL and more.

  // One of the things that the context contains is the current document,
  // so let's fetch that.
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

// And that's it. Job done.
//
// Obviously this is only the tip of the iceberg. Check out some of the other examples to see what else can be done.
//
// If you have questions, comments or any feedback, ping us at <developers@sketchapp.com>!
