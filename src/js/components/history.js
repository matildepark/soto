import React, { Component } from 'react'

export class History extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="history flex flex-column-reverse"
            style={{ height: 'calc(100% - 1rem)', resize: 'vertical' }}
            >
            {this.props.history.map((text, index) => {
                return <p key={index}>{text}</p>
            })}
            </div>
        )
    }
}

export default History
