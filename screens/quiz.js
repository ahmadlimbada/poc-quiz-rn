import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Quiz = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text>Quiz question</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity>
          <Text>option 1</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>option 3</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>option 4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.extra}>
        <TouchableOpacity>
          <Text>SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>NEXT</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={() => navigation.navigate('Result')}>EXIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {padding: 12, height: '100%'},
  question: {marginVertical: 16},
  options: {
    marginVertical: 16,
    flex: 1,
  },
  extra: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
