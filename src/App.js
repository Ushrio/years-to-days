import React from 'react';
import MonthData from './months'
import { FormSelect, FormInput } from 'shards-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css'

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
            currentYear: 2020,
        };

        this.getUserMonth = this.getUserMonth.bind(this);
        this.getUserDay = this.getUserDay.bind(this);
        this.getUserYear = this.getUserYear.bind(this);
        this.getLeapYears = this.getLeapYears.bind(this);
        this.grabYearsDiff = this.grabYearsDiff.bind(this);
    }

    componentDidMount() {
        const elem = document.getElementById('Month')
        
        // Sets the userMonth immediately after rendering
        if (elem) {
            const event = new Event('change', { bubbles: true })
            elem.dispatchEvent(event)
        } else {
            console.log('Could not find Month dropdown')
        }
    }

    getLeapYears() {
        /* The year must be evenly divisible by 4,
        Not evenly divisible by 100,
        and evenly divisible by 400 */
        let i = 0
        let leapYearCount = 0
        const { userYear } = this.state
        const { currentYear } = this.state

        for (i = userYear; i <= currentYear; i++) {
            if (i % 4 === 0) {
                if (i % 100 !== 0) {
                    leapYearCount += 1
                } else if (i % 400 === 0) {
                    leapYearCount += 1
                }
            }
        }

        console.log(leapYearCount)
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
        if (event.target.value.length < 5) {
            this.setState({ userYear: event.target.value });
        } else {
            console.log('You cannot enter a year that has more than 5 digits')
        }
    }

    grabYearsDiff() {
        const currentYear = 2020
        const { userYear } = this.state
        const yearDiff = currentYear - userYear

        return yearDiff
    }

    grabDaysFromYearDiff(yearDiff) {
        const { daysPerYear } = this.state
        const daysFromYearDiff = yearDiff * daysPerYear
        
        return daysFromYearDiff
    }

    grabDaysIntoCurrentYear() {
    
    }

    grabDaysIntoBirthYear() {

    }

    getFinalAmountOfDays() {

    }

    render() {
        const { userDay } = this.state
        const { userYear } = this.state

        return (
            <div>
                <div style={{ "width": "33%" }}>
                    <FormSelect id="Month" onChange={this.getUserMonth}>
                        {MonthData.map((month) => (<option value={month.name} key={month.name}>{month.name}</option>))}
                    </FormSelect>
                </div>
                <div style={{ "width": "33%" }}>
                    <FormInput id="Day" value={userDay} onChange={this.getUserDay} />
                </div>
                <div style={{ "width": "33%" }}>
                    <FormInput id="Year" value={userYear} onChange={this.getUserYear} />
                </div>
            </div>
        );
    }
}

export default App;
