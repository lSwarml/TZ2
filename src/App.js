import React, { Component } from "react";
import "./App.css"
import data from "./datajs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from "@fullcalendar/core/locales/ru";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import moment from "moment";

class Apps extends Component {
    state = {
        name: "",
        sname: "",
        fname: "",
        phone: "",
        felial: "",
        section: "",
        doctor: "",
        type: "",
        calendarWeekends: true,
        calendarEvents: ""
    };

    calendarComponentRef = React.createRef();
    reg = this.state.calendarEvents;

    handleDateClick = arg => {

        const CorrDate = moment(arg.date).add(15, "minutes");
        this.setState({
            calendarEvents: [
                ...this.reg,
                { title: "Новая запись", start: arg.date, end: CorrDate._d , id_doc: this.state.doctor}
            ]
        });
    };
    change = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    render() {
        let SecItem;
        let DocItem;
        let Calendar;
        let PostEvents;
        let PostEventsItems = [];
        let FelialItem = data.felials.map(d => (
            <option key={d.id} value={d.id}>
                {d.name}{" "}
            </option>
        ));

        if (this.state.calendarEvents.length >= 1) {
            if (this.state.calendarEvents[0].id_doc !== this.state.doctor) {
                this.setState({ calendarEvents: "" });
            }
        }

        if (this.state.felial) {
            SecItem = data.felials[this.state.felial].sections.map(d => (
                <option key={d.id} value={d.id}>
                    {d.name}{" "}
                </option>
            ));
        } else {
            SecItem = "";
            if (this.state.section) {
                this.setState({ section: "" });
                this.setState({ doctor: "" });
                this.setState({ calendarEvents: "" });
            }
        }
        if (this.state.section && this.state.felial) {
            DocItem = data.felials[this.state.felial].sections[
                this.state.section
                ].doctors.map(d => (
                <option key={d.id} value={d.id}>
                    {d.name}{" "}
                </option>
            ));
        } else {
            DocItem = "";
            if (this.state.doctor) {
                this.setState({ doctor: "" });
                this.setState({ calendarEvents: "" });
            }
        }

        if (this.state.section && this.state.felial && this.state.doctor) {
            PostEvents =
                data.felials[this.state.felial].sections[this.state.section].doctors[
                    this.state.doctor
                    ].event;

            let i = 0;
            if (PostEvents) {
                for (i = 0; i < PostEvents.length; i++) {
                    if (PostEvents[i].id_doc === this.state.doctor) {
                        PostEventsItems.push({
                            id_doc: PostEvents[i].id_doc,
                            title: "Запись занята",
                            start: PostEvents[i].start,
                            end: PostEvents[i].end,
                            backgroundColor: "#800000"
                        });
                    }
                }
            }

            if (this.state.calendarEvents.length === 0) {
                this.setState({ calendarEvents: PostEventsItems });
            }
            else if (this.state.calendarEvents.length === 1 && this.state.calendarEvents[0].title === "Новая запись") {
                this.setState({
                    calendarEvents: [
                        ...this.state.calendarEvents,
                        ...PostEventsItems
                    ]
                });
            }

            Calendar = (
                <FullCalendar
                    locale="ru"
                    locales={[ruLocale]}
                    defaultView="timeGridWeek"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "timeGridWeek,timeGridDay"
                    }}
                    ref={this.calendarComponentRef}
                    weekends={this.state.calendarWeekends}
                    dateClick={this.handleDateClick}
                    events={this.state.calendarEvents}
                    minTime={
                        data.felials[this.state.felial].sections[this.state.section]
                            .doctors[this.state.doctor].minTime
                    }
                    maxTime={
                        data.felials[this.state.felial].sections[this.state.section]
                            .doctors[this.state.doctor].maxTime
                    }
                    updateSize
                    contentHeight="auto"
                    slotDuration="00:15:00"
                    hiddenDays={
                        data.felials[this.state.felial].sections[this.state.section]
                            .doctors[this.state.doctor].hidden
                    }
                />
            );
        } else {
            Calendar = "";
        }

        return (
            <div className="Apps">
                <form className="form">
                    <h1>Запись на прием</h1>
                    <div className="FIO">
                        <input
                            required
                            className="textbox"
                            name="sname"
                            placeholder="Фамилия"
                            value={this.state.sname}
                            onChange={this.change}
                        />
                        <input
                            required
                            style={{ marginRight: 2 + "%", marginLeft: 2 + "%" }}
                            name="name"
                            className="textbox"
                            placeholder="Имя"
                            value={this.state.name}
                            onChange={this.change}
                        />
                        <input
                            className="textbox"
                            name="fname"
                            placeholder="Отчество"
                            value={this.state.fname}
                            onChange={this.change}
                        />
                    </div>
                    <div>
                        <input
                            required
                            className="textbox"
                            name="phone"
                            type="tel"
                            placeholder="Телефон"
                            onChange={this.change}
                        />
                    </div>
                    <div>
                        <select
                            required
                            name="felial"
                            id="filial-from"
                            className="textbox"
                            onChange={this.change}
                        >
                            <option value="">Филиал</option>
                            {FelialItem}
                        </select>
                    </div>
                    <div>
                        <select
                            required
                            name="section"
                            id="section-form"
                            className="textbox"
                            onChange={this.change}
                        >
                            <option value="">Раздел</option>
                            {SecItem}
                        </select>
                    </div>
                    <div>
                        <select
                            required
                            name="type"
                            id="type-form"
                            className="textbox"
                            onChange={this.change}
                        >
                            <option value="">Тип записи</option>
                            <option value="1">Первичная</option>
                            <option value="2">Повторная</option>
                        </select>
                    </div>
                    <div>
                        <select
                            required
                            name="doctor"
                            id="doctor-form"
                            className="textbox"
                            onChange={this.change}
                        >
                            <option value="">Врач</option>
                            {DocItem}
                        </select>
                    </div>
                    <div>{Calendar}</div>
                    <button className="button-form-record">Записаться</button>
                </form>
            </div>
        );
    }
    componentDidUpdate() {
        console.log(this.state);
    }
}

export default Apps;
