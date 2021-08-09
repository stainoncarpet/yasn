import React from 'react';

import DatePicker from 'react-date-picker';

const DateOfBirthPicker = ({ date, setDate }) => {

    return (
        <div className="field">
            <label className="label">Date of Birth</label>
            <div className="date-picker">
                <DatePicker
                    onChange={setDate}
                    value={date}
                />
            </div>
        </div>
    );
};

export default DateOfBirthPicker;