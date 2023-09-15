import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {primaryColor} from '../Utils/CustomColors';
import CustButton from '../Components/CustButton';
import CustTextInput from '../Components/CustTextInput';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {screenNames} from '../Constants/constant';
import toast from 'react-native-simple-toast';
import {handleForgotpassword, handlechangePassword} from '../Helpers/helpers';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width - 90;

export default function OtpVerificationScreen({route}) {
  // console.log("route",route.params.email)

  const navigation = useNavigation();
  const [value, setValue] = useState('');

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const otpRef = useBlurOnFulfill({value, cellCount: 6});

  const [secureText, setSecureText] = useState(true);
  let initialState = {password: '', confirm_password: ''};
  const [data, setData] = useState(initialState);

  // handling the text entered in the textInput fields
  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  // handling Change Password
  const handleVerifyOTP = async () => {
    const request = {
      email: route.params.email,
      otp: value,
      password: data.password,
      password_confirmation: data.confirm_password,
    };
    if (data.password === data.confirm_password) {
      const response = await handlechangePassword(request);
      if (response.status === 200) {
        navigation.navigate(screenNames.Login);
        toast.show('Password has been changed successfully', toast.CENTER);
      } else {
        toast.show('Something went wrong, Please try again!', toast.CENTER);
      }
    }
  };

  const handleSecureText = () => {
    setSecureText(!secureText);
  };

  // Steps to show the timer
  const RESEND_OTP_TIME_LIMIT = 180;

  let resendOtpTimerInterval;
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  // for every 1 sec passed the function is recalled
  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  //handling resend Button press functionS
  const onResendOtpButtonPress = async () => {
    //clear input field
    setValue('');
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
    const response = await handleForgotpassword({email: route.params.email});
  };

  // Calling the timer on rendering this page.
  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/Images/Unlock.jpg')}
        style={styles.logo}
      /> */}
      <Text style={[styles.title, {lineHeight: 45}]}>Verify OTP</Text>
      <View
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        }}>
        <CodeField
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          ref={otpRef}
          value={value}
          onChangeText={text => setValue(text)}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <CustTextInput
          placeholderText="New-Password"
          iconType="lock"
          onChangeText={text => handleTextChange('password', text)}
          autoCapitalize="none"
          rightIcon={secureText ? 'visibility-off' : 'visibility'}
          rightIconOnPress={handleSecureText}
          secureTextEntry={secureText}
          rightIconStyle={styles.rightIconStyle}
        />
        <CustTextInput
          placeholderText="Confirm-Password"
          iconType="lock"
          secureTextEntry={secureText}
          onChangeText={text => handleTextChange('confirm_password', text)}
          autoCapitalize="none"
        />
      </View>

      <CustButton title="Change Password" onPress={() => handleVerifyOTP()} />

      <View style={{marginVertical: 10, flexDirection: 'row'}}>
        <Text style={{fontFamily: 'EduSABeginner-Regular', fontSize: 18}}>
          Didn't receive the OTP ?{' '}
        </Text>
        <TouchableOpacity onPress={onResendOtpButtonPress}>
          <Text
            style={{
              fontFamily: 'EduSABeginner-Bold',
              fontSize: 18,
              color: primaryColor,
              textDecorationLine: 'underline',
              marginEnd: 10,
            }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        <Text>
          in{' '}
          <Text style={{fontFamily: 'EduSABeginner-Bold', fontSize: 18}}>
            {resendButtonDisabledTime}
          </Text>{' '}
          sec
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'EduSABeginner-SemiBold',
    marginBottom: 15,
    color: primaryColor,
  },
  input: {
    width: screenWidth,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#03707a',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'EduSABeginner-SemiBold',
  },
  rightIconStyle: {
    paddingRight: 10,
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },
  focusCell: {
    borderColor: '#03707a',
    borderWidth: 2,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 45,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  codeFieldRoot: {marginTop: 15},
});
