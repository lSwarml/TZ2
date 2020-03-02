import React, {Component} from 'react';
import './App.css';
import data from './datajs'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import moment from "moment";


class App extends Component {
    state = {
        name: '',
        sname: '',
        fname: '',
        phone: '',
        felial: '',
        dateDate: new Date(),
        section: '',
        doctor: '',
        type: '',
        calendarWeekends: true,
        calendarEvents: [
            {
                title: 'Запись занята',
                 start: '2020-03-02 08:00',
                 end: '2020-03-02 08:15',
                 backgroundColor: '#800000'
             },
             {
                 title: 'Запись занята',
                 start: '2020-03-02 08:15',
                 end: '2020-03-02 08:30',
                 backgroundColor: '#800000'
             }, {
                 title: 'Запись занята',
                 start: '2020-03-02 10:00',
                 end: '2020-03-02 10:15',
                 backgroundColor: '#800000'
             }, {
                 title: 'Запись занята',
                 start: '2020-03-02 12:30',
                 end: '2020-03-02 12:45',
                 backgroundColor: '#800000'
            }
        ]
    };

    calendarComponentRef = React.createRef();

    handleDateClick = (arg) => {
        console.log(this.state)

        const CorrDate = moment(arg.date).add(15, 'minutes');
        // this.setState({calendarEvents: [{title: 'Запись занята', start: arg.date, end: CorrDate._d}]});

        let reg = this.state.calendarEvents;
        //console.log(reg);
        // eslint-disable-next-line no-undef
       //let ForData =  arg.date.getFullYear() + '-' + (arg.date.getDate() < 10 ? '0' + arg.date.getDate() : arg.date.getDate()) + '-' +(arg.date.getMonth() < 9 ? '0' + (arg.date.getMonth() + 1) : arg.date.getMonth()+1) + ' ' + (arg.date.getHours() < 10 ? '0' + arg.date.getHours() : arg.date.getHours())+ ':' + (arg.date.getMinutes() < 10 ? '0' + arg.date.getMinutes() : arg.date.getMinutes());
      // let ForCorData = CorrDate._d.getFullYear() + '-' + (CorrDate._d.getDate() < 10 ? '0' + CorrDate._d.getDate() : CorrDate._d.getDate()) + '-' +(CorrDate._d.getMonth() < 9 ? '0' + (CorrDate._d.getMonth() + 1) : CorrDate._d.getMonth()+1) + ' ' + (CorrDate._d.getHours() < 10 ? '0' + CorrDate._d.getHours() : CorrDate._d.getHours())+ ':' + (CorrDate._d.getMinutes() < 10 ? '0' + CorrDate._d.getMinutes() : CorrDate._d.getMinutes());
       //reg.push({title: 'Новая запись', start:arg.date, end: CorrDate._d ,backgroundColor: '#222b80'});
        console.log(reg);
         //this.setState(reg);
        this.setState({calendarEvents:[ {title: 'Новая запись', start:arg.date, end: CorrDate._d ,backgroundColor: '#222b80'}]})
        //console.log(ForData);

    };

    handleEventClick = (arg) => {
        console.log(arg.event.start);
    };

    change = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };

    businessHours = {
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
        startTime: '8:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
    }

    render() {

        let SecItem;
        let DocItem;
        let DateTile;
        let FelialItem = data.felials.map(d => <option key={d.id} value={d.id}>{d.name} </option>);

        this.state.felial ? SecItem = data.felials[this.state.felial].sections.map(d => <option key={d.id}
                                                                                                value={d.id}>{d.name} </option>) : SecItem = '';


        this.state.section && this.state.felial ? DocItem = data.felials[this.state.felial].sections[this.state.section].doctors.map(d =>
            <option key={d.id} value={d.id}>{d.name} </option>) : DocItem = '';

        //Не работает ,пытаюсь вытащить дни, вылит ошибки
        //this.state.section && this.state.felial && this.state.doctor  ? DateTile = data.felials[this.state.felial].sections[this.state.section].doctors[this.state.doctor].maxDate :DateTile = '';

        return (
            <div className="App">
                <form className="form">
                    <h1>Запись на прием</h1>
                    <div className='FIO'>
                        <input required className='textbox' name='sname' placeholder='Фамилия' value={this.state.sname}
                               onChange={this.change}/>
                        <input required style={{marginRight: 2 + "%", marginLeft: 2 + "%"}} name='name'
                               className='textbox'
                               placeholder='Имя' value={this.state.name} onChange={this.change}/>
                        <input className='textbox' name='fname' placeholder='Отчество' value={this.state.fname}
                               onChange={this.change}/>
                    </div>
                    <div>
                        <input required className='textbox' name='phone' type="tel" placeholder='Телефон'
                               onChange={this.change}/>
                    </div>
                    <div>
                        <select required name="felial" id="" className='textbox' onChange={this.change}>
                            <option value=''>Филиал</option>
                            {FelialItem}
                        </select>
                    </div>
                    <div>
                        <select required name="section" id="" className='textbox' onChange={this.change}>
                            <option value=''>Раздел</option>
                            {SecItem}
                        </select>
                    </div>
                    <div>
                        <select required name="type" id="" className='textbox' onChange={this.change}>
                            <option value=''>Тип записи</option>
                            <option value="1">Первичная</option>
                            <option value="2">Повторная</option>
                        </select>
                    </div>
                    <div>
                        <select required name="doctor" id="" className='textbox' onChange={this.change}>
                            <option value=''>Врач</option>
                            {DocItem}
                        </select>
                    </div>
                    <div>
                        <FullCalendar
                            locale="ru"
                            locales={[ruLocale]}
                            defaultView="timeGridWeek"
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            header={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'timeGridWeek,timeGridDay'
                            }}
                            ref={this.calendarComponentRef}
                            weekends={this.state.calendarWeekends}
                            events={this.state.calendarEvents}
                            dateClick={this.handleDateClick}
                            eventClick={this.handleEventClick}
                            businessHours={this.businessHours}
                            minTime='8:00'
                            maxTime='18:00'
                            minTime='8:00'
                            updateSize
                            contentHeight="auto"
                            slotDuration='00:15:00'
                            selectConstraint='2020-03-02 10:30'
                        />


                    </div>
                    <button className='button'>Записаться</button>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        console.log(this.state)
    }
}

export default App;
