import React from 'react';
import MonthData from '../months'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userMonth: '',
            userDay: 0,
            userYear: 0,
            thirtyOneDayMonths: ['January', 'March', 'May', 'July', 'August', 'October', 'December'],
            thirtyDayMonths: ['April', 'June', 'September', 'November'],
            daysPerYear: 365,
        };

        this.getUserMonth = this.getUserMonth.bind(this);
        this.getUserDay = this.getUserDay.bind(this);
        this.getUserYear = this.getUserYear.bind(this);
    }

    componentDidMount() {
        const elem = document.getElementById('Month')
        const event = new Event('onChange', { bubbles: true })
        elem.dispatchEvent(event)
    }

    getLeapYears() {

    }

    getUserMonth(event) {
        this.setState({ userMonth: event.target.value })
    }

    getUserDay(event) {
        const { userMonth } = this.state
        const { thirtyOneDayMonths } = this.state
        const { thirtyDayMonths } = this.state

        if (this.userMonth === 'February') {
            if (event.target.value > 28) {
                console.log('Not a valid value for the month');
            } else {
                this.setState({ userDay: event.target.value });
            }
        } else if (thirtyOneDayMonths.find((element) => (element === userMonth))) {
            if (event.target.value > 31) {
                console.log('Not a valid value for the month');
            } else {
                this.setState({ userDay: event.target.value });
            }
        } else if (thirtyDayMonths.find((element) => (element === userMonth))) {
            if (event.target.value > 30) {
                console.log('Not a valid value for the month');
            } else {
                this.setState({ userDay: event.target.value });
            }
        } else {
            this.setState({ userDay: event.target.value })
        }
    }

    getUserYear(event) {
        this.setState({ userYear: event.target.value });
    }

    grabYearsDiff() {

    }

    grabDaysIntoYear(event) {
        this.setState({ userYear: event.target.value });
    }

    render() {
        const { userDay } = this.state
        const { userYear } = this.state

        return (
            <div>
                <select id="Month" onChange={this.getUserMonth}>
                    {MonthData.map((month) => (<option value={month.name} key={month.name}>{month.name}</option>))}
                </select>
                <input id="Day" value={userDay} onChange={this.getUserDay} />
                <input id="Year" value={userYear} onChange={this.getUserYear} />
            </div>
        );
    }
}

export default App;
