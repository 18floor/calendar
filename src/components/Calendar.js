import React, {Component} from "react";
import moment from "moment";
import 'moment/locale/ru';
import {nanoid} from "nanoid";

class Calendar extends Component {

    render() {
        const {date} = this.props;
        const nowDayName = moment(date).format('dddd');
        const nowDate = moment(date).format('D');
        const monthNameDeclension = moment(date).format('D MMMM').split(' ')[1];
        const monthName = moment(date).format('MMMM');
        const nowYear = moment(date).format('YYYY');

        const visibleDay = moment(date).startOf('month').startOf('week');
        let visibleDays = [];
        for (let i = 0; i < 7 * 5; i++) {
            const currentDay = visibleDay.clone().add(i, 'day');
            visibleDays.push({
                date: currentDay.date(),
                isOtherMonth: currentDay.format('MMMM') !== monthName,
                isCurrentDay: currentDay.format('D MMMM') === moment(date).format('D MMMM')
            })
        }

        return (
            <div className="ui-datepicker">
                <div className="ui-datepicker-material-header">
                    <div className="ui-datepicker-material-day">{nowDayName}</div>
                    <div className="ui-datepicker-material-date">
                        <div className="ui-datepicker-material-day-num">{nowDate}</div>
                        <div className="ui-datepicker-material-month">{monthNameDeclension}</div>
                        <div className="ui-datepicker-material-year">{nowYear}</div>
                    </div>
                </div>
                <div className="ui-datepicker-header">
                    <div className="ui-datepicker-title">
                        <span className="ui-datepicker-month">{monthName}</span>&nbsp;<span
                        className="ui-datepicker-year">{nowYear}</span>
                    </div>
                </div>
                <table className="ui-datepicker-calendar">
                    <colgroup>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col/>
                        <col className="ui-datepicker-week-end"/>
                        <col className="ui-datepicker-week-end"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        new Array(5).fill(0).map((week, i) => (
                            <tr key={nanoid()}>
                                {
                                    visibleDays.slice(i * 7, i * 7 + 7)
                                        .map((day, i) => (
                                            <td key={nanoid()}
                                                className={day.isOtherMonth ? 'ui-datepicker-other-month' : day.isCurrentDay ? 'ui-datepicker-today' : null}>
                                                {day.date}
                                            </td>
                                        ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Calendar;