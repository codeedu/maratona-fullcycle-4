// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { MessageState } from "../../store/message/types";
import { Channel, User, Message } from "../../models";
import { useDispatch } from "react-redux";
import { Creators } from "../../store/message";
import { MembersState } from "../../store/member/types";
import ServerContext from "../../components/server/ServerContext";
import { format, parseISO } from "date-fns";

interface MessagePanelProps {
  channel: Channel | null;
}
function formatDate(date: string) {
  return format(parseISO(date), "dd/MM/yyyy");
}
export const MessagesPanel: React.FC<MessagePanelProps> = (props) => {
  const { channel } = props;
  const dispatch = useDispatch();
  const inputRef = React.useRef() as React.MutableRefObject<any>;
  const messagesContainerRef = React.useRef() as React.MutableRefObject<any>;
  const messages: Message[] = useSelector<{ message: MessageState }, Message[]>(
    (state) => {
      if (!channel) {
        return [];
      }
      const channelFound = state.message.channels.find(
        (c) => c.id === channel.id
      );
      return !channelFound ? [] : channelFound.messages;
    }
  );
  const dates = messages.reduce<string[]>((previousValue, currentValue) => {
    const date: string = formatDate(currentValue.created_at);
    if (previousValue.indexOf(date) === -1) {
      return [...previousValue, date];
    }
    return previousValue;
  }, []);

  const {
    serverSelected: { data: server },
  } = React.useContext(ServerContext);
  const serverId = server?.id;
  const members = useSelector<{ member: MembersState }, User[]>((state) => {
    const server = state.member.servers.find((s) => s.id === serverId);
    return server ? server.members : [];
  });

  const getName = React.useCallback(
    (userId: string) => {
      const member = members.find((m) => m.id === userId);
      return member ? member.name : "";
    },
    [members]
  );

  const getPhotoUrl = React.useCallback(
    (userId: string) => {
      const member = members.find((m) => m.id === userId);
      return member ? member.photo_url : "";
    },
    [members]
  );

  React.useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messagesContainerRef, messages]);

  return (
    <div className="channel-data">
      <div className="container-messages" ref={messagesContainerRef}>
        {dates.map((date, key) => (
          <>
            <div className="separator">
              <span></span>
              <time>{date}</time>
            </div>
            {messages
              .filter((message) => formatDate(message.created_at) === date)
              .map((message) => (
                <div className="message" key={key}>
                  <div className="img-user">
                    <img
                      src={getPhotoUrl(message.user_id)}
                      alt="Usuário"
                      className=""
                    />
                  </div>

                  <div className="user-message">
                    <header className="moderator">
                      {getName(message.user_id)}{" "}
                      <time>{formatDate(message.created_at)}</time>
                    </header>
                    <div className="content-message">{message.content}</div>
                  </div>
                </div>
              ))}
          </>
        ))}
      </div>
      <div className="container-send-message">
        <form className="form-message">
          <div className="form-group">
            <textarea
              className="form-control"
              id="message"
              rows={2}
              placeholder="Conversar"
              ref={inputRef}
            ></textarea>
            <span
              className="fas fa-play"
              aria-hidden="true"
              onClick={() => {
                dispatch(
                  Creators.sendMessage({
                    content: inputRef.current.value,
                    channel_id: channel?.id as any,
                  })
                );
                inputRef.current.value = "";
              }}
            ></span>
          </div>
        </form>
      </div>
    </div>
  );
};
