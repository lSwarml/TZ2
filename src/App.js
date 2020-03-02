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

    calendarComponentRef = React.createRef();  //Без поятия для чего это, брал их твоего примера, так то можно удалять наверно
    reg = this.state.calendarEvents;//Передаю стейт массив записей
    //Фунация выпоняемя при клике на дату в календаре
    handleDateClick = (arg) => {
        const CorrDate = moment(arg.date).add(15, 'minutes');//Берется выбранная дата и прибавляется к ней 15 минут, для обозначения интервала
        //console.log(this.state);
        this.setState //Берется предидущий стейт массив и добавляется к нему новая запись
        (
            {
                calendarEvents: [
                    ...this.reg,
                    {title: 'Новая запись', start: arg.date, end: CorrDate._d}
                ]
            }
            )


    };

    change = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };



    render() {

        let SecItem;
        let DocItem;
        let FelialItem = data.felials.map(d => <option key={d.id} value={d.id}>{d.name} </option>);
        //Проверка введеных данных и вывод с условием
        this.state.felial ? SecItem = data.felials[this.state.felial].sections.map(d => <option key={d.id}
                                                                                                value={d.id}>{d.name} </option>) : SecItem = '';

        //Проверка введеных данных и вывод с условием
        this.state.section && this.state.felial ? DocItem = data.felials[this.state.felial].sections[this.state.section].doctors.map(d =>
            <option key={d.id} value={d.id}>{d.name} </option>) : DocItem = '';


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
                            ref={this.calendarComponentRef}//Без поняти что это, см.стр.52
                            weekends={this.state.calendarWeekends}//Отображать ли выходные, в стейт внесен true , так то воск. убирается на стр.155 и это можно удолить
                            dateClick={this.handleDateClick}
                            events={this.state.calendarEvents}//Принемает массив с записями
                            minTime='8:00'
                            maxTime='18:00'
                            updateSize
                            contentHeight="auto"
                            slotDuration='00:15:00'//Дни раздерены на интервалы по 15 минут
                            hiddenDays={[0]} //Исключение воскресенья
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
