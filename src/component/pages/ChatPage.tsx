import { Fab, Grid } from "@mui/material";
import { Header } from "../organisms/Header";
import React, { createRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebase";
import { useAuth } from "../../auth/LoginUser";
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "@firebase/firestore";
import { Box } from "@mui/system";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { formatTime } from "../../utils/formatTime";
import { Message } from "../molecules/Message";
import { SendButton } from "../atoms/button/SendButton";
import { ChatTextField } from "../atoms/textfield/ChatTextField";
import { LoadingAlert } from "../atoms/LoadingAlert";
import { ChatBox } from "../molecules/ChatBox";
import { useCurrentInquiry } from "../../hooks/currentInquiry";
import { ViewInquiry } from "../molecules/ViewInquiry";

type message = {
  who: string;
  name: string;
  message: string;
  timestamp: any;
};

export const ChatPage = () => {
  const [message, setMessage] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const [messageList, setMessageList] = useState<message[]>([
    {
      who: "",
      name: "",
      message: "",
      timestamp: "",
    },
  ]);
  const currentInquiry = useCurrentInquiry(id);
  const [messageCount, setMessageCount] = useState<number>(15);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const signInUser = useAuth();
  const ref = createRef<HTMLDivElement>();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);

  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const onClickSendMessage = async () => {
    await addDoc(collection(db, "chat", id, "MessageList"), {
      who: signInUser.email ? "admin" : "customer",
      name: signInUser.email ? signInUser.displayName : "customer",
      message: message,
      timestamp: serverTimestamp(),
    });
    setMessageCount(messageCount + 1);
    setMessage("");
  };
  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;

    if (scrollTop === 0) {
      setMessageLoading(true);
      window.setTimeout(() => {
        setMessageCount(messageCount + 15);
      }, 500);
    }
  };

  useEffect(() => {
    (async () => {
      const q = await query(
        collection(db, "chat", id, "MessageList"),
        orderBy("timestamp", "desc"),
        limit(messageCount)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        setMessageList(
          snapshot.docs.map((doc) => {
            return {
              who: doc.data().who,
              name: doc.data().name,
              message: doc.data().message,
              timestamp: formatTime(
                doc.data({ serverTimestamps: "estimate" }).timestamp.toDate()
              ),
            };
          })
        );
        setMessageLoading(false);
      });
      return () => {
        unsub();
      };
    })();
  }, [id, messageCount]);

  useEffect(() => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  return (
    <>
      <Box>
        <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: window.innerHeight,
          }}
        >
          {signInUser.uid ? (
            <Box
              sx={{ overflowY: "scroll", marginTop: "64px", flexGrow: 1 }}
              onScroll={onScroll}
            >
              <Box
                ref={ref}
                sx={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                  width: "100%",
                }}
              >
                {messageList.map((msg, i) => {
                  return (
                    <Message
                      key={i}
                      who={msg.who}
                      name={msg.name}
                      timestamp={msg.timestamp}
                      message={msg.message}
                    />
                  );
                })}
              </Box>
            </Box>
          ) : (
            <Box sx={{ overflowY: "scroll", marginTop: "64px", flexGrow: 1 }}>
              <Box
                ref={ref}
                sx={{
                  maxWidth: "1200px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                  width: "100%",
                }}
              >
                {messageList.map((msg, i) => {
                  return (
                    <Message
                      key={i}
                      who={msg.who}
                      name={msg.name}
                      timestamp={msg.timestamp}
                      message={msg.message}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
          <ChatBox>
            <Grid
              container
              alignItems="center"
              sx={{ width: "100%", padding: "0 10px" }}
            >
              <Grid item xs={10}>
                <ChatTextField onChange={onChangeMessage} value={message} />
              </Grid>
              <Grid item xs alignItems="bottom">
                <SendButton onClick={onClickSendMessage} disabled={!message}>
                  送信
                </SendButton>
              </Grid>
            </Grid>
          </ChatBox>
        </Box>
      </Box>
      <LoadingAlert
        messageLoading={messageLoading}
        setMessageLoading={setMessageLoading}
      />
      <Fab color="primary" aria-label="add" sx={{position: "fixed", right: "10%", bottom: "0"}} onClick={handleOpen}>
        <ContentPasteIcon />
      </Fab>
      <ViewInquiry openModal={openModal} setOpenModal={setOpenModal} inquiry={currentInquiry} />
    </>
  );
};
