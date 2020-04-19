import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css'
import { FormSelect, FormInput, Alert } from 'shards-react'

class App extends React.Component {
    constructor(props) {
        super(props);
        // Initialize today as a constant date
        const today = new Date();
        this.state = {
            userMonth: '',
            userDay: 0,
            userYear: 0,
            thirtyOneDayMonths: ['January', 'March', 'May', 'July', 'August', 'October', 'December'],
            thirtyDayMonths: ['April', 'June', 'September', 'November'],
            daysPerYear: 365,
            currentYear: today.getFullYear(),
            daysAlertVisible: false,
            yearAlertVisible: false,
        };

        this.getUserMonth = this.getUserMonth.bind(this);
        this.getUserDay = this.getUserDay.bind(this);
        this.getUserYear = this.getUserYear.bind(this);
        this.getLeapYears = this.getLeapYears.bind(this);
        this.grabYearsDiff = this.grabYearsDiff.bind(this);
        this.grabDaysIntoBirthYear = this.grabDaysIntoBirthYear.bind(this);
        this.grabDaysIntoCurrentYear = this.grabDaysIntoCurrentYear.bind(this);
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
                this.setState({ daysAlertVisible: true })
            } else {
                this.setState({ userDay: event.target.value });
                this.setState({ daysAlertVisible: false })
            }
        } else if (thirtyOneDayMonths.find((element) => (element === userMonth))) {
            if (event.target.value > 31) {
                this.setState({ daysAlertVisible: true })
            } else {
                this.setState({ userDay: event.target.value });
                this.setState({ daysAlertVisible: false })
            }
        } else if (thirtyDayMonths.find((element) => (element === userMonth))) {
            if (event.target.value > 30) {
                this.setState({ daysAlertVisible: true })
            } else {
                this.setState({ userDay: event.target.value });
                this.setState({ daysAlertVisible: false })
            }
        } else {
            this.setState({ userDay: event.target.value })
        }
    }

    getUserYear(event) {
        if (event.target.value.length < 5) {
            this.setState({ userYear: event.target.value });
            this.setState({ yearAlertVisible: false })
        } else {
            this.setState({ yearAlertVisible: true })
        }
    }

    grabDaysFromYearDiff(yearDiff) {
        const { daysPerYear } = this.state
        const daysFromYearDiff = yearDiff * daysPerYear
        
        return daysFromYearDiff
    }

    grabDaysIntoCurrentYear() {
        const today = new Date()

        let daysIntoCurrentYear = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000)
        console.log(daysIntoCurrentYear) 
    }

    grabDaysIntoBirthYear() {
        const { userYear } = this.state
        const { userMonth } = this.state
        const { userDay } = this.state

        const birthdate = new Date(userMonth + " " + userDay + ", " + userYear)

        // Returns one less (July 2 is the 183rd day, but returns 182 due to being 182 days into the year)
        let daysSince = Math.ceil((birthdate - new Date(birthdate.getFullYear(), 0, 1)) / 86400000);
        console.log(daysSince)
    }

    getFinalAmountOfDays(daysIntoBirthYear, daysIntoCurrentYear, leapYearCount, yearDiff) {
        /* Need to subtract 2 from yearDiff for birth year and current year,
        add one to each of the days into so they are equal to the current and birth day*/

        const { daysPerYear } = this.state
    }
    
    grabYearsDiff() {
        const { currentYear } = this.state
        const { userYear } = this.state

        const yearDiff = currentYear - userYear

        return yearDiff
    }

    render() {
        const { userDay } = this.state
        const { userYear } = this.state

        return (
            <div>
                <table style={{ "width": "100%" }}>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Day</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ "width": "33%" }}>
                                <FormSelect id="Month" onChange={this.getUserMonth}>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </FormSelect>
                            </td>

                            <td style={{ "width": "33%" }}>
                                <FormInput id="Day" value={userDay} onChange={this.getUserDay} />
                            </td>

                            <td style={{ "width": "33%" }}>
                                <FormInput id="Year" value={userYear} onChange={this.getUserYear} />
                            </td>
                        </tr>
                        <tr>
                            <td />
                            <td>
                                <Alert theme="danger" open={this.state.daysAlertVisible}>Please choose a valid day for the month</Alert>
                            </td>
                            <td>
                                <Alert theme="danger" open={this.state.yearAlertVisible}>Please enter in a valid year</Alert>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.grabDaysIntoCurrentYear}></button>
            </div>
        );
    }
}

export default App;
