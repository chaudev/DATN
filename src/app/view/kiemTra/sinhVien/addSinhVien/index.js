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
import {getSinhVien} from '../../../../../server/User/getSinhVien';
import {Header} from '../../../../components/header';
import {createCTLHP} from '../../../../../server/LopHP/createCTLHP';
import Toast from 'react-native-simple-toast';
import SelectMultiple from 'react-native-select-multiple';

export const ThemSinhvVien = () => {
  const focus = useIsFocused();
  const route = useRoute();
  const params = route.params;
  const LopHP = params.LopHP;
  const user = params.user;

  const [data, setData] = useState('');
  const [listChuDe, setListChuDe] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(-1);

  const [selectedFruits, setSelectedFruits] = useState([]);
  const [students, setStudents] = useState([]);

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState('');

  // Vừa focus vào là gọi refesh để lấy data
  useEffect(() => {
    if (focus) {
      getStudents();
    }
  }, [focus]);

  // Gọi api lấy danh sách chủ đề
  const getStudents = async () => {
    try {
      const res = await getSinhVien();
      await setStudents(res.data);

      const xx = [];
      await res.data.map(i => {
        xx.push({label: i.TenSV + '~' + i.MaSV, value: i.MaSV});
      });
      setData(xx);
    } catch (error) {
      //
    }
  };

  // Gọi api thêm danh sách câu hỏi vô bài kiểm tra
  const postData = async MaSV => {
    try {
      await createCTLHP(LopHP.MaLopHP, MaSV);
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
        for (var j = 0; j < students.length; j++) {
          if (data[i].value === students[j].MaSV) {
            setDetails(students[i]);
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
          <Text style={{fontSize: 12}}>Mã SV: {getChuDe(label)}</Text>
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
            THÊM SINH VIÊN - {LopHP.TenLopHP}
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
            Đã chọn: {selectedFruits.length}
          </Text>
        </View>
      </View>

      {data !== '' ? (
        <>
          {data !== undefined && data.length !== 0 ? (
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
                height: 250,
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
                  CHI TIẾT SINH VIÊN
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
                  Tên:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.TenSV}
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
                  Mã SV:{' '}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.MaSV}
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
                      ^.^
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Giới tính:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.GioiTinh === 0 ? 'Nam' : 'Nữ'}
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
                      P
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Điện thoại:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.SDT}
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
                      M
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: settings.colors.colorThumblr,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  Mail:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.Mail}
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
                  Địa chỉ:{' '}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    width: '75%',
                    color: settings.colors.colorThumblr,
                  }}>
                  {details.DiaChi}
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
