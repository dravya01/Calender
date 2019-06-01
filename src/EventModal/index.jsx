import React from "react";
import './styles.css';

class AddEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTitle: ""
        };
        this.selectedColor = '';
    }

    titleChange = (event) => {
        this.setState({
            selectedTitle: event.target.value
        })
    };

    colorChange = (event) => {
        this.selectedColor = event.target.value;
    };

    saveValue = () => {
        if(!this.selectedTitle) return;
        const eventObj = {
            id: Math.random(),
            date: this.props.selectedDate,
            title: this.state.selectedTitle,
            color: this.selectedColor
        };
        this.props.saveEvent(eventObj);
        this.props.onClose();
    }

    render(){
        return (
            <div>
                <h2 className='add-event-header'>Add Event</h2>
                <form>
                    <div>
                        <label>Event Title*: </label>
                        <input type="text" value={this.state.selectedTitle} onChange={this.titleChange}/>
                    </div>
                    <div>
                        <label>Pick Color: </label>
                        <input type="color" onChange={this.colorChange}/>
                    </div>
                </form>
                <div className="button-container">
                <button type="button" className='submit-button-style' onClick={this.saveValue}>Submit</button>
                <button type="button" className='close-button-style' onClick={this.props.onClose}>Close</button>
                </div>
            </div>
        )
    }
}

export default AddEvent;