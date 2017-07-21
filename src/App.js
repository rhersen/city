import React, {Component} from 'react';
import './App.css';
import differenceInSeconds from "date-fns/difference_in_seconds"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {metros: [], trains: [], now: Date.now()};
    }

    render() {
        const tr = t =>
            <tr key={t.TimeTabledDateTime}>
                <td>{t.ExpectedDateTime.substr(11)}</td>
                <td>{differenceInSeconds(t.ExpectedDateTime, this.state.now)}</td>
                <td>{t.Destination}</td>
            </tr>

        return (
            <div className="App">
                <div className="App-header">
                    <h2>Stockholm City</h2>
                </div>
                <h3>Tunelbana</h3>
                <table style={{width: '90%'}}>
                    <colgroup>
                        <col style={{width: '30%'}}/>
                        <col style={{width: '20%'}}/>
                        <col style={{width: '40%'}}/>
                    </colgroup>
                    <tbody>{this.state.metros.map(tr)}</tbody>
                </table>
                <h3>Pendeltåg</h3>
                <table style={{width: '90%'}}>
                    <colgroup>
                        <col style={{width: '30%'}}/>
                        <col style={{width: '20%'}}/>
                        <col style={{width: '40%'}}/>
                    </colgroup>
                    <tbody>{this.state.trains.map(tr)}</tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({now: Date.now()}), 1000);
        fetch('/json/sl?locations=9001')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    metros: json.ResponseData.Metros
                        .filter(metro => metro.Destination === 'Hjulsta'),
                    trains: json.ResponseData.Trains
                        .filter(train => train.LineNumber === '35')
                        .filter(train => train.JourneyDirection === 2)
                })
            })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default App;
