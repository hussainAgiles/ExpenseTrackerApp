import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import DatePicker from './DatePicker';
import MonthYearPicker from './MonthYearPicker';
import {primaryColor, textColor} from '../Utils/CustomColors';

const DateTypeSelection = ({date,sendDateToHome}) => {
    
  const options = ['Day', 'Month', 'Year'];
  const [selectedDate, setSelectedDate] = useState(date);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Year');
  const [selectedValue, setSelectedValue] = useState(
    moment(date).format('MMMM, YYYY'),
  );

  // Options selection: Day, Month and Year
  const handleSelectOption = index => {
    // console.log("hello handle Selection",index)
    const presentDate = new Date();
    setSelectedDate(presentDate);
    const text = options[index];
    // console.log("handle ==== ",text)
    setSelectedOption(text);
    if (text === 'Day') setSelectedValue(presentDate.toDateString());
    else if (text === 'Year') setSelectedValue(presentDate.getFullYear());
    else setSelectedValue(moment(presentDate).format('MMMM, YYYY'));
    if (text === 'Year') sendDateToHome(text, presentDate.getFullYear());
    else sendDateToHome(text, presentDate);
  };

  // Date returned from Day and Month picker
  const handleDateValue = date => {
    setShowPicker(false);
    setSelectedDate(date);
    if (selectedOption === 'Day') setSelectedValue(date.toDateString());
    else setSelectedValue(moment(date).format('MMMM, YYYY'));
    sendDateToHome(selectedOption, date);
  };

  // Previous and Next buttons
  const handleNavigation = type => {
    // console.log("Type in prev and next button",type)
    let tempDate = selectedDate;
    if (selectedOption === 'Day') {
      if (type === 'Prev') tempDate.setDate(tempDate.getDate() - 1);
      else tempDate.setDate(tempDate.getDate() + 1);
      setSelectedValue(tempDate.toDateString());
      setSelectedDate(tempDate);
      sendDateToHome(selectedOption, tempDate);
    } else if (selectedOption === 'Month') {
      if (type === 'Prev') tempDate.setMonth(tempDate.getMonth() - 1);
      else tempDate.setMonth(tempDate.getMonth() + 1);
      setSelectedValue(moment(tempDate).format('MMMM, YYYY'));
      setSelectedDate(tempDate);
      sendDateToHome(selectedOption, tempDate);
    } else {
      if (type === 'Prev') tempDate.setMonth(tempDate.getMonth() - 12);
      else tempDate.setMonth(tempDate.getMonth() + 12);
      setSelectedValue(tempDate.getFullYear());
      setSelectedDate(tempDate);
      sendDateToHome(selectedOption, tempDate.getFullYear());
    }
  };

  const pickerTypeDisplay = () => {
    if (selectedOption === 'Month')
      return <MonthYearPicker handleSelectDate={handleDateValue} />;
    if (selectedOption === 'Day') {
      return (
        <DatePicker
          handleSelectDate={handleDateValue}
          showFutureDates={false}
        />
      );
    }
  };

  useEffect(() => {
    setSelectedDate(date);
    setSelectedValue(moment(date).format('MMMM, YYYY'));
  }, [date]);

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        {options.map((option, index) => (
          <Text
            key={index}
            style={[
              styles.optionText,
              selectedOption === option && styles.active,
            ]}
            onPress={() => handleSelectOption(index)}>
            {option}
          </Text>
        ))}
      </View>
      <View style={styles.selected}>
        <Text
          style={styles.navigationButtons}
          onPress={() => handleNavigation('Prev')}>
          {'<'}
        </Text>
        {selectedOption === 'Year' ? (
          <Text style={styles.selectedText}>{selectedValue}</Text>
        ) : (
          <Text
            style={[styles.selectedText, {borderBottomWidth: 1}]}
            onPress={() => setShowPicker(true)}>
            {selectedValue}
          </Text>
        )}
        {selectedDate.toLocaleDateString() ===
        new Date().toLocaleDateString() ? (
         <Text style={[styles.navigationButtons, {color: '#b8b3b1',fontFamily:'EduSABeginner-Bold'}]}>
            {'>'}
          </Text> 
        ) : (
          <Text
            style={styles.navigationButtons}
            onPress={() => handleNavigation('Next')}>
            {'>'}
          </Text>
        )}
      </View>
      <View>{showPicker && pickerTypeDisplay()}</View>
    </View>
  );
};

export default DateTypeSelection;

const styles = StyleSheet.create({
  container: {
    flexGrow: 2,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    color: textColor,
    fontSize: 18,
    fontFamily:'EduSABeginner-Medium'
  },
  active: {
    color: primaryColor,
    borderBottomColor: primaryColor,
    borderBottomWidth: 2,
    fontFamily:'EduSABeginner-SemiBold'
  },
  selected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: textColor,
    fontSize:16,
    fontFamily:'EduSABeginner-Bold'
  },
  navigationButtons: {
    color: textColor,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
