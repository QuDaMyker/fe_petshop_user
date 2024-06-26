import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import HeaderContainer from "./HeaderContainer";
import TextAvatar from "./TextAvatar";
import reviewApi from "../apis/modules/review.api";

const ReviewItem = ({ review }) => {
  const { user } = useSelector(state => state.user);
  console.log("review",review)

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    // const { response, err } = await reviewApi.remove({ reviewId: review.id });
    // if (err) toast.error(err.message);
    // if (response) onRemoved(review.id);
  };
  return (
    <Box sx={{
      padding: 2,
      borderRadius: "5px",
      position: "relative",
      opacity: onRequest ? 0.6 : 1,
      "&:hover": { backgroundColor: "background.paper" }
    }}>
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review?.username} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review?.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createAt).format("DD-MM-YYYY hh:mm")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user_id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content"
              }}
            >
              Xóa
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );

};


const Review = ({ reviews,product_id }) => {
  const { user } = useSelector((state) => state.user);
  console.log("user",user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const skip = 4;

  // media có thêm trường reviews nên khi ko đ/n vẫn sẽ hiện đc
  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);
    console.log(content)
    const user_id = user?.id
    const username= user?.username
    const type=""
    console.log("product",user_id)
    let cmt = {user_id,product_id,content,type,username}
    const { response, err } = await reviewApi.create(cmt);

    setOnRequest(false);

    if (err) console.log(err.message);
    if (response) {
      toast.success("Post review success");
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  // const onLoadMore = () => {
  //   setFilteredReviews([...filteredReviews, ...[...listReviews].splice(page * skip, skip)]);
  //   setPage(page + 1);
  // };

  // const onRemoved = (id) => {
  //   if (listReviews.findIndex(e => e.id === id) !== -1) {
  //     const newListReviews = [...listReviews].filter(e => e.id !== id);
  //     setListReviews(newListReviews);
  //     setFilteredReviews([...newListReviews].splice(0, page * skip));
  //   } else {
  //     setFilteredReviews([...filteredReviews].filter(e => e.id !== id));
  //   }

  //   setReviewCount(reviewCount - 1);

  //   toast.success("Remove review success");
  // };

  return (
    <React.Fragment>
      <HeaderContainer header={`Đánh giá (0)`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) => (
            <Box key={item.user_id}>
              <ReviewItem review={item} />
              <Divider sx={{
                display: { xs: "block", md: "none" }
              }} />
            </Box>
          ))}
          {filteredReviews.length < listReviews.length && (
            <Button >Xem thêm</Button>
          )}
        </Stack>
        {user && (
          <React.Fragment>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.name} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.name}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => {setContent(e.target.value)}}
                  multiline
                  rows={4}
                  placeholder="Viết đánh giá của bạn"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  Gửi
                </LoadingButton>
              </Stack>
            </Stack>
          </React.Fragment>
        )}
      </HeaderContainer>
    </React.Fragment>
  );
};

export default Review;