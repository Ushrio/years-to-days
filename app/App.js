import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userMonth: '',
            userDay: 0,
            userYear: 0,
            thirtyOneDayMonths: ['January', 'March', 'May', 'July', 'August', 'October', 'December'],
            thirtyDayMonths: ['April', 'June', 'September', 'November'],
            months: [],
            daysPerYear: 365,
        };

        this.getUserMonth = this.getUserMonth.bind(this);
        this.getUserDay = this.getUserDay.bind(this);
        this.getUserYear = this.getUserYear.bind(this);
    }

    getLeapYears() {

    }

    getMonthsInfo() {
        f
    }

    getUserMonth(event) {
        const { months } = this.state;
        
        if (this.months.find(element => (element !== event.target.value))) {
            console.log('Not a valid month assignment')
        } else {
            this.setState({ userMonth: event.target.value });
        }
    }

    getUserDay(event) {
        const { userMonth } = this.state;
        const { thirtyOneDayMonths } = this.state;
        const { thirtyDayMonths } = this.state;

        if (this.userMonth === 'February') {
            if (event.target.value > 28) {
                console.log('Not a valid value for the month');
            } else {
                this.setState({ userDay: event.target.value });
            }
        } else if (thirtyOneDayMonths.find(element => (element === userMonth))) {
            if (event.target.value > 31) {
                console.log('Not a valid value for the month');
            } else {
                this.setState({ userDay: event.target.value });
            }
        } else if (thirtyDayMonths.find(element => (element === userMonth))) {
            if (event.target.value > 30) {
                console.log('Not a valid value for the month');
            } else {
                this.setState({ userDay: event.target.value });
            }
        } else {
            this.setState({ userDay: event.target.value });
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
        return (
            <div>
                <select id="Month" value={this.state.userMonth} onChange={this.getUserMonth}>
                    {this.state.months.map((month) => {
                        <option key={month} value={month}>{month}</option>
                    })}
                </select>
                <input id="Day" value={this.state.userDay} onChange={this.getUserDay} />
                <input id="Year" value={this.state.userYear} onChange={this.getUserYear} />
            </div>
        );
    }
}

export default App;
