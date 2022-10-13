import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [options, setOptions] = useState([]);

  const getQuiz = async () => {
    const url = 'https://opentdb.com/api.php?amount=5&type=multiple';
    const resp = await fetch(url);
    const respJson = await resp.json();
    setQuestions(respJson.results);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    var index = Math.floor(Math.random() * 4);
    if (questions && questions.length > 0) {
      questions[questionCount].incorrect_answers.splice(
        index,
        0,
        questions[questionCount].correct_answer,
      );
      console.log('options', questions[questionCount].correct_answer);
      setOptions(questions[questionCount].incorrect_answers);
    }
  }, [questionCount, questions]);

  return (
    <View style={styles.container}>
      {questions && questions.length > 0 && (
        <View style={styles.parent}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              Q. {questions[questionCount].question}
            </Text>
          </View>
          <View style={styles.options}>
            {options &&
              options.length > 0 &&
              options.map((opt, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={
                      (opt === selectedAnswer && styles.selectedAnswer) ||
                      styles.optionBtn
                    }
                    onPress={() => setSelectedAnswer(opt)}>
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <View style={styles.extra}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setQuestionCount(questionCount + 1);
                setSelectedAnswer('');
              }}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>

            {(questionCount < 4 && (
              <TouchableOpacity style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    if (
                      selectedAnswer === questions[questionCount].correct_answer
                    ) {
                      setScore(score + 1);
                    }
                    console.log('score,', score);
                    setQuestionCount(questionCount + 1);
                    setSelectedAnswer('');
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            )) || (
              <TouchableOpacity style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() =>
                    navigation.navigate({
                      name: 'Result',
                      params: {results: score},
                    })
                  }>
                  EXIT
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
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
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  questionText: {
    fontSize: 28,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#34A0A4',
  },
  parent: {
    height: '100%',
  },
  selectedAnswer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#386641',
  },
});
