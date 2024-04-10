import ChatInfo from './ChatInfo';
import classes from '../MainChat/MainChat.module.css';
import Message from './Message';
import InputMessage from './InputMessage';

export default function MainChat() {
  return (
    <div className={classes.mainPage}>
      <ChatInfo></ChatInfo>
      <div className={classes.messages}>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
        <Message></Message>
      </div>
      <InputMessage></InputMessage>
    </div>
  );
}
