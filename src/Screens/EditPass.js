import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustTextInput from '../Components/CustTextInput';
import {changePassword} from '../Helpers/helpers';
import {primaryColor} from '../Utils/CustomColors';

const EditPass = ({route}) => {
  const navigation = useNavigation();
  let initialState = {
    currentpassword: '',
    newpassword: '',
    confirmpassword: '',
    email: '',
    user_id: 0,
  };
  const [data, setData] = useState(initialState);
  const [errMsg, setErrMsg] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [securePswText, setSecurePswText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [disable, setDisable] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  //   Handlin on Submit button click

  const handlePasswordValidation = () => {
    if (data.newpassword === data.confirmpassword) {
      setPasswordMatch(true);
      handleSubmit();
    } else {
      // Passwords do not match
      setPasswordMatch(false);
    }
  };

  const handleSubmit = async () => {
    setDisable(true);
    if (
      data.currentpassword == '' ||
      data.newpassword == '' ||
      data.confirmpassword == ''
    ) {
      ToastAndroid.show('Field cannot be blank', 5000);
      setDisable(false);
    } else {
      const requestData = {
        claim_profile: 'N',
        currentpassword: data.currentpassword,
        newpassword: data.newpassword,
        confirmpassword: data.confirmpassword,
        email: route.params.email,
        user_id: route.params.userId,
      };
      const result = await changePassword(requestData);
      ToastAndroid.show(result.data.message, 5000);
    }
    setDisable(false);
  };

  const handleSecureText = () => {
    setSecureText(!secureText);
  };

  const handlePswSecureText = () => {
    setSecurePswText(!securePswText);
  };

  const handleconfirmSecureText = () => {
    setSecureConfirmText(!secureConfirmText);
  };

  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          backgroundColor: primaryColor,
        },
      ]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{alignItems: 'flex-start', padding: 15}}>
        <MaterialIcon name="arrow-back" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headingText}>Reset Password</Text>
        <Text style={styles.textStyle} numberOfLines={2}>
          Create a new Password,The new password should be different from your
          old password.
        </Text>
      </View>
      <View style={styles.textInputView}>
        <CustTextInput
          autoCapitalize="none"
          placeholderText="Current Password"
          iconType="lock"
          onChangeText={text => handleTextChange('currentpassword', text)}
          secureTextEntry={secureText}
          onFocus={() => {
            setErrMsg('');
          }}
          rightIcon={secureText ? 'visibility-off' : 'visibility'}
          rightIconOnPress={handleSecureText}
          rightIconStyle={styles.rightIconStyle}
        />

        <CustTextInput
          autoCapitalize="none"
          placeholderText="New Password"
          iconType="lock"
          onChangeText={text => handleTextChange('newpassword', text)}
          secureTextEntry={securePswText}
          onFocus={() => {
            setErrMsg('');
          }}
          rightIcon={securePswText ? 'visibility-off' : 'visibility'}
          rightIconOnPress={handlePswSecureText}
          rightIconStyle={styles.rightIconStyle}
        />

        <CustTextInput
          autoCapitalize="none"
          placeholderText="Confirm Password"
          iconType="lock"
          onChangeText={text => handleTextChange('confirmpassword', text)}
          secureTextEntry={secureConfirmText}
          onFocus={() => {
            setErrMsg('');
          }}
          rightIcon={secureConfirmText ? 'visibility-off' : 'visibility'}
          rightIconOnPress={handleconfirmSecureText}
          rightIconStyle={styles.rightIconStyle}
          onBlur={handleKeyboard}
        />
        {!passwordMatch && (
          <Text style={{fontFamily: 'EduSABeginner-Regular', color: 'red'}}>
            Password and confirm Password do not match
          </Text>
        )}
        <View style={styles.submitButtonView}>
          {disable === true ? (
            <View style={styles.buttonContainer}>
              <ActivityIndicator size="large" color="#fff" animating={true} />
            </View>
          ) : (
            <TouchableOpacity onPress={handlePasswordValidation}>
              <Text
                style={[
                  styles.textStyle,
                  {color: '#fff', paddingVertical: 10},
                ]}>
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default EditPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'EduSABeginner-Regular',
    textAlign: 'center',
  },
  rightIconStyle: {
    paddingRight: 10,
  },
  headingText: {
    color: '#fff',
    marginTop: 4,
    marginBottom: 0,
    fontSize: 25,
    fontFamily: 'EduSABeginner-Bold',
    textAlign: 'center',
    paddingBottom: '10%',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textInputView: {
    flex: 2,
    paddingTop: '20%',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: '#000000',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  submitButtonView: {
    width: '80%',
    backgroundColor: '#03707a',
    borderRadius: 15,
    marginTop: '10%',
  },
  buttonContainer: {
    width: '80%',
    backgroundColor: primaryColor,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
