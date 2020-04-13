import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userMonth: "",
            userDay: 0,
            userYear: 0,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            daysPerMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            daysPerYear: 365,
        };

        this.getUserMonth = this.getUserMonth.bind(this);
        this.getUserDay = this.getUserDay.bind(this);
        this.getUserYear = this.getUserYear.bind(this);
    }

    getLeapYears() {

    }

    grabYearsDiff() {

    }

    grabDaysIntoYear() {

    }

    getUserMonth(event) {
        this.setState({userMonth : event.target.value})
    }
    
    getUserDay(event) {
        if (this.userMonth == "February" && event.target.value > 28) {
            console.log("Not a valid value for the month")
        } else if (this.userMonth == "January" || this.userMonth == "March" || this.userMonth =="May" ||this.userMonth == "July" ||this.userMonth == "August" ||this.userMonth == "October" 
            || this.userMonth == "December" && event.target.value > 31) {
            console.log("Not a valid value for the month")
        } else if (this.userMonth == "April" ||this.userMonth == "June" ||this.userMonth == "September" ||this.userMonth == "November" && event.target.value > 30) {
            console.log("Not a valid value for the month")
        } else {
            this.setState({userDay : event.target.value})
        }
    }

    getUserYear(event) {
        this.setState({userYear : event.target.value})
    }

    render() {
        return (
            <div>
                <input id="Month" value={this.state.userMonth} onChange={this.getUserMonth}></input>
                <input id="Day" value={this.state.userDay} onChange={this.getUserDay}></input>
                <input id="Year" value={this.state.userYear} onChange={this.getUserYear}></input>
            </div>
        )        
    }
}

export default App;
