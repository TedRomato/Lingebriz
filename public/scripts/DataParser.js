function on2DMatrixChange(update2DDisplay){
  callbackOnHtmlInput(["#MatrixIX","#MatrixIY","#MatrixJX","#MatrixJY"],update2DDisplay,get2DMatrixData);
}

function on2DVectorChange(update2DVectorDisplay){
  callbackOnHtmlInput(['#VectorX','#VectorY'],update2DVectorDisplay,get2DVectorData);
}

//calls callback function with callbackInputGetter as an argument, when one of elements from inputIds changes value
function callbackOnHtmlInput(inputIds, callback, callbackArgumentFunction){
  for(let i = 0; i < inputIds.length; ++i){
    $(document).on('input', inputIds[i], function() {
      callback(callbackArgumentFunction());
    });
  }
}

function labelValuesUpdateListener(inputIds){
  for(let i = 0; i < inputIds.length; ++i){
    $(document).on('input', inputIds[i], function() {
      $(inputIds[i] + "Tag").html($(inputIds[i]).val());
    });
  }
}

function get2DMatrixData(){
  let ix = Number($("#MatrixIX").val());
  let iy = Number($("#MatrixIY").val());
  let jx = Number($("#MatrixJX").val());
  let jy = Number($("#MatrixJY").val());
  return [[ix,iy],[jx,jy]];
}

function get2DVectorData(){
  let vectorX = Number($("#VectorX").val());
  let vectorY = Number($("#VectorY").val());
  return [vectorX,vectorY];
}

labelValuesUpdateListener(["#MatrixIX","#MatrixIY","#MatrixJX","#MatrixJY",'#VectorX','#VectorY']);

export {on2DMatrixChange, on2DVectorChange}
