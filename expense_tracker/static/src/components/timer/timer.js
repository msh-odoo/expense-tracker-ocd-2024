import { Component, onMounted, onWillUnmount, useState } from "@odoo/owl";

export class Timer extends Component {
    static template = "expense_tracker.timer";

    setup() {
        const currentDate = new Date();
        const result = this.interval(currentDate, this.env.datetime);
        this.state = useState({ time: {days: result.days, hours: result.hours, minutes: result.minutes, seconds: result.seconds} });

        let intervalId;
        onMounted(() => {
            intervalId = setInterval(() => {
                this.updateTime();
            }, 1000);
        });

        onWillUnmount(() => {
            clearInterval(intervalId);
        });
    }

    interval(date1, date2) {
        let delta = Math.abs(date1 - date2) / 1000;

        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        const seconds = Math.floor(delta) % 60;

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    updateTime() {
        let seconds = this.state.time.seconds;
        let minutes = this.state.time.minutes;
        let hours = this.state.time.hours;
        let days = this.state.time.days;

        seconds += 1;
        if (seconds === 60) {
            seconds = 0;
            minutes += 1;
        }
        if (minutes === 60) {
            minutes = 0;
            hours += 1;
        }
        if (hours === 24) {
            hours = 0;
            days += 1;
        }

        this.state.time.seconds = seconds;
        this.state.time.minutes = minutes;
        this.state.time.hours = hours;
        this.state.time.days = days;
    }

}
