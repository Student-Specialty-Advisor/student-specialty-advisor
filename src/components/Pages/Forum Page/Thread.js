import {
  Stack,
  Paper,
  Typography,
  Pagination,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService";
import Comment from "./Comment";
import alertify from "alertifyjs";
import SubmitCommentField from "./SubmitCommentField";
import AuthService from "../../../services/AuthService";
import usePaginationComponent from "../../Custom Hooks/usePaginationComponent";
import Footer from "../Footer";
import Loading from "../../Loading";
import ForumIcon from "@mui/icons-material/Forum";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";

function Thread(props) {
  let { thread } = useParams();
  const [comments, setComments] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const PER_PAGE = 10;
  const count = Math.ceil(comments.length / PER_PAGE);
  const commentsPagination = usePaginationComponent(comments, PER_PAGE);
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = AuthService.isAdmin();
  const didPost = React.useRef({ didPost: false });
  const isMobile = useMediaQuery("(max-width:1080px)", { noSsr: true });
  const isUnder600px = useMediaQuery("(max-width:600px)", { noSsr: true });
  const isUnder480px = useMediaQuery("(max-width:480px)", { noSsr: true });

  React.useEffect(() => {
    document.title = thread.replace(/-/g, " ") + " - Student Specialty Advisor";
  }, [thread]);

  const handlePageChange = (e, p) => {
    setPage(p);
    commentsPagination.jump(p);
  };

  const fetchComments = () => {
    fetchService
      .doGET("forum/comments/" + thread.replace(/-/g, " "))
      .then((response) => {
        if (response.success) {
          setComments(response.comments);
          setIsLoaded(true);
        } else {
          throw response;
        }
      })
      .catch((error) => {
        props.history.push("/forum");
        alertify.error(
          "The thread you tried to access does not exist or might have been changed!"
        );
      });
  };

  const commentsList = commentsPagination.currentData().map((c) => {
    return (
      <Comment
        key={c._id}
        comment_id={c._id}
        isDeleted={c.isDeleted}
        userName={
          c.user === null
            ? "Deleted"
            : c.user.firstName[0].toUpperCase() +
              c.user.firstName.slice(1) +
              " " +
              c.user.lastName[0].toUpperCase() +
              c.user.lastName.slice(1)
        }
        userRole={c.user === null ? "Member" : c.user.role}
        isOwner={c.user === null ? false : c.user._id === currentUser.id}
        isAdmin={isAdmin}
        date={c.date}
        content={c.message}
        year={c.user === null ? "" : c.user.universityYear}
        fetchComments={fetchComments}
        isUnder600px={isUnder600px}
      />
    );
  });

  const pagingComponent = (
    <Pagination
      className="thread-pagination-list"
      size="large"
      count={count}
      page={page}
      onChange={handlePageChange}
      color="primary"
    />
  );

  React.useEffect(fetchComments, [thread, props.history]);

  React.useEffect(
    () => {
      if (comments.length !== 0 && didPost.current.didPost === true) {
        setPage(count);
        commentsPagination.jump(count);
        didPost.current.didPost = false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comments]
  );

  return (
    <>
      <div className="forum-container">
        {isLoaded ? (
          <>
            <Paper
              sx={{
                paddingBottom: "21px",
                marginBottom: "10px",
              }}
              className="thread-header"
              elevation={0}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    flexBasis: isUnder480px ? "10%" : "5%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "21px",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      props.history.push("/forum/");
                    }}
                    sx={{
                      color: "var(--mydarkerblue)",
                    }}
                  >
                    <ArrowBackIcon
                      fontSize={isUnder480px ? "medium" : "large"}
                    />
                  </IconButton>
                </div>
                <Typography variant="h2">
                  {thread.replace(/-/g, " ")}
                </Typography>
              </div>
              <Divider
                sx={{
                  marginBottom: "21px",
                  bgcolor: "var(--mydarkblue)",
                  borderWidth: "1px",
                }}
              />
              <Typography className="thread-description">{`Hey there ${currentUser.firstName}! Welcome to the forums!
          The forums are a free space for the SMU Community to express their opinions, to share their experiences, and to have fun while doing that.
          As much as we encourage freedom of speech in the forums, we do not tolerate any verbual abuse, hate speech, or racism, and would like to remind you to remain respectful to others, even if their opinion is different of yours!
          Please keep the discussion in English, as we want everyone to be able to understand your comments!`}</Typography>
            </Paper>
            <Stack className="forum-stack" spacing={1}>
              {comments.length !== 0 ? (
                <>
                  {commentsList}
                  {pagingComponent}
                </>
              ) : (
                <Paper
                  sx={{
                    paddingTop: "50px",
                    paddingBottom: "50px",
                    marginBottom: "3px",
                  }}
                  elevation={5}
                >
                  <ForumIcon
                    sx={{
                      display: "block",
                      margin: "auto",
                      fontSize: isUnder480px ? "40px" : "60px",
                      marginBottom: "14px",
                      color: "var(--mydarkerblue)",
                    }}
                  />
                  <Typography color="darkblue" textAlign="center" variant="h5">
                    There are no comments posted on this thread yet!
                    <br />
                    Start the conversation!
                  </Typography>
                </Paper>
              )}
              {
                <SubmitCommentField
                  threadName={thread.replace(/-/g, " ")}
                  userName={
                    currentUser.firstName[0].toUpperCase() +
                    currentUser.firstName.slice(1) +
                    " " +
                    currentUser.lastName[0].toUpperCase() +
                    currentUser.lastName.slice(1)
                  }
                  fetchComments={fetchComments}
                  didPost={didPost}
                  isMobile={isMobile}
                />
              }
            </Stack>
          </>
        ) : (
          <>
            <Loading overrideStyle={{ marginTop: "50vh" }} />
          </>
        )}
      </div>
      {!isMobile && isLoaded && <Footer />}
    </>
  );
}

export default Thread;
