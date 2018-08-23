import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectHead, selectHair, selectEyes, selectNose, selectMouth} from '../actions';

class Control extends Component {
    constructor(props) {
        super(props);

        this.handleSelected = this.handleSelected.bind(this);
        this.renderControlList = this.renderControlList.bind(this);
    }
    handleSelected(type, id) {
        let data = {}
        if (id === '') {
            data = null;
        } 
        else {
            console.log(id);
            data = {
                id: this.props.pieces[type][id].id,
                name: this.props.pieces[type][id].name,
                src: this.props.pieces[type][id].src
            }
        }
        switch (type) {
            case 'hair':
                this.props.selectHair(data);
                break;
            case 'head':
                this.props.selectHead(data);
                break;
            case 'eyes':
                this.props.selectEyes(data);
                break;
            case 'nose':
                this.props.selectNose(data);
                break;
            case 'mouth':
                this.props.selectMouth(data);
                break;
        }
    }
    renderControlList(type) {
        let $selected = this.props.pieces[type];
        var listItems = [];
        return (
            <select value={this.props['active_'+type] !== null ? this.props['active_'+type].id - 1 : ''} onChange={(e)=>{this.handleSelected(type, e.target.value)}}>
                <option value="">Select a {type} ...</option>
                {$selected !== null ? 
                    $selected.map((child, index) => {
                        return(<option value={index} key={index}>{child.name}</option>);
                    })
                    :
                    null
                }
            </select>
        );
    };
    render() {
        return(
            <div className="face-controls">
                {this.renderControlList('hair')}
                {this.renderControlList('head')}
                {this.renderControlList('eyes')}
                {this.renderControlList('nose')}
                {this.renderControlList('mouth')}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        pieces: state.pieces,
        active_hair: state.active_hair,
        active_head: state.active_head,
        active_eyes: state.active_eyes,
        active_nose: state.active_nose,
        active_mouth: state.active_mouth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectHair,
        selectHead,
        selectEyes,
        selectNose,
        selectMouth
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Control);