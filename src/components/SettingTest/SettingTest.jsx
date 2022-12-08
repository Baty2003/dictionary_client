import React, { useState } from 'react';
import { Button, Form, Radio, Select, Slider } from 'antd';

import { Loader } from '../../common/Loader';
import { useLoader } from '../../utils/hooks';

const SettingTest = ({ items = [], workOnError, saveSettingFunc, isRussian }) => {
  const [countWords, setCountWords] = useState(4);
  const [selectedCountWord, setSelectedCountWord] = useState(4);
  const setDictionary = (id) => {
    setCountWords(items.find((item) => item.id === id).count || 8);
  };
  const countWordsExpression = countWords < 4 ? 4 : countWords;
  const submitForm = ({ id, countVariants, countWords, lang }) => {
    saveSettingFunc(id, countVariants, countWords, lang);
  };
  const { Option } = Select;
  if (!items.length) return <h1 className="title">Words is not enough</h1>;
  return (
    <>
      {useLoader() && <Loader />}
      <section className={`pages ${useLoader() ? 'opacity' : ''}`}>
        {useLoader() && <Loader />}
        <Form onFinish={submitForm} name="login" initialValues={{ countVariants: countWords, countWords: countWords }}>
          <h1 className="title">{isRussian ? 'Настройка тестирование' : 'Setting Testing'}</h1>
          {workOnError && <h2 className="title">{isRussian ? 'Работа над ошибками' : 'Work on Error'}</h2>}
          {!workOnError && (
            <Form.Item
              name="id"
              label={isRussian ? 'Список словарей' : 'Select Dictionary'}
              hasFeedback
              rules={[
                { required: true, message: isRussian ? 'Пожалуйста выберите словарь' : 'Please select Dictionary!' },
                () => ({
                  validator() {
                    if (countWords >= 4) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        isRussian
                          ? 'Словарь должен содержать не менее 4-х слов'
                          : 'The dictionary must contain more than 4 words',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Select
                placeholder={isRussian ? 'Пожалуйста выберите словарь' : 'Please select a country'}
                onChange={setDictionary}
              >
                {items.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name} {isRussian ? `(Кол-во слов: ${item.count})` : `(Count Words: ${item.count})`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="countVariants"
            label={isRussian ? 'Кол-во вариантов' : 'Count Variants'}
            rules={[
              () => ({
                validator(_, value) {
                  if (value <= selectedCountWord) return Promise.resolve();
                  return Promise.reject(
                    isRussian
                      ? 'Кол-во вариантов не может быть больше кол-во самих слов'
                      : 'There can be no more options than the number of words',
                  );
                },
              }),
            ]}
          >
            <Slider
              min={4}
              max={8}
              marks={{
                4: '4',
                6: '6',
                8: '8',
              }}
            />
          </Form.Item>
          <Form.Item name="countWords" label={isRussian ? 'Количество слов' : 'Count Words'}>
            <Slider
              onChange={(data) => setSelectedCountWord(data)}
              min={4}
              max={workOnError ? items.length : countWordsExpression}
              marks={{
                [workOnError ? items.length : countWords]: `max ${workOnError ? items.length : countWords}`,
              }}
            />
          </Form.Item>
          <Form.Item label={isRussian ? 'Язык' : 'Language'} name="lang" initialValue="english">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="english">English</Radio.Button>
              <Radio.Button value="russian">{isRussian ? 'Русский' : 'Russian'}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isRussian ? 'Начать тестирование' : 'Start testing'}
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};
export default SettingTest;
