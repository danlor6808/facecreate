import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Canvas, Path, Circle, PathGroup} from 'react-fabricjs';
import {fabric} from 'fabric';
import {bindActionCreators} from 'redux';
import {selectedObj, selectHead, selectHair, selectEyes, selectNose, selectMouth, exportCanvas} from '../actions';
import JSzip from 'jszip';
import { saveAs } from 'file-saver';
import InlineSVG from 'svg-inline-react';
import backBtn from '../svg/icon_back.svg';
import frontBtn from '../svg/icon_front.svg';
import exportBtn from '../svg/icon_export.svg';
import downBtn from '../svg/icon_movedown.svg';
import upBtn from '../svg/icon_moveup.svg';
import trashBtn from '../svg/icon_trash.svg';

let canvas = '';

class Display extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        fabric.Image.prototype.strokeWidth = 0;
        canvas = new fabric.Canvas('c', {
            width: 450,
            height: 450,
            backgrounCdolor: '#fff',
            enableRetinaScaling: true
        });
    }
    componentDidUpdate() {
        let list = canvas._objects;
        let propMap = {
            active_hair : false,
            active_head : false,
            active_eyes : false,
            active_nose : false,
            active_mouth : false
        }
        if (list.length > 0) {
            list.map((child, index) => {
                Object.keys(propMap).map((key)=>{
                    if (child.svgUid === key){
                        if (this.props[key] !== null) {
                            fabric.loadSVGFromString(this.props[key].src, (objects, options) => {
                                var obj = fabric.util.groupSVGElements(objects, options);
                                if (child.paths !== obj.paths) {
                                    obj.svgUid = child.svgUid;
                                    obj.top = child.top;
                                    obj.left = child.left;
                                    obj.scaleX = child.scaleX;
                                    obj.scaleY = child.scaleY;
                                    obj.zoomX = child.zoomX;
                                    obj.zoomY = child.zoomY;
                                    canvas.add(obj).remove(child);
                                    obj.setCoords();
                                }
                            });
                        }
                        propMap[key] = true;
                    }
                });
            });
        }
        Object.keys(propMap).map((key) => {
            if (!propMap[key]) {
                if (this.props[key] !== null) {
                    fabric.loadSVGFromString(this.props[key].src, (objects, options) => {
                        var obj = fabric.util.groupSVGElements(objects, options);
                        obj.svgUid = key;
                        obj.id = key;
                        canvas.add(obj).centerObject(obj);
                        obj.setCoords();
                        console.log(canvas);
                    });
                }
            }
        });
        // update canvas
        canvas.renderAll();
    }
    handleControls(action) {
        let obj = canvas.getActiveObject();
        if (obj !== undefined && obj !== null) {
            switch (action) {
                case 'delete':
                    canvas.remove(obj).renderAll();
                    switch (obj.svgUid) {
                        case 'active_head':
                            this.props.selectHead(null);
                            break;
                        case 'active_hair':
                            this.props.selectHair(null);
                            break;
                        case 'active_eyes':
                            this.props.selectEyes(null);
                            break;
                        case 'active_nose':
                            this.props.selectNose(null);
                            break;
                        case 'active_mouth':
                            this.props.selectMouth(null);
                            break;
                    }
                    break;
                case 'forward':
                    canvas.bringForward(obj).discardActiveObject().renderAll();
                    break;
                case 'backward':
                    canvas.sendBackwards(obj).discardActiveObject().renderAll();
                    break;
                case 'front':
                    canvas.bringToFront(obj).discardActiveObject().renderAll();
                    break;
                case 'back':
                    canvas.sendToBack(obj).discardActiveObject().renderAll();
                    break;
                case 'export':
                    canvas.discardActiveObject().renderAll();  
                    let data = {
                        url: canvas.toDataURL({
                            format: 'png'
                        }),
                        json: canvas.toJSON(),
                        svg: canvas.toSVG()
                    };
                    let medium = this.returnImageSize(250,250);
                    var win = window.open();
                    var test = '<img src="'+medium+'">';
                    win.document.write(test);
                    // this.renderImage();
                    // this.props.exportCanvas(data);
                    break;
                default:
                    return false;
            }
        }
        if (action === 'export') {
            canvas.discardActiveObject().renderAll();  
            let data = {
                url: canvas.toDataURL({
                    format: 'image/png'
                }),
                json: canvas.toJSON(),
                svg: canvas.toSVG()
            };
            let small = this.returnImageSize(150,150);
            let medium = this.returnImageSize(250,250);
            let large  = this.returnImageSize(350,350);
          
            // let zip = new JSzip();
            // zip
            // .file('small.png', small)
            // .file('medium.png', medium)
            // .file('large.png', large)
            // .generateAsync({type:"blob"})
            // .then(function (blob) {
            //     saveAs(blob, "facecreate-avatar.zip");
            // });
            var win = window.open();
            var test = '<img src="'+medium+'">';
            win.document.write(test);
            // this.renderImage(imageData);
            // this.props.exportCanvas(data);
        }
    }
    renderImage(images) {
        var data = '';
        switch (typeof(images)) {
            case 'object':
                Object.keys(images).map((key) => {
                    data += images[key];
                });
                break;
            case 'string':
                data = images;
                break;
        }
        var win = window.open();
        win.document.write(data);
    }
    returnImageSize(width, height) {
        var resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = width;
        resizedCanvas.height = height;
        var ctx = resizedCanvas.getContext('2d');
        ctx.drawImage(c, 0, 0, resizedCanvas.width, resizedCanvas.height);
        return resizedCanvas.toDataURL({
            format: 'image/png'
        });
    }
    renderControls() {
        return(
            <div className="canvas-controls">
                <button className="control" onClick={()=>{this.handleControls('forward')}}><InlineSVG src={upBtn} /></button>
                <button className="control" onClick={()=>{this.handleControls('backward')}}><InlineSVG src={downBtn} /></button> 
                <button className="control" onClick={()=>{this.handleControls('front')}}><InlineSVG src={frontBtn} /></button>
                <button className="control" onClick={()=>{this.handleControls('back')}}><InlineSVG src={backBtn} /></button> 
                <button className="control" onClick={()=>{this.handleControls('export')}}><InlineSVG src={exportBtn} /></button>
                <button className="control" onClick={()=>{this.handleControls('delete')}}><InlineSVG src={trashBtn} /></button>
            </div>
        )
    }
    renderExport() {
        if (this.props.export_canvas !== null) {
            return (
                <div className="export">
                    <label>SVG</label>
                    <pre>{this.props.export_canvas.svg}</pre>
                </div>
            );
        }
    }
    render() {
        return(
            <div className="wrapper">
                {this.props.children}
                <canvas id="c" />
                {this.renderControls()}
                {this.renderExport()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        active_obj: state.active_obj,
        active_hair: state.active_hair,
        active_head: state.active_head,
        active_eyes: state.active_eyes,
        active_nose: state.active_nose,
        active_mouth: state.active_mouth,
        export_canvas: state.export_canvas
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectedObj,
        selectHead, 
        selectHair, 
        selectEyes, 
        selectNose, 
        selectMouth,
        exportCanvas
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);