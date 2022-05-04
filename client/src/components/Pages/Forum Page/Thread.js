import { Stack, Paper, Typography, Pagination } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService";
import Comment from "./Comment";
import alertify from "alertifyjs";
import SubmitCommentField from "./SubmitCommentField";
import AuthService from "../../../services/AuthService";
import Footer from "../Footer";
import ComponentPagination from "../../Custom Hooks/ComponentPagination";
import Loading from "../../Loading";
import ForumIcon from "@mui/icons-material/Forum";

function Thread(props) {
  let { thread } = useParams();
  const [comments, setComments] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const PER_PAGE = 10;
  const count = Math.ceil(comments.length / PER_PAGE);
  const commentsPagination = ComponentPagination(comments, PER_PAGE);
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = AuthService.isAdmin();
  const didPost = React.useRef({ didPost: false });

  React.useEffect(() => {
    document.title =
      "Community Forum - " +
      thread.replace(/-/g, " ") +
      " - Student Specialty Advisor";
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
        userName={c.user.firstName + " " + c.user.lastName}
        userRole={c.user.role}
        isOwner={c.user._id === currentUser.id}
        isAdmin={isAdmin}
        date={c.date}
        content={c.message}
        year={c.user.universityYear}
        fetchComments={fetchComments}
        /*picture={c.user.picture} Not yet implemented in the backend*/
      />
    );
  });

  const pagingComponent = (
    <Pagination
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
        document
          .getElementById("submit-comment-text-field")
          .scrollIntoView({ behavior: "smooth", block: "center" });
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
              <Typography variant="h2">{thread.replace(/-/g, " ")}</Typography>
              <Typography className="thread-description">{`Hey there ${currentUser.firstName}! Welcome to the forums!
          The forums are a free space for the SMU Community to express their opinions, to share their experiences, and to have fun while doing that.
          As much as we encourage freedom of speech in the forums, we do not tolerate any verbual abuse, hate speech, or racism, and would like to remind you to remain respectful to others, even if their opinion is different of yours!
          Please keep the discussion in English, as we want everyone to be able to understand your comments!`}</Typography>
            </Paper>
            <Stack className="forum-stack" spacing={1}>
              {comments.length !== 0 ? (
                <>
                  {pagingComponent}
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
                      fontSize: "60px",
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
                  /*picture={c.user.picture} Not yet implemented in the backend*/
                  threadName={thread.replace(/-/g, " ")}
                  fetchComments={fetchComments}
                  didPost={didPost}
                />
              }
            </Stack>
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
      {isLoaded && <Footer />}
    </>
  );
}

export default Thread;
