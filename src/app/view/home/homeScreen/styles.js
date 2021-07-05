import {Platform, StyleSheet} from 'react-native';
import {settings} from '../../../config';

const MAX_HEIGHT = 240;
const mainColor = settings.colors.colorMain;

const mainStyles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const QLMH = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: '5%',
    backgroundColor: mainColor,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    marginLeft: -5,
  },
  iconBook: {
    fontSize: 20,
    color: '#fff',
    marginRight: -1,
  },
  textTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textSubTitle: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 10,
  },
  iconArrow: {
    fontSize: 30,
    color: '#fff',
    marginRight: -10,
  },
});

const styleTK = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderRadius: 12,
  },
  textTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },
  fakeView: {
    flex: 1,
  },
  number: {
    fontSize: 38,
    color: '#fff',
    marginLeft: 10,
  },
  textDetail: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: -10,
  },
  button: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ECEFF1',
    borderRadius: 500,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    fontSize: 30,
    color: '#fff',
  },
  pickerContainer: {
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: mainColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pickerCancel: {
    marginTop: -8,
    borderRadius: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#CFD8DC',
  },
  pickerSelect: {
    borderWidth: 0,
    borderColor: '#fff',
    alignItems: 'flex-start',
  },
  pickerOption: {
    marginTop: -8,
    borderRadius: 0,
    backgroundColor: '#fff',
  },
  iconPicker: {
    fontSize: 26,
    color: '#90A4AE',
    marginRight: 0,
  },
});

export {mainStyles, QLMH, styleTK};
