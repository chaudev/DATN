import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StatusBar,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {settings} from '../../../../config';
import {Icon} from 'native-base';
import {Header} from '../../../../components/header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NumericInput from 'react-native-numeric-input';
import {AppRouter} from '../../../../navigation/AppRouter';
import {RenderItem} from './renderItem';

// API
import {updateBaiKT} from '../../../../../server/BaiKiemTra/updateBaiKT';
import {getCTBKT} from '../../../../../server/BaiKiemTra/getCTBKT';
import {deleteCTBKT} from '../../../../../server/BaiKiemTra/deleteCTBKT';

export const InfomationQuestion = () => {
  const nav = useNavigation();
  const route = useRoute();
  const focused = useIsFocused();
  const item = route.params.item;
  const user = route.params.user;

  const [showModal, setModal] = useState(false);
  const [tenBaiKT, setTenBaiKT] = useState(item.TenBaiKT);
  const [ngay, setNgay] = useState(new Date(item.Ngay));
  const [thoiGian, setThoiGian] = useState(0);
  const [datePicker, setDatePicker] = useState(false);
  const [questions, setQuestions] = useState('');

  // Modal chi tiết câu hỏi
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState('');

  // Focus vô thì chạy
  useEffect(() => {
    if (focused) {
      timeToNumber(item.ThoiGianLam);
      getQuestion(route.params.item.MaBaiKT);
    }
  }, [focused]);

  // Update bài kiểm tra (gọi api)
  const editBaiKT = async () => {
    try {
      await updateBaiKT(
        item.MaBaiKT,
        tenBaiKT,
        getDate(ngay),
        user[0]?.MaGV,
        minToTime(thoiGian),
      );
      setModal(false);
    } catch (error) {
      //
    }
  };

  // Gọi api lấy danh sách câu hỏi theo mã môn học
  const getQuestion = async data => {
    try {
      const res = await getCTBKT(data);
      setQuestions(res);
    } catch (error) {
      //
    }
  };

  // Gọi api xóa câu hỏi
  const deleteCauHoi = async data => {
    try {
      const res = await deleteCTBKT(route.params.item.MaBaiKT, data);
      getQuestion(route.params.item.MaBaiKT);
    } catch (error) {
      //
    }
  };

  // Nhấn nút sửa
  const edit = () => {
    setModal(true);
  };

  // Convert 1 => 01
  const getNum = num => {
    return num < 10 ? '0' + num : num;
  };

  // Lấy ra dạng ngay-tháng-năm
  const getStrDate = date => {
    const newDate = new Date(date);
    return (
      getNum(newDate.getDate()) +
      '-' +
      getNum(newDate.getMonth() + 1) +
      '-' +
      newDate.getFullYear()
    );
  };

  // Lấy ra dạng năm-tháng-ngày
  const getDate = date => {
    const newDate = new Date(date);
    return (
      newDate.getFullYear() +
      '-' +
      getNum(newDate.getMonth() + 1) +
      '-' +
      getNum(newDate.getDate())
    );
  };

  // Convert number to time
  const minToTime = n => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return getNum(rhours) + ':' + getNum(rminutes) + ':' + '00';
  };

  // Convert time to number
  const timeToNumber = time => {
    const num = parseInt(time[0] + time[1]) * 60 + parseInt(time[3] + time[4]);
    setThoiGian(parseInt(num));
  };

  // Nhấn nút delete trong item
  const deleteQuest = x => {
    deleteCauHoi(x?.MaCH);
  };

  // Nhấn vô item
  const handlePressItem = a => {
    setDetails(a);
    setShowDetails(true);
  };

  // Nhấn nút bắt đầu
  const handleStart = () => {
    nav.goBack();
    console.log('handleStart');
  };

  // Render screen
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header user={user} />

      {item !== undefined ? (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              height: 35,
            }}>
            <Icon
              type="MaterialCommunityIcons"
              name="book-open-variant"
              style={{
                fontSize: 24,
                color: settings.colors.colorGreen,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                color: settings.colors.colorGreen,
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 10,
                flex: 1,
              }}>
              CHI TIẾT BÀI KIỂM TRA
            </Text>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(AppRouter.ADDQUEST, {
                  MaMH: route.params.MaMH,
                  BaiKiemTra: item,
                  user: user,
                });
              }}
              activeOpacity={0.7}
              style={{
                height: 30,
                width: 74,
                backgroundColor: settings.colors.colorGreen,
                marginRight: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 500,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14,
                  textTransform: 'uppercase',
                }}>
                Bắt đầu
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 10,
              borderBottomWidth: 0.5,
              borderColor: '#CFD8DC',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Tên bài:
              </Text>
              <Text style={{fontWeight: 'bold', flex: 1, fontSize: 16}}>
                {tenBaiKT}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Key:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{item.KeyBaiKT}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Lớp học phần:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{item.TenLopHP}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Môn học:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{route.params.TenMH}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Ngày:
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>{getStrDate(ngay)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 5,
                marginBottom: 10,
              }}>
              <Text style={{fontWeight: 'bold', marginRight: 5, fontSize: 16}}>
                Thời gian
              </Text>
              <Text style={{flex: 1, fontSize: 16}}>
                {minToTime(thoiGian)} ({thoiGian} phút)
              </Text>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', marginLeft: 10, marginVertical: 5}}>
            <Text
              style={{
                fontSize: 14,
                color: settings.colors.colorThumblr,
                fontWeight: 'bold',
              }}>
              Số câu hỏi: {questions?.SoLuong}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <FlatList
              data={questions.data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <RenderItem
                  item={item}
                  data={questions.data}
                  handle={handlePressItem}
                  handleDelete={deleteQuest}
                />
              )}
              keyExtractor={item => item.CauHoi}
              style={{flex: 1, backgroundColor: '#fff'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              paddingBottom: 5,
              marginTop: -55,
            }}>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(AppRouter.ADDQUEST, {
                  MaMH: route.params.MaMH,
                  BaiKiemTra: item,
                  user: user,
                });
              }}
              activeOpacity={0.5}
              style={{
                height: 45,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: settings.colors.colorGreen,
                marginBottom: 10,
                borderRadius: 10,
                flex: 1,
              }}>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                THÊM CÂU HỎI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                edit();
              }}
              activeOpacity={0.5}
              style={{
                width: 80,
                height: 45,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: settings.colors.colorGreen,
                marginBottom: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                SỬA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, color: 'red'}}>Không có data</Text>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setModal(false);
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
              setModal(false);
            }}
            style={{flex: 1}}
          />
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <Text
              onPress={() => {
                setModal(false);
              }}
              style={{flex: 1}}
            />
            <View
              style={{
                width: '90%',
                backgroundColor: '#fff',
                height: 365,
                borderRadius: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  width: '100%',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: settings.colors.colorGreen,
                    fontSize: 16,
                    fontWeight: 'bold',
                    flex: 1,
                  }}>
                  THÊM BÀI KIỂM TRA
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                  }}
                  style={{
                    height: '100%',
                    paddingLeft: 20,
                  }}>
                  <Icon
                    type="AntDesign"
                    name="close"
                    style={{
                      fontSize: 24,
                      color: settings.colors.colorGreen,
                      marginBottom: -2,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: settings.colors.colorGreen,
                  marginLeft: 10,
                }}>
                Tên bài kiểm tra
              </Text>
              <View
                style={{
                  height: 50,
                  marginTop: 5,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: settings.colors.colorBoderDark,
                  borderRadius: 12,
                }}>
                <TextInput
                  placeholder="Tên bài kiểm tra"
                  placeholderTextColor="#8a817c"
                  value={tenBaiKT}
                  onChangeText={t => {
                    setTenBaiKT(t);
                  }}
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    marginVertical: 2,
                    color: '#000',
                    fontSize: 14,
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: settings.colors.colorGreen,
                  marginLeft: 10,
                }}>
                Chọn ngày
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setDatePicker(true);
                }}
                style={{
                  marginTop: 5,
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: settings.colors.colorBoderDark,
                  height: 50,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    height: 20,
                    marginLeft: 15,
                    color: ngay === 'Chọn ngày' ? '#8a817c' : '#000',
                  }}>
                  {ngay !== 'Chọn ngày' ? getStrDate(ngay) : 'Chọn ngày'}
                </Text>
              </TouchableOpacity>

              <View
                style={{marginLeft: 10, marginTop: 10, flexDirection: 'row'}}>
                <Text
                  style={{
                    color: settings.colors.colorGreen,
                  }}>
                  Chọn thời gian{' '}
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                    color: settings.colors.colorYouTube,
                  }}>
                  ( {thoiGian === 0 ? 'tính bằng phút' : minToTime(thoiGian)} )
                </Text>
              </View>

              <View style={{marginLeft: 10, marginTop: 5}}>
                <NumericInput
                  value={thoiGian}
                  onChange={value => {
                    setThoiGian(value);
                  }}
                  minValue={0}
                  maxValue={200}
                  totalWidth={100}
                  totalHeight={40}
                  iconSize={25}
                  step={1}
                  inputStyle={{fontSize: 14}}
                  rounded
                  valueType="real"
                  textColor={settings.colors.colorThumblr}
                  iconStyle={{color: settings.colors.colorThumblr}}
                />
              </View>

              <View style={{height: 10}} />

              <TouchableOpacity
                onPress={() => {
                  editBaiKT();
                }}
                activeOpacity={0.5}
                style={{
                  height: 50,
                  backgroundColor: settings.colors.colorGreen,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#ffF', fontSize: 14, fontWeight: 'bold'}}>
                  LƯU THÔNG TIN
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              onPress={() => {
                setModal(false);
              }}
              style={{flex: 1}}
            />
          </View>
          <Text
            onPress={() => {
              setModal(false);
            }}
            style={{flex: 1}}
          />
        </View>
      </Modal>

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

      {datePicker && (
        <DateTimePickerModal
          isVisible={datePicker}
          mode="date"
          onConfirm={date => {
            setNgay(date);
            setDatePicker(false);
          }}
          onCancel={() => {
            setDatePicker(false);
          }}
        />
      )}
    </View>
  );
};
