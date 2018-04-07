import React, { Component } from 'react';
import './App.css';

const colorList= ['white','black','blue','navy','purple','red','maroon','green','lightgreen','darkgreen','grey'];
class App extends Component {
    constructor(){
        super();
        this.state={
            bheem : [{color:'',count:0}],
            loom : [{color:'',count:0}],
            designPattern : null,
            bheemRepeat : 1,
            loomRepeat : 1
        }
    }
    getDesign = () =>{
        const {bheem,loom,bheemRepeat,loomRepeat} = this.state;
        let row=[],col=[],flag=false;
        bheem.map(data=>{
            row = row.concat(Array(parseInt(data.count)).fill(data.color));
        });
        loom.map(data=>{
            col = col.concat(Array(parseInt(data.count)).fill(data.color));
        });
        let copyRow = JSON.parse(JSON.stringify(row));
        let copyCol = JSON.parse(JSON.stringify(col));
        for(let i=1; i<parseInt(bheemRepeat);i++){
            row = row.concat(copyRow);
        }
        for(let i=1; i<parseInt(loomRepeat);i++){
            col = col.concat(copyCol);
        }
        let designPattern = row.map((rData,rIndex)=>{
            flag = !flag;
            return(
                <div className="row" key={"row"+rIndex}>
                    {
                        col.map((cData,cIndex)=>{
                            let style = {background : flag ? rData : cData}
                            return(
                                <div className="col" key={"col"+cIndex} style={style}></div>
                            )
                        })
                    }
                </div>
            )
        });
        this.setState({designPattern});
    }
    selectChange = (event,type,index) =>{
        let data = this.state[type];
        data[index].color = event.target.value;
        this.setState({type : data});
    }
    inputChange = (event,type,index) =>{
        let data = this.state[type];
        data[index].count = event.target.value;
        this.setState({type : data});
    }
    renderColorBox = (data,type,index) =>(
        <div key={type+index}>
            <select value={data.color} onChange={e=>{this.selectChange(e,type,index)}}>
                <option value=''>Select Color</option>
                {
                    colorList.map((color,index)=>(
                        <option key={type+color+index} value={color}>{color}</option>
                    ))
                }
            </select>
            <input text="text" className="input" value={data.count} onChange={e=>{this.inputChange(e,type,index)}} />
            {
                index === this.state[type].length-1 ?
                    <div className="add" onClick={e=>{this.setState({type:this.state[type].push({color:'',count:0})})}}>+</div>
                :
                    null
            }
        </div>
    )
    render() {
        let {bheem,loom,designPattern,bheemRepeat,loomRepeat} = this.state;
        return (
            <div className="App">
                <div className="Left">
                    <p>Bheem</p>
                    {
                        bheem.map((data,index)=>(this.renderColorBox(data,'bheem',index)))
                    }
                    <div>
                        Repeat
                        <input type="text" value={bheemRepeat} onChange={e=>{this.setState({bheemRepeat:e.target.value})}} />
                        Times
                    </div>
                </div>
                <div className="Right">
                    <p>Loom</p>
                    {
                        loom.map((data,index)=>(this.renderColorBox(data,'loom',index)))
                    }
                    <div>
                        Repeat
                        <input type="text" value={loomRepeat} onChange={e=>{this.setState({loomRepeat:e.target.value})}} />
                        Times
                    </div>
                </div>
                <div className="design-btn" onClick={e=>{this.getDesign()}}>
                    Get Design
                </div>
                {
                    designPattern ?
                        <div>{designPattern}</div>
                    : null
                }
            </div>
    );
  }
}

export default App;
