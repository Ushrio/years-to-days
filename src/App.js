import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import {
    FormSelect, FormInput, Alert, Button,
} from 'shards-react';

class App extends React.Component {
    constructor(props) {
        super(props);
        // Initialize today as a constant date
        this.state = {
            userMonth: '',
            userDay: 0,
            userYear: 0,
            totalDays: 0,
            thirtyOneDayMonths: ['January', 'March', 'May', 'July', 'August', 'October', 'December'],
            thirtyDayMonths: ['April', 'June', 'September', 'November'],
            daysAlertVisible: false,
            yearAlertVisible: false,
            totalDaysAlertVisible: false,
        };

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

        if (this.userMonth === 'February') {
            if (event.target.value > 28) {
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
        } else {
            this.setState({ yearAlertVisible: true });
        }
    }

    getTotalDays() {
        const { userYear } = this.state;
        const { userMonth } = this.state;
        const { userDay } = this.state;
        const { totalDaysAlertVisible } = this.state;
        const { totalDays } = this.state;
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
                                    <FormInput id="Day" value={userDay} onChange={this.getUserDay} />
                                </td>

                                <td style={{ width: '33%' }}>
                                    <FormInput id="Year" value={userYear} onChange={this.getUserYear} />
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
                    <Button theme="primary" outline onClick={this.getTotalDays}>Find Out How Many Days</Button>
                </div>
                <div>
                    <br />
                    <Alert theme="success" open={totalDaysAlertVisible}>
                        The total days is
                        {' '}
                        {totalDays}
                    </Alert>
                </div>
            </div>
        );
    }
}

export default App;
