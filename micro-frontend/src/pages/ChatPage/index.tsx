// @flow
import * as React from "react";
import { ChannelsPanel } from "./ChannelsPanel";
import { MessagesPanel } from "./MessagesPanel";
import { MembersPanel } from "./MembersPanel";
import { Category, Channel } from "../../models";
import { useParams, useHistory } from "react-router-dom";
import { flatten } from "lodash";
import { useDispatch } from "react-redux";
import { Creators } from "../../store/message";
import { authHttp } from "../../util/http";

type Props = {};
let loading = false;
export const ChatPage = (props: Props) => {
  const { serverId, channelId } = useParams();
  const history = useHistory();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [channelSelected, setChannelSelected] = React.useState<Channel | null>(
    null
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!serverId) {
      return;
    }
    loading = true;
    (async () => {
      const { data: categories } = await authHttp.get(
        `servers/${serverId}/categories`
      );
      setCategories(categories);
      const channelsCollection = await Promise.all(
        categories.map((category: any) =>
          authHttp.get(`categories/${category.id}/channels`)
        )
      );
      const channels = flatten<any>(channelsCollection.map((r: any) => r.data));
      setChannels(channels);
      loading = false;
    })();
  }, [serverId]);

  React.useEffect(() => {
    if (channelId && channels.length) {
      const channel = channels.find((channel) => channel.id === channelId);
      if (channel) {
        setChannelSelected(channel);
        dispatch(Creators.activeChannel({ channelId: channel.id }));
      }
    }else{
      setChannelSelected(null);
    }
  }, [channelId, channels, dispatch]);

  React.useEffect(() => {
    if (!serverId || !channels.length || channelId) {
      return;
    }
    if (!channelId && loading === false) {
      history.replace(`/servers/${serverId}/${channels[0].id}`);
    }
  }, [serverId, channelId, channels, history]);

  const onCategoryCreated = React.useCallback((categoryCreated?: Category) => {
    if (categoryCreated) {
      setCategories((prevState) => [...prevState, categoryCreated]);
    }
  }, []);

  const onChannelCreated = React.useCallback((channelCreated?: Channel) => {
    if (channelCreated) {
      setChannels((prevState) => [...prevState, channelCreated]);
    }
  }, []);

  return (
    <>
      <ChannelsPanel
        categories={categories}
        channels={channels}
        channel={channelSelected}
        onCategoryCreated={onCategoryCreated}
        onChannelCreated={onChannelCreated}
      />
      <MessagesPanel channel={channelSelected} />
      <MembersPanel />
    </>
  );
};
