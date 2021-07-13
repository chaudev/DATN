import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
} from 'react-native';
import {settings} from '../../../../config';
import {Icon, Picker} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {getCauHoiByMaMH} from '../../../../../server/BaiKiemTra/getCauHoiByMaMH';
import {getCD} from '../../../../../server/ChuDe/getCD';
import {Header} from '../../../../components/header';
import {createCTBKT} from '../../../../../server/BaiKiemTra/addQuest';
import Toast from 'react-native-simple-toast';
import SelectMultiple from 'react-native-select-multiple';

export const ThemCauHoi = () => {
  const focus = useIsFocused();
  const route = useRoute();
  const params = route.params;
  const MaMH = params.MaMH;
  const user = params.user;

  const [data, setData] = useState('');
  const [listChuDe, setListChuDe] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(-1);

  const [selectedFruits, setSelectedFruits] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState('');

  // Vừa focus vào là gọi refesh để lấy data
  useEffect(() => {
    if (focus) {
      getListChuDe();
      getData();
    }
  }, [focus]);

  // Khi lấy data xong khi không load nữa
  useEffect(() => {
    if (data !== '') {
      setLoading(false);
    }
  }, [data]);

  // filter
  useEffect(() => {
    getData();
  }, [filter]);

  // Gọi api lấy danh sách câu hỏi theo mã môn học
  const getData = async () => {
    try {
      const res = await getCauHoiByMaMH(MaMH, filter, user[0]?.MaGV);
      setQuestions(res.data);
      const xx = [];
      await res.data.map(i => {
        xx.push({label: i.CauHoi + '~' + i.TenCD, value: i.MaCH});
      });
      setData(xx);
    } catch (error) {
      //
    }
  };

  // Gọi api lấy danh sách chủ đề
  const getListChuDe = async data => {
    try {
      const res = await getCD(user[0]?.MaGV, MaMH);
      setListChuDe(res.data);
    } catch (error) {
      //
    }
  };

  // Gọi api thêm danh sách câu hỏi vô bài kiểm tra
  const postData = async MaCH => {
    try {
      await createCTBKT(params.BaiKiemTra.MaBaiKT, MaCH);
    } catch (error) {
      //
    }
  };

  // Vòng for lấy từng câu ra để đẩy lên
  const subMit = () => {
    for (var i = 0; i < selectedFruits.length; i++) {
      postData(selectedFruits[i].value);
    }
  };

  // getTen
  const getTen = str => {
    const ten = str.substring(0, str.indexOf('~'));
    return ten;
  };

  // getChuDe
  const getChuDe = str => {
    const chuDe = str.substring(str.indexOf('~') + 1, str.length);
    return chuDe;
  };

  // Hiển thị modal chi tiết câu hỏi
  const showCauHoi = a => {
    for (var i = 0; i < data.length; i++) {
      if (a === data[i].label) {
        for (var j = 0; j < questions.length; j++) {
          if (data[i].value === questions[j].MaCH) {
            setDetails(questions[i]);
            setShowDetails(true);
          }
        }
      }
    }
  };

  const renderLabel = label => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text numberOfLines={1} style={{fontSize: 16}}>
            {getTen(label)}
          </Text>
          <Text style={{fontSize: 12}}>Chủ đề: {getChuDe(label)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            showCauHoi(label);
          }}
          style={{
            width: 45,
            height: 45,
            marginRight: '6%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            type="Ionicons"
            name="eye"
            style={{
              fontSize: 24,
              color: settings.colors.colorThumblr,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onSelectionsChange = async x => {
    setSelectedFruits(x);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Header user={user} />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginLeft: '3%',
              color: settings.colors.colorThumblr,
              fontWeight: 'bold',
              marginBottom: -5,
              fontSize: 14,
              zIndex: 999,
              marginTop: 10,
              marginBottom: 5,
            }}>
            THÊM CÂU HỎI - {params.BaiKiemTra.TenBaiKT}
          </Text>
          <Text
            style={{
              marginLeft: '3%',
              color: settings.colors.colorThumblr,
              fontWeight: 'bold',
              marginBottom: -5,
              fontSize: 14,
              zIndex: 999,
              marginBottom: 10,
            }}>
            Số câu đã chọn: {selectedFruits.length}
          </Text>
        </View>
        <View
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            borderRadius: 500,
            backgroundColor: settings.colors.colorMain,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type="FontAwesome"
            name="filter"
            style={{fontSize: 18, color: '#fff', marginTop: 2}}
          />
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 10,
            marginLeft: -50,
          }}>
          {listChuDe !== '' && (
            <Picker
              selectedValue={0}
              mode="dialog"
              textStyle={{opacity: 0}}
              style={{height: 45, width: 50, opacity: 0}}
              onValueChange={(itemValue, itemIndex) => {
                setFilter(itemValue);
              }}>
              <Picker.Item label="Tất cả" value={'-1'} />
              {listChuDe?.map(i => (
                <Picker.Item label={i.TenCD} value={i.MaCD} />
              ))}
            </Picker>
          )}
        </View>
      </View>

      {!loading ? (
        <>
          {data !== '' && data !== undefined && data.length !== 0 ? (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                borderTopWidth: 0.5,
                borderColor: '#CFD8DC',
              }}>
              <SelectMultiple
                items={data}
                renderLabel={renderLabel}
                selectedItems={selectedFruits}
                onSelectionsChange={onSelectionsChange}
                labelStyle={{fontSize: 16}}
                selectedRowStyle={{backgroundColor: '#ECEFF1'}}
                selectedCheckboxStyle={{width: 25}}
                checkboxStyle={{width: 25}}
                selectedCheckboxSource={require('../../../../asset/images/question-true.png')}
                checkboxSource={require('../../../../asset/images/question.png')}
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: 'red'}}>Không có câu hỏi</Text>
            </View>
          )}
          {selectedFruits.length !== 0 && (
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: -65,
                alignItems: 'flex-end',
                paddingRight: 15,
                marginBottom: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFruits([]);
                  Toast.show('Thành công', Toast.SHORT);
                  subMit();
                }}
                activeOpacity={0.5}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 500,
                  backgroundColor: settings.colors.colorMain,
                  borderWidth: 0.5,
                  borderColor: settings.colors.colorBoderDark,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>SAVE</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../../../asset/gif/load321.gif')}
            resizeMode="contain"
            style={{width: 100, height: 100}}
          />
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={showDetails}
        onRequestClose={() => {
          setShowDetails(false);
        }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="rgba(0,0,0,1)"
          hidden={false}
          animated={true}
        />
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Text
            onPress={() => {
              setShowDetails(false);
            }}
            style={{flex: 1}}
          />
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <Text
              onPress={() => {
                setShowDetails(false);
              }}
              style={{flex: 1}}
            />
            <View
              style={{
                width: '90%',
                backgroundColor: '#fff',
                height: 275,
                borderRadius: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 9,
                  backgroundColor: settings.colors.colorGreen,
                  borderTopStartRadius: 12,
                  borderTopEndRadius: 12,
                }}>
                <Icon
                  type="Ionicons"
                  name="book"
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    marginRight: 10,
                    marginBottom: -2,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    flex: 1,
                  }}>
                  CHI TIẾT CÂU HỎI
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDetails(false);
                  }}
                  style={{
                    height: '100%',
                    paddingLeft: 20,
                  }}>
                  <Icon
                    type="Ionicons"
                    name="close"
                    style={{
                      fontSize: 24,
                      color: '#fff',
                      marginBottom: -2,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: '#d11149',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      *.*
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Chủ đề:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.TenCD}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: '#a47e1b',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: -1,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      ?
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Câu hỏi:{' '}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.CauHoi}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: settings.colors.colorFacebook,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: -2,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      A
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Câu A:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.A}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: settings.colors.colorPinteres,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: -1,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      B
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Câu B:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.B}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: '#89b0ae',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: -1,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      C
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Câu C:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.C}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: '#7b2cbf',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: -1,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      D
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Câu D:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.D}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    width: 30,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 500,
                      backgroundColor: '#50514f',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      T
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Đáp án:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.DapAn}
                </Text>
              </View>
            </View>
            <Text
              onPress={() => {
                setShowDetails(false);
              }}
              style={{flex: 1}}
            />
          </View>
          <Text
            onPress={() => {
              setShowDetails(false);
            }}
            style={{flex: 1}}
          />
        </View>
      </Modal>
    </View>
  );
};
