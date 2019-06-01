import React from "react";
import dateFns from "date-fns";
import './styles.css';
import Modal from 'react-modal';
import AddEvent from '../EventModal';

class CalendarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            modalIsOpen: false
        };
        this.eventsArray = [];
        this.selectedEvent = {};
    }
  

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDaysofWeek() {
    const dateFormat = "ddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const copyDay = day;
        days.push(
          <div
            className='col cell'
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(copyDay))}
          >
            {dateFns.isSameMonth(day, monthStart) && <span className="number">{formattedDate}</span>}
            {this.eventsArray.map(event => (
                dateFns.isSameDay(day, event.date) && (
                <div 
                    key={event.id} 
                    style={{background: event.color}}
                    onClick={(e) => this.openAndPopulateModal(e, event)}
                >
                    {event.title}
                </div>
                )
            ))}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    }, () => {
        this.openModal();
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  addEventToArray = (event) => {
    this.eventsArray.push(event);
  }

  openAndPopulateModal = (e, event) => {
      e.stopPropagation();
      this.selectedEvent = event;
      this.openModal();
  }


  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDaysofWeek()}
        {this.renderCells()}

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          <AddEvent 
            onClose={this.closeModal}
            selectedDate={this.state.selectedDate}
            saveEvent={this.addEventToArray}
            selectedEvent={this.selectedEvent}/>
        </Modal>
      </div>
    );
  }
}

export default CalendarView;