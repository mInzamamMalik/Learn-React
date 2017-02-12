import React from 'react';
import ReactDOM from 'react-dom';
import request from 'axios';

const fD = ReactDOM.findDOMNode;

class Autocomplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            filteredOptions: [],
            currentOption: ''
        }
        this.filter = this.filter.bind(this)
        this.addOption = this.addOption.bind(this)
    }
    componentDidMount() {

        console.log("did mound runing: ", this.props);

        request({ url: this.props.url })
            .then(response => response.data)
            .then(data => {
                console.log(data)
                if (!data) {
                    return console.error('Failed to load')
                } else {
                    this.setState({
                        options: data,
                        filteredOptions: data
                    })
                }
            })
            .catch(console.error)
    }


    filter(event) {
        console.log("filter is runing");

        this.setState({
            currentOption: event.target.value,
            filteredOptions: (this.state.options.filter((option, index, list) => {
                console.log(option, event.target.value,
                    option.name.substr(0, event.target.value.length));

                return (
                    event.target.value ===
                    option.name.substr(0, event.target.value.length)
                )
            }))
        })
    }

    addOption(event) {
        let currentOption = this.state.currentOption
        request
            .post(this.props.url, { name: currentOption })
            .then(response => response.data)
            .then((body) => {
                if (!body) {
                    return console.error('Failed to save')
                }
                this.setState({ options: [body].concat(this.state.options) }, () => {
                    this.filter({ target: { value: currentOption } })
                })
            })
            .catch(error => { return console.error('Failed to save') })
    }
    render() {
        return (
            <div className="form-group">

                <input type="text"
                    onKeyUp={(event) => (event.keyCode == 13) ? this.addOption() : ''}
                    className="form-control option-name"
                    onChange={this.filter}
                    value={this.currentOption}
                    placeholder="React.js">
                </input>

                {this.state.filteredOptions.map(function (option, index, list) {
                    return (
                        <div key={option._id}>
                            <a className="btn primary option-list-item"
                                href={'/#/' + option.name}
                                target="_blank">
                                #{option.name}
                            </a>
                        </div>
                    )
                })}


                {(() => {
                    if (this.state.filteredOptions.length == 0 && this.state.currentOption != '')
                        return <a className="btn btn-info option-add" onClick={this.addOption}> Add #{this.state.currentOption} </a>
                })()}


            </div>
        )
    }
}

export default Autocomplete;