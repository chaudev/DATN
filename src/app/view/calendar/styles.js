import {StyleSheet} from 'react-native';
import {settings} from '../../config';

const HeaderStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftButton: {
    width: 100,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  rightButton: {
    width: 100,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: settings.colors.colorMain,
  },
  buttonIcon: {
    fontSize: 26,
    color: settings.colors.colorMain,
  },
});

const MainStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(244,245,246)',
  },
  image: {
    width: '100%',
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1.5,
  },
});

// Cái này trong doc của react-native-calendar
const CalendarTheme = {
  backgroundColor: '#fff',
  calendarBackground: '#fff',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#ffcdd2',
  selectedDayTextColor: '#000',
  todayTextColor: '#fff',
  todayBackgroundColor: settings.colors.colorGreen,
  dayTextColor: settings.colors.colorThumblr,
  textDisabledColor: '#d9e1e8',
  selectedDotColor: '#000',
  arrowColor: settings.colors.colorMain,
  monthTextColor: settings.colors.colorGreen,
  indicatorColor: settings.colors.colorGreen,
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

export {CalendarTheme, HeaderStyles, MainStyles, LoadingStyles};
