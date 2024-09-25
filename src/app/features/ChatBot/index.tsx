/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  Send,
} from 'react-native-gifted-chat';

import R from '@assets/R';
import HeaderReal from '@libcomponents/header-real';
import { postChatBot } from '@networking/user';
import _ from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any>([]);

  const [loading, setloading] = useState(false);

  const [questionCurrent, setquestionCurrent] = useState('');

  useEffect(() => {
    setMessages([
      //   {
      //     _id: 1,
      //     text: 'Hello developer',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //       avatar: R.images.logoApp,
      //     },
      //   },
      //   {
      //     _id: 2,
      //     text: 'Hello world',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 1,
      //       name: 'React Native',
      //       avatar: R.images.sinhVienNam,
      //     },
      //   },
    ]);
  }, []);

  const onButton = async (text: any) => {
    setquestionCurrent('');

    try {
      if (!_.isEmpty(questionCurrent)) {
        const listData = [
          ...(messages ?? []),
          ...[{ question: text?.text, user: true }],
        ];

        setMessages(listData);

        setloading(true);

        const responseChatbot = await postChatBot(text?.text);

        setloading(false);

        if (responseChatbot?.status) {
          setMessages([...listData, ...[responseChatbot?.data]]);
        } else {
          setMessages([
            ...listData,
            { response: 'Đã có lỗi xảy ra 😕\nVui lòng thử lại !' },
          ]);
        }
      }
    } catch (error) {}
  };

  const onSend = useCallback((messages: IMessage[] = []) => {
    onButton(messages);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => {
    return (
      <>
        <Send alwaysShowSend {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={{ marginBottom: 5, marginRight: 5 }}
              size={32}
              color="#2e64e5"
            />
          </View>
        </Send>
      </>
    );
  };

  const renderComposer = props => {
    return <Composer textInputStyle={{ color: R.colors.black0 }} {...props} />;
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: R.colors.backgroundColorNew,
      }}>
      <HeaderReal title={'Chatbot - Hỏi & đáp'} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Nhập tin nhắn"
        renderComposer={renderComposer}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default ChatScreen;
