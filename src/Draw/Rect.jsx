import { useContext, useRef } from "react";
import { Context } from "./Draw";
import Dimension from "./Dimension";
import { getPathData } from "./Functions/GetPath";
import { setRz } from "./Functions/SetRz";
import ResizeCircles from "./ResizeCircles";
import RotateCircles from "./RotateCircles";
import RectBBox from "./RectBBox";
import RectMidCirleTest from "./RectMidCirleTest";
import { RotatePoints } from "./RotatePoints";
function Rect() {
  let context = useContext(Context);
  let targetObject = context.targetObject;
  let target=context.target
  let bBoxColor = context.bBoxColor;
  let circlerad = context.circlerad;
  let editdrag = context.editdrag;
  let dragrect = context.dragrect;
  let dragrectr = context.dragrectr;
  let lockdrag = context.lockdrag;
  let lineeditwidth = context.lineeditwidth;
  let rcursor = context.rcursor;
  let edit = context.edit;
  let highlight = context.highlight;
  let vectoredit = context.vectoredit;
  let rotatedown = context.rotatedown;
  let rectzerobool = context.rectzerobool;
  let bluecolor = context.bluecolor;

  ///*
  let x1 = Object.keys(targetObject.current).map(
    (e) => targetObject.current[e][0].getBBox().x - 2
  );
  x1 = Math.min(...x1);
  let x2 = Object.keys(targetObject.current).map(
    (e) =>
      targetObject?.current[e][0].getBBox().x +
      targetObject?.current[e][0].getBBox().width +
      2
  );
  x2 = Math.max(...x2);
  let y1 = Object.keys(targetObject.current).map(
    (e) => targetObject.current[e][0].getBBox().y - 2
  );
  y1 = Math.min(...y1);
  let y2 = Object.keys(targetObject.current).map(
    (e) =>
      targetObject.current[e][0].getBBox().y +
      targetObject.current[e][0].getBBox().height +
      2
  );
  y2 = Math.max(...y2);
  /*
  let matrix = Object.keys(targetObject.current)
    .map((e) =>(RotatePoints(targetObject.current[e][0])))
    if (matrix.join("")==""||matrix.length==0) {
    } 
    else{
      matrix = matrix.map(e=>e+` `).reduce((e, i) => e + i).trim();
    }
    */
  //*/
  /*
  let xdata=[]
  let ydata = [];
  let xmax=[]
  let ymax=[]
    let xmin = [];
    let ymin = [];

    Object.keys(targetObject.current).map(
      (e) =>{
           xdata = [];
           ydata = [];
         for (
           let index = 0;
           index < targetObject.current[e][0].getTotalLength();
           index++
         ) {
          xdata.push(targetObject.current[e][0].getPointAtLength(index).x); 
          ydata.push(targetObject.current[e][0].getPointAtLength(index).y); 
      
         }
        
        xmax.push(Math.max(...xdata))
         xmin.push(Math.min(...xdata))
         ymax.push(Math.max(...ydata));
         ymin.push(Math.min(...ydata));
     
      }

    );

    let x1=Math.min(...xmin)+2
    let x2=Math.max(...xmax)-2
    let y1=Math.min(...ymin)+2
    let y2 = Math.max(...ymax) - 2;
*/
  /* 

    const pi = Math.PI;
    let cx = dragrectr.current[0]; 
    let cy = dragrectr.current[2]; 
    let m=dragrectr.current[1]; 
    let n = dragrectr.current[3]; 
    let differy = 10 - 0;
    let differx =  10- 0;
    let yita = Math.atan(differy / differx);
    let ym = yita * 180;
    let gh = ym / pi;
    console.log(gh);
    */
  rectzerobool.current=false 
  let newx = [x1, x2];
  let newy = [y1, y2];
  if (Math.round(x1 + 2) == Math.round(x2 - 2)||Math.round(y1 + 2) == Math.round(y2 - 2)) {
    newx = [x1 + 2, x2 - 2];
     newy = [y1 + 2, y2 - 2];
     rectzerobool.current = true; 
  }
  dragrect.current = [...newx,...newy];
  dragrectr.current = [x1 + 2, x2 - 2, y1 + 2, y2 - 2];
  return (
    Math.abs(x1) !== Infinity &&
    !vectoredit.current && (
      <g
        stroke={
          (!editdrag.current || highlight.current) && edit.current
            ? bluecolor.current
            : `none`
        }
        fill="none"
        name="rectgart$"
      >
        <Dimension
          x1={newx[0]}
          x2={newx[1]}
          y1={newy[0]}
          y2={newy[1]}
        />
        {!rectzerobool.current&&<RectBBox />}
        <RotateCircles />
        <ResizeCircles />
        <RectMidCirleTest />
      </g>
    )
  );
}
export default Rect;
