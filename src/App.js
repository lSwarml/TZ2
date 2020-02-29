import React, {Component} from 'react';
import './App.css';
import data from './datajs'
import Calendar from 'react-calendar';
import "react-datepicker/dist/react-datepicker.css";
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
        type: ''
    };


    change = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };

    render() {

        let SecItem;
        let DocItem;
        let DateTile ;
        let FelialItem = data.felials.map(d => <option key={d.id} value={d.id}>{d.name} </option>);

        this.state.felial ? SecItem = data.felials[this.state.felial].sections.map(d => <option key={d.id} value={d.id}>{d.name} </option>): SecItem = '';


        this.state.section && this.state.felial ? DocItem = data.felials[this.state.felial].sections[this.state.section].doctors.map(d => <option key={d.id} value={d.id}>{d.name} </option>):DocItem = '';

        //Не работает ,пытаюсь вытащить дни, вылит ошибки
        //this.state.section && this.state.felial && this.state.doctor  ? DateTile = data.felials[this.state.felial].sections[this.state.section].doctors[this.state.doctor].maxDate :DateTile = '';

        return (
            <div className="App">
                <form className="form">
                    <h1>Запись на прием</h1>
                    <div className='FIO'>
                        <input required className='textbox' name='sname' placeholder='Фамилия' value={this.state.sname} onChange={this.change}/>
                        <input required style={{marginRight: 2 + "%", marginLeft: 2 + "%"}} name='name' className='textbox'
                               placeholder='Имя' value={this.state.name} onChange={this.change}/>
                        <input className='textbox' name='fname'   placeholder='Отчество' value={this.state.fname} onChange={this.change}/>
                    </div>
                    <div>
                        <input required className='textbox' name='phone' type="tel" placeholder='Телефон' onChange={this.change}/>
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

                        <Calendar
                            onChange={this.change}
                            value={this.state.dateDate}
                            name='dateDate'
                            maxDate={DateTile}
                            // minDate='{}'
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
