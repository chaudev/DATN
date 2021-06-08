import {StyleSheet} from 'react-native';
import {settings} from '../../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imgBackground: {
    width: '100%',
    backgroundColor: settings.colors.colorMain,
    height: 150,
  },
  viewButton: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: settings.colors.colorMain,
    height: 40,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBtn: {
    width: 50,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fakeView: {
    height: 70,
    backgroundColor: settings.colors.colorMain,
  },
});

const mainStyles = StyleSheet.create({
  mainContainer: {
    height: 130,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 3,
  },
  currenTitle: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ECEFF1',
  },
  title: {
    fontSize: 14,
    color: '#546E7A',
  },
  cardIcon: {
    fontSize: 22,
    color: settings.colors.colorMain,
    marginLeft: 15,
  },
  botContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    zIndex: 9999,
  },
  botContainerX: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderColor: '#CFD8DC',
  },
  curMoney: {
    fontSize: 22,
    color: '#546E7A',
    fontWeight: 'bold',
  },
});

const body = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: 55,
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#8BC34A',
    borderRadius: 13,
  },
  icon: {
    fontSize: 28,
    color: '#fff',
  },
  textTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export {styles, mainStyles, body};
