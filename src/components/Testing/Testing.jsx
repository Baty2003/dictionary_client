import { Button, Modal } from 'antd';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getDifferentWithCurrentDateInSeconds, shuffleArray } from '../../utils/functionHelp';
import { LinkPrimary } from '../LinkPrimary';

import testingStyle from './Testing.module.scss';

const Testing = ({
  items: { dictionary, words, countVariants = 5, lang },
  wrongAnswerFunc,
  onFihish,
  mode,
  workOnErrorTrueAnswerFunc,
}) => {
  const [currentNumberWord, setCurrentNumberWord] = useState(0);
  const [speedPassage] = useState(new Date());
  const history = useHistory();
  const [showResult, setShowResult] = useState(0);
  const [trueAnswer, setTrueAnswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);

  const [disableButton, setDisableButton] = useState(false);
  const [currentWord, setCurrentWord] = useState(words[currentNumberWord] || null);
  const [falseWordId, setFalseWordId] = useState(-1);
  const [arrayVariants, setArrayVariants] = useState([]);

  const classesButtonTrue = classNames({ [testingStyle['button-answer-true']]: disableButton });
  const classesButtonFalse = classNames({ [testingStyle['button-answer-false']]: disableButton });

  const setRandomVariants = () => {
    setArrayVariants(() => {
      const newArray = [currentWord];
      shuffleArray(words).every((word) => {
        if (newArray.length === countVariants) return false;
        if (currentWord.id !== word.id) {
          newArray.push(word);
        }
        return true;
      });
      return shuffleArray(newArray);
    });
  };

  useEffect(() => {
    if (currentWord) setRandomVariants();
  }, [currentWord]);

  const checkChooise = (event) => {
    const id = +event.target.closest('button').value;
    if (id) {
      setDisableButton(true);
      if (id === currentWord.id) {
        setTrueAnswer(trueAnswer + 1);
        mode !== 'workOnError' || workOnErrorTrueAnswerFunc(id);
      } else {
        setFalseWordId(id);
        setFalseAnswer(falseAnswer + 1);
        mode === 'workOnError' || wrongAnswerFunc(currentWord.id);
      }
    }
  };

  const nextTesting = () => {
    if (currentNumberWord + 1 === words.length) {
      onFihish(
        mode === 'workOnError' ? 'Work on Error' : dictionary.name,
        words.length,
        trueAnswer,
        falseAnswer,
        getDifferentWithCurrentDateInSeconds(speedPassage),
      );
      setShowResult(true);
      return;
    }
    setCurrentWord(words[currentNumberWord + 1]);
    setCurrentNumberWord((state) => state + 1);
    setFalseWordId(-1);
    setDisableButton(false);
  };

  if (typeof words !== 'object') {
    return (
      <section style={{ textAlign: 'center' }}>
        <h1 className="title"> Test is not configured</h1>
        <p>Please go to the testing settings page</p>
        <LinkPrimary text="Setting Page" href="/setting-testing" />
      </section>
    );
  }
  return (
    <section className="pages">
      <Modal
        open={showResult}
        title="Result"
        footer={[
          <Button key="back" type="primary" onClick={() => history.push('/')}>
            Go to the main page
          </Button>,
        ]}
      >
        <h2 className="title">Your results</h2>
        <div>
          <span className={testingStyle['task-text']}>
            True Answers: <span className={testingStyle['insert']}>{trueAnswer}</span>
          </span>
        </div>
        <div>
          <span className={testingStyle['task-text']}>
            False Answers: <span className={testingStyle['insert']}>{falseAnswer}</span>
          </span>
        </div>
        <div>
          <span className={testingStyle['task-text']}>
            Speed of passage:{' '}
            <span className={testingStyle['insert']}>{getDifferentWithCurrentDateInSeconds(speedPassage)}</span> seconds
          </span>
        </div>
      </Modal>

      <h1 className="title">Testing</h1>
      <div>
        <h2 className="title">Choose the true answer:</h2>
        <div className={testingStyle['container-info']}>
          {mode === 'workOnError' ? (
            <span className={testingStyle['task-text']}>Work On Error</span>
          ) : (
            <span className={testingStyle['task-text']}>
              Dictionary is <span className={testingStyle['insert']}>{dictionary.name}</span>
            </span>
          )}
        </div>
        <hr />
        <div className={testingStyle['container-info']}>
          <span className={testingStyle['task-text']}>
            <span className={testingStyle['insert']}>{words.length}</span> words out of:{' '}
            <span className={testingStyle['insert']}>{currentNumberWord + 1}</span>
          </span>
        </div>
        <div className={testingStyle['container-info']}>
          <span className={testingStyle['task-text']}>
            Word:{' '}
            <span className={testingStyle['insert']}>
              {lang === 'russian' ? currentWord.russian : currentWord.english}
            </span>
          </span>
        </div>
        {lang !== 'russian' && (
          <div className={testingStyle['container-info']}>
            <span className={testingStyle['task-text']}>
              Transcription: <span className={testingStyle['insert']}>{currentWord.transcription}</span>
            </span>
          </div>
        )}

        <div className={testingStyle['container-buttons']}>
          {arrayVariants.map((item, index) => (
            <Button
              key={index}
              disabled={disableButton}
              value={item.id}
              className={`${testingStyle['button-answer']} ${item.id === currentWord.id ? classesButtonTrue : ''} 
              ${item.id === falseWordId ? classesButtonFalse : ''}`}
              onClick={checkChooise}
            >
              {lang === 'russian' ? item.english : item.russian}
            </Button>
          ))}
        </div>
        <Button className={testingStyle['button-next']} type="primary" onClick={nextTesting} disabled={!disableButton}>
          Next
        </Button>
      </div>
    </section>
  );
};
export default Testing;
