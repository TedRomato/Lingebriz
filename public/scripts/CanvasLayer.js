import {Line} from "./Line.js"

class CanvasLayer{
  #canvasWidth
  #canvasHeight

  constructor(canvas){
    this.context = $(canvas)[0].getContext('2d');
    this.canvasWidth = $(canvas).attr('width');
    this.canvasHeight = $(canvas).attr('height');
  }

  drawLine(line){
    line = Line.initFromLineObject(line)
    let pointA = line.getA();
    let pointB = line.getB();
    this.context.beginPath();
    this.context.moveTo(pointA[0], pointA[1]);
    this.context.lineTo(pointB[0], pointB[1]);
    this.context.stroke();
  }

  drawLines(lines){

    for(let line of lines){
      this.drawLine(line);
    }
  }

  drawArrow(line){
    drawLine(line);

    let positionX = line.getB()[0];
    let positionY = line.getB()[1];
    let arrowScale = 10;
    drawArrowTip(positionX,positionY, arrowScale, 0);
  }

  drawArrowTip(positionX, postitionY, scale, angle){
    this.context.moveTo(positionX, positionY);
    this.context.lineTo(positionX - 1*scale, positionY + 1*scale);
    this.context.lineTo(positionX, positionY - 1*scale);
    this.context.lineTo(positionX + 1*scale, positionY - 1*scale);
    this.context.lineTo(positionX, positionY);
    this.context.stroke();
    this.context.fill();
  }

  setColor(color){
    this.context.strokeStyle = color;
    this.context.fillStyle = color;
  }

  setLineWidth(){
    this.context.lineWidth = width;
  }

  clear(){
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  fillRectAroundPoint(pointX, pointY, width, height){
    this.context.fillRect(pointX - width/2, pointY - height/2, width, height);
  }
  fillCircle(centerX, centerY, radius){
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fill();
  }
}

export {CanvasLayer}
