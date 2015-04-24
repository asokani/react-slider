import React from 'react'
require('../css/index.scss');


let App = React.createClass({
    LEFT_BUTTON: 0,
    DRAG_THRESHOLD: 3,
    getInitialState() {
        return {
            dragging: false,
            handlePosition: 0
        }
    },
    componentDidMount() {
        document.addEventListener('mouseup', this._documentMouseUp);
    },

    componentWillUnmount() {
        document.removeEventListener('mouseup', this._documentMouseUp);
    },
    _addEvents() {
        document.addEventListener('mousemove', this._documentMouseMove);
    },
    _removeEvents() {
        document.removeEventListener('mousemove', this._documentMouseMove);
    },
    _onMouseDown(event) {
        if (event.button == this.LEFT_BUTTON) {
            event.stopPropagation()
            this._addEvents()

            this.setState({
                dragging: false,
                pageX: event.pageX,
                oldhandlePosition: this.state.handlePosition
            })
        }
    },
    _documentMouseUp(event) {
        this._removeEvents()
        this.setState({dragging: false})
    },
    _documentMouseMove(event) {
        let deltaX = event.pageX - this.state.pageX
        let newPosition = deltaX + this.state.oldhandlePosition

        if (newPosition < 0) {
            newPosition = 0
        }
        if (newPosition > this.props.sliderWidth - 1) {
            newPosition = this.props.sliderWidth - 1
        }
        let distance = Math.abs(deltaX)
        if (!this.state.dragging && distance > this.DRAG_THRESHOLD) {
            this.setState({dragging: true})
        }

        if (this.state.dragging) {
            this.setState({
                handlePosition: newPosition
            })
        }
    },
    render() {
        let handleSize = 50
        let handleBorder = 2
        let a = 5
        let styles = {
            bar: {
                width: this.props.sliderWidth,
                height: this.props.sliderHeight,
                borderRadius: parseInt(this.props.sliderHeight / 2)
            },
            hightlight: {
                height: this.props.sliderHeight,
                width: this.state.handlePosition
            },
            handle: {
                width: handleSize,
                height: handleSize,
                borderWidth: handleBorder,
                borderRadius: 25,
                position: "relative",
                left: -1 * (handleSize / 2),
                top: this.props.sliderHeight / 2 - (handleSize + 2 * handleBorder) / 2
            }
        }
        return (
            <div>
                <div style={{position: "relative"}}>
                    <div className="bar" style={styles.bar}>
                        <div className="highlight" style={styles.hightlight}>
                        </div>
                    </div>
                    <div style={{position: "absolute", width: 0, overflow: "visible", top: 0, left: this.state.handlePosition}}>
                        <div style={styles.handle} className="handle" onMouseDown={this._onMouseDown} >
                        </div>
                    </div>
                </div>
            </div>

        )
    }
})

const app = document.getElementById('react-slider');
React.render(<App sliderWidth="600" sliderHeight="20" />, app);


