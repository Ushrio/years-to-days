import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import { FormSelect, FormInput, Alert, Button } from 'shards-react';

function verifyLeapYear(year) {
    /* In order for the year to be a leap year if must be divisible
    by 4 and not divisible by 100 unless it is the start of a
    century in which case it must be divisible by 400 */

    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        // Initialize today as a constant date
        this.state = {
            userMonth: '',
            userDay: 0,
            userYear: 0,
            totalDays: 0,
            userYearIsLeapYear: false,
            thirtyOneDayMonths: ['January', 'March', 'May', 'July', 'August', 'October', 'December'],
            thirtyDayMonths: ['April', 'June', 'September', 'November'],
            daysAlertVisible: false,
            yearAlertVisible: false,
            totalDaysAlertVisible: false,
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUserMonth = this.getUserMonth.bind(this);
        this.getUserDay = this.getUserDay.bind(this);
        this.getUserYear = this.getUserYear.bind(this);
        this.getTotalDays = this.getTotalDays.bind(this);
    }

    componentDidMount() {
        const elem = document.getElementById('Month');
        // Sets the userMonth immediately after rendering
        if (elem) {
            const event = new Event('change', { bubbles: true });
            elem.dispatchEvent(event);
        } else {
            console.log('Could not find Month dropdown');
        }
    }

    getUserMonth(event) {
        this.setState({ userMonth: event.target.value });
    }

    getUserDay(event) {
        const { userMonth } = this.state;
        const { thirtyOneDayMonths } = this.state;
        const { thirtyDayMonths } = this.state;
        const { userYearIsLeapYear } = this.state;

        if (userMonth === 'February') {
            if (userYearIsLeapYear === false && event.target.value > 28) {
                this.setState({ daysAlertVisible: true });
            } else if (userYearIsLeapYear === true && event.target.value > 29) {
                this.setState({ daysAlertVisible: true });
            } else {
                this.setState({ userDay: event.target.value });
                this.setState({ daysAlertVisible: false });
            }
        } else if (thirtyOneDayMonths.find((element) => (element === userMonth))) {
            if (event.target.value > 31) {
                this.setState({ daysAlertVisible: true });
            } else {
                this.setState({ userDay: event.target.value });
                this.setState({ daysAlertVisible: false });
            }
        } else if (thirtyDayMonths.find((element) => (element === userMonth))) {
            if (event.target.value > 30) {
                this.setState({ daysAlertVisible: true });
            } else {
                this.setState({ userDay: event.target.value });
                this.setState({ daysAlertVisible: false });
            }
        } else {
            this.setState({ userDay: event.target.value });
        }
    }

    getUserYear(event) {
        if (event.target.value.length < 5) {
            this.setState({ userYear: parseInt(event.target.value, 10) });
            this.setState({ yearAlertVisible: false });
            this.setState({ userYearIsLeapYear: verifyLeapYear(event.target.value) })
        } else {
            this.setState({ yearAlertVisible: true });
        }
    }

    getTotalDays() {
        const { userYear } = this.state;
        const { userMonth } = this.state;
        const { userDay } = this.state;
        const today = new Date();
        const birthday = new Date(`${userMonth} ${userDay}, ${userYear}`);

        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

        const total = Math.ceil((today.getTime() - birthday.getTime()) / (oneDayInMilliseconds));
        this.setState({ totalDaysAlertVisible: true });
        this.setState({ totalDays: total });
    }


    render() {
        const { userDay } = this.state;
        const { userYear } = this.state;
        const { daysAlertVisible } = this.state;
        const { yearAlertVisible } = this.state;
        const { totalDaysAlertVisible } = this.state;
        const { totalDays } = this.state

        return (
            <div>
                <div>
                    <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>What Day Were You Born?</h1>
                    <br />
                </div>
                <div>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Day</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ width: '33%' }}>
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

                                <td style={{ width: '33%' }}>
                                    <FormInput id="Day" value={userDay} type="number" onChange={this.getUserDay} />
                                </td>

                                <td style={{ width: '33%' }}>
                                    <FormInput id="Year" value={userYear} type="number" onChange={this.getUserYear} />
                                </td>
                            </tr>
                            <tr>
                                <td />
                                <td>
                                    <Alert theme="danger" open={daysAlertVisible}>Please choose a valid day for the month</Alert>
                                </td>
                                <td>
                                    <Alert theme="danger" open={yearAlertVisible}>Please enter in a valid year</Alert>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <br />
                    <Button theme="primary" outline onClick={this.getTotalDays}>Find Out How Many Days You Have Been Alive</Button>
                </div>
                <div>
                    <br />
                    <Alert style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} theme="success" open={totalDaysAlertVisible}>
                        The total amount of days you have been alive is
                        {' '}
                        {totalDays}
                    </Alert>
                </div>
            </div>
        );
    }
}



export default App;
